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
| `/high-school/` | Trabuco Hills: apps, projects, flyers, wallpapers, transcript, awards, WWDC |
| `/resume/` | Résumé, embedded with Drive and download links |
| `/travels/` | Where I've been, with an interactive map |
| `/accents/` | Nineteen accents and four impersonations, in the order I learned them |

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
  changing one stylesheet doesn't force visitors to re-download 16 MB of images.
- **Installable and fully offline.** [`sw.js`](sw.js) caches the shell on install,
  then quietly pulls every page and image in the background on activate. HTML is
  network-first, CSS/JS cache-first (safe because of `?v=`), images
  stale-while-revalidate. Add it to your home screen and it opens with no internet.
- **Cards come from data, never markup.** Every app and project card lives once in
  [`apps-data.js`](assets/js/apps-data.js) and is rendered by
  [`cards.js`](assets/js/cards.js) into any page that asks for it:

  ```html
  <div class="apps-grid" data-cards="zotfinder,uci-now,uci-esports"></div>
  <div class="hs-grid" data-projects="hs-datapad,hs-order66"></div>
  ```

  Edit an app in one place and it updates on every page listing it. The same
  pattern backs the transcript, the planet atlas, travels and the fan pages.
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

src/                     # 51 pages, each with a permalink in its front matter
  work · projects · education · college · high-school · resume · travels
  accents · star-wars · al-islam · franchises · fan-*.html (36 fan pages)
  jarvis · holocron · elmallah · marauders-map

assets/
  css/                   # base · layout · components · transcript · travels · accents
    fan/                 # one stylesheet per fan page
  js/                    # 83 files
    apps-data.js         # SINGLE source of truth for every app/project card
    cards.js             # renders them into [data-cards] / [data-projects]
    cursor · magnetic · scramble · reveal · clock · flowfield · tilt
    gallery · sound · intro · scroll · cardlink · utils
    transcript-data · planets-data · travels-data · fandom-data · …
    years-data · years    # the 97-photo year galleries on /high-school/ and
                          # /college/: justified rows, strictly chronological
  img/                   # me · apps · bots · awards · highschool · flyers
                         # wallpapers · franchises · icons
    years/<year>/        # one folder per school year; every file is named for
                         # its own EXIF capture time, so the folder sorts itself
  audio/accents/         # <id>.m4a per accent — none recorded yet; see the
                         # header of assets/js/accents-data.js for the convention
```

### Adding photos to a year gallery

Drop the originals in a folder per school year and run the ingest step: it
auto-orients from EXIF, resizes to a 1400px long edge, encodes progressive JPEG
and then runs `jpegtran` over the result, names each file for its capture time
and rewrites `assets/js/years-data.js`. Nothing about the grid is hand-written —
`years.js` reads the widths and heights out of that file and justifies the rows
before any image has loaded, so the layout never jumps.

Every other image on the site goes through the same encoder. PNGs are kept as
PNG only where transparency is actually used, or where the PNG genuinely comes
out smaller than the JPEG would (which is the case for the flat poster-art
flyers); everything else is JPEG.

### Adding an app to a page

Don't write markup. Add the entry to `APP_CARDS` in
[`apps-data.js`](assets/js/apps-data.js), then list its id in a grid's
`data-cards` attribute on whichever pages should show it.

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

## Contact

- **Email:** ammelmallah@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/abubakr-elmallah
- **GitHub:** https://github.com/TheAbubakrAbu
- **App Store:** [my apps](https://apps.apple.com/us/developer/abubakr-elmallah/id1690310648) · [UCI's apps](https://apps.apple.com/us/developer/uci-student-center/id1382415697)

---

<div align="center">
<sub>© 2026 Abubakr Elmallah</sub>
</div>
