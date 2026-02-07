const ProgressScreen = {
  async render(container) {
    container.innerHTML = Skeleton.progressScreen();

    const data = await API.getProgress();
    const user = data.user;
    const cyclePercent = data.totalDays > 0 ? Math.round((data.daysCompleted / data.totalDays) * 100) : 0;

    if (data.totalSessions === 0) {
      container.innerHTML = `
        <div class="screen-enter">
          <h2 style="margin-bottom:20px;">Your Progress</h2>
          <div class="empty-state">
            <div style="font-size:48px;margin-bottom:12px;">\uD83D\uDCCA</div>
            <h3>No Data Yet</h3>
            <p style="font-size:13px;margin-top:4px;">Complete your first session to start tracking</p>
            <button class="btn btn-primary" style="margin-top:16px;" onclick="App.navigate('#/home')">Go to Session</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="screen-enter">
        <h2 style="margin-bottom:20px;">Your Progress</h2>

        <div class="card" style="display:flex;align-items:center;gap:20px;">
          ${ProgressRing.render(cyclePercent, 80, 6, 'var(--accent)', `<span style="font-size:18px;">${cyclePercent}%</span>`)}
          <div style="flex:1;">
            <div style="font-size:16px;font-weight:700;">Cycle ${data.currentCycle || 1}</div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">${data.daysCompleted}/${data.totalDays} days complete</div>
            <div style="display:flex;gap:16px;margin-top:8px;">
              <div>
                <div style="font-size:20px;font-weight:800;color:var(--yellow);">${user.streak_count}</div>
                <div style="font-size:11px;color:var(--text-muted);">Streak</div>
              </div>
              <div>
                <div style="font-size:20px;font-weight:800;color:var(--purple);">${user.longest_streak}</div>
                <div style="font-size:11px;color:var(--text-muted);">Best</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top:16px;">
          <h3 style="margin-bottom:12px;">Lifetime Stats</h3>
          <div class="lifetime-stat-row">
            <span class="stat-key">Total Sessions</span>
            <span class="stat-val" style="color:var(--orange);">${data.totalSessions}</span>
          </div>
          <div class="lifetime-stat-row">
            <span class="stat-key">Total XP</span>
            <span class="stat-val" style="color:var(--green);">${user.xp}</span>
          </div>
          <div class="lifetime-stat-row">
            <span class="stat-key">Level</span>
            <span class="stat-val" style="color:var(--accent);">${user.level}</span>
          </div>
          <div class="lifetime-stat-row">
            <span class="stat-key">Cycles Completed</span>
            <span class="stat-val">${data.cyclesCompleted}</span>
          </div>
          <div class="lifetime-stat-row">
            <span class="stat-key">Days on Program</span>
            <span class="stat-val">${data.daysSinceJoined || 0}</span>
          </div>
        </div>

        ${data.calendarData.length > 0 ? `
          <div class="card" style="margin-top:16px;">
            <h3 style="margin-bottom:12px;">Streak Calendar</h3>
            ${this._renderCalendar(data.calendarData)}
          </div>
        ` : ''}

        ${data.flexTrend.length > 0 ? `
          <div class="card" style="margin-top:16px;">
            <h3 style="margin-bottom:12px;">Flexibility Trend</h3>
            ${this._renderTrend(data.flexTrend, 'avg_flex', 'var(--green)')}
          </div>
        ` : ''}

        ${data.painTrend.length > 0 ? `
          <div class="card" style="margin-top:16px;">
            <h3 style="margin-bottom:12px;">Discomfort Trend</h3>
            ${this._renderTrend(data.painTrend, 'avg_pain', 'var(--orange)')}
          </div>
        ` : ''}

        ${data.sessions.length > 0 ? `
          <div class="section" style="margin-top:16px;">
            <div class="section-title">Recent Sessions</div>
            ${data.sessions.slice(0, 10).map(s => `
              <div class="card" style="padding:14px;margin-bottom:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <div style="font-weight:600;font-size:14px;">Day ${s.day_number}</div>
                    <div style="font-size:12px;color:var(--text-muted);">${s.day_theme}</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-weight:700;color:var(--green);font-size:14px;">+${s.xp_earned} XP</div>
                    <div style="font-size:11px;color:var(--text-muted);">${new Date(s.completed_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Animate progress rings
    requestAnimationFrame(() => ProgressRing.animateIn('#screen-container'));
  },

  _renderCalendar(calendarData) {
    // Build session count map for intensity
    const dateMap = {};
    calendarData.forEach(d => { dateMap[d.date] = d.sessions || 1; });
    const today = new Date();
    const days = [];
    const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Find starting day-of-week for 35 days ago (5 full weeks)
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 34);
    const startDow = startDate.getDay();

    for (let i = 34; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;
      const sessions = dateMap[dateStr] || 0;
      let intensity = 'cal-empty';
      if (sessions === 1) intensity = 'cal-low';
      else if (sessions === 2) intensity = 'cal-medium';
      else if (sessions >= 3) intensity = 'cal-high';
      days.push({ date: d.getDate(), isToday, intensity });
    }

    return `
      <div class="calendar-grid" style="margin-bottom:4px;">
        ${dayHeaders.map(h => `<div class="calendar-day-header">${h}</div>`).join('')}
      </div>
      <div class="calendar-grid">
        ${days.map(d => `
          <div class="calendar-day ${d.intensity} ${d.isToday ? 'today' : ''}">
            ${d.date}
          </div>
        `).join('')}
      </div>
    `;
  },

  _renderTrend(data, key, color) {
    if (data.length === 0) return '';
    const reversed = [...data].reverse();
    const max = 5;
    return `
      <div style="display:flex;align-items:end;gap:4px;height:60px;">
        ${reversed.map(d => {
          const val = d[key] || 0;
          const height = (val / max) * 100;
          return `<div style="flex:1;background:${color};border-radius:4px 4px 0 0;height:${Math.max(height, 5)}%;opacity:0.8;" title="${d.date}: ${val.toFixed(1)}"></div>`;
        }).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-top:4px;">
        <span>${reversed[0]?.date?.slice(5) || ''}</span>
        <span>${reversed[reversed.length-1]?.date?.slice(5) || ''}</span>
      </div>
    `;
  }
};
