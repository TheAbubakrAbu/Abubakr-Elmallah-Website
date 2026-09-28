#!/usr/bin/env python3
"""The site's checks: what a deploy refuses to ship, and what it only reports.

    python3 tools/check.py [<site-dir>] [--strict] [--external] [--json <path>]

    ./run check              the same as --strict, against the local build
    ./run check --external   plus the network: every outside link and every
                             YouTube id, which takes a few minutes

<site-dir> is the BUILT site: _site.nosync (what ./run serves) or _site (what
the deploy workflow builds), the first of those that exists when none is
given. The sources are read from the repository this script lives in. It
reads both because half the things worth catching only exist in one of them:
a dangling <img src> is a fact about the build, a stale cache-busting hash is
a fact about the sources, and "the copy says 458 photos" is a fact about the
sources compared with the data.

WHY A SCRIPT, AND WHY IT IS THIS LONG. The site is hand-written HTML, CSS and
JavaScript with no build step to catch anything, and most of its content is
rendered by JavaScript out of data files, so an ordinary link checker sees
about a third of it. Every check here exists because the thing it looks for
has actually happened: a stylesheet pinned in every returning visitor's
service worker by a stale hash, a gallery count left behind when photos were
added, an em dash slipping into a page whose house style bans them, a heading
skipping a level so a screen reader loses the outline. The survey that found
them (September 2026) was a pile of throwaway scripts; this is those scripts
made permanent, and the deploy workflow runs it on every push.

THREE KINDS OF CHECK, BECAUSE THEY HAVE THREE KINDS OF CONSEQUENCE.

  HARD     with --strict these fail the run, so the deploy job stops before
           anything is uploaded. Every one of them is a defect a visitor
           would meet: a broken picture, a link to nowhere, text below the
           size floor, a manifest icon the wrong size.

    refs       every internal reference in the build resolves to a file:
               href, src, srcset, poster, data-src, data-doc-src, <link>
               hrefs, inline style url(), the og/twitter images, url() in
               the built stylesheets, the manifest's icons and start_url, and
               every root-relative string in sw.js and the built JavaScript
               that starts with /assets/ or names a page. A folder URL
               resolves to its index.html. A RELATIVE url (../assets/...)
               is a failure even when it happens to resolve: it only works
               at one nesting depth, and the same markup is reused at
               several.
    anchors    every #id and /page/#id points at an id that exists, either
               in the built markup or in the ALLOWLIST of ids the page's
               scripts are known to write (see anchor_allowed below, where
               each pattern says which script writes it).
    emdash     no em dash in the sources or the built pages: the U+2014
               character, or the mdash / #8212 / #x2014 entity. House
               style: real punctuation instead, never a hyphen swap.
    imgver     no ?v= on an image URL in the built HTML or CSS. Images are
               referenced by plain path everywhere (a changed picture gets a
               new name); the only versioned image URLs are the service
               worker's own cache keys, in sw.js, which are allowed.
    stamps     _data/versions.yml matches the CSS and JS on disk, hash for
               hash, computed exactly as tools/stamp.py computes them. A
               stale stamp is the worst kind of bug this site can ship: the
               service worker caches CSS and JS by their ?v= URL, so an old
               hash on a changed file pins the OLD file in every returning
               visitor's cache with no way to evict it short of a version
               bump of the whole worker.
    dupids     no id used twice on one page.
    floor      no font-size under 0.66rem (10.56px) in the source
               stylesheets, the site's smallest-text floor. A declaration
               may carry `/* floor-ok: <reason> */` on the same line to say
               it is decorative and meant to be that small.
    headings   exactly one <h1> per built page and no skipped heading level
               (h2 straight to h4), which is the outline a screen reader
               offers. A page with `published: false` is simply not built,
               and is not missed here.
    manifest   the web manifest parses, every icon exists, and each PNG's
               real pixel size (read straight off its header) matches the
               size it declares.

  SOFT     printed and counted, never fatal: things that deserve a look but
           that a human has to judge.

    counts     numbers written in the copy against the data that produces
               the thing counted: photos per gallery, trips, accents and
               impersonations, the game worlds, the fan pages against the
               tiles on /worlds/, the schools. A mismatch is a sentence to
               correct, not a build to stop.
    orphans    files under assets/ that nothing references, once the
               conventions are applied (the galleries are referenced through
               years-data.js rows, the franchise shots through the loop in
               src/gaming.html, the thumbnails by tools/thumbs.py's naming).
    meta       a page with no meta description or one over 160 characters,
               two pages sharing a <title>, a page without lang.

  EXTERNAL only with --external, and fatal when it finds something dead,
           which is what the weekly workflow is for.

    links      every unique outside URL, HEAD then GET, a browser-like
               User-Agent, at most six in flight, and hosts that are known
               to answer robots with a 403 reported as "unverifiable"
               rather than as broken.
    youtube    every YouTube id, in every form it is written here, through
               the oEmbed endpoint, which answers 404 for a video that no
               longer exists and 401 for one that went private.

STANDARD LIBRARY ONLY, on purpose. The deploy runner is a bare Ubuntu image
and the owner's Mac runs /usr/bin/python3 (3.9) with nothing installed; a
check that needs `pip install` first is a check that stops being run. So the
HTML is read with html.parser, the PNG sizes off the file header, and the
network with urllib. The whole non-network run takes a few seconds.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import time
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The smallest text the site sets: 0.66rem at the 16px root. Kept as a number
# of pixels, with a hair of tolerance because 0.66 * 16 is 10.559999 in a
# float and must still count as exactly on the floor.
FLOOR_PX = 10.56
FLOOR_TOLERANCE = 0.01

# Every form an em dash can take in a source file: the character (written as
# an escape) and its three entity spellings (pieced together), so that this
# script passes its own check.
EM_DASH = re.compile('|'.join(['\u2014', '&' + 'mdash;', '&' + '#8212;', '&' + '#x2014;']), re.I)

IMAGE_EXT = ('.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.ico')
MEDIA_EXT = IMAGE_EXT + ('.mp4', '.webm', '.m4a', '.mp3', '.pdf', '.json')

# ── files, read once ──────────────────────────────────────────────────────

_text_cache = {}
_bytes_cache = {}


def read_bytes(path):
    if path not in _bytes_cache:
        with open(path, 'rb') as fh:
            _bytes_cache[path] = fh.read()
    return _bytes_cache[path]


def read_text(path):
    if path not in _text_cache:
        _text_cache[path] = read_bytes(path).decode('utf-8', errors='replace')
    return _text_cache[path]


def rel(path, base):
    return os.path.relpath(path, base).replace(os.sep, '/')


_walk_cache = {}


def walk_files(base, skip_dot=True):
    """Every file under base, as posix paths relative to it, sorted. Cached,
    because several checks want the same tree and a walk of the 4,000-file
    image folders is the slowest thing this script does on a busy disk."""
    key = (base, skip_dot)
    if key in _walk_cache:
        return _walk_cache[key]
    out = []
    for dirpath, dirnames, filenames in os.walk(base):
        dirnames[:] = sorted(d for d in dirnames if not (skip_dot and d.startswith('.')))
        for name in filenames:
            if skip_dot and name.startswith('.'):
                continue
            out.append(rel(os.path.join(dirpath, name), base))
    _walk_cache[key] = sorted(out)
    return _walk_cache[key]


# ── the report ────────────────────────────────────────────────────────────

class Check:
    """One named check: its kind, what it looked at, and what it found."""

    def __init__(self, name, kind, what):
        self.name, self.kind, self.what = name, kind, what
        self.items = []      # findings, one line each
        self.notes = []      # things worth printing that are not findings
        self.checked = 0     # how many things were looked at
        self.started = time.time()
        self.seconds = None

    def add(self, line):
        if line not in self.items:     # the same sentence twice on one page is one finding
            self.items.append(line)

    def note(self, line):
        self.notes.append(line)


class Report:
    def __init__(self):
        self.checks = []
        self.header = []

    def check(self, name, kind, what):
        if self.checks and self.checks[-1].seconds is None:
            self.checks[-1].seconds = round(time.time() - self.checks[-1].started, 2)
        c = Check(name, kind, what)
        self.checks.append(c)
        return c

    def done(self):
        if self.checks and self.checks[-1].seconds is None:
            self.checks[-1].seconds = round(time.time() - self.checks[-1].started, 2)

    def failing(self, kind):
        return [c for c in self.checks if c.kind == kind and c.items]

    def as_dict(self):
        return {
            'checks': [{'name': c.name, 'kind': c.kind, 'what': c.what, 'checked': c.checked, 'seconds': c.seconds,
                        'count': len(c.items), 'items': c.items, 'notes': c.notes} for c in self.checks],
        }


# ── the built site ────────────────────────────────────────────────────────

class Page(object):
    """What one built HTML file says, as far as the checks need it."""

    URL_ATTRS = ('href', 'src', 'poster', 'data-src', 'data-doc-src', 'data-full',
                 'data-large', 'data-href', 'action', 'formaction', 'cite', 'ping')
    SET_ATTRS = ('srcset', 'data-srcset', 'imagesrcset')
    META_URLS = ('og:image', 'og:image:secure_url', 'og:url', 'twitter:image', 'twitter:image:src',
                 'og:video', 'og:audio')

    def __init__(self, url, path):
        self.url, self.path = url, path
        self.ids = []
        self.refs = []            # (url, context) for everything that names a file or page
        self.scripts = []         # /assets/js/... this page loads, query stripped
        self.inline_js = []
        self.inline_css = []
        self.title = ''
        self.description = None
        self.lang = None
        self.headings = []        # levels in document order
        self.refresh = False      # <meta http-equiv=refresh>: a redirect stub
        self.cards = set()        # keys listed in data-cards= grids
        self.projects = set()     # keys listed in data-projects= grids
        self.has_glance = False
        self.has_main = False
        self.fan = None           # <body data-fan="...">

    @property
    def stub(self):
        return self.refresh


class PageParser(HTMLParser):
    def __init__(self, page):
        HTMLParser.__init__(self, convert_charrefs=True)
        self.p = page
        self.inside = None        # 'title', 'script', 'style' while collecting their text
        self.buf = []

    def handle_starttag(self, tag, attrs):
        p = self.p
        a = {}
        for k, v in attrs:
            a[k.lower()] = v if v is not None else ''
        if 'id' in a:
            p.ids.append(a['id'])
        if tag == 'html':
            p.lang = a.get('lang')
        elif tag == 'main':
            p.has_main = True
        elif tag == 'body' and a.get('data-fan'):
            p.fan = a['data-fan']
        elif tag == 'meta':
            name = (a.get('name') or a.get('property') or '').lower()
            if name == 'description':
                p.description = a.get('content', '')
            elif name in Page.META_URLS and a.get('content'):
                p.refs.append((a['content'], '<meta %s>' % name))
            if (a.get('http-equiv') or '').lower() == 'refresh':
                p.refresh = True
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            p.headings.append(int(tag[1]))
        elif tag == 'title':
            self.inside, self.buf = 'title', []
        elif tag == 'style':
            self.inside, self.buf = 'style', []
        elif tag == 'script':
            if a.get('src'):
                src = a['src'].split('?', 1)[0].split('#', 1)[0]
                if src.startswith('/'):
                    p.scripts.append(src)
            else:
                self.inside, self.buf = 'script', []
        if 'data-cards' in a:
            p.cards.update(k.strip() for k in a['data-cards'].split(',') if k.strip())
        if 'data-projects' in a:
            p.projects.update(k.strip() for k in a['data-projects'].split(',') if k.strip())
        if 'data-glance' in a:
            p.has_glance = True
        # A <link rel=preconnect> names an origin, not a document, so it is
        # tagged for the external check to leave alone.
        preconnect = tag == 'link' and bool(re.search(r'\b(preconnect|dns-prefetch)\b', (a.get('rel') or '').lower()))
        for attr in Page.URL_ATTRS:
            if attr in a and a[attr].strip():
                p.refs.append((a[attr], '<%s %s%s>' % (tag, attr, ' preconnect' if preconnect else '')))
        for attr in Page.SET_ATTRS:
            if a.get(attr):
                for part in a[attr].split(','):
                    cand = part.strip().split(' ')[0]
                    if cand:
                        p.refs.append((cand, '<%s %s>' % (tag, attr)))
        for k, v in a.items():
            if k.startswith('data-') and k not in Page.URL_ATTRS and k not in Page.SET_ATTRS and v.startswith('/assets/'):
                p.refs.append((v, '<%s %s>' % (tag, k)))
        if a.get('style'):
            for m in CSS_URL.finditer(a['style']):
                if not css_url_skipped(m.group(2)):
                    p.refs.append((m.group(2), '<%s style url()>' % tag))

    def handle_endtag(self, tag):
        if self.inside and tag == self.inside:
            text = ''.join(self.buf)
            if self.inside == 'title':
                self.p.title = ' '.join(text.split())
            elif self.inside == 'style':
                self.p.inline_css.append(text)
            elif self.inside == 'script':
                self.p.inline_js.append(text)
            self.inside = None

    def handle_data(self, data):
        if self.inside:
            self.buf.append(data)


CSS_URL = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")


def css_url_skipped(u):
    """url() values that name no file: data URIs, and a fragment (url(#id)
    for an SVG gradient, or url(%23id), the same thing URL-encoded inside a
    data: SVG, which the regex above finds inside the larger data URI)."""
    return u.startswith(('data:', '#', '%23'))


def site_url(relpath):
    if relpath == 'index.html':
        return '/'
    if relpath.endswith('/index.html'):
        return '/' + relpath[:-len('index.html')]
    return '/' + relpath


class Site(object):
    """The built site: every file (as an exact, case-sensitive path, because
    the Mac's filesystem would happily find Apps/x.jpg for apps/x.jpg and
    GitHub Pages would not) and every parsed page."""

    def __init__(self, path, cname):
        self.path = path
        self.files = set(walk_files(path, skip_dot=False))
        self.dirs = set()
        for f in self.files:
            d = os.path.dirname(f)
            while d:
                self.dirs.add(d)
                d = os.path.dirname(d)
        self.pages = {}
        for f in sorted(self.files):
            if f.endswith('.html'):
                page = Page(site_url(f), os.path.join(path, f))
                PageParser(page).feed(read_text(page.path))
                self.pages[page.url] = page
        # The hosts a URL may carry and still be this site: the custom
        # domain, and the addresses `jekyll serve` writes into the redirect
        # stubs when it overrides site.url locally.
        self.hosts = {cname, 'www.' + cname, 'localhost', '127.0.0.1'}

    def exists(self, relpath):
        return relpath in self.files

    def classify(self, url):
        """('fragment'|'root'|'relative'|'external'|'skip', value)"""
        u = url.strip()
        if not u:
            return 'skip', None
        if u.startswith('#'):
            return 'fragment', u
        if u.startswith('//'):
            return 'external', 'https:' + u
        m = re.match(r'^([a-zA-Z][a-zA-Z0-9+.-]*):', u)
        if m:
            scheme = m.group(1).lower()
            if scheme in ('http', 'https'):
                parts = urlsplit(u)
                if (parts.hostname or '').lower() in self.hosts:
                    path = parts.path or '/'
                    if parts.fragment:
                        path += '#' + parts.fragment
                    return 'root', path
                return 'external', u
            return 'skip', None      # mailto:, tel:, data:, javascript:, sms:, blob:
        if u.startswith('/'):
            return 'root', u
        return 'relative', u

    def resolve(self, path):
        """A root-relative path -> (kind, relpath). kind is one of
        page (a folder with an index.html), file, folder (a bare folder),
        noslash (a page reached without its trailing slash), missing."""
        p = unquote(path.split('#', 1)[0].split('?', 1)[0])
        p = os.path.normpath('/' + p.lstrip('/')).replace(os.sep, '/')
        if p == '/':
            return ('page', 'index.html') if self.exists('index.html') else ('missing', 'index.html')
        target = p.lstrip('/')
        if path.split('#', 1)[0].split('?', 1)[0].endswith('/'):
            if self.exists(target + '/index.html'):
                return 'page', target + '/index.html'
            if target in self.dirs:
                return 'folder', target
            return 'missing', target
        if self.exists(target):
            return 'file', target
        if target in self.dirs:
            if self.exists(target + '/index.html'):
                return 'noslash', target + '/index.html'
            return 'folder', target
        return 'missing', target

    def page_for(self, relpath):
        return self.pages.get(site_url(relpath))


# ── the sources ───────────────────────────────────────────────────────────

def front_matter(text):
    """The YAML block at the top of a page, as a dict of the simple keys."""
    if not text.startswith('---'):
        return {}
    end = text.find('\n---', 3)
    if end < 0:
        return {}
    out = {}
    for line in text[3:end].split('\n'):
        m = re.match(r'^([A-Za-z_][\w-]*):\s*(.*?)\s*$', line)
        if m:
            out[m.group(1)] = m.group(2).strip('"\'')
    return out


def source_pages():
    """The source pages Jekyll builds: index.html and src/*.html, minus any
    marked published: false."""
    out = []
    for f in ['index.html'] + sorted('src/' + n for n in os.listdir(os.path.join(ROOT, 'src')) if n.endswith('.html')):
        fm = front_matter(read_text(os.path.join(ROOT, f)))
        out.append((f, fm))
    return out


def strip_js_comments(js):
    """Block comments out (keeping the line count), so a path mentioned in a
    comment is not mistaken for one the code uses. Line comments are handled
    per line by the callers, which skip lines that start with //, because a
    naive strip of // would eat the middle of every https:// literal."""
    return re.sub(r'/\*.*?\*/', lambda m: '\n' * m.group(0).count('\n'), js, flags=re.S)


JS_ROOT_LITERAL = re.compile(r"""(['"])(/[^'"\n\\]*)\1""")
# `u.indexOf('/years-large/')`, `url.pathname.startsWith('/assets/')`,
# `href === '/'`: the string is something the code looks FOR inside a URL,
# not a URL it will request.
JS_PATTERN_CONTEXT = re.compile(r'(\.(?:indexOf|lastIndexOf|includes|startsWith|endsWith|replace|split|test|match|search)\(\s*|[=!]==?\s*)$')


def js_root_literals(js):
    """Every quoted root-relative string in a script that could be a URL of
    this site: it starts with /assets/, or names a page (/work/), or names a
    file at the root (/manifest.webmanifest). Yields (literal, line)."""
    for lineno, line in enumerate(strip_js_comments(js).split('\n'), 1):
        s = line.strip()
        if s.startswith('//'):
            continue
        for m in JS_ROOT_LITERAL.finditer(line):
            lit = m.group(2)
            if lit == '/' or lit.startswith('/__') or lit.startswith('//'):
                continue
            if any(ch in lit for ch in '${}()*<>|^+ \t') or '//' in lit:
                continue      # a template, a regex source, a pattern: not a URL
            if JS_PATTERN_CONTEXT.search(line[:m.start()]):
                continue      # an argument to indexOf() and friends: see above
            last = lit.rstrip('/').rsplit('/', 1)[-1]
            if lit.startswith('/assets/') or lit.endswith('/') or '.' in last:
                yield lit, lineno


# ── HARD: refs ────────────────────────────────────────────────────────────

def check_refs(site, report):
    c = report.check('refs', 'hard', 'internal references resolve to a file in the build')
    dangling = {}      # path -> [where]
    relative = {}      # page -> [url]
    noslash = {}
    prefixes = {}
    referenced = set()  # every build file something points at, for the orphans check

    def hit(kind, target):
        if kind in ('page', 'file', 'noslash'):
            referenced.add(target)

    def look(url, where):
        kind, value = site.classify(url)
        if kind == 'root':
            c.checked += 1
            rk, target = site.resolve(value)
            hit(rk, target)
            if rk == 'missing':
                dangling.setdefault(value.split('#', 1)[0], []).append(where)
            elif rk == 'noslash':
                noslash.setdefault(value, []).append(where)
        elif kind == 'relative':
            c.checked += 1
            relative.setdefault(where.split(' ', 1)[0], []).append(url.strip())

    for page in site.pages.values():
        for url, ctx in page.refs:
            look(url, '%s %s' % (page.url, ctx))
        for css in page.inline_css:
            for m in CSS_URL.finditer(css):
                if not css_url_skipped(m.group(2)):
                    look(m.group(2), '%s <style url()>' % page.url)

    # url() in the built stylesheets, relative to the stylesheet's folder
    for f in sorted(site.files):
        if f.startswith('assets/css/') and f.endswith('.css'):
            css = re.sub(r'/\*.*?\*/', '', read_text(os.path.join(site.path, f)), flags=re.S)
            for m in CSS_URL.finditer(css):
                u = m.group(2).strip()
                if css_url_skipped(u):
                    continue
                if not u.startswith(('/', 'http', '//')):
                    u = '/' + os.path.normpath(os.path.join(os.path.dirname(f), u)).replace(os.sep, '/')
                look(u, '/%s url()' % f)

    # the manifest: icons, shortcuts, start_url
    man = os.path.join(site.path, 'manifest.webmanifest')
    if os.path.exists(man):
        try:
            data = json.loads(read_text(man))
        except ValueError:
            data = {}
        for ic in data.get('icons', []) or []:
            look(ic.get('src', ''), '/manifest.webmanifest icon')
        for sc in data.get('shortcuts', []) or []:
            look(sc.get('url', ''), '/manifest.webmanifest shortcut')
            for ic in sc.get('icons', []) or []:
                look(ic.get('src', ''), '/manifest.webmanifest shortcut icon')
        look(data.get('start_url', ''), '/manifest.webmanifest start_url')

    # every root-relative literal in sw.js, the built scripts, and the inline
    # scripts of the built pages. A literal ending in / is a prefix the code
    # completes at run time (/assets/img/years/ + file): fine when the folder
    # exists. An /assets/ prefix whose folder does NOT exist is noted rather
    # than failed, because nothing has been shown to be requested from it
    # (accents.js holds the audio folder for recordings that are not made
    # yet, and guards every play button with `rec`). A PAGE prefix that does
    # not exist is a link to nowhere and fails.
    scripts = [('/sw.js', read_text(os.path.join(site.path, 'sw.js')))] if site.exists('sw.js') else []
    scripts += [('/' + f, read_text(os.path.join(site.path, f))) for f in sorted(site.files)
                if f.startswith('assets/js/') and f.endswith('.js')]
    for page in site.pages.values():
        for i, js in enumerate(page.inline_js, 1):
            scripts.append(('%s <script #%d>' % (page.url, i), js))
    for name, js in scripts:
        for lit, lineno in js_root_literals(js):
            c.checked += 1
            rk, target = site.resolve(lit)
            hit(rk, target)
            where = '%s:%d' % (name, lineno)
            if rk == 'missing':
                if lit.endswith('/') and lit.startswith('/assets/'):
                    prefixes.setdefault(lit, []).append(where)
                else:
                    dangling.setdefault(lit.split('#', 1)[0].split('?', 1)[0], []).append(where)
            elif rk == 'noslash':
                noslash.setdefault(lit, []).append(where)

    for path in sorted(dangling):
        uses = dangling[path]
        c.add('%s  <- %d use%s, e.g. %s' % (path, len(uses), '' if len(uses) == 1 else 's', '; '.join(uses[:3])))
    for page in sorted(relative):
        urls = relative[page]
        uniq = sorted(set(urls))
        c.add('%s  %d relative URL%s (they work at this folder depth only): %s%s' % (
            page, len(urls), '' if len(urls) == 1 else 's', ', '.join(uniq[:4]), ', ...' if len(uniq) > 4 else ''))
    for path in sorted(noslash):
        c.note('folder link without its trailing slash, a redirect hop each visit: %s  <- %s' % (path, '; '.join(noslash[path][:3])))
    for path in sorted(prefixes):
        c.note('asset prefix for a folder that is not in the build (nothing requested from it yet): %s  <- %s' % (path, '; '.join(prefixes[path][:3])))
    return referenced


# ── HARD: anchors ─────────────────────────────────────────────────────────

_script_ids = {}


def script_declared_ids(site, src):
    """The ids a loaded script can write: every `id: 'x'` in a data file
    (fanpage.js renders each section as <section id=s.id>, gaming-data.js
    and lego-games.js hand it their sections the same way) and every literal
    id="x" in a renderer (accents.js, transcript.js, travels.js and the
    rest write their controls with fixed ids)."""
    if src not in _script_ids:
        path = os.path.join(site.path, src.lstrip('/'))
        ids = set()
        if os.path.exists(path):
            js = strip_js_comments(read_text(path))
            ids.update(re.findall(r"""\bid:\s*['"]([^'"\\]+)['"]""", js))
            ids.update(re.findall(r"""id=\\?["']([^"'\\]+)\\?["']""", js))
        _script_ids[src] = ids
    return _script_ids[src]


class Generated(object):
    """The id patterns the site's scripts write into a page after it loads,
    each derived from the code that writes it. An anchor to one of these is
    fine even though the built markup has no such id."""

    def __init__(self, site):
        js = lambda name: read_text(os.path.join(ROOT, 'assets', 'js', name)) if os.path.exists(os.path.join(ROOT, 'assets', 'js', name)) else ''
        # fandom.js: '<section class="fr-group ..." id="fr-' + g.id + '">' for
        # every group in fandom-data.js, plus the rank links it builds to them.
        self.fandom_groups = set(re.findall(r"\{\s*id:\s*'([a-z0-9-]+)',\s*label:", js('fandom-data.js')))
        # years.js: '<section class="yg-panel" id="ygp-' + g.id + '">' per group.
        self.years_groups = set(re.findall(r"\{\s*id:\s*'([a-z0-9-]+)',\s*label:", js('years-data.js')))
        # accents.js: '<article ... id="ac-' + esc(it.id) + '">' per accent or
        # impersonation in accents-data.js.
        self.accent_ids = set(re.findall(r"\{\s*id:\s*'([a-z0-9-]+)',(?:\s*n:\s*\d+,)?\s*name:", js('accents-data.js')))
        # cards.js: id="app-<key>" / "proj-<key>" for a card, "-2" on a second
        # copy of the same card on one page. The key has to be one the page
        # actually lists in a data-cards / data-projects grid.
        # gaming-data.js: id: 'pics-' + f.dir, one gallery per folder under
        # assets/img/franchises/.
        fr = os.path.join(site.path, 'assets', 'img', 'franchises')
        self.franchises = set(os.listdir(fr)) if os.path.isdir(fr) else set()

    def allowed(self, site, page, frag):
        loads = lambda name: any(s.endswith('/' + name) for s in page.scripts)
        # utils.js skipTarget(): the <main> of any page without an element
        # called main is given id="main", so the skip link has a target.
        if frag == 'main' and loads('utils.js') and page.has_main:
            return True
        # "#top" is the browser's own: it scrolls to the top with no element.
        if frag == 'top':
            return True
        if loads('cards.js'):
            m = re.match(r'^(app|proj)-(.+?)(?:-\d+)?$', frag)
            if m and m.group(2) in (page.cards if m.group(1) == 'app' else page.projects):
                return True
            # cards.js glance(): '<p class="glance-h" id="glance-g-' + gi + '">'
            if page.has_glance and re.match(r'^glance-g-\d+$', frag):
                return True
        if loads('fandom.js'):
            if frag.startswith('fr-') and frag[3:] in self.fandom_groups:
                return True
            # fandom.js tile(): 'frt' + seq + 'n' names a tile, + 'd' describes it
            if re.match(r'^frt\d+[nd]$', frag):
                return True
        if loads('years.js') and frag.startswith('ygp-') and frag[4:] in self.years_groups:
            return True
        if loads('accents.js') and frag.startswith('ac-') and frag[3:] in self.accent_ids:
            return True
        if loads('gaming-data.js') and frag.startswith('pics-') and frag[5:] in self.franchises:
            return True
        # fanpage.js: myPhotoSection() is spliced in with id 'irl' on any fan
        # page that has photographs of its own in photos-data.js.
        if loads('fanpage.js') and frag == 'irl':
            return True
        # travels.js: 'id="trip' + i + '"' per trip, 'id="tvshots' + i + '"' per
        # trip's photographs.
        if loads('travels.js') and re.match(r'^(trip|tvshots)\d+$', frag):
            return True
        # and the general rule the specific ones above are instances of: an
        # id declared in a script this page loads (see script_declared_ids).
        for src in page.scripts:
            if frag in script_declared_ids(site, src):
                return True
        return False


def check_anchors(site, report):
    c = report.check('anchors', 'hard', '#id and /page/#id targets exist in the markup or are written by the page\'s scripts')
    gen = Generated(site)
    ids = {url: set(p.ids) for url, p in site.pages.items()}
    broken = {}
    for page in site.pages.values():
        for url, ctx in page.refs:
            if '#' not in url:
                continue
            kind, value = site.classify(url)
            if kind not in ('fragment', 'root'):
                continue
            path_part, frag = value.split('#', 1)
            frag = unquote(frag)
            if not frag:
                continue
            if kind == 'fragment':
                target = page
            else:
                rk, relpath = site.resolve(path_part)
                if rk not in ('page', 'noslash'):
                    continue          # not a page: the refs check owns it
                target = site.page_for(relpath)
                if target is None:
                    continue
            c.checked += 1
            if frag in ids[target.url] or gen.allowed(site, target, frag):
                continue
            broken.setdefault('%s#%s' % (target.url, frag), []).append('%s %s' % (page.url, ctx))
    for key in sorted(broken):
        c.add('%s  <- %s' % (key, '; '.join(broken[key][:3])))


# ── HARD: em dashes ───────────────────────────────────────────────────────

SOURCE_ROOTS = ['index.html', 'src', '_includes', '_data', 'assets/js', 'assets/css', 'README.md',
                'manifest.webmanifest', 'sw.js', 'tools', '_config.yml', 'offline.html', '404.html']
TEXT_EXT = ('.html', '.js', '.css', '.yml', '.yaml', '.md', '.py', '.swift', '.json', '.webmanifest',
            '.txt', '.sh', '.xml', '.svg')


def source_files():
    """Every text file the em dash check reads, relative to the repo."""
    out = []
    for r in SOURCE_ROOTS:
        full = os.path.join(ROOT, r)
        if os.path.isfile(full):
            out.append(r)
        elif os.path.isdir(full):
            for f in walk_files(full):
                if '.nosync' in f or 'node_modules' in f:
                    continue
                if f.endswith(TEXT_EXT) or '.' not in os.path.basename(f):
                    p = os.path.join(full, f)
                    # tools/ holds one compiled binary (ocr); anything that is
                    # not UTF-8 text is not a source file.
                    if b'\x00' in read_bytes(p)[:4096]:
                        continue
                    out.append(r + '/' + f)
    return out


def show(line):
    """A source line for the log, with the em dash spelled out so the log
    itself stays clean."""
    return line.strip().replace('\u2014', '<U+2014>')[:110]


def check_emdash(site, report):
    c = report.check('emdash', 'hard', 'no em dash in the sources or the built pages')
    files = [(f, os.path.join(ROOT, f)) for f in source_files()]
    files += [('%s (built)' % p.url, p.path) for p in site.pages.values()]
    for label, path in files:
        c.checked += 1
        for lineno, line in enumerate(read_text(path).split('\n'), 1):
            n = len(EM_DASH.findall(line))
            if n:
                c.add('%s:%d  %s' % (label, lineno, show(line)))


# ── HARD: ?v= on images ───────────────────────────────────────────────────

IMG_VERSIONED = re.compile(r'[^\s"\'()<>]+\.(?:png|jpe?g|webp|avif|gif|svg|ico)\?v=[^\s"\'()<>]*', re.I)


def check_imgver(site, report):
    c = report.check('imgver', 'hard', 'no ?v= on an image URL in the built HTML or CSS')
    for f in sorted(site.files):
        if f in ('sw.js', 'assets/photo-versions.json'):
            continue      # the worker's own cache keys are meant to be versioned
        if not (f.endswith('.html') or f.endswith('.css')):
            continue
        c.checked += 1
        for lineno, line in enumerate(read_text(os.path.join(site.path, f)).split('\n'), 1):
            for m in IMG_VERSIONED.finditer(line):
                c.add('/%s:%d  %s' % (f, lineno, m.group(0)[:120]))


# ── HARD: stamps ──────────────────────────────────────────────────────────

def check_stamps(report):
    c = report.check('stamps', 'hard', '_data/versions.yml matches the CSS and JS on disk (tools/stamp.py)')
    stamps = {}
    vpath = os.path.join(ROOT, '_data', 'versions.yml')
    if os.path.exists(vpath):
        for m in re.finditer(r'^"([^"]+)":\s*"([0-9a-f]+)"\s*$', read_text(vpath), re.M):
            stamps[m.group(1)] = m.group(2)
    else:
        c.add('_data/versions.yml is missing: run python3 tools/stamp.py')
    seen = set()
    for sub, ext in (('assets/css', '.css'), ('assets/js', '.js')):
        for f in walk_files(os.path.join(ROOT, sub)):
            if not f.endswith(ext):
                continue
            key = '/%s/%s' % (sub, f)
            seen.add(key)
            c.checked += 1
            digest = hashlib.sha1(read_bytes(os.path.join(ROOT, sub, f))).hexdigest()[:10]
            if key not in stamps:
                c.add('%s  not stamped' % key)
            elif stamps[key] != digest:
                c.add('%s  stale: stamped %s, file is %s' % (key, stamps[key], digest))
    for key in sorted(set(stamps) - seen):
        c.add('%s  stamped but no such file' % key)
    if c.items:
        c.note('python3 tools/stamp.py rewrites the file; ./run and the pre-commit hook (git config core.hooksPath tools/hooks) do it for you')


# ── HARD: duplicate ids ───────────────────────────────────────────────────

def check_dupids(site, report):
    c = report.check('dupids', 'hard', 'no id used twice on one page')
    for page in site.pages.values():
        if page.stub:
            continue
        c.checked += 1
        counts = {}
        for i in page.ids:
            counts[i] = counts.get(i, 0) + 1
        for i in sorted(k for k, n in counts.items() if n > 1):
            c.add('%s  #%s x%d' % (page.url, i, counts[i]))


# ── HARD: the text floor ──────────────────────────────────────────────────

def css_px(value):
    """The smallest number of pixels a font-size value can come to, or None
    when it cannot be known without a browser (em, %, vw, calc, a bare var).
    clamp(a, b, c) can never be below a; min() is at most its smallest known
    argument; max() is at least its largest known one; var(--x, fallback) is
    read as its fallback."""
    v = value.strip().lower()
    m = re.match(r'^(-?[\d.]+)(rem|px)$', v)
    if m:
        return float(m.group(1)) * (16 if m.group(2) == 'rem' else 1)
    m = re.match(r'^(clamp|min|max|var)\((.*)\)$', v, re.S)
    if not m:
        return None
    fn, inner = m.group(1), m.group(2)
    args, depth, cur = [], 0, ''
    for ch in inner:
        if ch == ',' and depth == 0:
            args.append(cur)
            cur = ''
            continue
        depth += ch == '('
        depth -= ch == ')'
        cur += ch
    args.append(cur)
    if fn == 'var':
        return css_px(args[1]) if len(args) > 1 else None
    if fn == 'clamp':
        return css_px(args[0]) if args else None
    known = [px for px in (css_px(a) for a in args) if px is not None]
    if not known:
        return None
    return min(known) if fn == 'min' else max(known)


FONT_SIZE = re.compile(r'font-size\s*:\s*([^;}]+)', re.I)


def check_floor(report):
    c = report.check('floor', 'hard', 'no font-size under 0.66rem (10.56px) in the source stylesheets, unless marked /* floor-ok: reason */')
    for f in walk_files(os.path.join(ROOT, 'assets', 'css')):
        if not f.endswith('.css'):
            continue
        path = os.path.join(ROOT, 'assets', 'css', f)
        for lineno, line in enumerate(read_text(path).split('\n'), 1):
            if 'font-size' not in line:
                continue
            if 'floor-ok' in line:
                continue
            code = re.sub(r'/\*.*?\*/', '', line)
            for m in FONT_SIZE.finditer(code):
                c.checked += 1
                px = css_px(m.group(1))
                if px is not None and px < FLOOR_PX - FLOOR_TOLERANCE:
                    c.add('assets/css/%s:%d  font-size: %s  (%.2fpx)' % (f, lineno, m.group(1).strip(), px))


# ── HARD: headings ────────────────────────────────────────────────────────

def check_headings(site, report):
    c = report.check('headings', 'hard', 'one <h1> per page and no skipped heading level')
    for page in site.pages.values():
        if page.stub:
            continue
        c.checked += 1
        n = page.headings.count(1)
        if n != 1:
            c.add('%s  %d <h1>' % (page.url, n))
        prev = 0
        for level in page.headings:
            if prev and level > prev + 1:
                c.add('%s  h%d straight to h%d' % (page.url, prev, level))
            prev = level


# ── HARD: manifest ────────────────────────────────────────────────────────

def png_size(data):
    """(width, height) off a PNG header: the eight-byte signature, then the
    IHDR chunk whose first two fields are the dimensions, big-endian."""
    if len(data) < 24 or data[:8] != b'\x89PNG\r\n\x1a\n' or data[12:16] != b'IHDR':
        return None
    return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')


def check_manifest(site, report):
    c = report.check('manifest', 'hard', 'the web manifest parses and its icons exist at their declared sizes')
    path = os.path.join(site.path, 'manifest.webmanifest')
    if not os.path.exists(path):
        c.add('/manifest.webmanifest is not in the build')
        return
    try:
        data = json.loads(read_text(path))
    except ValueError as e:
        c.add('/manifest.webmanifest does not parse: %s' % e)
        return
    icons = list(data.get('icons', []) or [])
    for sc in data.get('shortcuts', []) or []:
        icons += sc.get('icons', []) or []
    for ic in icons:
        c.checked += 1
        src = ic.get('src', '')
        rk, target = site.resolve(src)
        if rk != 'file':
            c.add('%s  missing' % src)
            continue
        declared = ic.get('sizes', '')
        if not src.lower().endswith('.png'):
            continue
        actual = png_size(read_bytes(os.path.join(site.path, target)))
        if actual is None:
            c.add('%s  is not a PNG' % src)
            continue
        want = {s.strip().lower() for s in declared.split(' ') if s.strip()}
        got = '%dx%d' % actual
        if want and got not in want:
            c.add('%s  declares %s, the file is %s' % (src, declared, got))
    c.checked += 1
    rk, target = site.resolve(data.get('start_url', '/'))
    if rk not in ('page', 'file'):
        c.add('start_url %s does not resolve' % data.get('start_url'))


# ── SOFT: counts ──────────────────────────────────────────────────────────

UNITS = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
         'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
         'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19}
TENS = {'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90}
NUMBER = r'(\d[\d,]*|(?:%s)(?:[ -](?:%s))?|(?:%s))' % ('|'.join(TENS), '|'.join(UNITS), '|'.join(UNITS))


def as_number(word):
    w = word.lower().replace(',', '')
    if w.isdigit():
        return int(w)
    parts = re.split(r'[ -]', w)
    n = 0
    for p in parts:
        n += TENS.get(p, UNITS.get(p, 0))
    return n


def stated(text, noun):
    """Every '<number> <noun>' in a page's text: (number, approx, snippet).
    'thirty-odd worlds' is approximate and only wrong if the real count is
    outside the decade it names."""
    out = []
    plain = re.sub(r'<[^>]+>', ' ', text)
    plain = re.sub(r'\s+', ' ', plain)
    for m in re.finditer(r'\b%s(-odd)?\s+(%s)\b' % (NUMBER, noun), plain, re.I):
        out.append((as_number(m.group(1)), bool(m.group(2)), m.group(0)))
    return out


def block(text, start, end_pattern):
    """The slice of a data file from `start` to the first line matching
    end_pattern after it, or '' when start is absent."""
    i = text.find(start)
    if i < 0:
        return ''
    m = re.compile(end_pattern, re.M).search(text, i + len(start))
    return text[i:m.start()] if m else text[i:]


def data_counts():
    """The numbers the data files actually hold, read with regexes so this
    needs no JavaScript engine."""
    js = lambda name: read_text(os.path.join(ROOT, 'assets', 'js', name)) if os.path.exists(os.path.join(ROOT, 'assets', 'js', name)) else ''
    d = {}
    # years-data.js: groups carry a school, photos are one row per line
    years = js('years-data.js')
    groups = re.findall(r"\{\s*id:\s*'([a-z0-9-]+)',[^}]*?school:\s*'([a-z]+)'", years)
    photos = block(years, 'photos: {', r'^  \}')
    per_group = {}
    for gid, school in groups:
        seg = block(photos, "'%s': [" % gid, r'^    \]')
        per_group[gid] = len(re.findall(r"^\s*\['", seg, re.M))
    d['photos'] = {'groups': per_group, 'schools': {}}
    for gid, school in groups:
        d['photos']['schools'][school] = d['photos']['schools'].get(school, 0) + per_group[gid]
    # travels-data.js: one entry per 4-space `{` inside trips, the lived ones
    # not counted as trips (the page does not count them either)
    trips = block(js('travels-data.js'), '  trips: [', r'^  \],')
    d['trips'] = len(re.findall(r'^    \{', trips, re.M)) - trips.count('lived: true')
    # accents-data.js: numbered accents in groups, then the impressions list
    acc = js('accents-data.js')
    d['accents'] = len(re.findall(r"\{\s*id:\s*'[a-z0-9-]+',\s*n:\s*\d+,", block(acc, 'groups: [', r'^  \],')))
    d['impersonations'] = len(re.findall(r"^\s*\{\s*id:\s*'", block(acc, 'impressions: [', r'^  \],'), re.M))
    # gaming-data.js: the "worlds" section, one card per world with games
    worlds = block(js('gaming-data.js'), "id: 'worlds'", r"^    \{ id:|^  \];")
    d['game_worlds'] = len(re.findall(r"href:\s*'/worlds/", worlds))
    # fandom-data.js: tiles, and tiles that link to a page
    fan = js('fandom-data.js')
    d['tiles'] = len(re.findall(r"^\s*\{\s*name:\s*'", fan, re.M))
    d['tile_links'] = len(re.findall(r"href:\s*'/", fan))
    # the fan pages themselves
    d['fan_pages'] = len([f for f, fm in source_pages() if os.path.basename(f).startswith('fan-') and fm.get('published') != 'false'])
    # _data/mascots.yml: schools, and schools with an animal
    masc = read_text(os.path.join(ROOT, '_data', 'mascots.yml')) if os.path.exists(os.path.join(ROOT, '_data', 'mascots.yml')) else ''
    d['schools'] = len(re.findall(r'^- id:', masc, re.M))
    d['mascots'] = len(re.findall(r'^\s+mascot:', masc, re.M))
    return d


def check_counts(report):
    c = report.check('counts', 'soft', 'numbers written in the copy agree with the data files')
    d = data_counts()
    c.note('data: photos %s, trips %d, accents %d, impersonations %d, game worlds %d, tiles %d (%d linked), fan pages %d, schools %d (%d with a mascot)'
           % (', '.join('%s %d' % kv for kv in sorted(d['photos']['schools'].items())), d['trips'], d['accents'],
              d['impersonations'], d['game_worlds'], d['tiles'], d['tile_links'], d['fan_pages'], d['schools'], d['mascots']))
    src = lambda f: read_text(os.path.join(ROOT, f)) if os.path.exists(os.path.join(ROOT, f)) else ''

    def compare(file, noun, actual, label):
        for n, approx, snippet in stated(src(file), noun):
            c.checked += 1
            ok = (actual // 10 == n // 10) if approx else (n == actual)
            if not ok:
                c.add('%s says "%s"; %s is %d' % (file, snippet, label, actual))

    # the gallery headings: "<n> photos" then the grid's data-years="<school>"
    for file in ('src/high-school.html', 'src/college.html'):
        text = src(file)
        for m in re.finditer(r'(\d[\d,]*)\s+photos', text):
            grid = re.search(r'data-years="([a-z]+)"', text[m.end():])
            if not grid:
                continue
            c.checked += 1
            school = grid.group(1)
            actual = d['photos']['schools'].get(school, 0)
            if as_number(m.group(1)) != actual:
                c.add('%s says "%s photos" for data-years="%s"; years-data.js has %d' % (file, m.group(1), school, actual))
    compare('src/gaming.html', 'worlds', d['game_worlds'], 'the worlds section of gaming-data.js')
    compare('src/worlds.html', 'trips', d['trips'], 'travels-data.js (trips, not counting the lived-in places)')
    compare('src/worlds.html', 'accents', d['accents'], 'accents-data.js')
    compare('src/worlds.html', 'impersonations', d['impersonations'], 'accents-data.js impressions')
    compare('src/accents.html', 'accents', d['accents'], 'accents-data.js')
    compare('src/accents.html', 'impersonations', d['impersonations'], 'accents-data.js impressions')
    compare('index.html', 'worlds', d['tiles'], 'the tiles in fandom-data.js')
    compare('src/education.html', 'schools', d['schools'], '_data/mascots.yml')
    compare('src/education.html', 'animals', d['mascots'], '_data/mascots.yml entries with a mascot')
    c.checked += 1
    if d['fan_pages'] != d['tile_links']:
        c.add('%d fan pages in src/ but %d linked tiles in fandom-data.js' % (d['fan_pages'], d['tile_links']))


# ── SOFT: orphans ─────────────────────────────────────────────────────────

JS_MEDIA_LITERAL = re.compile(r"""(['"])([^'"\n\\]+?\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm|m4a|mp3|pdf|json))\1""", re.I)


def check_orphans(site, report, referenced):
    c = report.check('orphans', 'soft', 'files under assets/ that nothing references')
    assets = os.path.join(ROOT, 'assets')
    files = set(walk_files(assets))
    used = set()

    def mark(rel_asset):
        if rel_asset in files:
            used.add(rel_asset)
            return True
        return False

    # everything the refs check saw resolve, mapped back onto the source tree
    for target in referenced:
        if target.startswith('assets/'):
            mark(target[len('assets/'):])
    # every media-looking string in the scripts and the data files, tried as
    # a root path and then under the prefixes the code joins it to:
    # /assets/img/years/ (photos-data.js, travels-data.js, fan-been.js),
    # /assets/img/franchises/ (fan-shots.js), /assets/img/ (apps-data.js,
    # intro.js, cards.js)
    for f in walk_files(os.path.join(ROOT, 'assets', 'js')):
        if not f.endswith('.js'):
            continue
        js = strip_js_comments(read_text(os.path.join(ROOT, 'assets', 'js', f)))
        for m in JS_MEDIA_LITERAL.finditer(js):
            lit = m.group(2)
            if lit.startswith('/assets/'):
                mark(lit[len('/assets/'):])
                continue
            if lit.startswith(('http', '//', '../assets/')):
                if lit.startswith('../assets/'):
                    mark(lit[len('../assets/'):])
                continue
            for prefix in ('img/years/', 'img/franchises/', 'img/'):
                if mark(prefix + lit):
                    break
    # the same for the source pages and includes, whose paths are root-relative
    for f in ['index.html', 'sw.js', 'manifest.webmanifest'] + ['src/' + n for n in os.listdir(os.path.join(ROOT, 'src'))] + ['_includes/' + n for n in os.listdir(os.path.join(ROOT, '_includes'))]:
        p = os.path.join(ROOT, f)
        if os.path.isfile(p):
            for m in re.finditer(r'/assets/([^\s"\'<>)?#]+)', read_text(p)):
                mark(m.group(1))
    # years-data.js rows: years/<group>/<file>, or years/<file> when the row
    # already carries a folder (the ID cards, see url() in years.js); and the
    # 2000px copy of every referenced photograph under years-large/, which
    # years.js and travels.js swap in when a photo is opened
    years = read_text(os.path.join(ROOT, 'assets', 'js', 'years-data.js'))
    photos = block(years, 'photos: {', r'^  \}')
    for gid in re.findall(r"^\s*'([a-z0-9-]+)':\s*\[", photos, re.M):
        for row in re.findall(r"^\s*\['([^']+)'", block(photos, "'%s': [" % gid, r'^    \]'), re.M):
            mark('img/years/' + (row if '/' in row else gid + '/' + row))
    for u in list(used):
        if u.startswith('img/years/'):
            mark('img/years-large/' + u[len('img/years/'):])
    # src/gaming.html lists every .jpg under franchises/ at build time
    for f in files:
        if f.startswith('img/franchises/') and f.endswith('.jpg'):
            used.add(f)
    # tools/thumbs.py: a 96px WebP under thumbs/ for every card picture, at
    # the picture's own path with the extension swapped
    apps = read_text(os.path.join(ROOT, 'assets', 'js', 'apps-data.js'))
    for pic in re.findall(r"\b(?:icon|img):\s*'([^']+)'", apps):
        mark('img/thumbs/' + re.sub(r'\.\w+$', '.webp', pic))
    orphans = sorted(files - used)
    c.checked = len(files)
    by_folder = {}
    for f in orphans:
        by_folder.setdefault(os.path.dirname(f), []).append(f)
    for folder in sorted(by_folder):
        names = by_folder[folder]
        c.add('assets/%s/: %d unreferenced (%s%s)' % (folder, len(names), ', '.join(os.path.basename(n) for n in names[:6]),
                                                     ', ...' if len(names) > 6 else ''))


# ── SOFT: meta ────────────────────────────────────────────────────────────

def check_meta(site, report):
    c = report.check('meta', 'soft', 'a description of the right length, a unique title, a lang on every page')
    titles = {}
    for page in site.pages.values():
        if page.stub:
            continue
        c.checked += 1
        if page.description is None or not page.description.strip():
            c.add('%s  no meta description' % page.url)
        elif len(page.description) > 160:
            c.add('%s  description is %d characters (160 is what a result shows)' % (page.url, len(page.description)))
        if not page.lang:
            c.add('%s  <html> has no lang' % page.url)
        titles.setdefault(page.title, []).append(page.url)
    for title, urls in sorted(titles.items()):
        if len(urls) > 1:
            c.add('title "%s" on %d pages: %s' % (title, len(urls), ', '.join(urls[:4])))


# ── EXTERNAL: links and YouTube ───────────────────────────────────────────

# Hosts that answer anything that is not a browser with a 403 (or, for
# LinkedIn, a 999). A link into one of them cannot be verified from a
# datacenter and is reported as such, never as broken.
BOT_BLOCKED = ('linkedin.com', 'instagram.com', 'x.com', 'twitter.com', 'facebook.com', 'tiktok.com',
               'fandom.com', 'sunnah.com', 'yugipedia.com', 'tokyodisneyresort.jp', 'usj.co.jp')
YOUTUBE_HOSTS = ('youtube.com', 'youtu.be', 'youtube-nocookie.com')
USER_AGENT = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) '
              'Version/17.0 Safari/605.1.15')
TIMEOUT = 15
PARALLEL = 6

YT_URL_ID = re.compile(r'(?:youtube(?:-nocookie)?\.com/(?:watch\?(?:[^\s\'"&]*&)*v=|embed/|shorts/|v/|live/)|youtu\.be/)([A-Za-z0-9_-]{11})')
# the data files write a track as `v: 'id'` (see fanpage.js hear buttons),
# a page writes a play button as data-yt="id"; and a list of ids under a
# yt/ids/videos/tracks/clips key is one array of them
YT_KEY_ID = re.compile(r"""\b(?:v|yt|ytid|ytId|video|videoId)\s*:\s*['"]([A-Za-z0-9_-]{11})['"]""")
YT_ATTR_ID = re.compile(r"""data-yt=["']([A-Za-z0-9_-]{11})["']""")
YT_ARRAY = re.compile(r"""\b(?:yt|ids|videos|tracks|clips)\s*:\s*\[((?:\s*['"][A-Za-z0-9_-]{11}['"]\s*,?)+)\s*\]""")


def host_of(url):
    return (urlsplit(url).hostname or '').lower()


def in_hosts(host, suffixes):
    return any(host == s or host.endswith('.' + s) for s in suffixes)


def gather_external(site):
    """url -> [where], for every outside URL in the build."""
    inv = {}

    def add(u, where):
        inv.setdefault(u, []).append(where)

    for page in site.pages.values():
        for url, ctx in page.refs:
            if 'preconnect' in ctx:
                continue
            kind, value = site.classify(url)
            if kind == 'external':
                add(value.split('#', 1)[0], '%s %s' % (page.url, ctx))
        for i, js in enumerate(page.inline_js, 1):
            for lineno, line in enumerate(strip_js_comments(js).split('\n'), 1):
                for m in re.finditer(r"""['"](https?://[^'"\s<>]+)['"]""", line):
                    add(m.group(1), '%s <script #%d>:%d' % (page.url, i, lineno))
    for f in sorted(site.files):
        if (f.startswith('assets/js/') and f.endswith('.js')) or f == 'sw.js':
            for lineno, line in enumerate(strip_js_comments(read_text(os.path.join(site.path, f))).split('\n'), 1):
                if line.strip().startswith('//'):
                    continue
                for m in re.finditer(r"""['"](https?://[^'"\s<>]+)['"]""", line):
                    u = m.group(1)
                    if '${' in u or urlsplit(u).path in ('', '/') and not u.endswith('/'):
                        continue      # a template, or a bare origin kept for preconnect
                    add(u, '/%s:%d' % (f, lineno))
        elif f.startswith('assets/css/') and f.endswith('.css'):
            for m in CSS_URL.finditer(read_text(os.path.join(site.path, f))):
                if m.group(2).startswith(('http://', 'https://', '//')):
                    add(m.group(2) if not m.group(2).startswith('//') else 'https:' + m.group(2), '/%s url()' % f)
    return inv


def gather_youtube():
    """video id -> [file:line], from every source file that can carry one."""
    found = {}
    files = ['index.html'] + ['src/' + n for n in sorted(os.listdir(os.path.join(ROOT, 'src'))) if n.endswith('.html')]
    files += ['_includes/' + n for n in sorted(os.listdir(os.path.join(ROOT, '_includes')))]
    files += ['assets/js/' + f for f in walk_files(os.path.join(ROOT, 'assets', 'js')) if f.endswith('.js')]
    for f in files:
        p = os.path.join(ROOT, f)
        if not os.path.isfile(p):
            continue
        text = read_text(p)
        if f.endswith('.js'):
            text = strip_js_comments(text)
        for lineno, line in enumerate(text.split('\n'), 1):
            ids = set(YT_URL_ID.findall(line)) | set(YT_KEY_ID.findall(line)) | set(YT_ATTR_ID.findall(line))
            for arr in YT_ARRAY.findall(line):
                ids.update(re.findall(r"['\"]([A-Za-z0-9_-]{11})['\"]", arr))
            for vid in ids:
                found.setdefault(vid, []).append('%s:%d' % (f, lineno))
    return found


def fetch(url, method, ctx):
    """(status, error) for one request; status None when no response came."""
    import urllib.request
    import urllib.error
    req = urllib.request.Request(url, method=method, headers={
        'User-Agent': USER_AGENT, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as r:
            return r.status, None
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:      # DNS, TLS, timeouts, resets: the message says which
        return None, str(e)[:140]


def classify_result(status, error):
    """ok / broken / unverifiable. Only what is certainly dead is broken: a
    404 or 410, or a name that does not resolve. A 403, a 429, a timeout or
    a TLS handshake this Python cannot complete are the datacenter being
    turned away, not the page being gone."""
    if status is not None and 200 <= status < 400:
        return 'ok'
    if status in (404, 410):
        return 'broken'
    if error and re.search(r'nodename nor servname|Name or service not known|No address associated|NXDOMAIN|getaddrinfo', error):
        return 'broken'
    return 'unverifiable'


def check_external(site, report):
    import ssl
    import threading
    from concurrent.futures import ThreadPoolExecutor
    ctx = ssl.create_default_context()
    inv = gather_external(site)
    links = report.check('links', 'external', 'every outside URL answers (HEAD, then GET)')
    yt = report.check('youtube', 'external', 'every YouTube id is still a public video (oEmbed)')

    host_lock = {}
    host_last = {}
    glock = threading.Lock()

    def polite(url):
        """One request in flight per host, 0.8 s apart."""
        h = host_of(url)
        with glock:
            lk = host_lock.setdefault(h, threading.Lock())
        lk.acquire()
        gap = 0.8 - (time.time() - host_last.get(h, 0))
        if gap > 0:
            time.sleep(gap)
        return lk

    def release(url, lk):
        host_last[host_of(url)] = time.time()
        lk.release()

    def check_link(url):
        lk = polite(url)
        try:
            status, error = fetch(url, 'HEAD', ctx)
            if status is None or status >= 400:
                time.sleep(0.5)
                s2, e2 = fetch(url, 'GET', ctx)
                if s2 is not None:
                    status, error = s2, e2
        finally:
            release(url, lk)
        return url, status, error

    def check_video(vid):
        import urllib.parse
        url = 'https://www.youtube.com/oembed?url=' + urllib.parse.quote('https://www.youtube.com/watch?v=' + vid, safe='') + '&format=json'
        status, error = None, None
        for attempt in range(3):
            status, error = fetch(url, 'GET', ctx)
            if status in (429, 503) or status is None:
                time.sleep(2 * (attempt + 1))
                continue
            break
        time.sleep(0.25)
        return vid, status, error

    urls = sorted(u for u in inv if not in_hosts(host_of(u), YOUTUBE_HOSTS))
    blocked = [u for u in urls if in_hosts(host_of(u), BOT_BLOCKED)]
    to_check = [u for u in urls if u not in set(blocked)]
    links.checked = len(urls)
    results = {}
    with ThreadPoolExecutor(max_workers=PARALLEL) as ex:
        for url, status, error in ex.map(check_link, to_check):
            results[url] = (status, error)
    unverifiable = []
    for url in to_check:
        status, error = results[url]
        verdict = classify_result(status, error)
        where = '; '.join(inv[url][:3])
        if verdict == 'broken':
            links.add('%s  %s  <- %s' % (status if status else 'DNS', url, where))
        elif verdict == 'unverifiable':
            unverifiable.append('%s  %s  <- %s' % (status if status else (error or '?'), url, where))
    for url in blocked:
        unverifiable.append('blocks robots  %s  <- %s' % (url, '; '.join(inv[url][:2])))
    for line in unverifiable:
        links.note('unverifiable: ' + line)

    found = gather_youtube()
    for url in inv:
        if in_hosts(host_of(url), YOUTUBE_HOSTS):
            for vid in YT_URL_ID.findall(url):
                found.setdefault(vid, []).extend(inv[url][:2])
    yt.checked = len(found)
    with ThreadPoolExecutor(max_workers=PARALLEL) as ex:
        for vid, status, error in ex.map(check_video, sorted(found)):
            where = '; '.join(found[vid][:3])
            if status == 200:
                continue
            if status in (404, 401):
                yt.add('%s  %s  <- %s' % (status, vid, where))
            elif status == 403:
                yt.note('embedding turned off, still plays on YouTube: %s  <- %s' % (vid, where))
            else:
                yt.note('unverifiable: %s  %s  <- %s' % (status if status else (error or '?'), vid, where))


# ── the run ───────────────────────────────────────────────────────────────

def find_site(arg):
    if arg:
        return os.path.abspath(arg)
    for name in ('_site.nosync', '_site'):
        p = os.path.join(ROOT, name)
        if os.path.isdir(p):
            return p
    return None


def print_report(report, strict, external, seconds):
    hard = soft = ext = 0
    for c in report.checks:
        label = {'hard': 'HARD', 'soft': 'SOFT', 'external': 'EXT '}[c.kind]
        n = len(c.items)
        if c.kind == 'hard':
            hard += n
        elif c.kind == 'soft':
            soft += n
        else:
            ext += n
        state = 'ok' if not n else ('FAIL' if c.kind != 'soft' else 'look')
        unit = {'refs': 'reference', 'anchors': 'anchor', 'emdash': 'file', 'imgver': 'file', 'stamps': 'file',
                'dupids': 'page', 'floor': 'declaration', 'headings': 'page', 'manifest': 'icon', 'counts': 'number',
                'orphans': 'file', 'meta': 'page', 'links': 'URL', 'youtube': 'id'}.get(c.name, 'item')
        print('%s %-9s %-4s %5d finding%s in %s %s%s' % (label, c.name, state, n, '' if n == 1 else 's',
                                                        '{:,}'.format(c.checked), unit, '' if c.checked == 1 else 's'))
        print('               %s' % c.what)
        shown = c.items[:60]
        for line in shown:
            print('               - ' + line)
        if len(c.items) > len(shown):
            print('               ... and %d more (all of them in the --json report)' % (len(c.items) - len(shown)))
        for line in c.notes[:40]:
            print('               . ' + line)
        if len(c.notes) > 40:
            print('               . ... and %d more notes' % (len(c.notes) - 40))
    verdict = []
    verdict.append('%d hard failure%s%s' % (hard, '' if hard == 1 else 's', ' (fatal with --strict)' if hard and strict else (' (not fatal without --strict)' if hard else '')))
    verdict.append('%d soft finding%s' % (soft, '' if soft == 1 else 's'))
    if external:
        verdict.append('%d dead external link%s or video%s' % (ext, '' if ext == 1 else 's', '' if ext == 1 else 's'))
    else:
        verdict.append('external links not checked (--external)')
    print()
    print('SUMMARY  %s  in %.1f s' % ('; '.join(verdict), seconds))
    return hard, soft, ext


def main(argv):
    ap = argparse.ArgumentParser(description='the site\'s checks over the built site and the sources')
    ap.add_argument('site', nargs='?', help='the built site (default: _site.nosync, then _site)')
    ap.add_argument('--strict', action='store_true', help='exit 1 when a HARD check fails')
    ap.add_argument('--external', action='store_true', help='also check every outside link and YouTube id (network)')
    ap.add_argument('--json', metavar='PATH', help='write the full report as JSON')
    args = ap.parse_args(argv)

    t0 = time.time()
    site_dir = find_site(args.site)
    if not site_dir or not os.path.isdir(site_dir):
        print('check.py: no built site at %s (run ./run, or jekyll build --destination _site)' % (args.site or '_site.nosync / _site'))
        return 2
    cname_path = os.path.join(ROOT, 'CNAME')
    cname = read_text(cname_path).strip().lower() if os.path.exists(cname_path) else 'abubakrelmallah.com'

    site = Site(site_dir, cname)
    report = Report()
    print('check.py  site %s (%d pages, %s files)  sources %s' % (rel(site_dir, ROOT), len(site.pages), '{:,}'.format(len(site.files)), ROOT))
    print()

    referenced = check_refs(site, report)
    check_anchors(site, report)
    check_emdash(site, report)
    check_imgver(site, report)
    check_stamps(report)
    check_dupids(site, report)
    check_floor(report)
    check_headings(site, report)
    check_manifest(site, report)
    check_counts(report)
    check_orphans(site, report, referenced)
    check_meta(site, report)
    if args.external:
        check_external(site, report)

    report.done()
    seconds = time.time() - t0
    hard, soft, ext = print_report(report, args.strict, args.external, seconds)
    if args.json:
        out = report.as_dict()
        out['site'] = site_dir
        out['seconds'] = round(seconds, 2)
        out['strict'] = args.strict
        out['external'] = args.external
        with open(args.json, 'w') as fh:
            json.dump(out, fh, indent=1, ensure_ascii=False)
        print('report written to %s' % args.json)
    if (args.strict and hard) or (args.external and ext):
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
