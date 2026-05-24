/* ============================================================
   Dra. Ana Paula Teixeira — Design System JS
   Vanilla — reveal, counter, nav mobile, smooth scroll.
   Respeita prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- Reveal on scroll -----
     Trigger quando elemento entra a marca de 80% do viewport (vindo de baixo).
     Implementação: rootMargin -20% no bottom recorta a janela observada,
     fazendo o trigger ocorrer quando o elemento atinge 80% da altura. */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20% 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ----- Stagger: aplica transition-delay incremental nos filhos diretos
     de qualquer container .reveal-stagger. 80ms entre cada filho.
     Cap: a partir do 5º item, todos sem delay (evita ondas longas em listas grandes). */
  function initStagger() {
    const containers = document.querySelectorAll('.reveal-stagger');
    if (!containers.length) return;
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    const step = isMobile ? 50 : 80;
    const cap = 5;
    containers.forEach(container => {
      Array.from(container.children).forEach((child, i) => {
        const idx = Math.min(i, cap - 1);
        child.style.transitionDelay = (idx * step) + 'ms';
      });
    });
  }

  /* ----- Counter up (cubic easing) ----- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = parseInt(el.dataset.duration || '1600', 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (isNaN(target)) return;
    if (prefersReduced) {
      el.textContent = target.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      });
      return;
    }
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const val = target * easeOutCubic(t);
      el.textContent = val.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      });
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('[data-counter]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(animateCounter);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ----- Nav: scroll state + mobile toggle ----- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // scroll state
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // mobile toggle
    const toggle = nav.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // close on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Language switcher: original PT + Google translated pages ----- */
  function initLanguageSwitcher() {
    const navList = document.querySelector('.nav-list');
    if (!navList || navList.querySelector('.lang-switcher')) return;

    const currentUrl = new URL(window.location.href);
    const fallbackOrigin = 'https://site-dra-ana-paula.vercel.app';
    const isPublicPage = currentUrl.protocol === 'http:' || currentUrl.protocol === 'https:';
    const isTranslateProxy = currentUrl.hostname.endsWith('.translate.goog');
    const pageMatch = currentUrl.pathname.match(/\/([^/]+\.html)$/);
    const fallbackPath = pageMatch ? '/' + pageMatch[1] : '/';
    const mustUseFallback = isTranslateProxy || currentUrl.hostname === 'anapaulateixeira.med.br';
    const originalUrl = isPublicPage && !mustUseFallback
      ? currentUrl.href
      : new URL(fallbackPath, fallbackOrigin).href;

    const buildTranslateUrl = (lang) => {
      const params = new URLSearchParams({
        sl: 'pt',
        tl: lang,
        u: originalUrl
      });
      return 'https://translate.google.com/translate?' + params.toString();
    };

    const li = document.createElement('li');
    li.className = 'lang-switcher';
    li.setAttribute('aria-label', 'Selecionar idioma');
    li.innerHTML = [
      '<a class="lang-link" href="' + originalUrl + '" aria-label="Português" title="Português">',
      '<span class="flag-icon flag-br" aria-hidden="true"></span><span class="sr-only">Português</span>',
      '</a>',
      '<a class="lang-link" href="' + buildTranslateUrl('en') + '" aria-label="English" title="English" rel="noopener">',
      '<span class="flag-icon flag-us" aria-hidden="true"></span><span class="sr-only">English</span>',
      '</a>',
      '<a class="lang-link" href="' + buildTranslateUrl('es') + '" aria-label="Español" title="Español" rel="noopener">',
      '<span class="flag-icon flag-es" aria-hidden="true"></span><span class="sr-only">Español</span>',
      '</a>'
    ].join('');

    const cta = navList.querySelector('.nav-cta');
    const ctaItem = cta ? cta.closest('li') : null;
    navList.insertBefore(li, ctaItem || null);
  }

  /* ----- Event popup: delayed ABRH callout ----- */
  function initEventPopup() {
    if (document.querySelector('.event-popup')) return;
    const storageKey = 'draAnaEventPopupDismissed';
    try {
      if (sessionStorage.getItem(storageKey) === '1') return;
    } catch (err) {
      // Ignore storage restrictions in private or embedded contexts.
    }

    const popup = document.createElement('aside');
    popup.className = 'event-popup';
    popup.setAttribute('aria-label', 'Evento em destaque');
    popup.innerHTML = [
      '<div class="event-popup-card">',
      '<div class="event-popup-accent" aria-hidden="true"></div>',
      '<button class="event-popup-close" type="button" aria-label="Fechar aviso do evento" data-event-popup-close>&times;</button>',
      '<div class="event-popup-body">',
      '<span class="event-popup-kicker">NR-1 em pauta</span>',
      '<strong class="event-popup-title">Formação presencial em parceria com a ABRH</strong>',
      '<p class="event-popup-text">Riscos psicossociais na prática · 31/07 e 01/08 · Salvador.</p>',
      '<a class="event-popup-cta" href="https://abrhba.org.br/formacao-profissional/riscos-psicossociais-na-pratica.html" target="_blank" rel="noopener">Ver inscrição</a>',
      '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(popup);

    const close = popup.querySelector('[data-event-popup-close]');
    const timer = window.setTimeout(() => {
      popup.classList.add('is-visible');
    }, 20000);
    const dismiss = () => {
      window.clearTimeout(timer);
      popup.classList.remove('is-visible');
      try {
        sessionStorage.setItem(storageKey, '1');
      } catch (err) {
        // Nothing to persist.
      }
    };

    close.addEventListener('click', dismiss);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && popup.classList.contains('is-visible')) dismiss();
    });
  }

  /* ----- Smooth scroll for in-page anchors ----- */
  function initSmoothScroll() {
    if (prefersReduced) return;
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ----- Marquee duplication for seamless loop ----- */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      if (track.dataset.duplicated) return;
      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.parentNode.appendChild(clone);
      track.dataset.duplicated = '1';
    });
  }

  /* ----- Init ----- */
  function init() {
    initStagger();   // antes do reveal — aplica delays nos filhos
    initReveal();
    initCounters();
    initNav();
    initLanguageSwitcher();
    initEventPopup();
    // intentionally NOT using scrollIntoView — causes layout issues in embedded views
    // initSmoothScroll();
    initMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
