CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mascot TEXT DEFAULT 'fox',
  pin TEXT,
  is_admin INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  last_session_date TEXT,
  current_day INTEGER DEFAULT 1,
  preferences TEXT DEFAULT '{}',
  difficulty TEXT DEFAULT 'easy',
  current_cycle INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS routine (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  total_days INTEGER NOT NULL,
  icon TEXT DEFAULT 'stretch',
  color TEXT DEFAULT '#FF6B6B',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_routine (
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
);

CREATE TABLE IF NOT EXISTS day (
  id INTEGER PRIMARY KEY,
  routine_id INTEGER DEFAULT 1,
  week INTEGER NOT NULL,
  theme TEXT,
  description TEXT,
  sort_order INTEGER
);

CREATE TABLE IF NOT EXISTS pose (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_id INTEGER NOT NULL,
  pose_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  instruction TEXT,
  cues TEXT DEFAULT '[]',
  duration_seconds INTEGER DEFAULT 120,
  is_bilateral INTEGER DEFAULT 1,
  props TEXT DEFAULT '[]',
  primary_muscles_high TEXT,
  primary_muscles_low TEXT,
  secondary_muscles TEXT,
  movement_categories TEXT,
  movement_plane TEXT,
  regression TEXT,
  full_pose TEXT,
  progression TEXT,
  breathing_pattern TEXT DEFAULT '{"inhale":4,"hold":0,"exhale":6}',
  sort_order INTEGER,
  FOREIGN KEY (day_id) REFERENCES day(id)
);

CREATE TABLE IF NOT EXISTS session_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  day_id INTEGER NOT NULL,
  started_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  difficulty_rating INTEGER,
  flexibility_rating INTEGER,
  pain_rating INTEGER,
  pain_location TEXT,
  xp_earned INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0,
  cycle_number INTEGER DEFAULT 1,
  is_shuffle INTEGER DEFAULT 0,
  routine_id INTEGER DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (day_id) REFERENCES day(id)
);

CREATE TABLE IF NOT EXISTS user_day_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  day_id INTEGER NOT NULL,
  status TEXT DEFAULT 'locked',
  times_completed INTEGER DEFAULT 0,
  last_completed_at TEXT,
  routine_id INTEGER DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (day_id) REFERENCES day(id)
);

CREATE TABLE IF NOT EXISTS cycle_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  cycle_number INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  started_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  routine_id INTEGER DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS user_pose_substitution (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  original_pose_id INTEGER NOT NULL,
  replacement_pose_id INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user(id),
  UNIQUE(user_id, original_pose_id)
);

CREATE TABLE IF NOT EXISTS user_pose_time_override (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  pose_id INTEGER NOT NULL,
  override_seconds INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (pose_id) REFERENCES pose(id),
  UNIQUE(user_id, pose_id)
);
