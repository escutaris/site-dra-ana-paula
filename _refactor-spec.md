# Refactor Spec — Hub one-page · maio/2026

**Status:** rascunho para revisão
**Autor:** Claude (consolidação das decisões da sessão de 1º/maio/2026)
**Próximo passo:** revisão do usuário → ajustes → execução do refactor

---

## 1 · Princípio orientador

Modelo **hub-and-spoke**: hub one-page institucional (`index.html`) sustenta autoridade e captura leads quentes; LP avulsa (`direcionamento.html`) recebe tráfego pago e WhatsApp pré-qualificado e converte em venda.

**Objetivo Fase 1 (mai–dez/2026):** gerar caixa via tripé Palestras + Roda + Direcionamento, sem perder a reputação editorial em construção. "Parecer quem ela é, não quem vai ser."

---

## 2 · Arquitetura final

### Hub one-page (`index.html`) — 11 seções

| # | Seção | Anchor | Função |
|---|---|---|---|
| 1 | Hero | (topo) | Tríade + portrait + CTA primário |
| 2 | Auth band | `#auth` | Números (30 anos · 130 palestras · 1ª OMIS-R · Prêmio Ecos 2025) |
| 3 | Pistas bifurcadas | `#pistas` | Empresa NR-1 / Líder em situação concreta |
| 4 | Lesão Moral Ocupacional | `#lmo` | Bloco-conceito autoral · território único |
| 5 | Sobre | `#sobre` | Bio institucional + bio editorial pessoal + depoimentos |
| 6 | Serviços | `#servicos` | Palestras 4+5 · Roda · Direcionamento · Outros formatos |
| 7 | Livro | `#livro` | Bloco completo de *Quando o Trabalho Dói* |
| 8 | Na Mídia | `#midia` | 10 logos + marquee imprensa + vídeos |
| 9 | Publicações | `#publicacoes` | Links pra textos em mídias externas |
| 10 | Isca | `#isca` | Guia técnico gratuito |
| 11 | Contato | `#contato` | Formulário + WhatsApp + CTA final |
| — | Footer | — | Governança · Política · Direitos |

### Nav principal

`Início · Sobre · Serviços · Livro · Na Mídia · Contato` (6 itens, todos âncoras do hub)

Sem "Workshop NR-1" no nav (será removido). Sem páginas separadas no nav.

### LP avulsa (mantém · não no nav)

- `direcionamento.html` — máquina de venda do produto-tração

### Páginas arquivadas (movem pra `_arquivado/`)

- `workshop-mapa-psicossocial.html` — sem trio formado, não vende como produto detalhado
- Página separada de Sobre removida — conteúdo consolidado na home
- `servicos.html` — conteúdo migra pra hub seção 6
- `livro.html` — conteúdo migra pra hub seção 7
- `na-midia.html` — conteúdo migra pra hub seção 8
- `contato.html` — conteúdo migra pra hub seção 11
- `blog.html` — substituído por seção 9 "Publicações"

### Páginas mantidas fora do nav (acesso via footer)

- `governanca.html` — link no footer
- `politica-privacidade.html` — link no footer

---

## 3 · Conteúdo aprovado por seção

### Seção 1 · Hero

**Eyebrow:**
`PESSOAS · REPUTAÇÃO · RESULTADOS`

**H1:**
*Cuidar de pessoas é cuidar do negócio.*

**Lead (parágrafo único):**
> Médica do trabalho com quase trinta anos de prática. Autora de *Quando o Trabalho Dói*. Trabalho com lideranças e times de RH na construção de culturas organizacionais que cuidam de **pessoas**, fortalecem a **reputação** e sustentam **resultados** — com método clínico e base técnica.

**CTA primário:** "Conhecer formatos →" (anchor `#servicos`)
**CTA secundário:** "Falar pelo WhatsApp" (link wa.me)

**Credit-line (rodapé do hero):**
> Dra. Ana Paula Teixeira · CRM-BA 12797 · RQE 7237 · Membro ICOH · Board Member Board Academy · Salvador, Bahia.

**Portrait:** `assets/photos/portrait-bookshelf.png` com `.scale-in`

---

### Seção 2 · Auth band

4 cards (`auth-cell`) com counter animado em alguns:

| Card | Número | Descrição |
|---|---|---|
| 01 | 30 (counter) | **anos** de prática clínica e corporativa em medicina do trabalho |
| 02 | 130+ (counter) | **palestras** realizadas · 10.100 profissionais treinados · 99% aprovação |
| 03 | 1ª | **autora brasileira** a disponibilizar um instrumento científico para mapear Lesão Moral Ocupacional em diferentes contextos organizacionais |
| 04 | 2025 | *Quando o Trabalho Dói* indicado ao **7º Prêmio Ecos da Literatura** |

---

### Seção 3 · Pistas bifurcadas

**Eyebrow:** `Tríade da marca · Pessoas · Reputação · Resultados`

**H2:** Cuidar de pessoas é cuidar do negócio.

**Lead:** Trabalho com lideranças e times de RH na construção de culturas organizacionais que cuidam de pessoas, fortalecem a reputação e sustentam resultados — com método clínico e base técnica.

**Card 1 (fundo bege):** *Para sua organização*
- H3: Sua empresa precisa estruturar saúde mental para a NR-1.
- Descrição: Você está em RH, SESMT, conselho ou diretoria, e precisa demonstrar evidência defensável: inventário de fatores psicossociais, plano de ação e linguagem técnica para conversar com auditoria, jurídico e fiscalização.
- CTAs: "Ver palestras →" (anchor `#servicos-palestras`) · "Falar pelo WhatsApp" (wa.me)

**Card 2 (fundo verde-noturno):** *Para você que está liderando*
- H3: Você está diante de uma situação concreta agora.
- Descrição: Caso de adoecimento na equipe, conflito que não resolve, dúvida sobre nexo causal, decisão difícil pendente. Você precisa de interlocução técnica rápida — não terapia, não coaching, não consultoria genérica.
- CTAs: "Conhecer Direcionamento →" (link `direcionamento.html`) · "Falar pelo WhatsApp" (wa.me)

---

### Seção 4 · Lesão Moral Ocupacional ★

**Eyebrow:** `Território autoral · Pesquisa em curso`

**H2:** Lesão Moral Ocupacional — *o que o burnout não explica*.

**Texto principal (aprovado pela cliente):**
> A Dra. Ana Paula pesquisa **trauma, lesão, coragem e resiliência moral**. Em seu projeto de mestrado, traduziu e validou para o português brasileiro a escala internacional **OMIS-R** (Occupational Moral Injury Scale – Revised), que permite mapear trauma e lesão moral em diferentes contextos organizacionais — oferecendo base mais consistente para ações individualizadas e institucionais voltadas ao fortalecimento da resiliência e da **Coragem Moral**.

**Pull-quote (frase-âncora):**
> *"Há experiências no trabalho que não ferem apenas a rotina. Ferem identidade, confiança e integridade. É preciso transformar tudo isso em Coragem Moral."*

**CTA discreto:** "Saber mais sobre o programa-piloto OMIS-R →" (link wa.me com mensagem pré-preenchida sobre programa-piloto). *Internamente: aciona o kit OMIS-R off-site quando quiser fechar piloto.*

---

### Seção 5 · Sobre

**Eyebrow:** `Quem é a Dra. Ana Paula`

**H2:** Da clínica ao palco. Do palco ao livro. Do livro à pesquisa.

**Bio institucional (parágrafo de abertura — aprovado pela cliente):**
> A Dra. Ana Paula Teixeira é **médica do trabalho** (CRM-BA 12797 · RQE 7237) com quase três décadas de experiência clínica e corporativa. Autora de *Quando o Trabalho Dói* — indicado ao 7º Prêmio Ecos da Literatura — e pesquisadora de **trauma, lesão, coragem e resiliência moral**.
>
> Em seu projeto de mestrado, traduziu e validou para o português brasileiro a escala **OMIS-R** (Occupational Moral Injury Scale – Revised), tornando-se a 1ª autora brasileira a disponibilizar um instrumento científico para mapear Lesão Moral Ocupacional em diferentes contextos organizacionais.
>
> Palestrante com mais de 130 eventos realizados e 10.100 profissionais treinados, com 99% de avaliações positivas. **Membro ICOH** (International Commission on Occupational Health) e **Board Member** certificada pela **Board Academy**.
>
> Referência em saúde mental ocupacional, fatores psicossociais e NR-1, atua como consultora e mentora de lideranças de médias e grandes empresas. Já foi entrevistada por **CartaCapital, Robb Report Brasil, Rádio CBN Bahia e CBN Salvador**, entre outros veículos.

**Bloco editorial-pessoal (subseção · aprovado pela cliente):**

H3: A experiência que redefiniu minha trajetória.

> Vivi um dos auges da minha vida profissional em uma das maiores instituições do Norte e Nordeste. Havia entrega, reconhecimento e resultados. Também havia uma sobrecarga crescente, sustentada em silêncio.
>
> A ruptura veio quando uma autoridade legítima colocou em xeque quem eu era e tudo o que eu havia construído ao longo de quase uma década.
>
> Eu me afastei, cuidei de mim e recomecei. Esse percurso marcou a transição para o trabalho que hoje desenvolvo com profundidade: saúde mental corporativa.

**Depoimentos (3 · existentes, aprovados):**

1. *"É nítido que o trabalho que a Dra. Ana Paula conduz é com muita alma e entrega pessoal."* — Participante presencial · Palestra corporativa
2. *"Seu comprometimento com essa causa é admirável e inspirador. Grata por compartilhar sua visão conosco."* — Participante institucional · Evento corporativo
3. *"Suas abordagens nos incentivam a praticar uma das mais valiosas lições de Sócrates: 'Conhece-te a ti mesmo.'"* — Participante de palestra · Reflexão pós-evento

---

### Seção 6 · Serviços

**Eyebrow:** `O que ofereço · Tripé editorial`

**H2:** Três formatos. Uma autoridade técnica.

**Lead:** De conselhos executivos a auditórios corporativos, associações, SIPATs, Sebrae, formação pública ou chão de fábrica — método clínico calibrado pelo público.

#### 6.1 · Palestras (anchor `#palestras`)

**Subtítulo:** Quatro palestras em destaque

**Palestra 01 · NR-1 em vigor: o que sua empresa precisa documentar antes da próxima fiscalização**
- Eyebrow: Para empresas, RH, SESMT e jurídico · Janela mai – jul 2026
- Outline:
  - Fatores psicossociais reconhecidos: o que é exigência e o que é orientação
  - Estrutura mínima de PGR psicossocial defensável diante de auditoria
  - Indicadores que sustentam evidência (afastamentos, retorno, clima)
  - Roteiro prático de adequação para empresas que precisam responder em 60 dias
- Formato: Padrão (1h–1h30) ou expandido (2h–3h) · Online ou presencial
- CTA: "Solicitar Palestra · NR-1 em vigor →" (wa.me pré-preenchido)

**Palestra 02 · O líder diante do sofrimento que não é dele: o que a NR-1 exige de quem gerencia pessoas**
- Eyebrow: Para liderança e RH · Foco em competência aplicada
- Outline:
  - Como reconhecer sinais de adoecimento na equipe antes do afastamento
  - O que dizer (e o que evitar) na primeira conversa de adoecimento
  - Diferenciação entre suporte de líder e papel de profissional de saúde
  - Autoavaliação prática de perfis de liderança sob pressão
- Formato: Padrão (1h–1h30) ou expandido (2h–3h) · Online ou presencial
- CTA: "Solicitar Palestra · O líder diante do sofrimento →" (wa.me)

**Palestra 03 · Assédio moral, violência ocupacional e Lesão Moral Ocupacional: o que a medicina do trabalho distingue**
- Eyebrow: Para RH, jurídico, SESMT e saúde ocupacional · Diferenciação técnica
- Outline:
  - Critérios técnicos por categoria: o que a medicina do trabalho diferencia
  - Lesão Moral Ocupacional: conceito, escala OMIS-R, validação para o português
  - Implicações jurídicas de nomear errado: nexo causal e responsabilidade
  - O que isso muda na investigação interna e no parecer técnico
- Formato: Padrão (1h–1h30) ou expandido (2h–3h) · Online ou presencial
- CTA: "Solicitar Palestra · Distinções técnicas →" (wa.me)

**Palestra 04 · Quando o Trabalho Dói: o custo invisível do adoecimento**
- Eyebrow: Para qualquer público · Palestra editorial baseada no livro
- Outline:
  - O que adoece no trabalho contemporâneo: território, sintomas, sinais
  - Como o adoecimento compromete pessoas, reputação e resultado
  - O que distingue a empresa que cuida da que apenas faz comunicação
  - Linguagem comum entre clínica, gestão e jurídico — sem jargão de coach
- Formato: Padrão (1h–1h30) · Online ou presencial · Inclui exemplar autografado nas presenciais
- CTA: "Solicitar Palestra · Quando o Trabalho Dói →" (wa.me)

**Subtítulo:** Recortes especializados sob consulta

5 itens em formato de lista compacta:
1. Diagnóstico psicossocial com instrumentos validados — do COPSOQ ao PGR · Para SESMT · RH · gestores SST · consultores
2. Saúde mental na cadeia: NR-1 para empresas com terceirização e fornecedores · Para indústria · óleo e gás · logística · construção · varejo
3. Do burnout à Lesão Moral Ocupacional · Para médicos do trabalho · SESMT · congressos científicos · ABRH · SINAIT
4. A palestra depois de maio: quando a empresa foi autuada · Para empresa autuada · jurídico · RH · diretoria
5. Retorno ao trabalho após afastamento por transtorno mental · Para SESMT · RH · lideranças

Cada um com link "Consultar disponibilidade →" (wa.me pré-preenchido por tema).

#### 6.2 · Roda de Conversa

**Descrição:** Encontro guiado, menor e mais dialogado que palestra. Até 25 pessoas. Espaço para troca, reflexão e aprofundamento temático.

**Tabela de formatos:**

| Formato | Investimento |
|---|---|
| Avulsa Online · até 25 pessoas · 1h30–2h | Proposta conforme escopo |
| Avulsa Presencial Salvador · até 25 · 2h | Proposta conforme escopo |
| Programa 4 sessões (online ou presencial) | Proposta conforme escopo |

**CTA:** "Solicitar Roda de Conversa →" (wa.me)

#### 6.3 · Direcionamento Executivo

**Descrição:** Sessão individual de noventa minutos por Zoom para liderança, RH, SESMT ou medicina do trabalho diante de situação concreta. Resposta priorizada em 4h úteis.

**Tabela:**

| Formato | Investimento |
|---|---|
| Sessão única · 90 min · Zoom | Proposta conforme contexto |
| Pacote 3 sessões · ciclo 6–8 semanas | Proposta conforme contexto |

**CTA primário:** "Conhecer Direcionamento Executivo →" (link `direcionamento.html`)
**CTA secundário:** "Falar pelo WhatsApp" (wa.me)

#### 6.4 · Outros formatos sob consulta

Bloco compacto no fim da seção:

- **Mentoria individual** — Acompanhamento estratégico para C-level, fundadoras e lideranças que atravessam decisões sensíveis. Encontros quinzenais, sigilo integral. Agenda restrita. → "Saber mais →" (wa.me pré-preenchido)
- **Workshop "Fatores Psicossociais na Prática"** — Formação multidisciplinar sob projeto, com profissionais convidadas (segurança do trabalho, ergonomia, medicina, enfermagem do trabalho, direito do trabalho). Configuração e investimento sob consulta. → "Saber mais →" (wa.me pré-preenchido)

---

### Seção 7 · Livro

**Eyebrow:** `Livro · 1ª edição · 2025 · AssedioNet`

**H2:** Quando o Trabalho Dói.

**Subtítulo:** *Um livro para nomear, com clareza e base técnica, o que atravessa pessoas, cultura e trabalho.*

**Sinopse refinada (aprovada pela cliente):**
> Voltado a lideranças, RH, profissionais de saúde ocupacional e leitores que desejam compreender, com mais profundidade, os fatores que sustentam adoecimento ou promovem transformação nas organizações.

**Capa:** `assets/photos/book-cover-real.png`

**Metadata:**
- Páginas: 253+
- Edição: 1ª · 2025
- ISBN: 978-6598341954
- Indicação: 7º Prêmio Ecos da Literatura

**Depoimentos qualificados (4 · existentes, aprovados):**
- Diego Araujo · Administrador · Gerente de Supply Chain
- Katia Venas · Assistente Social · Docente na Área da Saúde
- Gustavo Guimarães · Médico do Trabalho · Empreendedor
- Fernanda Botecchia · Psicóloga · Mentora Executiva

**CTA primário:** "Comprar na Amazon →" (link Amazon)
**CTA secundário:** "Solicitar Palestra · Quando o Trabalho Dói" (anchor `#palestras`)

---

### Seção 8 · Na Mídia

**Eyebrow:** `Empresas e instituições atendidas · Imprensa`

**H2:** Já trabalhei com.

#### 8.1 · Logos de empresas (10)

Grid responsivo (5 col desktop / 2 col mobile) com:
- Forvia
- J.Macedo
- Costa do Sauípe
- Priner
- Perkons
- Etica Pesquisa Clínica
- CISVIVER
- ASPIL
- Gelo Alagoinhas
- IMH

Imagens em `assets/logos/`. Hover scale(1.04). Sem grayscale (decisão anterior — site "tava morno").

#### 8.2 · Marquee de imprensa

Lista horizontal animada com:
- CartaCapital
- Robb Report Brasil
- Rádio CBN Bahia
- CBN Salvador
- Record TV
- TVE Bahia
- F5 Podcast
- Board Talks
- RH Notícias
- Bahia Notícias
- TV Aratu

#### 8.3 · Vídeos embedados (4)

iframes YouTube em grid 2 col desktop:
- Board Talks · ID `ZAZ-KYTJnmU`
- CBN Bahia · (ID a confirmar — manter atual da na-midia.html)
- CBN Salvador · (ID a confirmar)
- TV Aratu · (ID a confirmar)

`loading="lazy"` em todos.

---

### Seção 9 · Publicações

**Eyebrow:** `Onde leio e onde escrevo`

**H2:** Publicações e aparições autorais.

**Lead:** Lista de textos, entrevistas e participações editoriais em mídias externas. Conteúdo autoral atualizado via Instagram (@draanapaulateixeira) e LinkedIn.

**Itens (lista compacta com links externos):**
- (item por confirmar com cliente — placeholder inicial: 4-6 links pra textos dela em CartaCapital, Robb Report, LinkedIn pulse, podcasts)
- CTA discreto: "Acompanhar no Instagram →" · "Acompanhar no LinkedIn →"

> ⚠️ Pendência: cliente precisa fornecer 4-6 links de publicações externas. Posso usar placeholders iniciais com 2-3 links que já temos da memória (CartaCapital, Robb Report) + chamada pra Instagram/LinkedIn.

---

### Seção 10 · Isca

**Eyebrow:** `Material autoral gratuito`

**H2:** Comece pelo material editorial.

**Lead:** Um guia técnico gratuito para profissionais que precisam avaliar, com método, a relação entre transtornos mentais e contexto ocupacional.

- Eyebrow: Guia técnico · 27 páginas · edição 2026
- H3: Do Relato à Tomada de Decisão
- Subtítulo: Doze passos para avaliar nexo causal entre transtornos mentais e contexto ocupacional.
- Para: médicos do trabalho · SESMT · perícia · jurídico · compliance
- Bullets de conteúdo (3): roteiro de entrevista clínico-ocupacional · diferenciação adoecimento ocupacional × comórbido · lista de documentação técnica
- CTA: "Receber o guia gratuitamente →" (link `https://guia.anateixeiramed.com.br/`)

---

### Seção 11 · Contato + CTA final

**Eyebrow:** `Próximo passo`

**H2:** *Vamos conversar?*

**Lead:** Se sua empresa está estruturando programa de saúde mental, respondendo à NR-1 ou enfrentando situação concreta de adoecimento — chamamos para uma conversa.

**CTAs primários:**
- "Falar pelo WhatsApp" (wa.me)
- "Enviar e-mail" (mailto)

**Formulário (mantém o existente em contato.html — Google Forms):**
- Nome · Empresa · Cargo · E-mail · Telefone · Serviço de interesse (select com os 3 do tripé + "Outros formatos sob consulta") · Mensagem opcional
- Botão: "Enviar solicitação" + alternativa "Enviar via WhatsApp"

**Microcopy:** Respondemos em até 48h úteis (Direcionamento em até 4h úteis).

**Contato direto (4 itens):**
- E-mail · contato@anateixeiramed.com.br
- WhatsApp · (75) 98318-6200
- Instagram · @draanapaulateixeira
- LinkedIn · /in/draanapaulateixeira

---

### Footer

**Logo + frase-âncora institucional:**
> Porque empresas íntegras cuidam, com seriedade, do que impacta pessoas, cultura e trabalho.

**Links internos:** Sobre · Serviços · Livro · Na Mídia · Contato (anchors do hub)

**Links institucionais:** Governança (link pra `governanca.html`) · Política de Privacidade

**Meta line:** CRM-BA 12797 · RQE 7237 · Membro ICOH · Salvador, Bahia · © 2026 Dra. Ana Paula Teixeira

---

## 4 · Lógica comercial final

| Produto | Formato | Investimento |
|---|---|---|
| **Palestra** | Online · até 100 pessoas · 60 min | Proposta conforme escopo |
| Palestra | Online · 100–300 pessoas · 60 min | Proposta conforme escopo |
| Palestra | Presencial Salvador · até 100 · 60–90 min | Proposta conforme escopo |
| Palestra | Presencial outras cidades · 60–90 min | Proposta conforme escopo e deslocamento |
| **Roda** | Avulsa Online · até 25 · 1h30–2h | Proposta conforme escopo |
| Roda | Avulsa Presencial Salvador · até 25 · 2h | Proposta conforme escopo |
| Roda | Programa 4 sessões | Proposta conforme escopo |
| **Direcionamento** | Sessão única · 90 min · Zoom | Proposta conforme contexto |
| Direcionamento | Pacote 3 sessões · 6–8 semanas | Proposta conforme contexto |
| **Mentoria** | Encontros quinzenais | Sob consulta |
| **Workshop "Fatores Psicossociais na Prática"** | Sob projeto, multidisciplinar | Sob consulta |

---

## 5 · Compliance e vocabulário

### Vocabulário banido (Brandbook v3)

- ❌ "Workshop" como termo genérico de produto dela (exceto o Workshop "Fatores Psicossociais na Prática" que aparece como menção sob consulta)
- ❌ "Imersão"
- ❌ "Vivência"
- ❌ "Coach", "coaching", "mindset"
- ❌ "Bem-estar" desqualificado (só com âncora técnica, ex: "cultura de bem-estar baseada em diagnóstico")
- ❌ "Virar a chave"
- ❌ "Você sabia que"
- ❌ "Moral Injury" (sempre usar **Lesão Moral Ocupacional** em português; "Moral Injury" só em referência acadêmica entre parênteses)

### Compliance médico

- CRM-BA 12797 e RQE 7237 presentes em hero, sobre, footer
- Sem antes/depois, sem promessa de resultado
- Sem referência a Escutaris no nome da palestra (Brandbook v3)

### Tipografia

- Cormorant Garamond (títulos, citações, frases-âncora)
- Poppins (corpo, eyebrows, micro-tipografia)

### Paleta fixa

- Off-white #F0EDE6 (fundo principal)
- Bege areia #E8DDD2 (apoio)
- Verde-noturno #1C3520 (texto e estrutura)
- Terracota #B95839 (acento, máximo 1 uso forte por bloco)
- Preto editorial #1A1A1A (corpo)
- Cinza-quente #5C5852 (meta)

### Border-radius

Máximo 4px (preferencialmente 2px). Sem sombra colorida, sem blur.

---

## 6 · Pendências para a cliente revisar

Listar nesta spec, não no site público:

1. **Workshop "Fatores Psicossociais na Prática"** — confirmar nome final exato (era 5 sessões em abril). Configuração e profissionais envolvidos quando virar projeto.
2. **Mentoria individual** — confirmar se ainda é oferta ativa (Brandbook recente sugeria deprioritizar).
3. **Seção 9 Publicações** — pedir 4-6 links externos (textos em CartaCapital, Robb Report, LinkedIn pulse, podcasts).
4. **YouTube IDs dos vídeos CBN Bahia, CBN Salvador e TV Aratu** — confirmar quais ficam.
5. **Programa-piloto OMIS-R** — quando começar outreach. Kit pronto em Downloads.

---

## 7 · Plano de execução do refactor

**Milestone 1** — Spec aprovada (este documento)
**Milestone 2** — Arquivar páginas mortas (mover pra `_arquivado/`) + atualizar links nas LPs ativas
**Milestone 3** — Reescrever `index.html` como hub one-page (CSS local consolidado, smooth scroll, 11 seções)
**Milestone 4** — Atualizar nav na LP ativa (`direcionamento.html`) e nas 2 páginas footer-only (`governanca.html`, `politica-privacidade.html`) para refletir o novo nav (sem Workshop NR-1, anchors do hub)
**Milestone 5** — Commit + push pra origin/main
**Milestone 6** — Validar deploy (URL `escutaris.github.io/site-dra-ana-paula/`) e atualizar memória

Cada milestone gera commit próprio. Se algo der errado num milestone, dá pra reverter sem afetar o anterior.

**Estimativa total:** 1h15-1h45 do M2 ao M5.

---

## 8 · Pra o Claude consultar enquanto coda

**Princípio anti-drift:** se algo na implementação contradisser este documento, parar e checar com a cliente antes de seguir. Não improvisar.

**Em ordem de prioridade quando houver conflito:**
1. Brandbook v3 (vocabulário banido, paleta, tipografia)
2. Esta spec (estrutura, copy, preços)
3. Memória de sessão anterior (em caso de contradição com a spec, a spec vence — é mais recente)

---

## 9 · Funil da isca digital

**Decisão estratégica atualizada:** a única isca digital ativa será o Guia técnico gratuito **Do Relato à Tomada de Decisão**, com link externo para a landing já publicada em `https://guia.anateixeiramed.com.br/`.

### 9.1 · Guia técnico "Do Relato à Tomada de Decisão"

**`fonte: 'guia-relato-diagnostico'`** (já em produção em `guia.anateixeiramed.com.br`)

| Atributo | Valor |
|---|---|
| Público | Médicos do trabalho · SESMT · perícia · jurídico · compliance · psicologia ocupacional |
| Função do funil | Autoridade técnica + nutrição de relacionamento |
| Entrega imediata | E-mail com PDF do guia (27 páginas) |
| Funil de nutrição | A construir pela cliente posteriormente |
| **Ofertas downstream** | **Direcionamento Executivo** + **Roda de Conversa** |
| Lógica da oferta | Direcionamento serve quando o profissional técnico tem caso pendente. Roda serve pra equipes técnicas (SESMT, medicina do trabalho de uma empresa) que querem aprofundar coletivamente. |
| Não oferecer | Palestra (esse público não é decisor de compra de palestra corporativa) |

### 9.2 · Tabela de roteamento (pra o futuro funil de e-mail)

Quando a cliente configurar a ferramenta de e-mail marketing, basta usar esta regra:

| `fonte` | Lista/segmento | Sequência E-mail | Oferta no fim do funil |
|---|---|---|---|
| `guia-relato-diagnostico` | Profissionais técnicos | (a definir) | Direcionamento + Roda |

---

**Fim da spec · Aguardando revisão da cliente · 2026-05-01 · Atualizada com decisão de isca única: Guia técnico gratuito**
