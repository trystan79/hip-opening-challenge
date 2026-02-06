const express = require('express');
const router = express.Router();
const { getDB } = require('../db/database');

function getUserId(req) {
  const userId = parseInt(req.query.userId || req.body.userId);
  if (!userId || isNaN(userId)) return null;
  return userId;
}

// Difficulty-based timing
function getSegmentCount(poses) {
  return poses.reduce((sum, p) => sum + (p.is_bilateral ? 2 : 1), 0);
}

function getSegmentTime(difficulty, segmentCount) {
  if (segmentCount >= 4) {
    return { easy: 90, medium: 150, hard: 210 }[difficulty] || 90;
  }
  return { easy: 120, medium: 210, hard: 300 }[difficulty] || 120;
}

function computePoseDurations(db, userId, poses, routineId) {
  let difficulty = 'easy';
  if (routineId) {
    const ur = db.prepare('SELECT difficulty FROM user_routine WHERE user_id = ? AND routine_id = ?').get(userId, routineId);
    if (ur) difficulty = ur.difficulty || 'easy';
  } else {
    const user = db.prepare('SELECT difficulty FROM user WHERE id = ?').get(userId);
    difficulty = (user && user.difficulty) || 'easy';
  }
  const segmentCount = getSegmentCount(poses);
  const baseTime = getSegmentTime(difficulty, segmentCount);

  poses.forEach(pose => {
    const override = db.prepare(
      'SELECT override_seconds FROM user_pose_time_override WHERE user_id = ? AND pose_id = ?'
    ).get(userId, pose.id);
    pose.computed_duration = override ? override.override_seconds : baseTime;
  });
}

// Pose similarity (Jaccard-weighted)
function parseCSV(str) {
  return (str || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
}

function jaccard(a, b) {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let intersection = 0;
  for (const item of setA) if (setB.has(item)) intersection++;
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function computeSimilarity(poseA, poseB) {
  if (poseA.id === poseB.id) return -1;
  if (poseA.is_bilateral !== poseB.is_bilateral) return -1;

  const planeMatch = (poseA.movement_plane || '').toLowerCase() === (poseB.movement_plane || '').toLowerCase() ? 1 : 0;
  const primaryHigh = jaccard(parseCSV(poseA.primary_muscles_high), parseCSV(poseB.primary_muscles_high));
  const categories = jaccard(parseCSV(poseA.movement_categories), parseCSV(poseB.movement_categories));
  const secondary = jaccard(parseCSV(poseA.secondary_muscles), parseCSV(poseB.secondary_muscles));
  const primaryLow = jaccard(parseCSV(poseA.primary_muscles_low), parseCSV(poseB.primary_muscles_low));

  return planeMatch * 0.15 + primaryHigh * 0.35 + categories * 0.25 + secondary * 0.15 + primaryLow * 0.10;
}

// Get user_routine record, falling back to user table for backwards compat
function getUserRoutine(db, userId, routineId) {
  const ur = db.prepare(
    'SELECT * FROM user_routine WHERE user_id = ? AND routine_id = ?'
  ).get(userId, routineId);
  if (ur) return ur;
  // Fallback: create from user table data for routine 1
  const user = db.prepare('SELECT current_day, current_cycle, difficulty FROM user WHERE id = ?').get(userId);
  if (!user) return null;
  return {
    user_id: userId,
    routine_id: routineId,
    is_active: 1,
    current_day: user.current_day || 1,
    current_cycle: user.current_cycle || 1,
    difficulty: user.difficulty || 'easy'
  };
}

function applySubstitutions(db, userId, poses) {
  return poses.map(pose => {
    const sub = db.prepare(
      'SELECT replacement_pose_id FROM user_pose_substitution WHERE user_id = ? AND original_pose_id = ?'
    ).get(userId, pose.id);
    if (sub) {
      const replacement = db.prepare('SELECT * FROM pose WHERE id = ?').get(sub.replacement_pose_id);
      if (replacement) {
        const originalName = pose.name;
        const originalId = pose.id;
        Object.assign(pose, replacement);
        pose.substituted = true;
        pose.original_pose_id = originalId;
        pose.original_pose_name = originalName;
        // Restore the original pose's slot position
        pose.cues = JSON.parse(pose.cues || '[]');
        pose.props = JSON.parse(pose.props || '[]');
        pose.breathing_pattern = JSON.parse(pose.breathing_pattern || '{}');
      }
    }
    return pose;
  });
}

// ===== USERS =====

router.get('/users', (req, res) => {
  const db = getDB();
  const users = db.prepare(
    'SELECT id, name, mascot, xp, level, streak_count, is_admin, CASE WHEN pin IS NOT NULL AND pin != "" THEN 1 ELSE 0 END as has_pin FROM user ORDER BY is_admin DESC, name'
  ).all();
  res.json(users);
});

router.post('/users/login', (req, res) => {
  const db = getDB();
  const { userId, pin } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const user = db.prepare('SELECT id, pin, is_admin FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!user.pin || user.pin === '') {
    return res.json({ success: true, isAdmin: user.is_admin === 1, needsPin: true });
  }
  if (user.pin === pin) {
    return res.json({ success: true, isAdmin: user.is_admin === 1, needsPin: false });
  }
  return res.status(401).json({ error: 'Incorrect PIN' });
});

router.post('/users', (req, res) => {
  const db = getDB();
  const { name, mascot, pin } = req.body;

  if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
  if (!pin || !/^\d{4}$/.test(pin)) return res.status(400).json({ error: 'PIN must be 4 digits' });

  // Enforce max 10 users
  const userCount = db.prepare('SELECT COUNT(*) as count FROM user').get().count;
  if (userCount >= 10) return res.status(400).json({ error: 'Maximum 10 users reached. Ask an admin to remove an account.' });

  // First user is automatically admin
  const isAdmin = userCount === 0 ? 1 : 0;

  const result = db.prepare(
    'INSERT INTO user (name, mascot, pin, is_admin) VALUES (?, ?, ?, ?)'
  ).run(name.trim(), mascot || 'fox', pin, isAdmin);
  const userId = result.lastInsertRowid;

  // Auto-enroll in routine 1
  db.prepare('INSERT INTO user_routine (user_id, routine_id) VALUES (?, 1)').run(userId);

  // Initialize day progress for routine 1: Day 1 available, rest locked
  const days = db.prepare('SELECT id FROM day WHERE routine_id = 1 ORDER BY id').all();
  for (const day of days) {
    const status = day.id === days[0].id ? 'available' : 'locked';
    db.prepare(
      'INSERT INTO user_day_progress (user_id, day_id, status, routine_id) VALUES (?, ?, ?, 1)'
    ).run(userId, day.id, status);
  }

  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  user.preferences = JSON.parse(user.preferences || '{}');
  res.json(user);
});

router.delete('/users/:id', (req, res) => {
  const db = getDB();
  const adminId = getUserId(req);
  const targetId = parseInt(req.params.id);

  const admin = db.prepare('SELECT is_admin FROM user WHERE id = ?').get(adminId);
  if (!admin || admin.is_admin !== 1) return res.status(403).json({ error: 'Admin access required' });
  if (adminId === targetId) return res.status(400).json({ error: 'Cannot delete your own account' });

  db.prepare('DELETE FROM user_pose_substitution WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM user_pose_time_override WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM cycle_log WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM session_log WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM user_day_progress WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM user_routine WHERE user_id = ?').run(targetId);
  db.prepare('DELETE FROM user WHERE id = ?').run(targetId);
  res.json({ success: true });
});

router.post('/users/:id/set-initial-pin', (req, res) => {
  const db = getDB();
  const userId = parseInt(req.params.id);
  const { pin } = req.body;
  if (!pin || !/^\d{4}$/.test(pin)) return res.status(400).json({ error: 'PIN must be 4 digits' });

  const user = db.prepare('SELECT pin FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.pin && user.pin !== '') return res.status(400).json({ error: 'User already has a PIN' });

  db.prepare('UPDATE user SET pin = ? WHERE id = ?').run(pin, userId);
  res.json({ success: true });
});

router.patch('/users/:id/pin', (req, res) => {
  const db = getDB();
  const requesterId = getUserId(req);
  const targetId = parseInt(req.params.id);
  const { pin, currentPin } = req.body;

  if (pin && !/^\d{4}$/.test(pin)) return res.status(400).json({ error: 'PIN must be 4 digits' });

  const requester = db.prepare('SELECT is_admin FROM user WHERE id = ?').get(requesterId);
  const target = db.prepare('SELECT pin FROM user WHERE id = ?').get(targetId);
  if (!target) return res.status(404).json({ error: 'User not found' });

  if (requester && requester.is_admin === 1) {
    db.prepare('UPDATE user SET pin = ? WHERE id = ?').run(pin || null, targetId);
    return res.json({ success: true });
  }
  if (requesterId !== targetId) return res.status(403).json({ error: 'Cannot change another user\'s PIN' });
  if (target.pin && target.pin !== '' && target.pin !== currentPin) {
    return res.status(401).json({ error: 'Current PIN is incorrect' });
  }

  db.prepare('UPDATE user SET pin = ? WHERE id = ?').run(pin || null, targetId);
  res.json({ success: true });
});

// ===== CURRENT USER =====

router.get('/user', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.preferences = JSON.parse(user.preferences || '{}');
  res.json(user);
});

router.patch('/user', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const { name, mascot, preferences, difficulty } = req.body;
  if (name) db.prepare('UPDATE user SET name = ? WHERE id = ?').run(name, userId);
  if (mascot) db.prepare('UPDATE user SET mascot = ? WHERE id = ?').run(mascot, userId);
  if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
    db.prepare('UPDATE user SET difficulty = ? WHERE id = ?').run(difficulty, userId);
    db.prepare('UPDATE user_routine SET difficulty = ? WHERE user_id = ?').run(difficulty, userId);
  }
  if (preferences) {
    const current = JSON.parse(
      db.prepare('SELECT preferences FROM user WHERE id = ?').get(userId).preferences || '{}'
    );
    db.prepare('UPDATE user SET preferences = ? WHERE id = ?').run(JSON.stringify({ ...current, ...preferences }), userId);
  }

  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  user.preferences = JSON.parse(user.preferences || '{}');
  res.json(user);
});

// ===== DAYS & POSES =====

router.get('/days', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const routineId = parseInt(req.query.routineId) || 1;
  const days = db.prepare('SELECT * FROM day WHERE routine_id = ? ORDER BY sort_order').all(routineId);

  const enriched = days.map(day => {
    const poses = db.prepare(
      'SELECT id, name, pose_number, primary_muscles_high, movement_plane, duration_seconds, is_bilateral, props FROM pose WHERE day_id = ? ORDER BY sort_order'
    ).all(day.id);

    const progress = db.prepare(
      'SELECT status, times_completed FROM user_day_progress WHERE user_id = ? AND day_id = ?'
    ).get(userId, day.id);

    poses.forEach(p => { p.props = JSON.parse(p.props || '[]'); });
    computePoseDurations(db, userId, poses, routineId);

    return {
      ...day,
      poses,
      status: progress ? progress.status : 'locked',
      times_completed: progress ? progress.times_completed : 0
    };
  });

  res.json(enriched);
});

router.get('/days/:id', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const day = db.prepare('SELECT * FROM day WHERE id = ?').get(req.params.id);
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const poses = db.prepare('SELECT * FROM pose WHERE day_id = ? ORDER BY sort_order').all(day.id);
  const progress = db.prepare(
    'SELECT * FROM user_day_progress WHERE user_id = ? AND day_id = ?'
  ).get(userId, day.id);

  poses.forEach(pose => {
    pose.cues = JSON.parse(pose.cues || '[]');
    pose.props = JSON.parse(pose.props || '[]');
    pose.breathing_pattern = JSON.parse(pose.breathing_pattern || '{}');
  });
  applySubstitutions(db, userId, poses);
  computePoseDurations(db, userId, poses, day.routine_id || 1);

  res.json({ ...day, poses, progress });
});

// ===== TODAY =====

function getTodayForRoutine(db, userId, routineId) {
  const ur = getUserRoutine(db, userId, routineId);
  const routine = db.prepare('SELECT * FROM routine WHERE id = ?').get(routineId);

  // Check pain trends (routine-scoped)
  const recentSessions = db.prepare(
    'SELECT pain_rating, pain_location FROM session_log WHERE user_id = ? AND routine_id = ? AND completed = 1 AND pain_rating IS NOT NULL ORDER BY completed_at DESC LIMIT 3'
  ).all(userId, routineId);

  const avgPain = recentSessions.length > 0
    ? recentSessions.reduce((sum, s) => sum + s.pain_rating, 0) / recentSessions.length
    : 0;
  const highPain = avgPain > 3;

  // Find next available day (within this routine)
  let nextDay;

  if (highPain) {
    nextDay = db.prepare(`
      SELECT d.*, udp.status FROM day d
      JOIN user_day_progress udp ON d.id = udp.day_id AND udp.user_id = ?
      WHERE d.routine_id = ? AND d.week = 1 AND udp.status IN ('available', 'completed')
      ORDER BY d.sort_order LIMIT 1
    `).get(userId, routineId);
  }

  if (!nextDay) {
    nextDay = db.prepare(`
      SELECT d.*, udp.status FROM day d
      JOIN user_day_progress udp ON d.id = udp.day_id AND udp.user_id = ?
      WHERE d.routine_id = ? AND udp.status = 'available'
      ORDER BY d.sort_order LIMIT 1
    `).get(userId, routineId);
  }

  if (!nextDay) {
    nextDay = db.prepare(`
      SELECT d.*, udp.status FROM day d
      JOIN user_day_progress udp ON d.id = udp.day_id AND udp.user_id = ?
      WHERE d.routine_id = ? AND udp.status = 'completed'
      ORDER BY udp.last_completed_at ASC LIMIT 1
    `).get(userId, routineId);
  }

  let reason = 'Next in your journey';
  if (highPain) reason = 'Easier session recommended — recent discomfort was elevated';
  else if (nextDay && nextDay.status === 'completed') reason = 'Review — maintain your flexibility';

  let poses = [];
  if (nextDay) {
    poses = db.prepare('SELECT id, name, primary_muscles_high, props, duration_seconds, is_bilateral FROM pose WHERE day_id = ? ORDER BY sort_order').all(nextDay.id);
    poses.forEach(p => { p.props = JSON.parse(p.props || '[]'); });
    applySubstitutions(db, userId, poses);
    computePoseDurations(db, userId, poses, routineId);
  }

  let painNote = null;
  if (recentSessions.some(s => s.pain_location === 'knees')) {
    painNote = 'Your knees have been sensitive. Use extra cushioning and don\'t force depth.';
  } else if (recentSessions.some(s => s.pain_location === 'lower_back')) {
    painNote = 'Your lower back has been sensitive. Focus on core engagement and reduce range.';
  } else if (recentSessions.some(s => s.pain_location === 'hips')) {
    painNote = 'Your hips have been sensitive. Use all available props and stay in the regression.';
  }

  // Check if all days in this routine completed
  const availableCount = db.prepare(
    "SELECT COUNT(*) as count FROM user_day_progress udp JOIN day d ON udp.day_id = d.id WHERE udp.user_id = ? AND d.routine_id = ? AND udp.status = 'available'"
  ).get(userId, routineId).count;
  const lockedCount = db.prepare(
    "SELECT COUNT(*) as count FROM user_day_progress udp JOIN day d ON udp.day_id = d.id WHERE udp.user_id = ? AND d.routine_id = ? AND udp.status = 'locked'"
  ).get(userId, routineId).count;
  const allDaysComplete = availableCount === 0 && lockedCount === 0;

  return {
    routine_id: routineId,
    routine_name: routine ? routine.name : 'Unknown',
    routine_color: routine ? routine.color : '#e94560',
    routine_slug: routine ? routine.slug : '',
    day: nextDay || null,
    poses,
    reason,
    painNote,
    avgPain: Math.round(avgPain * 10) / 10,
    allDaysComplete,
    current_cycle: ur ? ur.current_cycle : 1,
    difficulty: ur ? ur.difficulty : 'easy'
  };
}

router.get('/today', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const routineId = parseInt(req.query.routineId) || 1;
  const todayData = getTodayForRoutine(db, userId, routineId);

  res.json({
    ...todayData,
    user: {
      streak_count: user.streak_count,
      xp: user.xp,
      level: user.level,
      name: user.name,
      mascot: user.mascot,
      current_cycle: todayData.current_cycle,
      difficulty: todayData.difficulty
    }
  });
});

// Multi-routine today: returns data for all active routines
router.get('/today/all', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Get all active routines for this user
  const activeRoutines = db.prepare(
    'SELECT routine_id FROM user_routine WHERE user_id = ? AND is_active = 1 ORDER BY routine_id'
  ).all(userId);

  // If no user_routine records, default to routine 1
  const routineIds = activeRoutines.length > 0
    ? activeRoutines.map(r => r.routine_id)
    : [1];

  const routines = routineIds.map(rid => getTodayForRoutine(db, userId, rid));

  res.json({
    routines,
    user: {
      streak_count: user.streak_count,
      xp: user.xp,
      level: user.level,
      name: user.name,
      mascot: user.mascot
    }
  });
});

// ===== POSE TIME OVERRIDES =====

router.post('/pose-time-override', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const { pose_id, override_seconds } = req.body;

  if (!pose_id || !override_seconds || override_seconds < 30 || override_seconds > 600) {
    return res.status(400).json({ error: 'pose_id and override_seconds (30-600) are required' });
  }

  const existing = db.prepare(
    'SELECT id FROM user_pose_time_override WHERE user_id = ? AND pose_id = ?'
  ).get(userId, pose_id);

  if (existing) {
    db.prepare(
      'UPDATE user_pose_time_override SET override_seconds = ? WHERE user_id = ? AND pose_id = ?'
    ).run(override_seconds, userId, pose_id);
  } else {
    db.prepare(
      'INSERT INTO user_pose_time_override (user_id, pose_id, override_seconds) VALUES (?, ?, ?)'
    ).run(userId, pose_id, override_seconds);
  }

  res.json({ success: true });
});

// ===== POSE SUBSTITUTIONS =====

router.get('/poses/:id/similar', (req, res) => {
  const db = getDB();
  const poseId = parseInt(req.params.id);
  const target = db.prepare('SELECT * FROM pose WHERE id = ?').get(poseId);
  if (!target) return res.status(404).json({ error: 'Pose not found' });

  const allPoses = db.prepare('SELECT * FROM pose ORDER BY id').all();
  const scored = allPoses
    .map(p => ({ ...p, similarity: computeSimilarity(target, p) }))
    .filter(p => p.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.name,
      primary_muscles_high: p.primary_muscles_high,
      movement_plane: p.movement_plane,
      is_bilateral: p.is_bilateral,
      day_id: p.day_id,
      similarity: Math.round(p.similarity * 100)
    }));

  res.json(scored);
});

router.post('/substitutions', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const { original_pose_id, replacement_pose_id } = req.body;
  if (!original_pose_id || !replacement_pose_id) {
    return res.status(400).json({ error: 'original_pose_id and replacement_pose_id required' });
  }

  const existing = db.prepare(
    'SELECT id FROM user_pose_substitution WHERE user_id = ? AND original_pose_id = ?'
  ).get(userId, original_pose_id);

  if (existing) {
    db.prepare(
      'UPDATE user_pose_substitution SET replacement_pose_id = ? WHERE user_id = ? AND original_pose_id = ?'
    ).run(replacement_pose_id, userId, original_pose_id);
  } else {
    db.prepare(
      'INSERT INTO user_pose_substitution (user_id, original_pose_id, replacement_pose_id) VALUES (?, ?, ?)'
    ).run(userId, original_pose_id, replacement_pose_id);
  }

  res.json({ success: true });
});

router.delete('/substitutions/:poseId', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  db.prepare(
    'DELETE FROM user_pose_substitution WHERE user_id = ? AND original_pose_id = ?'
  ).run(userId, parseInt(req.params.poseId));

  res.json({ success: true });
});

// ===== ROUTINES =====

router.get('/routines', (req, res) => {
  const userId = getUserId(req);
  const db = getDB();
  const routines = db.prepare('SELECT * FROM routine ORDER BY id').all();

  if (userId) {
    routines.forEach(r => {
      const ur = db.prepare(
        'SELECT * FROM user_routine WHERE user_id = ? AND routine_id = ?'
      ).get(userId, r.id);
      r.enrolled = !!ur;
      r.is_active = ur ? ur.is_active : 0;
      r.current_day = ur ? ur.current_day : 1;
      r.current_cycle = ur ? ur.current_cycle : 1;
      r.difficulty = ur ? ur.difficulty : 'easy';
    });
  }

  res.json(routines);
});

router.post('/routines/:id/join', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const routineId = parseInt(req.params.id);
  const routine = db.prepare('SELECT * FROM routine WHERE id = ?').get(routineId);
  if (!routine) return res.status(404).json({ error: 'Routine not found' });

  // Check if already enrolled
  const existing = db.prepare(
    'SELECT id, is_active FROM user_routine WHERE user_id = ? AND routine_id = ?'
  ).get(userId, routineId);

  if (existing) {
    if (!existing.is_active) {
      db.prepare('UPDATE user_routine SET is_active = 1 WHERE id = ?').run(existing.id);
    }
  } else {
    db.prepare(
      'INSERT INTO user_routine (user_id, routine_id) VALUES (?, ?)'
    ).run(userId, routineId);
  }

  // Initialize day progress for this routine if none exists
  const days = db.prepare('SELECT id FROM day WHERE routine_id = ? ORDER BY id').all(routineId);
  for (const day of days) {
    const exists = db.prepare(
      'SELECT id FROM user_day_progress WHERE user_id = ? AND day_id = ? AND routine_id = ?'
    ).get(userId, day.id, routineId);
    if (!exists) {
      const status = day.id === days[0].id ? 'available' : 'locked';
      db.prepare(
        'INSERT INTO user_day_progress (user_id, day_id, status, routine_id) VALUES (?, ?, ?, ?)'
      ).run(userId, day.id, status, routineId);
    }
  }

  res.json({ success: true });
});

router.post('/routines/:id/leave', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const routineId = parseInt(req.params.id);
  db.prepare(
    'UPDATE user_routine SET is_active = 0 WHERE user_id = ? AND routine_id = ?'
  ).run(userId, routineId);

  res.json({ success: true });
});

// ===== SHUFFLE =====

router.get('/shuffle', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const mode = req.query.mode || 'similar';

  // Get the user's current scheduled day
  const currentDay = db.prepare(`
    SELECT d.* FROM day d
    JOIN user_day_progress udp ON d.id = udp.day_id AND udp.user_id = ?
    WHERE udp.status = 'available'
    ORDER BY d.sort_order LIMIT 1
  `).get(userId);

  const allDays = db.prepare('SELECT * FROM day ORDER BY sort_order').all();

  if (mode === 'similar' && currentDay) {
    // Get poses for current day to find muscle focus
    const currentPoses = db.prepare('SELECT * FROM pose WHERE day_id = ?').all(currentDay.id);
    const currentMuscles = new Set();
    currentPoses.forEach(p => parseCSV(p.primary_muscles_high).forEach(m => currentMuscles.add(m)));

    // Score each other day by muscle overlap
    const scored = allDays
      .filter(d => d.id !== currentDay.id)
      .map(d => {
        const poses = db.prepare('SELECT primary_muscles_high FROM pose WHERE day_id = ?').all(d.id);
        const dayMuscles = new Set();
        poses.forEach(p => parseCSV(p.primary_muscles_high).forEach(m => dayMuscles.add(m)));
        let overlap = 0;
        for (const m of currentMuscles) if (dayMuscles.has(m)) overlap++;
        const union = new Set([...currentMuscles, ...dayMuscles]).size;
        return { ...d, score: union > 0 ? overlap / union : 0 };
      })
      .filter(d => d.score > 0)
      .sort((a, b) => b.score - a.score);

    // Pick randomly from top similar days (top 5 or fewer)
    const candidates = scored.slice(0, Math.min(5, scored.length));
    if (candidates.length === 0) {
      // Fallback to random
      const random = allDays[Math.floor(Math.random() * allDays.length)];
      return res.json(random);
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    delete pick.score;
    return res.json(pick);
  } else {
    // "different" mode or no current day: pick a random day with least muscle overlap
    if (currentDay) {
      const currentPoses = db.prepare('SELECT * FROM pose WHERE day_id = ?').all(currentDay.id);
      const currentMuscles = new Set();
      currentPoses.forEach(p => parseCSV(p.primary_muscles_high).forEach(m => currentMuscles.add(m)));

      const scored = allDays
        .filter(d => d.id !== currentDay.id)
        .map(d => {
          const poses = db.prepare('SELECT primary_muscles_high FROM pose WHERE day_id = ?').all(d.id);
          const dayMuscles = new Set();
          poses.forEach(p => parseCSV(p.primary_muscles_high).forEach(m => dayMuscles.add(m)));
          let overlap = 0;
          for (const m of currentMuscles) if (dayMuscles.has(m)) overlap++;
          const union = new Set([...currentMuscles, ...dayMuscles]).size;
          return { ...d, score: union > 0 ? overlap / union : 0 };
        })
        .sort((a, b) => a.score - b.score); // least overlap first

      const candidates = scored.slice(0, Math.min(5, scored.length));
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      delete pick.score;
      return res.json(pick);
    } else {
      // No current day, just pick random
      const pick = allDays[Math.floor(Math.random() * allDays.length)];
      return res.json(pick);
    }
  }
});

// ===== SESSIONS =====

router.post('/sessions', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const { day_id, is_shuffle } = req.body;
  if (!day_id) return res.status(400).json({ error: 'day_id is required' });

  const day = db.prepare('SELECT * FROM day WHERE id = ?').get(day_id);
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const routineId = day.routine_id || 1;
  const ur = getUserRoutine(db, userId, routineId);
  const cycleNum = ur ? ur.current_cycle : 1;
  const result = db.prepare(
    'INSERT INTO session_log (user_id, day_id, cycle_number, is_shuffle, routine_id) VALUES (?, ?, ?, ?, ?)'
  ).run(userId, day_id, cycleNum, is_shuffle ? 1 : 0, routineId);

  res.json({ session_id: result.lastInsertRowid });
});

router.post('/sessions/:id/complete', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const sessionId = req.params.id;
  const { pain_rating, pain_location, difficulty_rating, flexibility_rating } = req.body;

  const session = db.prepare('SELECT * FROM session_log WHERE id = ?').get(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.completed === 1) return res.status(400).json({ error: 'Session already completed' });

  const day = db.prepare('SELECT * FROM day WHERE id = ?').get(session.day_id);
  const xpEarned = 20 + (day.week - 1) * 5; // Week 1: 20, Week 2: 25, Week 3: 30

  // Update session
  db.prepare(`
    UPDATE session_log SET
      completed_at = datetime('now'),
      pain_rating = ?, pain_location = ?,
      difficulty_rating = ?, flexibility_rating = ?,
      xp_earned = ?, completed = 1
    WHERE id = ?
  `).run(pain_rating || null, pain_location || null, difficulty_rating || null, flexibility_rating || null, xpEarned, sessionId);

  // Update user XP and level
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  const newXP = user.xp + xpEarned;
  const newLevel = Math.floor(newXP / 100) + 1;

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const lastDate = user.last_session_date;
  let newStreak = user.streak_count;

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    newStreak = (lastDate === yesterdayStr || !lastDate) ? user.streak_count + 1 : 1;
  }

  const longestStreak = Math.max(user.longest_streak, newStreak);

  const routineId = day.routine_id || 1;
  const ur = getUserRoutine(db, userId, routineId);

  // Shuffle sessions: award XP/streak but don't advance day progress
  if (session.is_shuffle) {
    db.prepare(`
      UPDATE user SET xp = ?, level = ?, streak_count = ?, longest_streak = ?,
        last_session_date = ?
      WHERE id = ?
    `).run(newXP, newLevel, newStreak, longestStreak, today, userId);

    return res.json({
      xp_earned: xpEarned,
      total_xp: newXP,
      new_level: newLevel,
      streak: newStreak,
      longest_streak: longestStreak,
      level_up: newLevel > user.level,
      cycle_complete: false,
      current_cycle: ur ? ur.current_cycle : 1,
      is_shuffle: true
    });
  }

  // Update user XP/streak (global, not routine-specific)
  db.prepare(`
    UPDATE user SET xp = ?, level = ?, streak_count = ?, longest_streak = ?,
      last_session_date = ?
    WHERE id = ?
  `).run(newXP, newLevel, newStreak, longestStreak, today, userId);

  // Also update legacy current_day on user table for backwards compat (routine 1 only)
  if (routineId === 1) {
    db.prepare('UPDATE user SET current_day = MAX(current_day, ?) WHERE id = ?').run(session.day_id + 1, userId);
  }

  // Mark day completed
  db.prepare(`
    UPDATE user_day_progress SET status = 'completed', times_completed = times_completed + 1, last_completed_at = datetime('now')
    WHERE user_id = ? AND day_id = ?
  `).run(userId, session.day_id);

  // Unlock next day (within the same routine)
  const routineDays = db.prepare('SELECT id FROM day WHERE routine_id = ? ORDER BY sort_order').all(routineId);
  const currentIndex = routineDays.findIndex(d => d.id === session.day_id);
  if (currentIndex >= 0 && currentIndex < routineDays.length - 1) {
    const nextDayId = routineDays[currentIndex + 1].id;
    db.prepare(`
      UPDATE user_day_progress SET status = 'available'
      WHERE user_id = ? AND day_id = ? AND status = 'locked'
    `).run(userId, nextDayId);
  }

  // Check if all days in this routine's cycle are complete
  const lockedOrAvailable = db.prepare(
    "SELECT COUNT(*) as count FROM user_day_progress udp JOIN day d ON udp.day_id = d.id WHERE udp.user_id = ? AND d.routine_id = ? AND udp.status != 'completed'"
  ).get(userId, routineId).count;

  res.json({
    xp_earned: xpEarned,
    total_xp: newXP,
    new_level: newLevel,
    streak: newStreak,
    longest_streak: longestStreak,
    level_up: newLevel > user.level,
    cycle_complete: lockedOrAvailable === 0,
    current_cycle: ur ? ur.current_cycle : 1,
    routine_id: routineId
  });
});

// ===== PROGRESS =====

router.get('/progress', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const routineId = parseInt(req.query.routineId) || 1;
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.preferences = JSON.parse(user.preferences || '{}');

  const ur = getUserRoutine(db, userId, routineId);

  const sessions = db.prepare(`
    SELECT sl.*, d.theme as day_theme, d.id as day_number
    FROM session_log sl JOIN day d ON sl.day_id = d.id
    WHERE sl.user_id = ? AND d.routine_id = ? AND sl.completed = 1
    ORDER BY sl.completed_at DESC LIMIT 30
  `).all(userId, routineId);

  const totalSessions = db.prepare(
    'SELECT COUNT(*) as count FROM session_log sl JOIN day d ON sl.day_id = d.id WHERE sl.user_id = ? AND d.routine_id = ? AND sl.completed = 1'
  ).get(userId, routineId).count;

  const daysCompleted = db.prepare(
    "SELECT COUNT(*) as count FROM user_day_progress udp JOIN day d ON udp.day_id = d.id WHERE udp.user_id = ? AND d.routine_id = ? AND udp.status = 'completed'"
  ).get(userId, routineId).count;

  const calendarData = db.prepare(`
    SELECT DATE(sl.completed_at) as date, COUNT(*) as sessions
    FROM session_log sl JOIN day d ON sl.day_id = d.id
    WHERE sl.user_id = ? AND d.routine_id = ? AND sl.completed = 1 AND sl.completed_at IS NOT NULL
    GROUP BY DATE(sl.completed_at) ORDER BY date DESC LIMIT 60
  `).all(userId, routineId);

  const painTrend = db.prepare(`
    SELECT DATE(sl.completed_at) as date, AVG(sl.pain_rating) as avg_pain
    FROM session_log sl JOIN day d ON sl.day_id = d.id
    WHERE sl.user_id = ? AND d.routine_id = ? AND sl.completed = 1 AND sl.pain_rating IS NOT NULL
    GROUP BY DATE(sl.completed_at) ORDER BY date DESC LIMIT 14
  `).all(userId, routineId);

  const flexTrend = db.prepare(`
    SELECT DATE(sl.completed_at) as date, AVG(sl.flexibility_rating) as avg_flex
    FROM session_log sl JOIN day d ON sl.day_id = d.id
    WHERE sl.user_id = ? AND d.routine_id = ? AND sl.completed = 1 AND sl.flexibility_rating IS NOT NULL
    GROUP BY DATE(sl.completed_at) ORDER BY date DESC LIMIT 14
  `).all(userId, routineId);

  const totalDays = db.prepare('SELECT COUNT(*) as count FROM day WHERE routine_id = ?').get(routineId).count;
  const cyclesCompleted = db.prepare(
    'SELECT COUNT(*) as count FROM cycle_log WHERE user_id = ? AND routine_id = ?'
  ).get(userId, routineId).count;

  res.json({
    user, sessions, totalSessions, daysCompleted,
    totalDays, currentCycle: ur ? ur.current_cycle : 1,
    cyclesCompleted, calendarData, painTrend, flexTrend,
    routine_id: routineId
  });
});

// ===== CYCLE ADVANCE =====

router.post('/cycle/advance', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  const { difficulty, routine_id } = req.body;
  const routineId = routine_id || 1;
  const user = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const ur = getUserRoutine(db, userId, routineId);
  const currentCycle = ur ? ur.current_cycle : 1;
  const currentDifficulty = ur ? ur.difficulty : 'easy';
  const newDifficulty = (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) ? difficulty : currentDifficulty;

  // Log completed cycle
  db.prepare(
    "INSERT INTO cycle_log (user_id, cycle_number, difficulty, completed_at, routine_id) VALUES (?, ?, ?, datetime('now'), ?)"
  ).run(userId, currentCycle, currentDifficulty, routineId);

  // Advance to next cycle in user_routine
  const newCycle = currentCycle + 1;
  const existingUR = db.prepare(
    'SELECT id FROM user_routine WHERE user_id = ? AND routine_id = ?'
  ).get(userId, routineId);
  if (existingUR) {
    db.prepare(
      'UPDATE user_routine SET current_cycle = ?, difficulty = ?, current_day = 1 WHERE user_id = ? AND routine_id = ?'
    ).run(newCycle, newDifficulty, userId, routineId);
  }

  // Also update legacy user table for routine 1
  if (routineId === 1) {
    db.prepare(
      'UPDATE user SET current_cycle = ?, difficulty = ?, current_day = 1 WHERE id = ?'
    ).run(newCycle, newDifficulty, userId);
  }

  // Reset day progress for this routine only
  const routineDays = db.prepare('SELECT id FROM day WHERE routine_id = ? ORDER BY sort_order').all(routineId);
  const dayIds = routineDays.map(d => d.id);
  if (dayIds.length > 0) {
    for (const dayId of dayIds) {
      db.prepare(
        "UPDATE user_day_progress SET status = 'locked', times_completed = 0, last_completed_at = NULL WHERE user_id = ? AND day_id = ?"
      ).run(userId, dayId);
    }
    // First day of this routine = available
    db.prepare(
      "UPDATE user_day_progress SET status = 'available' WHERE user_id = ? AND day_id = ?"
    ).run(userId, dayIds[0]);
  }

  res.json({
    success: true,
    new_cycle: newCycle,
    difficulty: newDifficulty
  });
});

// ===== RESET =====

router.post('/reset', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const db = getDB();
  db.prepare("UPDATE user SET xp = 0, level = 1, streak_count = 0, longest_streak = 0, last_session_date = NULL, current_day = 1, current_cycle = 1, difficulty = 'easy', preferences = ? WHERE id = ?").run('{}', userId);
  db.prepare('DELETE FROM session_log WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_pose_substitution WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_pose_time_override WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM cycle_log WHERE user_id = ?').run(userId);
  db.prepare("UPDATE user_day_progress SET status = 'locked', times_completed = 0, last_completed_at = NULL WHERE user_id = ?").run(userId);
  // Reset user_routine entries
  db.prepare("UPDATE user_routine SET current_day = 1, current_cycle = 1, difficulty = 'easy' WHERE user_id = ?").run(userId);
  // Set first day of each routine to 'available'
  const routines = db.prepare('SELECT id FROM routine ORDER BY id').all();
  for (const r of routines) {
    const firstDay = db.prepare('SELECT id FROM day WHERE routine_id = ? ORDER BY sort_order LIMIT 1').get(r.id);
    if (firstDay) {
      db.prepare("UPDATE user_day_progress SET status = 'available' WHERE user_id = ? AND day_id = ?").run(userId, firstDay.id);
    }
  }

  res.json({ success: true });
});

// ===== MUSCLE GROUPS (for Muscle Explorer feature) =====

router.get('/muscles', (req, res) => {
  const db = getDB();
  const poses = db.prepare(
    'SELECT id, day_id, pose_number, name, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane FROM pose ORDER BY day_id, pose_number'
  ).all();
  res.json(poses);
});

module.exports = router;
