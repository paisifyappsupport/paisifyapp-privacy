/* ═══════════════════════════════════════════════════════════════════
   PAISIFY — Main JS
   ═══════════════════════════════════════════════════════════════════ */

// ── Custom Cursor ────────────────────────────────────────────────────
(function() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0, raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function tick() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(tick);
  }
  tick();

  const hoverEls = document.querySelectorAll('a, button, .faq-question, .b-card, .t-card, .bank-pill, .price-card, .ss-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();

// ── Scroll Reveal ────────────────────────────────────────────────────
(function() {
  const els = document.querySelectorAll('.sr');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger siblings
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ── Count-up on scroll ───────────────────────────────────────────────
(function() {
  function countUp(el, target, suffix, prefix, duration) {
    let start = null;
    const isFloat = target % 1 !== 0;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);
      el.textContent = prefix + val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const els = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        const target   = parseFloat(e.target.dataset.count);
        const suffix   = e.target.dataset.suffix || '';
        const prefix   = e.target.dataset.prefix || '';
        const duration = parseInt(e.target.dataset.duration) || 1600;
        countUp(e.target, target, suffix, prefix, duration);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
})();

// ── FAQ accordion ────────────────────────────────────────────────────
(function() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Screenshot rail drag-to-scroll ───────────────────────────────────
(function() {
  const rail = document.querySelector('.showcase-rail');
  if (!rail) return;
  let isDown = false, startX, scrollLeft;
  rail.addEventListener('mousedown', e => {
    isDown = true; startX = e.pageX - rail.offsetLeft;
    scrollLeft = rail.scrollLeft; rail.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', () => { isDown = false; rail.style.cursor = 'grab'; });
  rail.addEventListener('mouseleave', () => { isDown = false; });
  rail.addEventListener('mousemove', e => {
    if (!isDown) return; e.preventDefault();
    const x = e.pageX - rail.offsetLeft;
    rail.scrollLeft = scrollLeft - (x - startX) * 1.6;
  });
})();

// ── Phone screen switcher in hero ────────────────────────────────────
(function() {
  const phones = document.querySelectorAll('.hero-phone-img');
  if (phones.length < 2) return;
  let idx = 0;
  const images = Array.from(phones[0].parentElement.querySelectorAll('img'));
  // Not applicable for static multi-phone layout — skip
})();

// ── Parallax on hero phones ───────────────────────────────────────────
(function() {
  const stage = document.querySelector('.phone-stage');
  if (!stage) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const offset = y * 0.25;
        stage.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── Stagger grid children on reveal ──────────────────────────────────
(function() {
  const grids = document.querySelectorAll('.priv-grid, .t-grid, .banks-pills');
  grids.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, i) => {
      child.classList.add('sr');
      child.style.transitionDelay = (i * 0.07) + 's';
    });
  });
})();

// ── Marquee pause on hover ────────────────────────────────────────────
(function() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.parentElement.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.parentElement.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

// ── Nav scroll effect ─────────────────────────────────────────────────
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(7,5,3,.95)'
      : 'rgba(7,5,3,.82)';
  }, { passive: true });
})();
