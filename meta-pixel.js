/* Pixel da Meta "Ana Paula" + aviso de cookies (LGPD). Portfólio da Escutaris.
   O pixel só é carregado depois que a pessoa aceita. A escolha fica guardada no navegador.
   Para marcar um lead enviado: window.escutarisLead && window.escutarisLead();
   Mesmo arquivo no site e na bio da Dra.; ao mudar aqui, copiar para o outro. */
(function () {
  var PIXEL_ID = '1254448397763022';
  var CHAVE = 'dra-ana-paula-cookies';

  function lerEscolha() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravarEscolha(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  function ligarPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  window.escutarisLead = function () {
    if (window.fbq) window.fbq('track', 'Lead');
  };

  function mostrarAviso() {
    var css = document.createElement('style');
    css.textContent =
      '.esc-cookies{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;gap:12px;' +
      'background:#fefefe;color:#222d19;border-top:1px solid #e4dfd9;box-shadow:0 -4px 16px rgba(34,45,25,.08);' +
      'padding:10px 16px;font:400 13px/1.4 Poppins,system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:only light}' +
      '.esc-cookies p{margin:0;flex:1 1 auto;min-width:0}' +
      '.esc-cookies__botoes{display:flex;gap:8px;flex:none}' +
      '.esc-cookies button{font:inherit;font-weight:500;border-radius:999px;padding:6px 14px;cursor:pointer;border:1px solid #b95839}' +
      '.esc-cookies__sim{background:#b95839;color:#fefefe}' +
      '.esc-cookies__nao{background:transparent;color:#b95839}' +
      '@media (min-width:768px){.esc-cookies{justify-content:center}.esc-cookies p{flex:0 1 auto}}';
    document.head.appendChild(css);

    var caixa = document.createElement('div');
    caixa.className = 'esc-cookies';
    caixa.setAttribute('role', 'dialog');
    var TXT = {
      pt: ['Aviso de cookies', 'Usamos cookies para medir as visitas e mostrar nossos anúncios.', 'Recusar', 'Aceitar'],
      en: ['Cookie notice', 'We use cookies to measure visits and show our ads.', 'Decline', 'Accept'],
      es: ['Aviso de cookies', 'Usamos cookies para medir las visitas y mostrar nuestros anuncios.', 'Rechazar', 'Aceptar'],
      zh: ['Cookie 提示', '我们使用 Cookie 统计访问量并展示我们的广告。', '拒绝', '接受']
    };
    var t = TXT[(document.documentElement.lang || 'pt').slice(0, 2)] || TXT.pt;
    caixa.setAttribute('aria-label', t[0]);
    caixa.innerHTML =
      '<p>' + t[1] + '</p>' +
      '<div class="esc-cookies__botoes">' +
      '<button type="button" class="esc-cookies__nao">' + t[2] + '</button>' +
      '<button type="button" class="esc-cookies__sim">' + t[3] + '</button></div>';
    document.body.appendChild(caixa);

    caixa.querySelector('.esc-cookies__sim').addEventListener('click', function () {
      gravarEscolha('aceito'); caixa.remove(); ligarPixel();
    });
    caixa.querySelector('.esc-cookies__nao').addEventListener('click', function () {
      gravarEscolha('recusado'); caixa.remove();
    });
  }

  var escolha = lerEscolha();
  if (escolha === 'aceito') ligarPixel();
  else if (escolha !== 'recusado') {
    if (document.body) mostrarAviso();
    else document.addEventListener('DOMContentLoaded', mostrarAviso);
  }
})();
