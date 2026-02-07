const XPToast = {
  show(xp, timeBonus) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    const tagHtml = timeBonus > 0
      ? `<span class="xp-time-tag bonus">+${timeBonus} time</span>`
      : timeBonus < 0
        ? `<span class="xp-time-tag penalty">${timeBonus}</span>`
        : '';
    toast.innerHTML = `
      <span class="xp-amount">+${xp}</span>
      <span class="xp-label">XP Earned${tagHtml}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  showBonus(xp, type) {
    const labels = { critical: 'Critical Stretch!', bonus: 'Bonus!', lucky: 'Lucky!' };
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'xp-toast bonus-toast';
    toast.innerHTML = `
      <span class="xp-amount bonus-glow">+${xp}</span>
      <span class="xp-label">${labels[type] || 'Bonus XP'}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  showLevelUp(level) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'level-toast';
    toast.innerHTML = `
      <div style="font-size:14px;font-weight:600;margin-bottom:4px;">Level Up!</div>
      <div class="level-number">${level}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
};
