const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Use Railway volume if available, otherwise fall back to local dir
function getDbDir() {
  const vol = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  if (vol && fs.existsSync(vol)) return vol;
  // Check common Railway volume mount point
  if (fs.existsSync('/data')) return '/data';
  return process.env.DB_DIR || __dirname;
}
const DB_DIR = getDbDir();
const DB_PATH = path.join(DB_DIR, 'hip-opening.db');
let db = null;
let dbReady = null;

function initDB() {
  dbReady = (async () => {
    const SQL = await initSqlJs();
    console.log(`Database directory: ${DB_DIR}`);
    console.log(`Database path: ${DB_PATH}`);

    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
      console.log('Database loaded from disk.');
      _runMigrations();
    } else {
      db = new SQL.Database();
      console.log('Initializing new database...');

      const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
      db.exec(schema);

      const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
      db.exec(seed);

      // Load additional routine seed data
      const legsSeedPath = path.join(__dirname, 'seed-legs.sql');
      if (fs.existsSync(legsSeedPath)) {
        const legsSeed = fs.readFileSync(legsSeedPath, 'utf-8');
        db.exec(legsSeed);
      }

      _save();
      console.log('Database initialized with schema and seed data.');
    }

    db.run('PRAGMA foreign_keys = ON');
  })();
}

function _runMigrations() {
  console.log('Running migrations...');
  let changed = false;

  // Phase 1: difficulty column on user table
  try {
    const stmt = db.prepare("SELECT difficulty FROM user LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding difficulty column...');
    db.run("ALTER TABLE user ADD COLUMN difficulty TEXT DEFAULT 'easy'");
    changed = true;

    // Migrate existing holdTime preferences → difficulty
    const stmt = db.prepare("SELECT id, preferences FROM user");
    const users = [];
    while (stmt.step()) {
      const vals = stmt.get();
      users.push({ id: vals[0], preferences: vals[1] });
    }
    stmt.free();

    for (const u of users) {
      const prefs = JSON.parse(u.preferences || '{}');
      if (prefs.holdTime) {
        let diff = 'easy';
        if (prefs.holdTime > 210) diff = 'hard';
        else if (prefs.holdTime > 120) diff = 'medium';
        db.run("UPDATE user SET difficulty = ? WHERE id = ?", [diff, u.id]);
      }
    }
  }

  // Phase 1: user_pose_time_override table
  try {
    const stmt = db.prepare("SELECT id FROM user_pose_time_override LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Creating user_pose_time_override table...');
    db.run(`CREATE TABLE IF NOT EXISTS user_pose_time_override (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      pose_id INTEGER NOT NULL,
      override_seconds INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (pose_id) REFERENCES pose(id),
      UNIQUE(user_id, pose_id)
    )`);
    changed = true;
  }

  // Phase 2: current_cycle column on user table
  try {
    const stmt = db.prepare("SELECT current_cycle FROM user LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding current_cycle column...');
    db.run("ALTER TABLE user ADD COLUMN current_cycle INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 2: cycle_number column on session_log
  try {
    const stmt = db.prepare("SELECT cycle_number FROM session_log LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding cycle_number to session_log...');
    db.run("ALTER TABLE session_log ADD COLUMN cycle_number INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 2: cycle_log table
  try {
    const stmt = db.prepare("SELECT id FROM cycle_log LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Creating cycle_log table...');
    db.run(`CREATE TABLE IF NOT EXISTS cycle_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      cycle_number INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      started_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES user(id)
    )`);
    changed = true;
  }

  // Phase 3: user_pose_substitution table
  try {
    const stmt = db.prepare("SELECT id FROM user_pose_substitution LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Creating user_pose_substitution table...');
    db.run(`CREATE TABLE IF NOT EXISTS user_pose_substitution (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      original_pose_id INTEGER NOT NULL,
      replacement_pose_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES user(id),
      UNIQUE(user_id, original_pose_id)
    )`);
    changed = true;
  }

  // Phase 4: is_shuffle column on session_log
  try {
    const stmt = db.prepare("SELECT is_shuffle FROM session_log LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding is_shuffle to session_log...');
    db.run("ALTER TABLE session_log ADD COLUMN is_shuffle INTEGER DEFAULT 0");
    changed = true;
  }

  // Phase 5: routine table
  try {
    const stmt = db.prepare("SELECT id FROM routine LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Creating routine table...');
    db.run(`CREATE TABLE IF NOT EXISTS routine (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      total_days INTEGER NOT NULL,
      icon TEXT DEFAULT 'stretch',
      color TEXT DEFAULT '#e94560',
      created_at TEXT DEFAULT (datetime('now'))
    )`);
    // Insert default hip-opening routine
    db.run("INSERT INTO routine (id, name, slug, description, total_days, icon, color) VALUES (1, 'Hip Opening', 'hip-opening', '21-day progressive hip flexibility program targeting external rotators, adductors, flexors, and deep hip muscles.', 21, 'hip', '#e94560')");
    changed = true;
  }

  // Phase 5: user_routine table
  try {
    const stmt = db.prepare("SELECT id FROM user_routine LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Creating user_routine table...');
    db.run(`CREATE TABLE IF NOT EXISTS user_routine (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      routine_id INTEGER NOT NULL,
      is_active INTEGER DEFAULT 1,
      current_day INTEGER DEFAULT 1,
      current_cycle INTEGER DEFAULT 1,
      difficulty TEXT DEFAULT 'easy',
      joined_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (routine_id) REFERENCES routine(id),
      UNIQUE(user_id, routine_id)
    )`);
    // Migrate existing users: create user_routine entries from user table state
    const ustmt = db.prepare("SELECT id, current_day, current_cycle, difficulty FROM user");
    const users = [];
    while (ustmt.step()) {
      const v = ustmt.get();
      users.push({ id: v[0], current_day: v[1], current_cycle: v[2], difficulty: v[3] });
    }
    ustmt.free();
    for (const u of users) {
      db.run("INSERT INTO user_routine (user_id, routine_id, current_day, current_cycle, difficulty) VALUES (?, 1, ?, ?, ?)",
        [u.id, u.current_day || 1, u.current_cycle || 1, u.difficulty || 'easy']);
    }
    changed = true;
  }

  // Phase 5: routine_id on day table
  try {
    const stmt = db.prepare("SELECT routine_id FROM day LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding routine_id to day...');
    db.run("ALTER TABLE day ADD COLUMN routine_id INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 5: routine_id on session_log
  try {
    const stmt = db.prepare("SELECT routine_id FROM session_log LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding routine_id to session_log...');
    db.run("ALTER TABLE session_log ADD COLUMN routine_id INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 5: routine_id on user_day_progress
  try {
    const stmt = db.prepare("SELECT routine_id FROM user_day_progress LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding routine_id to user_day_progress...');
    db.run("ALTER TABLE user_day_progress ADD COLUMN routine_id INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 5: routine_id on cycle_log
  try {
    const stmt = db.prepare("SELECT routine_id FROM cycle_log LIMIT 0");
    stmt.free();
  } catch (e) {
    console.log('  Adding routine_id to cycle_log...');
    db.run("ALTER TABLE cycle_log ADD COLUMN routine_id INTEGER DEFAULT 1");
    changed = true;
  }

  // Phase 5: Load hamstrings seed data if routine 2 doesn't exist
  try {
    const stmt = db.prepare("SELECT id FROM routine WHERE id = 2");
    stmt.bind([]);
    const hasRoutine2 = stmt.step();
    stmt.free();
    if (!hasRoutine2) {
      const seedPath = path.join(__dirname, 'seed-legs.sql');
      if (fs.existsSync(seedPath)) {
        console.log('  Loading hamstrings & calves routine...');
        const seedSql = fs.readFileSync(seedPath, 'utf-8');
        db.run("BEGIN TRANSACTION");
        try {
          // Use db.exec equivalent - run the whole thing
          const stmts = seedSql.split(';\n').filter(s => s.trim());
          for (const s of stmts) {
            const trimmed = s.trim();
            if (trimmed && !trimmed.startsWith('--')) {
              db.run(trimmed);
            }
          }
          db.run("COMMIT");
        } catch (seedErr) {
          db.run("ROLLBACK");
          console.error('  Failed to load legs seed:', seedErr.message);
        }
        changed = true;
      }
    }
  } catch (e) {
    // routine table might not exist yet in edge cases; skip
  }

  if (changed) {
    _save();
    console.log('Migrations applied.');
  } else {
    console.log('No migrations needed.');
  }
}

function _save() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function getDB() {
  return {
    prepare(sql) {
      return {
        get(...params) {
          const stmt = db.prepare(sql);
          stmt.bind(params);
          let result = null;
          if (stmt.step()) {
            const cols = stmt.getColumnNames();
            const vals = stmt.get();
            result = {};
            cols.forEach((col, i) => { result[col] = vals[i]; });
          }
          stmt.free();
          return result;
        },
        all(...params) {
          const results = [];
          const stmt = db.prepare(sql);
          stmt.bind(params);
          while (stmt.step()) {
            const cols = stmt.getColumnNames();
            const vals = stmt.get();
            const row = {};
            cols.forEach((col, i) => { row[col] = vals[i]; });
            results.push(row);
          }
          stmt.free();
          return results;
        },
        run(...params) {
          db.run(sql, params);
          const ridStmt = db.prepare("SELECT last_insert_rowid() as rid");
          ridStmt.step();
          const lastId = ridStmt.get()[0];
          ridStmt.free();
          const changes = db.getRowsModified();
          _save();
          return { lastInsertRowid: lastId, changes };
        }
      };
    },
    exec(sql) {
      db.run(sql);
      _save();
    }
  };
}

async function waitForDB() {
  if (dbReady) await dbReady;
}

module.exports = { getDB, initDB, waitForDB };
