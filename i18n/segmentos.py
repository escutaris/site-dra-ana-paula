"""Separa as frases traduzíveis das páginas em português.

Usado por extrair.py (lista as frases) e build.py (monta /en, /es, /zh).

Uma "frase" é o conteúdo de um elemento que só tem texto e tags inline
(<em>, <strong>, <a>, <br>...). As tags internas viram marcadores curtos
sem atributos, por exemplo  "Leia <em1>o livro</em1> agora", e voltam
com os atributos originais na hora de montar a página traduzida.
"""
import html as htmlmod
import json
import re
from urllib.parse import parse_qs, urlparse

from bs4 import BeautifulSoup, NavigableString, Tag, Comment

PAGINAS = [
    'index.html', 'palestras.html', 'rodas-de-conversa.html', 'direcionamento.html',
    'livro.html', 'contato.html', 'imprensa.html', 'governanca.html',
    'politica-privacidade.html',
]
IDIOMAS = ['en', 'es', 'zh']

INLINE = {'a', 'em', 'strong', 'b', 'i', 'br', 'span', 'small', 'sup', 'sub',
          'cite', 'mark', 'abbr', 'u', 'time', 'q', 's', 'wbr'}
PULAR = {'script', 'style', 'noscript', 'svg', 'template', 'iframe', 'code', 'pre'}
ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'data-label']
META = {'description', 'og:title', 'og:description', 'twitter:title',
        'twitter:description', 'og:image:alt', 'twitter:image:alt'}
TEM_LETRA = re.compile(r'[A-Za-zÀ-ÿ]')


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def ler(caminho):
    with open(caminho, encoding='utf-8') as f:
        return BeautifulSoup(f.read(), 'html.parser')


def e_texto(n):
    return isinstance(n, NavigableString) and not isinstance(n, Comment)


def so_inline(el):
    return all(not isinstance(d, Tag) or (d.name in INLINE) for d in el.descendants)


def tem_texto(el):
    return any(e_texto(t) and TEM_LETRA.search(t) for t in el.descendants)


def afunilar(el):
    """Desce enquanto o elemento só embrulha um único filho inline."""
    while True:
        filhos = [c for c in el.children if not isinstance(c, Comment)
                  and not (e_texto(c) and not c.strip())]
        if len(filhos) == 1 and isinstance(filhos[0], Tag) and filhos[0].name in INLINE \
                and filhos[0].name != 'br':
            el = filhos[0]
        else:
            return el


def tags_internas(el):
    return [t for t in el.find_all(True) if t.name != 'br']


def chave_de(el):
    """HTML interno com marcadores <nomeN> no lugar das tags com atributos."""
    idx = {id(t): i + 1 for i, t in enumerate(tags_internas(el))}

    def rend(n):
        if isinstance(n, Comment):
            return ''
        if e_texto(n):
            return htmlmod.escape(str(n), quote=False)
        if n.name == 'br':
            return '<br>'
        i = idx[id(n)]
        return '<%s%d>%s</%s%d>' % (n.name, i, ''.join(rend(c) for c in n.children), n.name, i)

    return norm(''.join(rend(c) for c in el.children))


def abre_tag(t):
    partes = [t.name]
    for k, v in t.attrs.items():
        if isinstance(v, list):
            v = ' '.join(v)
        partes.append('%s="%s"' % (k, htmlmod.escape(v, quote=True)))
    return '<' + ' '.join(partes) + '>'


def aplicar(el, traducao):
    """Troca o conteúdo de el pela tradução, devolvendo os atributos das tags."""
    tags = tags_internas(el)

    def abre(m):
        return abre_tag(tags[int(m.group(2)) - 1])

    frag = re.sub(r'<([a-z]+)(\d+)>', abre, traducao)
    frag = re.sub(r'</([a-z]+)\d+>', r'</\1>', frag)
    el.clear()
    for n in list(BeautifulSoup(frag, 'html.parser').contents):
        el.append(n)


def wa_texto(href):
    q = parse_qs(urlparse(href).query).get('text')
    return norm(q[0]) if q else None


def unidades(soup):
    """Gera (tipo, alvo, chave). tipos: html, texto, attr:<nome>, meta, wa."""
    def attrs_de(el):
        for a in ATTRS:
            if el.get(a) and TEM_LETRA.search(el[a]):
                yield ('attr:' + a, el, norm(el[a]))
        if el.name == 'a' and el.get('href', '').startswith('https://wa.me/'):
            t = wa_texto(el['href'])
            if t:
                yield ('wa', el, t)
        if el.name == 'input' and el.get('type') in ('submit', 'button') and el.get('value'):
            yield ('attr:value', el, norm(el['value']))

    def visitar(el):
        for filho in list(el.children):
            if isinstance(filho, Comment):
                continue
            if e_texto(filho):
                if TEM_LETRA.search(filho):
                    yield ('texto', filho, norm(str(filho)))
                continue
            if not isinstance(filho, Tag):
                continue
            if filho.name in PULAR:
                if filho.name == 'svg':
                    yield from attrs_de(filho)
                continue
            yield from attrs_de(filho)
            if so_inline(filho) and tem_texto(filho):
                for d in filho.find_all(True):
                    yield from attrs_de(d)
                alvo = afunilar(filho)
                yield ('html', alvo, chave_de(alvo))
            else:
                yield from visitar(filho)

    head = soup.head
    if head:
        if head.title and head.title.string:
            yield ('html', head.title, norm(head.title.string))
        for m in head.find_all('meta'):
            k = m.get('name') or m.get('property')
            if k in META and m.get('content'):
                yield ('meta', m, norm(m['content']))
    if soup.body:
        yield from visitar(soup.body)


CHAVES_LD = {'name', 'description', 'jobTitle', 'headline', 'alternateName',
             'knowsAbout', 'serviceType', 'areaServed', 'text',
             'disambiguatingDescription', 'about', 'genre', 'award', 'slogan'}


def textos_ld(obj, chave=None):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from textos_ld(v, k)
    elif isinstance(obj, list):
        for v in obj:
            yield from textos_ld(v, chave)
    elif isinstance(obj, str) and chave in CHAVES_LD and TEM_LETRA.search(obj):
        yield norm(obj)


def traduz_ld(obj, dic, faltando, chave=None):
    if isinstance(obj, dict):
        return {k: traduz_ld(v, dic, faltando, k) for k, v in obj.items()}
    if isinstance(obj, list):
        return [traduz_ld(v, dic, faltando, chave) for v in obj]
    if isinstance(obj, str) and chave in CHAVES_LD and TEM_LETRA.search(obj):
        k = norm(obj)
        if k in dic:
            return dic[k]
        faltando.add(k)
    return obj


def blocos_ld(soup):
    for s in soup.find_all('script', type='application/ld+json'):
        try:
            yield s, json.loads(s.string)
        except Exception:
            continue
