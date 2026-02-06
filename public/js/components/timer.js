const Timer = {
  _interval: null,
  _remaining: 0,
  _total: 0,
  _onTick: null,
  _onComplete: null,
  _paused: false,

  start(seconds, onTick, onComplete) {
    this.stop();
    this._total = seconds;
    this._remaining = seconds;
    this._onTick = onTick;
    this._onComplete = onComplete;
    this._paused = false;

    this._onTick(this._remaining, this._total);

    this._interval = setInterval(() => {
      if (this._paused) return;
      this._remaining--;
      this._onTick(this._remaining, this._total);

      if (this._remaining <= 0) {
        this.stop();
        if (this._onComplete) this._onComplete();
      }
    }, 1000);
  },

  pause() { this._paused = true; },
  resume() { this._paused = false; },
  isPaused() { return this._paused; },

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
};
