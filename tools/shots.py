#!/usr/bin/env python3
"""Encode the game screenshots the worlds pages show, from their originals.

    python3 tools/shots.py              # encode what is missing or stale
    python3 tools/shots.py --force      # redo everything (a new size or quality)
    python3 tools/shots.py --prune      # also delete site files with no original
    python3 tools/shots.py lego/pirates # only that subtree

THE MIRROR. `_originals/franchises/<franchise>/<thing>/<name>.<ext>` is the
capture as it came off the machine, gitignored like the photographs, and
`assets/img/franchises/<franchise>/<thing>/<name>.jpg` is what the site
serves, one for one, same path, same stem. A picture is added by dropping
its original into the mirror and running this; a picture with no original
is an orphan and `--prune` says so. Every original here is also in the
Video Game Screenshots library on iCloud, under its own name; the README in
_originals records which file each one was.

THE ARCHIVE. `_originals/archive/<page>/<name>` -> `assets/img/archive/...`
is the same mirror for pictures that are not game screenshots: posters,
Discord cards, profile pages, calligraphy, banners. Same size, q72, and a PNG
whose transparency is actually used (a roundel, a circle crop) comes out as
WebP with its alpha instead of a JPEG on a black square. It is a separate
folder because /gaming/ lists everything under franchises/.

THE RECIPE. 1200 px on the long edge, JPEG quality 50, 4:2:0, progressive,
then jpegtran to squeeze the entropy coding losslessly. It was q62 until
2026-08-30; these are screenshots rather than photographs, mostly HUD and
flat color, and at 1200 px q50 reads the same on the page while the
Minecraft frames, the densest thing in the set, come in about a sixth
smaller. Compare tools/photos.py, which keeps the photographs at q62/AVIF
and two sizes: the galleries carry the pixels there, the shots only have
to be legible.

A JPEG original that is already no wider than the site size (a shelf
screenshot saved small, a composite made by hand) is passed through
jpegtran only: re-encoding a lossy file at a lower quality would cost
detail and save little, so those keep their bytes as they are.

Images carry no cache-busting `?v=`, so a picture whose CONTENT changes
must get a new name; re-encoding the same picture under the same name is
fine, a stale cache just shows the older copy of the same thing.
"""
import os, subprocess, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_EDGE = 1200
# (mirror, JPEG quality). The archive holds what is not a game screenshot:
# posters, Discord cards, profile pages, calligraphy, banners. It is encoded
# the same way but a little kinder (q72), because posters and lettering carry
# detail a HUD does not, and it lives outside franchises/ so /gaming/, which
# lists every file under franchises/, never shows a poster as a game.
MIRRORS = (('franchises', 50), ('archive', 72))
EXTS = ('.jpg', '.jpeg', '.png')


def run(cmd):
    return subprocess.run(cmd, capture_output=True)


def jpegtran(dest):
    tmp = dest + '.jt'
    r = run(['jpegtran', '-copy', 'none', '-optimize', '-progressive', '-outfile', tmp, dest])
    if r.returncode == 0 and os.path.getsize(tmp) < os.path.getsize(dest):
        os.replace(tmp, dest)
    elif os.path.exists(tmp):
        os.remove(tmp)


def has_alpha(im):
    if im.mode not in ('RGBA', 'LA', 'P'):
        return False
    return im.convert('RGBA').getchannel('A').getextrema()[0] < 255


def encode(src, dest, Q):
    im = ImageOps.exif_transpose(Image.open(src))
    if dest.endswith('.webp'):
        # a cut-out (a roundel, a circle crop): the transparency is the point,
        # and WebP keeps it at a fraction of what the PNG weighs
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        im = im.convert('RGBA')
        if max(im.size) > MAX_EDGE:
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im.save(dest, 'WEBP', quality=Q, method=6)
        return 'webp'
    small_jpeg = im.format == 'JPEG' and max(im.size) <= MAX_EDGE
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if small_jpeg:
        # already site-sized and already lossy: lossless pass only
        with open(src, 'rb') as a, open(dest, 'wb') as b:
            b.write(a.read())
        jpegtran(dest)
        return 'pass'
    im = im.convert('RGB')
    if max(im.size) > MAX_EDGE:
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    im.save(dest, 'JPEG', quality=Q, optimize=True, progressive=True, subsampling='4:2:0')
    jpegtran(dest)
    return 'q%d' % Q


def main(argv):
    force = '--force' in argv
    prune = '--prune' in argv
    only = [a for a in argv if not a.startswith('--')]
    done = skipped = 0
    before = after = 0
    for name, q in MIRRORS:
        SRC = os.path.join(ROOT, '_originals', name)
        OUT = os.path.join(ROOT, 'assets', 'img', name)
        seen = set()
        for dirpath, _, files in os.walk(SRC):
            for fname in sorted(files):
                if not fname.lower().endswith(EXTS):
                    continue
                src = os.path.join(dirpath, fname)
                rel = os.path.relpath(src, SRC)
                if only and not any((name + '/' + rel).startswith(o.rstrip('/') + '/') or rel.startswith(o.rstrip('/') + '/') or rel == o for o in only):
                    continue
                stem = os.path.splitext(rel)[0]
                ext = '.jpg'
                if name != 'franchises' and fname.lower().endswith('.png') and has_alpha(Image.open(src)):
                    ext = '.webp'
                dest = os.path.join(OUT, stem + ext)
                seen.add(os.path.normpath(dest))
                if not force and os.path.exists(dest) and os.path.getmtime(dest) >= os.path.getmtime(src):
                    skipped += 1
                    continue
                was = os.path.getsize(dest) if os.path.exists(dest) else 0
                how = encode(src, dest, q)
                now = os.path.getsize(dest)
                before += was; after += now; done += 1
                print('%-5s %7d -> %6d  %s/%s' % (how, was, now, name, stem + ext))
        if prune and not only:
            for dirpath, _, files in os.walk(OUT):
                for fname in files:
                    p = os.path.normpath(os.path.join(dirpath, fname))
                    if p not in seen and fname.lower().endswith(EXTS + ('.webp',)):
                        print('prune  %s/%s' % (name, os.path.relpath(p, OUT)))
                        os.remove(p)
    print('encoded %d, up to date %d%s' % (done, skipped,
          (', %d KB -> %d KB' % (before // 1024, after // 1024)) if before else ''))


if __name__ == '__main__':
    main(sys.argv[1:])
