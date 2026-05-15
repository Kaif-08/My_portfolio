/* ═══════════════════════════════════════════════
   typing.js — Typewriter animation for hero section
   ═══════════════════════════════════════════════ */

(function () {
  const phrases = [
    'DevOps Engineer',
    'Cloud Automation',
    'CI/CD Pipelines',
    'AWS Infrastructure',
    'Kubernetes & Docker',
    'DevOps Solutions',
  ];

  const el = document.getElementById('typed-text');

  if (!el) return;

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;

  const TYPE_SPEED   = 90;   /* ms per character when typing */
  const DELETE_SPEED = 50;   /* ms per character when deleting */
  const PAUSE_END    = 1800; /* ms pause at end of full word */
  const PAUSE_START  = 300;  /* ms pause before typing next word */

  function tick() {
    const phrase = phrases[phraseIndex];

    if (!isDeleting) {
      /* ── Typing ── */
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        /* Finished typing — pause then delete */
        isDeleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);

    } else {
      /* ── Deleting ── */
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        /* Finished deleting — move to next phrase */
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  /* Start after loader animation (~2.5s) */
  setTimeout(tick, 2600);
})();
