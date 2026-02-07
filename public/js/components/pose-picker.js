const PosePicker = {
  _callback: null,
  _originalPoseId: null,

  async show(poseId, poseName, onSelect) {
    this._originalPoseId = poseId;
    this._callback = onSelect;

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'pose-picker-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:var(--overlay-heavy);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;';

    modal.innerHTML = `
      <div class="card" style="width:100%;max-width:400px;max-height:80vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3>Swap ${poseName}</h3>
          <button class="btn btn-ghost" style="padding:4px 8px;" onclick="PosePicker.close()">X</button>
        </div>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Choose a similar pose to substitute:</p>
        <div id="pose-picker-list" style="text-align:center;">
          <p style="padding:20px 0;">Loading...</p>
        </div>
        <button class="btn btn-ghost btn-full" style="margin-top:12px;color:var(--orange);" onclick="PosePicker._revert()">
          Revert to Original
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Fetch similar poses
    try {
      const similar = await API.getSimilarPoses(poseId);
      const list = document.getElementById('pose-picker-list');
      if (!list) return;

      if (similar.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);padding:12px 0;">No similar poses found.</p>';
        return;
      }

      list.innerHTML = similar.map(p => `
        <div class="card" style="padding:12px;margin-bottom:8px;cursor:pointer;border:1px solid var(--border);"
             onclick="PosePicker._select(${p.id}, '${p.name.replace(/'/g, "\\'")}')">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="text-align:left;">
              <div style="font-weight:600;font-size:14px;">${p.name}</div>
              <div style="font-size:12px;color:var(--text-muted);">${p.primary_muscles_high}</div>
            </div>
            <div style="text-align:right;">
              <div class="badge badge-accent" style="font-size:11px;">${p.similarity}%</div>
              <div style="font-size:11px;color:var(--text-muted);">Day ${p.day_id}</div>
            </div>
          </div>
        </div>
      `).join('');
    } catch (e) {
      const list = document.getElementById('pose-picker-list');
      if (list) list.innerHTML = '<p style="color:var(--red);">Failed to load poses.</p>';
    }
  },

  async _select(replacementId, replacementName) {
    await API.substitutePose(this._originalPoseId, replacementId);
    this.close();
    if (this._callback) this._callback();
  },

  async _revert() {
    await API.removeSubstitution(this._originalPoseId);
    this.close();
    if (this._callback) this._callback();
  },

  close() {
    const modal = document.getElementById('pose-picker-modal');
    if (modal) modal.remove();
    this._callback = null;
    this._originalPoseId = null;
  }
};
