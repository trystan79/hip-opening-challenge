const NewUserScreen = {
  _selectedMascot: 'fox',

  render(container) {
    this._selectedMascot = 'fox';

    container.innerHTML = `
      <div class="screen-enter" style="padding-top:24px;">
        <button class="btn btn-ghost" onclick="App.navigate('#/login')" style="margin-bottom:16px;">\u2190 Back</button>

        <h2 style="margin-bottom:4px;">Create Account</h2>
        <p style="margin-bottom:24px;">Set up your profile, then pick a routine</p>

        <div class="section">
          <div class="section-title">Your Name</div>
          <input type="text" id="new-name" placeholder="Enter your name" maxlength="30">
        </div>

        <div class="section">
          <div class="section-title">Choose Your Guide</div>
          ${Mascot.renderSelector(this._selectedMascot)}
        </div>

        <div class="section">
          <div class="section-title">Set a 4-digit PIN</div>
          <input type="password" id="new-pin" maxlength="4" pattern="[0-9]*" inputmode="numeric"
                 placeholder="4-digit PIN" style="text-align:center;font-size:20px;letter-spacing:6px;">
        </div>

        <div id="create-error" style="color:var(--red);font-size:13px;margin-bottom:12px;display:none;"></div>

        <button class="btn btn-primary btn-full" onclick="NewUserScreen._create()">
          Create Account
        </button>
      </div>
    `;

    // Mascot selection
    container.querySelectorAll('.mascot-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this._selectedMascot = opt.dataset.mascot;
        container.querySelectorAll('.mascot-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  },

  async _create() {
    const name = document.getElementById('new-name').value.trim();
    const pin = document.getElementById('new-pin').value;
    const errorEl = document.getElementById('create-error');

    if (!name) {
      errorEl.textContent = 'Please enter your name';
      errorEl.style.display = 'block';
      return;
    }
    if (!pin || !/^\d{4}$/.test(pin)) {
      errorEl.textContent = 'PIN must be exactly 4 digits';
      errorEl.style.display = 'block';
      return;
    }

    try {
      const user = await API.createUser(name, this._selectedMascot, pin);
      Session.setUser(user.id);
      Session.setMascot(user.mascot);
      App.navigate('#/routines');
    } catch (err) {
      errorEl.textContent = err.message.includes('10') ? 'Maximum 10 users reached.' : 'Failed to create account. Try again.';
      errorEl.style.display = 'block';
    }
  }
};
