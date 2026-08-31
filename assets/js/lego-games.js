/* lego-games.js: the TT Games catalogue, written down once.

   Every LEGO game TT has made, with my rating, my hours, the date I finished
   it and the screenshots behind that. It used to live inside fan-lego.js. It
   is out here because /gaming/ shows the same section, and a second copy of
   twenty-nine games would have drifted from this one the first time either
   was corrected: the LEGO page and /gaming/ now render the SAME object, so
   there is exactly one list and one set of numbers.

   Loads before fan-lego.js and before gaming-data.js, both of which reference
   `window.LEGO_GAMES` where the section used to be spelled out. A page that
   forgets to load this file renders that section empty rather than breaking,
   the same way a page without fan-shots.js does.

     `sortable` puts the order control above the tiles and `views` puts the
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

window.LEGO_GAMES =
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
    ] };
