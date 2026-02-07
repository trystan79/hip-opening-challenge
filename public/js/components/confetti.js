const Confetti = {
  burst() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    const colors = ['var(--accent)', 'var(--green)', 'var(--yellow)', 'var(--orange)', 'var(--purple)'];

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('span');
      particle.className = 'confetti-particle';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = 30 + Math.random() * 40;
      const size = 6 + Math.random() * 6;
      const drift = (Math.random() - 0.5) * 120;
      const rotation = Math.random() * 720 - 360;
      const delay = Math.random() * 0.5;
      const duration = 1.8 + Math.random() * 1.2;
      const isCircle = Math.random() > 0.5;

      particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        --drift: ${drift}px;
        --rotation: ${rotation}deg;
        animation: confettiFall ${duration}s ease-out ${delay}s forwards;
      `;
      container.appendChild(particle);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 3000);
  }
};
