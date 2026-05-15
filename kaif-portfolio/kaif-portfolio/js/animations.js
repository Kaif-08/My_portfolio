/* ═══════════════════════════════════════════════
   animations.js — Scroll-triggered reveals,
   counter animations, tilt effects
   ═══════════════════════════════════════════════ */

(function () {

  /* ────────────────────────────────────────
     Reveal on Scroll (IntersectionObserver)
     ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* ────────────────────────────────────────
     Animated Counter (stat cards in About)
     ──────────────────────────────────────── */
  const STAT_TARGETS = [20, 15, 30, 3];
  const STAT_IDS     = ['stat1', 'stat2', 'stat3', 'stat4'];

  function animateCounter(el, target) {
    let current = 0;
    const step  = target / 50;          /* 50 ticks total */
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + (target > 5 ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 35);
  }

  /* Trigger counters only once when stats section enters view */
  const statsGrid = document.querySelector('.stats-grid');

  if (statsGrid) {
    const counterObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        STAT_IDS.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el) animateCounter(el, STAT_TARGETS[i]);
        });
        counterObserver.disconnect(); /* Run only once */
      }
    }, { threshold: 0.5 });

    counterObserver.observe(statsGrid);
  }


  /* ────────────────────────────────────────
     3D Tilt Effect — Project Cards
     (Skill card tilt is applied in skills.js
      via window.applyTilt after each render)
     ──────────────────────────────────────── */
  function initProjectTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform =
          `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  initProjectTilt();

})();
