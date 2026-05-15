/* ═══════════════════════════════════════════════
   particles.js — Animated particle network canvas
   ═══════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H;

  /* ── Resize canvas to viewport ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  /* ── Generate particle data ── */
  const PARTICLE_COUNT = 70;
  const MAX_DISTANCE   = 120;
  const SPEED          = 0.3;

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r:  Math.random() * 1.5 + 0.3,
  }));

  /* ── Animation loop ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Move & draw dots */
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      /* Wrap around edges */
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 245, 255, 0.45)';
      ctx.fill();
    });

    /* Draw connecting lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);

        if (d < MAX_DISTANCE) {
          const alpha = 0.07 * (1 - d / MAX_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
