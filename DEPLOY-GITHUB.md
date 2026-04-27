# 🚀 Publicar no GitHub Pages — Passo a Passo

Este guia leva você de **zero até o link funcionando** em ~15 minutos.

---

## Passo 1 — Criar o repositório

1. Entre em [github.com/organizations/escutaris/repositories/new](https://github.com/organizations/escutaris/repositories/new)
2. **Repository name:** `site-anapaula`
3. **Description:** `Site institucional Dra. Ana Paula Teixeira` (opcional)
4. **Visibility:** ✅ **Private**
5. ❌ **Não marque** "Add a README file" (já temos um)
6. ❌ **Não marque** "Add .gitignore"
7. ❌ **Não marque** "Choose a license"
8. Clique em **"Create repository"**

---

## Passo 2 — Subir os arquivos (upload via web)

Depois de criar o repositório, o GitHub mostra uma tela "Quick setup". Ignore os comandos de terminal e procure o link:

> **"uploading an existing file"**

Ou acesse diretamente:
`https://github.com/escutaris/site-anapaula/upload/main`

### O que subir

Arraste para a área de upload **todos estes arquivos e pastas** (mas não os listados em "NÃO subir"):

**✅ Subir:**
- Todos os arquivos `.html` (index, sobre, servicos, livro, pesquisa, blog, materiais, na-midia, contato, politica-privacidade)
- `design-system.css`
- `robots.txt`
- `sitemap.xml`
- `README.md`
- `DEPLOY-GITHUB.md` (este arquivo)
- Pasta inteira **`assets/`** (fotos, favicon, og-image)

**❌ NÃO subir:**
- `preview.html` (só para desenvolvimento)
- Pasta `ui_kits/` (arquivos de sistema de design, não do site)
- Pasta `SKILL.md` (instrução interna)
- Pasta `scraps/`
- Qualquer arquivo começando com `.` (como `.napkin`)
- `README-formularios.md` (instruções internas)

### Como arrastar

1. Abra uma janela do Explorador de Arquivos do seu computador na pasta do projeto
2. Selecione todos os arquivos/pastas que devem subir (Ctrl+A e depois desmarque os que não devem)
3. Arraste para a área "Drag additional files here" no GitHub
4. Aguarde o upload (pode levar 1-2 minutos com as fotos)
5. Na parte de baixo, escreva como mensagem: `Primeira versão do site`
6. Clique em **"Commit changes"**

---

## Passo 3 — Ativar o GitHub Pages

1. No repositório recém-criado, clique na aba **"Settings"** (no topo)
2. No menu lateral esquerdo, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clique em **"Save"**
5. Aguarde ~1 minuto. A página vai recarregar e mostrar uma caixa verde com o link:

   ```
   ✅ Your site is live at https://escutaris.github.io/site-anapaula/
   ```

---

## Passo 4 — Testar

Abra o link no celular e no computador. Navegue entre as páginas. Se algo estiver quebrado:

- **Imagens não carregam:** provavelmente a pasta `assets` não subiu. Volte ao repo e confirme que a pasta `assets/photos/` está lá.
- **Link interno quebrado (404):** o nome do arquivo HTML tem que ser exatamente igual (case-sensitive no GitHub Pages).
- **CSS não aplica:** confirma que o `design-system.css` está na raiz, não dentro de pasta.

---

## Passo 5 — Mandar para Ana Paula

Sugestão de mensagem:

> Ana, o site está pronto para revisão:
> **https://escutaris.github.io/site-anapaula/**
>
> Esse é um link de **preview temporário** — o endereço definitivo será `anapaulateixeira.med.br` quando a gente publicar.
>
> Por favor, revise principalmente:
> 1. **Sobre** — a forma como escrevi sua bio soa como você?
> 2. **Serviços** — os 5 formatos estão descritos corretamente?
> 3. **Pesquisa** — os 3 autores fundadores (Shay, Litz, Farnsworth) estão certos?
> 4. **Na Mídia** — as 6 aparições que coloquei são suas?
> 5. **Fotos** — alguma que você queira trocar?
>
> Qualquer coisa que precise mudar, é só me mandar. A gente ajusta e o site atualiza automaticamente.

---

## Atualizar o site depois

Quando você pedir mudanças aqui na ferramenta, eu aplico os arquivos. Para atualizar o site:

1. Vá em `https://github.com/escutaris/site-anapaula`
2. Clique no arquivo que mudou (ex: `sobre.html`)
3. Clique no ícone de lápis (editar)
4. Cole o novo conteúdo → **Commit**

**Ou** (mais simples para várias mudanças):

1. Delete os arquivos antigos no GitHub
2. Suba de novo os arquivos atualizados

Em ~1 minuto depois do commit, o site está atualizado. O link permanece o mesmo.

---

## Quando for ao ar no Hostinger

Quando o site estiver aprovado pela Ana e for hora de publicar no `anapaulateixeira.med.br`:

1. Baixe todos os arquivos do repo (botão verde "Code" → "Download ZIP")
2. Entre no painel da Hostinger → File Manager → `public_html`
3. Faça upload de tudo (exceto `README.md` e `DEPLOY-GITHUB.md`)
4. Pronto. Em minutos o domínio serve o site.

O GitHub continua existindo como backup e ambiente de staging.
