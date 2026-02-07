const NavBar = {
  show() { document.getElementById('nav-bar').classList.remove('hidden'); },
  hide() { document.getElementById('nav-bar').classList.add('hidden'); },

  render() {
    const hash = window.location.hash || '#/home';
    const route = hash.replace('#/', '').split('/')[0];
    const nav = document.getElementById('nav-bar');

    const items = [
      { route: 'home', icon: '\u2302', label: 'Home' },
      { route: 'path', icon: '\u2261', label: 'Journey' },
      { route: 'progress', icon: '\u2197', label: 'Progress' },
      { route: 'leaderboard', icon: '\uD83C\uDFC6', label: 'Board' },
      { route: 'settings', icon: '\u2699', label: 'Settings' }
    ];

    nav.innerHTML = items.map(item => `
      <button class="nav-item ${route === item.route ? 'active' : ''}"
              onclick="App.navigate('#/${item.route}')">
        <span class="nav-icon">${item.icon}</span>
        ${item.label}
      </button>
    `).join('');
  }
};
