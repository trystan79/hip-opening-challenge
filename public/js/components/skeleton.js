const Skeleton = {
  _shimmer(height, width, extraClass) {
    const w = width ? `width:${width};` : '';
    const h = height ? `height:${height};` : '';
    return `<div class="skeleton ${extraClass || ''}" style="${h}${w}"></div>`;
  },

  homeScreen() {
    return `
      <div class="screen-enter" style="padding-top:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <div style="flex:1;">
            ${this._shimmer('24px', '60%', 'skeleton-text')}
            <div style="margin-top:8px;">${this._shimmer('14px', '40%', 'skeleton-text')}</div>
          </div>
          ${this._shimmer('32px', '80px', 'skeleton-text')}
        </div>
        ${this._shimmer('80px', '100%', 'skeleton-circle')}
        ${this.card()}
        ${this.card()}
        ${this.statGrid()}
      </div>
    `;
  },

  sessionIntro() {
    return `
      <div class="session-player" style="padding-top:40px;text-align:center;">
        ${this._shimmer('28px', '40%', 'skeleton-text')}
        <div style="margin:16px auto 0;">${this._shimmer('32px', '70%', 'skeleton-text')}</div>
        <div style="margin:12px auto 0;">${this._shimmer('14px', '90%', 'skeleton-text')}</div>
        <div style="margin-top:24px;">
          ${this.poseList()}
        </div>
      </div>
    `;
  },

  pathScreen() {
    return `
      <div class="screen-enter">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
          ${this._shimmer('24px', '50%', 'skeleton-text')}
          ${this._shimmer('24px', '80px', 'skeleton-text')}
        </div>
        ${this._shimmer('8px', '100%', 'skeleton-text')}
        <div style="margin-top:24px;">
          ${this.card()}
          ${this.card()}
          ${this.card()}
        </div>
      </div>
    `;
  },

  progressScreen() {
    return `
      <div class="screen-enter">
        ${this._shimmer('24px', '50%', 'skeleton-text')}
        <div style="margin-top:20px;">${this.statGrid()}</div>
        <div style="margin-top:16px;">${this.card()}</div>
        <div style="margin-top:16px;">${this.statGrid()}</div>
        <div style="margin-top:16px;">${this.card()}</div>
      </div>
    `;
  },

  card() {
    return `
      <div class="skeleton skeleton-card" style="margin-bottom:16px;border-radius:var(--radius-lg);"></div>
    `;
  },

  statGrid() {
    return `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div class="skeleton skeleton-stat" style="border-radius:var(--radius-md);"></div>
        <div class="skeleton skeleton-stat" style="border-radius:var(--radius-md);"></div>
        <div class="skeleton skeleton-stat" style="border-radius:var(--radius-md);"></div>
      </div>
    `;
  },

  poseList() {
    return Array(3).fill(0).map(() => `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <div class="skeleton skeleton-circle" style="width:32px;height:32px;flex-shrink:0;"></div>
        <div style="flex:1;">
          ${this._shimmer('14px', '70%', 'skeleton-text')}
          <div style="margin-top:6px;">${this._shimmer('12px', '50%', 'skeleton-text')}</div>
        </div>
      </div>
    `).join('');
  }
};
