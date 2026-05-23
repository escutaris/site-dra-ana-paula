# Plano de melhoria do site da Dra. Ana Paula Teixeira

## Diagnóstico rápido

O site tem boa matéria-prima: posicionamento forte, fotos autorais, prova de autoridade, páginas de serviços, página de livro e uma identidade visual coerente. O problema principal não é falta de conteúdo, é excesso de caminhos.

Hoje convivem duas arquiteturas:

- site institucional com várias páginas separadas;
- proposta já documentada de hub one-page com landing pages específicas.

Isso cria confusão para o visitante e para a manutenção. A prioridade é escolher uma arquitetura e fazer todos os links, CTAs, sitemap e formulários obedecerem a ela.

## Decisão estratégica recomendada

Usar arquitetura `hub + landing pages`.

O `index.html` deve ser a página central da marca, com leitura editorial, prova de autoridade e atalhos para conversão. As páginas específicas devem existir apenas quando tiverem função comercial clara:

- `palestras.html`: venda de palestras corporativas;
- `rodas-de-conversa.html`: venda do formato em grupo;
- `direcionamento.html`: landing page de conversão rápida;
- `livro.html`: autoridade editorial e compra do livro;
- `contato.html`: contato, se o formulário for tecnicamente confiável;
- `governanca.html` e `politica-privacidade.html`: páginas legais e institucionais.

A única isca digital ativa será o Guia técnico gratuito **Do Relato à Tomada de Decisão**, com link externo para a landing já publicada em `https://guia.anateixeiramed.com.br/`.

As demais páginas devem ser arquivadas, removidas do sitemap e removidas da navegação pública.

## Público e objetivo por tela

Cada tela precisa responder uma pergunta em menos de 10 segundos.

| Tela | Público principal | Ação principal |
|---|---|---|
| Home | RH, diretoria, liderança e imprensa que chegam sem contexto | entender autoridade e escolher próximo caminho |
| Palestras | RH, SESMT, eventos e empresas | pedir proposta pelo WhatsApp |
| Rodas | liderança e RH com grupo pequeno | solicitar roda de conversa |
| Direcionamento | líder ou profissional diante de caso concreto | agendar conversa rápida |
| Livro | leitor, RH, imprensa, compradores institucionais | comprar livro ou solicitar palestra baseada no livro |
| Contato | visitante que quer briefing formal | enviar contato com segurança |

## Prioridade 1: funcionalidade

1. Corrigir o formulário de contato.
   - O formulário atual usa `mailto:`, que depende do cliente de e-mail do visitante e costuma quebrar a conversão.
   - Trocar por backend real: Supabase Edge Function já prevista no projeto, Formspree, Netlify Forms ou outro handler.
   - Manter botão secundário de WhatsApp com mensagem pré-preenchida.

2. Corrigir links e sitemap.
   - `sitemap.xml` aponta para `blog.html` e `na-midia.html`, mas essas páginas estão arquivadas.
   - `index.html` aponta para `servicos.html#palestras` e `servicos.html#rodas`, mas esses anchors não existem.
   - Atualizar sitemap com as páginas realmente publicadas.

3. Definir CTAs por página.
   - Home: `Conhecer formatos` e `Falar pelo WhatsApp`.
   - Palestras: `Solicitar proposta`.
   - Rodas: `Solicitar Roda`.
   - Direcionamento: `Agendar Direcionamento`.
   - Livro: `Comprar na Amazon` e `Levar palestra para sua empresa`.

4. Melhorar performance.
   - Há imagens de 3 MB a 5 MB carregadas no site.
   - Converter fotos para WebP/AVIF, criar versões responsivas e manter PNG/JPG original só como arquivo-fonte.
   - Definir dimensões fixas para imagens críticas e usar `loading="lazy"` fora do primeiro viewport.

## Prioridade 2: clareza comercial

1. Reduzir a home.
   - A home deve ser uma página de decisão, não um repositório completo.
   - Manter: hero, autoridade, problema/triade, caminhos de serviço, livro, mídia/clientes, isca, CTA final.
   - Cortar repetições e mover detalhes para landing pages.

2. Escrever copy por intenção.
   - Para diretoria: risco, governança, reputação, evidência.
   - Para RH/SESMT: método, documentação, PGR/GRO, encaminhamento prático.
   - Para liderança: caso concreto, decisão, responsabilidade, linguagem humana.
   - Para imprensa/livro: trajetória, pesquisa, autoridade editorial.

3. Trocar blocos muito longos por escaneabilidade.
   - H2 claros.
   - Parágrafos curtos.
   - Listas com 3 a 5 itens.
   - Cards com uma promessa por card.
   - CTA visível após cada bloco de decisão.

## Prioridade 3: design e percepção

1. Preservar a direção editorial.
   - A estética atual é adequada: séria, autoral, pouco "infoproduto".
   - Manter paleta, serifas e fotos reais.

2. Reduzir densidade visual.
   - Evitar seções demais com a mesma hierarquia.
   - Alternar blocos de leitura, prova e conversão.
   - Usar menos cards quando uma lista editorial resolver melhor.

3. Dar mais destaque aos produtos que vendem.
   - Palestras e Direcionamento devem aparecer antes do livro quando a meta for caixa.
   - Livro sustenta autoridade, mas não deve competir com a ação comercial principal.

## Prioridade 4: conformidade

1. Manter CRM, RQE e palavra "Médica" visíveis na home, páginas de serviço e footer.
2. Evitar promessa de resultado, cura, prevenção garantida ou redução garantida de afastamentos.
3. Evitar autopromoção excessiva, linguagem de "única", "melhor", "revolucionária" ou "resultado garantido".
4. Garantir que formulário e política de privacidade expliquem finalidade de coleta, canal de contato e tratamento de dados.
5. Se houver coleta de informações sobre saúde/caso concreto, pedir apenas o mínimo necessário e orientar anonimização.

## Ordem de execução recomendada

### Fase 1: arrumar a casa

- corrigir sitemap;
- corrigir anchors e links quebrados;
- substituir `mailto:` por formulário funcional;
- comprimir imagens;
- revisar navegação e footer em todas as páginas.

### Fase 2: refatorar a home

- transformar a home em hub comercial editorial;
- reduzir redundâncias;
- reforçar os três caminhos: palestra, roda e direcionamento;
- colocar CTA de WhatsApp contextual por intenção.

### Fase 3: fortalecer páginas de venda

- revisar `palestras.html` para vender proposta corporativa;
- revisar `direcionamento.html` para urgência e decisão;
- revisar `rodas-de-conversa.html` para clareza de formato;
- deixar `livro.html` como autoridade + compra + palestra baseada no livro.

### Fase 4: confiança, SEO e medição

- atualizar metatags e schema básico;
- instalar analytics de forma compatível com LGPD;
- testar Core Web Vitals;
- criar eventos para WhatsApp, formulário, Amazon e guia gratuito.

## Métrica de sucesso

O site estará funcional quando:

- a navegação tiver no máximo 5 a 6 escolhas principais;
- todo CTA levar a uma ação real;
- nenhum formulário depender de `mailto:`;
- sitemap representar só páginas existentes;
- a home explicar em poucos segundos quem é, para quem é e qual próximo passo;
- imagens críticas estiverem otimizadas;
- o discurso preservar autoridade médica sem promessas indevidas.
