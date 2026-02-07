const OnboardingScreen = {
  _step: 0,
  _selectedRoutine: null,
  _routines: [],

  async render(container) {
    this._step = 0;
    this._selectedRoutine = null;
    this._routines = [];

    try {
      this._routines = await API.getRoutines();
    } catch (e) { /* will show empty */ }

    this._renderStep(container);
  },

  _renderStep(container) {
    const steps = [
      this._renderWelcome.bind(this),
      this._renderPickRoutine.bind(this),
      this._renderAllSet.bind(this)
    ];

    container.innerHTML = `
      <div class="screen-enter onboarding-screen">
        <div class="onboarding-dots">
          ${[0, 1, 2].map(i => `<div class="onboarding-dot ${i === this._step ? 'active' : ''}"></div>`).join('')}
        </div>
        ${steps[this._step]()}
      </div>
    `;

    if (this._step === 1) {
      container.querySelectorAll('.onboarding-routine-card').forEach(card => {
        card.addEventListener('click', () => {
          this._selectedRoutine = parseInt(card.dataset.routineId);
          container.querySelectorAll('.onboarding-routine-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          const btn = document.getElementById('onboarding-continue');
          if (btn) btn.disabled = false;
        });
      });
    }
  },

  _renderWelcome() {
    const mascot = Session.getMascot ? Session.getMascot() : 'fox';
    return `
      <div style="text-align:center;padding-top:40px;">
        <div style="margin-bottom:16px;">${MascotSVG.render(mascot || 'fox', 100)}</div>
        <h1>Welcome!</h1>
        <p style="margin-top:8px;font-size:15px;">Your flexibility journey starts here</p>

        <div class="onboarding-features" style="margin-top:32px;text-align:left;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div style="font-size:24px;">\uD83E\uDDD8</div>
            <div>
              <div style="font-weight:700;font-size:14px;">Guided Sessions</div>
              <div style="font-size:12px;color:var(--text-muted);">Follow along with timed poses and breathing cues</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div style="font-size:24px;">\uD83D\uDD25</div>
            <div>
              <div style="font-weight:700;font-size:14px;">Streak Tracking</div>
              <div style="font-size:12px;color:var(--text-muted);">Build daily habits and watch your consistency grow</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div style="font-size:24px;">\u2B50</div>
            <div>
              <div style="font-weight:700;font-size:14px;">XP & Levels</div>
              <div style="font-size:12px;color:var(--text-muted);">Earn experience and level up as you progress</div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary btn-full" style="margin-top:24px;" onclick="OnboardingScreen._next()">
          Continue
        </button>
      </div>
    `;
  },

  _renderPickRoutine() {
    return `
      <div style="padding-top:24px;">
        <h2 style="text-align:center;">Pick a Routine</h2>
        <p style="text-align:center;margin-top:4px;font-size:13px;color:var(--text-muted);">You can add more later</p>

        <div style="margin-top:24px;">
          ${this._routines.map(r => `
            <div class="onboarding-routine-card ${this._selectedRoutine === r.id ? 'selected' : ''}" data-routine-id="${r.id}">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:12px;height:12px;border-radius:50%;background:${r.color};flex-shrink:0;"></div>
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:15px;">${r.name}</div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${r.description || ''}</div>
                  <span class="badge" style="background:${r.color}20;color:${r.color};margin-top:6px;">${r.total_days} days</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-primary btn-full" style="margin-top:24px;" id="onboarding-continue"
                ${this._selectedRoutine ? '' : 'disabled'} onclick="OnboardingScreen._joinAndNext()">
          Continue
        </button>
      </div>
    `;
  },

  _renderAllSet() {
    const mascot = Session.getMascot ? Session.getMascot() : 'fox';
    return `
      <div style="text-align:center;padding-top:40px;">
        <div class="mascot-container mascot-celebrating">
          ${MascotSVG.render(mascot || 'fox', 100)}
        </div>
        <h1 style="margin-top:12px;">You're All Set!</h1>
        <p style="margin-top:8px;font-size:14px;">Your flexibility journey has begun</p>

        <div class="endowed-progress-card" style="margin-top:24px;">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px;">Your progress has already begun</div>
          <div class="progress-bar" style="height:10px;">
            <div class="progress-bar-fill" style="width:5%;background:linear-gradient(90deg, var(--green), var(--accent));"></div>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">5% — First step complete!</div>
        </div>

        <button class="btn btn-success btn-full" style="margin-top:32px;" onclick="App.navigate('#/home')">
          Start Stretching
        </button>
      </div>
    `;
  },

  _next() {
    this._step++;
    const container = document.getElementById('screen-container');
    this._renderStep(container);
  },

  async _joinAndNext() {
    if (!this._selectedRoutine) return;
    try {
      await API.joinRoutine(this._selectedRoutine);
    } catch (e) {
      console.error('Failed to join routine:', e);
    }
    this._step++;
    const container = document.getElementById('screen-container');
    this._renderStep(container);
  }
};
