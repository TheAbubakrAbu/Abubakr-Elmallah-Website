#!/usr/bin/env python3
"""photos.py: the image pipeline for the site. Three commands:

    python3 tools/photos.py ingest [--force]
        _originals/<year>/*  ->  assets/img/years/<year>/*.avif        (grid, 1000px)
                             ->  assets/img/years-large/<year>/*.avif  (deck, 2000px)
        and rewrites assets/js/years-data.js. Originals are never touched.
        A photo whose AVIF is already newer than its original is not encoded
        again, only re-read for its size, so a run that adds three photos or
        only changes the data takes seconds and leaves the other 1,600 files
        byte-for-byte alone (git sees no change). --force encodes everything,
        which is what a new MAX_EDGE or AVIF_Q needs.

    python3 tools/photos.py places
        looks up where each original was taken, once per spot, and keeps the
        answers in _originals/places.json. ingest reads that file to put a
        place name under each photo in the full-screen deck; see PLACES below
        for what does and does not leave this folder.

    python3 tools/photos.py sweep
        recompresses every other image under assets/img/ in place, and demotes
        a PNG to JPEG when it carries no real transparency AND the JPEG comes
        out smaller. That second half matters: flat poster art (the club
        flyers) is 2-3x smaller as PNG, so converting it would make the site
        bigger, which is the opposite of the point.

ingest encodes AVIF (resize to a max long edge, strip metadata, encode at
AVIF_Q). Measured on this library that is ~35% smaller per photo than the
progressive JPEG q62 it replaced, and it looks better, not worse: AVIF holds
denim weave and night-shot texture at sizes where JPEG has visibly blocked.
Every browser since Safari 16.4 (March 2023) decodes it.

sweep keeps the old JPEG/PNG encoders on purpose: that art is referenced by
filename from HTML, CSS and apps-data.js all over the site, so its extensions
must not churn. JPEGs there also get jpegtran (lossless) after the encode;
PNGs that stay PNG go through pngquant (lossy) then oxipng (lossless).

Needs: Pillow 11+ (bundles the AVIF encoder); jpegtran / pngquant / oxipng on
PATH for sweep.

Originals are named for their own EXIF capture time by the folder convention
(see _originals/README.md), so the date comes off the filename here and the run
is idempotent: re-ingesting produces byte-identical names every time.
"""

import json
import math
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from PIL import Image, ImageOps

MAX_EDGE = 1000          # long edge for the GRID frame; 1400 -> 1200 -> 1000.
                         # The last step came with First Year: 350 more photos
                         # would have taken assets/img from 79MB to 116MB, and
                         # at 1000px it is 66MB instead -- smaller than before,
                         # with half again as many photographs in it.
AVIF_Q = 50              # for the grid frame. Chosen against the JPEG q62 it
                         # replaced by comparing 100% crops: q50 matches or
                         # beats it everywhere at ~64% of the bytes; q45 buys
                         # another 10 points but starts smoothing low-light
                         # grain.

# ── the second encode, for the full-screen deck ──
# The grid never shows a frame wider than about 330 CSS px, so the 1000px file
# is more than it needs, and its bandwidth and memory while scrolling (lazy.js
# budgets on a 1000px frame) stay exactly as they were. The deck is another
# matter: it shows a photo up to 1100 CSS px wide or a screen tall, which on a
# Retina or phone screen is 2,200 to 3,300 device pixels, and a 1000px file
# stretched to that looked as soft as it sounds. So every photo is encoded
# twice, same name under LARGE_OUT, and years.js and travels.js swap this copy
# in only when a photo is opened. Measured on the whole set: 2000px q65 is
# 216KB a photo, 340MB for the 1,609, on top of the 68MB grid set; past about
# 2400px nothing more is visible in the deck without zooming. Every re-encode
# adds a full copy of the set to git history, so change these rarely; the
# originals in _originals/ mean any size can be regenerated: ingest --force.
LARGE_OUT = 'assets/img/years-large'
LARGE_EDGE = 2000
LARGE_Q = 65
EXT = '.avif'            # what ingest writes; years-data.js carries the names
JPEG_Q = 62              # sweep only, now: was 80, then 75, then 70; each step
                         # bought ~15-20%
PNG_COLORS = 256

# sweep: PNGs that stay PNG no matter what the size test says. The PWA icons
# are pointed at by name from manifest.webmanifest and the <link> tags, and
# iOS is picky about touch-icon formats, so they are not sweep's to demote.
KEEP_PNG = ['assets/img/icons']

SRC = '_originals'
OUT = 'assets/img/years'
DATA = 'assets/js/years-data.js'
IMG_EXT = ('.jpg', '.jpeg', '.png', '.heic')

# ── where each photo was taken ──
# The originals carry the camera's GPS fix. The encoded AVIF carries nothing
# (Pillow writes no metadata), so what the site knows about a place is only
# what ingest puts in years-data.js: a town-level name, "Irvine, California",
# under the date in the full-screen deck. Never a coordinate.
#
# The names come from OpenStreetMap's Nominatim, one lookup per distinct spot,
# and are cached in PLACES so a re-ingest asks for nothing. That file sits in
# _originals/ on purpose: it is gitignored with the rest of the folder, and it
# holds the coordinates and the `hide` list, which names the places that are
# never to be shown. The list is where home is, so it is not in this file and
# not in the repository: the code only knows that a photo whose address
# mentions anything on the list gets no place at all. With no list, ingest
# writes no places, rather than risk the wrong default.
PLACES = os.path.join(SRC, 'places.json')
GEO_ROUND = 3            # decimals kept before the lookup: 0.001 deg is about
                         # 100 m, so frames shot in one spot share one lookup
                         # and 1,300 located photos need a few hundred
NOMINATIM = 'https://nominatim.openstreetmap.org/reverse'
GEO_UA = 'abubakrelmallah.com photo ingest (tools/photos.py)'
GEO_PAUSE = 1.1          # Nominatim's usage policy: at most one request a second

# editorial, so it lives here rather than being guessed from the folder name.
# `cover` is the photo the year's card shows while the gallery is collapsed.
YEARS = [
    # two era cards, each one gallery divided into year chapters (see
    # CHAPTERS): everything before middle school, then 7th and 8th together
    ('pre-ms',       'Pre-Middle School', '2006–18', 'ms', '2018-08-21-1659.avif'),
    ('ms-middle',    'Middle School', '2018–20', 'ms', '2019-12-30-1200.avif'),
    # not a school year: every school ID card, gathered in one card that sits
    # at the end of the middle-school row, to the right of 8th grade. The same
    # card photos also live in their own years (as `id-…`, pinned first); the
    # numeral after `id-` here fixes the order: group shot, then 9th → 12th.
    # The college ID is not here; it lives in First Year, on /college/.
    ('id-pics',      'ID Pics',     '2018–24', 'ms',  'id-0-2026-08-16-1528.avif'),
    ('hs-freshman',  'Freshman',    '2020–21', 'hs',  '2021-07-20-0812.avif'),
    ('hs-sophomore', 'Sophomore',   '2021–22', 'hs',  '2022-05-17-1200.avif'),
    ('hs-junior',    'Junior',      '2022–23', 'hs',  '2022-10-21-1416.avif'),
    ('hs-senior',    'Senior',      '2023–24', 'hs',  '2024-05-30-2200.avif'),
    ('uci-first',    'First Year',  '2024–25', 'uci', '2025-06-13-1549.avif'),
    ('uci-second',   'Second Year', '2025–26', 'uci', '2026-01-17-1622.avif'),
]

# chapters: named divisions INSIDE one gallery, keyed by group id. Each entry
# is (label, span, first month 'YYYY-MM'); a chapter runs until the next one
# begins, and a chapter that catches no photos is dropped. years.js renders
# these as small headings between the justified rows.
CHAPTERS = {
    'pre-ms': [
        ('Baby',       '2006',    '0000-00'),
        ('Egypt',      '2007',    '2006-12'),
        ('Preschool',  '2010',    '2008-01'),
        ('3rd Grade',  '2014–15', '2014-09'),
        ('4th Grade',  '2015–16', '2015-08'),
        ('5th Grade',  '2016–17', '2016-09'),
        ('6th Grade',  '2017–18', '2017-09'),
        ('The Autopia Licences', 'shot in 2025', '2020-01'),
    ],
    'ms-middle': [
        ('7th Grade', '2018–19', '0000-00'),
        ('8th Grade', '2019–20', '2019-09'),
    ],
}

# ── photographs that belong to two galleries ──
# The four school ID cards each appear in their own year AND in the "ID Pics"
# card. That is deliberate, but it used to mean two identical JPEGs on disk and
# two identical downloads: 241 KB of the shipped site, and four extra files for
# the service worker to carry, to show the same four photographs twice.
#
# So each is encoded exactly once, in the year it belongs to, and the ID Pics
# entry points at that same file. A `file` containing a slash is a path relative
# to /assets/img/years/ rather than a name inside the group's own folder --
# years.js reads it that way (see url() there).
#
# Keyed by the group doing the borrowing: stem -> '<group>/<stem>' it borrows.
ALIASES = {
    'id-pics': {
        'id-1-2020-08-11-1200': 'hs-freshman/id-2020-08-11-1200',
        'id-2-2021-08-05-1048': 'hs-sophomore/id-2021-08-05-1048',
        'id-3-2022-08-17-1727': 'hs-junior/id-2022-08-17-1727',
        'id-4-2023-08-03-0830': 'hs-senior/id-2023-08-03-0830',
    },
}

# ── a heading per month, for the years big enough to need one ──
# pre-ms and ms-middle are divided by grade instead (see CHAPTERS above): those
# two span a decade each, so a month heading would be meaningless there.
BY_MONTH = ['hs-freshman', 'hs-sophomore', 'hs-junior', 'hs-senior',
            'uci-first', 'uci-second']

TRAVELS = 'assets/js/travels-data.js'

# ── where one academic year stops and the next starts ──
# For COLLEGE the seam is 1 September: a photograph from 3 Sep belongs to the
# year beginning that month, one from 30 Aug to the year ending. The seams used
# to be wherever the photographs happened to fall -- senior year ran to 22 Sep
# 2024 and First Year picked up on the 24th -- which put the same fortnight in
# two different years depending on which side of a gap it landed.
#
# High school is NOT on this rule and must not be put on it. Trabuco starts in
# the middle of August, so its years genuinely begin in August: the first-day
# photographs sit in 2020-08, 2021-08, 2023-08 and belong exactly where they
# are. Only hs-senior gets a bound, and only an upper one, because September
# 2024 is college whatever else is true.
#
# Checked, not enforced: moving a file is a decision, so ingest reports strays
# and leaves them alone. ID cards are exempt -- issued in August, before their
# year begins, and the `id-` prefix already pins them to the front of the year
# they belong to whatever their date says.
ACADEMIC = {
    'hs-senior':  (None,      '2024-08'),   # nothing from Sept 2024 on: that is college
    'uci-first':  ('2024-09', '2025-08'),
    'uci-second': ('2025-09', '2026-08'),
}


MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
               'August', 'September', 'October', 'November', 'December']


def trips_by_month():
    """('uci-first', '2024-12') -> 'Tunisia', read from travels-data.js so the
    two can never disagree about where a month was spent.

    Keyed by GROUP as well as month, off the trip's own shot paths, rather than
    by the trip's month alone. A trip lands in whichever year contains its
    photographs, and the two do not always agree: Maui is September 2025, but it
    falls after the First/Second Year boundary, so it belongs to Second Year's
    September and not First Year's. Going by month alone labelled both.

    A trip with no photographs annotates nothing, which is right -- there is no
    month heading to hang it on.

    `places` is kept as the raw source text, escapes and all, because it is
    going straight back out into another JS file."""
    try:
        src = open(TRAVELS, encoding='utf-8').read()
    except OSError:
        return {}
    out = {}
    # the last trip in the array is followed by the array close, which may or
    # may not carry a comma -- so do not require one, or the final trip is
    # silently skipped and its month loses its heading
    for blk in re.findall(r"\{ when:.*?(?=\n    \{ when:|\n  \])", src, re.S):
        pl = re.search(r"places: '((?:[^'\\]|\\.)*)'", blk)
        sh = re.search(r"shots: \[(.*?)\]", blk, re.S)
        if not (pl and sh):
            continue
        for path in re.findall(r"'([^']+)'", sh.group(1)):
            grp, _, name = path.partition('/')
            d = re.search(r"(\d{4})-(\d{2})-\d{2}", name)
            if not d:
                continue
            key = (grp, '%s-%s' % d.groups())
            if key not in out:
                out[key] = pl.group(1)
            elif pl.group(1) not in out[key]:
                out[key] += ' \\u00b7 ' + pl.group(1)
    return out


def month_chapters(gid, rows, trips):
    """One chapter per month the year actually contains, in row order.

    Walks the rows rather than searching per month, because the ID photo is
    pinned to the front of its year whatever its date: a month is a new chapter
    when it differs from the row before it, which stays correct however the rows
    are ordered. Photos with no date at all collect under a final heading.

    A month with a trip in it is headed by the trip and dated in the gold text
    -- "Tunisia Travel / December 2024" -- rather than the other way round. It
    reads better on a trip that runs over the turn of a month: Tunisia is one
    holiday, and December and January headed only by their month names made it
    look like two. An ordinary month is just its own name."""
    out, seen = [], None
    for i, r in enumerate(rows):
        key = r['date'][:7] if r['date'] else None
        if key == seen:
            continue
        seen = key
        if key is None:
            out.append((i, 'Undated', 'not yet placed'))
            continue
        y, mo = key.split('-')
        when = '%s %s' % (MONTH_NAMES[int(mo) - 1], y)
        trip = trips.get((gid, key), '')
        if trip:
            out.append((i, trip + ' Travel', when))
        else:
            out.append((i, when, ''))
    return out


def run(cmd):
    return subprocess.run(cmd, capture_output=True)


def has_alpha(im):
    """True only if the alpha channel is actually used for something."""
    if im.mode not in ('RGBA', 'LA', 'PA') and 'transparency' not in im.info:
        return False
    return im.convert('RGBA').getchannel('A').getextrema()[0] < 250


def encode_jpeg(im, dest, quality=JPEG_Q, max_edge=MAX_EDGE):
    im = im.convert('RGB')
    if max_edge and max(im.size) > max_edge:
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    im.save(dest, 'JPEG', quality=quality, optimize=True, progressive=True, subsampling='4:2:0')
    tmp = dest + '.jt'
    r = run(['jpegtran', '-copy', 'none', '-optimize', '-progressive', '-outfile', tmp, dest])
    if r.returncode == 0 and os.path.getsize(tmp) < os.path.getsize(dest):
        os.replace(tmp, dest)
    elif os.path.exists(tmp):
        os.remove(tmp)
    return os.path.getsize(dest)


def encode_avif(im, dest, quality=AVIF_Q, max_edge=MAX_EDGE):
    """The year-gallery encoder. Pillow's save strips metadata on its own
    (nothing is passed through), and there is no jpegtran equivalent worth
    running: the AVIF bitstream is already entropy-coded as tightly as the
    encoder can make it."""
    im = im.convert('RGB')
    if max_edge and max(im.size) > max_edge:
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    im.save(dest, 'AVIF', quality=quality, speed=6)
    return os.path.getsize(dest)


def encode_png(src, dest):
    if src != dest:
        shutil.copy2(src, dest)
    tmp = dest + '.pq'
    r = run(['pngquant', '--quality', '65-90', '--speed', '1', '--strip',
             '--force', '--output', tmp, str(PNG_COLORS), '--', dest])
    if r.returncode == 0 and os.path.exists(tmp) and os.path.getsize(tmp) < os.path.getsize(dest):
        os.replace(tmp, dest)
    elif os.path.exists(tmp):
        os.remove(tmp)
    run(['oxipng', '-o', '4', '--strip', 'safe', '-q', dest])
    return os.path.getsize(dest)


def date_from(stem):
    """'2024-05-30-1806' -> '2024-05-30 18:06'; 'undated-2' -> None.

    An `id` prefix marks a school-ID photo: it pins the file to the FRONT of
    its year (see the sort in ingest) while keeping its real capture date, so
    the ID card leads the gallery whatever its date says. `id` alone is an ID
    photo with no EXIF date; `id-3-<date>` carries an ordering digit for the
    id-pics group.

    The trailing `-2` is the collision suffix two frames get when they share a
    capture minute, so it has to survive the parse; dropping it here is what
    silently turned one photo undated the first time round."""
    m = re.match(r'^(?:id(?:-\d)?-)?(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})(?:-\d+)?$', stem)
    return '%s %s:%s' % m.groups() if m else None


def current(out, src):
    """True if `out` exists and is no older than the original it came from."""
    return os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src)


def gps_of(path):
    """(lat, lon) from the file's EXIF, rounded to GEO_ROUND decimals, or None
    for a photo with no fix. A rounded pair is all that is ever kept."""
    try:
        g = Image.open(path).getexif().get_ifd(0x8825)
    except Exception:
        return None
    if not g or g.get(2) is None or g.get(4) is None:
        return None

    def deg(v):
        d, m, sec = (float(x) for x in v)
        return d + m / 60 + sec / 3600
    try:
        lat, lon = deg(g[2]), deg(g[4])
    except (TypeError, ValueError, ZeroDivisionError):
        return None
    if not (math.isfinite(lat) and math.isfinite(lon)):
        return None
    if str(g.get(1, 'N')).upper().startswith('S'):
        lat = -lat
    if str(g.get(3, 'E')).upper().startswith('W'):
        lon = -lon
    if not (-90 <= lat <= 90 and -180 <= lon <= 180) or (lat == 0 and lon == 0):
        return None                      # a zeroed block is a camera with no fix
    return round(lat, GEO_ROUND), round(lon, GEO_ROUND)


def geo_key(ll):
    return '%.*f,%.*f' % (GEO_ROUND, ll[0], GEO_ROUND, ll[1])


def load_places():
    try:
        return json.load(open(PLACES, encoding='utf-8'))
    except OSError:
        return {'hide': [], 'at': {}}


def save_places(cache):
    with open(PLACES, 'w', encoding='utf-8') as fh:
        json.dump(cache, fh, indent=1, ensure_ascii=False, sort_keys=True)
        fh.write('\n')


def originals():
    """Every original in every year folder: (gid, stem, path)."""
    for gid, label, span, school, cover in YEARS:
        d = os.path.join(SRC, gid)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if not f.startswith('.') and f.lower().endswith(IMG_EXT):
                yield gid, os.path.splitext(f)[0], os.path.join(d, f)


def places():
    """Fill PLACES with an address for every distinct spot the originals were
    shot at. Only the spots not already in the file are looked up, so this is
    cheap to re-run after adding photos; the first run over the whole library
    takes about ten minutes at one request a second."""
    cache = load_places()
    at = cache.setdefault('at', {})
    cache.setdefault('hide', [])
    want, n = {}, 0
    for gid, stem, path in originals():
        ll = gps_of(path)
        if ll:
            n += 1
            want.setdefault(geo_key(ll), ll)
    todo = [k for k in want if k not in at]
    print('%d photos carry a location, %d distinct spots, %d not yet looked up'
          % (n, len(want), len(todo)))
    for i, k in enumerate(todo):
        lat, lon = want[k]
        q = urllib.parse.urlencode({'format': 'jsonv2', 'lat': lat, 'lon': lon,
                                    'zoom': 14, 'addressdetails': 1,
                                    'accept-language': 'en'})
        req = urllib.request.Request(NOMINATIM + '?' + q, headers={'User-Agent': GEO_UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                res = json.load(r)
        except Exception as e:
            print('  ! %s: %s' % (k, e))
            time.sleep(GEO_PAUSE * 4)
            continue
        if 'error' in res:               # open sea, mostly: no address to give
            at[k] = {'name': None, 'address': {}}
        else:
            at[k] = {'name': res.get('display_name'), 'address': res.get('address', {})}
        print('  %4d/%d  %s  %s' % (i + 1, len(todo), k, place_label(at[k], []) or '?'))
        if (i + 1) % 20 == 0:
            save_places(cache)
        time.sleep(GEO_PAUSE)
    save_places(cache)
    print('wrote %s (%d spots)' % (PLACES, len(at)))


# The address levels a place name is taken from, most local first. A named
# quarter comes before a bare county (Universal City rather than Los Angeles
# County), and the county, district and province levels are there for the
# countryside and for the villages whose OSM name has no English form: a
# Tunisian oasis that Nominatim can only name in Arabic falls through to its
# governorate, "Tozeur, Tunisia", which is what an English page can print.
GEO_LEVELS = ('city', 'town', 'village', 'municipality', 'hamlet',
              'suburb', 'quarter', 'county', 'state_district', 'province', 'state')


def readable(name):
    """A name this page can print: Latin letters, accents allowed, no numbers
    ("Ward 2", "Improvement District No. 9") and no councils ("Kenmare
    Municipal District", "Armagh City, Banbridge and Craigavon District
    Council"): those are admin units, not places."""
    return not re.search(r'[^\u0000-\u024f\u1e00-\u1eff\u2010-\u2019\s]|\d'
                         r'|\b(Council|Municipal District)\b', name)


def tidy(name):
    """Admin units named as such read badly under a photo: 'Governorate of
    Jidda' is Jidda, 'Jerash Sub-District' is Jerash, 'Cantón San Cristóbal'
    is San Cristóbal, 'City of Westminster' is Westminster."""
    return re.sub(r'^(Governorate of|Cantón|Parroquia|City of|Greater) '
                  r'|( Governorate| Sub-District)$', '', name)


def metro(a, name):
    """The city, where Nominatim names a district as if it were the town.
    Tokyo's wards come back as `city` with no prefecture at all (every other
    Japanese city has one); a Turkish `town` is a district of a province that
    is named after its city, so Beyoğlu is Istanbul and Serik is Antalya."""
    cc = a.get('country_code')
    if cc == 'jp' and not a.get('province') and 'Tokyo' in (name or ''):
        return 'Tokyo'
    if cc == 'tr' and a.get('province') and readable(a['province']):
        return a['province']
    return None


# where the second half of the label is the state or nation rather than the
# country: 'Irvine, California', 'Banbridge, Northern Ireland'
REGION_IS_STATE = ('us', 'gb')


def place_label(entry, hide):
    """'Irvine, California' / 'Seville, Spain' from a cached address, or None
    when the address mentions anything on the hide list or says nothing
    useful. Town then state for the US, town then country elsewhere. The
    hide check reads EVERY field of the address, down to the neighbourhood,
    so a photo from inside a hidden town is caught whichever level
    Nominatim happened to name it at."""
    a = entry.get('address') or {}
    name = entry.get('name') or ''
    haystack = ' | '.join(str(v) for v in a.values()) + ' | ' + name
    for h in hide:
        if h.lower() in haystack.lower():
            return None
    loc = metro(a, name) or next((tidy(a[k]) for k in GEO_LEVELS
                                  if a.get(k) and readable(a[k])), None)
    region = a.get('state') if a.get('country_code') in REGION_IS_STATE else a.get('country')
    if region and not readable(region):
        region = a.get('country')
    if not loc:
        return region or None
    if region and region != loc:
        return '%s, %s' % (loc, region)
    return loc


def ingest(force=False):
    manifest = {}
    dims = {}          # '<group>/<stem>' -> (w, h), filled as each file is encoded
    placed = {}        # '<group>/<stem>' -> place label or None, same keys
    kept = 0           # files left alone because their AVIF was already current
    unlooked = []      # located photos whose spot is not in PLACES yet

    cache = load_places()
    hide, at = cache.get('hide') or [], cache.get('at') or {}
    if not hide:
        print('! %s has no hide list, so no places will be written. See PLACES.' % PLACES)

    for gid, label, span, school, cover in YEARS:
        d = os.path.join(SRC, gid)
        if not os.path.isdir(d):
            print('missing %s, skipped' % d)
            manifest[gid] = []
            continue
        os.makedirs(os.path.join(OUT, gid), exist_ok=True)
        os.makedirs(os.path.join(LARGE_OUT, gid), exist_ok=True)
        alias = ALIASES.get(gid, {})

        # id photos first (the year's ID card leads the gallery regardless of
        # its date), then chronological, then undated at the end. Borrowed
        # photos have no original of their own, so their stems are added here.
        stems = sorted(
            set(os.path.splitext(f)[0] for f in os.listdir(d)
                if not f.startswith('.') and f.lower().endswith(IMG_EXT))
            | set(alias),
            key=lambda s: (not s.startswith('id'), s.startswith('undated'), s))

        # anything in the output that is no longer in _originals is stale --
        # and a borrowed photo must NOT have a file here, that is the point
        keep = {s + EXT for s in stems if s not in alias}
        for folder in (OUT, LARGE_OUT):
            for f in os.listdir(os.path.join(folder, gid)):
                if f not in keep:
                    os.remove(os.path.join(folder, gid, f))
                    print('  removed stale %s/%s/%s' % (folder, gid, f))

        rows = []
        for stem in stems:
            if stem in alias:
                rows.append({'file': None, 'alias': alias[stem], 'date': date_from(stem)})
                continue
            src = next(os.path.join(d, f) for f in os.listdir(d)
                       if os.path.splitext(f)[0] == stem)
            dest = os.path.join(OUT, gid, stem + EXT)
            big = os.path.join(LARGE_OUT, gid, stem + EXT)
            im, done = None, []
            for path, q, edge in ((dest, AVIF_Q, MAX_EDGE), (big, LARGE_Q, LARGE_EDGE)):
                if not force and current(path, src):
                    continue
                if im is None:
                    im = ImageOps.exif_transpose(Image.open(src))
                done.append(encode_avif(im, path, q, edge))
            fresh = im is None
            if fresh:
                kept += 1
            w, h = Image.open(dest).size

            # where it was taken: the original's GPS fix, through the cache
            # of names, through the hide list. Nothing else is kept.
            place = None
            if hide:
                ll = gps_of(src)
                if ll:
                    entry = at.get(geo_key(ll))
                    if entry is None:
                        unlooked.append('%s/%s' % (gid, stem))
                    else:
                        place = place_label(entry, hide)

            dims['%s/%s' % (gid, stem)] = (w, h)
            placed['%s/%s' % (gid, stem)] = place
            rows.append({'file': stem + EXT, 'date': date_from(stem), 'w': w, 'h': h,
                         'place': place})
            if not fresh:
                print('  %-14s %-24s %5dx%-5d %s  %s'
                      % (gid, stem + EXT, w, h,
                         ' + '.join('%6.1fKB' % (n / 1024) for n in done), place or ''))

        assert cover in keep or cover in {s + EXT for s in alias}, \
            'cover %s missing from %s' % (cover, gid)

        win = ACADEMIC.get(gid)
        if win:
            lo, hi = win
            for r in rows:
                if not r.get('date') or r['file'].startswith('id'):
                    continue
                m = r['date'][:7]
                if (lo and m < lo) or (hi and m > hi):
                    print('  ! %s/%s is %s, outside %s..%s'
                          % (gid, r['file'], m, lo or 'any', hi or 'any'))

        manifest[gid] = rows

    # second pass: a borrowed row takes the path and the dimensions of the file
    # it borrows, which by now has certainly been encoded whatever the year order
    borrowed = 0
    for gid, rows in manifest.items():
        for r in rows:
            if r['file'] is not None:
                continue
            target = r.pop('alias')
            assert target in dims, 'nothing to borrow at %s' % target
            r['file'] = target + EXT
            r['w'], r['h'] = dims[target]
            r['place'] = placed.get(target)
            borrowed += 1
            print('  %-14s borrows %s' % (gid, target + EXT))

    write_data(manifest)
    n = sum(len(v) for v in manifest.values())
    print('\ningested %d photos (%d encoded now, %d already current, %d shown twice from one file)'
          % (n, n - borrowed - kept, kept, borrowed))
    shown = sum(1 for rows in manifest.values() for r in rows if r.get('place'))
    print('%d carry a place name' % shown)
    if unlooked:
        print('! %d located photos have no name yet; run `python3 tools/photos.py places`'
              % len(unlooked))


def write_data(manifest):
    L = ["""/* years-data.js: every photo in the year galleries. GENERATED: run
   `python3 tools/photos.py ingest` rather than editing it by hand.

   The capture date comes out of each file's name, which the ingest step takes
   from its EXIF; w/h are the encoded dimensions, so years.js can justify the
   rows before a single image has loaded and the layout never jumps.

   Order inside a year is chronological, EXCEPT the school-ID photo (an `id-`
   file), which is pinned to the front of its year whatever its date; photos
   whose EXIF carried no date sit at the end under `date: null`. `cover` is
   the photo the year's card shows while the gallery is collapsed; the four
   high-school ones are the same frames the old year cards used.

   A row's fifth entry, where there is one, is the town the photo was taken
   in, read off the original's GPS and named through OpenStreetMap at ingest.
   Only the name is here, never a coordinate, and only for the photos whose
   place is meant to be shown: see PLACES in tools/photos.py.

   Paths are relative to /assets/img/years/<group>/, the 1000px grid frames.
   The full-screen deck loads the same path under /assets/img/years-large/,
   a 2000px encode of the same photo (LARGE_OUT in tools/photos.py). */
window.YEARS = {
  groups: ["""]
    for gid, label, span, school, cover in YEARS:
        L.append("    { id: '%s', label: '%s', span: '%s', school: '%s', cover: '%s' },"
                 % (gid, label, span, school, cover))
    L.append('  ],')
    L.append('  photos: {')
    for gid, label, span, school, cover in YEARS:
        L.append("    '%s': [" % gid)
        for r in manifest.get(gid, []):
            d = "'%s'" % r['date'] if r['date'] else 'null'
            where = ", '%s'" % js_str(r['place']) if r.get('place') else ''
            L.append("      ['%s', %s, %d, %d%s]," % (r['file'], d, r['w'], r['h'], where))
        L.append('    ],')
    L.append('  },')
    # chapter start indices, computed here so they can never drift from the
    # photo order: [firstIndex, label, span] per chapter that caught a photo
    L.append('  chapters: {')
    trips = trips_by_month()
    for gid, label, span, school, cover in YEARS:
        rows = manifest.get(gid, [])
        if gid in CHAPTERS:
            chapters, out = CHAPTERS[gid], []
            for ci, (clabel, cspan, start) in enumerate(chapters):
                end = chapters[ci + 1][2] if ci + 1 < len(chapters) else '9999'
                idx = [i for i, r in enumerate(rows)
                       if r['date'] and start <= r['date'][:7] < end]
                if idx:
                    out.append((min(idx), clabel, cspan))
            out.sort()
        elif gid in BY_MONTH:
            out = month_chapters(gid, rows, trips)
        else:
            continue
        L.append("    '%s': [" % gid)
        for i, clabel, cspan in out:
            L.append("      [%d, '%s', '%s']," % (i, clabel, cspan))
        L.append('    ],')
    L.append('  },')
    L.append('};')
    with open(DATA, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(L) + '\n')
    print('wrote %s' % DATA)


def js_str(s):
    """A place name inside a single-quoted JS literal: "Xi'an" must not end
    the string early."""
    return s.replace('\\', '\\\\').replace("'", "\\'")


def sweep():
    renames, before, after = {}, 0, 0
    for root, dirs, files in os.walk('assets/img'):
        if root.startswith((OUT, LARGE_OUT)):
            continue                                  # ingest owns those
        for f in sorted(files):
            if f.startswith('.') or f.endswith('.json'):
                continue
            src = os.path.join(root, f)
            before += os.path.getsize(src)
            im = ImageOps.exif_transpose(Image.open(src))

            if f.rsplit('.', 1)[-1].lower() in ('jpg', 'jpeg'):
                after += encode_jpeg(im, src)
                continue

            keep = any(src == k or src.startswith(k + '/') for k in KEEP_PNG)
            if keep or has_alpha(im):
                after += encode_png(src, src)
                continue

            cand = src.rsplit('.', 1)[0] + '.jpg'
            tmp = cand + '.try'
            encode_jpeg(im, tmp)
            png_size = encode_png(src, src)
            if os.path.getsize(tmp) < png_size:
                os.replace(tmp, cand)
                os.remove(src)
                renames[src] = cand
                after += os.path.getsize(cand)
            else:
                os.remove(tmp)
                after += png_size

    print('\nsweep: %.2fMB -> %.2fMB' % (before / 1048576, after / 1048576))
    for a, b in renames.items():
        print('  renamed %s -> %s  (update every reference by hand)' % (a, b))


if __name__ == '__main__':
    cmds = {'ingest': ingest, 'places': places, 'sweep': sweep}
    args = sys.argv[1:]
    force = '--force' in args
    args = [a for a in args if a != '--force']
    if len(args) != 1 or args[0] not in cmds or (force and args[0] != 'ingest'):
        sys.exit(__doc__)
    if force:
        ingest(force=True)
    else:
        cmds[args[0]]()
