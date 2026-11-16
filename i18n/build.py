"""Monta as versões traduzidas do site em /en, /es e /zh.

Uso:  python i18n/build.py

Lê cada página em português da raiz, troca as frases pelas de
i18n/<idioma>.json e grava em <idioma>/<página>. Frase sem tradução fica
em português e aparece na lista do fim. Também regrava o sitemap.xml com
os endereços dos quatro idiomas.

NUNCA editar à mão os arquivos de /en, /es e /zh: eles são apagados e
refeitos a cada execução. Para mudar um texto traduzido, edite o .json.
"""
import json
import os
import re
import shutil
import sys
from urllib.parse import quote

sys.path.insert(0, os.path.dirname(__file__))
from segmentos import (PAGINAS, IDIOMAS, ler, unidades, aplicar, blocos_ld,  # noqa
                       traduz_ld, norm)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://draanapaulateixeira.com.br'
HTML_LANG = {'pt': 'pt-BR', 'en': 'en', 'es': 'es', 'zh': 'zh-CN'}
OG_LOCALE = {'pt': 'pt_BR', 'en': 'en_US', 'es': 'es_ES', 'zh': 'zh_CN'}
URL_ATTRS = ['href', 'src', 'poster', 'data-src', 'action']
ABSOLUTO = re.compile(r'^([a-z][a-z0-9+.-]*:|/|#|\?)', re.I)


def url_pagina(lang, pagina):
    caminho = '' if pagina == 'index.html' else pagina
    return SITE + '/' + ('' if lang == 'pt' else lang + '/') + caminho


def ajusta_url(u):
    if not u or ABSOLUTO.match(u.strip()):
        return u
    base = u.split('#')[0].split('?')[0]
    if base in PAGINAS:
        return u                      # página traduzida irmã, na mesma pasta
    return '../' + u


def ajusta_srcset(v):
    partes = []
    for item in v.split(','):
        item = item.strip()
        if not item:
            continue
        pedacos = item.split()
        pedacos[0] = ajusta_url(pedacos[0])
        partes.append(' '.join(pedacos))
    return ', '.join(partes)


def ajusta_style(v):
    return re.sub(r'url\((["\']?)(?!data:|https?:|/)([^"\')]+)\1\)',
                  lambda m: 'url(%s../%s%s)' % (m.group(1), m.group(2), m.group(1)), v)


def montar(lang, pagina, dic, faltando):
    soup = ler(os.path.join(RAIZ, pagina))

    # 1. textos
    for tipo, alvo, chave in list(unidades(soup)):
        if chave not in dic:
            faltando.setdefault(chave, pagina)
            continue
        t = dic[chave]
        if tipo == 'html':
            aplicar(alvo, t)
        elif tipo == 'texto':
            orig = str(alvo)
            ini = orig[:len(orig) - len(orig.lstrip())]
            fim = orig[len(orig.rstrip()):]
            alvo.replace_with(ini + t + fim)
        elif tipo == 'meta':
            alvo['content'] = t
        elif tipo == 'wa':
            alvo['href'] = alvo['href'].split('?')[0] + '?text=' + quote(t, safe='')
        elif tipo.startswith('attr:'):
            alvo[tipo[5:]] = t

    falt_ld = set()
    for s, dados in blocos_ld(soup):
        novo = traduz_ld(dados, dic, falt_ld)
        s.string = json.dumps(novo, ensure_ascii=False, indent=2)
    for k in falt_ld:
        faltando.setdefault(k, pagina)

    # textos curtos dentro de scripts da página (ex.: 'Copiado' na imprensa)
    for s in soup.find_all('script'):
        if s.get('src') or s.get('type') == 'application/ld+json' or not s.string:
            continue
        s.string = re.sub(r"'([^'\n]+)'",
                          lambda m: "'%s'" % dic['js:' + m.group(1)].replace("'", "\\'")
                          if 'js:' + m.group(1) in dic else m.group(0), s.string)

    # 2. endereços relativos sobem uma pasta
    for el in soup.find_all(True):
        for a in URL_ATTRS:
            if el.get(a):
                el[a] = ajusta_url(el[a])
        if el.get('srcset'):
            el['srcset'] = ajusta_srcset(el['srcset'])
        if el.get('style') and 'url(' in el['style']:
            el['style'] = ajusta_style(el['style'])
    for st in soup.find_all('style'):
        if st.string and 'url(' in st.string:
            st.string = ajusta_style(st.string)

    # 3. idioma, endereço oficial e versões alternativas
    soup.html['lang'] = HTML_LANG[lang]
    head = soup.head
    can = head.find('link', rel='canonical')
    if can:
        can['href'] = url_pagina(lang, pagina)
    for m in head.find_all('meta', property='og:url'):
        m['content'] = url_pagina(lang, pagina)
    loc = head.find('meta', property='og:locale')
    if loc:
        loc['content'] = OG_LOCALE[lang]
    for velho in head.find_all('link', rel='alternate', hreflang=True):
        velho.decompose()
    ancora = can or head.find('meta')
    for l2 in ['pt'] + IDIOMAS + ['x-default']:
        tag = soup.new_tag('link', rel='alternate',
                           hreflang=HTML_LANG.get(l2, l2),
                           href=url_pagina('pt' if l2 == 'x-default' else l2, pagina))
        ancora.insert_after(tag)
        ancora = tag

    destino = os.path.join(RAIZ, lang, pagina)
    with open(destino, 'w', encoding='utf-8', newline='\n') as f:
        f.write('<!DOCTYPE html>\n' + str(soup).lstrip().removeprefix('<!DOCTYPE html>').lstrip())


def sitemap():
    linhas = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
              '        xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for pagina in PAGINAS:
        for lang in ['pt'] + IDIOMAS:
            linhas.append('  <url>')
            linhas.append('    <loc>%s</loc>' % url_pagina(lang, pagina))
            for l2 in ['pt'] + IDIOMAS:
                linhas.append('    <xhtml:link rel="alternate" hreflang="%s" href="%s"/>'
                              % (HTML_LANG[l2], url_pagina(l2, pagina)))
            linhas.append('  </url>')
    linhas.append('</urlset>')
    with open(os.path.join(RAIZ, 'sitemap.xml'), 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(linhas) + '\n')


if __name__ == '__main__':
    for lang in IDIOMAS:
        cam = os.path.join(RAIZ, 'i18n', lang + '.json')
        dic = {}
        if os.path.exists(cam):
            with open(cam, encoding='utf-8') as f:
                dic = {norm(k): v for k, v in json.load(f).items()}
        pasta = os.path.join(RAIZ, lang)
        shutil.rmtree(pasta, ignore_errors=True)
        os.makedirs(pasta)
        faltando = {}
        for p in PAGINAS:
            montar(lang, p, dic, faltando)
        print('%s: %d páginas, %d frases sem tradução' % (lang, len(PAGINAS), len(faltando)))
    sitemap()
    print('sitemap.xml regravado')
