const BreathingGuide = {
  _interval: null,

  render(container) {
    const inhale = 4;
    const exhale = 8;
    const total = inhale + exhale;
    container.innerHTML = `
      <div class="breathing-container">
        <div class="breathing-circle" style="animation-duration: ${total}s"></div>
        <div class="breathing-text" id="breathing-phase">Breathe in... ${inhale}</div>
      </div>
    `;
    this._startCycle(inhale, exhale);
  },

  _startCycle(inhale, exhale) {
    this.stop();
    const total = inhale + exhale;
    let tick = 0;
    const el = document.getElementById('breathing-phase');

    const update = () => {
      const pos = tick % total;
      if (pos < inhale) {
        const countdown = inhale - pos;
        if (el) el.textContent = `Breathe in... ${countdown}`;
      } else {
        const countdown = exhale - (pos - inhale);
        if (el) el.textContent = `Breathe out... ${countdown}`;
      }
      tick++;
    };

    update();
    this._interval = setInterval(update, 1000);
  },

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
};
