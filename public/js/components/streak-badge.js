const StreakBadge = {
  render(streak) {
    const active = streak > 0;
    return `
      <span class="streak-badge ${active ? 'active' : 'inactive'}">
        ${active ? '\uD83D\uDD25' : '\u26A1'} ${streak} day${streak !== 1 ? 's' : ''}
      </span>
    `;
  }
};
