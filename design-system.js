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
      toggle.setAttribute('aria-expanded', 'false');
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

    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* ----- Seletor de idiomas: PT na raiz, traduções em /en/, /es/, /zh/ -----
     As páginas traduzidas são montadas por i18n/build.py. Em telas largas as
     bandeiras ficam numa faixa acima do menu; no celular, dentro do menu. */
  function initLanguageSwitcher() {
    const navList = document.querySelector('.nav-list');
    if (!navList || navList.querySelector('.lang-switcher')) return;

    const IDIOMAS = [
      { cod: 'pt', flag: 'br', nome: 'Português' },
      { cod: 'en', flag: 'us', nome: 'English' },
      { cod: 'es', flag: 'es', nome: 'Español' },
      { cod: 'zh', flag: 'cn', nome: '中文' }
    ];
    const ROTULO = { pt: 'Idioma', en: 'Language', es: 'Idioma', zh: '语言' };

    const partes = window.location.pathname.split('/');
    let pagina = partes.pop() || 'index.html';
    if (!/\.html$/.test(pagina)) pagina = 'index.html';
    const pasta = partes[partes.length - 1];
    const atual = ['en', 'es', 'zh'].indexOf(pasta) >= 0 ? pasta : 'pt';
    const web = location.protocol === 'http:' || location.protocol === 'https:';

    const link = (cod) => {
      if (web) {
        const nome = pagina === 'index.html' ? '' : pagina;
        return '/' + (cod === 'pt' ? '' : cod + '/') + nome;
      }
      // prévia local (file://): caminho relativo
      const subir = atual === 'pt' ? '' : '../';
      return subir + (cod === 'pt' ? '' : cod + '/') + pagina;
    };

    const montar = () => {
      const li = document.createElement('li');
      li.className = 'lang-switcher';
      li.setAttribute('aria-label', ROTULO[atual]);
      li.innerHTML = IDIOMAS.map((i) =>
        '<a class="lang-link" href="' + link(i.cod) + '" hreflang="' + i.cod + '" lang="' + i.cod + '"' +
        ' aria-label="' + i.nome + '" title="' + i.nome + '"' +
        (i.cod === atual ? ' aria-current="true"' : '') + '>' +
        '<span class="flag-icon flag-' + i.flag + '" aria-hidden="true"></span>' +
        '<span class="sr-only">' + i.nome + '</span></a>'
      ).join('');
      return li;
    };

    // dentro do menu (celular)
    const cta = navList.querySelector('.nav-cta');
    const ctaItem = cta ? cta.closest('li') : null;
    navList.insertBefore(montar(), ctaItem || null);

    // faixa acima do menu (telas largas)
    const nav = document.getElementById('nav') || navList.closest('nav');
    if (nav && !document.querySelector('.lang-bar')) {
      const barra = document.createElement('div');
      barra.className = 'lang-bar';
      const dentro = document.createElement('div');
      dentro.className = 'lang-bar-inner';
      dentro.textContent = ROTULO[atual];
      const sw = montar();
      const div = document.createElement('div');
      div.className = sw.className;
      div.setAttribute('aria-label', ROTULO[atual]);
      div.innerHTML = sw.innerHTML;
      dentro.appendChild(div);
      barra.appendChild(dentro);
      nav.parentNode.insertBefore(barra, nav);
    }
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

  /* ----- Botão flutuante do WhatsApp -----
     Aparece depois de rolar 500px. A mensagem pronta sai no idioma da página
     e diz de qual página a pessoa veio, para a Dra. Ana saber o interesse. */
  function initWhatsAppFlutuante() {
    if (document.querySelector('.wa-float')) return;
    const IDIOMA = (document.documentElement.lang || 'pt').slice(0, 2);
    const lang = ['pt', 'en', 'es', 'zh'].indexOf(IDIOMA) >= 0 ? IDIOMA : 'pt';
    const PAGINAS = {
      'index.html': { pt: 'página inicial', en: 'home page', es: 'página de inicio', zh: '首页' },
      'palestras.html': { pt: 'Palestras', en: 'Talks', es: 'Charlas', zh: '讲座' },
      'rodas-de-conversa.html': { pt: 'Rodas de Conversa', en: 'Conversation Circles', es: 'Círculos de Conversación', zh: '圆桌对话' },
      'direcionamento.html': { pt: 'Direcionamento Executivo', en: 'Executive Guidance', es: 'Orientación Ejecutiva', zh: '管理者指导' },
      'livro.html': { pt: 'Livro', en: 'Book', es: 'Libro', zh: '著作' },
      'contato.html': { pt: 'Contato', en: 'Contact', es: 'Contacto', zh: '联系' },
      'imprensa.html': { pt: 'Imprensa', en: 'Press', es: 'Prensa', zh: '媒体中心' },
      'governanca.html': { pt: 'Governança', en: 'Governance', es: 'Gobernanza', zh: '治理' },
      'politica-privacidade.html': { pt: 'Política de Privacidade', en: 'Privacy Policy', es: 'Política de Privacidad', zh: '隐私政策' }
    };
    let arquivo = window.location.pathname.split('/').pop() || 'index.html';
    if (!PAGINAS[arquivo]) arquivo = 'index.html';
    const pag = PAGINAS[arquivo][lang];
    const MSG = {
      pt: 'Olá! Vim pelo site da Dra. Ana Paula Teixeira (página: ' + pag + ') e gostaria de mais informações.',
      en: "Hello! I found Dr. Ana Paula Teixeira's website (page: " + pag + ') and would like more information.',
      es: '¡Hola! Llegué por el sitio web de la Dra. Ana Paula Teixeira (página: ' + pag + ') y me gustaría recibir más información.',
      zh: '您好！我是通过 Ana Paula Teixeira 医生的网站（页面：' + pag + '）找到您的，想了解更多信息。'
    };
    const ROTULO = { pt: 'Falar pelo WhatsApp', en: 'Message on WhatsApp', es: 'Escribir por WhatsApp', zh: 'WhatsApp 联系' };

    const a = document.createElement('a');
    a.className = 'wa-float';
    a.href = 'https://wa.me/5571981357004?text=' + encodeURIComponent(MSG[lang]);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', ROTULO[lang]);
    a.title = ROTULO[lang];
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.25-2.15a12.1 12.1 0 0 0 3.79.61h.01C22.68 27.46 28 22.1 28 15.49 28 8.88 22.68 3 16.04 3zm0 22.43h-.01a10.1 10.1 0 0 1-5.13-1.4l-.37-.22-4.9 1.28 1.31-4.76-.24-.39a9.9 9.9 0 0 1-1.53-5.3c0-5.5 4.5-9.97 10.88-9.97 5.5 0 9.95 4.47 9.95 9.97 0 5.5-4.46 10.79-9.96 10.79zm5.46-7.45c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>';
    document.body.appendChild(a);

    const mostrar = () => a.classList.toggle('is-visible', window.scrollY > 500);
    window.addEventListener('scroll', mostrar, { passive: true });
    mostrar();
  }

  /* ----- Init ----- */
  function init() {
    initStagger();   // antes do reveal — aplica delays nos filhos
    initReveal();
    initCounters();
    initNav();
    initLanguageSwitcher();
    initWhatsAppFlutuante();
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
