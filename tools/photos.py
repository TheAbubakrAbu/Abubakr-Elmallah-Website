#!/usr/bin/env python3
"""photos.py: the image pipeline for the site. Two commands:

    python3 tools/photos.py ingest
        _originals/<year>/*  ->  assets/img/years/<year>/*.jpg
        and rewrites assets/js/years-data.js. Originals are never touched.

    python3 tools/photos.py sweep
        recompresses every other image under assets/img/ in place, and demotes
        a PNG to JPEG when it carries no real transparency AND the JPEG comes
        out smaller. That second half matters: flat poster art (the club
        flyers) is 2-3x smaller as PNG, so converting it would make the site
        bigger, which is the opposite of the point.

Both share one encoder: resize to a max long edge, strip metadata, encode
progressive JPEG (lossy), then run jpegtran over the result (lossless). PNGs
that stay PNG go through pngquant (lossy) then oxipng (lossless).

Needs: Pillow, and jpegtran / pngquant / oxipng on PATH.

Originals are named for their own EXIF capture time by the folder convention
(see _originals/README.md), so the date comes off the filename here and the run
is idempotent: re-ingesting produces byte-identical names every time.
"""

import json
import os
import re
import shutil
import subprocess
import sys
from PIL import Image, ImageOps

MAX_EDGE = 1200          # long edge for photographs; was 1400, dropped when
                         # storage got tight. The deck shows photos at most
                         # ~1200px tall on any screen the site actually meets.
JPEG_Q = 70              # was 80, then 75; each step bought ~15% and the
                         # originals in _originals/ mean any of it can be
                         # regenerated at higher quality later
PNG_COLORS = 256

SRC = '_originals'
OUT = 'assets/img/years'
DATA = 'assets/js/years-data.js'

# editorial, so it lives here rather than being guessed from the folder name.
# `cover` is the photo the year's card shows while the gallery is collapsed.
YEARS = [
    # two era cards, each one gallery divided into year chapters (see
    # CHAPTERS): everything before middle school, then 7th and 8th together
    ('pre-ms',       'Pre-Middle School', '2006–18', 'ms', '2018-08-21-1659.jpg'),
    ('ms-middle',    'Middle School', '2018–20', 'ms', '2019-12-30-1200.jpg'),
    # not a school year: every school ID card, gathered in one card that sits
    # at the end of the middle-school row, to the right of 8th grade. The same
    # card photos also live in their own years (as `id-…`, pinned first); the
    # numeral after `id-` here fixes the order: group shot, then 9th → 12th.
    # The college ID is not here; it lives in First Year, on /college/.
    ('id-pics',      'ID Pics',     '2018–24', 'ms',  'id-0-2026-08-16-1528.jpg'),
    ('hs-freshman',  'Freshman',    '2020–21', 'hs',  '2021-07-20-0812.jpg'),
    ('hs-sophomore', 'Sophomore',   '2021–22', 'hs',  '2022-05-17-1200.jpg'),
    ('hs-junior',    'Junior',      '2022–23', 'hs',  '2022-10-21-1416.jpg'),
    ('hs-senior',    'Senior',      '2023–24', 'hs',  '2024-05-30-2200.jpg'),
    ('uci-first',    'First Year',  '2024–25', 'uci', '2025-06-13-1549.jpg'),
    ('uci-second',   'Second Year', '2025–26', 'uci', '2026-01-17-1622.jpg'),
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

# icons are referenced by the PWA manifest and must stay PNG whatever the maths
KEEP_PNG = {'assets/img/icons', 'assets/img/me/abubakr-circle.png'}


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


def ingest():
    manifest = {}
    for gid, label, span, school, cover in YEARS:
        d = os.path.join(SRC, gid)
        if not os.path.isdir(d):
            print('missing %s, skipped' % d)
            manifest[gid] = []
            continue
        os.makedirs(os.path.join(OUT, gid), exist_ok=True)

        # id photos first (the year's ID card leads the gallery regardless of
        # its date), then chronological, then undated at the end
        stems = sorted(
            (os.path.splitext(f)[0] for f in os.listdir(d)
             if not f.startswith('.') and f.lower().endswith(('.jpg', '.jpeg', '.png', '.heic'))),
            key=lambda s: (not s.startswith('id'), s.startswith('undated'), s))

        # anything in the output that is no longer in _originals is stale
        keep = {s + '.jpg' for s in stems}
        for f in os.listdir(os.path.join(OUT, gid)):
            if f not in keep:
                os.remove(os.path.join(OUT, gid, f))
                print('  removed stale %s/%s' % (gid, f))

        rows = []
        for stem in stems:
            src = next(os.path.join(d, f) for f in os.listdir(d)
                       if os.path.splitext(f)[0] == stem)
            dest = os.path.join(OUT, gid, stem + '.jpg')
            im = ImageOps.exif_transpose(Image.open(src))
            size = encode_jpeg(im, dest)
            w, h = Image.open(dest).size
            rows.append({'file': stem + '.jpg', 'date': date_from(stem), 'w': w, 'h': h})
            print('  %-14s %-24s %5dx%-5d %6.1fKB' % (gid, stem + '.jpg', w, h, size / 1024))

        assert cover in keep, 'cover %s missing from %s' % (cover, gid)
        manifest[gid] = rows

    write_data(manifest)
    print('\ningested %d photos' % sum(len(v) for v in manifest.values()))


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

   Paths are relative to /assets/img/years/<group>/. */
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
            L.append("      ['%s', %s, %d, %d]," % (r['file'], d, r['w'], r['h']))
        L.append('    ],')
    L.append('  },')
    # chapter start indices, computed here so they can never drift from the
    # photo order: [firstIndex, label, span] per chapter that caught a photo
    L.append('  chapters: {')
    for gid, chapters in CHAPTERS.items():
        rows = manifest.get(gid, [])
        out = []
        for ci, (label, span, start) in enumerate(chapters):
            end = chapters[ci + 1][2] if ci + 1 < len(chapters) else '9999'
            idx = [i for i, r in enumerate(rows)
                   if r['date'] and start <= r['date'][:7] < end]
            if idx:
                out.append((min(idx), label, span))
        L.append("    '%s': [" % gid)
        for i, label, span in sorted(out):
            L.append("      [%d, '%s', '%s']," % (i, label, span))
        L.append('    ],')
    L.append('  },')
    L.append('};')
    with open(DATA, 'w') as fh:
        fh.write('\n'.join(L) + '\n')
    print('wrote %s' % DATA)


def sweep():
    renames, before, after = {}, 0, 0
    for root, dirs, files in os.walk('assets/img'):
        if root.startswith(OUT):
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
    cmds = {'ingest': ingest, 'sweep': sweep}
    if len(sys.argv) != 2 or sys.argv[1] not in cmds:
        sys.exit(__doc__)
    cmds[sys.argv[1]]()
