"""Grava as traduções das frases que estão faltando.

Uso:  python i18n/juntar_novas.py

Para cada idioma, lê i18n/fontes/novas-<idioma>.txt, em que a linha N traduz
a N-ésima frase sem tradução (na ordem em que aparecem no site), confere os
marcadores de tag e grava em i18n/<idioma>.json. Também apaga do dicionário
as frases que não existem mais no site.
"""
import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from extrair import todas, RAIZ  # noqa
from segmentos import IDIOMAS  # noqa

MARCA = re.compile(r'</?[a-z]+\d+>|<br>')

ordem = todas()
vivas = {k for _, k in ordem}
for lang in IDIOMAS:
    cam_txt = os.path.join(RAIZ, 'i18n', 'fontes', 'novas-%s.txt' % lang)
    if not os.path.exists(cam_txt):
        continue
    cam_json = os.path.join(RAIZ, 'i18n', lang + '.json')
    d = json.load(io.open(cam_json, encoding='utf-8'))
    falta = [k for _, k in ordem if k not in d]
    linhas = [l.rstrip('\n') for l in io.open(cam_txt, encoding='utf-8') if l.strip()]
    if len(linhas) != len(falta):
        sys.exit('%s: %d frases faltando, %d traduções. Nada gravado.' % (lang, len(falta), len(linhas)))
    for k, t in zip(falta, linhas):
        if sorted(MARCA.findall(k)) != sorted(MARCA.findall(t)):
            sys.exit('%s: marcadores diferentes\n  PT: %s\n  %s: %s' % (lang, k, lang, t))
        d[k] = t
    antes = len(d)
    d = {k: v for k, v in d.items() if k in vivas or k.startswith('js:')}
    json.dump(d, io.open(cam_json, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=1)
    print('%s: %d gravadas, %d antigas removidas' % (lang, len(falta), antes - len(d)))
