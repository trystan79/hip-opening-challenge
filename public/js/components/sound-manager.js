const SoundManager = {
  _ctx: null,
  _enabled: true,
  _hapticsEnabled: true,

  _getCtx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  setEnabled(on) { this._enabled = on; },
  setHapticsEnabled(on) { this._hapticsEnabled = on; },

  _play(freq, type, duration, startTime, gain) {
    if (!this._enabled) return;
    try {
      const ctx = this._getCtx();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.setValueAtTime(gain, startTime);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) { /* audio not available */ }
  },

  click() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    this._play(800, 'sine', 0.05, ctx.currentTime, 0.1);
    this._haptic(10);
  },

  timerComplete() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const t = ctx.currentTime;
    this._play(523, 'triangle', 0.3, t, 0.15);       // C5
    this._play(659, 'triangle', 0.3, t + 0.05, 0.12); // E5
    this._haptic(25);
  },

  xpEarned() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const t = ctx.currentTime;
    this._play(262, 'sine', 0.12, t, 0.12);       // C4
    this._play(330, 'sine', 0.12, t + 0.1, 0.12); // E4
    this._play(392, 'sine', 0.12, t + 0.2, 0.12); // G4
  },

  levelUp() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const t = ctx.currentTime;
    this._play(262, 'triangle', 0.2, t, 0.15);       // C4
    this._play(330, 'triangle', 0.2, t + 0.15, 0.15); // E4
    this._play(392, 'triangle', 0.2, t + 0.3, 0.15);  // G4
    this._play(523, 'triangle', 0.4, t + 0.45, 0.18); // C5
    this._haptic([50, 50, 50, 50, 100]);
  },

  streak() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const t = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const freq = 1200 + Math.random() * 800;
      this._play(freq, 'sine', 0.06, t + i * 0.05, 0.06);
    }
  },

  sessionComplete() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const t = ctx.currentTime;
    this._play(262, 'triangle', 1.0, t, 0.12);  // C4
    this._play(330, 'triangle', 1.0, t, 0.10);  // E4
    this._play(392, 'triangle', 1.0, t, 0.10);  // G4
    this._haptic([50, 50, 50, 50, 100]);
  },

  _haptic(pattern) {
    if (!this._hapticsEnabled) return;
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }
};
