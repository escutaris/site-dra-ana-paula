"""Lista as frases do site que ainda não têm tradução.

Uso:  python i18n/extrair.py            -> resumo por idioma
      python i18n/extrair.py en         -> grava i18n/faltando-en.json
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from segmentos import PAGINAS, IDIOMAS, ler, unidades, blocos_ld, textos_ld  # noqa

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def todas():
    vistas, ordem = set(), []
    for p in PAGINAS:
        soup = ler(os.path.join(RAIZ, p))
        chaves = [k for _, _, k in unidades(soup)]
        for _, dados in blocos_ld(soup):
            chaves += list(textos_ld(dados))
        for k in chaves:
            if k and k not in vistas:
                vistas.add(k)
                ordem.append((p, k))
    return ordem


def dicionario(lang):
    cam = os.path.join(RAIZ, 'i18n', lang + '.json')
    if os.path.exists(cam):
        with open(cam, encoding='utf-8') as f:
            return json.load(f)
    return {}


if __name__ == '__main__':
    ordem = todas()
    alvo = sys.argv[1:] or IDIOMAS
    for lang in alvo:
        dic = dicionario(lang)
        falta = [(p, k) for p, k in ordem if k not in dic]
        print('%s: %d frases no site, %d sem tradução' % (lang, len(ordem), len(falta)))
        if sys.argv[1:]:
            por_pagina = {}
            for p, k in falta:
                por_pagina.setdefault(p, []).append(k)
            with open(os.path.join(RAIZ, 'i18n', 'faltando-%s.json' % lang), 'w', encoding='utf-8') as f:
                json.dump(por_pagina, f, ensure_ascii=False, indent=1)
