#!/usr/bin/env python3
"""shapes.py: write assets/js/travels-shapes.js, one country outline per entry
in travels-data.js's `world`, for the silhouette beside each trip on /travels/.

    python3 tools/shapes.py

Source is Natural Earth (public domain), fetched over the network the way
photos.py fetches place names, and cached under _originals/ so a re-run asks
for nothing:

    _originals/naturalearth/ne_110m_admin_0_countries.geojson   (~0.8 MB)
    _originals/naturalearth/ne_50m_admin_0_countries.geojson    (~3.1 MB)

110m is the working set; it is what travels-map-data.js was sampled from and it
is plenty for a shape drawn 46 px wide. Three countries here are too small to
exist in it at all (Malta and Singapore are dropped entirely, and one of them
is a single dot at 50m too), so SMALL below names the ones taken from the 50m
set instead. Nothing is taken from 50m that 110m draws acceptably: the file is
four times the size and the extra vertices are invisible at this scale.

WHY THIS IS NOT THE DOT GRID. travels-map-data.js already encodes the world,
but at 1.5 degrees a cell: Malta is zero cells, Lebanon is one, and Ireland is
a blob. That resolution is right for a world map 960 px wide and useless for a
country drawn on its own. So this is a second, independent encoding of the same
planet, and the two are not interchangeable.

── the projection ──
Equirectangular (lon, -lat) is what the world map uses, and it is wrong here:
it stretches a country horizontally by 1/cos(latitude), so Ireland comes out
fat and Japan comes out squat. Each outline is instead scaled by the cosine of
its own centre latitude, which is a sinusoidal projection about that country's
own meridian. Over one country that is close enough to conformal that the shape
reads as itself, and it costs one multiply.

── the simplification ──
Douglas-Peucker per ring, then rings smaller than a fraction of the country's
own bounding box are dropped, so Italy keeps Sicily and Sardinia and loses two
hundred islets. Both tolerances are RELATIVE to the country's own size, which
is the only way one setting covers this range: Mexico is 30 degrees across and
Singapore is 0.4, and any fixed number of degrees that simplifies the first
deletes the second.

Two entries are not countries and are assembled rather than looked up:

  'The Balkans'   the union of the seven countries the trip actually crossed,
                  read out of that trip's own `within` list in travels-data.js
                  so the outline and the flags under it can never disagree.
  'United States' the lower 48 only. Alaska and Hawaii are real and are not
                  drawn: with them the bounding box spans 170 degrees, the
                  normalisation shrinks the mainland to a thumbnail in the
                  corner, and the one trip this shape appears against is Maui,
                  which is a pin on the world map above and does not need the
                  Aleutians to explain itself.
"""

import json
import math
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, '_originals', 'naturalearth')
TRAVELS = os.path.join(ROOT, 'assets', 'js', 'travels-data.js')
OUT = os.path.join(ROOT, 'assets', 'js', 'travels-shapes.js')

NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/'
UA = 'abubakrelmallah.com shape build (tools/shapes.py)'

BOX = 100.0        # the long edge every outline is normalised to
TOL = 0.004        # Douglas-Peucker tolerance, as a FRACTION of the country's
                   # own projected span rather than a fixed number of degrees.
                   # Fixed degrees does not survive the range here: 0.18 deg is
                   # a sensible simplification of Mexico and it erases
                   # Singapore, which is 0.4 deg wide end to end, into a
                   # two-vertex sliver. Relative, every country keeps roughly
                   # the same number of vertices whatever its size.
MIN_RING = 0.04    # drop a ring whose span is under this fraction of the whole

# travels-data.js's spelling -> Natural Earth's ADMIN, where they differ
ALIAS = {
    'Türkiye': 'Turkey',
    'United States': 'United States of America',
    'Serbia': 'Republic of Serbia',
    'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
}

# too small to appear in the 110m set; taken from 50m
SMALL = {'Malta', 'Singapore'}

# the lower 48: everything on the mainland, which at 110m means dropping the
# rings that sit outside this window
US48 = (-125.0, 24.0, -66.0, 50.0)


def fetch(name):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        print('fetching %s' % name)
        req = urllib.request.Request(NE + name, headers={'User-Agent': UA})
        with urllib.request.urlopen(req, timeout=120) as r:
            open(path, 'wb').write(r.read())
    return json.load(open(path, encoding='utf-8'))


def rings_of(feat):
    g = feat['geometry']
    if g['type'] == 'Polygon':
        return [g['coordinates'][0]]
    return [poly[0] for poly in g['coordinates']]


def travels_source():
    """`world` keys and the Balkans trip's `within` list, read straight out of
    travels-data.js so this tool needs no list of its own."""
    src = open(TRAVELS, encoding='utf-8').read()

    def unesc(s):
        return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), s)

    world = src[src.index('world: {'):]
    world = world[:world.index('\n  },')]
    countries = [unesc(m) for m in re.findall(r"^\s*'([^']+)':\s*\{", world, re.M)]

    # the whole `within: [...]` block, which ends on `]],` and not on the `],`
    # that closes each of its own rows
    within = re.search(r'within: \[(.*?)\]\],\n', src, re.S)
    balkans = [unesc(m) for m in re.findall(r"',\s*'([^']+)'\]", within.group(1) + ']')] if within else []
    return countries, balkans


def dp(pts, tol):
    """Douglas-Peucker. Iterative, because a 4,000-point ring recurses deeper
    than Python allows by default and this used to die on Canada."""
    if len(pts) < 3:
        return pts[:]
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        n2 = dx * dx + dy * dy
        worst, wi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if n2 == 0:
                d = math.hypot(px - ax, py - ay)
            else:
                t = ((px - ax) * dx + (py - ay) * dy) / n2
                t = 0.0 if t < 0 else (1.0 if t > 1 else t)
                d = math.hypot(px - (ax + t * dx), py - (ay + t * dy))
            if d > worst:
                worst, wi = d, i
        if worst > tol:
            keep[wi] = True
            stack.append((a, wi))
            stack.append((wi, b))
    return [p for p, k in zip(pts, keep) if k]


def outline(rings):
    """rings in lon/lat -> (path, w, h) in a box BOX on its long edge."""
    lats = [p[1] for r in rings for p in r]
    lat0 = (min(lats) + max(lats)) / 2.0
    k = math.cos(math.radians(lat0)) or 1.0

    proj = [[(p[0] * k, -p[1]) for p in r] for r in rings]

    axs = [p[0] for r in proj for p in r]
    ays = [p[1] for r in proj for p in r]
    tol = (max(max(axs) - min(axs), max(ays) - min(ays)) or 1.0) * TOL

    simple = [dp(r, tol) for r in proj]
    simple = [r for r in simple if len(r) >= 3]

    xs = [p[0] for r in simple for p in r]
    ys = [p[1] for r in simple for p in r]
    span = max(max(xs) - min(xs), max(ys) - min(ys)) or 1.0

    big = []
    for r in simple:
        rx = [p[0] for p in r]
        ry = [p[1] for p in r]
        if max(max(rx) - min(rx), max(ry) - min(ry)) >= span * MIN_RING:
            big.append(r)
    if not big:
        big = simple

    xs = [p[0] for r in big for p in r]
    ys = [p[1] for r in big for p in r]
    x0, y0 = min(xs), min(ys)
    span = max(max(xs) - x0, max(ys) - y0) or 1.0
    s = BOX / span

    def fmt(v):
        return ('%.1f' % v).rstrip('0').rstrip('.') or '0'

    d = ''
    for r in big:
        pts = [(fmt((p[0] - x0) * s), fmt((p[1] - y0) * s)) for p in r]
        d += 'M' + pts[0][0] + ' ' + pts[0][1]
        for x, y in pts[1:]:
            d += 'L' + x + ' ' + y
        d += 'Z'
    return d, (max(xs) - x0) * s, (max(ys) - y0) * s


def main():
    countries, balkans = travels_source()
    d110 = {f['properties']['ADMIN']: f for f in fetch('ne_110m_admin_0_countries.geojson')['features']}
    d50 = None

    def rings_for(name):
        nonlocal d50
        ne = ALIAS.get(name, name)
        if name in SMALL:
            if d50 is None:
                d50 = {f['properties']['ADMIN']: f
                       for f in fetch('ne_50m_admin_0_countries.geojson')['features']}
            src = d50
        else:
            src = d110
        if ne not in src:
            return None
        rings = rings_of(src[ne])
        if name == 'United States':
            lo_x, lo_y, hi_x, hi_y = US48
            rings = [r for r in rings
                     if all(lo_x <= p[0] <= hi_x and lo_y <= p[1] <= hi_y for p in r)]
        return rings

    out, missing = {}, []
    for name in countries:
        if name == 'The Balkans':
            rings = []
            for c in balkans:
                r = rings_for(c)
                if r:
                    rings += r
            if not rings:
                missing.append(name)
                continue
        else:
            rings = rings_for(name)
            if not rings:
                missing.append(name)
                continue
        d, w, h = outline(rings)
        out[name] = (d, w, h)
        print('  %-22s %5d chars   %3d x %3d' % (name, len(d), round(w), round(h)))

    if missing:
        print('NOT FOUND: %s' % ', '.join(missing), file=sys.stderr)

    def js(s):
        return "'" + ''.join(c if 32 <= ord(c) < 127 and c not in "'\\"
                             else '\\u%04x' % ord(c) for c in s) + "'"

    body = ['''/* travels-shapes.js: one simplified outline per country on /travels/.

   GENERATED by tools/shapes.py from Natural Earth 110m (50m for Malta and
   Singapore, which 110m is too coarse to contain). Do not edit by hand; add a
   country to `world` in travels-data.js and re-run the tool.

   Each entry is a path in a box 100 units on its long edge, with w/h giving
   the real aspect so travels.js can set a viewBox that does not distort it.
   Each country is projected about its OWN centre latitude, so these are not
   in one shared coordinate space and cannot be assembled into a world map;
   travels-map-data.js is the file for that. See the tool for why. */
window.TRAVELS_SHAPES = {''']
    for name in sorted(out):
        d, w, h = out[name]
        body.append('  %s: { w: %.1f, h: %.1f, d: %s },' % (js(name), w, h, js(d)))
    body.append('};\n')
    open(OUT, 'w', encoding='utf-8').write('\n'.join(body))
    total = os.path.getsize(OUT)
    print('\nwrote %s (%d outlines, %.1f KB)'
          % (os.path.relpath(OUT, ROOT), len(out), total / 1024.0))


if __name__ == '__main__':
    main()
