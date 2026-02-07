const SessionPlayer = {
  _dayData: null,
  _sessionId: null,
  _currentPoseIndex: 0,
  _currentSide: 'A', // A or B for bilateral
  _phase: 'intro', // intro, pose, transition, checkin, complete
  _progressionLevel: 'full',
  _isShuffle: false,

  async render(container, dayId, isShuffle) {
    container.innerHTML = Skeleton.sessionIntro();

    const dayData = await API.getDay(dayId);
    this._dayData = dayData;
    this._currentPoseIndex = 0;
    this._currentSide = 'A';
    this._phase = 'intro';
    this._progressionLevel = 'full';
    this._isShuffle = !!isShuffle;

    this._renderIntro(container);
  },

  _getDuration(pose) {
    return pose.computed_duration || pose.duration_seconds;
  },

  _adjustTime(delta) {
    const pose = this._dayData.poses[this._currentPoseIndex];
    const current = this._getDuration(pose);
    const newDuration = Math.max(30, Math.min(600, current + delta));
    pose.computed_duration = newDuration;

    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.textContent = Timer.formatTime(newDuration);
    const adjDisplay = document.getElementById('time-adj-display');
    if (adjDisplay) adjDisplay.textContent = Timer.formatTime(newDuration);

    // Persist override (fire-and-forget)
    API.setPoseTimeOverride(pose.id, newDuration);
  },

  _renderIntro(container) {
    const day = this._dayData;
    const allProps = new Set();
    day.poses.forEach(p => (p.props || []).forEach(prop => allProps.add(prop)));

    container.innerHTML = `
      <div class="session-player screen-enter">
        <div class="session-header">
          <button class="session-back" onclick="SessionPlayer._confirmExit()">\u2190</button>
          <div class="session-progress-text">Day ${day.sort_order || day.id}</div>
          <div></div>
        </div>

        <div class="session-intro">
          <div class="day-badge">${this._isShuffle ? '<span style="color:var(--accent);">Shuffled \u2022 </span>' : ''}Week ${day.week} \u2022 Day ${day.sort_order || day.id}</div>
          <h1>${day.theme}</h1>
          <p style="margin-top:8px;">${day.description}</p>

          <div class="card-stagger" style="margin-top:24px;">
            ${day.poses.map((p, i) => `
              <div class="pose-card" style="position:relative;">
                <div class="pose-number">${i + 1}</div>
                <div class="pose-info">
                  <div class="pose-name">${p.name}${p.substituted ? ' <span style="font-size:11px;color:var(--accent);">(swapped)</span>' : ''}</div>
                  <div class="pose-meta">${p.primary_muscles_high} \u2022 ${Math.round(this._getDuration(p) / 6) / 10} min${p.is_bilateral ? ' per side' : ''}</div>
                </div>
                <button class="btn btn-ghost" style="padding:4px 8px;font-size:12px;min-width:auto;" onclick="event.stopPropagation(); SessionPlayer._swapPose(${p.original_pose_id || p.id}, '${(p.original_pose_name || p.name).replace(/'/g, "\\'")}')">Swap</button>
              </div>
            `).join('')}
          </div>

          ${allProps.size > 0 ? `
            <div style="margin-top:20px;">
              <div class="section-title">Props Needed</div>
              <div class="props-list" style="justify-content:center;">
                ${[...allProps].map(p => `<span class="prop-tag">${p}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <button class="btn btn-primary btn-full" style="margin-top:24px;" onclick="SessionPlayer._startSession()">
            Begin Session
          </button>
        </div>
      </div>
    `;
  },

  async _startSession() {
    const result = await API.startSession(this._dayData.id, this._isShuffle);
    this._sessionId = result.session_id;
    this._currentPoseIndex = 0;
    this._currentSide = 'A';
    this._phase = 'pose';
    this._renderPose();
  },

  _renderPose() {
    this._timerRunning = false;
    const container = document.getElementById('screen-container');
    const day = this._dayData;
    const pose = day.poses[this._currentPoseIndex];
    const totalSteps = this._getTotalSteps();
    const currentStep = this._getCurrentStep();
    const progress = (currentStep / totalSteps) * 100;

    const sideLabel = pose.is_bilateral ? (this._currentSide === 'A' ? 'Right Side' : 'Left Side') : '';
    const circumference = 2 * Math.PI * 98;

    container.innerHTML = `
      <div class="session-player screen-enter">
        <div class="session-header">
          <button class="session-back" onclick="SessionPlayer._confirmExit()">\u2190</button>
          <div class="session-progress-text">Pose ${this._currentPoseIndex + 1}/${day.poses.length}${sideLabel ? ' \u2022 ' + sideLabel : ''}</div>
          <div></div>
        </div>

        <div class="session-progress-bar">
          <div class="session-progress-fill" style="width:${progress}%"></div>
        </div>

        <div class="pose-display">
          <div class="pose-title">${pose.name}</div>
          ${sideLabel ? `<div class="pose-side">${sideLabel}</div>` : ''}
        </div>

        <div class="timer-container">
          <div class="timer-circle" id="timer-circle" onclick="SessionPlayer._timerTap()" style="cursor:pointer;">
            <svg class="timer-ring" viewBox="0 0 208 208">
              <circle class="ring-bg" cx="104" cy="104" r="98" />
              <circle class="ring-fill" id="ring-fill" cx="104" cy="104" r="98"
                      stroke-dasharray="${circumference}"
                      stroke-dashoffset="0" />
            </svg>
            <div class="timer-time" id="timer-display">${Timer.formatTime(this._getDuration(pose))}</div>
            <div class="timer-label" id="timer-label">Tap to start</div>
          </div>
        </div>

        <div id="action-area"></div>

        <div id="pose-details">
          ${PoseRenderer.renderProgressionTabs(pose, this._progressionLevel)}
          ${PoseRenderer.renderMuscleInfo(pose)}
          ${PoseRenderer.renderCues(pose.cues)}
        </div>

        <div class="session-controls" id="session-controls">
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px;">
            <button class="btn btn-secondary" style="width:64px;padding:8px;font-size:13px;" onclick="SessionPlayer._adjustTime(-30)">\u221230s</button>
            <span style="font-size:18px;font-weight:700;min-width:64px;text-align:center;" id="time-adj-display">${Timer.formatTime(this._getDuration(pose))}</span>
            <button class="btn btn-secondary" style="width:64px;padding:8px;font-size:13px;" onclick="SessionPlayer._adjustTime(30)">+30s</button>
          </div>
          <button class="btn btn-primary btn-full" id="start-timer-btn" onclick="SessionPlayer._startTimer()">
            Start Timer
          </button>
        </div>
      </div>
    `;
  },

  _timerTap() {
    if (!this._timerRunning) {
      this._startTimer();
    } else {
      this._togglePause();
    }
  },

  _timerRunning: false,

  _breathingInterval: null,

  async _startTimer() {
    this._timerRunning = true;
    const pose = this._dayData.poses[this._currentPoseIndex];
    const circumference = 2 * Math.PI * 98;
    const circle = document.getElementById('timer-circle');
    const display = document.getElementById('timer-display');
    const label = document.getElementById('timer-label');

    circle.classList.add('active');

    // Replace button with pause/skip immediately
    document.getElementById('session-controls').innerHTML = `
      <button class="btn btn-secondary" onclick="SessionPlayer._togglePause()" id="pause-btn">Pause</button>
      <button class="btn btn-ghost" onclick="SessionPlayer._skipTimer()">Skip</button>
    `;

    // 3-2-1 countdown inside the timer circle
    for (let n = 3; n >= 1; n--) {
      display.textContent = n;
      display.classList.add('countdown-pop');
      label.textContent = 'Get ready...';
      SoundManager.click();
      await new Promise(r => setTimeout(r, 800));
      display.classList.remove('countdown-pop');
    }

    // Start breathing in the timer circle
    this._startBreathingInCircle();

    // Start the actual timer
    display.textContent = Timer.formatTime(this._getDuration(pose));

    Timer.start(this._getDuration(pose),
      (remaining, total) => {
        const d = document.getElementById('timer-display');
        if (d) d.textContent = Timer.formatTime(remaining);
        const progress = (total - remaining) / total;
        const offset = circumference * (1 - progress);
        const ring = document.getElementById('ring-fill');
        if (ring) ring.setAttribute('stroke-dashoffset', offset);
      },
      () => {
        this._onTimerComplete();
      }
    );
  },

  _startBreathingInCircle() {
    this._stopBreathingInCircle();
    const inhale = 4;
    const exhale = 8;
    const total = inhale + exhale;
    let tick = 0;

    const circle = document.getElementById('timer-circle');
    if (circle) circle.classList.add('breathing');

    const update = () => {
      const label = document.getElementById('timer-label');
      if (!label) return;
      const pos = tick % total;
      if (pos < inhale) {
        const countdown = inhale - pos;
        label.textContent = `Breathe in... ${countdown}`;
        label.style.color = 'var(--green)';
      } else {
        const countdown = exhale - (pos - inhale);
        label.textContent = `Breathe out... ${countdown}`;
        label.style.color = 'var(--green)';
      }
      tick++;
    };

    update();
    this._breathingInterval = setInterval(update, 1000);
  },

  _stopBreathingInCircle() {
    if (this._breathingInterval) {
      clearInterval(this._breathingInterval);
      this._breathingInterval = null;
    }
    const circle = document.getElementById('timer-circle');
    if (circle) circle.classList.remove('breathing');
  },

  _togglePause() {
    if (Timer.isPaused()) {
      Timer.resume();
      document.getElementById('pause-btn').textContent = 'Pause';
      this._startBreathingInCircle();
    } else {
      Timer.pause();
      document.getElementById('pause-btn').textContent = 'Resume';
      this._stopBreathingInCircle();
      const label = document.getElementById('timer-label');
      if (label) {
        label.textContent = 'Paused';
        label.style.color = '';
      }
    }
  },

  _skipTimer() {
    Timer.stop();
    this._stopBreathingInCircle();
    this._onTimerComplete();
  },

  _onTimerComplete() {
    this._timerRunning = false;
    this._stopBreathingInCircle();
    const circle = document.getElementById('timer-circle');
    if (circle) {
      circle.classList.remove('active');
      circle.classList.add('complete');
    }
    const label = document.getElementById('timer-label');
    if (label) {
      label.textContent = 'Done!';
      label.style.color = '';
    }
    SoundManager.timerComplete();

    const pose = this._dayData.poses[this._currentPoseIndex];

    // Show action button above pose details so it's visible without scrolling
    const actionArea = document.getElementById('action-area');
    const controls = document.getElementById('session-controls');
    if (controls) controls.innerHTML = '';

    if (pose.is_bilateral && this._currentSide === 'A') {
      if (actionArea) actionArea.innerHTML = `
        <button class="btn btn-primary btn-full" style="margin:16px 0;" onclick="SessionPlayer._switchSide()">
          Switch to Left Side
        </button>
      `;
    } else {
      const isLastPose = this._currentPoseIndex >= this._dayData.poses.length - 1;
      if (actionArea) actionArea.innerHTML = `
        <button class="btn btn-primary btn-full" style="margin:16px 0;" onclick="SessionPlayer.${isLastPose ? '_showCheckin' : '_showTransition'}()">
          ${isLastPose ? 'Continue' : 'Next Pose'}
        </button>
      `;
    }
  },

  _switchSide() {
    this._currentSide = 'B';
    this._renderPose();
  },

  _showTransition() {
    const container = document.getElementById('screen-container');
    const currentPose = this._dayData.poses[this._currentPoseIndex];
    const nextPose = this._dayData.poses[this._currentPoseIndex + 1];

    container.innerHTML = `
      <div class="session-player screen-enter">
        <div class="session-header">
          <button class="session-back" onclick="SessionPlayer._confirmExit()">\u2190</button>
          <div class="session-progress-text">Transition</div>
          <div></div>
        </div>

        <div style="text-align:center;padding:40px 0;">
          <div style="font-size:48px;margin-bottom:16px;">\u2713</div>
          <h2>${currentPose.name} complete!</h2>
          <p style="margin-top:12px;">Take a moment to shake out your legs.</p>

          <div class="card" style="margin-top:24px;text-align:left;">
            <div style="font-size:12px;color:var(--text-muted);font-weight:600;margin-bottom:8px;">UP NEXT</div>
            <div class="pose-card">
              <div class="pose-number">${this._currentPoseIndex + 2}</div>
              <div class="pose-info">
                <div class="pose-name">${nextPose.name}</div>
                <div class="pose-meta">${nextPose.primary_muscles_high}</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-full" style="margin-top:24px;" onclick="SessionPlayer._nextPose()">
            Ready
          </button>
        </div>
      </div>
    `;
  },

  _nextPose() {
    this._currentPoseIndex++;
    this._currentSide = 'A';
    this._renderPose();
  },

  _showCheckin() {
    this._phase = 'checkin';
    const container = document.getElementById('screen-container');

    container.innerHTML = `
      <div class="session-player screen-enter">
        <div class="session-header">
          <div></div>
          <div class="session-progress-text">Session Complete</div>
          <div></div>
        </div>

        <div class="checkin-container">
          <div style="font-size:48px;margin-bottom:16px;">\uD83C\uDF1F</div>
          <h2>Great session!</h2>
          <p style="margin-top:8px;">Quick check-in to track your progress</p>

          <div style="margin-top:32px;text-align:left;">
            <div class="checkin-question">How difficult was that?</div>
            <div class="checkin-scale" id="difficulty-scale">
              ${[1,2,3,4,5].map(n => `<button class="checkin-btn" data-val="${n}" onclick="SessionPlayer._selectRating('difficulty', ${n})">${n}</button>`).join('')}
            </div>
            <div class="checkin-labels"><span>Easy</span><span>Hard</span></div>
          </div>

          <div style="margin-top:24px;text-align:left;">
            <div class="checkin-question">How flexible do you feel?</div>
            <div class="checkin-scale" id="flexibility-scale">
              ${[1,2,3,4,5].map(n => `<button class="checkin-btn" data-val="${n}" onclick="SessionPlayer._selectRating('flexibility', ${n})">${n}</button>`).join('')}
            </div>
            <div class="checkin-labels"><span>Tight</span><span>Open</span></div>
          </div>

          <div style="margin-top:24px;text-align:left;">
            <div class="checkin-question">Any discomfort? (1=none, 5=significant)</div>
            <div class="checkin-scale" id="pain-scale">
              ${[1,2,3,4,5].map(n => `<button class="checkin-btn" data-val="${n}" onclick="SessionPlayer._selectRating('pain', ${n})">${n}</button>`).join('')}
            </div>
            <div class="checkin-labels"><span>None</span><span>Significant</span></div>
          </div>

          <div id="pain-location-area" style="display:none;margin-top:16px;text-align:left;">
            <div class="checkin-question">Where was the discomfort?</div>
            <div class="pain-locations">
              <button class="pain-location-btn" data-loc="hips" onclick="SessionPlayer._selectPainLocation('hips')">Hips</button>
              <button class="pain-location-btn" data-loc="knees" onclick="SessionPlayer._selectPainLocation('knees')">Knees</button>
              <button class="pain-location-btn" data-loc="lower_back" onclick="SessionPlayer._selectPainLocation('lower_back')">Lower Back</button>
            </div>
          </div>

          <button class="btn btn-success btn-full" style="margin-top:32px;" onclick="SessionPlayer._completeSession()">
            Finish Session
          </button>
        </div>
      </div>
    `;
  },

  _ratings: { difficulty: null, flexibility: null, pain: null },
  _painLocation: null,

  _selectRating(type, val) {
    this._ratings[type] = val;
    document.querySelectorAll(`#${type}-scale .checkin-btn`).forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.val) === val);
    });

    // Show pain location if pain > 2
    if (type === 'pain') {
      document.getElementById('pain-location-area').style.display = val > 2 ? 'block' : 'none';
    }
  },

  _selectPainLocation(loc) {
    this._painLocation = loc;
    document.querySelectorAll('.pain-location-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.loc === loc);
    });
  },

  async _completeSession() {
    try {
      const result = await API.completeSession(this._sessionId, {
        difficulty_rating: this._ratings.difficulty,
        flexibility_rating: this._ratings.flexibility,
        pain_rating: this._ratings.pain,
        pain_location: this._painLocation
      });

      // Show XP toast & play sounds
      XPToast.show(result.xp_earned);
      SoundManager.xpEarned();
      SoundManager.sessionComplete();
      Confetti.burst();
      if (result.bonus_xp > 0) {
        setTimeout(() => XPToast.showBonus(result.bonus_xp, result.bonus_type), 800);
      }
      if (result.level_up) {
        setTimeout(() => {
          XPToast.showLevelUp(result.new_level);
          SoundManager.levelUp();
        }, result.bonus_xp > 0 ? 1300 : 500);
      }
      if (result.cycle_complete) {
        setTimeout(() => Confetti.burst(), 800);
      }
      if (result.achievements && result.achievements.length > 0) {
        setTimeout(() => AchievementToast.showAll(result.achievements), 1500);
      }

      this._showCompletion(result);
    } catch (err) {
      console.error('Session complete error:', err);
      // Session may have been lost (e.g. server restart) — show friendly message
      const container = document.getElementById('screen-container');
      container.innerHTML = `
        <div class="session-player screen-enter">
          <div class="completion-screen">
            <div style="font-size:64px;margin-bottom:16px;">\u2705</div>
            <h2>Great work!</h2>
            <p style="margin-top:8px;">Your session couldn't be saved (the server may have restarted). But you still did the stretches — that's what counts!</p>
            <button class="btn btn-primary btn-full" style="margin-top:24px;" onclick="App.navigate('#/home')">Home</button>
          </div>
        </div>
      `;
    }
  },

  _showCompletion(result) {
    const container = document.getElementById('screen-container');
    const day = this._dayData;
    const cycle = result.current_cycle || 1;

    container.innerHTML = `
      <div class="session-player screen-enter">
        <div class="completion-screen">
          <div style="font-size:64px;margin-bottom:16px;">${result.cycle_complete ? '\uD83C\uDFC6' : '\uD83C\uDF1F'}</div>
          <h2>${result.cycle_complete ? 'Cycle ' + cycle + ' Complete!' : 'Day ' + (day.sort_order || day.id) + ' Done!'}</h2>
          <p>${result.is_shuffle ? 'Shuffled session complete! Your schedule wasn\'t affected.' : (result.cycle_complete ? 'You completed all days in this cycle!' : 'Keep up the great work!')}</p>

          ${result.bonus_xp > 0 ? `
            <div style="display:inline-block;padding:6px 16px;border-radius:var(--radius-full);background:rgba(240,195,142,0.15);color:var(--yellow);font-weight:700;font-size:14px;margin-bottom:8px;">
              ${{ critical: 'Critical Stretch! \u00D72 XP', bonus: 'Bonus! +50% XP', lucky: 'Lucky! +25% XP' }[result.bonus_type] || 'Bonus XP!'}
            </div>
          ` : ''}

          <div class="completion-stats">
            <div class="completion-stat">
              <div class="completion-stat-value" style="color:var(--green);">+${result.xp_earned}</div>
              <div class="completion-stat-label">XP</div>
            </div>
            <div class="completion-stat">
              <div class="completion-stat-value" style="color:var(--yellow);">${result.streak}</div>
              <div class="completion-stat-label">Day Streak</div>
            </div>
            <div class="completion-stat">
              <div class="completion-stat-value" style="color:var(--purple);">${result.total_xp}</div>
              <div class="completion-stat-label">Total XP</div>
            </div>
          </div>

          ${result.level_up ? `
            <div class="card" style="background:linear-gradient(135deg, var(--accent), var(--purple));text-align:center;margin:16px 0;">
              <div style="font-size:14px;font-weight:600;">Level Up!</div>
              <div style="font-size:40px;font-weight:800;">${result.new_level}</div>
            </div>
          ` : ''}

          <div style="display:flex;gap:12px;margin-top:24px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="App.navigate('#/path')">View Journey</button>
            <button class="btn btn-primary" style="flex:1;" onclick="App.navigate('#/home')">Home</button>
          </div>
        </div>
      </div>
    `;

    // Animate stat counters
    setTimeout(() => {
      document.querySelectorAll('.completion-stat-value').forEach(el => {
        const text = el.textContent;
        const match = text.match(/[+-]?(\d+)/);
        if (!match) return;
        const target = parseInt(match[1]);
        const prefix = text.replace(match[1], '').replace(/\d/g, '');
        let current = 0;
        const steps = 30;
        const increment = target / steps;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = prefix.startsWith('+') ? `+${Math.round(current)}` : `${Math.round(current)}`;
        }, 30);
      });
    }, 200);
  },

  _setProgression(level) {
    this._progressionLevel = level;
    const pose = this._dayData.poses[this._currentPoseIndex];
    const details = document.getElementById('pose-details');
    if (details) {
      details.innerHTML = `
        ${PoseRenderer.renderProgressionTabs(pose, level)}
        ${PoseRenderer.renderMuscleInfo(pose)}
        ${PoseRenderer.renderCues(pose.cues)}
      `;
    }
  },

  _swapPose(poseId, poseName) {
    PosePicker.show(poseId, poseName, async () => {
      // Reload day data to reflect substitution
      const dayData = await API.getDay(this._dayData.id);
      this._dayData = dayData;
      this._renderIntro(document.getElementById('screen-container'));
    });
  },

  _confirmExit() {
    if (this._phase === 'intro') {
      App.navigate('#/home');
      return;
    }
    if (confirm('Leave this session? Your progress won\'t be saved.')) {
      Timer.stop();
      this._stopBreathingInCircle();
      App.navigate('#/home');
    }
  },

  _getTotalSteps() {
    let steps = 0;
    this._dayData.poses.forEach(p => {
      steps += p.is_bilateral ? 2 : 1;
    });
    return steps;
  },

  _getCurrentStep() {
    let step = 0;
    for (let i = 0; i < this._currentPoseIndex; i++) {
      step += this._dayData.poses[i].is_bilateral ? 2 : 1;
    }
    if (this._currentSide === 'B') step++;
    return step;
  }
};
