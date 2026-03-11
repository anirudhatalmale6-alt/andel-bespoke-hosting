/* ═══════════════════════════════════════════════════
   ANDEL & CO. — Dynamic Interactive Scripts
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Progress Bar ──
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

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
    updateProgress();
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

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Parallax on Hero Background ──
  const heroBg = document.querySelector('.hero-bg img');
  const pageHeroBg = document.querySelector('.page-hero .hero-bg img');

  function parallax() {
    const scrollY = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = 'scale(1.1) translateY(' + (scrollY * 0.3) + 'px)';
    }
    if (pageHeroBg) {
      pageHeroBg.style.transform = 'scale(1.1) translateY(' + (scrollY * 0.25) + 'px)';
    }
  }

  window.addEventListener('scroll', parallax, { passive: true });
  parallax();

  // ── Advanced Scroll Reveals ──
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

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
  checkReveal();

  // ── Animated Number Counter ──
  function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    const text = el.textContent.trim();
    // Parse out the numeric part
    var prefix = '';
    var suffix = '';
    var targetNum = 0;
    var hasDecimal = false;

    // Handle formats like "98%", "4.9", "35%", "<15 min", "500+", "89%", "3 min"
    var match = text.match(/^([<>]?)(\d+\.?\d*)\s*(.*)$/);
    if (match) {
      prefix = match[1] || '';
      targetNum = parseFloat(match[2]);
      suffix = match[3] || '';
      hasDecimal = match[2].indexOf('.') !== -1;
    } else {
      return; // Not a number
    }

    var startTime = null;
    var duration = 2000;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutExpo(progress);
      var current = hasDecimal
        ? (targetNum * eased).toFixed(1)
        : Math.floor(targetNum * eased);

      el.textContent = prefix + current + (suffix ? ' ' + suffix : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = text; // Restore exact original text
      }
    }

    el.textContent = prefix + '0' + (suffix ? ' ' + suffix : '');
    requestAnimationFrame(step);
  }

  // Observe stat numbers and achievement numbers
  var counterEls = document.querySelectorAll('.stat-number, .achievement-number');
  if (counterEls.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ── Magnetic hover on buttons ──
  var buttons = document.querySelectorAll('.btn-primary, .hero-cta, .nav-cta');
  buttons.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  // ── Card Tilt Effect ──
  var tiltCards = document.querySelectorAll('.hero-card, .service-detail, .testimonial-card, .philosophy-card, .achievement-card');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var rotateX = (0.5 - y) * 8;
      var rotateY = (x - 0.5) * 8;
      card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // ── Word-by-Word Animation for Hero Title ──
  var heroTitle = document.querySelector('.hero-branding h1');
  if (heroTitle) {
    // Get child nodes and wrap text nodes word-by-word
    var children = Array.from(heroTitle.childNodes);
    var newHTML = '';
    var wordIndex = 0;
    children.forEach(function(node) {
      if (node.nodeType === 3) { // text node
        var words = node.textContent.split(/(\s+)/);
        words.forEach(function(word) {
          if (word.trim()) {
            newHTML += '<span class="word-anim" style="animation-delay:' + (0.5 + wordIndex * 0.12) + 's">' + word + '</span>';
            wordIndex++;
          } else {
            newHTML += word;
          }
        });
      } else if (node.nodeType === 1) { // element node
        var el = node.cloneNode(true);
        el.classList.add('word-anim');
        el.style.animationDelay = (0.5 + wordIndex * 0.12) + 's';
        newHTML += el.outerHTML;
        wordIndex++;
      }
    });
    heroTitle.innerHTML = newHTML;
  }

  // ── Floating Particles in Hero ──
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    var particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    heroSection.appendChild(particleContainer);

    for (var p = 0; p < 20; p++) {
      var particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 6) + 's';
      particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
      particleContainer.appendChild(particle);
    }
  }

  // ── Smooth section label line animation ──
  var sectionLabels = document.querySelectorAll('.section-label');
  var labelObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('label-animate');
      }
    });
  }, { threshold: 0.5 });

  sectionLabels.forEach(function (label) {
    labelObserver.observe(label);
  });

  // ── Image reveal on scroll (team photos) ──
  var imageFrames = document.querySelectorAll('.team-card-photo, .intro-image-frame');
  var imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('image-revealed');
      }
    });
  }, { threshold: 0.3 });

  imageFrames.forEach(function (frame) {
    imageObserver.observe(frame);
  });

  // ── Service category stagger animation ──
  var serviceCategories = document.querySelectorAll('.service-category');
  var serviceObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var details = entry.target.querySelectorAll('.service-detail');
        details.forEach(function (detail, idx) {
          detail.style.transitionDelay = (idx * 0.15) + 's';
          detail.classList.add('detail-visible');
        });
      }
    });
  }, { threshold: 0.2 });

  serviceCategories.forEach(function (cat) {
    serviceObserver.observe(cat);
  });

  // ── Contact form ──
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstName = (form.querySelector('#firstName').value || '').trim();
      var lastName = (form.querySelector('#lastName').value || '').trim();
      var email = (form.querySelector('#email').value || '').trim();
      var phone = (form.querySelector('#phone').value || '').trim();
      var message = (form.querySelector('#message').value || '').trim();

      if (!firstName || !email || !message) {
        return;
      }

      var subject = 'New enquiry from ' + firstName + ' ' + lastName;
      var body = 'Name: ' + firstName + ' ' + lastName + '\n'
        + 'Email: ' + email + '\n'
        + 'Phone: ' + phone + '\n\n'
        + 'Message:\n' + message;

      window.location.href = 'mailto:info@andelbespoke.cz'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      form.style.display = 'none';
      success.classList.add('show');
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

  // ── Cursor glow effect (desktop only) ──
  if (window.matchMedia('(pointer: fine)').matches) {
    var cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    var glowX = 0, glowY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', function (e) {
      glowX = e.clientX;
      glowY = e.clientY;
    });

    function animateGlow() {
      currentX += (glowX - currentX) * 0.1;
      currentY += (glowY - currentY) * 0.1;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

})();
