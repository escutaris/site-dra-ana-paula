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
    // Lead no pixel da Meta (só envia se a pessoa aceitou os cookies)
    if (window.escutarisLead) window.escutarisLead();
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
    saveLeadToZoho(form);
  }

  /* ---------- 0b. Cópia do lead no Zoho CRM ---------- */
  /* Transição do Supabase para o Zoho (21/09/2026). Formulário web
     "Sites e landings - leads"; as chaves abaixo são públicas. Envio por
     fora: se o Zoho falhar, nada muda para quem está preenchendo. */
  function saveLeadToZoho(form) {
    try {
      var email = getVal(form, 'email');
      if (!email) return;
      var partes = (getVal(form, 'nome') || '').split(/\s+/).filter(Boolean);
      var sobrenome = partes.length > 1 ? partes.pop() : (partes[0] || 'Sem nome');
      var nome = partes.length ? partes.join(' ') : '';
      var d = new URLSearchParams();
      d.append('xnQsjsdp', '7cfa33e6b9556bf57389e3bdd8c348d4458747e166e2592f6ec4a1425c1a7445');
      d.append('xmIwtLD', '3a9dee7718f233d47ee2be042fb1642d7cd055de14277d0ee26ba09821b1aef116ea37815d5e470e4b3220a416417990');
      d.append('actionType', 'TGVhZHM=');
      d.append('returnURL', 'https://www.escutaris.com.br');
      d.append('zc_gad', '');
      d.append('aG9uZXlwb3Q', '');
      d.append('Company', getVal(form, 'empresa') || 'Não informado');
      d.append('First Name', nome);
      d.append('Last Name', sobrenome);
      d.append('Email', email);
      d.append('Phone', getVal(form, 'telefone') || '');
      d.append('Designation', getVal(form, 'cargo') || '');
      d.append('Description', getVal(form, 'mensagem') || '');
      d.append('LEADCF14', 'Site Dra. Ana Paula (' + (form.getAttribute('data-origem') || location.pathname || 'site') + ')');
      d.append('LEADCF15', getVal(form, 'motivo') || '');
      fetch('https://crm.zoho.com/crm/WebToLeadForm', { method: 'POST', mode: 'no-cors', keepalive: true, body: d })
        .catch(function () {});
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

  /* ---------- 1b. Caminho por e-mail ---------- */
  /* [data-email-submit] dentro de um <form>: leva os campos preenchidos no
     corpo da mensagem e grava a mesma cópia de segurança do caminho WhatsApp.
     Sem isso o mailto abria um e-mail em branco e o que a pessoa digitou
     se perdia. */

  document.querySelectorAll('[data-email-submit]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var form = btn.closest('form');
      if (!form) return;
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      saveLeadToSupabase(form);
      var to = btn.getAttribute('data-email-submit');
      var motivo = getVal(form, 'motivo');
      var subject = 'Contato pelo site' + (motivo ? ': ' + motivo : '');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(buildEmailBody(form));
    });
  });

  function buildEmailBody(form) {
    var lines = [];
    form.querySelectorAll('input, select, textarea').forEach(function (f) {
      if (!f.name || f.type === 'submit' || f.type === 'button') return;
      var value = (f.value || '').trim();
      if (value) lines.push(getFieldLabel(f) + ': ' + value);
    });
    lines.push('');
    lines.push('Enviado pelo formulário de draanapaulateixeira.com.br');
    return lines.join('\n');
  }

  function openWhatsAppFromForm(form) {
    saveLeadToSupabase(form);
    var phone = form.getAttribute('data-wa-phone') || '5571981357004';
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
    lines.push('_Enviado pelo site draanapaulateixeira.com.br_');
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
        '<a href="https://wa.me/5571981357004" target="_blank" rel="noopener" class="form-success-wa">Abrir WhatsApp →</a>' +
      '</div>';
    form.parentNode.replaceChild(wrap, form);
  }
})();
