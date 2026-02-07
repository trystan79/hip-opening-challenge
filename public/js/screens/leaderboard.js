const LeaderboardScreen = {
  _data: [],
  _tab: 'streak',

  async render(container) {
    container.innerHTML = Skeleton.homeScreen();

    try {
      this._data = await API.getLeaderboard();
    } catch (e) {
      container.innerHTML = `<div class="card" style="text-align:center;margin-top:40px;">
        <p style="color:var(--red);">Failed to load leaderboard.</p>
        <button class="btn btn-secondary" style="margin-top:12px;" onclick="App.navigate('#/home')">Go Home</button>
      </div>`;
      return;
    }

    this._tab = 'streak';
    this._renderContent(container);
  },

  _renderContent(container) {
    const sorted = this._getSorted();
    const currentUserId = parseInt(Session.getUser());
    const top3 = sorted.slice(0, 3);
    const rest = sorted.slice(3);
    const currentUserRank = sorted.findIndex(u => u.id === currentUserId) + 1;

    container.innerHTML = `
      <div class="screen-enter">
        <h2 style="margin-bottom:16px;">Leaderboard</h2>

        <div class="progression-tabs" style="margin-bottom:20px;">
          ${['streak', 'xp', 'level'].map(t => `
            <button class="progression-tab ${this._tab === t ? 'active' : ''}"
                    onclick="LeaderboardScreen._switchTab('${t}')">
              ${{ streak: 'Streak', xp: 'XP', level: 'Level' }[t]}
            </button>
          `).join('')}
        </div>

        ${sorted.length === 0 ? `
          <div class="empty-state">
            <div style="font-size:48px;margin-bottom:12px;">🏆</div>
            <p>No users yet. Start stretching!</p>
          </div>
        ` : `
          ${this._renderPodium(top3, currentUserId)}

          <div style="margin-top:20px;">
            ${rest.map((u, i) => this._renderRow(u, i + 4, currentUserId)).join('')}
          </div>

          ${currentUserRank > 3 ? `
            <div class="card leaderboard-current-user" style="position:sticky;bottom:calc(var(--nav-height) + var(--safe-bottom) + 8px);margin-top:12px;border:2px solid var(--accent);">
              ${this._renderRow(sorted[currentUserRank - 1], currentUserRank, currentUserId)}
            </div>
          ` : ''}
        `}
      </div>
    `;
  },

  _renderPodium(top3, currentUserId) {
    if (top3.length === 0) return '';

    const positions = [];
    // Order: 2nd, 1st, 3rd for visual layout
    if (top3[1]) positions.push({ user: top3[1], rank: 2, class: 'silver' });
    if (top3[0]) positions.push({ user: top3[0], rank: 1, class: 'gold' });
    if (top3[2]) positions.push({ user: top3[2], rank: 3, class: 'bronze' });

    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

    return `
      <div class="podium">
        ${positions.map(p => `
          <div class="podium-item ${p.class} ${p.user.id === currentUserId ? 'current-user' : ''}">
            <div class="rank-badge ${p.class}">${medals[p.rank]}</div>
            <div style="font-size:36px;margin:8px 0;">${Mascot.getEmoji(p.user.mascot)}</div>
            <div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${this._escapeHtml(p.user.name)}</div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:2px;">${this._getStatDisplay(p.user)}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  _renderRow(user, rank, currentUserId) {
    const isCurrentUser = user.id === currentUserId;
    return `
      <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
        <div class="leaderboard-rank">${rank}</div>
        <div style="font-size:24px;">${Mascot.getEmoji(user.mascot)}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${this._escapeHtml(user.name)}${isCurrentUser ? ' <span style="font-size:11px;color:var(--accent);">(you)</span>' : ''}</div>
          <div style="font-size:12px;color:var(--text-muted);">Lvl ${user.level} &middot; ${user.total_sessions} sessions</div>
        </div>
        <div style="font-weight:700;font-size:15px;color:var(--accent);">${this._getStatDisplay(user)}</div>
      </div>
    `;
  },

  _getSorted() {
    const data = [...this._data];
    switch (this._tab) {
      case 'streak':
        return data.sort((a, b) => b.streak_count - a.streak_count || b.xp - a.xp);
      case 'xp':
        return data.sort((a, b) => b.xp - a.xp || b.level - a.level);
      case 'level':
        return data.sort((a, b) => b.level - a.level || b.xp - a.xp);
      default:
        return data;
    }
  },

  _getStatDisplay(user) {
    switch (this._tab) {
      case 'streak': return `${user.streak_count}d streak`;
      case 'xp': return `${user.xp} XP`;
      case 'level': return `Lvl ${user.level}`;
      default: return '';
    }
  },

  _switchTab(tab) {
    this._tab = tab;
    this._renderContent(document.getElementById('screen-container'));
  },

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
