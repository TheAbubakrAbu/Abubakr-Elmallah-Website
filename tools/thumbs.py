#!/usr/bin/env python3
"""Thumbnails for the "At a glance" index.

    python3 tools/thumbs.py            # make any that are missing or stale
    python3 tools/thumbs.py --force    # redo everything

Every row of the At a glance index (cards.js, glance()) shows its card's
picture at 30 px. It used to load the card's own file for that: a 512 px app
icon, or a high-school screenshot up to 1400 px wide. On /projects/ the index
is open under the hero, so a desktop visit fetched all 23 of those at once
(961 KB of images, 415 KB of it one PNG), and on a phone the first tap on the
folded index did the same (712 KB). The index now reads these instead.

THE RECIPE. A 96 px square (30 px at up to 3x), cropped from the center the
same way the index's object-fit: cover crops it, WebP quality 80 (it keeps
the alpha of the few transparent PNGs). About 2 KB each.

Which pictures: every `icon:` and `img:` in assets/js/apps-data.js, so a new
card's thumbnail is one run of this away. Until then cards.js falls back to
the full picture, so a missing thumbnail is slower, never broken.

Output mirrors the source path under assets/img/thumbs/, extension .webp:
    assets/img/apps/zotfinder.jpg  ->  assets/img/thumbs/apps/zotfinder.webp
Images carry no cache-busting ?v=, so a picture whose CONTENT changes gets a
new name, and its thumbnail follows the new name.

THE PORTAL ICONS (/worlds/). The fanned app icons on the two portals are
drawn at 88-101 px (up to about 180 device px on a phone) and used to be the
512 px originals: 155 KB of the page's first load, competing with its CSS.
They read 192 px WebPs from assets/img/thumbs/192/, same recipe, found by
looking for `thumbs/192/<path>.webp` in src/worlds.html and matched back to
the source file of the same path in assets/img/ (any extension).
"""
import os, re, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'assets', 'img')
OUT = os.path.join(IMG, 'thumbs')
DATA = os.path.join(ROOT, 'assets', 'js', 'apps-data.js')
SIZE, QUALITY = 96, 80
PORTALS = os.path.join(ROOT, 'src', 'worlds.html')
BIG = 192


def sources():
    text = open(DATA, encoding='utf-8').read()
    return sorted(set(re.findall(r"\b(?:icon|img):\s*'([^']+)'", text)))


def portal_icons():
    """(source path, output path) for every thumbs/192/ picture worlds.html asks for"""
    if not os.path.exists(PORTALS):
        return []
    text = open(PORTALS, encoding='utf-8').read()
    out = []
    for rel in sorted(set(re.findall(r"thumbs/192/([^\"']+)\.webp", text))):
        stem = os.path.join(IMG, rel)
        found = [stem + ext for ext in ('.jpg', '.jpeg', '.png', '.webp') if os.path.exists(stem + ext)]
        out.append((found[0] if found else None, os.path.join(OUT, '192', rel + '.webp'), rel))
    return out


def make(src, dst, size, force):
    if not force and os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return False
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('P', 'RGBA', 'LA') or 'transparency' in im.info else 'RGB')
    ImageOps.fit(im, (size, size), Image.LANCZOS).save(dst, 'WEBP', quality=QUALITY, method=6)
    return True


def main():
    force = '--force' in sys.argv
    made = kept = missing = 0
    for rel in sources():
        src = os.path.join(IMG, rel)
        if not os.path.exists(src):
            print('  missing source:', rel)
            missing += 1
            continue
        dst = os.path.join(OUT, os.path.splitext(rel)[0] + '.webp')
        if make(src, dst, SIZE, force):
            made += 1
        else:
            kept += 1
    for src, dst, rel in portal_icons():
        if not src:
            print('  missing source:', rel)
            missing += 1
        elif make(src, dst, BIG, force):
            made += 1
        else:
            kept += 1
    print(f'thumbs: {made} made, {kept} up to date, {missing} missing sources')


if __name__ == '__main__':
    main()
