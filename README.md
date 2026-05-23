# Dra. Ana Paula Teixeira — Design System

Sistema de design editorial para o site institucional da **Dra. Ana Paula Teixeira** (`anapaulateixeira.med.br`) — médica do trabalho (CRM-BA 12797 · RQE 7237), autora de *Quando o Trabalho Dói* e pesquisadora pioneira de **Moral Injury** aplicado ao contexto organizacional brasileiro.

A marca se posiciona em três colunas de autoridade — medicina do trabalho com 30 anos de prática clínica e corporativa, autoria de referência, pesquisa acadêmica em Lesão Moral Ocupacional — e se comunica como **conselho executivo atravessado por sensibilidade humana e coragem moral**. Nunca como palestrante motivacional, coach ou infoprodutora.

Arquitetura atual: **sete páginas** — Home · Sobre · Serviços · Livro · Blog · Na Mídia · Contato.

---

## Os três arquivos de referência

| Arquivo | O que guarda |
|---|---|
| `README.md` (este) | Contexto, estrutura do projeto, como usar |
| [`BRAND.md`](BRAND.md) | Voz de marca, vocabulário, frases-âncora, regras de escrita |
| [`DESIGN-TOKENS.md`](DESIGN-TOKENS.md) | Paleta, tipografia, espaçamento, animação, iconografia |

Qualquer decisão de copy consulta `BRAND.md`. Qualquer decisão visual consulta `DESIGN-TOKENS.md`. Violações não devem existir em produção.

---

## Referências visuais

- **The New York Times Magazine** — hierarquia editorial, respiro, seriedade
- **Aesop** — off-white dominante, serifa editorial, terracota como acento pontual
- **Kinfolk** — fotografia contextual, negative space

Sobriedade editorial com elegância inspirada. Sem estética de infoproduto, sem coach, sem SaaS, sem wellness genérico.

---

## Estrutura do projeto

```
project/
├── README.md                    este arquivo (contexto + como usar)
├── BRAND.md                     voz, vocabulário, frases-âncora
├── DESIGN-TOKENS.md             paleta, tipografia, espaçamento, animação
├── SKILL.md                     instruções para uso como Agent Skill
├── DEPLOY-GITHUB.md             guia de deploy
├── README-formularios.md        integração de formulários
│
├── colors_and_type.css          tokens base: cores, tipografia, escalas
├── design-system.css            sistema completo: componentes, dois modos visuais
├── design-system.js             animações vanilla (reveal, counter, menu mobile)
├── form-handlers.css            estilos de formulário
├── form-handlers.js             handlers de submissão
│
├── index.html                   Home
├── servicos.html                Palestra · Roda · Círculo NR-1 · ebook isca
├── livro.html                   Quando o Trabalho Dói
├── blog.html                    Textos autorais
├── na-midia.html                Clientes · depoimentos · imprensa · entrevistas
├── contato.html                 Formulário + canais diretos
├── politica-privacidade.html    Página legal
├── preview.html                 Demonstração de componentes do design system
├── preview/                     Cards do Design System tab (colors, type, etc.)
│
├── sitemap.xml                  Sitemap público
├── robots.txt                   Diretrizes para crawlers
│
├── assets/                      Imagens, logos, fotografias
│   ├── logo-principal.svg
│   ├── logo-invertido.svg
│   ├── logo-editorial.svg
│   ├── assinatura.jpeg
│   ├── favicon.png
│   ├── og-default.png
│   ├── portrait-hero.png
│   ├── book-cover-real.png
│   ├── logos/                   Logos de clientes (na-midia.html)
│   └── photos/                  Galeria editorial
│
├── fonts/                       Cormorant Garamond · Poppins
├── ui_kits/website/             React snippets de referência
└── uploads/                     Assets brutos enviados pela cliente
```

---

## Como usar

1. Inclua `colors_and_type.css` e `design-system.css` no `<head>` de qualquer página.
2. Escolha o modo visual aplicando a classe `.modo-clareza` (padrão) ou `.modo-profundidade` no container da seção.
3. Para animações, inclua `design-system.js` antes do `</body>`.
4. Consulte `preview.html` como referência canônica de todos os componentes em ambos os modos.
5. Qualquer dúvida sobre **o que escrever** → `BRAND.md`.
6. Qualquer dúvida sobre **como parece** → `DESIGN-TOKENS.md`.

---

## Pendências de assets

- **Fotografia da Dra. Ana Paula** — verificar se os retratos em `assets/photos/` são autorais e definitivos ou se permanecem placeholders.
- **Assinatura manuscrita** — `assets/assinatura.jpeg` é a assinatura real fornecida pela cliente em raster com fundo branco. Para uso editorial em fundos coloridos, considerar vetorização ou remoção de fundo (PNG transparente).
