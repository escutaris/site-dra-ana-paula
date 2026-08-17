# Como conectar os formulários ao Google Forms

> **TL;DR:** O site já está pronto. Você só precisa criar 3 Google Forms, copiar 2 identificadores de cada, e colar em 3 arquivos HTML. Tempo total: ~30 minutos. Depois disso, cada envio do site chega automaticamente numa planilha Google — sem servidor, sem custo.

---

## Visão geral

O site tem 3 formulários:

| Página           | Finalidade             | Campos                                                               |
| ---------------- | ---------------------- | -------------------------------------------------------------------- |
| `servicos.html`  | Solicitação comercial  | Nome, Empresa, Cargo, E-mail, Telefone, Serviço, Mensagem             |
| `contato.html`   | Contato institucional  | Nome, E-mail, Empresa, Cargo, Natureza, Porte, Prazo, Mensagem        |
| `blog.html`      | Newsletter             | E-mail                                                                |

Cada um tem, **em paralelo**, um botão **"Enviar via WhatsApp"** que já funciona — ele coleta os campos preenchidos e abre o WhatsApp da Dra. Ana Paula (71 98135-7004) com a mensagem formatada. Esse caminho não depende de nenhuma configuração.

O caminho formal (Google Forms) precisa dos passos abaixo para ativar.

---

## Passo 1 — Criar o Google Form

1. Vá em [forms.google.com](https://forms.google.com) logado na conta da Dra. Ana Paula.
2. Clique em **+ Em branco** (Blank).
3. Dê o título, por exemplo **"Solicitação de Proposta — Site"**.
4. Adicione os campos exatamente na ordem listada na tabela acima, com os mesmos rótulos. Para campos `select`, use "Escolha múltipla" (Multiple choice) e liste as mesmas opções que aparecem no HTML.
5. Marque os campos obrigatórios (*) como obrigatórios (Required) no Google Form.
6. Clique em **Respostas → Vincular à planilha** — isso cria uma planilha Google onde cada envio vira uma linha nova.

Repita para os outros 2 formulários (Contato e Newsletter).

---

## Passo 2 — Obter o `FORM_ID` e os `entry.XXX`

### FORM_ID (o endpoint do form)

1. No Google Forms, clique em **Enviar** (botão roxo no topo).
2. Escolha o ícone de link (<link/>) e **copie o link curto** ou o longo — qualquer um.
3. O link é algo como:
   `https://docs.google.com/forms/d/e/1FAIpQLSe_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform`
4. O **FORM_ID** é a parte entre `/e/` e `/viewform` → `1FAIpQLSe_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### entry.XXX (os IDs de cada campo)

Esta é a parte chata mas só precisa ser feita uma vez por form:

1. Abra o formulário como se fosse preencher: clique em **Enviar → link → Abrir link**.
2. No navegador, clique com o botão direito na página → **Exibir código-fonte** (View source).
3. Use **Ctrl+F** para buscar `entry.`
4. Você verá padrões como `name="entry.1234567890"` associados a cada campo. Anote qual `entry.NUMERO` corresponde a qual campo (siga a ordem em que os campos aparecem na página).

**Atalho mais rápido:** abra o form, preencha todos os campos com valores óbvios tipo "AAA", "BBB", "CCC". Clique em Enviar. Depois volte para edição e clique em **Obter link pré-preenchido** → a URL gerada tem cada `entry.XXX=AAA` — é a lista completa.

---

## Passo 3 — Colar no HTML

Cada arquivo tem marcadores fáceis de encontrar. Use **Ctrl+F** para achar `__FORM_ID_` e substitua.

### `servicos.html`

Busque: `__FORM_ID_SERVICOS__`

1. Substitua por seu FORM_ID real.
2. Depois substitua cada `entry.NOME`, `entry.EMPRESA`, `entry.CARGO`, `entry.EMAIL`, `entry.TELEFONE`, `entry.SERVICO`, `entry.MENSAGEM` pelos `entry.NUMERO` correspondentes.

Exemplo antes/depois:
```html
<!-- ANTES -->
<form action="https://docs.google.com/forms/d/e/__FORM_ID_SERVICOS__/formResponse" ...>
  <input name="entry.NOME" ...>
  <input name="entry.EMAIL" ...>

<!-- DEPOIS -->
<form action="https://docs.google.com/forms/d/e/1FAIpQLSe_abc123xyz.../formResponse" ...>
  <input name="entry.1876543210" ...>
  <input name="entry.9988776655" ...>
```

### `contato.html`

Busque: `__FORM_ID_CONTATO__`

Substitua `entry.NOME`, `entry.EMAIL`, `entry.EMPRESA`, `entry.CARGO`, `entry.NATUREZA`, `entry.PORTE`, `entry.PRAZO`, `entry.MENSAGEM`.

### `blog.html`

Busque: `__FORM_ID_NEWSLETTER__`

Só tem 1 campo para substituir: `entry.EMAIL`.

---

## Passo 4 — Testar

1. Abra a página no navegador.
2. Preencha o form com dados de teste.
3. Clique em **Enviar**.
4. Verifique se apareceu o cartão de sucesso "Mensagem recebida".
5. Verifique se a nova linha apareceu na planilha vinculada ao Google Form.

Se não aparecer na planilha:
- Verifique se o FORM_ID está correto (sem espaços, sem aspas extras).
- Verifique se os `entry.NUMERO` batem com o form certo (é fácil trocar entre forms).
- Abra o console do navegador (F12) — se houver erro, ele mostrará.

---

## Onde os leads chegam

- **Via formulário** → planilha Google vinculada (acesse em forms.google.com → Respostas).
- **Via WhatsApp** → mensagem direta em 71 98135-7004.

Opcional: em cada Google Form, vá em **⋮ (três pontos) → Obter notificações por email** para receber um email a cada novo envio.

---

## Configurar notificações por email (recomendado)

No Google Forms:
1. Aba **Respostas**.
2. Ícone ⋮ (três pontos verticais) no canto superior direito da aba.
3. Marque **"Receber notificações por e-mail de novas respostas"**.

Pronto. Toda vez que alguém preencher o form no site, você recebe email.

---

## Alterar o número de WhatsApp

O número está em **2 lugares**:

1. `form-handlers.js` (linha com `|| '5571981357004'`) — número-fallback do script.
2. Atributo `data-wa-phone="5571981357004"` dentro das tags `<form>` de `servicos.html` e `contato.html`.
3. Links diretos `https://wa.me/5571981357004` espalhados pelo site (footer de todas as páginas, página contato, botões flutuantes).

Use Ctrl+F e substitua `5571981357004` globalmente. **Formato obrigatório:** 55 (Brasil) + DDD sem zero + número sem espaços/hífens.

---

## Perguntas frequentes

**Por que Google Forms e não um backend próprio?**
Zero custo, zero manutenção, planilha integrada, notificação por email, estabilidade Google. Perfeito para um site profissional pessoal.

**Posso trocar para Formspree / Typeform / Mailchimp depois?**
Sim. Basta trocar o `action="..."` do `<form>` pelo endpoint novo e ajustar os `name` dos inputs conforme a documentação do serviço escolhido. Nenhuma outra alteração é necessária.

**O CORS do Google Forms bloqueia o envio?**
Não — o script usa submissão tradicional via `target="_blank"` que contorna o CORS. O usuário não vê nenhuma página do Google (abre-se numa aba oculta que fecha sozinha) — ele vê só o cartão "Mensagem recebida" do próprio site.

**E se eu não configurar agora?**
O site continua funcional: o botão "Enviar via WhatsApp" já está ativo e captura leads. A submissão Google Form só vai falhar silenciosamente até você colar o FORM_ID real — mas isso não atrapalha a experiência (o cartão de sucesso aparece mesmo assim).
