const Timer = {
  _interval: null,
  _remaining: 0,
  _total: 0,
  _onTick: null,
  _onComplete: null,
  _paused: false,
  _startedAt: null,   // wall-clock timestamp when timer started/resumed
  _elapsed: 0,        // seconds already elapsed before last pause

  start(seconds, onTick, onComplete) {
    this.stop();
    this._total = seconds;
    this._remaining = seconds;
    this._elapsed = 0;
    this._onTick = onTick;
    this._onComplete = onComplete;
    this._paused = false;
    this._startedAt = Date.now();

    this._onTick(this._remaining, this._total);

    this._interval = setInterval(() => {
      if (this._paused) return;

      // Use wall-clock time so sleep/background doesn't lose seconds
      const now = Date.now();
      const elapsedSinceResume = (now - this._startedAt) / 1000;
      const totalElapsed = this._elapsed + elapsedSinceResume;
      this._remaining = Math.max(0, Math.round(this._total - totalElapsed));

      this._onTick(this._remaining, this._total);

      if (this._remaining <= 0) {
        this.stop();
        if (this._onComplete) this._onComplete();
      }
    }, 250); // tick faster to catch up quicker after wake
  },

  pause() {
    if (!this._paused) {
      // Bank elapsed time before pausing
      this._elapsed += (Date.now() - this._startedAt) / 1000;
      this._paused = true;
    }
  },

  resume() {
    if (this._paused) {
      this._startedAt = Date.now();
      this._paused = false;
    }
  },

  isPaused() { return this._paused; },

  getElapsed() {
    let elapsed = this._elapsed;
    if (this._startedAt && !this._paused) {
      elapsed += (Date.now() - this._startedAt) / 1000;
    }
    return Math.min(Math.round(elapsed), this._total);
  },

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    this._startedAt = null;
    this._elapsed = 0;
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
};
