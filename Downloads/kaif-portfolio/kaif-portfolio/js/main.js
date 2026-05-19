/* ═══════════════════════════════════════════════
   main.js — Core site interactions:
   Loader, Navbar, Cursor Glow, Scroll Progress,
   Mobile Menu, Active Nav Links, Contact Form
   ═══════════════════════════════════════════════ */

(function () {

  /* ────────────────────────────────────────
     Loading Screen
     ──────────────────────────────────────── */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    /* Hide loader after 2.2s to let the fill animation finish */
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hide');
        /* Remove from DOM after transition completes */
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      }
    }, 2200);
  });


  /* ────────────────────────────────────────
     Scroll Progress Bar
     ──────────────────────────────────────── */
  const progressBar = document.getElementById('progress');

  function updateProgress() {
    const docEl   = document.documentElement;
    const scrollH = Math.max(docEl.scrollHeight, document.body.scrollHeight) - window.innerHeight;
    const pct     = scrollH > 0 ? (window.scrollY / scrollH) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }


  /* ────────────────────────────────────────
     Sticky Navbar (glass effect on scroll)
     ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  }

  window.addEventListener('scroll', () => {
    updateProgress();
    updateNavbar();
  }, { passive: true });


  /* ────────────────────────────────────────
     Cursor Glow (follows mouse)
     ──────────────────────────────────────── */
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorGlow) {
    document.addEventListener('mousemove', e => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });
  }


  /* ────────────────────────────────────────
     Mobile Hamburger Menu
     ──────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden'; /* Prevent background scroll */
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    /* Keyboard: Enter/Space to toggle */
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
      }
    });

    /* Close menu when any mobile link is clicked */
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Close menu when clicking outside */
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) closeMenu();
    });
  }


  /* ────────────────────────────────────────
     Active Navigation Highlight
     (highlights nav link matching the visible section)
     ──────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isMatch = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', isMatch);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));


  /* ────────────────────────────────────────
     Smooth Scroll for all anchor links
     ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ────────────────────────────────────────
     Contact Form — basic client-side feedback
     (Replace with your backend / Formspree / EmailJS)
     ──────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      /* Simple validation */
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      /* Placeholder: replace this block with actual form submission */
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent    = '✓ Message Sent!';
      btn.disabled       = true;
      btn.style.opacity  = '0.7';

      setTimeout(() => {
        btn.textContent  = originalText;
        btn.disabled     = false;
        btn.style.opacity = '';
        contactForm.reset();
      }, 3000);
    });
  }


  /* ────────────────────────────────────────
     Initial calls (in case page loaded
     already scrolled — e.g. back-navigation)
     ──────────────────────────────────────── */
  updateProgress();
  updateNavbar();

})();
