const PathScreen = {
  async render(container) {
    container.innerHTML = Skeleton.pathScreen();

    const [days, user] = await Promise.all([API.getDays(), API.getUser()]);
    const cycle = user.current_cycle || 1;

    const weeks = [
      { num: 1, title: 'Foundational', subtitle: 'Build your base', days: days.filter(d => d.week === 1) },
      { num: 2, title: 'Intermediate', subtitle: 'Deepen your practice', days: days.filter(d => d.week === 2) },
      { num: 3, title: 'Advanced', subtitle: 'Full integration', days: days.filter(d => d.week === 3) }
    ];

    const totalCompleted = days.filter(d => d.status === 'completed').length;
    const totalDays = days.length;

    container.innerHTML = `
      <div class="screen-enter path-container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
          <h2>Your Journey</h2>
          <span class="badge badge-accent">Cycle ${cycle} \u2022 ${totalCompleted}/${totalDays}</span>
        </div>

        <div class="progress-bar" style="margin-bottom:24px;">
          <div class="progress-bar-fill" style="width:${(totalCompleted / totalDays) * 100}%"></div>
        </div>

        ${weeks.map(week => `
          <div class="path-week">
            <div class="path-week-header">
              <div class="path-week-number week-${week.num}">${week.num}</div>
              <div>
                <div class="path-week-title">${week.title}</div>
                <div class="path-week-subtitle">${week.subtitle}</div>
              </div>
            </div>

            <div class="path-days">
              ${week.days.map(day => {
                const statusIcon = day.status === 'completed' ? '\u2713' : day.status === 'available' ? '\u25B6' : '\uD83D\uDD12';
                const poseNames = day.poses.map(p => p.name).join(' + ');
                return `
                  <div class="path-day ${day.status}" onclick="${day.status !== 'locked' ? `App.navigate('#/session/${day.id}')` : ''}">
                    <div class="day-number">${day.id}</div>
                    <div class="day-info">
                      <div class="day-theme">${day.theme}</div>
                      <div class="day-poses">${poseNames}</div>
                    </div>
                    <div class="day-status-icon">${statusIcon}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
