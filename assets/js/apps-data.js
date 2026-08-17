/* apps-data.js: single source of truth for every app/bot "card".
   Edit an app HERE once and it updates on every page that lists it
   (projects.html, star-wars.html, al-islam.html). cards.js does the rendering.

   Field reference (all optional unless noted):
     icon      required, path under assets/img/  (e.g. 'apps/datapad.jpg')
     alt       required, icon alt text
     title     required, card heading
     sub       required, small line under the title (date or tagline)
     desc      required: paragraph
     long      the full write-up, as an array of paragraphs. Cards that have it
               expand in place when clicked (see expand.js) and show these
               paragraphs plus big action buttons instead of the small links.
     tags      required: footer tech line (use ' · ' separators)
     links     footer links: [{ label, href }]   (omit for a dead app)
     stackLinks true  -> stack the footer links vertically instead of side by side
     feature   true  -> adds .app-card--feature
     dead      true  -> adds .app-card--dead (no links; shows deadNote instead)
     deadNote  text shown in place of links when dead
     badge     { text, href? , dead? }  -> ribbon in the top-right of the icon row
     cat       { label, href, cls }  -> theme pill ("Star Wars ↗" / "Islamic ↗"),
               only rendered on pages that opt in via data-cards-cat
     shots     award screenshots: [{ src, alt, caption, imgClass? }] (src under assets/img/) */

/* NEVER hand-write a card in a page. If an app or project shows up on two
   pages it is ONE entry here, rendered in both places via data-cards /
   data-projects. (These used to be copy-pasted <article> blocks, and the
   copies had already drifted apart.) */

window.APP_CARDS = {

  /* ---- UCI Work ---- */
  'zotfinder': {
    icon: 'apps/zotfinder.jpg', alt: 'ZOTFinder app icon',
    title: 'ZOTFinder', sub: 'September 14, 2014 · Remastered by me May 29, 2025',
    desc: 'A free interactive campus map for UCI. Search buildings, find professor offices, view emergency info, and get directions with estimated travel times. On the App Store since 2014; I rewrote it from the ground up in SwiftUI for the 2025 remaster, giving it a brand new modern look.',
    long: [
      'ZOTFinder is the official companion app for navigating the University of California, Irvine. This all-in-one interactive campus map helps students, staff and visitors search for buildings, locate professor offices, explore campus services, access emergency information, and get walking directions with estimated travel times. With its focus on accessibility, safety and ease of use, ZOTFinder makes sure you never get lost on campus again.',
      'I fully remastered ZOTFinder from UIKit to SwiftUI during my freshman year at UCI, rebuilding the app from the ground up with improved performance, a cleaner interface and smoother navigation. The SwiftUI rewrite modernised the entire experience across iPhone, iPad and Mac, making ZOTFinder faster, smarter and more helpful than ever.',
      'Built as an iOS Developer for <b>UCI Student Center &amp; Event Services</b>. The app has been on the App Store since 2014; the remaster shipped on <b>May 29, 2025</b>.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/zotfinder/id915256719?platform=iphone' }],
  },
  'uci-now': {
    icon: 'apps/uci-now.jpg', alt: 'UCI Now app icon',
    title: 'UCI Now', sub: 'July 23, 2018 · Remastered by me August 31, 2025',
    desc: 'Navigate the Student Center, book study rooms, find Ring Mall events, and view real-time campus activities with searchable maps and listings. On the App Store since 2018; I rewrote it from the ground up in SwiftUI for the 2025 remaster, giving it a brand new modern look.',
    long: [
      'UCI Now is the official companion app for the UCI Student Center. This free campus app helps students and visitors navigate the Student Center, reserve Courtyard Study Rooms, browse live events across campus, and explore Ring Mall activities like food sales and club fundraisers. With searchable event listings, interactive maps and real-time study room availability, UCI Now puts everything happening at UCI right at your fingertips.',
      'I completely remastered the app from UIKit to SwiftUI during my freshman year at UC Irvine, giving it a modern, smooth and intuitive user experience across iPhone, iPad and Mac. The rebuild focused on performance, accessibility and real-time updates, turning the original legacy app into a fast, responsive and visually immersive campus companion.',
      'Built as an iOS Developer for <b>UCI Student Center &amp; Event Services</b>. The app has been on the App Store since 2018; the remaster shipped on <b>August 31, 2025</b>.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-now/id1382415698?platform=iphone' }],
  },
  'uci-esports': {
    icon: 'apps/uci-esports.jpg', alt: 'UCI Esports app icon',
    title: 'UCI Esports', sub: 'March 2, 2026 · Arena &amp; events',
    desc: 'Check arena hours, reserve PCs, discover tournaments and events, watch live Twitch streams, and get reminders so you never miss a match.',
    long: [
      'UCI Esports is the official companion app for the UCI Esports Arena. This free campus app helps students check arena hours, reserve gaming PCs, discover upcoming tournaments and events, and watch live Twitch streams from the UCI Esports community.',
      'With event reminders, machine reservations and quick access to arena information, the UCI Esports app keeps everything happening in the arena right at your fingertips. Written in SwiftUI from the first line, so it runs on iPhone, iPad and Mac from a single codebase.',
      'Built as an iOS Developer for <b>UCI Student Center &amp; Event Services</b>, and the first of the three UCI apps that is mine from scratch rather than a remaster.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-esports/id6751213697' }],
  },
  'peterplate': {
    icon: 'apps/peterplate.jpg', alt: 'PeterPlate app icon',
    title: 'PeterPlate', sub: '2025 · Dining menu viewer',
    desc: "A menu viewer for UCI's Brandywine and Anteatery dining halls. Browse current and upcoming menus, check allergen and dietary info, follow dining events, and rate dishes to plan your meal swipes and nutrition goals.",
    long: [
      "PeterPlate is the dining companion for UC Irvine: a menu viewer for Brandywine and the Anteatery that makes the day's food actually legible. Browse current and upcoming menus, check allergen and dietary information, follow special dining events, and read student ratings so you know which dishes are worth the swipe.",
      'It is a web project rather than an app: a Next.js front end with shadcn/ui components and Zustand for state, talking to a PostgreSQL database through Drizzle ORM and tRPC on AWS, all inside a Turborepo monorepo written in TypeScript and Tailwind.',
      'PeterPlate is built and maintained by <b>ICSSC</b>, the Information &amp; Computer Science Student Council at UCI, and is open source on GitHub.',
    ],
    tags: 'Web · Next.js',
    links: [
      { label: 'Website ↗', href: 'https://peterplate.com/' },
      { label: 'GitHub ↗', href: 'https://github.com/icssc/PeterPlate' },
    ],
  },

  /* ---- Star Wars ---- */
  'aurebesh-translator': {
    icon: 'apps/aurebesh-translator.jpg', alt: 'Aurebesh Translator app icon',
    title: 'Aurebesh Translator', sub: 'October 22, 2024',
    desc: 'The free version of Datapad: a simple, ad-free way to translate between English and Aurebesh, fully offline, with a distraction-free interface.',
    long: [
      'Aurebesh Translator is the free companion to Datapad: a simple, ad-free iOS app that lets you translate between English and Aurebesh with full offline functionality and a clean, distraction-free interface.',
      'Everything happens on device, there are no ads and no accounts, and it runs on iPhone, iPad, Apple Watch and Mac. If Datapad is the collector’s edition, this is the one you hand to a friend who just wants to read the alphabet.',
      'Published on the App Store on <b>October 22, 2024</b>, when I was a senior in high school.',
    ],
    tags: 'iOS · iPadOS · watchOS · macOS',
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/aurebesh-translator/id6670201513?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Aurebesh-Translator' },
    ],
  },
  'datapad': {
    icon: 'apps/datapad.jpg', alt: 'Datapad app icon',
    /* the App Store name in full, styled like the Islamic apps' two-part
       names ("Al-Adhan · Prayer Times") rather than with the store's pipe */
    title: 'Datapad ·<br>Aurebesh Translator', sub: 'June 26, 2023',
    desc: 'The ultimate tool for Star Wars fans to explore and translate the galactic alphabet Aurebesh in all its forms, with a custom Aurebesh keyboard, immersive features, and a galactic-themed interface.',
    long: [
      'Datapad is a premium galactic translator for iPhone, iPad, Mac and Apple Watch, built for Star Wars fans to explore Aurebesh, Mando’a and Outer Rim scripts. It features immersive tools like digraph rendering, quiz-based learning, an Aurebesh keyboard and a fully customisable galactic-themed interface, all while keeping everything offline and privacy-focused.',
      'It is the direct descendant of the Star Wars Datapad I made on Code.org in 10th grade: back then a real App Store version was the dream, and this is that dream shipped.',
      'Published on the App Store on <b>June 26, 2023</b>, when I was a junior in high school. 🏆 It reached the <b>Top 10 on the App Store Entertainment chart</b>.',
    ],
    tags: 'iOS · iPadOS · watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Top 10 · Entertainment' },
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    shots: [
      { src: 'awards/datapad-chart.jpg', alt: 'Datapad ranked #10 on the App Store Entertainment Top Charts', caption: '#10 · Top Charts', imgClass: 'shift-down' },
      { src: 'awards/datapad-rating.jpg', alt: 'Datapad App Store listing showing a 4.9 star rating', caption: '#11 · Top Charts', imgClass: 'shift-down' },
    ],
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/datapad-aurebesh-translator/id6450498054?platform=iphone' }],
  },
  'sabacc-droid': {
    icon: 'bots/sabacc-droid.png', alt: 'Sabacc Droid icon',
    title: 'Sabacc Droid', sub: 'November 14, 2024 · Play Sabacc on Discord',
    desc: 'A Discord bot that brings the Star Wars card game Sabacc to your server, with multiplayer rounds, rules variants, and a galaxy-flavored interface.',
    long: [
      'Sabacc Droid is a Discord bot and Python project that brings the four classic Star Wars Sabacc card games to life. Supporting Corellian Spike, Coruscant Shift, Kessel and Traditional Sabacc, it offers a fully interactive multiplayer Discord experience.',
      'With immersive mechanics, variant-specific rules and authentic designs inspired by Solo: A Star Wars Story, Galaxy’s Edge, Rebels, Star Wars Outlaws and more, Sabacc Droid lets fans enjoy the thrill of Sabacc right from their server with their friends.',
      'Created on <b>November 14, 2024</b>, when I was a freshman in college.',
    ],
    tags: 'Discord · Python',
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    links: [
      { label: 'Add to Discord ↗', href: 'https://discord.ly/sabaac-droid' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Sabacc-Droid' },
    ],
  },
  'aurebesh-droid': {
    icon: 'bots/aurebesh-droid.jpg', alt: 'Aurebesh Droid icon',
    title: 'Aurebesh Droid', sub: 'June 18, 2025 · Aurebesh Translator on Discord',
    desc: 'Translate English to and from Aurebesh right inside Discord. Fast, server-friendly, and written in C++ for speed.',
    long: [
      'Aurebesh Droid is an advanced Discord bot that brings the Star Wars writing system to life through rich translation features and immersive lore. Designed as a digital companion bot for fans, it supports English-to-Aurebesh translation, image rendering, alphabet charts, and interactive Jedi and Sith holocrons that deliver randomised quotes from across the galaxy.',
      'Built in C++ with cross-platform support and no data collection, Aurebesh Droid blends fun, privacy and fandom into one galactic experience.',
      'Created on <b>June 18, 2025</b>, when I was a freshman in college.',
    ],
    tags: 'Discord · C++',
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    links: [
      { label: 'Add to Discord ↗', href: 'https://discord.ly/aurebesh-droid' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Aurebesh-Droid' },
    ],
  },

  /* ---- Islam ---- */
  'quran-tajweed-engine': {
    icon: 'apps/quran-tajweed-engine.jpg', alt: 'Quran Tajweed Engine logo',
    title: 'Quran Tajweed Engine', sub: 'June 25, 2026 · Open source',
    desc: 'A tajweed rule engine for the Quran: it takes the Uthmani text and works out where each rule applies (the idghām, the ikhfāʾ, the qalqalah, the madd and its lengths) so an app can colour the letters correctly instead of shipping a hand-marked copy. This is the engine behind the colour-coded recitation in Al-Quran.',
    long: [
      'The Quran Tajweed Engine is an open-source, offline-first, framework-agnostic foundation for building Quran apps in any language. It ships three things together: portable JSON data, a precise written specification for every feature, and reference implementations in seven languages (JavaScript, Python, Swift, Go, Rust, Kotlin and Dart).',
      'The data covers all <b>6,236 ayahs</b> with Arabic text, two English translations and transliteration, <b>113,611 pre-computed tajweed spans</b> across 17 rule categories, seven alternate qirāʾāt readings, and 62 reciters across eight riwāyāt, with both full-surah and ayah-by-ayah audio. Tajweed is the most error-prone part of building a Quran app, so the engine works it out once, correctly, and hands the answer to every platform.',
      'One source file (<code>tajweed-rules.json</code>) drives all seven ports: edit it, run the build, and every implementation and its documentation regenerate in lockstep. MIT-licensed and offered as <i>ṣadaqah jāriyah</i>, grown out of the tajweed work inside Al-Quran.',
    ],
    tags: 'Tajweed rules · Uthmani script · JSON output',
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Quran-Tajweed-Engine' },
    ],
  },

  'hadith-json-engine': {
    icon: 'apps/hadith-json-engine.jpg', alt: 'Hadith JSON Engine logo',
    title: 'Hadith JSON Engine', sub: 'August 10, 2026 · Open source',
    desc: 'The same idea applied to ḥadīth: turning the major collections into clean, structured JSON (book, chapter, number, Arabic, translation and grading) so anything built on top of them starts from consistent data rather than scraped HTML.',
    long: [
      'The Hadith JSON Engine is an open-source, offline-first ḥadīth database: <b>50,884 ḥadīth across 17 collections</b> in both Arabic and English, packaged with full documentation and a portable binary format so an app on any platform can ship the whole corpus without a network call.',
      'It exists because the scraped datasets everyone builds on are quietly broken. A greedy regex in the upstream source had been deleting passages of text for years; this project recovers them, with <b>4,477 records repaired</b> behind dual-pass simulation proofs, and <b>21,455 records graded</b> (ṣaḥīḥ, ḥasan, ḍaʿīf) from more than ten scholars.',
      'The collections cover the Nine Books, three Forty Ḥadīth compilations and works like Riyāḍ aṣ-Ṣāliḥīn. The packed binary format compresses 79 MB of JSON to 25 MB and is specified in full, so it can be read from any language.',
    ],
    tags: 'Structured ḥadīth · JSON',
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Hadith-JSON-Engine' },
    ],
  },

  'al-adhan': {
    icon: 'apps/al-adhan.jpg', alt: 'Al-Adhan | Prayer Times app icon',
    title: 'Al-Adhan ·<br>Prayer Times', sub: 'December 31, 2023',
    desc: 'An offshoot of Al-Islam that enhances daily worship with precise prayer times, real-time qibla direction, and a unique Traveling Mode for on-the-go adjustments.',
    long: [
      'Al-Adhan is a free and beginner-friendly offshoot of Al-Islam that enhances daily worship with precise prayer times, real-time qibla direction, home-screen widgets, and a unique Traveling Mode that automatically adjusts for Qaṣr prayers while on the go.',
      'It is the prayer half of Al-Islam pulled out into its own app for people who only want that: no account, no ads, and everything calculated on device across iPhone, iPad, Apple Watch and Mac.',
      'Published on the App Store on <b>December 31, 2023</b>, when I was a senior in high school.',
    ],
    tags: 'iOS · iPadOS<br>watchOS · macOS',
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    stackLinks: true,
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/al-adhan-prayer-times/id6475015493?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Al-Adhan-Prayer-Times' },
    ],
  },
  'al-islam': {
    icon: 'apps/al-islam.jpg', alt: 'Al-Islam | Islamic Pillars app icon',
    title: 'Al-Islam ·<br>Islamic Pillars', sub: 'July 26, 2023',
    desc: 'An all-in-one companion for lifelong Muslims and converts alike, with Traveling Mode, Beginner Arabic Mode, prayer times, qibla direction, Quran access, and tools to deepen faith and connect with Allah.',
    long: [
      'Al-Islam is a free, beginner-friendly Muslim companion app designed for lifelong Muslims and converts alike. It offers essential features like prayer times, Quran access and qibla direction, plus unique tools such as Traveling Mode and Beginner Arabic Mode, all aimed at helping users deepen their faith and stay connected with Allah.',
      'Published on the App Store on <b>July 26, 2023</b>, when I was a junior in high school. It was written in the weeks right after my AP and IB exams, and it is the app the other Islamic ones grew out of.',
      '🏆 <b>Winner of the Congressional App Challenge 2023 — Best Original Idea.</b> Issued by the United States Congress in December 2023, my senior year of high school: I was awarded a Certificate of Congressional Recognition by U.S. Representative Young Kim, with the Beginner Arabic Mode and Traveling Mode singled out for supporting new Muslims and learners of Arabic.',
    ],
    tags: 'iOS · iPadOS<br>watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Congressional Challenge ’23', href: 'https://www.congressionalappchallenge.us/' },
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    stackLinks: true,
    shots: [
      { src: 'awards/al-islam-congressional.jpg', alt: 'Congressional App Challenge winner announcement for Abubakr Elmallah', caption: 'Best Original Idea', imgClass: 'shift-right' },
      { src: 'awards/al-islam-certificate.jpg', alt: 'House of Representatives Certificate of Congressional Recognition', caption: 'House of Reps.' },
    ],
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/al-islam-islamic-pillars/id6449729655?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Al-Islam-Islamic-Pillars' },
    ],
  },
  'al-quran': {
    icon: 'apps/al-quran.jpg', alt: 'Al-Quran | Beginner Quran app icon',
    title: 'Al-Quran ·<br>Beginner Quran', sub: 'December 26, 2023',
    desc: 'Makes learning and studying the Holy Quran accessible, with Arabic Beginner Mode, ayah sharing, recitations, and tools for enhancing your spiritual journey.',
    long: [
      'Al-Quran is a free and beginner-friendly offshoot of Al-Islam that makes learning and studying the Holy Quran accessible, with unique Arabic learning tools like Beginner Mode, recitations, translations and ayah sharing, all designed to support and enhance your spiritual journey.',
      'Published on the App Store on <b>December 26, 2023</b>, when I was a senior in high school. The colour-coded tajweed inside it is what later became the open-source Quran Tajweed Engine.',
      '🏆 <b>Winner of the Apple Swift Student Challenge 2024.</b> Issued by Apple in June 2024, at the end of my senior year of high school: I was one of a few hundred students selected from thousands of high-school and college entrants worldwide, still a high schooler at the time. It got me to WWDC 2024 just days after graduating, where I met Tim Cook, explored Apple Park and connected with young developers from around the world, along with a personal congratulatory letter from Apple’s Worldwide Developer Relations team.',
    ],
    tags: 'iOS · iPadOS<br>watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Swift Student Challenge ’24', href: 'https://developer.apple.com/swift-student-challenge/' },
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    stackLinks: true,
    shots: [
      { src: 'awards/al-quran-ssc.jpg', alt: 'Swift Student Challenge 2024 award for Al-Quran', caption: 'Swift Student Challenge', imgClass: 'shift-right-lg' },
      { src: 'awards/al-quran-apple-letter.jpg', alt: 'Apple Worldwide Developer Relations letter congratulating Abubakr Elmallah', caption: 'Apple · WWDC letter' },
    ],
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/al-quran-beginner-quran/id6474894373?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Al-Quran-Beginner-Quran' },
    ],
  },

  /* ---- Web ---- */
  'website': {
    /* No bespoke logo: reuses the site's own PWA icon, which is the closest
       thing it has to an app icon. */
    icon: 'icons/icon-192.png', alt: 'abubakrelmallah.com icon',
    title: 'This Website', sub: 'June 24, 2026 · abubakrelmallah.com',
    desc: 'The site you are reading. Hand-written Jekyll and vanilla JavaScript with no framework: a custom cursor, a flow-field canvas, magnetic hover, scroll reveals, and a service worker so every page still opens offline. The Star Wars, J.A.R.V.I.S. and Marauder’s Map interfaces are the same content re-skinned.',
    long: [
      'The site you are reading: the apps I ship for UC Irvine, my own Apple ecosystem apps and Discord bots, the projects I built in high school, and a large set of fan pages for the things I like. It exists because all of that was scattered across Notes, Files and Photos, where every single piece of it mattered to me and not one piece was findable.',
      'Hand-written HTML, CSS and vanilla JavaScript — no React, no Tailwind, no bundler, and no npm dependencies at all. Jekyll is used only for permalinks, redirects and cache-busting; every page is a real <code>.html</code> file you can open and read. A service worker caches it all, so the whole site still opens with no connection.',
      'The interface is the point: a custom cursor, a flow-field canvas behind everything, magnetic hover, scroll reveals, and four alternate front ends over the same content — E.L.M.A.L.L.A.H., J.A.R.V.I.S., the Jedi H.O.L.O.C.R.O.N. archive, and the Marauder’s Map on parchment.',
      'Live since <b>June 24, 2026</b>, and open source on GitHub.',
    ],
    tags: 'Jekyll · Vanilla JS · Offline PWA',
    links: [
      { label: 'Visit ↗', href: 'https://abubakrelmallah.com' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Abubakr-Elmallah-Website' },
    ],
  },

  /* ---- Deprecated ---- */
  'icoi': {
    icon: 'apps/icoi.jpg', alt: 'Islamic Center of Irvine (ICOI) app icon',
    title: 'Islamic Center of Irvine', sub: 'October 3, 2023 – May 2026',
    desc: 'Built for the Irvine Muslim community. Accurate mosque prayer times, important links, Quran access, Islamic tools, and local business support. Discontinued in May 2026, when ICOI moved to The Masjid App.',
    long: [
      'The Islamic Center of Irvine App, designed for the Islamic Irvine community, provided accurate mosque prayer times, Quran access, essential Islamic tools, community resources and support for local businesses, all in one iOS app.',
      'Published on the App Store on <b>October 3, 2023</b>, when I was a senior in high school. I helped create the ICOI Technology Committee and sat on its board, and the mosque gave me a certificate for app development achievement for building and maintaining it.',
      'I maintained it for two and a half years, through to <b>version 4.5.0</b>. That last release existed to say goodbye properly: it added a notice counting down to the closure, thanking people for using it, and pointing them to The Masjid App, where ICOI’s updates and services now live. The app shut down in <b>May 2026</b> and is no longer available to download; the source is still on GitHub.',
      'Building it is also what led to teaching iOS at the STEM Heroes Academy at the Muslim Village.',
    ],
    tags: 'iOS',
    dead: true,
    deadNote: 'Discontinued May 2026',
    badge: { text: 'Deprecated · May 2026', dead: true },
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    stackLinks: true,
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Islamic-Center-of-Irvine' },
    ],
  },

};

/* The high-school projects: a different card shape (.proj-card, a screenshot
   instead of an app icon), so a separate table with its own fields.
   Rendered with <div class="hs-grid" data-projects="id1,id2,…">.

     img    required, screenshot path under assets/img/
     alt    required, screenshot alt text
     title  required   year required, the pill on the right of the title
     grade  required, the school year it was built in, shown under the title
     tags   required, footer tech line (use ' · ' separators)
     long   the full write-up, as an array of paragraphs (same as APP_CARDS):
            the card expands in place when clicked and shows these
     links  footer links: [{ label, href }]; the first one is also where the
            screenshot links to unless `href` overrides it */
window.PROJ_CARDS = {

  'hs-datapad': {
    img: 'highschool/datapad.png', alt: 'Star Wars Datapad, a Code.org App Lab project',
    title: 'Star Wars Datapad', year: '2021',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'An interactive web app built with JavaScript on Code.org that simulates a fully functional Star Wars datapad: translate between English and Aurebesh in both directions (single letters, digraphs and punctuation), look up letters by name or pronunciation, hear them pronounced, and switch the whole interface between Jedi, Sith, Mandalorian, Rebel Alliance, Galactic Empire, bounty hunter and pirate themes, each with its own colours, images and sounds.',
      'This was my <b>first coding project</b>, made for AP Computer Science Principles in Fall 2021, my sophomore year. It started as a demo under 200 lines that could only write “Hello there!” in Aurebesh and was not really functional; it only started working properly once I learned what substrings were. I kept refining it every week through Spring and Summer 2022.',
      'It was my favourite thing I had built at the time, and it is the direct ancestor of <b>Datapad</b>, the iOS app on the App Store today.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/3GTPl_9o0qf9zWutRclvLYYoJRopnjTmVTdm3cXHELc' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Star-Wars-Datapad' },
    ],
  },
  'hs-calculator': {
    img: 'highschool/calculator.png', alt: 'Calculator, a Code.org App Lab project',
    title: 'Calculator', year: '2021',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'A calculator web app built with JavaScript on Code.org for AP Computer Science Principles in Fall 2021, my sophomore year.',
      'Beyond the four basic operations it handles squares, square roots, arbitrary exponents, reciprocals, percentages, negation, powers of ten and π, with a display that truncates long results, a backspace for single characters, a full reset, click sounds on every button, and input validation that refuses invalid sequences like two decimal points in one number.',
      'It is small, but it is where I learned to manage state and guard user input properly.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/3WR9OYo6Ec9k-4s11Py6MJgsYf2YXyuzsq3icY61NWg' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Calculator' },
    ],
  },
  'hs-periodic-table': {
    img: 'highschool/periodic-table.png', alt: 'Periodic Table, a Code.org App Lab project',
    title: 'Periodic Table', year: '2022',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'A periodic table web app built with JavaScript on Code.org as my AP Computer Science project in Spring 2022, sophomore year.',
      'It shows all <b>118 elements</b> laid out in periodic-table order with atomic number, symbol, name, phase at room temperature, type, atomic weight, density, melting point and boiling point; you can search by name, symbol or atomic number with partial matches, page through the table, or hit a button for a random element.',
      'The whole dataset is hard-coded into the app so it works offline, which meant organising 118 elements into parallel arrays and keeping retrieval fast: the main problem the project actually taught me.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/n4gY-ijCWHme3Gd-qkeYFzcloQkXAf257XCrDwGSxRg' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Periodic-Table' },
    ],
  },
  'hs-games': {
    img: 'highschool/games.png', alt: 'Games: Hangman, Wordle and Two-Player Checkers',
    title: 'Games', year: '2022',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'Three classic games bundled into one Code.org web app. It began in Spring 2022, after my AP exams in 10th grade, as a Hangman game to cure boredom; Wordle followed soon after, the app got renamed “Games”, and then Checkers took over most of the effort.',
      '<b>Hangman</b> has multiple categories (countries, languages and more) with the classic gallows drawing updating on every wrong guess. <b>Wordle</b> is the five-letter guessing game with colour-coded feedback, checked against a full word list so only real words count. <b>Checkers</b> is two-player on a simplified board with single captures and detection of blocked pieces.',
      'Checkers was by far the biggest and most exciting thing I had written at that point, and the first time I had to hold a whole game state in my head.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/40V7TcnK87l1VxSAjbI-VFHSF06Hk2F6qvp6tzq_kRM' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Games' },
    ],
  },
  'hs-order66': {
    img: 'highschool/order66.png', alt: 'Star Wars: Order 66, a Scratch game',
    title: 'Star Wars: Order 66', year: '2021',
    grade: '10th grade · my first ever',
    tags: 'Scratch · Game',
    long: [
      'A Star Wars game built in Scratch in 10th grade, and the very first thing I ever made: play through Order 66 by dragging blocks together, before I had written a line of real code.',
      'It has no repository and no README — Scratch is the whole record of it, and it still runs in the browser on the project page.',
      'Everything else on this page came after it.',
    ],
    links: [
      { label: 'Play on Scratch ↗', href: 'https://scratch.mit.edu/projects/566525662/' },
    ],
  },
  'hs-periodic-table-explorer': {
    img: 'highschool/periodic-table-explorer.png', alt: 'Periodic Table Explorer, a Java console application',
    title: 'Periodic Table Explorer', year: '2023',
    grade: '11th grade',
    tags: 'Java · Console',
    long: [
      'An interactive Java console application for exploring, searching and testing yourself on the periodic table, written in Spring 2023, my junior year, as my <b>IB Computer Science SL Internal Assessment</b>.',
      'It was built for a chemistry teacher who wanted a free tool for her students after the equivalent features on Quizlet went behind a paywall. It lists all 118 elements with their attributes in order, searches by name or symbol, and generates customisable quizzes: free-response, multiple-choice or a mix, over a chosen atomic-number range, with optional hints. Under the hood it is object-oriented Java with recursion, 2D arrays and nested loops.',
      'My class was the first at our school to take IB Computer Science, so we were the test group, with limited resources and prep time for the students and the teacher alike. I finished with an <b>A</b> in the class and the highest score in it, a <b>6/7</b> on the IB Computer Science SL exam.',
    ],
    links: [
      { label: 'Codingrooms ↗', href: 'https://app.codingrooms.com/w/Yxexan1LM35u' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Periodic-Table-Explorer' },
    ],
  },

};
