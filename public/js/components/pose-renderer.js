const PoseRenderer = {
  renderCues(cues) {
    if (!cues || cues.length === 0) return '';
    return `
      <div class="cues-container">
        ${cues.map(cue => `
          <div class="cue-item">
            <div class="cue-bullet"></div>
            <div class="cue-text">${cue}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderMuscleInfo(pose) {
    return `
      <div class="muscle-info">
        <div class="muscle-label">Primary Targets</div>
        <div class="muscle-value">${pose.primary_muscles_high || ''}</div>
      </div>
    `;
  },

  renderProps(props) {
    if (!props || props.length === 0) return '';
    return `
      <div class="props-list">
        ${props.map(p => `<span class="prop-tag">${p}</span>`).join('')}
      </div>
    `;
  },

  renderProgressionTabs(pose, activeTab = 'full') {
    const tabs = [
      { key: 'regression', label: 'Easier' },
      { key: 'full', label: 'Standard' },
      { key: 'progression', label: 'Harder' }
    ];

    const content = pose[activeTab] || pose.full_pose || pose.instruction || '';

    return `
      <div class="progression-tabs">
        ${tabs.map(t => `
          <button class="progression-tab ${t.key === activeTab ? 'active' : ''}"
                  onclick="SessionPlayer._setProgression('${t.key}')">${t.label}</button>
        `).join('')}
      </div>
      <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-top:8px;">${content}</p>
    `;
  }
};
