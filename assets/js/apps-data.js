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
               Besides paragraph strings an entry can be { h: 'Heading' },
               { list: ['…', …] } or { facts: [['6,236', 'ayahs'], …] }
               (see block() in cards.js), which is what keeps the longer
               write-ups readable.
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

// date: release date, or the start of my contribution to an existing project.
// Keep only the precision known; equal dates retain their authored order.
// The high-school projects use the day each was created, read from Scratch's
// and Code.org's own project records.
window.APP_CARDS = {

  /* ---- UCI Work ---- */
  'zotfinder': {
    date: '2025-05-29',
    icon: 'apps/zotfinder.jpg', alt: 'ZOTFinder app icon',
    title: 'ZOTFinder', sub: 'September 14, 2014 · Remastered by me May 29, 2025',
    desc: 'A free interactive campus map for UCI. Search buildings, find professor offices, view emergency info, and get directions with estimated travel times. On the App Store since 2014; I rewrote it from the ground up in SwiftUI for the 2025 remaster, giving it a brand new modern look.',
    long: [
      'ZOTFinder is the official companion app for navigating the University of California, Irvine. This all-in-one interactive campus map helps students, staff and visitors search for buildings, locate professor offices, explore campus services, access emergency information, and get walking directions with estimated travel times. With its focus on accessibility, safety and ease of use, ZOTFinder makes sure you never get lost on campus again.',
      { facts: [['3.1M+', 'lifetime sessions'], ['85%', 'fewer crashes'], ['40%', 'faster loads'], ['486', 'buildings mapped'], ['279', 'campus services'], ['4.0.4', 'current version']] },
      { h: 'The map' },
      { list: [
        '<b>Search</b> across buildings, departments and services, scoped or all at once, ranked the way people actually type: an exact short name first, then a prefix, then an acronym (so “ISEB” finds the Interdisciplinary Science and Engineering Building), then anything containing it, then your own nicknames. The matching text is highlighted, and your last five destinations are a tap away.',
        '<b>Walking directions</b> with the time and distance, a GO button that starts navigation, VoiceOver announcing each step, and a hand-off to Apple Maps. Tap a marker, tap any place on the map, or long-press to drop a pin anywhere.',
        '<b>Favourites</b> with your own nickname and waypoint colour, shown on the map as coloured markers.',
        'Every building and service has a detail sheet with its photo, a phone number to tap and its website.',
        'Map layers for the <b>81 emergency assembly points</b>, the <b>155 blue-light emergency phones</b> and the campus restrooms, and a custom dark map style.',
      ] },
      { h: 'Safety' },
      'A Procedures tab carries UCI Emergency Management’s response procedures and preparedness guide, loaded during the launch animation so they are ready before anyone needs them. The Dialer tab puts ten numbers one tap away, each with a confirmation: 911, Police Dispatch, the Community Safety Ambassadors, the Counseling Center, Student Health, Emergency Management, Environmental Health &amp; Safety, the Facilities service desk, OIT, and the UCI Emergency Info Line. A full accessibility statement, Dynamic Type limits and Reduce Motion support run throughout.',
      { h: 'The remaster' },
      'I fully remastered ZOTFinder from UIKit to SwiftUI during my freshman year at UCI, rebuilding the app from the ground up with improved performance, a cleaner interface and smoother navigation. The SwiftUI rewrite modernised the entire experience across iPhone, iPad and Mac, making ZOTFinder faster, smarter and more helpful than ever.',
      'The old app was built on storyboards and six CocoaPods; the new one depends on exactly two packages (the Google Maps SDK and a JSON parser), adds a proper dark mode, runs on iPhone, iPad, Mac and Apple Vision Pro, and loads 40% faster. Refactoring the legacy code cut crashes by 85%, from about 10,400 a month to under 1,500. Version 3.4.2 brought Liquid Glass in November 2025, and 4.0 in April 2026 added favourites, ranked search and a new animated launch screen in UCI blue and gold.',
      { h: 'Finding Oso Tower' },
      'In September 2026 a first-year student could not find their own dorm in the app. Oso Tower was not in it. The audit that followed added Oso Tower, The Oasis, the Meditation Space, the Basic Needs Center and the Center for Student Leadership, fixed a misspelt building, and turned up something bigger: the loader had been throwing away 418 building photographs on the way in. The fix was to merge the live campus data with the places only the app’s own bundled lists knew about, matching names that are spelled slightly differently only when their coordinates agree exactly, so a typo can join two records but two different buildings never can.',
      'Campus data now arrives through a cascade that always ends in an answer: a cache less than a week old (with no network at all), then the campus server with a five-second limit, then the cache at any age, then the lists built into the app.',
      { h: 'Around it' },
      'ZOTFinder, UCI Now and UCI Esports each open the others with one tap. I also review the Android team’s work on the same app: when ZOTFinder for Android reached parity with iOS in September 2026, my review moved its search off the main thread with a debounce, drew the route the moment you press GO the way iOS does, and added regression tests. Ten documents on the architecture, the campus data and the backend now sit beside the code.',
      'Built as Lead Mobile &amp; Backend Developer for <b>UCI Student Center &amp; Event Services</b>. The app has been on the App Store since 2014; the remaster shipped on <b>May 29, 2025</b>.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/zotfinder/id915256719?platform=iphone' }],
  },
  'uci-now': {
    date: '2025-08-31',
    icon: 'apps/uci-now.jpg', alt: 'UCI Now app icon',
    title: 'UCI Now', sub: 'July 23, 2018 · Remastered by me August 31, 2025',
    desc: 'Navigate the Student Center, book study rooms, find Ring Mall events, and view real-time campus activities with searchable maps and listings. On the App Store since 2018; I rewrote it from the ground up in SwiftUI for the 2025 remaster, giving it a brand new modern look.',
    long: [
      'UCI Now is the official companion app for the UCI Student Center. This free campus app helps students and visitors navigate the Student Center, reserve Courtyard Study Rooms, browse live events across campus, and explore Ring Mall activities like food sales and club fundraisers. With searchable event listings, interactive maps and real-time study room availability, UCI Now puts everything happening at UCI right at your fingertips.',
      { facts: [['0', 'third-party libraries'], ['~18', 'libraries it used to need'], ['4', 'Student Center floors mapped'], ['59', 'rooms placed on the map'], ['40%', 'faster loads'], ['4.0.3', 'current version']] },
      { h: 'What is on' },
      { list: [
        '<b>Student Center events</b>, today and upcoming, searchable by name, place or time and sortable five ways, including by floor. Each event says where it is and which level, with a button that shows you on the map.',
        '<b>A floor map of the Student Center</b>, all four levels, with 59 rooms placed on it (from the Pacific Ballroom to the Crystal Cove Auditorium) and today’s events drawn as dots on the rooms they are in.',
        '<b>Ring Mall</b>: what the student organisations are doing on the Ring Mall, with each organisation, its spot and a photo of the booth, a map of the mall, and recurring events folded into a single series instead of repeating down the list.',
      ] },
      { h: 'Booking a study room, natively' },
      'Version 4.0.3 (June 2026) brought Courtyard Study Lounge reservations into the app itself. Sign in with your UCInetID, pick a day, see which rooms are free on a floor plan of the lounge with the open ones shaded green, and book one of the four daily blocks (8 to 11, 12 to 3, 4 to 7, or 8 to 10:30 at night). Your next booking and the ones after it are listed with a cancel button, alongside how many of the quarter’s hours you have left: up to fifteen reservations a quarter, to a limit of forty hours. Commuter Lounge lockers are a tap away too.',
      { h: 'The remaster' },
      'I completely remastered the app from UIKit to SwiftUI during my freshman year at UC Irvine, giving it a modern, smooth and intuitive user experience across iPhone, iPad and Mac. The rebuild focused on performance, accessibility and real-time updates, turning the original legacy app into a fast, responsive and visually immersive campus companion.',
      'The old app was 146 Swift files and about 17,500 lines resting on around eighteen third-party libraries, including an indoor turn-by-turn wayfinder that ran on Bluetooth beacons. The new one is 43 files and about 8,600 lines, and it uses no third-party code at all: everything in it is Apple’s. Events are parsed from the Student Center’s own feed, cached for the day, and streamed into the lists as they arrive, with a guard that stops an older load from overwriting a newer one. Load times fell by 40%.',
      'The remaster was built screen by screen from the end of May 2025, with prototypes of the Student Center and Ring Mall views through June and version 3.7.0 at the end of August. Since then it has gained an animated launch screen, a splash screen for ZotQuest week, Liquid Glass on iOS 26, and version 4.0 in April 2026.',
      { h: 'Around it' },
      'UCI Now, ZOTFinder and UCI Esports each open the others with one tap. On the Android side, when Google Play’s reviewers could not get past university sign-in to test study room booking, I built a reviewer demo mode for the Android app’s study room and Commuter Lounge screens, with tests, so reviewers can try it without a real student account.',
      'Built as Lead Mobile &amp; Backend Developer for <b>UCI Student Center &amp; Event Services</b>. The app has been on the App Store since 2018; the remaster shipped on <b>August 31, 2025</b>.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-now/id1382415698?platform=iphone' }],
  },
  'uci-esports': {
    date: '2026-03-02',
    icon: 'apps/uci-esports.jpg', alt: 'UCI Esports app icon',
    title: 'UCI Esports', sub: 'March 2, 2026 · Arena &amp; events',
    desc: 'Check arena hours, reserve PCs, discover tournaments and events, watch live Twitch streams, and get reminders so you never miss a match.',
    long: [
      'UCI Esports is the official companion app for the UCI Esports Arena, the 3,500-square-foot arena in the Student Center. This free campus app helps students check arena hours, see which gaming PCs are free, discover upcoming tournaments and events, and follow the UCI Esports community on Twitch, Discord and everywhere else it lives.',
      { facts: [['Solo', 'iOS developer'], ['~15.4K', 'lines of Swift'], ['5', 'tabs'], ['7', 'reward tiers'], ['85', 'backend tests'], ['1.0', 'shipped March 2, 2026']] },
      { h: 'In the app' },
      { list: [
        '<b>Home</b>: today’s hours and whether the arena is open, the events you have registered for, pricing, parking and payment information, an FAQ, support, and every one of the program’s channels.',
        '<b>Arena</b>: live open or closed status and the week’s hours, cached so the screen still works with no signal, and <b>live PC availability</b> from the arena’s own system, “X of Y PCs available now”, laid out row by row the way they sit in the room. A reservation form for up to nine PCs is in place; connecting it straight to the arena’s booking system is next on the roadmap.',
        '<b>Events</b> from the program’s calendar, featured and explore sections, search and a calendar view, with the ones you save or register for synced to your profile, and reminders at the start or 15, 30 or 60 minutes before. The app only asks for notification permission the first time a reminder needs it, and only offers directions when an event is somewhere you can walk to rather than on Discord.',
        '<b>Profile</b>: sign in with your UCInetID, or use the app as a guest with everything kept on the phone; choose one of ten avatars; and link your arena account to see its balance.',
      ] },
      { h: 'Rewards, arriving in 1.2' },
      'Version 1.2, on its way to the App Store, adds a Rewards tab with seven “Peter” tiers, each with its own anteater sticker, from Dorm to Casual, Ranked, Elite, Master, Champion and Legendary at 3,600 XP. Checking in at an event earns 25 XP and every hour of arena time bought earns 15, and each tier unlocks something real, from play time to merch. Rewards are claimed only at the front desk: the student shows a QR code, the desk scans it, and the phone watches until it is fulfilled, so an offer can never be spent without the time actually being credited.',
      'The same release brings <b>staff mode</b> into the app. Front-desk staff sign in with their own accounts and get a Staff switch in the Profile tab: look a student up by UCInetID or by scanning their QR code, check them in to an event, fulfil a reward, and, for managers, add time or balance.',
      { h: 'The backend' },
      'The app has a backend of its own that I wrote for it, with 85 tests, which sits between the app and the arena’s booking system so that system’s credentials never leave the server. Anything that touches money or XP needs a second, staff-only key and refuses to act if it is misconfigured. Every request that changes a balance carries an id, so a retry on a flaky connection can never credit anyone twice, and records are updated with optimistic locking so two desk staff can never overwrite each other. Every staff action, including refused ones, lands in an audit log, which is the first record the arena has had of balance additions and comp time. The rewards catalogue and its numbers are served from the backend, so the economy can be tuned after launch without shipping a new app.',
      { h: 'From scratch' },
      'Written in SwiftUI from the first line, so it runs on iPhone, iPad and Mac from a single codebase. It is about 15,400 lines, built across a year: the first tab view in September 2025, the login screen that autumn, the arena and events in December, PCs, the profile and notifications in January, full guest mode in February, and version 1.0 on the App Store on March 2, 2026. The backend followed in June and the rewards over the summer. A documentation set sits beside it, from the full API reference to a plain-language guide for the front-desk staff.',
      'An Android version, written by a teammate, mirrors it.',
      'Built as Lead Mobile &amp; Backend Developer for <b>UCI Student Center &amp; Event Services</b>, and the first of the three UCI apps that is mine from scratch rather than a remaster.',
    ],
    tags: 'iOS · Swift · SwiftUI',
    links: [{ label: 'App Store ↗', href: 'https://apps.apple.com/us/app/uci-esports/id6751213697' }],
  },
  'real-time-ops': {
    date: '2025',
    /* Internal staff tool: unlisted, SSO-gated, and not on the App Store.
       Deliberately no infrastructure details and no link - the site sits
       behind UCI Shibboleth, so a link is useless publicly and naming the
       stack of a private system serves nobody. Keep it that way. */
    icon: 'apps/real-time-ops.jpg', alt: 'SCES Real-Time Ops app icon',
    title: 'SCES Real-Time Ops', sub: 'Internal tool \u00b7 Maintained by me since 2025',
    desc: 'The in-house operations app for UCI Student Center &amp; Event Services. Operations staff use it to run shift reports, daily logs, event information and room checks. An internal staff tool: unlisted, not on the App Store, and not publicly accessible.',
    long: [
      'SCES Real-Time Ops is the internal iOS app the operations teams at UC Irvine Student Center &amp; Event Services run their shifts on. It replaced the clipboards, group texts and end-of-shift email scramble with one place to log what happened, look up what is happening next, and send the report before clocking out. Ops, Housekeeping, the Building Leads, the Information Center, Room Check and Reservations all work out of it, and each person sees only the parts their role grants them.',
      { facts: [['2018', 'in service since'], ['300+', 'commits since 2018'], ['12', 'staff workflows in one app'], ['45', 'bugs fixed in one sweep'], ['107', 'app and backend tests'], ['14', 'documents in its handbook']] },
      { h: 'What staff use it for' },
      { list: [
        '<b>Ops Shift Report</b>, the biggest feature. An Ops Manager fills it in as the shift goes (staffing needs, crew checks, event notes, incidents, esports notes, inventory, equipment requests, manager notes) and sends a formatted Daily Shift Report email with the day’s photos attached, while the same report is written to the database. The report survives the app being closed mid-shift.',
        '<b>Housekeeping</b>: staffing, issues, four area checklists, completed tasks and night custodial assignments across twelve areas, sent as a report of its own.',
        '<b>Information Center</b>: a log of every visitor and phone interaction, who is on shift, a live lost and found, and a daily report.',
        '<b>Infractions</b>: Ring Mall and Conference Center leads issue verbal or written warnings against live bookings. The form fills itself in from the booking, offers the next citation number, and warns if that organisation has already been warned today.',
        '<b>Ring Mall Spaces</b> and <b>Conference Center</b>: today’s bookings across the thirteen outdoor Ring Mall spaces and the indoor rooms, each with its diagram, equipment and setup notes.',
        '<b>Room Check</b>: a structured walk-through of a room before its event (setup, aesthetics, damage with photos) and a history of every check.',
        '<b>Door Check</b>: scan the QR code on each door during lock-up; a code the app does not know is rejected rather than recorded.',
        '<b>Building Lead Log</b>: head counts across 44 study, lounge and meeting spaces, the golf-cart check, and scheduled reminders for both.',
        'A <b>VIP Phone Log</b>, a cross-team <b>Latest Updates</b> feed of what everyone did today, and permission-gated <b>user administration</b>.',
      ] },
      { h: 'Keeping it running' },
      'I am the current maintainer and iOS developer. The app has been in service since 2018 and passed through more than a dozen student developers before me; I took it over in 2025. It is a large legacy UIKit codebase, and the work is the unglamorous kind that keeps a live system running: every release from version 2.7.4 to 2.8.2 (September 2026) is mine, and I own its database migrations, backend tests and documentation.',
      'In August 2026 I did a stability pass aimed at crashes, hangs and silent data loss, without changing a single screen. Sending a shift report with photos had been slow, crash-prone and memory-hungry, so photos are now downscaled when they are saved, decoded straight to attachment size and attached one at a time, which keeps memory flat however many there are; downloads got timeouts, so one bad photo can no longer hold up a report; and several places where one team’s data was being saved under another team’s key were untangled.',
      'In September 2026 I followed it with a full bug sweep across the app and backend: <b>45 bugs</b>, each written up with what went wrong and how it was fixed. Some were crashes. The ones I care most about were the quietly wrong ones: a form that could fill itself from the wrong booking, a log-out that left the next person on a shared phone signed in as the previous one, and a feed that had been answering every request with an error for a long time. Reports that fail to upload now retry on their own, carrying an id that makes a repeated attempt safe.',
      'The handbook I wrote for it runs to fourteen documents: the architecture, a feature-by-feature guide, the shared code and its rules, building and releasing, troubleshooting, procedures, and an incident history that explains why parts of the code look the way they do, so the next developer does not have to rediscover any of it.',
      'My first job there, in April 2025, was a smaller one in the same family: bug fixes and a cleanup of the Locker Kiosk app, where students enter an access code to check a reserved locker in or out.',
      'It is distributed internally to staff and sits behind university single sign-on, so there is nothing here to link to.',
    ],
    tags: 'iOS \u00b7 Swift \u00b7 Python \u00b7 Internal tool',
  },

  'peterplate': {
    date: '2025-11',
    icon: 'apps/peterplate.jpg', alt: 'PeterPlate app icon',
    title: 'PeterPlate', sub: '2025 · Dining menu viewer',
    desc: "A menu viewer for UCI's Brandywine and Anteatery dining halls. Browse current and upcoming menus, check allergen and dietary info, follow dining events, and rate dishes to plan your meal swipes and nutrition goals.",
    long: [
      "PeterPlate is the dining companion for UC Irvine: a menu viewer for Brandywine and the Anteatery that makes the day's food actually legible. Browse current and upcoming menus, check allergen and dietary information, follow special dining events, and read student ratings so you know which dishes are worth the swipe.",
      { facts: [['12', 'developers on my team'], ['30+', 'contributors since 2023'], ['1,698', 'commits in the repo'], ['13', 'tables in the database'], ['68', 'PRs in one release'], ['50+', 'commits of mine']] },
      { h: 'My role' },
      'I am a Lead Software Developer at <b>ICSSC</b>, the Information &amp; Computer Science Student Council, where I lead the twelve-person team building PeterPlate, live on the web and on iOS. It began life as ZotMeal in 2023 and has had more than thirty contributors since; I joined in late 2025 and have worked across the whole stack, from the database to the last pixel of a dish card, as well as running its releases.',
      { h: 'What I built' },
      { list: [
        '<b>My Account</b> (December 2025): an account page and its sidebar link, with a different experience for signed-in and signed-out visitors, and later a guest menu for anyone not signed in.',
        '<b>Dark mode</b> (January 2026): the theme system, a toggle in the sidebar, and every card readable in both themes, followed by a sweep that replaced the last stray colours.',
        '<b>Database modernisation</b> (February 2026): modern restaurant ids, indexes and numeric fields, and dishes moved from a single menu column to a proper join table, with the migrations and documentation to match.',
        '<b>Meal cards</b> (February 2026): an “Add to meal tracker” button and a scrolling drawer, so logging what you ate takes one tap from the menu.',
        '<b>Installable app</b> (March 2026): the first progressive web app setup, with the manifest, icons, a service worker and the install flow.',
        '<b>Moving to AnteaterAPI</b> (April 2026): migrating the dining types, dates and payloads onto the campus-wide AnteaterAPI and cleaning up after it, part of the 126-file change that switched PeterPlate over.',
        '<b>End-of-year cleanup</b> (June 2026): onboarding choices mapped properly onto the database, and a time-zone bug fixed that could show you the wrong day’s menu depending on the time of night.',
        'Dish cards matched to the Figma designs for the compact mobile view, dark mode and staging fixes for the new feedback form, a login button closer to the design, and a stream of routing and type fixes.',
      ] },
      { h: 'Shipping it' },
      'I own the release merges. The last one, in August 2026, brought 68 pull requests from the development branch into production in a single reviewed merge.',
      { h: 'The stack' },
      'It is a web project rather than an app: a Next.js front end with shadcn/ui components and Zustand for state, talking to a PostgreSQL database through Drizzle ORM and tRPC on AWS, all inside a Turborepo monorepo written in TypeScript and Tailwind. The database has thirteen tables, the API runs on AWS Lambda over RDS and deploys through GitHub Actions, and tests run against real Postgres in Docker containers. The iOS app wraps the same site.',
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
    date: '2024-10-22',
    icon: 'apps/aurebesh-translator.jpg', alt: 'Aurebesh Translator app icon',
    title: 'Aurebesh Translator', sub: 'October 22, 2024',
    desc: 'The free version of Datapad: a simple, ad-free way to translate between English and Aurebesh, fully offline, with a distraction-free interface.',
    long: [
      'Aurebesh Translator is the free companion to Datapad: a simple, ad-free iOS app that translates between English and Aurebesh in a clean, distraction-free interface. It is deliberately plain and native. If Datapad is the collector’s edition, this is the one you hand to a friend who just wants to read the alphabet.',
      { facts: [['26', 'letters, Aurek to Zerek'], ['8', 'digraphs'], ['15–50pt', 'text, or Dynamic Type'], ['2.0', 'current version'], ['0', 'ads, accounts or trackers']] },
      { h: 'How it translates' },
      'The translation is typographic. Two editors are stacked on one screen and bound to the same string, one set in English and one in Aurebesh, so whatever you type in either appears in the other instantly and exactly, with nothing to get wrong in between. An Encoder / Decoder switch decides which way you are working.',
      'In Decoder mode the app brings up its own glyph keyboard: a seven-column grid of Aurebesh characters with pages for the letters, the digraphs and the special characters, a key that flips the labels between English and Aurebesh while you learn them, and a long-press to jump between pages.',
      { h: 'What else is in it' },
      { list: [
        'An <b>alphabet reference</b> with search: all 26 letters from Aurek to Zerek by their canonical names, the eight digraphs (Cherek, Enth, Onith, Krenth, Nen, Orenth, Shen and Thesh), and the numbers and symbols.',
        '<b>Settings</b> for text size (15 to 50 points, or follow Dynamic Type), digraphs on or off, haptics, and a System, Light or Dark theme, all in a single gold accent.',
        'A review prompt that waits for three minutes of real use before it ever asks.',
        'It runs on iPhone and iPad, and on Apple silicon Macs as the iPad app.',
      ] },
      { h: 'Where it came from' },
      'Published on the App Store on <b>October 22, 2024</b>, in my first quarter of college. Its credits screen links back to where it started: the Star Wars Datapad I built on Code.org in AP Computer Science Principles in 2021, when I was fifteen.',
      'Version 1.5 (September 2025) added the alphabet search and retired the Apple Watch app, to keep the free app focused on the one thing it does. Version 2.0 (May 2026) rebuilt the credits and made the review prompt far less pushy.',
      'It also has a React twin: the same app, rebuilt with React, Vite and Capacitor as a website that installs and works offline, and as an Android app. On Android it hides the system keyboard so its own glyph grid can take over, and publishes the real screen insets to the page so it can draw edge to edge.',
    ],
    tags: 'iOS · iPadOS · macOS',
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    /* App Store only: the GitHub repository this used to link is gone (404,
       and nothing under the account carries the app now) */
    links: [
      { label: 'App Store ↗', href: 'https://apps.apple.com/us/app/aurebesh-translator/id6670201513?platform=iphone' },
    ],
  },
  'datapad': {
    date: '2023-06-26',
    icon: 'apps/datapad.jpg', alt: 'Datapad app icon',
    /* the App Store name in full, styled like the Islamic apps' two-part
       names ("Al-Adhan · Prayer Times") rather than with the store's pipe */
    title: 'Datapad ·<br>Aurebesh Translator', sub: 'June 26, 2023',
    desc: 'The ultimate tool for Star Wars fans to explore and translate the galactic alphabet Aurebesh in all its forms, with a custom Aurebesh keyboard, immersive features, and a galactic-themed interface.',
    long: [
      'Datapad is a premium galactic translator for iPhone, iPad, Mac and Apple Watch, built for Star Wars fans to explore Aurebesh, Mando’a and Outer Rim scripts. It features immersive tools like digraph rendering, quiz-based learning, an Aurebesh keyboard, a camera that reads Aurebesh off the world around you, and a fully customisable galactic-themed interface, all while keeping everything offline and privacy-focused: no ads, no accounts, no tracking.',
      'It was my first app, published when I was seventeen, and it is the direct descendant of the Star Wars Datapad I made on Code.org in 10th grade: back then a real App Store version was the dream, and this is that dream shipped.',
      { facts: [['#10', 'App Store Entertainment chart'], ['25K+', 'installs'], ['99.9%', 'crash-free'], ['14', 'galactic scripts'], ['18', 'kyber crystals'], ['4.0.3', 'current version']] },
      { h: 'Fourteen scripts' },
      'Datapad writes in fourteen scripts, drawn from 23 bundled fonts, every one of them credited in the app to the fan typographers who made it:',
      { list: [
        '<b>Aurebesh</b> in six faces: Basic, Core, Droid, Nexus, Cantina and Pixel, each with a digraph variant that joins ch, ae, eo, kh, ng, oo, sh and th into their single glyphs.',
        '<b>Mando’a</b>, the Mandalorian script, in its New and Old forms.',
        '<b>Outer Rim</b> scripts: Basic, Old Tongue, Sith, Hive, Trade and Protobesh.',
        'And three English display faces, Standard, Galactic and Canon, for the other half of the screen.',
      ] },
      { h: 'The modules' },
      { list: [
        '<b>Transcoder</b>: translate either way between English and any script, live as you type.',
        '<b>Scanner</b>: point the camera at Aurebesh on a poster, a toy box or a screen and read it back in English (more on how it works below).',
        '<b>Databank</b>: the full alphabet, every letter by its canonical name, the digraphs, numerals and punctuation.',
        '<b>Archives</b>: Holo Records, a history of what you have translated, and Holo Entries, notes kept in script.',
        '<b>Trials</b>: The Gauntlet, a quiz over letters, digraphs and whole phrases, answered by typing or multiple choice, in script or in English.',
        '<b>Transmit</b>: turn a message into a floating holo-image in script, with the English beneath it if you like, ready to send to someone.',
        '<b>Crystal</b> and <b>System</b>: the look and feel, down to the last detail.',
      ] },
      { h: 'The Scanner' },
      'The Scanner is the piece of engineering I am proudest of in this app, because it reads Aurebesh from a photograph without a trained model at all. There is no dataset of Aurebesh photos to train one on, so it works from first principles instead: every glyph in every bundled font is rendered into a normalised template, the photo is cut into ink with an adaptive threshold, grouped into connected components, then lines, then words, and every blob is scored against the templates on four signals: its shape, its aspect ratio, its size relative to the line, and where it sits vertically. The image is deskewed first, and Apple’s Vision text recogniser runs alongside it to find any real English in the frame and take it out of the way. Whichever font’s templates score best wins, which is how the Scanner also works out which script it is looking at.',
      'It is about 1,450 lines of Swift on its own, and it was the headline of version 4.0, <i>The Optical Age</i>, in July 2026. It ships marked Beta, because honest is better than impressive.',
      { h: 'Beyond the app' },
      { list: [
        'A <b>system keyboard</b> with its keycaps drawn in Aurebesh and a crystal key that cycles the fonts, so you can learn the layout while typing anywhere on the phone.',
        '<b>Home and Lock Screen widgets</b>: a Galactic Chrono that tells the time in script, a Crystal Chrono, the Datapad emblem, a Glyph of the Day, your Last Transmission, the whole alphabet in the large size, and two Lock Screen accessories.',
        'An <b>Apple Watch app</b> with the Transcoder, Databank, Crystal and System on the wrist, and watch-face complications. Settings sync both ways between phone and watch: only real changes travel, the newer one wins, the iPhone wins a tie, and an update is never echoed back to where it came from.',
        '<b>Eleven alternate app icons</b>.',
      ] },
      { h: 'How it feels' },
      'Opening the app jumps to hyperspace: the launch is a real Metal shader, a per-pixel polar starfield that streaks as it goes. There is not a single sound file in the app; everything you feel is haptic, from named patterns for powering up, jumping and locking to a continuous Core Haptics lightsaber hum that plays while the menu is open. On iOS 26 the interface is Liquid Glass, with a fallback for everything older.',
      'Eighteen kyber crystals tint the whole interface, across three tiers, with a designer for your own. Two more are hidden: the Black and RGB crystals, unlocked by following the riddles in the credits (“Balance lies beyond the spectrum”, “Through shadows, power awaits”). The starfield can be off, static or dynamic, as streaks, stars or both; there is a scanline overlay; and Full Script Immersion turns nearly every element of the interface into Aurebesh, or whichever script you have chosen.',
      { h: 'The story so far' },
      'Published on the App Store on <b>June 26, 2023</b>, when I was a junior in high school. 🏆 It reached the <b>Top 10 on the App Store Entertainment chart</b>, peaking at #10, and has been updated ever since: version 3.6 in July 2025 brought Liquid Glass, the Trials, three new Aurebesh faces and four new Outer Rim scripts, and the jump from 3.6 to 4.0 alone touched 271 files and added nearly 13,000 lines. It is now around 19,000 lines of Swift across five targets: the app, the keyboard, the widgets, the Watch app and its complications.',
      'I have also rebuilt it in React 19 as an installable, offline website and an Android app through Capacitor, with every module except the Scanner, which is the one piece that has not made the crossing yet.',
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
  'aurebesh-academy': {
    date: '2026',
    icon: 'apps/aurebesh-academy.jpg', alt: 'Aurebesh Academy app icon',
    title: 'Academy | Aurebesh Trainer', sub: '2026 \u00b7 Learn to read Aurebesh',
    desc: 'A trainer for actually learning Aurebesh rather than just translating it: a full glyph databank, typed read and write drills over 3,200+ words, a rapid-fire quiz, and XP, ranks, streaks and achievements to keep you coming back.',
    long: [
      'Academy is the teaching half of the Aurebesh suite. Where Datapad translates for you, Academy makes you learn. It is the tool I wanted while I was learning to read Aurebesh myself: something that drills you until you stop sounding letters out and start reading words.',
      { facts: [['3,247', 'words to drill'], ['11', 'word categories'], ['10', 'ranks to climb'], ['12', 'achievements'], ['14', 'scripts in Transcode'], ['12', 'accent crystals']] },
      { h: 'Six modules' },
      { list: [
        '<b>Learn</b>: the Databank, covering all 26 letters with their canonical names, the 8 digraphs, numerals and punctuation.',
        '<b>Train</b>: Read and Write drills over more than 3,200 words. Read shows you a word in script and you type what it says; Write gives you the English and an on-screen Aurebesh keyboard, with optional glyph shuffling so you cannot lean on muscle memory, hints that put each letter’s name under its key, pages for digraphs and symbols, and caret keys for editing. Skip, Reveal and a pull-up Translation Key are there when you are stuck.',
        '<b>The Trials</b>: a rapid-fire multiple-choice quiz with three lives and a persistent high score, asking three kinds of question: which letter is this, which glyph writes it, and what is this glyph called.',
        '<b>Transcode</b>: a full translator across 14 scripts in the same 23 fonts as Datapad, with digraphs, copy, share, notes and a 50-entry history.',
        '<b>Holocron</b>: your progress, ranks and achievements.',
        '<b>System</b>: the look, the feel and the credits.',
      ] },
      { h: 'Eleven ways in' },
      'The drills draw from eleven categories: First Steps for absolute beginners, then General, Characters, Species, Planets (more than a thousand of them), Vehicles, Weapons, Andor, The Mandalorian and LEGO Sets, and finally Everything, de-duplicated so a word that lives in two lists does not come up twice as often.',
      { h: 'The Holocron' },
      'Progress is the point, so Academy keeps a Holocron. Every correct answer earns 10 XP (5 in First Steps) and a Trials run is worth double its score. XP carries you up ten ranks: Youngling, Initiate, Padawan, Apprentice, Scribe, Knight, Archivist, Master, Loremaster and, at 25,000 XP, Grand Master. It also keeps day streaks, per-category mastery, and twelve achievements to find:',
      { list: [
        'First Contact, In the Flow, Force Attuned and Century',
        'Scholar of Basic, Trial Ready and Trial Master',
        'Weeklong Vigil, Protocol Droid and Knighted',
        'Galactic Explorer and Cartographer',
      ] },
      { h: 'Where it comes from' },
      'Academy merges what Aurebesh Trainer 2.0 and Aurebesh Trainer Pro each did separately into one app, and adds the layers neither shipped: persistence, stats, achievements and the quiz. It also smooths the rough edges they had. Answers must match exactly rather than by prefix, a word never repeats back to back, keyboard shuffling actually shuffles, deleting from the start of an answer works, and everything you do is remembered between launches.',
      'It wears the Datapad design language: pure black, an animated starfield and accent-tinted holographic glass, in twelve crystals from Holo Blue and Jade to Nova and Electrum, or a colour of your own.',
      { h: 'How it is built' },
      'Written in SwiftUI, about 4,800 lines, with a small compatibility layer that keeps it running back to iOS 15. The app icon is drawn in code rather than in an image editor, and the App Store screenshots are taken by launching the app with arguments that jump straight to a given tab or drill, so they can be retaken after any change without tapping through by hand.',
      'A React port carries the same app to the web and to Android from one codebase.',
    ],
    tags: 'iOS \u00b7 SwiftUI \u00b7 React \u00b7 Android',
    cat: { label: 'Star Wars \u2197', href: '/star-wars/', cls: 'app-cat--starwars' },
  },

  'sabacc-droid': {
    date: '2024-11-14',
    icon: 'bots/sabacc-droid.png', alt: 'Sabacc Droid icon',
    title: 'Sabacc Droid', sub: 'November 14, 2024 · Play Sabacc on Discord',
    desc: 'A Discord bot that brings the Star Wars card game Sabacc to your server, with multiplayer rounds, rules variants, and a galaxy-flavored interface.',
    long: [
      'Sabacc Droid is a Discord bot and Python project that brings the four classic Star Wars Sabacc card games to life. Supporting Corellian Spike, Coruscant Shift, Kessel and Traditional Sabacc, it offers a fully interactive multiplayer Discord experience.',
      'With immersive mechanics, variant-specific rules and authentic designs inspired by Solo: A Star Wars Story, Galaxy’s Edge, Rebels, Star Wars Outlaws and more, Sabacc Droid lets fans enjoy the thrill of Sabacc right from their server with their friends.',
      { facts: [['500+', 'servers, across both bots'], ['4', 'variants of sabacc'], ['8', 'players at a table'], ['~5,200', 'lines of Python'], ['168', 'card images'], ['160', 'commits']] },
      { h: 'Sitting down at the table' },
      '<code>/sabacc</code> opens a picker for the four games (or <code>/random</code> deals you into one, with a random number of rounds and cards if you like), and each game has its own command for choosing rounds and starting hands. The lobby is a message with buttons: join, leave, read the rules, switch discarding on or off, and start once someone has sat down. Up to eight players can play at once.',
      'The trick that makes it work in a public channel is splitting what everyone sees from what only you see. The table shows whose turn it is and each player’s cards face down, so everyone knows how many you are holding but not what they are. Only the player whose turn it is can press “Play Turn”, and that opens their real hand privately, drawn as card art, with the moves available to them as buttons. At the end, every hand is turned over with its total and its name, and “Play Again” deals a new game with the same settings. Sit down alone and Lando Calrissian deals himself in, to give you someone to beat.',
      { h: 'Four games, four rulebooks' },
      { list: [
        '<b>Corellian Spike</b>, from Solo and Galaxy’s Edge: a 62-card deck of three suits running from −10 to +10 plus two zero-value sylops, doubled and shuffled. Draw, replace, discard, stand or junk; the aim is a hand that sums to zero, and thirteen hands are ranked from Pure Sabacc down, with tie-breaks all the way to the highest single card. Three of them, Sarlacc Sabacc, Twin Sun and Kessel Run, are hands I invented.',
        '<b>Coruscant Shift</b>, as played aboard the Halcyon on the Galactic Starcruiser: two dice are rolled when the table opens, a gold one setting the target number and a silver one the target suit. Each round you choose which cards to keep, and a card you keep is locked in for good. Closest to the target wins, then most cards in the target suit, and two sylops win outright.',
        '<b>Kessel</b>, from Star Wars Outlaws: two decks, positive Sand and negative Blood, and a hand that is always one of each. Draw from either, keep one card and send the other back. Impostor cards roll two dice at the end and let you choose your value, and a sylop takes the value of the card beside it.',
        '<b>Traditional</b>, as seen in Star Wars Rebels: a 76-card deck of Flasks, Sabers, Staves and Coins with sixteen face cards (The Idiot, Balance, Endurance, Moderation, The Evil One, the Queen of Air and Darkness, Demise and The Star), aiming at 23. There is no round limit: play goes on until someone calls “Alderaan” and everyone else gets one final turn. The Idiot’s Array, a zero, a two and a three, beats everything.',
      ] },
      { h: 'Under the hood' },
      'Written in Python on discord.py. Each hand is drawn as a single image: the card art is fetched in parallel, resized with Pillow and laid side by side onto one transparent canvas that is attached to the message, with a text-only fallback if an image ever fails. Every variant has its own colours, thumbnail and footer (“As seen in Star Wars Outlaws”), and the card art is credited to the fans who drew it. Games live in memory only: no personal data is collected or stored.',
      { h: 'History' },
      'Created on <b>November 14, 2024</b>, when I was a freshman in college. It began as a 227-line game of Corellian Spike in the terminal, Han against Lando, before moving onto Discord. Kessel arrived two weeks later, then Coruscant Shift and Traditional in February 2025, with the Alderaan call, a round counter and Lando to play against, and in March 2026 a random mode, tie-breaker fixes for every variant, and settings that carry over into the next game. It has 160 commits and is, with Aurebesh Droid, in more than 500 servers.',
    ],
    tags: 'Discord · Python',
    cat: { label: 'Star Wars ↗', href: '/star-wars/', cls: 'app-cat--starwars' },
    links: [
      { label: 'Add to Discord ↗', href: 'https://discord.ly/sabaac-droid' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Sabacc-Droid' },
    ],
  },
  'aurebesh-droid': {
    date: '2025-06-18',
    icon: 'bots/aurebesh-droid.jpg', alt: 'Aurebesh Droid icon',
    title: 'Aurebesh Droid', sub: 'June 18, 2025 · Aurebesh Translator on Discord',
    desc: 'Translate English to and from Aurebesh right inside Discord. Fast, server-friendly, and written in C++ for speed.',
    long: [
      'Aurebesh Droid is an advanced Discord bot that brings the Star Wars writing system to life through rich translation features and immersive lore. Designed as a digital companion bot for fans, it supports English-to-Aurebesh translation, image rendering, alphabet charts, and interactive Jedi and Sith holocrons that deliver randomised quotes from across the galaxy.',
      { facts: [['20', 'slash commands'], ['13', 'galactic scripts'], ['162', 'holocron quotes'], ['~800', 'lines of C++20'], ['500+', 'servers, across both bots'], ['77', 'commits']] },
      { h: 'What it does' },
      { list: [
        '<code>/translate</code> turns whatever you type into an image of it written in Aurebesh, posted back to the channel as “you said”, so a whole server can talk in script.',
        'A command for every script: Aurebesh in its Basic, Core, Cantina, Nexus, Droid and Pixel faces; Mando’a, New and Old; and the Outer Rim scripts (Outer Rim Basic, Old Tongue, Geonosian, Trade and Protobesh).',
        '<code>/alphabet</code> posts the full chart, all 26 letters from Aurek to Zerek by name.',
        '<code>/holocron_jedi</code>, <code>/holocron_sith</code> and <code>/holocron</code> open a holocron and pull a quote from it: <b>106 from the Jedi</b> (Yoda, Obi-Wan, Kanan, Cal Kestis, Ezra, Qui-Gon, Luke, Mace, Anakin and more, from the prequels to Fallen Order), <b>51 from the Sith</b> (Vader, Sidious, Maul and Dooku), and the Bendu’s five, which belong to neither side and so turn up in both. Each speaker has their own colour: green for Luke, Qui-Gon and Yoda, purple for Mace, dark red for the Sith, gold for the Bendu.',
      ] },
      { h: 'Rendering, from scratch' },
      'There is no image library in it. Each message is rasterised glyph by glyph with the single-header stb_truetype, wrapped by the width of each glyph at 96 pixels and a maximum line of 2,000, and written out with stb_image_write. The rendering runs on its own thread so the bot keeps answering while it draws, Discord is told the bot is “thinking” in the meantime, and the image file is deleted the moment it has been sent. Nothing about anyone is collected or stored.',
      { h: 'Shipping a C++ bot' },
      'Written in C++20 on the D++ Discord library, built with CMake. Getting a compiled C++ program to run on a platform built for scripting languages took most of the first week, and the answer was to stop building it there at all: GitHub Actions now builds a release binary on Ubuntu with Ninja and ccache on every push, publishes it as the latest release, and restarts the bot, which fetches that binary when it starts. A push to main is a deploy, and nothing is ever compiled on the server.',
      { h: 'History' },
      'Created on <b>June 18, 2025</b>, when I was a freshman in college. The renderer arrived on June 24, translation and the holocrons in the days after, multi-line rendering on June 27 and the automated build on June 28; the Mando’a and Outer Rim scripts followed in July, and a round of fixes, refactoring and the self-updating worker in August. Built in C++ with cross-platform support and no data collection, Aurebesh Droid blends fun, privacy and fandom into one galactic experience.',
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
    date: '2026-06-25',
    icon: 'apps/quran-tajweed-engine.jpg', alt: 'Quran Tajweed Engine logo',
    title: 'Quran Tajweed Engine', sub: 'June 25, 2026 · Open source',
    desc: 'A tajweed rule engine for the Quran: it takes the Uthmani text and works out where each rule applies (the idghām, the ikhfāʾ, the qalqalah, the madd and its lengths) so an app can colour the letters correctly instead of shipping a hand-marked copy. This is the engine behind the colour-coded recitation in Al-Quran.',
    long: [
      'The Quran Tajweed Engine is an open-source, offline-first, framework-agnostic foundation for building Quran apps in any language. It ships three things together: portable JSON data, a precise written specification for every feature, and reference implementations in seven languages (JavaScript, Python, Swift, Go, Rust, Kotlin and Dart).',
      { facts: [['6,236', 'ayahs'], ['113,611', 'tajweed spans'], ['17', 'tajweed rules'], ['7', 'languages, one spec'], ['77,629', 'words with roots'], ['20', 'riwāyāt as page-exact mushafs']] },
      { h: 'Why it exists' },
      'Most Quran apps re-solve the same hard problems from scratch, and tajweed is the hardest of them: get one rule wrong and an app teaches someone to recite the Quran incorrectly. So the engine works it out once, correctly, for all 6,236 ayahs, and hands the answer to every platform. It grew out of the tajweed work inside Al-Quran and Al-Islam, and version 1.1 reached one-to-one parity with what the app itself paints.',
      { h: 'The seventeen rules' },
      'Every rule has a canonical colour and a place in one of four families:',
      { list: [
        '<b>Silent letters</b>: the sun letters’ lām (lām shamsiyyah), dropped letters, the silent hamzat al-waṣl, and idghām without ghunnah.',
        '<b>Ghunnah</b>, the nasal sound: idghām with ghunnah, general ghunnah, light and heavy ikhfāʾ, and iqlāb.',
        '<b>Articulation</b>: qalqalah, the echoing bounce, and tafkhīm, the heavy letters.',
        '<b>Madd</b>, the elongations and their lengths: natural, miniature, sukūn, separated (munfaṣil), connected (muttaṣil) and necessary (lāzim).',
      ] },
      { h: 'How the detector works' },
      'The detector reads Unicode scalars, never glyphs, so its answer does not depend on which font an app happens to use. It groups the text into grapheme clusters, has each rule emit prioritised “paint operations” over them, and resolves every overlap character by character, with the highest of 52 priorities winning. The awkward cases are handled explicitly: a list of 21 words that are recited as munfaṣil even though they are written as one word, the explicit maddah mark with its own classifier, and madd ʿiwaḍ including its Uthmani iqlāb form at 86:17. Every offset is counted in UTF-16 units, so slicing a span out of the text gives back exactly the span’s text in every one of the seven languages.',
      { h: 'One source file, seven languages' },
      'One source file (<code>tajweed-rules.json</code>) drives all seven ports: edit it, run the build, and every implementation’s constants and the reference documentation regenerate in lockstep. Continuous integration reruns every generator on every push and fails the build if a single generated file comes out different from what is committed, so the ports cannot drift apart quietly.',
      'The seven ports come to about 52,800 lines between them, and each carries its own parity suite of around 55 tests translated case for case, backed by a single language-neutral file of conformance vectors: the 15 sajdah ayahs, the 30 juz that partition all 6,236 ayahs, and the fact that Warsh has no 2:286, specified once instead of seven times. That discipline earns its keep. The suites caught six typed ports all declaring a field the data never had, which had been making rule cards silently invisible, and Go’s regular expressions having no lookbehind, which meant writing that port’s reference scanner by hand.',
      { h: 'Words, not just verses' },
      'Version 1.2 took the engine down to the word:',
      { list: [
        '<b>77,629 words</b>, each with its gloss, transliteration, root and lemma.',
        '<b>Similar ayahs</b>: 50,782 matches across 5,446 ayahs. They used to carry 44,000 copied phrases that had drifted from the real text in their sukūn marks; they now point at spans in the one true copy, and the file shrank from 4.5 MB to 2.9 MB.',
        '323 themes, 814 mutashābihāt phrases, 2,512 topics and 1,049 passage themes.',
        'The hizb, rukūʿ and manzil divisions, and 741 surah sections.',
        'A tajweed course of 10 chapters and 57 lessons, the 99 Names with a depth layer, and the isnād chains of the Ten Readings.',
        'An “Ask” layer that retrieves across four lanes (the named subject, weighted keywords, themes and meaning) without shipping any model at all.',
      ] },
      { h: 'The readings' },
      'The engine carries seven alternate qirāʾāt as text overlays on Ḥafṣ (Warsh, Qālūn, ad-Dūrī, as-Sūsī, al-Bazzī, Qunbul and Shuʿbah), each with its own tajweed pack, and maps 1,634 points of variation across 1,409 ayahs with 3,503 attributed readings. Set side by side over every word, Warsh and Ḥafṣ are letter-for-letter identical 63.5% of the time.',
      'It also ships all twenty riwāyāt of the Ten Readings as page-exact 604-page facsimiles of the printed mushaf, recompressed losslessly from 66 MB to 22 MB, each with its own page table, because page numbers drift between readings (al-Baqarah has 286 ayahs in Ḥafṣ and 285 in Warsh).',
      'Behind that is quieter work that is not in the engine yet. I extracted the text of the remaining riwāyāt from the printed editions with a deterministic pipeline that learns each font’s glyph-to-Unicode map by voting across five readings whose text was already verified, measured to 99.89% character accuracy on the Kufan family and checked against every reading’s exact ayah count. And I built a review packet that reconciles the published variant data against all twenty texts at around 1,600 points per transmitter, with agreement between 98.6% and 99.8%; where they disagreed it was as often the reference data that was wrong as the text. Those texts ship in Al-Islam as a clearly labelled beta, but not here: text that has not been proofread word by word is not something to hand other developers as engine data.',
      { h: 'Status' },
      'First released on <b>June 25, 2026</b>; version 1.0 followed four days later, 1.2 on September 8 and 1.2.1 on September 17. The contribution rules open with the one that matters most: never alter the Quranic Arabic text. MIT-licensed and offered as <i>ṣadaqah jāriyah</i>, grown out of the tajweed work inside Al-Quran.',
    ],
    tags: 'Tajweed rules · Uthmani script · JSON output',
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Quran-Tajweed-Engine' },
    ],
  },

  'hadith-json-engine': {
    date: '2026-08-10',
    icon: 'apps/hadith-json-engine.jpg', alt: 'Hadith JSON Engine logo',
    title: 'Hadith JSON Engine', sub: 'August 10, 2026 · Open source',
    desc: 'The same idea applied to ḥadīth: turning the major collections into clean, structured JSON (book, chapter, number, Arabic, translation and grading) so anything built on top of them starts from consistent data rather than scraped HTML.',
    long: [
      'The Hadith JSON Engine is an open-source, offline-first ḥadīth database: <b>50,884 ḥadīth across 17 collections</b> in both Arabic and English, packaged with full documentation and a portable binary format so an app on any platform can ship the whole corpus without a network call.',
      { facts: [['50,884', 'ḥadīth'], ['17', 'collections'], ['4,477', 'records repaired, with proof'], ['22,764', 'records graded'], ['79 → 25 MB', 'JSON to packs'], ['2,328', 'explained narrations']] },
      { h: 'Why it exists' },
      'It started when someone using Al-Islam reported a ḥadīth that contradicted itself, and it turned out the scraped datasets everyone builds on are quietly broken. The upstream scraper strips sunnah.com’s editorial brackets with a greedy regular expression, <code>\\[.*\\]</code>, which on any line with two pairs of brackets deletes everything from the first <code>[</code> to the last <code>]</code>. The English suffers and the Arabic, sitting in the same record, is fine, so nobody downstream notices. The clearest case is Ḥadīth Qudsī 24: in the damaged copy, Allah calls Jibrīl about a servant He loves and says “I abhor so-and-so”, because the whole middle of the narration, the love and everything up to the hatred, had been cut out. The deletion had turned the narration into its opposite. The bug is now reported upstream; this repository is the fix, with a proof for every repair.',
      { h: 'The proof gate' },
      'A record is only ever repaired when a clean donor text exists that, run through a simulation of the same bug, produces exactly the damaged text, and is not identical to it. That makes a mis-attributed repair structurally impossible: the fix is not a guess at what the text should say, it is a demonstration that this text is what the bug destroyed. Matching is done on content, never on ḥadīth number, because the upstream numbering drifts.',
      { list: [
        '<b>Pass one</b> simulated the bug over whole strings and made <b>4,187</b> repairs.',
        '<b>Pass two</b> came from noticing why pass one missed some: the dot in a regular expression does not match a newline in Python or JavaScript, so the original bug worked line by line, while the donors ship each narration flattened onto one line. It tests every way the bracket pairs could have been split across lines, and made another <b>290</b>. It finds its candidates in logarithmic time with a nearest-neighbour search over sorted, normalised text, which works because the text before the first bracket is never deleted.',
      ] },
      'Every repair has a before-and-after record in the logs, and the residue is written down honestly: the records that are still provably truncated, the ones that cannot be decided, and the ones refused as ambiguous. In the README’s own words, the proof is structural, not scholarly.',
      { h: 'What is in it' },
      { list: [
        '<b>The Nine Books</b>: Bukhārī (7,277), Muslim (7,459), an-Nasāʾī (5,768), Abū Dāwūd (5,276), at-Tirmidhī (4,053), Ibn Mājah (4,345), the Muwaṭṭaʾ of Mālik (1,985), Aḥmad (1,374) and ad-Dārimī (3,406).',
        '<b>Three forties</b>: an-Nawawī’s, the Qudsī collection, and Shāh Waliullāh’s.',
        '<b>Five more</b>: Riyāḍ aṣ-Ṣāliḥīn, Bulūgh al-Marām, Mishkāt al-Maṣābīḥ, al-Adab al-Mufrad and ash-Shamāʾil.',
        'Gradings of ṣaḥīḥ, ḥasan and ḍaʿīf attached from named scholars (al-Albānī, Zubair ʿAlī Zaʾī, Darussalam and Shuʿayb al-Arnaʾūṭ among them). Nothing is computed or adjudicated: where scholars differ, every verdict is kept.',
        'Standard sunnah.com reference numbers, cross-confirmed, down to the lettered variants.',
        'Version 1.1 added the <b>Ḥadīth Encyclopedia</b>: 2,328 explained narrations under 452 categories, packed from 14.8 MB to 2.9 MB.',
      ] },
      { h: 'The pack format' },
      'The packed binary format compresses 79 MB of JSON to 25 MB and is specified in full, byte by byte, so it can be read from any language: a 48-byte header, a block table, fixed-size row records, LZMA for the text and LZFSE for the search folds. Packs are memory-mapped and decompressed a block at a time, so opening a chapter touches one block of around 256 KB rather than the whole book. Builds are deterministic, a verifier re-derives every value in every pack (hundreds of thousands of assertions), and a reference decoder of about 200 lines of Python was written from the specification alone, to prove the specification is enough.',
      { h: 'Search that finds things' },
      'Ranked search with folding and typo tolerance took “controlling anger” from zero results to the right four, and a misspelt “intetion” from zero to 333. Meaning search scores word by word (MaxSim) instead of with one vector per narration, because a single vector per narration ranked this corpus close to randomly. It is the same approach the Quran engine specifies and the one Al-Islam and OC Ummah use.',
      { h: 'Status' },
      'Released on <b>August 10, 2026</b>, with version 1.1 on September 9 (the encyclopedia and search) and 1.2 on September 17. The collections cover the Nine Books, three Forty Ḥadīth compilations and works like Riyāḍ aṣ-Ṣāliḥīn. The tooling, documentation and format are MIT-licensed; the ḥadīth text keeps its own terms and credits, and it is all offered as <i>ṣadaqah jāriyah</i>, the companion to the Quran Tajweed Engine.',
    ],
    tags: 'Structured ḥadīth · JSON',
    cat: { label: 'Islamic ↗', href: '/al-islam/', cls: 'app-cat--islamic' },
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Hadith-JSON-Engine' },
    ],
  },

  'al-adhan': {
    date: '2023-12-31',
    icon: 'apps/al-adhan.jpg', alt: 'Al-Adhan | Prayer Times app icon',
    title: 'Al-Adhan ·<br>Prayer Times', sub: 'December 31, 2023',
    desc: 'An offshoot of Al-Islam that enhances daily worship with precise prayer times, real-time qibla direction, and a unique Traveling Mode for on-the-go adjustments.',
    long: [
      'Al-Adhan is a free and beginner-friendly offshoot of Al-Islam that enhances daily worship with precise prayer times, real-time qibla direction, home-screen widgets, and a unique Traveling Mode that automatically adjusts for Qaṣr prayers while on the go.',
      'It is the prayer half of Al-Islam pulled out into its own app for people who only want that: no account, no ads, and everything calculated on device across iPhone, iPad, Apple Watch and Mac.',
      { facts: [['22', 'calculation methods'], ['48 mi', 'Traveling Mode kicks in'], ['13', 'adhans to wake to'], ['37', 'widgets + a Live Activity'], ['~80K', 'lines of Swift'], ['2.6.5', 'current version']] },
      { h: 'The times, done properly' },
      { list: [
        '<b>22 calculation methods</b> and custom angles, curated to one method per country so the right one can be chosen for you automatically, from Sunni sources only. The Ḥanafī ʿAṣr is a switch away and the other ʿAṣr time is always shown with it.',
        'Four rules for high latitudes, where the night never gets dark enough for the usual angles, and the optional times of Ḍuḥā, Islamic midnight and the last third of the night, each with its own reminder.',
        'Prayer times for any other city by that region’s own method, and a 13-month calendar that exports to PDF or a spreadsheet, drawn by the app itself.',
        'The Umm al-Qurā Hijri date with an offset for your local moonsighting and an option to turn the date at Maghrib, the way the Islamic day actually begins.',
      ] },
      { h: 'Traveling Mode' },
      'Once you are 48 miles from home, the classical two-marḥalah distance, Traveling Mode switches on by itself and shortens the prayers for qaṣr. It only switches off after you are a mile back inside that line, so driving along the boundary does not flip it back and forth, it waits half an hour between notifications about it, and it follows you onto the Apple Watch. This is one of the two features the Congressional App Challenge singled out in Al-Islam.',
      { h: 'Not missing it' },
      { list: [
        '<b>Thirteen adhans</b>, from Makkah, Madinah, al-Aqṣā and Egypt to Abdul Basit and Minshawi, plus five alert tones. The shorter notification cuts are made on the phone from the full recordings.',
        'The adhan can play in the app even with the phone on silent.',
        '<b>Nagging Mode</b> starts at a time you choose before each prayer and reminds you every fifteen minutes, then at ten and at five, and “Yes, I prayed it” in the notification marks it done.',
        'A <b>prayer tracker</b> with streaks, perfect days and a calendar heatmap, where Jumuʿah counts as Ẓuhr, combined travelling prayers count as both, and a pause for menstruation and postpartum keeps exempt days from breaking a streak.',
        'Siri answers “When is Maghrib?”, “What prayer is it?” and “What is the next prayer?”, in English and in Arabic.',
      ] },
      { h: 'On every screen you own' },
      '<b>37 widgets</b> for the Home and Lock Screens: twelve “sky” widgets with the sun on its arc and the real moon phase, twelve plainer twins, and thirteen for the Lock Screen, including the Hijri date in English and Arabic. The Apple Watch app runs on its own with two complications, and in Ramadan a Live Activity counts down to suḥūr and ifṭār. Inside the app the same living sky sits behind the times, and in version 2.6.5 it gained a skyline under the sun’s path: the pyramids to the west and a masjid to the east.',
      { h: 'Beyond the prayer' },
      'The qibla compass sits right on the prayer screen, under your location. The Islam tab carries masjid and halal food locators, the Arabic alphabet and tajweed foundations, adhkar and duas, the 99 Names, a tasbīḥ counter, zakāh and inheritance calculators, a Hijri converter, wallpapers and how-to guides, with on-device meaning search across the duas, the adhkar, the Names and the alphabet.',
      { h: 'Kept in step with Al-Islam' },
      'Al-Adhan is carved out of the Al-Islam codebase and brought up to date with it by the three-way-merge sync tool I wrote for the family, which leaves out the Quran, the ḥadīth and the tafsīr. The two small files at the root of each app are never merged, and a checker guards them, because of a bug that did ship once: the sibling apps’ roots were missing one line, so changing the accent colour only took effect after a restart.',
      { h: 'Where it started' },
      'Published on the App Store on <b>December 31, 2023</b>, when I was a senior in high school, five days after Al-Quran. The three apps still ship together, the same day and the same minor version.',
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
    date: '2023-07-26',
    icon: 'apps/al-islam.jpg', alt: 'Al-Islam | Islamic Pillars app icon',
    title: 'Al-Islam ·<br>Islamic Pillars', sub: 'July 26, 2023',
    desc: 'An all-in-one companion for lifelong Muslims and converts alike, with Traveling Mode, Beginner Arabic Mode, prayer times, qibla direction, Quran access, and tools to deepen faith and connect with Allah.',
    long: [
      'Al-Islam is a free, beginner-friendly Muslim companion app designed for lifelong Muslims and converts alike. It offers essential features like prayer times, Quran access and qibla direction, plus unique tools such as Traveling Mode and Beginner Arabic Mode, all aimed at helping users deepen their faith and stay connected with Allah.',
      'I started it to help new reverts and non-Muslims learn about Islam and reach the Quran and the prayer times easily. It has no ads, no fees and no subscriptions, and your data never leaves your device.',
      { facts: [['15K+', 'users across the suite'], ['99.8%', 'crash-free'], ['22', 'prayer calculation methods'], ['20', 'riwāyāt of the Quran'], ['50,884', 'ḥadīth, on the device'], ['43', 'widgets'], ['84', 'achievements'], ['~190K', 'lines of Swift']] },
      { h: 'Prayer' },
      { list: [
        '<b>22 calculation methods</b>, from the Muslim World League, ISNA and Umm al-Qurā to Diyanet, JAKIM and MUIS, plus custom angles. The list is curated on two rules: one method per country, which is what lets the app pick the right one automatically, and Sunni sources only. There is a Ḥanafī ʿAṣr (with the other ʿAṣr time shown alongside), four rules for high latitudes, and the optional times of Ḍuḥā, Islamic midnight and the last third of the night.',
        '<b>Traveling Mode</b> switches itself on once you are 48 miles from home (the classical two-marḥalah distance) and shortens the prayers for qaṣr. It only switches off once you are a mile back inside that line, so it does not flicker on and off at the boundary, and it follows you onto the Watch.',
        '<b>Nagging Mode</b> starts at a time you choose before each prayer, reminds you every fifteen minutes, then again at ten and five, and you can answer “Yes, I prayed it” from the notification itself.',
        'A <b>prayer tracker</b> with streaks, perfect days and a heatmap by week, month or year. Jumuʿah counts as Ẓuhr, combined prayers while travelling count as both, and a pause for menstruation and postpartum means exempt days never break a streak.',
        'A <b>living sky</b> behind the prayer times: the sun on its true arc for where you are, stars at night and the real phase of the moon, which you can drag through the day, and a 3D moon viewer built from NASA’s textures.',
        'A <b>qibla compass</b>, a rakʿah guide, prayer times for any other city by that region’s own method, and a 13-month prayer calendar you can export as a PDF or a spreadsheet.',
        '<b>13 adhans</b> from Makkah, Madinah, al-Aqṣā, Egypt and some of the most beloved voices, plus five alert tones. The short notification cuts are made on the device from the full recordings, which replaced shipping 26 pre-cut files.',
        'The Umm al-Qurā <b>Hijri calendar</b> with an offset and the date turning at Maghrib, and in Ramadan a <b>Live Activity</b> counting down to suḥūr and ifṭār.',
      ] },
      { h: 'Quran' },
      { list: [
        'Read by surah, juz or page, or in a mushaf reader that composes and justifies each page at runtime, or in any of <b>twenty printed mushafs</b>, one for every riwāyah of the Ten Readings, 604 pages each.',
        'The Arabic with transliteration, Saheeh International and The Clear Quran, in Uthmani, Warsh, IndoPak, Kufi and Hijazi scripts.',
        '<b>Twenty riwāyāt</b>: Ḥafṣ, seven more verified against the King Fahd Complex texts, and twelve extracted from printed editions and offered as a clearly labelled beta, with a Qirāʾāt Explorer, the chains of transmission and recitations in each reading.',
        '<b>Colour-coded tajweed</b> across seventeen rules, now also the open-source Quran Tajweed Engine. For the readings beyond Ḥafṣ the colours were lifted from the printed colour mushafs themselves, by rasterising each page and counting the coloured ink inside every word.',
        '<b>Over 70 reciters</b>, full surah or ayah by ayah, downloadable for offline listening, with per-ayah timings so a single ayah plays in the reciter’s own voice with no connection.',
        '<b>Six tafsīrs</b> in the app itself: Ibn Kathīr in English and in Arabic, Maʿāriful Qurʾān, Tazkirul Quran, aṭ-Ṭabarī and as-Saʿdī, around 345 MB of source packed into under 17.',
        'Tap any of <b>77,629 words</b> for its meaning, with morphology, similar ayahs, a word of the day and 323 themes to browse by.',
        'A <b>Quran planner</b> that takes a finish date or a daily pace and re-spreads the rest when you fall behind; bookmarks, notes, highlights and multi-ayah select; Beginner Mode’s letter spacing; share cards; and search by word, by meaning, by reference like 5:27, by page or by juz.',
        'Sunnah reminders, like al-Kahf on Friday and al-Mulk before sleep.',
      ] },
      { h: 'Ḥadīth and the Islam tab' },
      'All <b>17 collections</b> and <b>50,884 ḥadīth</b> ship inside the app, with gradings, standard numbering, the chains of narration, a ḥadīth of the day and search across every book; this became the open-source Hadith JSON Engine. Beside them sits an encyclopedia of 2,328 explained narrations.',
      'The Islam tab is a library of its own: the Arabic alphabet and a 21-tier reading test modelled on a qāʿidah, tajweed foundations, adhkar and duas (Ḥiṣn al-Muslim with audio), a tasbīḥ counter, zakāh and inheritance calculators, the 99 Names, a Hijri converter, masjid and halal food locators, wallpapers, the pillars and beliefs, how-to guides, a journal, and 202 articles on the miracles of the Quran, with 180 daily reminders on top.',
      { h: 'On-device AI' },
      'Semantic search runs on the device over the Quran, the ḥadīth, the Names, the duas, the adhkar and even the settings. I measured Apple’s sentence embeddings on this corpus, found they ranked it almost at random, and scored word by word (MaxSim) instead. On iOS 26, <b>Ask AI</b> and <b>Summarize</b> hand what that search retrieves to Apple’s on-device foundation model: every answer cites its passages, nothing leaves the phone, and verse text is never produced from the model’s memory.',
      { h: 'Made for the person using it' },
      { list: [
        'An “About you” step at the start (born Muslim, revert, beginner or not Muslim) re-orders the tabs and settings around the answer.',
        'A profile with activity rings and <b>84 achievements</b> across prayer, Quran, listening, ḥadīth and dhikr.',
        'iCloud backup with up to six named profiles.',
        'Siri shortcuts in English and Arabic: play a surah, a random surah or the last one, and ask when a prayer is, which one it is now, or which is next.',
        '<b>43 widgets</b> for the Home and Lock Screens, and Watch complications, with an in-app gallery of them all.',
        'A standalone Apple Watch app, an iMessage sticker pack, and a “Classic Look” switch for anyone who would rather not have Liquid Glass.',
      ] },
      { h: 'How it is built' },
      'Almost everything ships in the app and works offline. The Quran, ḥadīth and tafsīr are stored in binary pack formats I designed, memory-mapped and decompressed one block at a time (the Quran goes from 17 MB of JSON to 3.1 MB), built and checked by 58 Python scripts. Prayer times are computed on the device; the only outside code is a vendored copy of the open-source adhan library.',
      'After reports of lag on older phones and in Low Power Mode I ran a nine-phase performance audit: the app now recomputes no views at all while it sits idle, the mushaf reader went from rebuilding all 604 pages on every change to five or ten, and the thread, address and main-thread sanitizers come back clean across 67 screens.',
      'It has grown from about 13,400 lines of Swift at the start of 2025 to around 190,000 now. Al-Quran and Al-Adhan are carved out of this codebase and kept in step with it by a three-way-merge sync tool I wrote, and an Android and web version is under way: a shared Kotlin Multiplatform core that reads the very same data packs as the iPhone app, tested byte for byte against it.',
      { h: 'Where it started' },
      'Published on the App Store on <b>July 26, 2023</b>, when I was a junior in high school. It was written in the weeks right after my AP and IB exams, and it is the app the other Islamic ones grew out of.',
      '🏆 <b>Winner of the Congressional App Challenge 2023: Best Original Idea.</b> Issued by the United States Congress in December 2023, my senior year of high school: I was awarded a Certificate of Congressional Recognition by U.S. Representative Young Kim, with the Beginner Arabic Mode and Traveling Mode singled out for supporting new Muslims and learners of Arabic.',
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
    date: '2023-12-26',
    icon: 'apps/al-quran.jpg', alt: 'Al-Quran | Beginner Quran app icon',
    title: 'Al-Quran ·<br>Beginner Quran', sub: 'December 26, 2023',
    desc: 'Makes learning and studying the Holy Quran accessible, with Arabic Beginner Mode, ayah sharing, recitations, and tools for enhancing your spiritual journey.',
    long: [
      'Al-Quran is a free and beginner-friendly offshoot of Al-Islam that makes learning and studying the Holy Quran accessible, with unique Arabic learning tools like Beginner Mode, recitations, translations and ayah sharing, all designed to support and enhance your spiritual journey.',
      'It is for beginners, reverts and every Muslim who wants the Quran on its own, without the rest of Al-Islam around it. It does not even ask for your location: the only permission it will ever request is to save a wallpaper to your photos.',
      { facts: [['🏆', 'Swift Student Challenge 2024'], ['20', 'riwāyāt'], ['70+', 'reciters'], ['6', 'tafsīrs, offline'], ['77,629', 'words, tap to translate'], ['2.6.5', 'current version']] },
      { h: 'Reading' },
      { list: [
        'Read by surah, juz or page, in a mushaf reader that composes and justifies every page at runtime, or in any of <b>twenty printed mushafs</b>, one for each riwāyah of the Ten Readings.',
        '<b>Arabic Beginner Mode</b> spaces the letters apart so a new reader can see where one ends and the next begins, and the tashkeel can be taken off when you are ready to read without it.',
        'Transliteration, Saheeh International and The Clear Quran beneath the Arabic, in Uthmani, Warsh, IndoPak, Kufi and Hijazi scripts.',
        '<b>Colour-coded tajweed</b> across seventeen rules and all twenty readings, which later became the open-source Quran Tajweed Engine.',
        'Tap any of <b>77,629 words</b> for its meaning, root and form, and follow similar ayahs, a word of the day and 323 themes.',
        '<b>Six tafsīrs</b> inside the app, in English and Arabic, with nothing to download.',
      ] },
      { h: 'Listening' },
      'More than seventy reciters across all twenty riwāyāt, whole surahs or ayah by ayah, with downloads for offline listening and per-ayah timings so one ayah can play in the reciter’s own voice with no connection. Siri can play a surah, a random surah or the last one you were listening to.',
      { h: 'Keeping it up' },
      'A <b>Quran planner</b> takes a finish date or a daily pace, keeps a streak, and re-spreads what is left when a day slips. Bookmarks, notes, highlights and multi-ayah selection keep your place; share cards turn an ayah into an image worth sending; on-device semantic search finds an ayah by what it means rather than the words you remember; and on iOS 26 <b>Ask AI</b> answers from the Quran with every passage cited, without anything leaving the phone.',
      'Its Islam tab carries a full tajweed course, the Arabic alphabet, adhkar and duas, the 99 Names, zakāh and inheritance calculators and a journal, and it comes with an Apple Watch app and six widgets, including the ayah of the day and the last ayah you read.',
      { h: 'Carved from Al-Islam' },
      'Al-Quran is the Quran half of Al-Islam, and keeping two apps in step with a codebase that changes every week is its own engineering problem. So I wrote a sync tool for it. Each sibling app records the Al-Islam commit it was last brought up to; the tool compares every file three ways (as it was then, as the sibling has it, and as Al-Islam has it now) and decides whether to take the update, keep the local version, merge the two or flag a conflict. A manifest declares what each app leaves out (Al-Quran has no prayer times and no ḥadīth), and a missing file that existed at the last sync is understood as left out on purpose, not lost.',
      'Two checkers stand behind it. One finds “leaks”: new lines that would compile in the sibling but reach for code that app deliberately does not have. The other keeps each app’s build flags matching its manifest, which exists because of a real bug: Al-Quran never defined the flag that says it has a Quran, so its 99 Names had silently lost every link to the verses they come from. Writing the manifests down also turned up 24 MB of ḥadīth data sitting unread inside both the iPhone and Watch apps, which came out.',
      'Across the files the two apps share, 98 of Al-Quran’s 133 are byte-for-byte identical to Al-Islam’s; the rest differ only where they should.',
      { h: 'Where it started' },
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
  'oc-ummah': {
    date: '2026',
    icon: 'apps/oc-ummah.jpg', alt: 'OC Ummah app icon',
    title: 'OC Ummah', sub: '2026 \u00b7 Orange County Muslim community',
    desc: 'A community app for Muslims in Orange County: events pulled from a live calendar feed, a directory of local masjids, a map that pins masaajid, halal food and every event where it is actually being held, and on-device semantic search across Quran and hadith.',
    long: [
      'OC Ummah is a community app for Muslims in Orange County: what is happening this week, which masjid it is at, when the prayer is there, and where to eat afterwards, with a full Islamic learning library and on-device AI alongside.',
      { facts: [['28', 'masjids in the directory'], ['12', 'masjid prayer schedules'], ['5', 'tabs'], ['~39K', 'lines of Swift'], ['10', 'app icons, drawn in code'], ['0', 'third-party dependencies']] },
      { h: 'Events' },
      'Community events come from a curated Google Calendar feed, read by my own calendar parser, recurring events included. On top of that the app reads the masjids’ own calendars in three different formats: the data embedded in The Masjid App’s pages (whose “UTC” timestamps turn out to be local wall-clock time), sites whose dates arrive as free text and need a forgiving date parser, and a WordPress calendar. An aggregator merges them and removes the duplicates, with the curated copy winning. Events show as a list or a week, month or day view, each with a detail sheet and an “add to my calendar” that asks only for permission to write.',
      'Anyone can send in an event by email, and a person reads it. There is no account, no backend and no moderation queue to run.',
      { h: 'Masjids and the map' },
      'The directory holds 28 masjids, with the five main ones (ICOI, OCIF, IIOC, ISOC and the Rahma Center) in their own colours, and favourites for the ones you go to. The community map merges curated masjids, MapKit results and event venues behind filter chips, with a synced card deck, “Search this area” and “Near me”. A venue is found from the calendar event’s free-text location, so a new event lands on the map without anyone placing a pin. Masjid coordinates resolve from MapKit at runtime and cache, so a masjid that moves corrects itself instead of staying wrong in a hardcoded list. Dedicated Masjid and Halal Food locators run their searches concurrently and cache them by area.',
      { h: 'Prayer times, masjid by masjid' },
      'The adhan, iqāmah and jumuʿah times for twelve masjids come from each masjid’s real published schedule, read from four kinds of source: The Masjid App’s day-of-year tables, a prayer-times service, one masjid’s hand-written front page, and a WordPress plugin. When a source is unavailable the app works the times out from the position of the sun, so it never has nothing to show, and it never presents a calculated time as a published one.',
      'Notifications are planned around a limit most apps quietly hit: iOS holds only 64 pending notifications per app. So the whole set is rebuilt nearest-first within that budget, with prayers ahead of everything else.',
      { h: 'The Islamic library' },
      'The Islamic side of the app is the larger half: the pillars, beliefs, the Arabic letters, tajweed topics, the names of Allah and duas. It is carried over from Al-Islam, around 24,700 lines of it: the Arabic alphabet, tajweed foundations and lessons, adhkar, duas, a tasbīḥ counter, the 99 Names, a Hijri converter, wallpapers, and step-by-step how-to guides.',
      'It also carries two pieces I am glad I built. <b>Semantic search</b> runs entirely on-device: I measured Apple’s sentence embeddings against this corpus, found them close to random (the lashing verse outranked the patience verse for “patience in hardship”), and switched to word-embedding MaxSim, which separates related text at 0.42–0.70 from unrelated at 0.27–0.41. Results are cut at whichever is higher of 0.38 and 85% of the best match, the vectors are multiplied with Accelerate, and each corpus (10 to 25 MB of vectors) is loaded on demand, with at most three held in memory, dropped under memory pressure and cached to disk.',
      'The second is <b>on-device question answering</b>: retrieval over the app’s own corpus handed to Apple’s on-device foundation model, so questions are answered locally with no network, no keys and nothing leaving the phone, with a documented fallback when Apple Intelligence is unavailable. In its grounded mode it cites every passage it used and never produces verse text from memory; it only appears for searches that read as questions; and it declines to give religious rulings, which are a scholar’s job and not a phone’s.',
      { h: 'Polish' },
      'Behind the animated launch screen, the app is already warming a dozen map searches and geocoding two dozen masjids, so the map is ready the moment you open it. The icon comes in ten versions you can choose between in the app, ten takes on the same desert night scene, every one of them drawn in code rather than in an image editor.',
      'Written in SwiftUI with no third-party dependencies at all: every framework is Apple’s. Started in April 2026, and grown fastest in August and September, when the map, the Islamic tools, the prayer times and the notifications all landed. Not yet on the App Store.',
    ],
    tags: 'iOS \u00b7 SwiftUI \u00b7 On-device AI \u00b7 MapKit',
    cat: { label: 'Islamic \u2197', href: '/al-islam/', cls: 'app-cat--islamic' },
    /* no links: the GitHub repository this used to point at is gone (404),
       and the app is not on the App Store yet */
  },

  'website': {
    date: '2026-06-24',
    /* No bespoke logo: reuses the site's own PWA icon, which is the closest
       thing it has to an app icon. */
    icon: 'icons/icon-512.png', alt: 'abubakrelmallah.com icon',
    title: 'This Website', sub: 'June 24, 2026 · abubakrelmallah.com',
    desc: 'The site you are reading. Hand-written Jekyll and vanilla JavaScript with no framework: a custom cursor, a flow-field canvas, magnetic hover, scroll reveals, and a service worker so every page still opens offline. The Star Wars, J.A.R.V.I.S. and Marauder’s Map interfaces are the same content re-skinned.',
    long: [
      'The site you are reading: the apps I ship for UC Irvine, my own Apple ecosystem apps and Discord bots, the projects I built in high school, and a large set of fan pages for the things I like. It exists because all of that was scattered across Notes, Files and Photos, where every single piece of it mattered to me and not one piece was findable.',
      { facts: [['88', 'pages'], ['70', 'worlds (fan pages)'], ['1,844', 'photos, by school year'], ['~32K', 'lines of JavaScript'], ['~19.5K', 'lines of CSS'], ['0', 'npm dependencies']] },
      { h: 'No framework' },
      'Hand-written HTML, CSS and vanilla JavaScript: no React, no Tailwind, no bundler, and no npm dependencies at all. Jekyll is used only for permalinks, redirects and cache-busting; every page is a real <code>.html</code> file you can open and read. The interface is the point: a custom cursor, a flow-field canvas behind everything, magnetic hover, scroll reveals, tilt, interface sounds and a launch animation per page, all hand-rolled and all switched off for anyone who asks their device for reduced motion.',
      'Every app and project card, including this one, is written once as data and rendered wherever a page asks for it, so the same app on five pages is one thing to edit. The cards are a CSS subgrid of their grid’s rows, which is why every title in a row sits on one line and every date on the next, however long any one card runs. And “Read more” opens the full story in place, headings, lists and numbers included.',
      { h: 'It works with no internet' },
      'Add it to your home screen and it opens on a plane. A service worker caches the shell on install and then, quietly, fills in every page and image in the background, pausing whenever you ask for something so it never competes with the page you are on, and skipping the fill entirely on a slow connection or with Save-Data on. Pages are served from the cache instantly and refreshed behind you for next time; scripts and styles are cached for good, which is safe because every one of their URLs carries a hash of its content, so a changed file is a new URL and an unchanged one is never downloaded twice. Photographs are kept in a cache of their own, by content hash as well.',
      'The worker’s comments are a record of what went wrong on the way there: a background fill that held up the first tap for six seconds until it was taken out of the activation step, a build fingerprint that missed 1,610 renamed files because it only counted them, and a split into three caches because of how WebKit opens one.',
      { h: 'The photographs' },
      'The College and High School pages hold 1,844 photographs, a gallery for every school year, strictly in order. They go through a pipeline I wrote in Python: each camera-roll original is turned upright from its EXIF data, stripped of its metadata and encoded twice as AVIF, a 1000-pixel frame of about 43 KB for the grid and a 2000-pixel copy of about 215 KB that only the full-screen viewer asks for. AVIF came out 35% smaller than the JPEG it replaced at the same quality. A photo already encoded is never encoded again, so adding three photos takes seconds.',
      'Where a photo was taken is read from its GPS data, rounded to about a hundred metres and named through OpenStreetMap, one polite lookup per spot, cached; only the town ever ships, never a coordinate, and anything near home is left off entirely. On the page the rows are justified from stored dimensions before a single image has loaded, so nothing jumps, and frames are fetched a few at a time nearest the middle of the screen and handed back once they are far away, so a 700-photo year stays within what a phone can hold.',
      { h: 'Things to play with' },
      { list: [
        '<b>Four whole alternate interfaces</b> over the same content: <b>J.A.R.V.I.S.</b>, a Stark heads-up display with an arc reactor, telemetry and a chronometer that keeps the Hijri date; the Jedi <b>H.O.L.O.C.R.O.N.</b> archive, turning in a projector cone with the date counted from the Battle of Yavin; <b>E.L.M.A.L.L.A.H.</b> (Embedded Logic Matrix · Adaptive Learning, Language &amp; Archive Hub), a holotable that jumps to hyperspace when it finishes booting; and the <b>Marauder’s Map</b>, every page a corridor on parchment, footprints that move, and “Mischief managed” to wipe it blank.',
        'On <a href="/star-wars/">Star Wars</a>: type anything and read it back in Aurebesh, play a hand of Corellian Spike sabacc against the house, and forge a lightsaber from eight crystals and four hilts.',
        'On <a href="/al-islam/">Al-Islam</a>: the day’s prayer times worked out from the position of the sun right in the browser, by any of five methods, for Irvine or for wherever you are, the qibla bearing and distance to the Kaʿbah, the Hijri date, and Sūrat al-Ikhlāṣ coloured by its tajweed rules.',
        'A <b>travels map</b> drawn from a dot grid of the whole world packed into under 3 KB and rendered as a single SVG path, with 41 pins and a flight arc to each.',
        'Nineteen accents and four impersonations in the order I learned them, four Steam Replays, the Billboard year-end charts for every year since 2006, and seventy worlds, each with its own stylesheet and behaviour.',
      ] },
      { h: 'History' },
      'The first commit was on <b>June 23, 2026</b>, and it went live at abubakrelmallah.com the next day. J.A.R.V.I.S. arrived on August 2, the fan pages the day after, travels on August 5, the High School page in full on August 19, and the gaming section, new worlds, road trips and collapsible sections through September. It is open source on GitHub, and a fair share of it was written between midnight and five in the morning.',
    ],
    tags: 'Jekyll · Vanilla JS · Offline PWA',
    links: [
      { label: 'Visit ↗', href: 'https://abubakrelmallah.com' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Abubakr-Elmallah-Website' },
    ],
  },

  /* ---- Deprecated ---- */
  'icoi': {
    date: '2023-10-03',
    icon: 'apps/icoi.jpg', alt: 'Islamic Center of Irvine (ICOI) app icon',
    title: 'Islamic Center of Irvine', sub: 'October 3, 2023 – May 2026',
    desc: 'Built for the Irvine Muslim community. Accurate mosque prayer times, important links, Quran access, Islamic tools, and local business support. Discontinued in May 2026, when ICOI moved to The Masjid App.',
    long: [
      'The Islamic Center of Irvine App, designed for the Islamic Irvine community, provided accurate mosque prayer times, Quran access, essential Islamic tools, community resources and support for local businesses, all in one iOS app.',
      { facts: [['2K+', 'downloads'], ['35K+', 'sessions'], ['4.5.0', 'final version'], ['2½ yrs', 'maintained']] },
      { h: 'What it did' },
      { list: [
        '<b>The masjid’s own prayer times.</b> Instead of calculating times that might disagree with the masjid by a minute or two, the app read ICOI’s published schedule straight from its website and refreshed it every day in the background, so the times on the phone were the times on the wall.',
        '<b>A searchable directory</b> of local businesses, so the community could find and support its own.',
        'The masjid’s important links in one place, Quran access, and a set of essential Islamic tools.',
        'Written in SwiftUI, with background tasks for the daily sync and App Groups to share the data.',
      ] },
      { h: 'The story' },
      'Published on the App Store on <b>October 3, 2023</b>, when I was a senior in high school. I helped create the ICOI Technology Committee and sat on its board, and the mosque gave me a certificate for app development achievement for building and maintaining it.',
      'I maintained it for two and a half years, through to <b>version 4.5.0</b>. That last release existed to say goodbye properly: it added a notice counting down to the closure, thanking people for using it, and pointing them to The Masjid App, where ICOI’s updates and services now live. The app shut down in <b>May 2026</b> and is no longer available to download; the source is still on GitHub.',
      'Building it is also what led to teaching iOS at the STEM Heroes Academy at the Muslim Village, where I launched the academy’s first iOS course as its youngest instructor and taught Swift and SwiftUI to more than thirty students aged 8 to 14 over two years.',
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
            screenshot links to unless `href` overrides it
     crop   optional, true for a very wide screenshot: it fills the frame
            from its top-left corner instead of shrinking to a thin strip

   Adding or changing a picture here (icon or img)? Run tools/thumbs.py to
   make its At a glance thumbnail; until then the index uses the full file. */
window.PROJ_CARDS = {

  'hs-datapad': {
    date: '2021-10-07',
    img: 'highschool/datapad.png', alt: 'Star Wars Datapad, a Code.org App Lab project',
    title: 'Star Wars Datapad', year: '2021',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'An interactive web app built with JavaScript on Code.org that simulates a fully functional Star Wars datapad: translate between English and Aurebesh in both directions (single letters, digraphs and punctuation), look up letters by name or pronunciation, hear them pronounced, and switch the whole interface between eight themes (Droid, Jedi, Rebel, Imperial, Mandalorian, Bounty Hunter, Smuggler and Pirate), each with its own colours, wallpaper, emblem and signature sound, from an R2 beep to a blaster shot to Chewbacca’s roar.',
      { facts: [['812', 'lines of JavaScript'], ['34', 'characters, with 8 digraphs'], ['8', 'themes'], ['7', 'screens'], ['15', 'years old when I wrote it']] },
      { h: 'How it works' },
      { list: [
        '<b>English to Aurebesh</b>: every character becomes an image created on the fly and laid out on a grid, twenty to a row, up to 340 characters, in either the Basic or the Droid style of the alphabet, with about 25 punctuation and currency symbols handled one by one.',
        '<b>Aurebesh to English</b>: an on-screen Aurebesh keyboard, with a second page for digits and punctuation, a delete key and a clear key, for messages up to 72 characters.',
        '<b>Digraphs</b>, the eight letter pairs Aurebesh writes as one glyph (ch, ae, eo, kh, ng, oo, sh and th), found by looking at the text two characters at a time.',
        '<b>Search</b> by letter name or sound, filtered to single letters, digraphs or both, and ranked: a match on the first two letters first, then the first letter, then the second, then anywhere in the name, then in the pronunciation, over a search I wrote by hand. There is a random-letter button, and every letter can be spoken aloud, with the spelling adjusted until the computer voice said it right.',
      ] },
      { h: 'The story' },
      'This was my <b>first coding project</b>, made for AP Computer Science Principles in Fall 2021, my sophomore year, when it was still called Aurebesh Translator. It started as a demo under 200 lines that could only write “Hello there!” in Aurebesh and was not really functional; it only started working properly once I learned what substrings were. I kept refining it every week through Spring and Summer 2022.',
      'It was my favourite thing I had built at the time, and it is the direct ancestor of <b>Datapad</b>, the iOS app on the App Store today.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/3GTPl_9o0qf9zWutRclvLYYoJRopnjTmVTdm3cXHELc' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Star-Wars-Datapad' },
    ],
  },
  'hs-calculator': {
    date: '2021-11-14',
    img: 'highschool/calculator.png', alt: 'Calculator, a Code.org App Lab project',
    title: 'Calculator', year: '2021',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'A calculator web app built with JavaScript on Code.org for AP Computer Science Principles in Fall 2021, my sophomore year.',
      { facts: [['101', 'lines of JavaScript'], ['18', 'character display'], ['10+', 'operations']] },
      'Beyond the four basic operations it handles squares, square roots, arbitrary exponents, reciprocals, percentages, negation, powers of ten and π, with a display that truncates long results, a backspace for single characters, a full reset, click sounds on every button, and input validation that refuses invalid sequences like two decimal points in one number.',
      'Underneath, the whole expression is kept as a string. Pressing a second operator replaces the one before it instead of stacking up, backspace removes an operator and its spaces in one go rather than leaving half of it behind, and pressing equals finds the operator and splits the string around it to do the sum. Digits and operators even make different sounds.',
      'It is small, but it is where I learned to manage state and guard user input properly.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/3WR9OYo6Ec9k-4s11Py6MJgsYf2YXyuzsq3icY61NWg' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Calculator' },
    ],
  },
  'hs-periodic-table': {
    date: '2022-03-18',
    img: 'highschool/periodic-table.png', alt: 'Periodic Table, a Code.org App Lab project',
    title: 'Periodic Table', year: '2022',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'A periodic table web app built with JavaScript on Code.org as my AP Computer Science project in Spring 2022, sophomore year.',
      { facts: [['118', 'elements'], ['11', 'facts about each'], ['6', 'pages of 20'], ['348', 'lines of JavaScript']] },
      'It shows all <b>118 elements</b> laid out in periodic-table order with atomic number, symbol, name, phase at room temperature, type, atomic weight, density, melting point and boiling point; you can search by name, symbol or atomic number with partial matches, page through the table, or hit a button for a random element.',
      'The table is six pages of twenty elements with arrows between them, a drop-down lists every element by number, name and symbol, a search shows up to seven matches at a time, and an info button opens the element on ptable.com for anyone who wants to go deeper. Each element also carries its period and group, from the alkali metals to the superheavy elements, and its temperatures are given in Fahrenheit.',
      'The whole dataset is hard-coded into the app so it works offline, which meant organising 118 elements into parallel arrays and keeping retrieval fast: the main problem the project actually taught me.',
      'A year later I rebuilt the idea from scratch in Java, with quizzes, for my IB Internal Assessment: that is the Periodic Table Explorer, further along this page.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/n4gY-ijCWHme3Gd-qkeYFzcloQkXAf257XCrDwGSxRg' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Periodic-Table' },
    ],
  },
  'hs-games': {
    date: '2022-03-03',
    img: 'highschool/games.png', alt: 'Games: Hangman, Wordle and Two-Player Checkers',
    title: 'Games', year: '2022',
    grade: '10th grade',
    tags: 'Code.org · JavaScript',
    long: [
      'Three classic games bundled into one Code.org web app. It started in March 2022 as a little Hangman game, made because I was bored, and after my AP exams at the end of 10th grade I really locked in on it: Wordle followed, the app got renamed “Games”, and then Checkers took over most of the effort.',
      { facts: [['3', 'games'], ['986', 'lines of JavaScript'], ['9', 'Hangman categories'], ['24', 'checkers on the board']] },
      { h: 'Hangman' },
      'Nine categories plus Random, each drawn from a real dataset: cats, countries and territories, the most spoken languages, US states, US national parks, planets, the elements, video game titles and the cities with a Target. Words are capped at ten letters and letters only, the same word never comes up twice in a row, the gallows is drawn one piece at a time over seven images, wrong letters are listed alphabetically, and a repeated or invalid guess is refused rather than counted.',
      { h: 'Wordle' },
      'The five-letter game with the green, yellow and grey feedback, including the fiddly case of a letter that appears twice. Every guess is checked with a binary search against the full list of valid guesses, so only real words count, and you are told why when one does not.',
      { h: 'Checkers' },
      'Two-player checkers themed as the Rebels against the Empire: twelve pieces a side on an eight-by-eight board, legal moves and captures outlined in red, pieces crowned on the far row (where their icon changes to the Rebel or Imperial crest) and able to move backwards, captured pieces collected in trays, and single captures without chained jumps. A game ends when one side has lost all twelve pieces or when every piece it has left is blocked.',
      'Checkers was by far the biggest and most exciting thing I had written at that point, and the first time I had to hold a whole game state in my head.',
    ],
    links: [
      { label: 'Code.org ↗', href: 'https://studio.code.org/projects/applab/40V7TcnK87l1VxSAjbI-VFHSF06Hk2F6qvp6tzq_kRM' },
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Games' },
    ],
  },
  'hs-order66': {
    date: '2021-09-03',
    img: 'highschool/order66.jpg', alt: 'Star Wars: Order 66, a Scratch game',
    title: 'Star Wars: Order 66', year: '2021',
    grade: '10th grade · my first ever',
    tags: 'Scratch · Game',
    long: [
      'A Star Wars game built in Scratch in 10th grade, and the very first thing I ever made: play through Order 66 by dragging blocks together, before I had written a line of real code.',
      'It has no repository and no README; Scratch is the whole record of it, and it still runs in the browser on the project page.',
      'Everything else on this page came after it.',
    ],
    links: [
      { label: 'Play on Scratch ↗', href: 'https://scratch.mit.edu/projects/566525662/' },
    ],
  },
  'hs-periodic-table-explorer': {
    date: '2023',
    img: 'highschool/periodic-table-explorer.png', alt: 'Periodic Table Explorer, a Java console application',
    crop: true,   // a wide console capture: fill the frame from its top-left rather than shrink it to a strip
    title: 'Periodic Table Explorer', year: '2023',
    grade: '11th grade',
    tags: 'Java · Console',
    long: [
      'An interactive Java console application for exploring, searching and testing yourself on the periodic table, written in Spring 2023, my junior year, as my <b>IB Computer Science SL Internal Assessment</b>.',
      { facts: [['1,273', 'lines of Java'], ['7', 'classes'], ['85', 'pages of IA write-up'], ['6/7', 'IB exam score']] },
      'It was built for a chemistry teacher who wanted a free tool for her students after the equivalent features on Quizlet went behind a paywall. It lists all 118 elements with their attributes in order, searches by name or symbol, and generates customisable quizzes: free-response, multiple-choice or a mix, over a chosen atomic-number range, with optional hints. Under the hood it is object-oriented Java with recursion, 2D arrays and nested loops.',
      { h: 'What it does' },
      { list: [
        '<b>View</b> every element, or <b>filter</b> the table by any of eleven attributes.',
        '<b>Random</b> element from the whole table or from a range (1 to 30, 31 to 60, 61 to 90, 91 to 118).',
        '<b>Search</b> by name or symbol, ranked by a two-letter prefix, then a one-letter prefix, then any two letters in a row.',
        '<b>Test</b> yourself with 5, 10, 15, 20 or any number of questions, answered by name, by symbol or a mix, as free response, multiple choice from four shuffled options, or both. Type 0 for a hint, up to four of them in order: the element’s phase, type, period and group. At the end it tells you your score and lets you go back through every answer.',
      ] },
      { h: 'The Internal Assessment' },
      'The write-up runs to 85 pages, from planning with my client through design, a record of tasks, development and evaluation. We agreed eight success criteria at the start and it met six; the two it missed were choosing your own elements to be tested on, and running on a phone, which Coding Rooms could not do. Her recommendations for a next version were more attributes, like discovery and electron configuration, searching by group, and a graphical interface.',
      'My class was the first at our school to take IB Computer Science, so we were the test group, with limited resources and prep time for the students and the teacher alike. I finished with an <b>A</b> in the class and the highest score in it, a <b>6/7</b> on the IB Computer Science SL exam.',
    ],
    /* the Coding Rooms workspace link is gone: the service was folded into
       zyBooks and the old address lands on zyBooks' home page */
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/TheAbubakrAbu/Periodic-Table-Explorer' },
    ],
  },

};
