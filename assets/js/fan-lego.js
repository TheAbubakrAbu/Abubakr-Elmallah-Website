/* fan-lego.js: content for /franchises/lego/. Rendered by fanpage.js.
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
     first sort key carries `dir: 'desc'`, so the page actually opens on my
     highest-rated one and reads down from there.

     `done` / `hours` / `shot` are mine, and they travel together: a screenshot
     here means I took that one to a hundred percent, and `hours` is the Steam
     play time read off that same screenshot rather than an estimate. Shots live
     in /assets/img/franchises/lego/; a title with `done` but no file yet just
     renders without one (fanpage.js drops the link if the image 404s).

     `rating` is mine too, out of ten, and it is a rating of the GAME rather
     than of the licence: Pirates scores above The Skywalker Saga because the
     older, smaller one is a better-made thing, not because I like pirates more
     than Star Wars. Every title carries one, including the ones I have not
     taken to a hundred percent, so the ratings sort covers the whole list.

     `proj` is NOT mine: it is the HowLongToBeat community Completionist average
     in hours, pulled per title so the whole column uses one methodology rather
     than a different forum thread each time. Every title has one, which is what
     makes the comparison work. Two of them rest on thin samples — LEGO Worlds
     (11 submissions) and LEGO Dimensions (14) — against 80–690 for the rest. */
  { id: 'catalogue', kind: 'tiles', title: 'The LEGO Games', note: 'from ttgames.com/games', compact: true, cols: 3,
    tally: 'at 100%',
    views: true,
    sortable: { label: 'Sort', by: [
      { key: 'rating', label: 'My rating',    asc: 'Worst',    desc: 'Best', dir: 'desc' },
      { key: 'year',   label: 'Release date', asc: 'Oldest',   desc: 'Newest' },
      { key: 'hours',  label: 'My time',      asc: 'Quickest', desc: 'Longest' },
      { key: 'proj',   label: 'Projected',    asc: 'Shortest', desc: 'Longest' },
    ] },
    lede: 'TT Games’ own catalogue, running from LEGO Star Wars in 2005 forwards, sortable by what I rate it, by release date, by how long each one took me, or by how long it is reckoned to take. Switch between grid and list: grid is the banner and the numbers, list opens every screenshot out next to it. The handheld-only spin-offs and the console bundles are left out, because a bundle is not really its own game and the handheld ones were made by a different studio entirely; what is left is the main line, all of it on Steam bar LEGO Dimensions, which was toys-to-life with a physical portal and could never have been on PC. The green stamp is mine: every one with a screenshot under it is one I took to a hundred percent, and the Steam library page is the receipt for the hours next to it. The grey figure beside it is the HowLongToBeat community Completionist average for that game, so every title carries a projected run whether I have finished it or not, and the finished ones show the gap.',
    items: [
      { title: 'LEGO Batman: Legacy of the Dark Knight', accent: '#8f98a8', year: 2026, proj: '33.4', rating: 7.5, sub: '2026 · newest', desc: 'The most recent one, out this year. The only rating on this page I have not earned yet.' },
      { title: 'LEGO Star Wars: The Skywalker Saga', accent: '#ffd21f', year: 2022, proj: '90.0', rating: 8.5, sub: '2022 · Steam', desc: 'All nine films, rebuilt from scratch. Nearly eighty hours, which is more than twice any other one of these.',
        done: true, hours: '79.4', shot: '/assets/img/franchises/lego/skywalker-saga-steam.jpg',
        shotAlt: 'Steam library page for LEGO Star Wars: The Skywalker Saga, 79.4 hours played and 45 of 45 achievements' },
      { title: 'The LEGO Movie 2 Videogame', accent: '#4fc0e0', year: 2019, proj: '16.5', rating: 6.6, sub: '2019 · Steam', desc: 'Building as a mechanic rather than a cutscene.' },
      { title: 'LEGO DC Super-Villains', accent: '#8f6fd0', year: 2018, proj: '41.8', rating: 8.3, sub: '2018 · Steam', desc: 'You play a custom villain. Easily the best idea they had in the late run.' },
      { title: 'LEGO The Incredibles', accent: '#e0642a', year: 2018, proj: '20.2', rating: 6.5, sub: '2018 · Steam', desc: 'Both films, and crime waves in the open world.' },
      { title: 'LEGO Marvel Super Heroes 2', accent: '#d01012', year: 2017, proj: '60.0', rating: 7.8, sub: '2017 · Steam', desc: 'Chronopolis, and Kang pulling eras together.' },
      { title: 'LEGO Ninjago Movie Game', accent: '#e0b040', year: 2017, proj: '17.8', rating: 5.8, sub: '2017 · Steam', desc: 'Tied to the film rather than the series, which is the problem with it.' },
      { title: 'LEGO Worlds', accent: '#00852b', year: 2017, proj: '36.7', rating: 6.0, sub: '2017 · Steam', desc: 'The sandbox one. Not a TT-formula game at all.' },
      { title: 'LEGO Star Wars: The Force Awakens', accent: '#ffd21f', year: 2016, proj: '30.8', rating: 8.0, sub: '2016 · Steam', desc: 'Multi-build, and blaster battles with cover.',
        done: true, hours: '24.6', shot: '/assets/img/franchises/lego/force-awakens-steam.jpg',
        shotAlt: 'Steam library page for LEGO Star Wars: The Force Awakens, 24.6 hours played and 69 of 69 achievements' },
      { title: 'LEGO Marvel’s Avengers', accent: '#d01012', year: 2016, proj: '36.4', rating: 6.8, sub: '2016 · Steam', desc: 'Uses the actual film audio, which the silent ones never needed.' },
      { title: 'LEGO Dimensions', accent: '#8f6fd0', year: 2015, proj: '61.9', rating: 7.0, sub: '2015 · console only', desc: 'Toys-to-life with a physical portal you built and rebuilt. Never on Steam and never could have been: the hardware was the point.' },
      { title: 'LEGO Jurassic World', accent: '#e0642a', year: 2015, proj: '29.7', rating: 7.6, sub: '2015 · Steam', desc: 'All four films at the time, and you can play as the dinosaurs.' },
      { title: 'LEGO Batman 3: Beyond Gotham', accent: '#0055bf', year: 2015, proj: '35.9', rating: 7.4, sub: '2015 · Steam', desc: 'The Justice League in space, with the Lantern corps.' },
      { title: 'LEGO The Hobbit', accent: '#9a7a4a', year: 2014, proj: '36.8', rating: 6.4, sub: '2014 · Steam', desc: 'Only ever covered two of the three films. It just stops.' },
      { title: 'The LEGO Movie Videogame', accent: '#4fc0e0', year: 2014, proj: '17.6', rating: 7.2, sub: '2014 · Steam', desc: 'The film, and the instruction-following joke made playable.' },
      { title: 'LEGO Marvel Super Heroes', accent: '#d01012', year: 2013, proj: '39.5', rating: 9.5, sub: '2013 · Steam', desc: 'The best open world they built. Manhattan, properly.',
        done: true, hours: '34.1', shot: '/assets/img/franchises/lego/marvel-super-heroes-steam.jpg',
        shotAlt: 'Steam library page for LEGO Marvel Super Heroes, 34.1 hours played and 45 of 45 achievements' },
      { title: 'LEGO City Undercover', accent: '#00852b', year: 2013, proj: '48.8', rating: 8.6, sub: '2013 · Steam', desc: 'A LEGO game with actual voice acting, and a straight-faced police story.' },
      { title: 'LEGO Lord of the Rings', accent: '#d9b45f', year: 2012, proj: '33.6', rating: 8.4, sub: '2012 · Steam', desc: 'Used the film audio for the first time, and Middle-earth as one open map.' },
      { title: 'LEGO Batman 2: DC Super Heroes', accent: '#0055bf', year: 2012, proj: '24.1', rating: 8.2, sub: '2012 · Steam', desc: 'The first one with speech, and an open Gotham.' },
      { title: 'LEGO Harry Potter: Years 5–7', accent: '#d9b45f', year: 2011, proj: '24.8', rating: 8.8, sub: '2011 · Steam', desc: 'Darker, and the spell system is better than the first. Steam sells the two as one Collection, so the counter in the shot is the running total for both: 39.4 hours, of which this half was 19.5.',
        done: true, hours: '19.5', shot: '/assets/img/franchises/lego/harry-potter-years-5-7-steam.jpg',
        shotAlt: 'Steam library page for LEGO Harry Potter Collection after finishing Years 5–7: 39.4 hours across both games and 84 of 84 achievements' },
      { title: 'LEGO Pirates of the Caribbean', accent: '#d8c9a0', year: 2011, proj: '23.0', rating: 9.3, sub: '2011 · Steam', desc: 'All four films at the time. Wildly underrated, and the quickest hundred percent of the lot.',
        done: true, hours: '15.7', shot: '/assets/img/franchises/lego/pirates-steam.jpg',
        shotAlt: 'Steam library page for LEGO Pirates of the Caribbean, 15.7 hours played' },
      { title: 'LEGO Star Wars III: The Clone Wars', accent: '#ffd21f', year: 2011, proj: '29.3', rating: 7.5, sub: '2011 · Steam', desc: 'Ground battles with commandable troops. Ambitious, and messy.',
        done: true, hours: '24.1', shot: '/assets/img/franchises/lego/clone-wars-steam.jpg',
        shotAlt: 'Steam library page for LEGO Star Wars III: The Clone Wars, 24.1 hours played' },
      { title: 'LEGO Harry Potter: Years 1–4', accent: '#d9b45f', year: 2010, proj: '27.4', rating: 9.2, sub: '2010 · Steam', desc: 'Hogwarts as the hub, which is exactly right. The shot is the Collection paused after this half: 36 of the 84 achievements, all of them this game’s.',
        done: true, hours: '19.9', shot: '/assets/img/franchises/lego/harry-potter-years-1-4-steam.jpg',
        shotAlt: 'Steam library page for LEGO Harry Potter Collection after finishing Years 1–4: 19.9 hours played and 36 of 84 achievements' },
      { title: 'LEGO Indiana Jones 2: The Adventure Continues', accent: '#c98f4f', year: 2009, proj: '20.5', rating: 7.6, sub: '2009 · Steam', desc: 'Includes a level builder, which almost nobody used.',
        done: true, hours: '19.1', shot: '/assets/img/franchises/lego/indiana-jones-2-steam.jpg',
        shotAlt: 'Steam library page for LEGO Indiana Jones 2: The Adventure Continues, 19.1 hours played' },
      { title: 'LEGO Batman: The Videogame', accent: '#0055bf', year: 2008, proj: '29.3', rating: 9.0, sub: '2008 · Steam', desc: 'Hero and villain campaigns, and still silent. Old enough to predate Steam achievements entirely.',
        done: true, hours: '23.2', shot: '/assets/img/franchises/lego/batman-steam.jpg',
        shotAlt: 'Steam library page for LEGO Batman: The Videogame, 23.2 hours played' },
      { title: 'LEGO Indiana Jones: The Original Adventures', accent: '#c98f4f', year: 2008, proj: '19.3', rating: 9.4, sub: '2008 · Steam', desc: 'The one I played to death before I had seen the films, and the fastest hundred percent of the lot.',
        done: true, hours: '12', shot: '/assets/img/franchises/lego/indiana-jones-steam.jpg',
        shotAlt: 'Steam library page for LEGO Indiana Jones: The Original Adventures, 12 hours played' },
      { title: 'LEGO Star Wars: The Complete Saga', accent: '#ffd21f', year: 2007, proj: '40.2', rating: 9.6, sub: '2007 · Steam', desc: 'All six films in one. The definitive version of the old formula.',
        done: true, hours: '35.2', shot: '/assets/img/franchises/lego/complete-saga-steam.jpg',
        shotAlt: 'Steam library page for LEGO Star Wars: The Complete Saga, 35.2 hours played' },
      { title: 'LEGO Star Wars II: The Original Trilogy', accent: '#ffd21f', year: 2006, proj: '29.6', rating: 9.0, sub: '2006', desc: 'Added character creation and vehicles.' },
      { title: 'LEGO Star Wars: The Video Game', accent: '#ffd21f', year: 2005, proj: '17.6', rating: 8.8, sub: '2005', desc: 'Where all of it starts.' },
    ] },

  { id: 'games', kind: 'cards', title: 'Why They Work', note: 'the formula, unchanged for twenty years',
    lede: 'I grew up on these. LEGO Star Wars first, then Indiana Jones, Batman, the superheroes, Pirates of the Caribbean, and it is not an exaggeration to say the TT Games catalogue is how I met half the other franchises on this website. I played LEGO Indiana Jones years before I saw an Indiana Jones film.',
    items: [
      { title: 'They start with Star Wars', sub: '2005', tag: 'The origin', accent: '#ffd21f',
        desc: 'LEGO Star Wars: The Video Game had no dialogue, a two-player drop-in mode, and a hub you could run around breaking things in. It was meant to be a licensed tie-in and instead invented a genre that ran for twenty years.',
        meta: 'Traveller’s Tales' },
      { title: 'Nobody speaks', sub: 'The first six years', tag: 'The humour', accent: '#d01012',
        desc: 'The early games are silent: grunts, mime and slapstick, retelling films you already knew through pure physical comedy. It is genuinely closer to silent-era film than to a normal game cutscene, and it is funnier than the voiced ones that came later.',
        meta: 'Mime, not dialogue' },
      { title: 'Free Play', sub: 'The whole loop', tag: 'The design', accent: '#0055bf',
        desc: 'Finish a level, then come back with every character unlocked and reach the things you could not before. It turned a linear film adaptation into a collect-a-thon you could pick at for months, and it is why these games have such absurd completion times.',
        meta: 'Gold bricks · red bricks' },
      { title: 'Two players, one couch', sub: 'Drop-in co-op', tag: 'The design', accent: '#00852b',
        desc: 'Every single one is two-player, at any moment, with no setup. That is the real reason so many people my age have these memories at all: they are the games you played with a sibling or a friend who came round.',
        meta: 'Drop in, drop out' },
    ] },

  { id: 'played', kind: 'gallery', title: 'A Hundred Percent', note: 'thirty years of them, and a lot of gold bricks',
    lede: 'LEGO games turned thirty in 2025, and a genuinely unreasonable share of my childhood is inside them. The formula never changed and it never needed to: smash everything, collect the studs, unlock the character, come back with the right ability.',
    items: [
      { title: 'Thirty years of LEGO games', src: '/assets/img/franchises/lego-games-30-years.jpg',
        alt: 'The LEGO Games 30th anniversary page',
        desc: 'LEGO’s own anniversary page for the games. Three decades from LEGO Island to the Skywalker Saga, and the studs never stopped being satisfying to hoover up.',
        meta: '#LEGOGames30' },
      { title: 'LEGO Star Wars, all of it', src: '/assets/img/franchises/star-wars-lego-100.jpg',
        alt: 'Completion screens from five LEGO Star Wars games, all at 100 percent',
        desc: 'The Complete Saga, The Clone Wars, The Force Awakens and The Skywalker Saga, every one of them taken to a hundred percent. The Skywalker Saga alone is 1,200 Kyber bricks and 380 characters.',
        meta: 'Five games · 100.0% each' },
      { title: 'LEGO Pirates of the Caribbean', src: '/assets/img/franchises/lego-pirates-100.jpg',
        alt: 'LEGO Pirates of the Caribbean paused at 100 percent completion',
        desc: 'A hundred percent and eleven and a half billion studs. The four-film adaptation, and the best of the non-Star-Wars LEGO games.',
        meta: '100.0%' },
    ] },

  /* everything from here down is the bricks rather than the games, so it mounts
     at #fanBodyEnd, underneath the hand-written brick cutaway in the page */
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
