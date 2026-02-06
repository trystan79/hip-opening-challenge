const HomeScreen = {
  _shuffleDay: null,

  async render(container) {
    container.innerHTML = '<div class="screen-enter"><p style="text-align:center;padding-top:40px;">Loading...</p></div>';

    this._shuffleDay = null;
    let data;
    try {
      data = await API.getTodayAll();
    } catch (err) {
      // User likely doesn't exist in DB (server restart wiped data)
      Session.clearUser();
      App.navigate('#/login');
      return;
    }
    const user = data.user;
    const routines = data.routines || [];

    const xpForLevel = user.xp % 100;
    const hasActiveDay = routines.some(r => r.day);
    const mascotMood = user.streak_count >= 3 ? 'proud' : (hasActiveDay ? 'happy' : 'resting');

    container.innerHTML = `
      <div class="screen-enter">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <div>
            <h2>Hey, ${this._escapeHtml(user.name)}!</h2>
            <p style="font-size:13px;">${routines.length} active routine${routines.length !== 1 ? 's' : ''}</p>
          </div>
          ${StreakBadge.render(user.streak_count)}
        </div>

        ${Mascot.render(user.mascot, mascotMood, 64)}

        ${routines.map(r => this._renderRoutineCard(r)).join('')}

        ${routines.length === 0 ? `
          <div class="card" style="text-align:center;">
            <p style="margin-bottom:12px;">No active routines</p>
            <button class="btn btn-primary" onclick="App.navigate('#/routines')">Browse Routines</button>
          </div>
        ` : ''}

        <button class="btn btn-ghost btn-full" style="margin-top:8px;font-size:13px;" onclick="App.navigate('#/routines')">
          Manage Routines
        </button>

        <div id="shuffle-area">
          ${hasActiveDay ? `
            <button class="btn btn-ghost btn-full" style="margin-top:12px;border:1px dashed var(--border);" onclick="HomeScreen._showShuffleOptions()">
              \uD83C\uDFB2 Feeling Lucky
            </button>
          ` : ''}
        </div>

        <div id="shuffle-day-area"></div>

        <div class="stat-grid" style="margin-top:16px;">
          <div class="stat-item">
            <div class="stat-value" style="color:var(--green);">${user.xp}</div>
            <div class="stat-label">Total XP</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--yellow);">${user.streak_count}</div>
            <div class="stat-label">Streak</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color:var(--purple);">${user.level}</div>
            <div class="stat-label">Level</div>
          </div>
        </div>

        <div style="margin-top:12px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
            <span>Level ${user.level}</span>
            <span>${xpForLevel}/100 XP</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${xpForLevel}%"></div>
          </div>
        </div>
      </div>
    `;
  },

  _renderRoutineCard(r) {
    const cycle = r.current_cycle || 1;
    const difficulty = r.difficulty || 'easy';
    const day = r.day;
    const color = r.routine_color || '#e94560';

    if (r.painNote) {
      var painHtml = `
        <div style="border-left:3px solid var(--orange);padding:8px 12px;margin-bottom:12px;border-radius:4px;">
          <div style="font-size:12px;font-weight:600;color:var(--orange);margin-bottom:2px;">Heads up</div>
          <p style="font-size:12px;">${r.painNote}</p>
        </div>
      `;
    }

    if (r.allDaysComplete) {
      return this._renderCycleComplete(r.routine_id, r.routine_name, color, cycle, difficulty, day);
    }

    if (!day) {
      return `
        <div class="card" style="border-left:4px solid ${color};margin-bottom:12px;text-align:center;">
          <h3 style="font-size:14px;color:${color};">${r.routine_name}</h3>
          <p style="font-size:13px;color:var(--text-muted);">No sessions available</p>
        </div>
      `;
    }

    return `
      <div class="card" style="border-left:4px solid ${color};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:12px;font-weight:600;color:${color};">${r.routine_name}</span>
          <span style="font-size:11px;color:var(--text-muted);">Cycle ${cycle} \u2022 Day ${day.sort_order || day.id}</span>
        </div>
        ${painHtml || ''}
        <div style="cursor:pointer;" onclick="App.navigate('#/session/${day.id}')">
          <div style="margin-bottom:8px;">
            <div class="badge badge-accent" style="margin-bottom:6px;">Day ${day.sort_order || day.id}</div>
            <h3 style="font-size:15px;">${day.theme}</h3>
            <p style="font-size:12px;margin-top:2px;color:var(--text-muted);">${r.reason}</p>
          </div>

          ${r.poses.length > 0 ? `
            <div>
              ${r.poses.map((p, i) => `
                <div class="pose-card">
                  <div class="pose-number">${i + 1}</div>
                  <div class="pose-info">
                    <div class="pose-name">${p.name}</div>
                    <div class="pose-meta">${p.primary_muscles_high} \u2022 ${Math.round((p.computed_duration || p.duration_seconds) / 6) / 10} min${p.is_bilateral ? ' per side' : ''}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            ${this._getAllProps(r.poses).length > 0 ? `
              <div style="margin-top:8px;">
                <div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-bottom:4px;">PROPS NEEDED</div>
                <div class="props-list">
                  ${this._getAllProps(r.poses).map(p => `<span class="prop-tag">${p}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          ` : ''}

          <button class="btn btn-primary btn-full" style="margin-top:12px;"
                  onclick="event.stopPropagation(); App.navigate('#/session/${day.id}')">
            Start Session
          </button>
        </div>
      </div>
    `;
  },

  _renderCycleComplete(routineId, routineName, color, cycle, difficulty, replayDay) {
    const diffLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
    const nextDiffMap = { easy: 'medium', medium: 'hard', hard: null };
    const nextDiff = nextDiffMap[difficulty];

    return `
      <div class="card" style="text-align:center;border-left:4px solid ${color};margin-bottom:12px;">
        <span style="font-size:12px;font-weight:600;color:${color};">${routineName}</span>
        <div style="font-size:36px;margin:8px 0;">\uD83C\uDFC6</div>
        <h3>Cycle ${cycle} Complete!</h3>
        <p style="margin-top:4px;font-size:13px;">Ready for cycle ${cycle + 1}?</p>
        <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">
          ${nextDiff ? `
            <button class="btn btn-primary btn-full" onclick="HomeScreen._advanceCycle('${nextDiff}', ${routineId})">
              Move up to ${diffLabels[nextDiff]}
            </button>
            <button class="btn btn-secondary btn-full" onclick="HomeScreen._advanceCycle('${difficulty}', ${routineId})">
              Stay at ${diffLabels[difficulty]}
            </button>
          ` : `
            <button class="btn btn-primary btn-full" onclick="HomeScreen._advanceCycle('${difficulty}', ${routineId})">
              Start Cycle ${cycle + 1}
            </button>
          `}
        </div>
        ${replayDay ? `
          <button class="btn btn-ghost btn-full" style="margin-top:8px;font-size:12px;" onclick="App.navigate('#/session/${replayDay.id}')">
            Replay a day instead
          </button>
        ` : ''}
      </div>
    `;
  },

  async _advanceCycle(difficulty, routineId) {
    await API.advanceCycle(difficulty, routineId);
    App.navigate('#/home');
  },

  _showShuffleOptions() {
    const area = document.getElementById('shuffle-area');
    if (!area) return;
    area.innerHTML = `
      <div class="card" style="margin-top:12px;border:1px dashed var(--accent);">
        <div style="text-align:center;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:600;">Feeling Lucky</div>
          <p style="font-size:12px;color:var(--text-muted);">One-off session — won't affect your schedule</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary" style="flex:1;" onclick="HomeScreen._doShuffle('similar')">Similar Muscles</button>
          <button class="btn btn-secondary" style="flex:1;" onclick="HomeScreen._doShuffle('different')">Something Different</button>
        </div>
        <button class="btn btn-ghost btn-full" style="margin-top:8px;font-size:12px;" onclick="HomeScreen._cancelShuffle()">Cancel</button>
      </div>
    `;
  },

  _cancelShuffle() {
    this._shuffleDay = null;
    const area = document.getElementById('shuffle-area');
    if (area) {
      area.innerHTML = `
        <button class="btn btn-ghost btn-full" style="margin-top:12px;border:1px dashed var(--border);" onclick="HomeScreen._showShuffleOptions()">
          \uD83C\uDFB2 Feeling Lucky
        </button>
      `;
    }
    const dayArea = document.getElementById('shuffle-day-area');
    if (dayArea) dayArea.innerHTML = '';
  },

  async _doShuffle(mode) {
    const area = document.getElementById('shuffle-area');
    if (area) area.innerHTML = '<p style="text-align:center;padding:12px;font-size:13px;">Finding a session...</p>';

    const day = await API.getShuffle(mode);
    this._shuffleDay = day;

    const dayData = await API.getDay(day.id);

    if (area) {
      area.innerHTML = `
        <button class="btn btn-ghost btn-full" style="margin-top:12px;border:1px dashed var(--border);" onclick="HomeScreen._showShuffleOptions()">
          \uD83C\uDFB2 Feeling Lucky
        </button>
      `;
    }

    const dayArea = document.getElementById('shuffle-day-area');
    if (!dayArea) return;

    dayArea.innerHTML = `
      <div class="card" style="margin-top:12px;border:2px dashed var(--accent);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <span class="badge badge-accent" style="margin-right:6px;">Shuffled</span>
            <span class="badge" style="background:var(--surface);border:1px solid var(--border);">Day ${day.sort_order || day.id}</span>
          </div>
          <button class="btn btn-ghost" style="padding:4px 8px;font-size:12px;" onclick="HomeScreen._cancelShuffle()">Back to schedule</button>
        </div>
        <h3>${day.theme}</h3>
        <div style="margin-top:12px;">
          ${dayData.poses.map((p, i) => `
            <div class="pose-card">
              <div class="pose-number">${i + 1}</div>
              <div class="pose-info">
                <div class="pose-name">${p.name}</div>
                <div class="pose-meta">${p.primary_muscles_high} \u2022 ${Math.round((p.computed_duration || p.duration_seconds) / 6) / 10} min${p.is_bilateral ? ' per side' : ''}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="btn btn-primary" style="flex:1;" onclick="App.navigate('#/session/${day.id}?shuffle=1')">
            Start Shuffled Session
          </button>
          <button class="btn btn-secondary" style="padding:8px 12px;" onclick="HomeScreen._doShuffle('${mode}')">
            \uD83D\uDD04
          </button>
        </div>
      </div>
    `;
  },

  _getAllProps(poses) {
    const all = new Set();
    poses.forEach(p => (p.props || []).forEach(prop => all.add(prop)));
    return [...all];
  },

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
