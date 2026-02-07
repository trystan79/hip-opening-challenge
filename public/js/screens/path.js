const PathScreen = {
  async render(container) {
    container.innerHTML = Skeleton.pathScreen();

    const [routines, user] = await Promise.all([API.getRoutines(), API.getUser()]);
    const active = routines.filter(r => r.enrolled && r.is_active);

    if (active.length === 0) {
      container.innerHTML = `
        <div class="screen-enter">
          <h2 style="margin-bottom:16px;">Your Journey</h2>
          <div class="empty-state">
            <p>No active routines yet.</p>
            <button class="btn btn-primary" style="margin-top:16px;" onclick="App.navigate('#/routines')">Browse Routines</button>
          </div>
        </div>
      `;
      return;
    }

    // Fetch days for all active routines in parallel
    const routineDays = await Promise.all(active.map(r => API.getDays(r.id)));

    const sections = active.map((routine, idx) => {
      const days = routineDays[idx];
      const cycle = routine.current_cycle || 1;
      const totalCompleted = days.filter(d => d.status === 'completed').length;
      const totalDays = days.length;

      // Group days by week dynamically
      const weekMap = {};
      days.forEach(d => {
        if (!weekMap[d.week]) weekMap[d.week] = [];
        weekMap[d.week].push(d);
      });
      const weekNums = Object.keys(weekMap).map(Number).sort((a, b) => a - b);

      return `
        <div style="margin-bottom:32px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h2 style="border-left:4px solid ${routine.color};padding-left:10px;">${routine.name}</h2>
            <span class="badge badge-accent">Cycle ${cycle} &bull; ${totalCompleted}/${totalDays}</span>
          </div>

          <div class="progress-bar" style="margin-bottom:20px;">
            <div class="progress-bar-fill" style="width:${(totalCompleted / totalDays) * 100}%"></div>
          </div>

          ${weekNums.map(wk => `
            <div class="path-week">
              <div class="path-week-header">
                <div class="path-week-number week-${Math.min(wk, 3)}">${wk}</div>
                <div>
                  <div class="path-week-title">Week ${wk}</div>
                  <div class="path-week-subtitle">${weekMap[wk].length} days</div>
                </div>
              </div>

              <div class="path-days">
                ${weekMap[wk].map(day => {
                  const statusIcon = day.status === 'completed' ? '\u2713' : day.status === 'available' ? '\u25B6' : '\uD83D\uDD12';
                  const poseNames = day.poses.map(p => p.name).join(' + ');
                  return `
                    <div class="path-day ${day.status}" onclick="${day.status !== 'locked' ? `App.navigate('#/session/${day.id}')` : ''}">
                      <div class="day-number">${day.sort_order || day.id}</div>
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
    });

    container.innerHTML = `
      <div class="screen-enter path-container">
        ${sections.join('')}
      </div>
    `;
  }
};
