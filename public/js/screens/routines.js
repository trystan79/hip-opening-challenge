const RoutinesScreen = {
  async render(container) {
    container.innerHTML = '<div class="screen-enter"><p style="text-align:center;padding-top:40px;">Loading...</p></div>';

    const routines = await API.getRoutines();

    container.innerHTML = `
      <div class="screen-enter">
        <h2 style="margin-bottom:4px;">Routines</h2>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">Choose your stretching programs</p>

        ${routines.map(r => `
          <div class="card" style="margin-bottom:12px;border-left:4px solid ${r.color};">
            <div style="display:flex;justify-content:space-between;align-items:start;">
              <div style="flex:1;">
                <h3>${r.name}</h3>
                <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">${r.description || ''}</p>
                <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                  <span class="badge" style="background:${r.color}20;color:${r.color};">${r.total_days} days</span>
                  ${r.enrolled && r.is_active ? `
                    <span class="badge badge-accent">Cycle ${r.current_cycle}</span>
                    <span class="badge" style="background:var(--surface);border:1px solid var(--border);">Day ${r.current_day}</span>
                  ` : ''}
                </div>
              </div>
            </div>
            <div style="margin-top:12px;">
              ${r.enrolled && r.is_active ? `
                <div style="display:flex;gap:8px;">
                  <button class="btn btn-primary" style="flex:1;" onclick="App.navigate('#/home')">Go to Session</button>
                  <button class="btn btn-ghost" style="padding:8px 12px;color:var(--text-muted);" onclick="RoutinesScreen._leave(${r.id})">Leave</button>
                </div>
              ` : `
                <button class="btn btn-secondary btn-full" onclick="RoutinesScreen._join(${r.id})">
                  ${r.enrolled ? 'Rejoin' : 'Start'} Routine
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  async _join(routineId) {
    await API.joinRoutine(routineId);
    this.render(document.getElementById('screen-container'));
  },

  async _leave(routineId) {
    if (confirm('Leave this routine? Your progress will be saved.')) {
      await API.leaveRoutine(routineId);
      this.render(document.getElementById('screen-container'));
    }
  }
};
