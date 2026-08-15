/* ============================================================
   EMS Leaderbewerbung – Interaktion
   ============================================================ */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const progress = document.getElementById('scrollProgress');
  const links = Array.from(navLinks.querySelectorAll('a'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  /* ---------- Mobile-Menü ---------- */
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Scroll: Fortschritt + Nav-Hintergrund ---------- */
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Aktiver Navigationspunkt ---------- */
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add('is-visible'), i * 70);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Zahlen hochzählen (Hero-Stats) ----------
     Nutzt data-count. Steht dort kein reiner Zahlenwert
     (z. B. noch ein Platzhalter), wird der Text 1:1 angezeigt. */
  const counters = document.querySelectorAll('.stat__num');
  function runCounter(el) {
    const raw = (el.dataset.count || '').trim();
    const target = parseInt(raw.replace(/\D/g, ''), 10);

    if (!/^\d+$/.test(raw) || Number.isNaN(target)) {
      el.textContent = raw || el.textContent;
      return;
    }

    const duration = 1200;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach(runCounter);
  }
})();
