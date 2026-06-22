/* =========================================================
   form-handlers.js
   — Gestão unificada dos 3 formulários (Serviços, Contato, Newsletter)
   — Google Forms submission + WhatsApp parallel path
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 0. Backup silencioso no Supabase ---------- */
  /* Grava uma cópia de cada envio antes de abrir o WhatsApp, para que
     nenhum lead se perca caso a pessoa não conclua a mensagem.
     Insert puro (Prefer: return=minimal) — sem leitura de volta (RLS). */
  var SUPABASE_URL = 'https://nufozcsdcgmihwusowfm.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_kfdyNSEt5y4nzoz2nmr-rg_1qlhHUAQ';

  function getVal(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? (el.value || '').trim() : null;
  }

  function saveLeadToSupabase(form) {
    try {
      var data = {
        nome: getVal(form, 'nome'),
        empresa: getVal(form, 'empresa'),
        cargo: getVal(form, 'cargo'),
        email: getVal(form, 'email'),
        telefone: getVal(form, 'telefone'),
        motivo: getVal(form, 'motivo'),
        mensagem: getVal(form, 'mensagem'),
        origem: form.getAttribute('data-origem') || (location.pathname || 'site')
      };
      fetch(SUPABASE_URL + '/rest/v1/leads_anapaula', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(function () {});
    } catch (e) { /* nunca bloqueia o envio pelo WhatsApp */ }
  }

  /* ---------- 1. WhatsApp parallel path ---------- */
  /* Botão [data-wa-prefill] dentro de um <form data-wa-phone="..."> coleta
     os campos preenchidos e abre wa.me com mensagem formatada. */

  document.querySelectorAll('[data-wa-prefill]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var form = btn.closest('form');
      if (!form) return;
      openWhatsAppFromForm(form);
    });
  });

  document.querySelectorAll('form[data-wa-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      openWhatsAppFromForm(form);
    });
  });

  function openWhatsAppFromForm(form) {
    saveLeadToSupabase(form);
    var phone = form.getAttribute('data-wa-phone') || '5575983186200';
    var msg = buildWhatsAppMessage(form);
    var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener');
  }

  function buildWhatsAppMessage(form) {
    var lines = ['*Solicitação via site — Dra. Ana Paula Teixeira*', ''];
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (f) {
      if (!f.name || f.type === 'submit' || f.type === 'button') return;
      var label = getFieldLabel(f);
      var value = (f.value || '').trim();
      if (value) lines.push('*' + label + ':* ' + value);
    });
    lines.push('');
    lines.push('_Enviado pelo site anapaulateixeira.med.br_');
    return lines.join('\n');
  }

  function getFieldLabel(field) {
    /* Try: associated <label>, then placeholder, then name */
    if (field.id) {
      var lbl = document.querySelector('label[for="' + field.id + '"]');
      if (lbl) return lbl.textContent.replace(/\*/g, '').trim();
    }
    var parentLabel = field.closest('label');
    if (parentLabel) return parentLabel.textContent.replace(/\*/g, '').trim();
    var fieldWrap = field.closest('.field, .fg');
    if (fieldWrap) {
      var l = fieldWrap.querySelector('.field-label, label');
      if (l) return l.textContent.replace(/\*/g, '').trim();
    }
    if (field.placeholder) return field.placeholder;
    return field.name;
  }

  /* ---------- 2. Google Forms submission feedback ---------- */
  /* Google Forms não permite CORS — não dá pra ler a resposta.
     Estratégia: submeter via target="_blank" (action já está assim)
     e mostrar mensagem de sucesso local após um pequeno delay. */

  document.querySelectorAll('form[action*="docs.google.com/forms"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      /* O form submete normalmente para o Google (em nova aba / hidden).
         Aqui só mostramos o feedback editorial. */
      setTimeout(function () { showFormSuccess(form); }, 400);
    });
  });

  function showFormSuccess(form) {
    /* Preserve form height to avoid layout jump */
    var h = form.offsetHeight;
    var wrap = document.createElement('div');
    wrap.className = 'form-success';
    wrap.style.minHeight = h + 'px';
    wrap.innerHTML =
      '<div class="form-success-inner">' +
        '<div class="form-success-mark">✓</div>' +
        '<h3>Mensagem recebida.</h3>' +
        '<p>Obrigada pelo contato. Respondemos em até <strong>48h úteis</strong>.</p>' +
        '<p class="form-success-note">Se preferir resposta mais rápida, continue pelo WhatsApp.</p>' +
        '<a href="https://wa.me/5575983186200" target="_blank" rel="noopener" class="form-success-wa">Abrir WhatsApp →</a>' +
      '</div>';
    form.parentNode.replaceChild(wrap, form);
  }
})();
