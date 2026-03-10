/* ═══════════════════════════════════════════════════
   ANDEL & CO. — Main Scripts
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Header scroll effect ──
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      const trigger = windowHeight * 0.88;
      if (top < trigger) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);
  // Run immediately as well
  checkReveal();

  // ── Contact form ──
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const firstName = form.querySelector('#firstName');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (!firstName.value.trim() || !email.value.trim() || !message.value.trim()) {
        return;
      }

      // Hide form, show success
      form.style.display = 'none';
      success.classList.add('show');

      // In production, send data to your backend here
      // Example: fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
