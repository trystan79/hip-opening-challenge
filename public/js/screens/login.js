const LoginScreen = {
  async render(container) {
    container.innerHTML = '<div class="screen-enter" style="text-align:center;padding-top:40px;"><p>Loading...</p></div>';

    try {
      const users = await API.getUsers();
      const atLimit = users.length >= 10;

      container.innerHTML = `
        <div class="screen-enter" style="padding-top:40px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:64px;margin-bottom:12px;">\uD83E\uDDD8</div>
            <h1>Hip Opening</h1>
            <h1 style="color:var(--accent);">Challenge</h1>
            <p style="margin-top:8px;">Your hip flexibility journey</p>
          </div>

          ${users.length > 0 ? `
            <div class="section">
              <div class="section-title">Who's stretching?</div>
              ${users.map(u => `
                <div class="card" style="display:flex;align-items:center;gap:14px;cursor:pointer;margin-bottom:8px;" onclick="LoginScreen._selectUser(${u.id}, ${u.has_pin})">
                  <div style="font-size:32px;">${Mascot.getEmoji(u.mascot)}</div>
                  <div style="flex:1;">
                    <div style="font-weight:700;">${this._escapeHtml(u.name)}${u.is_admin ? ' <span style="font-size:11px;color:var(--accent);">admin</span>' : ''}</div>
                    <div style="font-size:12px;color:var(--text-muted);">Level ${u.level} \u2022 ${u.streak_count} day streak</div>
                  </div>
                  ${u.has_pin ? '<div style="color:var(--text-muted);">\uD83D\uDD12</div>' : ''}
                  <div style="color:var(--text-muted);font-size:20px;">\u203A</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${atLimit ? `
            <p style="text-align:center;font-size:13px;color:var(--text-muted);margin-top:16px;">Maximum 10 users reached</p>
          ` : `
            <button class="btn btn-primary btn-full" onclick="App.navigate('#/new-user')" style="margin-top:16px;">
              + New Challenger
            </button>
          `}
        </div>

        <div class="pin-modal" id="pin-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:200;align-items:center;justify-content:center;">
          <div class="card" style="width:300px;text-align:center;">
            <h3 style="margin-bottom:16px;">Enter PIN</h3>
            <input type="password" id="pin-input" maxlength="4" pattern="[0-9]*" inputmode="numeric"
                   placeholder="4-digit PIN" style="text-align:center;font-size:24px;letter-spacing:8px;">
            <div id="pin-error" style="color:var(--red);font-size:13px;margin-top:8px;display:none;"></div>
            <div style="display:flex;gap:8px;margin-top:16px;">
              <button class="btn btn-secondary" style="flex:1;" onclick="LoginScreen._closePin()">Cancel</button>
              <button class="btn btn-primary" style="flex:1;" onclick="LoginScreen._submitPin()">Enter</button>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `
        <div class="screen-enter" style="text-align:center;padding-top:60px;">
          <h2>Connection Error</h2>
          <p style="margin-top:8px;">Could not load profiles.</p>
          <button class="btn btn-primary" onclick="location.reload()" style="margin-top:24px;">Try Again</button>
        </div>
      `;
    }
  },

  _pendingUserId: null,

  async _selectUser(userId, hasPin) {
    if (hasPin) {
      this._pendingUserId = userId;
      const modal = document.getElementById('pin-modal');
      modal.style.display = 'flex';
      document.getElementById('pin-input').value = '';
      document.getElementById('pin-input').focus();
      document.getElementById('pin-error').style.display = 'none';
    } else {
      // Still call login API to get admin status
      try {
        const result = await API.login(userId, '');
        this._loginUser(userId, result.isAdmin);
      } catch {
        this._loginUser(userId);
      }
    }
  },

  _closePin() {
    document.getElementById('pin-modal').style.display = 'none';
    this._pendingUserId = null;
  },

  async _submitPin() {
    const pin = document.getElementById('pin-input').value;
    try {
      const result = await API.login(this._pendingUserId, pin);
      if (result.success) {
        this._loginUser(this._pendingUserId, result.isAdmin);
      }
    } catch {
      document.getElementById('pin-error').textContent = 'Incorrect PIN';
      document.getElementById('pin-error').style.display = 'block';
      document.getElementById('pin-input').value = '';
      document.getElementById('pin-input').focus();
    }
  },

  _loginUser(userId, isAdmin = false) {
    Session.setUser(userId);
    Session.setAdmin(isAdmin);
    App.navigate('#/home');
  },

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
