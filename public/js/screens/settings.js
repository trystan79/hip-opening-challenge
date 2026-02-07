const SettingsScreen = {
  _allUsers: [],

  async render(container) {
    container.innerHTML = Skeleton.homeScreen();

    const user = await API.getUser();
    const difficulty = user.difficulty || 'easy';
    const isAdmin = Session.isAdmin();
    if (isAdmin) {
      this._allUsers = await API.getUsers();
    }

    container.innerHTML = `
      <div class="screen-enter">
        <h2 style="margin-bottom:20px;">Settings</h2>

        <div class="card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <div style="width:48px;height:48px;">${MascotSVG.render(user.mascot || 'fox', 48)}</div>
            <div>
              <div style="font-weight:700;font-size:18px;">${this._escapeHtml(user.name)}</div>
              <div style="font-size:13px;color:var(--text-muted);">Level ${user.level} \u2022 ${user.xp} XP</div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom:16px;">Profile</h3>

          <div style="margin-bottom:16px;">
            <div class="section-title">Name</div>
            <input type="text" id="settings-name" value="${this._escapeHtml(user.name)}" maxlength="30">
          </div>

          <div style="margin-bottom:16px;">
            <div class="section-title">Your Guide</div>
            ${Mascot.renderSelector(user.mascot)}
          </div>

          <button class="btn btn-primary btn-full" onclick="SettingsScreen._saveProfile()">
            Save Changes
          </button>
        </div>

        <div class="card">
          <h3 style="margin-bottom:16px;">Appearance</h3>
          <div class="section-title">Theme</div>
          <div class="rating-group">
            ${[
              { key: 'system', label: 'System' },
              { key: 'light', label: 'Light' },
              { key: 'dark', label: 'Dark' }
            ].map(t => `
              <button class="rating-btn ${ThemeManager.get() === t.key ? 'selected' : ''}" data-theme="${t.key}"
                      onclick="SettingsScreen._setTheme('${t.key}')">
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom:16px;">Session Settings</h3>
          <div style="margin-bottom:12px;">
            <div class="section-title">Difficulty</div>
            <div class="rating-group">
              ${[
                { key: 'easy', label: 'Easy', desc: '2 min' },
                { key: 'medium', label: 'Medium', desc: '3.5 min' },
                { key: 'hard', label: 'Hard', desc: '5 min' }
              ].map(d => `
                <button class="rating-btn ${difficulty === d.key ? 'selected' : ''}" data-difficulty="${d.key}"
                        onclick="SettingsScreen._setDifficulty('${d.key}')">
                  ${d.label}<br><span style="font-size:11px;opacity:0.7;">${d.desc}</span>
                </button>
              `).join('')}
            </div>
            <p style="font-size:12px;color:var(--text-muted);margin-top:8px;">
              4-segment days use shorter holds. You can also adjust per-pose during a session.
            </p>
          </div>
          <button class="btn btn-ghost btn-full" style="margin-top:12px;color:var(--text-muted);font-size:13px;" onclick="SettingsScreen._resetTimeOverrides()">
            Reset All Per-Pose Time Overrides
          </button>
        </div>

        <div class="card">
          <h3 style="margin-bottom:16px;">Sound & Haptics</h3>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span>Sound Effects</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;">
              <input type="checkbox" id="sound-toggle" checked style="opacity:0;width:0;height:0;" onchange="SettingsScreen._toggleSound(this.checked)">
              <span style="position:absolute;cursor:pointer;inset:0;background:var(--border);border-radius:12px;transition:0.3s;"></span>
              <span style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:white;border-radius:50%;transition:0.3s;" id="sound-slider"></span>
            </label>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>Haptic Feedback</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;">
              <input type="checkbox" id="haptic-toggle" checked style="opacity:0;width:0;height:0;" onchange="SettingsScreen._toggleHaptics(this.checked)">
              <span style="position:absolute;cursor:pointer;inset:0;background:var(--border);border-radius:12px;transition:0.3s;"></span>
              <span style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:white;border-radius:50%;transition:0.3s;" id="haptic-slider"></span>
            </label>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom:12px;">Account</h3>
          <button class="btn btn-secondary btn-full" style="margin-bottom:8px;" onclick="SettingsScreen._changePin()">
            Change PIN
          </button>
          <button class="btn btn-ghost btn-full" style="color:var(--orange);" onclick="SettingsScreen._resetProgress()">
            Reset Progress
          </button>
        </div>

        ${isAdmin ? `
        <div class="card">
          <h3 style="margin-bottom:16px;">Admin - Manage Users</h3>
          ${this._allUsers.map(u => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;${u.id !== this._allUsers[this._allUsers.length-1].id ? 'border-bottom:1px solid var(--bg-input);' : ''}">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:24px;">${Mascot.getEmoji(u.mascot)}</span>
                <span style="font-weight:600;">${this._escapeHtml(u.name)}</span>
                ${u.is_admin ? '<span style="font-size:11px;color:var(--accent);font-weight:600;">ADMIN</span>' : ''}
              </div>
              ${!u.is_admin ? `
                <button class="btn btn-ghost" style="color:var(--red);padding:4px 12px;font-size:13px;" onclick="SettingsScreen._deleteUser(${u.id}, '${this._escapeHtml(u.name).replace(/'/g, "\\'")}')">
                  Delete
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <button class="btn btn-ghost btn-full" style="margin-top:8px;color:var(--red);" onclick="SettingsScreen._logout()">
          Switch User
        </button>
      </div>
    `;

    // Initialize toggle states from localStorage
    const soundOn = localStorage.getItem('hipChallenge_sound') !== '0';
    const hapticOn = localStorage.getItem('hipChallenge_haptics') !== '0';
    const soundToggle = document.getElementById('sound-toggle');
    const hapticToggle = document.getElementById('haptic-toggle');
    if (soundToggle) {
      soundToggle.checked = soundOn;
      if (soundOn) {
        document.getElementById('sound-slider').style.transform = 'translateX(20px)';
        document.getElementById('sound-slider').parentElement.querySelector('span:nth-child(2)').style.background = 'var(--accent)';
      }
    }
    if (hapticToggle) {
      hapticToggle.checked = hapticOn;
      if (hapticOn) {
        document.getElementById('haptic-slider').style.transform = 'translateX(20px)';
        document.getElementById('haptic-slider').parentElement.querySelector('span:nth-child(2)').style.background = 'var(--accent)';
      }
    }

    // Mascot selection handlers
    container.querySelectorAll('.mascot-option').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.mascot-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  },

  async _saveProfile() {
    const name = document.getElementById('settings-name').value.trim();
    const selectedMascot = document.querySelector('.mascot-option.selected');
    const mascot = selectedMascot ? selectedMascot.dataset.mascot : undefined;

    if (!name) return;

    await API.updateUser({ name, mascot });
    if (mascot) Session.setMascot(mascot);

    XPToast.show(0);
    const toast = document.querySelector('.xp-toast');
    if (toast) {
      toast.querySelector('.xp-amount').textContent = '\u2713';
      toast.querySelector('.xp-label').textContent = 'Saved!';
    }
  },

  _setTheme(theme) {
    ThemeManager.set(theme);
    document.querySelectorAll('.rating-btn[data-theme]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.theme === theme);
    });
  },

  async _setDifficulty(difficulty) {
    document.querySelectorAll('.rating-btn[data-difficulty]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.difficulty === difficulty);
    });
    await API.updateUser({ difficulty });
  },

  _changePin() {
    const newPin = prompt('Enter new 4-digit PIN:');
    if (newPin && /^\d{4}$/.test(newPin)) {
      const userId = Session.getUser();
      fetch(`/api/users/${userId}/pin?userId=${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: newPin })
      }).then(() => alert('PIN updated!'));
    } else if (newPin) {
      alert('PIN must be exactly 4 digits.');
    }
  },

  async _resetTimeOverrides() {
    if (confirm('Reset all per-pose time overrides? Poses will use the default time for your difficulty level.')) {
      const result = await API.resetTimeOverrides();
      XPToast.show(0);
      const toast = document.querySelector('.xp-toast');
      if (toast) {
        toast.querySelector('.xp-amount').textContent = '\u2713';
        toast.querySelector('.xp-label').textContent = `${result.deleted || 0} override${result.deleted === 1 ? '' : 's'} cleared`;
      }
    }
  },

  async _resetProgress() {
    if (confirm('Reset all progress? This cannot be undone. Your name and mascot will be kept.')) {
      await API.resetProgress();
      App.navigate('#/home');
    }
  },

  async _deleteUser(userId, name) {
    if (confirm(`Delete ${name}? This will remove all their progress.`)) {
      await API.deleteUser(userId);
      this.render(document.getElementById('screen-container'));
    }
  },

  _logout() {
    Session.clearUser();
    App.navigate('#/login');
  },

  _toggleSound(on) {
    SoundManager.setEnabled(on);
    localStorage.setItem('hipChallenge_sound', on ? '1' : '0');
    const slider = document.getElementById('sound-slider');
    if (slider) slider.style.transform = on ? 'translateX(20px)' : '';
    slider.parentElement.querySelector('span:nth-child(2)').style.background = on ? 'var(--accent)' : 'var(--border)';
    if (on) SoundManager.click();
  },

  _toggleHaptics(on) {
    SoundManager.setHapticsEnabled(on);
    localStorage.setItem('hipChallenge_haptics', on ? '1' : '0');
    const slider = document.getElementById('haptic-slider');
    if (slider) slider.style.transform = on ? 'translateX(20px)' : '';
    slider.parentElement.querySelector('span:nth-child(2)').style.background = on ? 'var(--accent)' : 'var(--border)';
  },

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
