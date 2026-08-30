<div align="center">

<img src="assets/img/me/abubakr-circle.png" alt="Abubakr Elmallah" width="160" />

# Abubakr Elmallah — Portfolio

**UC Irvine Computer Science, Class of 2028 · iOS Developer**

🔗 **[abubakrelmallah.com](https://abubakrelmallah.com/)**

</div>

---

My personal site: the apps I ship for UC Irvine, my own Apple ecosystem apps and
Discord bots, the projects I built in high school, and a large set of fan pages
for the things I like. Hand-written HTML, CSS and vanilla JavaScript — no React,
no Tailwind, no bundler, and no npm dependencies at all. Jekyll is used only for
permalinks, redirects and cache-busting; every page is a real `.html` file you
can open and read.

## Pages

**Main**

| Page | What's on it |
| --- | --- |
| `/` | Intro, about, WWDC 2024, contact |
| `/work/` | The UCI apps I develop professionally |
| `/projects/` | Full catalog: UCI apps, my own apps, Discord bots, web, high school |
| `/education/` | Portal to the two school pages |
| `/college/` | UC Irvine: roles by year, what I've built, academics |
| `/high-school/` | Trabuco Hills: apps, projects, flyers, wallpapers, transcript, awards, WWDC — and middle school before it |
| `/resume/` | Résumé, embedded with Drive and download links |
| `/travels/` | Where I've been, with an interactive map |
| `/accents/` | Nineteen accents and four impersonations, in the order I learned them |
| `/gaming/` | Four Steam Replays, every completion shelf, the seventeen worlds here with games in them, and **every game screenshot on the site**, in a section per franchise (the list is built by Jekyll from `assets/img/franchises/`, so a new picture needs no edit) |

**Themed collections**

| Page | What's on it |
| --- | --- |
| `/star-wars/` | Datapad, Aurebesh Translator, the droids — plus the alphabet, a playable hand of sabacc and a kyber forge, all running in the page |
| `/al-islam/` | Al-Islam, Al-Quran, Al-Adhan, the open-source engines — plus prayer times and a qiblah computed in the browser, and a tajwīd sheet |
| `/franchises/` | Index of **36** pages: **who I am** (Islam, Arab, Egypt) first, then Star Wars, Harry Potter, LEGO, Pokémon, Minecraft, LOTR, Marvel, Avatar and the rest, each with its own stylesheet and behaviour |

**Alternate interfaces** — the same content, re-skinned end to end:

| Page | Theme |
| --- | --- |
| `/jarvis/` | Stark heads-up display: arc reactor, chronometer with the Hijri date, telemetry |
| `/holocron/` | Jedi archive terminal: holocron in a projector cone, kyber readings, stardate |
| `/elmallah/` | Star Wars holotable in UCI blue and gold, Trabuco blue and Islamic green |
| `/marauders-map/` | Parchment: every page as a corridor, footprints that move, and a wipe-it-blank button |

## Highlights

- 🏆 **Swift Student Challenge 2024** winner with **Al-Quran** — one of 350 worldwide; attended WWDC at Apple Park
- 🏆 **Congressional App Challenge 2023**, Best Original App Idea, with **Al-Islam**
- 🏆 **Datapad** reached **#10** on the App Store Entertainment chart
- 📱 Ship **ZOTFinder**, **UCI Now**, **UCI Esports** and **PeterPlate** for UC Irvine

## How it's built

- **Jekyll on GitHub Pages.** Used for three things only: clean permalinks,
  `jekyll-redirect-from` stubs so old `/src/*.html` links never 404, and the
  `_includes/v.html` cache-buster.
- **Per-file cache busting.** `v.html` appends `?v=<that file's own mtime>`, so
  changing one stylesheet doesn't force visitors to re-download 410 MB of images.
- **Installable and fully offline.** [`sw.js`](sw.js) caches the shell on install,
  then quietly pulls every page and image in the background on activate. HTML is
  network-first, CSS/JS cache-first (safe because of `?v=`), images
  stale-while-revalidate; navigations ride the browser's navigation preload, so
  a cold worker start adds nothing to a page load. Add it to your home screen and it opens with no internet.
- **Photographs are pointed at, never copied.** The fan pages are drawn rather
  than photographed, with one exception: a picture of me actually in the place.
  [`photos-data.js`](assets/js/photos-data.js) keys those by the same tag the
  page carries on `<body data-fan="...">`, so `fanpage.js` finds a page's
  photographs without its own data file mentioning them, and every `src` is a
  path into the year galleries rather than a second copy of the file. The Disney
  and Universal pages use the same list for the "I went here" stamp under each
  park. Delete a photo and re-ingest: the `<img>` drops itself, nothing breaks.
- **Cards come from data, never markup.** Every app and project card lives once in
  [`apps-data.js`](assets/js/apps-data.js) and is rendered by
  [`cards.js`](assets/js/cards.js) into any page that asks for it:

  ```html
  <div class="apps-grid" data-cards="zotfinder,uci-now,uci-esports"></div>
  <div class="hs-grid" data-projects="hs-datapad,hs-order66"></div>
  ```

  Edit an app in one place and it updates on every page listing it. The same
  pattern backs the transcript, the planet atlas, travels and the fan pages.
- **Cards open in place.** Every entry carries a `long` write-up as well as its
  one-line `desc`; clicking a card stretches it across its grid row and shows
  the full story plus big App Store / GitHub buttons ([`expand.js`](assets/js/expand.js)).
- **Cards line up row by row.** Every card is a CSS subgrid of its grid's rows,
  so each row of cards puts its titles on one line, then its dates, then the
  text, whatever any single card's content does. Cards and franchise tiles
  render an empty slot for a part they haven't got, which is what keeps the
  rows in step — see the comments in `cards.js` and `fanpage.js` before
  changing what a card emits.
- **Motion.** Custom cursor, magnetic links, scramble text, a flow-field canvas,
  scroll reveals, tilt, interface sounds and per-page launch animations — all
  hand-rolled, and all gated behind `prefers-reduced-motion`.
- **Responsive** with a desktop side rail and a mobile bottom tab bar.

## Structure

```
index.html               # home (root, so GitHub Pages serves it)
_config.yml              # plugins: jekyll-redirect-from
_includes/v.html         # ?v=<mtime> per-file cache busting
sw.js                    # service worker: offline + install
manifest.webmanifest     # PWA manifest
CNAME                    # abubakrelmallah.com
run                      # ./run -> local Jekyll server with livereload

tools/photos.py          # the image pipeline: ingest (year galleries) + sweep
_originals/              # gitignored camera-roll originals, one folder per year

src/                     # 51 pages, each with a permalink in its front matter
  work · projects · education · college · high-school · resume · travels
  accents · gaming · star-wars · al-islam · worlds · fan-*.html (36 fan pages)
  jarvis · holocron · elmallah · marauders-map

assets/
  css/                   # base · layout · components · transcript · travels ·
                         # accents · gaming
    fan/                 # one stylesheet per fan page
  js/                    # 100 files
    apps-data.js         # SINGLE source of truth for every app/project card
    photos-data.js       # my own photos, keyed by fandom and by park; every
                         # path points into assets/img/years/, never a copy
    cards.js             # renders them into [data-cards] / [data-projects]
    expand.js            # click a card -> it expands in place with the full write-up
    lazy.js              # the gallery loader: frames are data-src, fetched a few at
                         # a time nearest the viewport, and let go when far away
    cursor · magnetic · scramble · reveal · clock · flowfield · tilt
    gallery · sound · intro · scroll · cardlink · utils
    transcript-data · planets-data · travels-data · fandom-data · …
    years-data · years    # the 1,613-photo year galleries on /high-school/ and
                          # /college/: justified rows, strictly chronological
  img/                   # me · apps · bots · awards · highschool · flyers
                         # wallpapers · franchises · icons
    years/<year>/        # one folder per school year; every file is named for
                         # its own EXIF capture time, so the folder sorts itself
    years-large/<year>/  # the same names at 2000px: what the full-screen
                         # viewer swaps in once a photo is opened
  audio/accents/         # <id>.m4a per accent — none recorded yet; see the
                         # header of assets/js/accents-data.js for the convention
```

### Adding photos to a year gallery

Drop them in `_originals/<year>/`, named for their capture time the way the
rest of that folder is (see [`_originals/README.md`](_originals/README.md)),
then:

```bash
python3 tools/photos.py ingest
```

It auto-orients from EXIF, encodes each photo twice as AVIF (a 1000px q50
frame for the grid, about 43 KB, and a 2000px q65 copy under
`assets/img/years-large/` that only the full-screen viewer loads, about 215 KB;
the grid never shows a frame wider than 330 CSS px, the viewer shows one up to
1100, which on a Retina screen is 2,200 device pixels), drops anything you
deleted, and rewrites [`years-data.js`](assets/js/years-data.js). `_originals/` is
gitignored and never modified. A photo whose AVIF is already newer than its
original is not encoded again, so a run that adds three photos takes seconds
and leaves the other files byte-for-byte alone; `ingest --force` re-encodes
everything.

Where a photo was taken shows under its date in the full-screen viewer.
`python3 tools/photos.py places` reads each original's GPS fix and names the
spot through OpenStreetMap, one lookup per distinct spot, cached in the
gitignored `_originals/places.json`; ingest then writes the town,
"Irvine, California", as a fifth entry on the photo's row. Only the name ships,
never a coordinate, and nothing ships for a photo whose address mentions a
place on that file's `hide` list, which is where home is and is why the list
lives outside the repository (see `_originals/README.md`).

Nothing about the grid is hand-written — `years.js` reads the
widths and heights out of that file and justifies the rows before any image has
loaded, so the layout never jumps. The frames themselves are fetched by
[`lazy.js`](assets/js/lazy.js): written with `data-src`, given a real `src` a
few at a time as they come within a screen of the viewport, and let go again
once scrolled far away, so the page is up before a single photo is asked for
and a 700-photo year stays within what a phone can hold.

`python3 tools/photos.py sweep` recompresses every other image under
`assets/img/` without changing its format, because that art is referenced by
filename from HTML, CSS and `apps-data.js`. JPEGs are re-encoded progressive
and run through `jpegtran`. PNGs stay PNG only where transparency is actually
used, or where the PNG genuinely comes out smaller than the JPEG would: that is
the case for the flat poster-art flyers, so converting them would make the site
bigger. Everything else is JPEG.

### Adding an app to a page

Don't write markup. Add the entry to `APP_CARDS` in
[`apps-data.js`](assets/js/apps-data.js), then list its id in a grid's
`data-cards` attribute on whichever pages should show it. Give it a `long`
array of paragraphs too — that is what the card shows when it is clicked open.

## Run locally

```bash
./run          # bundle exec jekyll serve --livereload, opens 127.0.0.1:4000
```

First time, install the gems:

```bash
bundle install
```

Jekyll is required — `permalink`, `redirect_from` and the `v.html` include mean
opening the raw files from disk won't resolve links or stylesheet versions.

`run` also passes `--livereload-ignore '/assets/*'`. Without it, every save
sends the browser one reload message per site file (about 2,000 here, most of
them gallery photos) and the LiveReload client answers each one with
`location.reload()`, which is enough to take the browser down. The comment at
the top of `run` has the numbers.

## Contact

- **Email:** ammelmallah@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/abubakr-elmallah
- **GitHub:** https://github.com/TheAbubakrAbu
- **App Store:** [my apps](https://apps.apple.com/us/developer/abubakr-elmallah/id1690310648) · [UCI's apps](https://apps.apple.com/us/developer/uci-student-center/id1382415697)

---

<div align="center">
<sub>© 2026 Abubakr Elmallah</sub>
</div>
