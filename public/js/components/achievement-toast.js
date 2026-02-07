const AchievementToast = {
  _defs: {
    first_session: { icon: '\u2B50', title: 'First Session!', desc: 'You completed your first stretching session' },
    streak_3: { icon: '\uD83D\uDD25', title: '3-Day Streak!', desc: 'Three days in a row' },
    streak_7: { icon: '\uD83D\uDD25', title: 'Week Warrior!', desc: 'Seven days straight' },
    streak_14: { icon: '\uD83C\uDF1F', title: 'Fortnight Flex!', desc: '14-day streak achieved' },
    streak_21: { icon: '\uD83C\uDFC6', title: 'Legendary Streak!', desc: '21 days without missing' },
    level_5: { icon: '\uD83D\uDCAA', title: 'Level 5!', desc: 'You\'re getting serious' },
    level_10: { icon: '\uD83E\uDDD8', title: 'Level 10!', desc: 'Dedicated practitioner' },
    sessions_10: { icon: '\uD83C\uDFAF', title: '10 Sessions!', desc: 'Double digits' },
    sessions_25: { icon: '\uD83D\uDC8E', title: '25 Sessions!', desc: 'Quarter century of stretches' },
    cycle_complete: { icon: '\uD83C\uDFC5', title: 'Cycle Complete!', desc: 'Finished an entire routine cycle' }
  },

  show(key) {
    const def = this._defs[key];
    if (!def) return;

    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span style="font-size:28px;">${def.icon}</span>
      <div>
        <div style="font-weight:700;font-size:14px;">${def.title}</div>
        <div style="font-size:12px;opacity:0.8;">${def.desc}</div>
      </div>
    `;
    container.appendChild(toast);
    if (typeof SoundManager !== 'undefined') SoundManager.levelUp();
    setTimeout(() => toast.remove(), 4000);
  },

  showAll(keys) {
    if (!keys || keys.length === 0) return;
    keys.forEach((key, i) => {
      setTimeout(() => this.show(key), i * 1200);
    });
  }
};
