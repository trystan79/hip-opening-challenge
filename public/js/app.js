const App = {
  init() {
    // Initialize sound/haptic state from localStorage
    SoundManager.setEnabled(localStorage.getItem('hipChallenge_sound') !== '0');
    SoundManager.setHapticsEnabled(localStorage.getItem('hipChallenge_haptics') !== '0');

    window.addEventListener('hashchange', () => this._route());

    if (!Session.isLoggedIn()) {
      window.location.hash = '#/login';
    } else if (!window.location.hash || window.location.hash === '#/login' || window.location.hash === '#/new-user' || window.location.hash === '#/onboarding') {
      window.location.hash = '#/home';
    } else {
      this._route();
    }
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  async _route() {
    const hash = window.location.hash || '#/login';
    const container = document.getElementById('screen-container');
    const [hashPath, queryStr] = hash.replace('#/', '').split('?');
    const parts = hashPath.split('/');
    const route = parts[0];
    const param = parts[1];
    const query = {};
    if (queryStr) queryStr.split('&').forEach(kv => { const [k, v] = kv.split('='); query[k] = v; });

    try {
      if (route === 'login') {
        NavBar.hide();
        await LoginScreen.render(container);
        return;
      }
      if (route === 'new-user') {
        NavBar.hide();
        NewUserScreen.render(container);
        return;
      }
      if (route === 'onboarding') {
        NavBar.hide();
        await OnboardingScreen.render(container);
        return;
      }

      if (!Session.isLoggedIn()) {
        window.location.hash = '#/login';
        return;
      }

      if (route === 'session' && param) {
        NavBar.hide();
        await SessionPlayer.render(container, parseInt(param), query.shuffle === '1');
      } else {
        NavBar.show();
        NavBar.render();

        switch (route) {
          case 'home': await HomeScreen.render(container); break;
          case 'path': await PathScreen.render(container); break;
          case 'progress': await ProgressScreen.render(container); break;
          case 'routines': await RoutinesScreen.render(container); break;
          case 'settings': await SettingsScreen.render(container); break;
          default: await HomeScreen.render(container);
        }
      }
    } catch (err) {
      console.error('Navigation error:', err);
      container.innerHTML = `
        <div class="card" style="text-align:center;margin-top:40px;">
          <div style="color:var(--red);font-weight:700;margin-bottom:12px;">Something went wrong</div>
          <p style="color:var(--text-secondary);margin-bottom:16px;">${err.message}</p>
          <button class="btn btn-secondary" onclick="App.navigate('#/home')">Go Home</button>
        </div>
      `;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Global haptic feedback on button/nav taps
  document.addEventListener('click', (e) => {
    if (localStorage.getItem('hipChallenge_haptics') === '0') return;
    if (e.target.closest('.btn') || e.target.closest('.nav-item')) {
      if (navigator.vibrate) navigator.vibrate(8);
    }
  });
});
