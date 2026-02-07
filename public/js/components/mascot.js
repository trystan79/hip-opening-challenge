const Mascot = {
  types: {
    fox: { emoji: '\uD83E\uDD8A', name: 'Fox' },
    cat: { emoji: '\uD83D\uDC31', name: 'Cat' },
    octopus: { emoji: '\uD83D\uDC19', name: 'Octopus' },
    monkey: { emoji: '\uD83D\uDC35', name: 'Monkey' }
  },

  moods: {
    happy: ['Great to see you!', 'Ready to stretch?', 'Let\'s get moving!', 'Today\'s going to be great!', 'Glad you\'re here!', 'Let\'s loosen up!', 'Your body will thank you!'],
    encouraging: ['You\'re doing amazing!', 'Keep breathing!', 'Almost there!', 'One breath at a time!', 'You\'ve got this!', 'Stay with it!', 'Feel the progress!'],
    celebrating: ['Incredible work!', 'You crushed it!', 'Flexibility unlocked!', 'That was awesome!', 'What a session!', 'You\'re unstoppable!', 'Champion stretch!'],
    exercising: ['Hold steady...', 'Breathe into it...', 'Feel the stretch...', 'Relax and melt in...', 'Soften into it...', 'Let gravity help...'],
    proud: ['Look at that streak!', 'You\'re getting more flexible!', 'Consistency pays off!', 'Your dedication shows!', 'Building something great!', 'Habits are forming!', 'You inspire me!'],
    resting: ['Rest up!', 'See you tomorrow!', 'Recovery is key!', 'Your muscles are growing!', 'Enjoy the rest day!', 'Come back refreshed!'],
    streak_warning: ['Don\'t let the streak slip!', 'Your streak needs you today!', 'Just one session to keep it going!', 'You\'ve worked so hard for this streak!'],
    milestone: ['What an achievement!', 'You should be so proud!', 'A true milestone!', 'Legendary dedication!']
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

  getContextMessage(user, routines) {
    const hour = new Date().getHours();
    const today = new Date().toISOString().split('T')[0];
    const didSessionToday = user.last_session_date === today;

    if (didSessionToday) {
      const doneMessages = ['You already stretched today!', 'Session done \u2014 enjoy the rest!', 'Great work today!', 'Relax, you earned it!'];
      return doneMessages[Math.floor(Math.random() * doneMessages.length)];
    }

    if (user.streak_count >= 7) {
      return this.getMessage('streak_warning');
    }

    if (hour < 9) {
      const morningMsgs = ['Good morning! Early stretcher!', 'Rise and stretch!', 'Morning flexibility boost!'];
      return morningMsgs[Math.floor(Math.random() * morningMsgs.length)];
    } else if (hour >= 21) {
      const nightMsgs = ['Evening stretch session?', 'Wind down with a stretch!', 'Stretch before sleep!'];
      return nightMsgs[Math.floor(Math.random() * nightMsgs.length)];
    }

    return this.getMessage('happy');
  },

  render(type, mood = 'happy', size = 80, customMessage) {
    const message = customMessage || this.getMessage(mood);
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
