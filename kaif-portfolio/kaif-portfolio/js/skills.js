/* ═══════════════════════════════════════════════
   skills.js — Skill cards data, rendering & filter
   ═══════════════════════════════════════════════ */

(function () {
  /* ── Skills Data ── */
  const SKILLS = [
    { name: 'AWS',            icon: '☁',  cat: 'cloud',      pct: 90 },
    { name: 'EC2',            icon: '🖥',  cat: 'cloud',      pct: 85 },
    { name: 'ECS',            icon: '🐳', cat: 'cloud',      pct: 82 },
    { name: 'ECR',            icon: '📦', cat: 'cloud',      pct: 80 },
    { name: 'IAM',            icon: '🔐', cat: 'cloud',      pct: 85 },
    { name: 'CloudWatch',     icon: '📊', cat: 'monitoring', pct: 80 },
    { name: 'Docker',         icon: '🐋', cat: 'containers', pct: 90 },
    { name: 'Kubernetes',     icon: '⎈',  cat: 'containers', pct: 75 },
    { name: 'Jenkins',        icon: '🤖', cat: 'cicd',       pct: 85 },
    { name: 'GitHub Actions', icon: '⚡', cat: 'cicd',       pct: 88 },
    { name: 'Terraform',      icon: '🏗', cat: 'iac',        pct: 80 },
    { name: 'Bash',           icon: '💻', cat: 'iac',        pct: 85 },
    { name: 'Git',            icon: '🔀', cat: 'vcs',        pct: 92 },
    { name: 'GitHub',         icon: '🐙', cat: 'vcs',        pct: 90 },
    { name: 'Bitbucket',      icon: '🗂', cat: 'vcs',        pct: 78 },
    { name: 'Linux',          icon: '🐧', cat: 'iac',        pct: 88 },
    { name: 'Monitoring',     icon: '📡', cat: 'monitoring', pct: 78 },
    { name: 'Logging',        icon: '📝', cat: 'monitoring', pct: 75 },
  ];

  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  /* ── Render skills to DOM ── */
  function renderSkills(category) {
    const filtered = category === 'all'
      ? SKILLS
      : SKILLS.filter(s => s.cat === category);

    grid.innerHTML = filtered.map(skill => `
      <div class="skill-card" role="listitem" aria-label="${skill.name}">
        <div class="skill-icon" aria-hidden="true">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar">
          <div class="skill-fill" data-pct="${skill.pct}%" style="width: 0%"></div>
        </div>
      </div>
    `).join('');

    /* Trigger bar animation after short delay */
    setTimeout(() => {
      grid.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct;
      });
    }, 100);

    /* Re-apply tilt effect to new cards */
    applyTilt(grid.querySelectorAll('.skill-card'));
  }

  /* ── Category filter buttons ── */
  const catBtns = document.querySelectorAll('.cat-btn');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.cat);
    });
  });

  /* ── Initial render ── */
  renderSkills('all');

  /* ── Tilt effect helper (also used by project cards in main.js) ── */
  function applyTilt(cards) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform =
          `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* Expose applyTilt for main.js to use on project cards */
  window.applyTilt = applyTilt;
})();
