/* fan-lego.js: content for /worlds/lego/. Rendered by fanpage.js.
   Piece counts are the retail figures at launch.

   The games come FIRST on this page, because they are the actual reason LEGO
   is on the franchises list at all: the bricks I grew up with, and the TT Games
   catalogue is how I met half the other franchises on this website. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid', note: 'Everyone is into LEGO. LEGO Star Wars first, and then I grew up on the whole run of games: Star Wars, Indiana Jones, Batman, the superheroes, Pirates of the Caribbean.' },
  sections: [

  /* `sortable` puts the order control above the tiles and `views` puts the
     grid/list switch next to it (see fanpage.js). The list below stays in TT
     Games' own order, newest first, because that is how they publish it; the
     sort control opens on release date, oldest first, so the page reads
     forward from LEGO Star Wars in 2005.

     `done` / `hours` / `shot` are mine, and they travel together: a screenshot
     here means I took that one to a hundred percent, and `hours` is the Steam
     play time read off that same screenshot rather than an estimate. Shots live
     in /assets/img/franchises/lego/; a title with `done` but no file yet just
     renders without one (fanpage.js drops the link if the image 404s).
     `shots` is any EXTRA images for a title, beyond the `shot` thumbnail:
     clicking the tile opens the whole set together in the lightbox. Every
     finished game carries the same set: `start-screen` (the game's own title
     screen, as it opens), `pause-screen` (paused, at 100%), `load-game` (the
     save slot at 100.0%, which on most of them also shows the date it was
     last saved, so it is the receipt for `finished`), `characters`, and for
     a few `stud-fountain` or `galaxy-map`. The raw captures behind them live
     in _originals/franchises/lego/<game>/, gitignored like the photographs.

     Why "start-screen" and not "title-screen": that name was used for years
     by the load-game picture, and images carry no ?v=, so every cache on the
     way (the service worker's stale-while-revalidate, the browser, GitHub
     Pages' ten minutes) kept handing out the old picture under the old name.
     A picture that changes gets a new name; a name is never reused.

     `rating` is mine too, out of ten, and ONLY on the games I have actually
     played, which on this page means the finished ones, since `done` and
     `hours` are the only play records I keep. A score on a game I never
     touched would be a review of its reputation, so the rest simply carry no
     rating and sink to the bottom of that sort. It is a rating of the GAME
     rather than of the licence: The Clone Wars outscores The Force Awakens
     because the older, messier one is the better game, not because I prefer
     one era of Star Wars to another.

     `finished` is the date I took it to a hundred percent, ISO, from my own
     record: the Steam page only ever shows when a game was LAST opened, and
     every banner here was captured in one sitting, so the screenshots cannot
     supply it (see `fin` in fanpage.js). The `load-game` shot is the receipt
     where the game stamps its saves. LEGO Batman: The Videogame is the one
     finished game with no date: its save slot carries no timestamp.

     `proj` is NOT mine: it is the HowLongToBeat community Completionist average
     in hours, pulled per title so the whole column uses one methodology rather
     than a different forum thread each time. Every title has one, which is what
     makes the comparison work. Two of them rest on thin samples, LEGO Worlds
     (11 submissions) and LEGO Dimensions (14), against 80–690 for the rest.

     `series` is the licence each game adapts, and it exists for the Group
     control (`groupable`, see fanpage.js): switched on, the catalogue folds
     into one section per series, still in whatever order the sort buttons have
     picked. DC Super-Villains sits under Batman & DC on purpose; it is the
     same continuity from the villains' side. The Ninjago Movie game rides
     with The LEGO Movie, because the film it adapts belongs to that film
     series. The games built on LEGO's own toy lines (Worlds, Dimensions,
     LEGO City) get their own banner, LEGO Originals; an outside licence TT
     only visited once (Pirates, Jurassic World, The Incredibles) goes under
     Standalone rather than getting a one-game section to itself. */
  { id: 'catalogue', kind: 'tiles', title: 'The LEGO Games', note: 'from ttgames.com/games', compact: true, cols: 3,
    tally: 'at 100%',
    views: true,
    groupable: { key: 'series', label: 'Group by series', on: 'On' },
    sortable: { label: 'Sort', by: [
      { key: 'year',   label: 'Release date', asc: 'Oldest',   desc: 'Newest' },
      { key: 'rating', label: 'My rating',    asc: 'Worst',    desc: 'Best' },
      { key: 'hours',  label: 'My time',      asc: 'Quickest', desc: 'Longest' },
      { key: 'proj',   label: 'Projected',    asc: 'Shortest', desc: 'Longest' },
      /* Twelve of the thirteen finished titles carry a `finished` date; LEGO
         Batman: The Videogame does not, and sinks to the bottom of this sort
         the way an unrated game sinks in the rating sort. */
      { key: 'finished', label: 'When I finished it', asc: 'First', desc: 'Most recent' },
    ] },
    lede: 'TT Games’ own catalogue, running from LEGO Star Wars in 2005 forwards, sortable by release date, by what I rate it, by how long each one took me, or by how long it is reckoned to take. Click any finished game to open its screenshots full size. Switch between grid and list: grid is the banner and the numbers, list opens every screenshot out next to it. Or group it by series, which folds the same list into its licences (the six Star Wars games together, the whole Batman and DC run including Super-Villains, LEGO’s own inventions under LEGO Originals, and the one-visit licences under Standalone), each section still in whatever order the sort has picked. Ratings are only on the games I have actually played; the rest stay unscored and sink to the bottom of that sort. The handheld-only spin-offs and the console bundles are left out, because a bundle is not really its own game and the handheld ones were made by a different studio entirely; what is left is the main line, all of it on Steam bar LEGO Dimensions, which was toys-to-life with a physical portal and could never have been on PC. The green stamp is mine: every one with a screenshot under it is one I took to a hundred percent, and the Steam library page is the receipt for the hours next to it. The grey figure beside it is the HowLongToBeat community Completionist average for that game, so every title carries a projected run whether I have finished it or not, and the finished ones show the gap.',
    items: [
      { title: 'LEGO Batman: Legacy of the Dark Knight', accent: '#8f98a8', year: 2026, series: 'Batman & DC', proj: '33.4', sub: '2026 · Steam', desc: 'The most recent one, out this year. Not played yet, so it gets no rating.' },
      { title: 'LEGO Star Wars: The Skywalker Saga', accent: '#ffd21f', year: 2022, series: 'Star Wars', proj: '90.0', rating: 10, sub: '2022 · Steam', desc: 'All nine films, rebuilt from scratch. Nearly eighty hours, which is more than twice any other one of these.',
        done: true, hours: '79.4', shot: '/assets/img/franchises/lego/skywalker-saga/banner.jpg',
        finished: '2022-05-06',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Skywalker Saga, showing my play time' },
      { title: 'The LEGO Movie 2 Videogame', accent: '#4fc0e0', year: 2019, series: 'The LEGO Movie', proj: '16.5', sub: '2019 · Steam', desc: 'Building as a mechanic rather than a cutscene.' },
      { title: 'LEGO DC Super-Villains', accent: '#8f6fd0', year: 2018, series: 'Batman & DC', proj: '41.8', sub: '2018 · Steam', desc: 'You play a custom villain. Easily the best idea they had in the late run.' },
      { title: 'LEGO The Incredibles', accent: '#e0642a', year: 2018, series: 'Standalone', proj: '20.2', sub: '2018 · Steam', desc: 'Both films, and crime waves in the open world.' },
      { title: 'LEGO Marvel Super Heroes 2', accent: '#d01012', year: 2017, series: 'Marvel', proj: '60.0', sub: '2017 · Steam', desc: 'Chronopolis, and Kang pulling eras together.' },
      { title: 'LEGO Ninjago Movie Game', accent: '#e0b040', year: 2017, series: 'The LEGO Movie', proj: '17.8', sub: '2017 · Steam', desc: 'Tied to the film rather than the series, which is the problem with it.' },
      { title: 'LEGO Worlds', accent: '#00852b', year: 2017, series: 'LEGO Originals', proj: '36.7', sub: '2017 · Steam', desc: 'The sandbox one. Not a TT-formula game at all.' },
      { title: 'LEGO Star Wars: The Force Awakens', accent: '#ffd21f', year: 2016, series: 'Star Wars', proj: '30.8', rating: 7, sub: '2016 · Steam', desc: 'Multi-build, and blaster battles with cover.',
        done: true, hours: '24.6', shot: '/assets/img/franchises/lego/force-awakens/banner.jpg',
        finished: '2022-07-17',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'galaxy-map'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Force Awakens, showing my play time' },
      { title: 'LEGO Marvel’s Avengers', accent: '#d01012', year: 2016, series: 'Marvel', proj: '36.4', sub: '2016 · Steam', desc: 'Uses the actual film audio, which the silent ones never needed.' },
      { title: 'LEGO Dimensions', accent: '#8f6fd0', year: 2015, series: 'LEGO Originals', proj: '61.9', sub: '2015 · console only', desc: 'Toys-to-life with a physical portal you built and rebuilt. Never on Steam and never could have been: the hardware was the point.' },
      { title: 'LEGO Jurassic World', accent: '#e0642a', year: 2015, series: 'Standalone', proj: '29.7', sub: '2015 · Steam', desc: 'All four films at the time, and you can play as the dinosaurs.' },
      { title: 'LEGO Batman 3: Beyond Gotham', accent: '#0055bf', year: 2015, series: 'Batman & DC', proj: '35.9', sub: '2015 · Steam', desc: 'The Justice League in space, with the Lantern corps.' },
      { title: 'LEGO The Hobbit', accent: '#9a7a4a', year: 2014, series: 'Middle-earth', proj: '36.8', sub: '2014 · Steam', desc: 'Only ever covered two of the three films. It just stops.' },
      { title: 'The LEGO Movie Videogame', accent: '#4fc0e0', year: 2014, series: 'The LEGO Movie', proj: '17.6', sub: '2014 · Steam', desc: 'The film, and the instruction-following joke made playable.' },
      { title: 'LEGO Marvel Super Heroes', accent: '#d01012', year: 2013, series: 'Marvel', proj: '39.5', rating: 9, sub: '2013 · Steam', desc: 'The best open world they built. Manhattan, properly.',
        done: true, hours: '34.1', shot: '/assets/img/franchises/lego/marvel-super-heroes/banner.jpg',
        finished: '2026-08-02',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Marvel Super Heroes, showing my play time' },
      { title: 'LEGO City Undercover', accent: '#00852b', year: 2013, series: 'LEGO Originals', proj: '48.8', sub: '2013 · Steam', desc: 'A LEGO game with actual voice acting, and a straight-faced police story.' },
      { title: 'LEGO Lord of the Rings', accent: '#d9b45f', year: 2012, series: 'Middle-earth', proj: '33.6', rating: 8, sub: '2012 · Steam', desc: 'Unique among these in a lot of ways: the film audio for the first time, and Middle-earth as one open map you walk from the Shire to Mordor. The story levels are the bad part, repetitive to a fault. A solid eight for how unlike the rest it is, story levels and all.',
        done: true, hours: '25.6', shot: '/assets/img/franchises/lego/lord-of-the-rings/banner.jpg',
        /* from its own load-game screen: slot 1, 8/30/2026, 100.0%; the Steam
           banner reads 48/48 achievements and 25.6 hours the same day */
        finished: '2026-08-30',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO The Lord of the Rings, showing my play time' },
      { title: 'LEGO Batman 2: DC Super Heroes', accent: '#0055bf', year: 2012, series: 'Batman & DC', proj: '24.1', rating: 7, sub: '2012 · Steam', desc: 'The first one with speech, and an open Gotham.',
        done: true, hours: '23.4', shot: '/assets/img/franchises/lego/batman-2/banner.jpg',
        /* from its own load-game screen: slot 1, 8/13/2026, 100.0% */
        finished: '2026-08-13',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Batman 2: DC Super Heroes, showing my play time' },
      { title: 'LEGO Harry Potter: Years 5–7', accent: '#d9b45f', year: 2011, series: 'Harry Potter', proj: '24.8', rating: 9, sub: '2011 · Steam', desc: 'Darker, and the spell system is better than the first. Steam sells the two as one Collection, so the counter in the shot is the running total for both: 39.4 hours, of which this half was 19.5.',
        done: true, hours: '19.5', shot: '/assets/img/franchises/lego/harry-potter-years-5-7/banner.jpg',
        finished: '2025-09-20',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Harry Potter: Years 5–7, showing my play time' },
      { title: 'LEGO Pirates of the Caribbean', accent: '#d8c9a0', year: 2011, series: 'Standalone', proj: '23.0', rating: 9, sub: '2011 · Steam', desc: 'All four films at the time. Wildly underrated, and the quickest hundred percent of the lot.',
        done: true, hours: '15.7', shot: '/assets/img/franchises/lego/pirates/banner.jpg',
        finished: '2023-09-28',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Pirates of the Caribbean, showing my play time' },
      { title: 'LEGO Star Wars III: The Clone Wars', accent: '#ffd21f', year: 2011, series: 'Star Wars', proj: '29.3', rating: 9, sub: '2011 · Steam', desc: 'Ground battles with commandable troops. Ambitious, and messy.',
        done: true, hours: '24.1', shot: '/assets/img/franchises/lego/clone-wars/banner.jpg',
        /* Its library page reads LAST PLAYED Oct 18, 2024, and for a while
           that stood in here as the finish date. It is not one: last played
           is whenever the game was last opened, and this was finished two
           years earlier. The date is from my own record, like the rest. */
        finished: '2022-07-13',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Star Wars III: The Clone Wars, showing my play time' },
      { title: 'LEGO Harry Potter: Years 1–4', accent: '#d9b45f', year: 2010, series: 'Harry Potter', proj: '27.4', rating: 8, sub: '2010 · Steam', desc: 'Hogwarts as the hub, which is exactly right. The shot is the Collection paused after this half: 36 of the 84 achievements, all of them this game’s.',
        done: true, hours: '19.9', shot: '/assets/img/franchises/lego/harry-potter-years-1-4/banner.jpg',
        finished: '2025-09-02',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Harry Potter: Years 1–4, showing my play time' },
      { title: 'LEGO Indiana Jones 2: The Adventure Continues', accent: '#c98f4f', year: 2009, series: 'Indiana Jones', proj: '20.5', rating: 6, sub: '2009 · Steam', desc: 'Includes a level builder, which almost nobody used.',
        done: true, hours: '19.1', shot: '/assets/img/franchises/lego/indiana-jones-2/banner.jpg',
        finished: '2026-08-07',
        shots: ['start-screen', 'pause-screen', 'load-game'],
        shotAlt: 'Steam library banner for LEGO Indiana Jones 2: The Adventure Continues, showing my play time' },
      { title: 'LEGO Batman: The Videogame', accent: '#0055bf', year: 2008, series: 'Batman & DC', proj: '29.3', rating: 8, sub: '2008 · Steam', desc: 'Hero and villain campaigns, and still silent. Old enough to predate Steam achievements entirely.',
        done: true, hours: '23.2', shot: '/assets/img/franchises/lego/batman/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Batman: The Videogame, showing my play time' },
      { title: 'LEGO Indiana Jones: The Original Adventures', accent: '#c98f4f', year: 2008, series: 'Indiana Jones', proj: '19.3', rating: 7, sub: '2008 · Steam', desc: 'The one I played to death before I had seen the films, and the fastest hundred percent of the lot.',
        done: true, hours: '12', shot: '/assets/img/franchises/lego/indiana-jones/banner.jpg',
        finished: '2023-09-16',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Indiana Jones: The Original Adventures, showing my play time' },
      { title: 'LEGO Star Wars: The Complete Saga', accent: '#ffd21f', year: 2007, series: 'Star Wars', proj: '40.2', rating: 10, sub: '2007 · Steam', desc: 'All six films in one. The definitive version of the old formula.',
        done: true, hours: '35.2', shot: '/assets/img/franchises/lego/complete-saga/banner.jpg',
        finished: '2022-07-10',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Complete Saga, showing my play time' },
      { title: 'LEGO Star Wars II: The Original Trilogy', accent: '#ffd21f', year: 2006, series: 'Star Wars', proj: '29.6', sub: '2006', desc: 'Added character creation and vehicles.' },
      { title: 'LEGO Star Wars: The Video Game', accent: '#ffd21f', year: 2005, series: 'Star Wars', proj: '17.6', sub: '2005', desc: 'Where all of it starts.' },
    ] },

  { id: 'played', kind: 'gallery', title: 'A Hundred Percent', note: 'thirty years of them, and a lot of gold bricks',
    lede: 'LEGO games turned thirty in 2025, and a genuinely unreasonable share of my childhood is inside them. The formula never changed and it never needed to: smash everything, collect the studs, unlock the character, come back with the right ability.',
    items: [
      { title: 'Thirty years of LEGO games', src: '/assets/img/franchises/lego/thirty-years.jpg',
        alt: 'The LEGO Games 30th anniversary page',
        desc: 'LEGO’s own anniversary page for the games. Three decades from LEGO Island to the Skywalker Saga, and the studs never stopped being satisfying to hoover up.',
        meta: '#LEGOGames30' },
    ],
    /* the Star Wars run and the Pirates pause screen are captioned once, in
       fan-shots.js, and shown here and on their own pages from the same rows */
    pick: ['lego-star-wars-hundred', 'lego-pirates-hundred'] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'On Screen', note: 'the films and the series',
    lede: 'The games are the catalogue above, all twenty-nine of them. This is the other half: five cinema films and the television line, which by now has run longer than most of the things it parodies.',
    items: [
      { title: 'The Films', sub: '2014 – 2024', unit: 'film',
        desc: 'The first one is a genuinely good film about creativity that also happens to be a two-hour toy advert, and it knows it.',
        rows: [
          { n: 'The LEGO Movie', y: '2014', big: true },
          { n: 'The LEGO Batman Movie', y: '2017' },
          { n: 'The LEGO Ninjago Movie', y: '2017' },
          { n: 'The LEGO Movie 2: The Second Part', y: '2019' },
          { n: 'Piece by Piece', y: '2024' },
        ] },
      { title: 'On Television', sub: '2011 – now', unit: 'series',
        desc: 'Ninjago alone has run for fifteen seasons and has its own page on this site.',
        rows: [
          { n: 'Ninjago', y: '2011', big: true },
          { n: 'LEGO Star Wars: The Freemaker Adventures', y: '2016' },
          { n: 'LEGO Star Wars: the holiday specials', y: '2020' },
          { n: 'Monkie Kid', y: '2020' },
          { n: 'Dreamzzz', y: '2023' },
        ] },
    ] },


  { id: 'system', kind: 'tiles', mount: 'end', title: 'The System', note: 'why any brick fits any other brick',
    lede: 'Every element made since 1958 still clutches with every element made this morning. That is the whole company.',
    items: [
      { title: 'The stud', accent: '#ffd21f', sub: '4.8 mm across', desc: 'Spaced 8 mm centre to centre. Every dimension in the system is a multiple of it.' },
      { title: 'The tube', accent: '#d01012', sub: 'Patented 1958', desc: 'The hollow tube underneath is what makes the clutch work, and the patent that built the company.' },
      { title: 'Plates', accent: '#0055bf', sub: 'Three to a brick', desc: 'Three plates stack to exactly one brick height. Once you know it you cannot unsee it.' },
      { title: '±0.005 mm', accent: '#00852b', sub: 'Moulding tolerance', desc: 'About eighteen elements per million come out out of spec. That is the tolerance a sixty-year-old brick still meets.' },
      { title: 'Six 2×4 bricks', accent: '#ff8c00', sub: '915,103,765 ways', desc: 'The famous number. For eight bricks it runs past nine hundred billion.' },
      { title: 'Minifigure', accent: '#f2cd37', sub: '1978', desc: 'Four centimetres, three points of articulation, and about eight billion produced.' },
    ] },

  { id: 'themes', kind: 'cards', mount: 'end', title: 'The Themes', note: 'the ones that mattered',
    items: [
      { title: 'LEGO City', sub: 'Since 1978', tag: 'Core', desc: 'The default: fire stations, police, trains, and the theme every kid starts on.', meta: 'Town → City' },
      { title: 'LEGO Technic', sub: 'Since 1977', tag: 'Core', desc: 'Gears, axles, pneumatics and differentials: the doorway from toy to engineering.', meta: 'Studless since 2000' },
      { title: 'LEGO Star Wars', sub: 'Since 1999', tag: 'Licence', desc: 'The licence that saved the company, and still its biggest line by a distance.', meta: 'First licensed theme' },
      { title: 'LEGO Ninjago', sub: 'Since 2011', tag: 'Own IP', desc: 'A spinner game that turned into sixteen seasons of television and its own mythology.',
        href: 'https://www.lego.com/en-us/themes/ninjago', link: 'Ninjago at LEGO', meta: 'Spinjitzu' },
      { title: 'LEGO Icons & Ideas', sub: '2008 · 2014', tag: 'Adult', desc: 'Sets aimed squarely at grown-ups, and a platform where fan designs with 10,000 supporters get made for real.',
        href: 'https://ideas.lego.com/', link: 'LEGO Ideas', meta: '18+' },
      { title: 'Bionicle', sub: '2001 – 2010', tag: 'Own IP', desc: 'Constraction figures with a full canon of books, films and websites: the strangest and most beloved thing LEGO ever did.', meta: 'Mata Nui' },
      { title: 'LEGO Mindstorms & SPIKE', sub: '1998 – now', tag: 'Robotics', desc: 'A programmable brick that put robotics in classrooms two decades before it was standard.', meta: 'RCX → EV3 → SPIKE' },
      { title: 'LEGO Architecture', sub: 'Since 2008', tag: 'Adult', desc: 'Landmarks in greys and tans, and the theme that proved the bricks could be a display object.', meta: 'Skylines' },
    ] },

  { id: 'beyond', kind: 'cards', mount: 'end', title: 'Beyond the Bricks', note: 'films, games and parks',
    items: [
      { title: 'The LEGO Movie', sub: '2014', tag: 'Film', desc: 'Everything is awesome, and a film about a corporate toy that is genuinely about creativity versus instructions.', meta: 'Lord & Miller' },
      { title: 'TT Games', sub: 'Since 2005', tag: 'Games', desc: 'LEGO Star Wars, Batman, Indiana Jones, Marvel: thirty years of licences, all in stud form.', meta: 'Silent-era humour' },
      { title: 'LEGOLAND', sub: 'Since 1968', tag: 'Parks', desc: 'Ten resorts worldwide, starting at Billund next to the original factory.',
        href: 'https://www.legoland.com/', link: 'LEGOLAND' },
      { title: 'LEGO Ideas', sub: 'Since 2008', tag: 'Community', desc: 'Ten thousand supporters gets a fan design reviewed, and a royalty if it ships.',
        href: 'https://ideas.lego.com/', link: 'ideas.lego.com' },
      { title: 'BrickLink', sub: 'Acquired 2019', tag: 'Marketplace', desc: 'The fan-built parts marketplace LEGO eventually bought, where you buy the one piece you are missing.',
        href: 'https://www.bricklink.com/', link: 'BrickLink' },
      { title: 'LEGO.com', sub: 'The shop', tag: 'Official', desc: 'Sets, instructions for everything back to the eighties, and the pick-a-brick wall.',
        href: 'https://www.lego.com/', link: 'lego.com' },
    ] },

  /* everything from here down is the bricks rather than the games, so it mounts
     at #fanBodyEnd, underneath the hand-written brick cutaway in the page */
  /* the music: the song, since nothing LEGO is on my playlist yet. `music`
     rather than `themes`, because this page's Themes are the product lines. */
  { id: 'music', kind: 'tiles', compact: true, title: 'The Song', note: 'one track · the one everybody knows',
    lede: 'Nothing LEGO is on my playlist yet, so this is the obvious one, linked to the album’s own upload.',
    items: [
      { title: 'Everything Is Awesome!!!', accent: '#ffd21f', sub: 'Tegan and Sara feat. The Lonely Island · The LEGO Movie · 2014 · 2:44',
        desc: 'Written to be irritating on purpose, nominated for an Oscar anyway, and the only song about conformity that a whole cinema of children has ever sung along to.',
        href: 'https://www.youtube.com/watch?v=FSBr7jB8TxA', link: 'Listen' },
    ] },


  { id: 'links', kind: 'links', mount: 'end', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'TT Games', href: 'https://www.ttgames.com/games',
        desc: 'The studio behind every LEGO game above, and the full catalogue in their own words.' },
      { title: 'LEGO.com', href: 'https://www.lego.com/',
        desc: 'The official site.' },
      { title: 'Brickipedia', href: 'https://brickipedia.fandom.com/wiki/Brickipedia',
        desc: 'Every set, every minifigure, every theme since 1949.' },
      { title: 'BrickLink', href: 'https://www.bricklink.com/',
        desc: 'The parts marketplace, and the best part catalogue anywhere.' },
    ] },

] };
