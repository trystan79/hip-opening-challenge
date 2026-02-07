const Session = {
  USER_KEY: 'hipChallenge_userId',
  ADMIN_KEY: 'hipChallenge_isAdmin',
  MASCOT_KEY: 'hipChallenge_mascot',

  setUser(userId) { localStorage.setItem(this.USER_KEY, userId); },
  getUser() { return localStorage.getItem(this.USER_KEY); },
  setAdmin(isAdmin) { localStorage.setItem(this.ADMIN_KEY, isAdmin ? '1' : '0'); },
  isAdmin() { return localStorage.getItem(this.ADMIN_KEY) === '1'; },
  setMascot(type) { localStorage.setItem(this.MASCOT_KEY, type || 'fox'); },
  getMascot() { return localStorage.getItem(this.MASCOT_KEY) || 'fox'; },
  clearUser() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
    localStorage.removeItem(this.MASCOT_KEY);
  },
  isLoggedIn() { return !!this.getUser(); }
};

const API = {
  _addUserId(path) {
    const userId = Session.getUser();
    if (!userId) return path;
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}userId=${userId}`;
  },

  async get(path) {
    const res = await fetch(`/api${this._addUserId(path)}`);
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
  },

  async post(path, data = {}) {
    const userId = Session.getUser();
    const body = userId ? { ...data, userId: parseInt(userId) } : data;
    const res = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json();
  },

  async patch(path, data = {}) {
    const userId = Session.getUser();
    const body = userId ? { ...data, userId: parseInt(userId) } : data;
    const res = await fetch(`/api${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`);
    return res.json();
  },

  getUsers() { return fetch('/api/users').then(r => r.json()); },
  createUser(name, mascot, pin) {
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mascot, pin })
    }).then(r => r.json());
  },
  login(userId, pin) {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, pin })
    }).then(r => { if (!r.ok) throw new Error('Login failed'); return r.json(); });
  },
  deleteUser(userId) {
    const adminId = Session.getUser();
    return fetch(`/api/users/${userId}?userId=${adminId}`, { method: 'DELETE' }).then(r => r.json());
  },

  getRoutines() { return this.get('/routines'); },
  joinRoutine(routineId) { return this.post(`/routines/${routineId}/join`); },
  leaveRoutine(routineId) { return this.post(`/routines/${routineId}/leave`); },
  getTodayAll() { return this.get('/today/all'); },
  getUser() { return this.get('/user'); },
  updateUser(data) { return this.patch('/user', data); },
  getDays(routineId) { return this.get(`/days${routineId ? '?routineId=' + routineId : ''}`); },
  getDay(id) { return this.get(`/days/${id}`); },
  getToday() { return this.get('/today'); },
  startSession(dayId, isShuffle) { return this.post('/sessions', { day_id: dayId, is_shuffle: isShuffle ? 1 : 0 }); },
  completeSession(id, data) { return this.post(`/sessions/${id}/complete`, data); },
  getProgress(routineId) { return this.get(`/progress${routineId ? '?routineId=' + routineId : ''}`); },
  resetProgress() { return this.post('/reset'); },
  getMuscles() { return this.get('/muscles'); },
  setPoseTimeOverride(poseId, seconds) { return this.post('/pose-time-override', { pose_id: poseId, override_seconds: seconds }); },
  advanceCycle(difficulty, routineId) { return this.post('/cycle/advance', { difficulty, routine_id: routineId || 1 }); },
  getShuffle(mode) { return this.get(`/shuffle?mode=${mode}`); },
  getSimilarPoses(poseId) { return this.get(`/poses/${poseId}/similar`); },
  substitutePose(originalId, replacementId) { return this.post('/substitutions', { original_pose_id: originalId, replacement_pose_id: replacementId }); },
  getLeaderboard() { return this.get('/leaderboard'); },
  removeSubstitution(poseId) {
    const userId = Session.getUser();
    return fetch(`/api/substitutions/${poseId}?userId=${userId}`, { method: 'DELETE' }).then(r => r.json());
  },
};
