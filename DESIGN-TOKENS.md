# DESIGN-TOKENS — Fundações visuais

Tokens e regras visuais do sistema. Consultar antes de produzir qualquer peça gráfica. Voz e linguagem ficam em [`BRAND.md`](BRAND.md).

---

## Paleta (fixa, sem exceção)

| Token | Hex | Uso |
|---|---|---|
| `--off-white` | `#F0EDE6` | fundo dominante (mín. 75% da área) |
| `--bege-areia` | `#E8DDD2` | cards, superfícies secundárias |
| `--verde-noturno` | `#1C3520` | texto, elementos, fundo editorial pontual |
| `--terracota` | `#B95839` | CTAs, destaques (máx. 1x por seção) |
| `--preto-editorial` | `#1A1A1A` | corpo de texto |
| `--cinza-quente` | `#5C5852` | texto secundário |

**Proibidas em absoluto:** verde médio `#2E7035`, sage `#DBE2D9`, creme `#EED6C7`, roxo, lilás, azul em qualquer tom, qualquer gradiente, glow, sombras coloridas.

---

## Tipografia

- **Títulos:** Cormorant Garamond Bold (600 / 700) — reto no Modo Clareza, itálico no Modo Profundidade.
- **Corpo:** Poppins Light (300) e Regular (400).
- **Labels uppercase:** Poppins Medium (500) com `letter-spacing: 0.25em`.
- **Destaques / quotes:** Cormorant Garamond Bold Italic.

Toda escala via `clamp()`. Títulos com `text-wrap: balance`. Parágrafos com `text-wrap: pretty`.

---

## Espaçamento

Sistema baseado em **8px** com extensões generosas para respiro editorial: 4, 8, 16, 24, 32, 48, 64, 96, 128, 192 px. Negative space é elemento de design, não ausência.

---

## Backgrounds

- **Predominante:** off-white `#F0EDE6` pleno. Sem texturas, sem ruído.
- **Secundário:** bege-areia `#E8DDD2` em cards e superfícies de segundo plano.
- **Modo Profundidade:** verde-noturno `#1C3520` pleno OU foto contextual (café, cerâmica, ambiente) com overlay.
- **Nunca:** gradientes, padrões repetidos, ilustrações decorativas de fundo.

---

## Animação

- **Reveal on scroll** via IntersectionObserver — opacidade 0 → 1 e `translateY` 16px → 0, duração 800ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Contadores animados** com easing cubic em números de autoridade (30 anos, CRM, etc.).
- **Marquee horizontal** em palavras-chave, velocidade moderada, sem stops abruptos.
- **Hover:** transições de 200ms em opacidade / cor, nunca em `transform` dramático.
- **`prefers-reduced-motion: reduce`** respeitado em todas as animações (desabilita reveal, marquee e counter).

---

## Hover / Press states

- **Links:** underline aparece ou se espessa; cor não muda bruscamente.
- **Botão terracota:** escurece 8% (`#A44B30`) em hover; `opacity: 0.9` em active.
- **Botão outlined verde-noturno:** fundo fica verde-noturno sólido em hover, texto off-white.
- **Botão fantasma (link com seta):** seta translada 4px à direita em hover.
- **Cards:** elevação sutilíssima via border que escurece; sem shadow colorida, sem scale.

---

## Bordas e raios

- **Border-radius máximo: 4px.** Estética editorial retilínea. Sem bordas suaves / amigáveis.
- **Borda de card Modo Clareza:** `1px solid rgba(28, 53, 32, 0.12)`; hover `1px solid rgba(28, 53, 32, 0.24)`.
- **Divisor editorial:** linha terracota 1px, 64px de largura.
- **Barra lateral de pullquote:** 3px sólida terracota.

---

## Sombras

- **Sem sombras coloridas. Sem glow. Sem brilho.**
- Elevação sutil permitida: `0 1px 0 rgba(28, 53, 32, 0.06)` em cards quando estritamente necessária. Preferir borda a shadow.

---

## Transparência e blur

- **Overlay de foto em Modo Profundidade:** `rgba(28, 53, 32, 0.72)` sobre a imagem para contraste de texto.
- **Corpo de texto sobre Modo Profundidade:** off-white com `opacity: 0.8`.
- **Blur:** não usar. Estética é nítida, editorial, sem efeitos.

---

## Layout

- **Grid:** 12 colunas, gutter 24px, `max-width: 1280px`.
- **Mobile-first** de 320px até 1440px.
- **Margens de respiro:** seções com padding vertical 96–160px em desktop, 64–96px em mobile.
- **Nav fixa no topo** com fundo off-white sutilmente translúcido ao scrollar.

---

## Imagética — vibe

- **Paleta quente sempre.** Nunca frio (azul, roxo).
- **Desaturação leve** — nunca cores vibrantes.
- **Luz natural** ou soft box lateral, nunca flash frontal.
- **Objetos simbólicos** em Modo Profundidade: café, livro aberto, cerâmica Kintsugi, papel com escrita, escritório com luz natural.

---

## Elementos geométricos permitidos

Sempre em verde-noturno `#1C3520`:

- Barra lateral 4–8px (divisor editorial)
- Linha horizontal (separador de seção)
- Triângulo (âncora pontual)
- Quadrado rotacionado (elemento dinâmico)
- Círculo outline (frame de foto)

**Proibidos:** ícones coloridos decorativos, ícones arredondados amigáveis, ilustrações flat-design.

---

## Iconografia

**A marca não usa ícones decorativos.** Este é um princípio estruturante, não uma limitação.

A hierarquia editorial — tipografia serifada, eyebrows uppercase com ponto terracota, divisores lineares, barras laterais — cumpre o papel que ícones cumpririam em um design system de SaaS ou wellness. Ícone colorido lê como "app". Letra serifada lê como "autoridade".

### Permitido

- **Elementos geométricos mínimos** (barra, linha, triângulo, quadrado, círculo outline) sempre em verde-noturno sólido, nunca em cor de acento, nunca com fill.
- **Ícones de UI estritamente funcionais** (hamburger menu, seta de link, X de fechar, chevron) desenhados como linhas finas verde-noturno, stroke 1.5px, sem preenchimento. Implementados inline como SVG.
- **Logos WhatsApp / Instagram / LinkedIn** no footer — monocromáticos em off-white sobre verde-noturno, sem as cores originais das marcas.

### Proibido

- Ícones decorativos coloridos
- Emoji em qualquer contexto (incluindo favicon, título de aba, copy)
- Ilustrações flat-design ou line-art "amigáveis"
- Ícones de bibliotecas tipo Feather / Lucide aplicados como elementos decorativos ao lado de títulos
- Unicode symbols (`⚡ ✨ 🔒` etc.)

### Substituições

Se uma biblioteca de ícones for necessária para UI funcional (setas, chevrons, menu), usar inline SVG desenhado manualmente com stroke 1.5px em verde-noturno, sem biblioteca externa. **Nenhuma substituição de CDN foi introduzida neste sistema.**
