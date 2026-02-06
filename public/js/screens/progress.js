const ProgressScreen = {
  async render(container) {
    container.innerHTML = '<div class="screen-enter"><p style="text-align:center;padding-top:40px;">Loading...</p></div>';

    const data = await API.getProgress();
    const user = data.user;

    container.innerHTML = `
      <div class="screen-enter">
        <h2 style="margin-bottom:20px;">Your Progress</h2>

        <div class="stat-grid">
          <div class="stat-item">
            <div class="stat-value" style="color:var(--green);">${data.daysCompleted}</div>
            <div class="stat-label">Days Done</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--yellow);">${user.streak_count}</div>
            <div class="stat-label">Current Streak</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--purple);">${user.longest_streak}</div>
            <div class="stat-label">Best Streak</div>
          </div>
        </div>

        <div class="card" style="margin-top:16px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <h3>Cycle ${data.currentCycle || 1} Progress</h3>
            <span class="badge badge-accent">${Math.round((data.daysCompleted / data.totalDays) * 100)}%</span>
          </div>
          <div class="progress-bar" style="height:12px;">
            <div class="progress-bar-fill" style="width:${(data.daysCompleted / data.totalDays) * 100}%"></div>
          </div>
          <p style="font-size:13px;margin-top:8px;">${data.totalDays - data.daysCompleted} days remaining${data.cyclesCompleted > 0 ? ' \u2022 ' + data.cyclesCompleted + ' cycle' + (data.cyclesCompleted > 1 ? 's' : '') + ' completed' : ''}</p>
        </div>

        <div class="stat-grid" style="margin-top:12px;">
          <div class="stat-item">
            <div class="stat-value" style="color:var(--green);">${user.xp}</div>
            <div class="stat-label">Total XP</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--accent);">${user.level}</div>
            <div class="stat-label">Level</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--orange);">${data.totalSessions}</div>
            <div class="stat-label">Sessions</div>
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
  },

  _renderCalendar(calendarData) {
    const activeDates = new Set(calendarData.map(d => d.date));
    const today = new Date();
    const days = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;
      const isActive = activeDates.has(dateStr);
      days.push({ date: d.getDate(), isActive, isToday });
    }

    return `
      <div class="calendar-grid">
        ${days.map(d => `
          <div class="calendar-day ${d.isActive ? 'active' : 'empty'} ${d.isToday ? 'today' : ''}">
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
