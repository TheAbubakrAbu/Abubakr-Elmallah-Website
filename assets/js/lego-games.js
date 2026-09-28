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
     Standalone rather than getting a one-game section to itself.

     `hundred` is what 100% takes in that game, as `needs` (gold bricks, red
     bricks or whatever stands in for them, minikits, characters, only the
     ones the game has) and `reward` (the last thing it hands you, and
     whether there is a stud fountain). Researched per game on 2026-09-28
     against the games' fan wikis, completion guides and the Steam
     achievement lists, and checked against my own frames where there is
     one: the stud fountains in four of the shots, the Pirates pause screen
     (85 gold bricks, 200 bottles, 20 hats, 20 ships, 160 compass pieces),
     the Gold Ninja on the beach. Where the sources disagreed the figure was
     left out rather than guessed.

     `unavailable: true` marks a game that cannot be bought on Steam today:
     LEGO Dimensions and the first two LEGO Star Wars games, which never
     were. The tile says so and the tally leaves them out of its total, so
     the count is of the twenty-six you could actually go and play (checked
     against the Steam store on 2026-09-28; LEGO The Lord of the Rings and
     The Hobbit were pulled in 2019 and have been back since 2020).

     `worlds` is the data-fan tag of every franchise page a game adapts, which
     is how those pages show their own games (LEGO_FOR, at the foot). */

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
      /* Fifteen of the sixteen finished titles carry a `finished` date; LEGO
         Batman: The Videogame does not, and sinks to the bottom of this sort
         the way an unrated game sinks in the rating sort. */
      { key: 'finished', label: 'When I finished it', asc: 'First', desc: 'Most recent' },
    ] },
    lede: 'TT Games’ own catalogue, running from LEGO Star Wars in 2005 forwards, sortable by release date, by what I rate it, by how long each one took me, or by how long it is reckoned to take. Click any finished game to open its screenshots full size. Switch between grid and list: grid is the banner and the numbers, list opens every screenshot out next to it. Or group it by series, which folds the same list into its licences (the six Star Wars games together, the whole Batman and DC run including Super-Villains, LEGO’s own inventions under LEGO Originals, and the one-visit licences under Standalone), each section still in whatever order the sort has picked. Ratings are only on the games I have actually played; the rest stay unscored and sink to the bottom of that sort. The handheld-only spin-offs and the console bundles are left out, because a bundle is not really its own game and the handheld ones were made by a different studio entirely; what is left is the main line: twenty-six you can buy on Steam, and three you cannot, the first two LEGO Star Wars games (sold on disc and folded into The Complete Saga) and LEGO Dimensions (toys-to-life with a physical portal, never on PC), which are marked and left out of the count. Every tile also says what a hundred percent takes, in gold bricks, red bricks, minikits and characters, and what the game gives you for it, stud fountain included. The green stamp is mine: every one with a screenshot under it is one I took to a hundred percent, and the Steam library page is the receipt for the hours next to it. The grey figure beside it is the HowLongToBeat community Completionist average for that game, so every title carries a projected run whether I have finished it or not, and the finished ones show the gap.',
    items: [
      { title: 'LEGO Batman: Legacy of the Dark Knight', accent: '#8f98a8', year: 2026, series: 'Batman & DC', proj: '33.4', sub: '2026 · Steam', desc: 'The most recent one, out this year. Not played yet, so it gets no rating.',
        hundred: { needs: '23 red bricks · 10 Batcave minikits · 7 playable characters, and every suit, vehicle, WayneTech cache and puzzle room',
          reward: 'No reward or stud fountain on record yet.' },
        worlds: ['batman'] },
      { title: 'LEGO Star Wars: The Skywalker Saga', accent: '#ffd21f', year: 2022, series: 'Star Wars', proj: '90.0', rating: 10, sub: '2022 · Steam', desc: 'All nine films, rebuilt from scratch. Nearly eighty hours, which is more than twice any other one of these.',
        done: true, hours: '79.4', shot: '/assets/img/franchises/lego/skywalker-saga/banner.jpg',
        finished: '2022-05-06',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Skywalker Saga, showing my play time',
        hundred: { needs: '1,200 Kyber bricks · 19 datacards · 225 minikits · 380 characters',
          reward: 'A lever marked 100% in the Great Temple throne room on Yavin 4: pull it and the cast cheers to an 8-bit fanfare while studs rain down without end, the stud fountain in the shot.' },
        worlds: ['sw'] },
      { title: 'The LEGO Movie 2 Videogame', accent: '#4fc0e0', year: 2019, series: 'The LEGO Movie', proj: '16.5', rating: 6, sub: '2019 · Steam', desc: 'A fun, modern one, but really boring at times, and the story is bad. Its real idea is building as a mechanic rather than a cutscene: you gather bricks and spend them on what a place is missing. Thirteen hours to a hundred percent, second-quickest of these behind LEGO Indiana Jones.',
        done: true, hours: '13', shot: '/assets/img/franchises/lego/movie-2/banner.jpg',
        /* from the frames: the pause screen reads 11:56:03, 475/475 Master
           Pieces, 134,240 studs and 100.0%; the Steam banner reads 13 hours and
           50/50; and Intergalactic Planetary Scavenger, which is the one for
           finishing at 100%, stamps Sep 16 2026 10:36pm, which the load-game
           slot agrees with at 10:37pm */
        finished: '2026-09-16',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'galaxy-map'],
        shotAlt: 'Steam library banner for The LEGO Movie 2 Videogame, showing my play time',
        hundred: { needs: '475 Master Pieces, in place of gold and red bricks',
          reward: 'Nothing but the achievement, Intergalactic Planetary Scavenger, and no stud fountain.' },
        worlds: [] },
      { title: 'LEGO DC Super-Villains', accent: '#8f6fd0', year: 2018, series: 'Batman & DC', proj: '41.8', sub: '2018 · Steam', desc: 'You play a custom villain. Easily the best idea they had in the late run.',
        hundred: { needs: '200 gold bricks · 20 red bricks · 100 minikits · 146 characters',
          reward: 'Every gold brick unlocks Lex Luthor’s Mech. No stud fountain.' },
        worlds: ['batman', 'jl'] },
      { title: 'LEGO The Incredibles', accent: '#e0642a', year: 2018, series: 'Standalone', proj: '20.2', sub: '2018 · Steam', desc: 'Both films, and crime waves in the open world.',
        hundred: { needs: '210 gold bricks · 12 red bricks · 120 minikits · 113 characters',
          reward: 'Nothing but the achievement, Key to the City, and no stud fountain.' },
        worlds: ['pixar'] },
      { title: 'LEGO Marvel Super Heroes 2', accent: '#d01012', year: 2017, series: 'Marvel', proj: '60.0', sub: '2017 · Steam', desc: 'Chronopolis, and Kang pulling eras together.',
        hundred: { needs: '255 gold bricks · 10 pink bricks, its red bricks · 200 minikits · 50 Stan Lees in peril',
          reward: 'A stud fountain, in the trophy room of Avengers Mansion.' },
        worlds: ['mcu', 'spidey'] },
      { title: 'The LEGO Ninjago Movie Video Game', accent: '#e0b040', year: 2017, series: 'The LEGO Movie', proj: '17.8', rating: 9, sub: '2017 · Steam', desc: 'Really fun, really cool and really unique, and it is great seeing Ninjago like this. The one wish is that it had more of the TV show in it, rather than only the film.',
        done: true, hours: '14.4', shot: '/assets/img/franchises/lego/ninjago-movie/banner.jpg',
        /* from the frames: the save slot reads 9/27/2026 8:54pm and 100.0%,
           the Steam banner 14.4 hours and 50/50, and the Gold Ninja unlocked
           at 20:24 the same night */
        finished: '2026-09-27',
        shots: ['start-screen', 'load-game', 'pause-screen', 'characters', 'gold-ninja'],
        /* the rest of that night, thirty frames, in the viewer only: the tile
           keeps the same six every finished game shows (see `more` in
           fanpage.js), and the Ninjago page lays all thirty-six out */
        more: ['main-menu', '2026-09-27-2024-lloyds-card', '2026-09-27-2026-on-the-beach',
          '2026-09-27-2031-paused-at-100', '2026-09-27-2032-lloyd', '2026-09-27-2032-kai',
          '2026-09-27-2033-cole', '2026-09-27-2033-nya', '2026-09-27-2034-zane', '2026-09-27-2035-jay',
          '2026-09-27-2035-the-horned-helmet', '2026-09-27-2036-garmadon', '2026-09-27-2036-pythor',
          '2026-09-27-2037-hypnobrai', '2026-09-27-2037-venomari', '2026-09-27-2037-fangpyre',
          '2026-09-27-2037-constrictai', '2026-09-27-2037-the-generals', '2026-09-27-2038-the-serpentine',
          '2026-09-27-2039-the-staff', '2026-09-27-2039-the-green-ghost', '2026-09-27-2039-the-pirate',
          '2026-09-27-2039-two-in-hoods', '2026-09-27-2040-master-wu', '2026-09-27-2041-in-violet',
          '2026-09-27-2041-the-antlers', '2026-09-27-2041-the-scythe', '2026-09-27-2042-out-in-ninjago',
          '2026-09-27-2042-blades-up', '2026-09-27-2044-back-in-town'],
        shotAlt: 'Steam library banner for The LEGO Ninjago Movie Video Game, showing my play time',
        hundred: { needs: '220 gold bricks · 10 ancient scrolls, its red bricks · 21 Ninjanuity tokens · 101 characters, and no minikits',
          reward: 'The Gold Ninja: every gold brick opens a gate on the beach in Ninjago City Downtown with him behind it, and he is the last character, so picking him up is the last step to 100%. No stud fountain.' },
        worlds: ['ninjago'] },
      { title: 'LEGO Worlds', accent: '#00852b', year: 2017, series: 'LEGO Originals', proj: '36.7', sub: '2017 · Steam', desc: 'The sandbox one. Not a TT-formula game at all.',
        hundred: { needs: 'No hundred percent to chase: gold bricks buy ranks, and a hundred of them make you a Master Builder',
          reward: 'The Master Builder rank is as far as it goes.' },
        worlds: [] },
      { title: 'LEGO Star Wars: The Force Awakens', accent: '#ffd21f', year: 2016, series: 'Star Wars', proj: '30.8', rating: 7, sub: '2016 · Steam', desc: 'Multi-build, and blaster battles with cover.',
        done: true, hours: '24.6', shot: '/assets/img/franchises/lego/force-awakens/banner.jpg',
        finished: '2022-07-17',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'galaxy-map'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Force Awakens, showing my play time',
        hundred: { needs: '250 gold bricks · 18 red bricks · 180 minikits · 35 carbonite bricks · 205 characters',
          reward: 'The 249th gold brick opens the last bonus level, Starkiller Destruction, and finishing it gives the 250th and two mini Starkillers. No stud fountain.' },
        worlds: ['sw'] },
      { title: 'LEGO Marvel’s Avengers', accent: '#d01012', year: 2016, series: 'Marvel', proj: '36.4', sub: '2016 · Steam', desc: 'Uses the actual film audio, which the silent ones never needed.',
        hundred: { needs: '250 gold bricks · 18 red bricks · 150 minikits · 35 Stan Lees in peril · 196 characters',
          reward: 'A stud fountain, inside Avengers Tower in Manhattan.' },
        worlds: ['mcu'] },
      { title: 'LEGO Dimensions', accent: '#8f6fd0', year: 2015, series: 'LEGO Originals', proj: '61.9', sub: '2015 · console only', desc: 'Toys-to-life with a physical portal you built and rebuilt. Never on Steam and never could have been: the hardware was the point.',
        hundred: { needs: 'No real hundred percent: 1,016 gold bricks after the last wave, most of them locked behind physical packs',
          reward: 'No reward, and no stud fountain.' },
        worlds: ['simpsons', 'ttg', 'jp', 'lotr', 'hp', 'ninjago', 'batman', 'jl'],
        unavailable: true },
      { title: 'LEGO Jurassic World', accent: '#e0642a', year: 2015, series: 'Standalone', proj: '29.7', sub: '2015 · Steam', desc: 'All four films at the time, and you can play as the dinosaurs.',
        hundred: { needs: '275 gold bricks · 20 red bricks · 20 amber bricks · 200 minikits · 20 workers in peril',
          reward: 'No stud fountain, and no confirmed reward beyond the achievement.' },
        worlds: ['jp'] },
      { title: 'LEGO Batman 3: Beyond Gotham', accent: '#0055bf', year: 2014, series: 'Batman & DC', proj: '35.9', sub: '2014 · Steam', desc: 'The Justice League in space, with the Lantern corps.',
        hundred: { needs: '250 gold bricks · 20 red bricks · 160 minikits · 30 Adam Wests in peril · over 150 characters',
          reward: 'A stud fountain, in the Watchtower’s control room.' },
        worlds: ['batman', 'jl'] },
      { title: 'LEGO The Hobbit', accent: '#9a7a4a', year: 2014, series: 'Middle-earth', proj: '36.8', sub: '2014 · Steam', desc: 'Only ever covered two of the three films. It just stops.',
        hundred: { needs: '250 mithril bricks · 32 red bricks · 160 minikits · 64 treasures · 98 characters',
          reward: 'Jimli the Blacksmith, playable once every mithril item is forged. No stud fountain.' },
        worlds: ['lotr'] },
      { title: 'The LEGO Movie Videogame', accent: '#4fc0e0', year: 2014, series: 'The LEGO Movie', proj: '17.6', rating: 7, sub: '2014 · Steam', desc: 'The film, and the instruction-following joke made playable. A nice short easy one: fourteen hours to a hundred percent, third-quickest of these behind LEGO Indiana Jones and its own sequel, and it never once fought me. A seven for exactly that.',
        done: true, hours: '14', shot: '/assets/img/franchises/lego/movie/banner.jpg',
        /* from its own load-game screen: slot 1, 9/3/2026 3:34am, 100.0%; the
           Steam banner reads 48/48 achievements and 14 hours the same night,
           and the Everything Is Awesome! achievement stamps 3:07am */
        finished: '2026-09-03',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for The LEGO Movie Videogame, showing my play time',
        hundred: { needs: '70 gold bricks · 20 red bricks · 75 golden instruction pages · 96 characters',
          reward: 'Nothing but the achievement (Everything Is Awesome!), and no stud fountain.' },
        worlds: [] },
      { title: 'LEGO Marvel Super Heroes', accent: '#d01012', year: 2013, series: 'Marvel', proj: '39.5', rating: 9, sub: '2013 · Steam', desc: 'The best open world they built. Manhattan, properly.',
        done: true, hours: '34.1', shot: '/assets/img/franchises/lego/marvel-super-heroes/banner.jpg',
        finished: '2026-08-02',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Marvel Super Heroes, showing my play time',
        hundred: { needs: '250 gold bricks · 11 Deadpool bricks, its red bricks · 150 minikits · 50 Stan Lees in peril · 155 characters',
          reward: 'No reward for 100% and no stud fountain: rescuing all fifty Stan Lees unlocks Stan Lee himself, and every Deadpool brick unlocks Deadpool.' },
        worlds: ['mcu', 'spidey'] },
      { title: 'LEGO City Undercover', accent: '#00852b', year: 2013, series: 'LEGO Originals', proj: '48.8', sub: '2013 · Steam', desc: 'A LEGO game with actual voice acting, and a straight-faced police story.',
        hundred: { needs: '450 gold bricks · 40 red bricks · 60 police shield pieces · 305 characters',
          reward: 'The fortieth red brick is handed over at 100% and turns you into a giant, and a statue in the city pays out studs without end, which is its stud fountain.' },
        worlds: [] },
      { title: 'LEGO Lord of the Rings', accent: '#d9b45f', year: 2012, series: 'Middle-earth', proj: '33.6', rating: 8, sub: '2012 · Steam', desc: 'Unique among these in a lot of ways: the film audio for the first time, and Middle-earth as one open map you walk from the Shire to Mordor. The story levels are the bad part, repetitive to a fault. A solid eight for how unlike the rest it is, story levels and all.',
        done: true, hours: '25.6', shot: '/assets/img/franchises/lego/lord-of-the-rings/banner.jpg',
        /* from its own load-game screen: slot 1, 8/30/2026, 100.0%; the Steam
           banner reads 48/48 achievements and 25.6 hours the same day */
        finished: '2026-08-30',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO The Lord of the Rings, showing my play time',
        hundred: { needs: '250 mithril bricks · 20 red bricks · 180 minikits · more than 80 characters',
          reward: 'Lurtz, newborn, goes on sale for 25,000 studs. No stud fountain.' },
        worlds: ['lotr'] },
      { title: 'LEGO Batman 2: DC Super Heroes', accent: '#0055bf', year: 2012, series: 'Batman & DC', proj: '24.1', rating: 7, sub: '2012 · Steam', desc: 'The first one with speech, and an open Gotham.',
        done: true, hours: '23.4', shot: '/assets/img/franchises/lego/batman-2/banner.jpg',
        /* from its own load-game screen: slot 1, 8/13/2026, 100.0% */
        finished: '2026-08-13',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Batman 2: DC Super Heroes, showing my play time',
        hundred: { needs: '250 gold bricks · 20 red bricks · 150 minikits · 50 citizens in peril · 50 characters',
          reward: 'Harley Quinn’s motorbike, handed over automatically. No stud fountain.' },
        worlds: ['batman', 'jl'] },
      { title: 'LEGO Harry Potter: Years 5–7', accent: '#d9b45f', year: 2011, series: 'Harry Potter', proj: '24.8', rating: 9, sub: '2011 · Steam', desc: 'Darker, and the spell system is better than the first. Steam sells the two as one Collection, so the counter in the shot is the running total for both: 39.4 hours, of which this half was 19.5.',
        done: true, hours: '19.5', shot: '/assets/img/franchises/lego/harry-potter-years-5-7/banner.jpg',
        finished: '2025-09-20',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Harry Potter: Years 5–7, showing my play time',
        hundred: { needs: '200 gold bricks · 96 house crests · 61 students in peril · about 200 characters',
          reward: 'Every gold brick builds a golden Hogwarts that throws studs out of itself, the stud fountain in the shot.' },
        worlds: ['hp'] },
      { title: 'LEGO Pirates of the Caribbean', accent: '#d8c9a0', year: 2011, series: 'Standalone', proj: '23.0', rating: 9, sub: '2011 · Steam', desc: 'All four films at the time, and wildly underrated: a hundred percent in under sixteen hours.',
        done: true, hours: '15.7', shot: '/assets/img/franchises/lego/pirates/banner.jpg',
        finished: '2023-09-28',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Pirates of the Caribbean, showing my play time',
        hundred: { needs: '85 gold bricks · 20 red hats, its red bricks · 200 ships in bottles for 20 minikit ships · 160 compass pieces · about 80 characters',
          reward: 'Nothing but the achievement, Now Bring Me That Horizon, and no stud fountain.' },
        worlds: ['potc'] },
      { title: 'LEGO Star Wars III: The Clone Wars', accent: '#ffd21f', year: 2011, series: 'Star Wars', proj: '29.3', rating: 9, sub: '2011 · Steam', desc: 'Ground battles with commandable troops. Ambitious, and messy.',
        done: true, hours: '24.1', shot: '/assets/img/franchises/lego/clone-wars/banner.jpg',
        /* Its library page reads LAST PLAYED Oct 18, 2024, and for a while
           that stood in here as the finish date. It is not one: last played
           is whenever the game was last opened, and this was finished two
           years earlier. The date is from my own record, like the rest. */
        finished: '2022-07-13',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Star Wars III: The Clone Wars, showing my play time',
        hundred: { needs: '130 gold bricks · 18 red bricks · 220 minikits · 115 characters',
          reward: 'The last 0.2%: the 130 gold bricks build a gold Stealth Ship in the Resolute’s hangar, and it flies off to join your fleet.' },
        worlds: ['sw'] },
      { title: 'LEGO Harry Potter: Years 1–4', accent: '#d9b45f', year: 2010, series: 'Harry Potter', proj: '27.4', rating: 8, sub: '2010 · Steam', desc: 'Hogwarts as the hub, which is exactly right. The shot is the Collection paused after this half: 36 of the 84 achievements, all of them this game’s.',
        done: true, hours: '19.9', shot: '/assets/img/franchises/lego/harry-potter-years-1-4/banner.jpg',
        finished: '2025-09-02',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Harry Potter: Years 1–4, showing my play time',
        hundred: { needs: '200 gold bricks · 20 red bricks · 24 Hogwarts crests · 50 students in peril · 167 characters',
          reward: 'All 200 gold bricks open the last bonus level, Harry’s Destiny, against Voldemort. No stud fountain.' },
        worlds: ['hp'] },
      { title: 'LEGO Indiana Jones 2: The Adventure Continues', accent: '#c98f4f', year: 2009, series: 'Indiana Jones', proj: '20.5', rating: 6, sub: '2009 · Steam', desc: 'Includes a level builder, which almost nobody used.',
        done: true, hours: '19.1', shot: '/assets/img/franchises/lego/indiana-jones-2/banner.jpg',
        finished: '2026-08-07',
        shots: ['start-screen', 'pause-screen', 'load-game'],
        shotAlt: 'Steam library banner for LEGO Indiana Jones 2: The Adventure Continues, showing my play time',
        hundred: { needs: '60 artifacts · 180 coloured bricks · 82 characters, and no gold bricks',
          reward: 'No reward on record, and no stud fountain.' },
        worlds: ['indiana'] },
      { title: 'LEGO Batman: The Videogame', accent: '#0055bf', year: 2008, series: 'Batman & DC', proj: '29.3', rating: 8, sub: '2008 · Steam', desc: 'Hero and villain campaigns, and still silent. Old enough to predate Steam achievements entirely.',
        done: true, hours: '23.2', shot: '/assets/img/franchises/lego/batman/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Batman: The Videogame, showing my play time',
        hundred: { needs: '300 minikits · 30 red power bricks · 25 hostages · 50 characters, and no gold bricks',
          reward: 'Ra’s al Ghul goes on sale. No stud fountain.' },
        worlds: ['batman'] },
      { title: 'LEGO Indiana Jones: The Original Adventures', accent: '#c98f4f', year: 2008, series: 'Indiana Jones', proj: '19.3', rating: 7, sub: '2008 · Steam', desc: 'The one I played to death before I had seen the films, and the fastest hundred percent of the lot.',
        done: true, hours: '12', shot: '/assets/img/franchises/lego/indiana-jones/banner.jpg',
        finished: '2023-09-16',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Indiana Jones: The Original Adventures, showing my play time',
        hundred: { needs: '180 treasure pieces for 18 artifacts · 18 parcels, its red bricks · 83 characters, and no gold bricks',
          reward: 'Studs rain across Barnett College, the stud fountain in the shot.' },
        worlds: ['indiana'] },
      { title: 'LEGO Star Wars: The Complete Saga', accent: '#ffd21f', year: 2007, series: 'Star Wars', proj: '40.2', rating: 10, sub: '2007 · Steam', desc: 'All six films in one. The definitive version of the old formula.',
        done: true, hours: '35.2', shot: '/assets/img/franchises/lego/complete-saga/banner.jpg',
        finished: '2022-07-10',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Complete Saga, showing my play time',
        hundred: { needs: '160 gold bricks · 36 red power bricks · 360 minikit pieces · 126 characters',
          reward: 'All 160 gold bricks build a stud fountain outside the Mos Eisley Cantina.' },
        worlds: ['sw'] },
      { title: 'LEGO Star Wars II: The Original Trilogy', accent: '#ffd21f', year: 2006, series: 'Star Wars', proj: '29.6', sub: '2006', desc: 'Added character creation and vehicles.',
        hundred: { needs: '99 gold bricks · 18 red power bricks · 180 minikit pieces · 68 characters',
          reward: 'All 99 gold bricks build a stud fountain outside the Mos Eisley Cantina, and every minikit unlocks Slave I.' },
        worlds: ['sw'],
        unavailable: true },
      { title: 'LEGO Star Wars: The Video Game', accent: '#ffd21f', year: 2005, series: 'Star Wars', proj: '17.6', sub: '2005', desc: 'Where all of it starts.',
        hundred: { needs: '170 minikit pieces · 56 characters, and no gold bricks, no red bricks and no percentage at all',
          reward: 'True Jedi on every level builds the Super-Kit, the Rebel Blockade Runner, which opens a bonus level of A New Hope. No stud fountain.' },
        worlds: ['sw'],
        unavailable: true },
    ] };

/* ── the same tiles on a franchise's own page ──
   LEGO_FOR(tag) hands a franchise page its own LEGO games as a section, out
   of this same list and oldest first, so the Jurassic Park page and the LEGO
   page cannot describe LEGO Jurassic World two ways; it returns null for a
   tag no game carries, and fanpage.js skips a null section. LEGO_GAME(title)
   hands over one game, for a page that already lays out a list of its own
   (the Star Wars page's finished games). */
window.LEGO_GAME = function (title) {
  var items = (window.LEGO_GAMES && window.LEGO_GAMES.items) || [];
  for (var i = 0; i < items.length; i++) if (items[i].title === title) return items[i];
  return null;
};

window.LEGO_FOR = function (tag, over) {
  var cat = window.LEGO_GAMES;
  if (!cat) return null;
  var items = cat.items.filter(function (it) { return (it.worlds || []).indexOf(tag) !== -1; }).reverse();
  if (!items.length) return null;
  var n = items.length;
  var done = items.filter(function (it) { return it.done; }).length;
  var WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var word = function (k) { return WORDS[k] || String(k); };
  var sec = {
    id: 'lego-games', kind: 'tiles', compact: true, views: true, cols: n === 1 ? 2 : Math.min(n, 3),
    title: n === 1 ? 'The LEGO Game' : 'The LEGO Games',
    note: (n === 1 ? 'one' : word(n)) + ' from TT Games'
      + (done ? ' \u00b7 ' + (done === n ? (n === 1 ? 'finished' : 'all finished') : word(done) + ' finished') : ''),
    lede: 'The same tiles as the catalogue on the LEGO page, out of the same list: my rating, my time and the screenshots on any I have finished, what a hundred percent takes, and what the game hands you for it. Switch to the list view for every screenshot.',
    tally: n > 1 ? 'at 100%' : false,
    items: items,
  };
  if (n > 3) sec.sortable = { label: 'Sort', by: cat.sortable.by };
  if (over) for (var k in over) sec[k] = over[k];
  return sec;
};
