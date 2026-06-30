/* apps-data.js — single source of truth for every app/bot "card".
   Edit an app HERE once and it updates on every page that lists it
   (projects.html, star-wars.html, al-islam.html). cards.js does the rendering.

   Field reference (all optional unless noted):
     icon      required — path under assets/img/  (e.g. 'apps/datapad.jpg')
     alt       required — icon alt text
     title     required — card heading
     sub       required — small line under the title (date or tagline)
     desc      required — paragraph
     tags      required — footer tech line (use ' · ' separators)
     links     footer links: [{ label, href }]   (omit for a dead app)
     feature   true  -> adds .app-card--feature
     dead      true  -> adds .app-card--dead (no links; shows deadNote instead)
     deadNote  text shown in place of links when dead
     badge     { text, href? , dead? }  -> ribbon in the top-right of the icon row
     cat       { label, href, cls }  -> theme pill ("Star Wars ↗" / "Islamic ↗"),
               only rendered on pages that opt in via data-cards-cat
     shots     award screenshots: [{ src, alt, caption, imgClass? }] (src under assets/img/) */

window.APP_CARDS = {

  /* ---- UCI Work ---- */
  'zotfinder': {
    icon: 'apps/zotfinder.jpg', alt: 'ZOTFinder app icon',
    title: 'ZOTFinder', sub: '2024 · Interactive campus map',
    desc: 'A free interactive campus map for UCI — search buildings, find professor offices, view emergency info, and get directions with estimated travel times.',
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/zotfinder/id915256719?platform=iphone' }],
  },
  'uci-now': {
    icon: 'apps/uci-now.jpg', alt: 'UCI Now app icon',
    title: 'UCI Now', sub: '2024 · Student Center companion',
    desc: 'Navigate the Student Center, book study rooms, find Ring Mall events, and view real-time campus activities with searchable maps and listings.',
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-now/id1382415698?platform=iphone' }],
  },
  'uci-esports': {
    icon: 'apps/uci-esports.jpg', alt: 'UCI Esports app icon',
    title: 'UCI Esports', sub: '2025 · Arena &amp; events',
    desc: 'Check arena hours, reserve PCs, discover tournaments and events, watch live Twitch streams, and get reminders so you never miss a match.',
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-esports/id6751213697' }],
  },
  'peterplate': {
    icon: 'apps/peterplate.jpg', alt: 'PeterPlate app icon',
    title: 'PeterPlate', sub: '2025 · Dining menu viewer',
    desc: "A menu viewer for UCI's Brandywine and Anteatery dining halls — browse current and upcoming menus, check allergen and dietary info, follow dining events, and rate dishes to plan your meal swipes and nutrition goals.",
    tags: 'Web · TypeScript · Next.js',
    links: [
      { label: 'Website ↗', href: 'https://peterplate.com/' },
      { label: 'GitHub ↗', href: 'https://github.com/icssc/PeterPlate' },
    ],
  },

  /* ---- Star Wars ---- */
  'aurebesh-translator': {
    icon: 'apps/aurebesh-translator.jpg', alt: 'Aurebesh Translator app icon',
    title: 'Aurebesh Translator', sub: 'October 22, 2024',
    desc: 'The free version of Datapad — a simple, ad-free way to translate between English and Aurebesh, fully offline, with a distraction-free interface.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    cat: { label: 'Star Wars ↗', href: 'star-wars.html', cls: 'app-cat--starwars' },
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/aurebesh-translator/id6670201513?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Aurebesh-Translator' },
    ],
  },
  'datapad': {
    icon: 'apps/datapad.jpg', alt: 'Datapad app icon',
    title: 'Datapad', sub: 'June 26, 2023',
    desc: 'The ultimate tool for Star Wars fans to explore and translate the galactic alphabet Aurebesh in all its forms — a custom Aurebesh keyboard, immersive features, and a galactic-themed interface.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Top 10 · Entertainment' },
    cat: { label: 'Star Wars ↗', href: 'star-wars.html', cls: 'app-cat--starwars' },
    shots: [
      { src: 'awards/datapad-chart.jpg', alt: 'Datapad ranked #10 on the App Store Entertainment Top Charts', caption: '#10 · Top Charts' },
      { src: 'awards/datapad-rating.jpg', alt: 'Datapad App Store listing showing a 4.9 star rating', caption: '#11 · Top Charts' },
    ],
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/datapad-aurebesh-translator/id6450498054?platform=iphone' }],
  },
  'sabacc-droid': {
    icon: 'bots/sabacc-droid.png', alt: 'Sabacc Droid icon',
    title: 'Sabacc Droid', sub: '2024 · Play Sabacc on Discord',
    desc: 'A Discord bot that brings the Star Wars card game Sabacc to your server — multiplayer rounds, rules variants, and a galaxy-flavored interface.',
    tags: 'Discord · Python',
    cat: { label: 'Star Wars ↗', href: 'star-wars.html', cls: 'app-cat--starwars' },
    links: [
      { label: 'Add to Discord ↗', href: 'https://discord.ly/sabaac-droid' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Sabacc-Droid' },
    ],
  },
  'aurebesh-droid': {
    icon: 'bots/aurebesh-droid.png', alt: 'Aurebesh Droid icon',
    title: 'Aurebesh Droid', sub: '2025 · Aurebesh Translator on Discord',
    desc: 'Translate English to and from Aurebesh right inside Discord — fast, server-friendly, and written in C++ for speed.',
    tags: 'Discord · C++',
    cat: { label: 'Star Wars ↗', href: 'star-wars.html', cls: 'app-cat--starwars' },
    links: [
      { label: 'Add to Discord ↗', href: 'https://discord.ly/aurebesh-droid' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Aurebesh-Droid' },
    ],
  },

  /* ---- Islam ---- */
  'al-adhan': {
    icon: 'apps/al-adhan.jpg', alt: 'Al-Adhan | Prayer Times app icon',
    title: 'Al-Adhan · Prayer Times', sub: 'December 31, 2023',
    desc: 'An offshoot of Al-Islam that enhances daily worship with precise prayer times, real-time qibla direction, and a unique Traveling Mode for on-the-go adjustments.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    cat: { label: 'Islamic ↗', href: 'al-islam.html', cls: 'app-cat--islamic' },
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/al-adhan-prayer-times/id6475015493?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Al-Adhan-Prayer-Times' },
    ],
  },
  'al-islam': {
    icon: 'apps/al-islam.jpg', alt: 'Al-Islam | Islamic Pillars app icon',
    title: 'Al-Islam · Islamic Pillars', sub: 'July 26, 2023',
    desc: 'An all-in-one companion for lifelong Muslims and converts alike — Traveling Mode, Beginner Arabic Mode, prayer times, qibla direction, Quran access, and tools to deepen faith and connect with Allah.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Congressional Challenge ’23', href: 'https://www.congressionalappchallenge.us/' },
    cat: { label: 'Islamic ↗', href: 'al-islam.html', cls: 'app-cat--islamic' },
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
    title: 'Al-Quran · Beginner Quran', sub: 'December 26, 2023',
    desc: 'Makes learning and studying the Holy Quran accessible — Arabic Beginner Mode, ayah sharing, recitations, and tools for enhancing your spiritual journey.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    feature: true,
    badge: { text: '🏆 Swift Student Challenge ’24', href: 'https://developer.apple.com/swift-student-challenge/' },
    cat: { label: 'Islamic ↗', href: 'al-islam.html', cls: 'app-cat--islamic' },
    shots: [
      { src: 'awards/al-quran-ssc.jpg', alt: 'Swift Student Challenge 2024 award for Al-Quran', caption: 'Swift Student Challenge', imgClass: 'shift-right-lg' },
      { src: 'awards/al-quran-apple-letter.jpg', alt: 'Apple Worldwide Developer Relations letter congratulating Abubakr Elmallah', caption: 'Apple · WWDC letter' },
    ],
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/al-quran-beginner-quran/id6474894373?platform=iphone' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Al-Quran-Beginner-Quran' },
    ],
  },

  /* ---- Deprecated ---- */
  'icoi': {
    icon: 'apps/icoi.jpg', alt: 'Islamic Center of Irvine (ICOI) app icon',
    title: 'Islamic Center of Irvine', sub: 'October 3, 2023',
    desc: 'Built for the Irvine Muslim community — accurate mosque prayer times, important links, Quran access, Islamic tools, and local business support.',
    tags: 'iOS · iPadOS · watchOS · macOS',
    dead: true,
    deadNote: 'No longer available — taken off the App Store',
    badge: { text: 'Deprecated', dead: true },
    cat: { label: 'Islamic ↗', href: 'al-islam.html', cls: 'app-cat--islamic' },
  },

};
