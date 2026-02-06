const XPToast = {
  show(xp) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.innerHTML = `
      <span class="xp-amount">+${xp}</span>
      <span class="xp-label">XP Earned</span>
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
