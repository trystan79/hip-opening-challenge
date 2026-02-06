const BreathingGuide = {
  _interval: null,

  render(container, pattern = { inhale: 4, hold: 0, exhale: 6 }) {
    const total = pattern.inhale + pattern.hold + pattern.exhale;
    container.innerHTML = `
      <div class="breathing-container">
        <div class="breathing-circle" style="animation-duration: ${total}s"></div>
        <div class="breathing-text" id="breathing-phase">Breathe in...</div>
      </div>
    `;
    this._startCycle(pattern);
  },

  _startCycle(pattern) {
    this.stop();
    const phases = [];
    for (let i = 0; i < pattern.inhale; i++) phases.push('Breathe in...');
    for (let i = 0; i < pattern.hold; i++) phases.push('Hold...');
    for (let i = 0; i < pattern.exhale; i++) phases.push('Breathe out...');

    let idx = 0;
    const el = document.getElementById('breathing-phase');
    if (el) el.textContent = phases[0];

    this._interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      const el = document.getElementById('breathing-phase');
      if (el) el.textContent = phases[idx];
    }, 1000);
  },

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
};
