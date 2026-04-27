---
name: ana-paula-teixeira-design
description: Use this skill to generate well-branded interfaces and assets for Dra. Ana Paula Teixeira (anapaulateixeira.med.br) — médica do trabalho, autora e pesquisadora de Lesão Moral Ocupacional. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Use for the institutional website, decks, PDFs, slides, LPs, and any branded surface.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. Pay particular attention to:

- `colors_and_type.css` — design tokens (palette, type scale, spacing, motion)
- `design-system.css` — full component library + two visual modes (Clareza / Profundidade)
- `design-system.js` — vanilla JS (reveal on scroll, counters, mobile nav, marquee)
- `preview.html` — canonical reference showing every component
- `ui_kits/website/` — JSX components for the institutional site
- `assets/` — logos, signature placeholder, book cover placeholder

## Como usar

Se você está criando artefatos visuais (slides, mocks, protótipos descartáveis):

1. Copie os arquivos `colors_and_type.css`, `design-system.css`, `design-system.js` e a pasta `assets/` para o projeto de destino.
2. Importe `design-system.css` no `<head>`.
3. Decida o **modo visual** por natureza do conteúdo:
   - **Modo Clareza** (classe `.modo-clareza`, padrão): Home, Serviços, NR-1, Materiais, Contato, LPs comerciais. Fundo off-white, títulos retos, CTA terracota.
   - **Modo Profundidade** (classe `.modo-profundidade`): Livro, Pesquisa, Moral Injury, casos reais, ensaios. Fundo verde-noturno ou foto, títulos em itálico.
4. Use apenas os componentes documentados em `preview.html`. Não invente novos estilos.

Se você está trabalhando em código de produção, copie os assets e leia as regras para se tornar um especialista em design com a marca.

## Regras não-negociáveis (não violar)

1. **Zero cores fora da paleta.** Apenas: `#F0EDE6`, `#E8DDD2`, `#1C3520`, `#B95839`, `#1A1A1A`, `#5C5852`. Proibidos: verde médio `#2E7035`, sage, creme, roxo, lilás, azul, gradientes, glow, sombras coloridas.
2. **Border-radius máximo: 4px.**
3. **Zero emojis** em qualquer contexto.
4. **Terracota no máximo 1× por seção.**
5. **Verde-noturno não cobre seção inteira sem critério** — máximo 1 exceção por página.
6. **Off-white domina** (mínimo 75% da área).
7. **Mobile-first** de 320px a 1440px.
8. **Respeitar `prefers-reduced-motion`.**
9. **Vanilla apenas** (sem Tailwind, Bootstrap, jQuery, frameworks). Fontes só via Google Fonts.

## Voz de marca

Tríade: **Técnica · Acolhedora · Corajosa.** Fórmula: ciência com linguagem de conselho executivo, atravessada por sensibilidade humana e coragem moral.

**Nunca soar como:** coach, palestrante motivacional, infoprodutora, wellness genérico.

**Vocabulário obrigatório:** NR-1, Moral Injury, Lesão Moral Ocupacional, fatores psicossociais, PGR, GRO, diagnóstico organizacional, integridade organizacional, passivo trabalhista, responsabilidade técnica.

**Vocabulário proibido:** felicidade no trabalho, mindset positivo, coach/coaching, bem-estar (genérico), incrível, revolucionário, disruptivo, humanização, virar a chave, mindfulness corporativo, "no mundo atual", "você sabia que".

**CRM-BA 12797** em todos os materiais de autoria. **NR-1** sempre com data (26 de maio de 2026) e multa (R$ 6.708,08 por trabalhador exposto). **PL 1305/25** sempre como "em tramitação".

## Teste anti-commodity

Antes de entregar qualquer peça, pergunte:
> "Esse conteúdo poderia ter sido feito por qualquer concorrente?"

Se sim, reescrever. Diferenciais obrigatórios: **Moral Injury · NR-1 · CRM**. Usar os três juntos, sempre.

## Se invocada sem contexto

Pergunte ao usuário o que deseja construir ou desenhar (página, LP, slide, material gráfico, e-mail etc.), faça perguntas de escopo (qual página, qual modo visual, CTA principal, público) e então atue como designer especialista — produzindo HTML estático para artefatos visuais ou código de produção conforme a necessidade.
