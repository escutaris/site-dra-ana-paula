"""Junta um arquivo de tradução linha a linha ao dicionário do idioma.

Uso:  python i18n/juntar.py en index.html

Lê i18n/fontes/<idioma>/<página sem .html>.txt, em que a linha N traduz a
N-ésima frase que aparece pela primeira vez naquela página, e grava no
i18n/<idioma>.json. Confere se cada tradução tem os mesmos marcadores de
tag (<em1>, <a2>...) da frase original.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from extrair import todas, RAIZ  # noqa

MARCA = re.compile(r'</?[a-z]+\d+>|<br>')


def main(lang, pagina):
    chaves = [k for p, k in todas() if p == pagina]
    cam_txt = os.path.join(RAIZ, 'i18n', 'fontes', lang, pagina.replace('.html', '.txt'))
    with open(cam_txt, encoding='utf-8') as f:
        linhas = [l.rstrip('\n') for l in f]
    while linhas and not linhas[-1].strip():
        linhas.pop()
    if len(linhas) != len(chaves):
        sys.exit('%s/%s: %d frases, %d traduções. Nada gravado.' % (lang, pagina, len(chaves), len(linhas)))
    erros = []
    for i, (k, t) in enumerate(zip(chaves, linhas), 1):
        if sorted(MARCA.findall(k)) != sorted(MARCA.findall(t)):
            erros.append('linha %d: marcadores diferentes\n  PT: %s\n  %s: %s' % (i, k, lang, t))
    if erros:
        sys.exit('\n'.join(erros) + '\nNada gravado.')
    cam_json = os.path.join(RAIZ, 'i18n', lang + '.json')
    dic = {}
    if os.path.exists(cam_json):
        with open(cam_json, encoding='utf-8') as f:
            dic = json.load(f)
    dic.update(dict(zip(chaves, linhas)))
    with open(cam_json, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(dic, f, ensure_ascii=False, indent=1, sort_keys=False)
    print('%s/%s: %d frases gravadas' % (lang, pagina, len(chaves)))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
