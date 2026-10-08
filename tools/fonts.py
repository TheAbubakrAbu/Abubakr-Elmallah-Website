#!/usr/bin/env python3
"""Self-hosted, subsetted web fonts for the three site families.

    python3 tools/fonts.py             # download, subset, verify, report
    python3 tools/fonts.py --force     # re-download the sources first
    python3 tools/fonts.py --out DIR   # write somewhere else (a size experiment)
    python3 tools/fonts.py --keep-hinting --keep-opsz   # the two size levers, off

Needs fontTools with the brotli codec (woff2 is brotli inside). The Mac's
own python3 has fontTools but not brotli, so:

    python3 -m venv /tmp/fonts-venv && /tmp/fonts-venv/bin/pip install fonttools brotli
    /tmp/fonts-venv/bin/python tools/fonts.py

WHY. Every page loaded Space Grotesk, Inter and JetBrains Mono from Google
Fonts: a CSS request to fonts.googleapis.com, then one woff2 per family and
per script slice from fonts.gstatic.com. Two things made that slow. The two
extra origins each cost a connection before a single byte of font arrives
(the CSS is fetched at low priority on purpose, see head.html, so text first
paints in the fallback face and swaps later). And the slicing is Google's,
not ours: a single ā or ḥ in a transliteration made the browser fetch the
whole latin-ext file (Inter's is 85 KB on top of the 48 KB latin one), and
the /education/ backdrop's Σ λ π Δ pulled JetBrains Mono's greek slice too.
Measured on the live site that was 100 KB of font on the home page and up to
205 KB on /projects/ and /al-islam/, over six requests.

Self-hosting puts the files on the page's own origin (one connection, and the
service worker can keep them), and subsetting keeps only what the site can
draw: one file per family covering Latin, its extensions, the transliteration
letters (Latin Extended Additional for ḥ ṣ ṭ ḍ ẓ, Spacing Modifier Letters for
ʿ ʾ), punctuation, arrows, maths and the box/geometric symbols the tech pages
use. Emoji and Arabic are drawn by other fonts (Apple Color Emoji; Amiri and
Scheherazade New stay on Google Fonts, per page, via the `fonts` front matter)
and are not this family's job.

THE RECIPE, per family:

  1. The variable TTF from Google's own repository (github.com/google/fonts,
     OFL licensed; the license text is copied next to the output), cached in
     the system temp folder so a rerun is offline.
  2. The wght axis is cut down to the range the CSS actually asks for,
     rounded outward to the hundreds and never narrower than 400 to 700:
     Inter 300 to 800 (the 300 is the Dune and Nolan wordmarks on /worlds/,
     the 650 the transcript headings, the 800 the rounded-cartoon wordmarks
     when their system faces are missing), Space Grotesk 300 to 700 (the two
     thin fan titles), JetBrains Mono 400 to 700 (<b> inside mono labels).
     Inter's optical-size axis is pinned at 14, which is what Google was
     serving (its static instances are cut at opsz 14), so the rendering is
     unchanged and the file is about a third smaller than with the axis kept.
     --keep-opsz keeps it, and then browsers apply optical sizing on their
     own (font-optical-sizing: auto), tightening Inter above 14px.
  3. Subset to the Unicode blocks in RANGES plus each family's EXTRA (Greek
     for JetBrains Mono, which draws the /education/ backdrop; the single π
     for Inter, which appears in a card write-up). Generous on purpose: a
     whole block costs a few hundred bytes and means a new accented name or
     an arrow never needs a rebuild. All OpenType layout features are kept
     (kerning, ligatures, the tabular figures the clocks use).
  4. TrueType hints are dropped (--keep-hinting keeps them). Mac, iOS and
     Android never use them; Windows renders unhinted variable fonts through
     DirectWrite at these sizes without trouble, and hints are about a third
     of Inter's bytes.
  5. Written as woff2 to assets/fonts/<family>.woff2.

THE CHECK. After building, every code point the site can render is collected
the way the perf survey did it (the built pages' text under _site.nosync/,
every string literal in assets/js/, every CSS content: string) and looked up
in the new fonts. Three outcomes are printed per family: present; absent from
the SOURCE font too (falls back to a system face exactly as it did from
Google, e.g. Inter has no ✕, so the lightbox close button never was Inter);
and DROPPED (in the source, not in the subset), which is the one that would
be a bug: add its block to RANGES or EXTRA and rerun.

THE FALLBACK METRICS. The report ends with the @font-face rules for base.css:
one per family, and one per local fallback face (Arial for the two sans
faces, Menlo and Courier New for the mono) whose size-adjust makes its
average advance width match the web font's and whose ascent/descent/line-gap
overrides copy the web font's line box, so the swap from fallback to web font
moves nothing. The values are computed from the fonts on this Mac; if the
system files are missing the block prints without them.

Images never carry ?v=, and neither do these: the names are fixed, so a
rebuild that changes the glyph set is picked up within the host's cache
lifetime (GitHub Pages sends max-age=600) and by the service worker's next
asset refresh.
"""
import glob, html, io, json, os, re, shutil, sys, tempfile, urllib.request
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'fonts')
CACHE = os.path.join(tempfile.gettempdir(), 'abubakr-fonts-src')
GITHUB = 'https://github.com/google/fonts/raw/main/ofl/'
API = 'https://api.github.com/repos/google/fonts/contents/ofl/'

# One entry per family. `dir` is the folder under ofl/ in google/fonts and
# `file` the variable TTF in it (if the name ever changes, the folder is
# listed through the GitHub API and the one variable TTF there is taken).
# `wght` is the closed range kept; `pin` fixes any other axis at one value.
FAMILIES = [
    {'name': 'Inter', 'stem': 'inter', 'dir': 'inter', 'file': 'Inter[opsz,wght].ttf',
     'wght': (300, 800), 'pin': {'opsz': 14}, 'extra': [(0x03C0, 0x03C0, 'Greek small pi')],
     'fallbacks': [('Arial', '/System/Library/Fonts/Supplemental/Arial.ttf', None)]},
    {'name': 'Space Grotesk', 'stem': 'space-grotesk', 'dir': 'spacegrotesk', 'file': 'SpaceGrotesk[wght].ttf',
     'wght': (300, 700), 'pin': {}, 'extra': [],
     'fallbacks': [('Arial', '/System/Library/Fonts/Supplemental/Arial.ttf', None)]},
    {'name': 'JetBrains Mono', 'stem': 'jetbrains-mono', 'dir': 'jetbrainsmono', 'file': 'JetBrainsMono[wght].ttf',
     'wght': (400, 700), 'pin': {},
     'extra': [(0x0370, 0x03FF, 'Greek and Coptic'), (0x2500, 0x257F, 'Box Drawing'), (0x2580, 0x259F, 'Block Elements')],
     'fallbacks': [('Menlo', '/System/Library/Fonts/Menlo.ttc', 'Menlo Regular'),
                   ('Courier New', '/System/Library/Fonts/Supplemental/Courier New.ttf', None)]},
]

# The blocks every family keeps. Whole blocks, not the characters in use
# today, so the next transliterated name or arrow is already covered.
RANGES = [
    (0x0000, 0x007F, 'Basic Latin'),
    (0x0080, 0x00FF, 'Latin-1 Supplement'),
    (0x0100, 0x017F, 'Latin Extended-A'),
    (0x0180, 0x024F, 'Latin Extended-B'),
    (0x02B0, 0x02FF, 'Spacing Modifier Letters'),
    (0x0300, 0x036F, 'Combining Diacritical Marks'),
    (0x1E00, 0x1EFF, 'Latin Extended Additional'),
    (0x2000, 0x206F, 'General Punctuation'),
    (0x2070, 0x209F, 'Superscripts and Subscripts'),
    (0x20A0, 0x20CF, 'Currency Symbols'),
    (0x2100, 0x214F, 'Letterlike Symbols'),
    (0x2150, 0x218F, 'Number Forms'),
    (0x2190, 0x21FF, 'Arrows'),
    (0x2200, 0x22FF, 'Mathematical Operators'),
    (0x2300, 0x23FF, 'Miscellaneous Technical'),
    (0x25A0, 0x25FF, 'Geometric Shapes'),
    (0x2600, 0x26FF, 'Miscellaneous Symbols'),
    (0x2700, 0x27BF, 'Dingbats'),
    (0x27C0, 0x27EF, 'Miscellaneous Mathematical Symbols-A'),
    (0x2980, 0x29FF, 'Miscellaneous Mathematical Symbols-B'),
    (0xFB00, 0xFB06, 'Latin ligatures'),
]

# OpenType layout features kept. '*' is everything the font has (Inter's
# stylistic sets and character variants included); the site only reaches
# for kern, liga, calt and tnum, so this is where a smaller file would come
# from if one were ever needed.
FEATURES = ['*']

# Not this family's job: drawn by Amiri / Scheherazade New (Arabic) or the
# color emoji font, so they are left out of the verification.
OTHER_FONTS = [(0x0600, 0x06FF), (0x0750, 0x077F), (0x08A0, 0x08FF), (0xFB50, 0xFDFF), (0xFE70, 0xFEFF),
               (0xFE00, 0xFE0F), (0x1F000, 0x1FAFF), (0xE000, 0xF8FF)]

SAMPLE = ('the quick brown fox jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG '
          '0123456789 .,;:!?()[]{}-/ ')


def need(module):
    try:
        return __import__(module)
    except ImportError:
        sys.exit('%s is missing: see the venv recipe at the top of tools/fonts.py' % module)


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'abubakrelmallah.com fonts.py'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def download(fam, force):
    """The variable TTF and the OFL text, from the cache or from GitHub."""
    os.makedirs(CACHE, exist_ok=True)
    ttf = os.path.join(CACHE, fam['file'])
    ofl = os.path.join(CACHE, fam['dir'] + '-OFL.txt')
    if force or not os.path.exists(ttf):
        url = GITHUB + fam['dir'] + '/' + urllib.request.quote(fam['file'])
        try:
            data = fetch(url)
        except Exception as e:
            # the file was renamed upstream: list the folder and take the one variable TTF
            print('  %s: %s, listing the folder instead' % (fam['file'], e))
            listing = json.loads(fetch(API + fam['dir']).decode())
            names = [x['name'] for x in listing if x['name'].endswith('.ttf') and '[' in x['name']]
            if len(names) != 1:
                sys.exit('  cannot pick a variable TTF in ofl/%s: %s' % (fam['dir'], names))
            fam['file'] = names[0]
            ttf = os.path.join(CACHE, fam['file'])
            data = fetch(GITHUB + fam['dir'] + '/' + urllib.request.quote(names[0]))
        open(ttf, 'wb').write(data)
        print('  downloaded %s (%d bytes)' % (fam['file'], len(data)))
    if force or not os.path.exists(ofl):
        open(ofl, 'wb').write(fetch(GITHUB + fam['dir'] + '/OFL.txt'))
    return ttf, ofl


def unicodes(fam):
    s = set()
    for a, b, _ in RANGES + fam['extra']:
        s.update(range(a, b + 1))
    return s


def build(fam, src, dst, keep_hinting, keep_opsz):
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    from fontTools import subset
    font = TTFont(src)
    # Subset first, then cut the axes. The other way round trips over a
    # fontTools quirk: partial instancing leaves glyphs with no deltas out of
    # gvar, and the subsetter then asks for them by name (KeyError).
    opts = subset.Options()
    opts.layout_features = list(FEATURES)
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]   # the usual six plus the license lines
    opts.hinting = keep_hinting
    opts.recalc_timestamp = False
    s = subset.Subsetter(opts)
    s.populate(unicodes=unicodes(fam))
    s.subset(font)
    limits = {'wght': fam['wght']}
    for axis, value in fam['pin'].items():
        if not (axis == 'opsz' and keep_opsz):
            limits[axis] = value
    axes = {a.axisTag for a in font['fvar'].axes}
    limits = {k: v for k, v in limits.items() if k in axes}
    font = instancer.instantiateVariableFont(font, limits, inplace=False, updateFontNames=False)
    font.flavor = 'woff2'
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    font.save(dst)
    return font


# ---- the site's characters, the way the perf survey collected them ----

class Text(HTMLParser):
    def __init__(self, sink):
        super().__init__(convert_charrefs=True)
        self.sink, self.skip = sink, 0
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
        for k, v in attrs:      # attr() and placeholders are drawn too
            if v and (k.startswith('data-') or k in ('placeholder', 'value')):
                self.sink.update(v)
    def handle_endtag(self, tag):
        if tag in ('script', 'style') and self.skip:
            self.skip -= 1
    def handle_data(self, data):
        if self.skip:
            js_strings(data, self.sink)
        else:
            self.sink.update(data)

STR = re.compile(r"""'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`""", re.S)
UESC = re.compile(r'\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})')
CSS_CONTENT = re.compile(r'content\s*:\s*((?:"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|[^;}])*)')
CSS_STR = re.compile(r'"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'')
CSS_ESC = re.compile(r'\\([0-9a-fA-F]{1,6})\s?')


def js_strings(text, sink):
    for m in STR.finditer(text):
        v = next(g for g in m.groups() if g is not None)
        sink.update(UESC.sub(lambda u: chr(int(next(g for g in u.groups() if g), 16)), v))


def site_chars():
    chars = set()
    built = next((d for d in ('_site.nosync', '_site') if os.path.isdir(os.path.join(ROOT, d))), None)
    if built:
        pages = glob.glob(os.path.join(ROOT, built, '**', '*.html'), recursive=True)
    else:   # no build around: the sources are a superset (Liquid tags included)
        pages = glob.glob(os.path.join(ROOT, 'src', '*.html')) + glob.glob(os.path.join(ROOT, '_includes', '*.html')) + [os.path.join(ROOT, 'index.html')]
    for p in pages:
        Text(chars).feed(open(p, encoding='utf-8', errors='replace').read())
    for p in glob.glob(os.path.join(ROOT, 'assets', 'js', '**', '*.js'), recursive=True):
        js_strings(open(p, encoding='utf-8', errors='replace').read(), chars)
    for p in glob.glob(os.path.join(ROOT, 'assets', 'css', '**', '*.css'), recursive=True):
        for m in CSS_CONTENT.finditer(open(p, encoding='utf-8', errors='replace').read()):
            for s in CSS_STR.finditer(m.group(1)):
                v = s.group(1) if s.group(1) is not None else s.group(2)
                chars.update(CSS_ESC.sub(lambda e: chr(int(e.group(1), 16)), v))
    chars = {c for c in chars if ord(c) > 0x20 and c not in '\x7f\ufeff'}
    return chars, len(pages), built or 'sources'


def other_font(c):
    return any(a <= ord(c) <= b for a, b in OTHER_FONTS)


def verify(fam, src, dst, chars):
    from fontTools.ttLib import TTFont
    have = set(TTFont(src).getBestCmap())
    got = set(TTFont(dst).getBestCmap())
    mine = sorted(c for c in chars if not other_font(c))
    absent = [c for c in mine if ord(c) not in have]
    dropped = [c for c in mine if ord(c) in have and ord(c) not in got]
    fmt = lambda cs: ' '.join('U+%04X %s' % (ord(c), c) for c in cs) or 'none'
    print('  %-15s %4d site characters checked: %d present, %d not in the source font (fall back as before): %s'
          % (fam['name'], len(mine), len(mine) - len(absent) - len(dropped), len(absent), fmt(absent)))
    if dropped:
        print('  DROPPED by the subset (add their block to RANGES or EXTRA): ' + fmt(dropped))
    return not dropped


# ---- fallback metrics and the CSS block ----

def sample_width(font):
    cmap, hmtx, upm = font.getBestCmap(), font['hmtx'], font['head'].unitsPerEm
    ws = [hmtx[cmap[ord(c)]][0] for c in SAMPLE if ord(c) in cmap]
    return sum(ws) / len(ws) / upm


def open_local(path, face):
    from fontTools.ttLib import TTFont, TTCollection
    if not os.path.exists(path):
        return None
    if path.endswith('.ttc'):
        for f in TTCollection(path).fonts:
            if f['name'].getDebugName(4) == face:
                return f
        return None
    return TTFont(path)


def css_range(fam):
    """unicode-range for the CSS: the blocks joined where they touch."""
    spans = sorted((a, b) for a, b, _ in RANGES + fam['extra'])
    out = []
    for a, b in spans:
        if out and a <= out[-1][1] + 1:
            out[-1][1] = max(out[-1][1], b)
        else:
            out.append([a, b])
    return ', '.join('U+%04X' % a if a == b else 'U+%04X-%04X' % (a, b) for a, b in out)


def report_css(fam, src, dst):
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    web = instancer.instantiateVariableFont(TTFont(src), dict({'wght': 400}, **fam['pin']), inplace=False)
    upm, hhea = web['head'].unitsPerEm, web['hhea']
    asc, desc, gap = hhea.ascent / upm, -hhea.descent / upm, hhea.lineGap / upm
    ww = sample_width(web)
    rng = css_range(fam)
    lines = ['@font-face {', '  font-family: "%s";' % fam['name'],
             '  src: url("/assets/fonts/%s.woff2") format("woff2");' % fam['stem'],
             '  font-weight: %d %d;' % fam['wght'], '  font-style: normal;', '  font-display: swap;',
             '  unicode-range: %s;' % rng, '}']
    for label, path, face in fam['fallbacks']:
        local = open_local(path, face)
        if local is None:
            lines.append('/* %s not found on this machine: fallback metrics not computed */' % label)
            continue
        sa = ww / sample_width(local)
        lines += ['@font-face {', '  font-family: "%s Fallback%s";' % (fam['name'], '' if label == fam['fallbacks'][0][0] else ' ' + label),
                  '  src: local("%s");' % label,
                  '  size-adjust: %.2f%%;' % (sa * 100), '  ascent-override: %.2f%%;' % (asc / sa * 100),
                  '  descent-override: %.2f%%;' % (desc / sa * 100), '  line-gap-override: %.2f%%;' % (gap / sa * 100),
                  '  font-weight: %d %d;' % fam['wght'], '  font-style: normal;', '  unicode-range: %s;' % rng, '}']
    return '\n'.join(lines)


def main():
    argv = sys.argv[1:]
    force, keep_hinting, keep_opsz = '--force' in argv, '--keep-hinting' in argv, '--keep-opsz' in argv
    out = OUT
    if '--out' in argv:
        out = os.path.abspath(argv[argv.index('--out') + 1])
    need('fontTools'); need('brotli')
    chars, npages, where = site_chars()
    print('site characters: %d distinct, from %d pages (%s), assets/js and CSS content strings' % (len(chars), npages, where))
    ok, css = True, []
    for fam in FAMILIES:
        print(fam['name'])
        src, ofl = download(fam, force)
        dst = os.path.join(out, fam['stem'] + '.woff2')
        build(fam, src, dst, keep_hinting, keep_opsz)
        shutil.copyfile(ofl, os.path.join(out, fam['stem'] + '-OFL.txt'))
        print('  %s: %d bytes (source TTF %d bytes)' % (os.path.relpath(dst, ROOT), os.path.getsize(dst), os.path.getsize(src)))
        ok = verify(fam, src, dst, chars) and ok
        css.append(report_css(fam, src, dst))
    print('\n/* @font-face rules for base.css, computed by tools/fonts.py */')
    print('\n'.join(css))
    if not ok:
        sys.exit(1)


if __name__ == '__main__':
    main()
