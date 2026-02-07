const ProgressRing = {
  render(percent, size = 80, strokeWidth = 6, color = 'var(--accent)', label = '') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - Math.min(percent, 100) / 100);
    const center = size / 2;

    return `
      <div class="progress-ring-container" style="width:${size}px;height:${size}px;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg);">
          <circle cx="${center}" cy="${center}" r="${radius}"
                  fill="none" stroke="var(--bg-input)" stroke-width="${strokeWidth}" />
          <circle class="progress-ring-arc" cx="${center}" cy="${center}" r="${radius}"
                  fill="none" stroke="${color}" stroke-width="${strokeWidth}"
                  stroke-linecap="round"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${circumference}"
                  data-target-offset="${offset}" />
        </svg>
        ${label ? `<div class="progress-ring-label">${label}</div>` : ''}
      </div>
    `;
  },

  animateIn(selector) {
    const arcs = document.querySelectorAll(`${selector || ''} .progress-ring-arc`);
    arcs.forEach(arc => {
      const target = parseFloat(arc.dataset.targetOffset);
      const circumference = parseFloat(arc.getAttribute('stroke-dasharray'));
      let current = circumference;
      const duration = 800;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        current = circumference - (circumference - target) * eased;
        arc.setAttribute('stroke-dashoffset', current);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
};
