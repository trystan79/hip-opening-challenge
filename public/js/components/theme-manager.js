const ThemeManager = {
  STORAGE_KEY: 'hipChallenge_theme',
  META_COLORS: { dark: '#0B1D1C', light: '#F7F8F6' },

  init() {
    this.apply(this.get());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.get() === 'system') this._updateMeta();
    });
  },

  get() {
    return localStorage.getItem(this.STORAGE_KEY) || 'system';
  },

  set(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.apply(theme);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this._updateMeta();
  },

  _getEffective(theme) {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return theme;
  },

  _updateMeta() {
    const effective = this._getEffective(this.get());
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', this.META_COLORS[effective]);
  }
};
