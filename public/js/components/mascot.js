const Mascot = {
  types: {
    fox: { emoji: '\uD83E\uDD8A', name: 'Fox' },
    cat: { emoji: '\uD83D\uDC31', name: 'Cat' },
    octopus: { emoji: '\uD83D\uDC19', name: 'Octopus' },
    monkey: { emoji: '\uD83D\uDC35', name: 'Monkey' }
  },

  moods: {
    happy: ['Great to see you!', 'Ready to stretch?', 'Let\'s get moving!'],
    encouraging: ['You\'re doing amazing!', 'Keep breathing!', 'Almost there!'],
    celebrating: ['Incredible work!', 'You crushed it!', 'Flexibility unlocked!'],
    exercising: ['Hold steady...', 'Breathe into it...', 'Feel the stretch...'],
    proud: ['Look at that streak!', 'You\'re getting more flexible!', 'Consistency pays off!'],
    resting: ['Rest up!', 'See you tomorrow!', 'Recovery is key!']
  },

  getEmoji(type) {
    return (this.types[type] || this.types.fox).emoji;
  },

  getName(type) {
    return (this.types[type] || this.types.fox).name;
  },

  getMessage(mood) {
    const messages = this.moods[mood] || this.moods.happy;
    return messages[Math.floor(Math.random() * messages.length)];
  },

  render(type, mood = 'happy', size = 80) {
    const message = this.getMessage(mood);
    const svg = MascotSVG.render(type || 'fox', size);
    return `
      <div class="mascot-container mascot-${mood}">
        ${svg}
        <div style="font-size:14px;color:var(--text-secondary);font-style:italic;margin-top:8px;">"${message}"</div>
      </div>
    `;
  },

  renderSelector(selected = 'fox') {
    return `
      <div class="mascot-grid">
        ${Object.entries(this.types).map(([key, val]) => `
          <div class="mascot-option ${key === selected ? 'selected' : ''}" data-mascot="${key}">
            <div style="width:48px;height:48px;">${MascotSVG.render(key, 48)}</div>
            <span class="mascot-name">${val.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
};
