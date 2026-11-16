# Traduções do site (en, es, zh)

As páginas em português ficam na raiz e são a fonte. As pastas `en/`, `es/` e `zh/`
são geradas e apagadas a cada montagem. Nunca editar essas pastas à mão.

Depois de mudar qualquer texto em português:

1. `python i18n/build.py` mostra quantas frases ficaram sem tradução em cada idioma.
2. `python i18n/extrair.py en` grava a lista em `i18n/faltando-en.json` (o mesmo vale para es e zh).
3. Escreva as traduções em `i18n/fontes/novas-en.txt`, `novas-es.txt` e `novas-zh.txt`, uma por
   linha, na mesma ordem da lista, e rode `python i18n/juntar_novas.py`. Ele confere os marcadores
   (`<em1>`, `<a2>` têm de aparecer iguais na tradução), grava nos `.json` e tira as frases que
   saíram do site. Depois, apague a pasta `fontes`.
4. Rode `python i18n/build.py` de novo. Ele também regrava o `sitemap.xml`.

Frase sem tradução não quebra nada: ela aparece em português na página traduzida.
