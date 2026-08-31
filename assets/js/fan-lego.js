/* fan-lego.js: content for /worlds/lego/. Rendered by fanpage.js.
   Piece counts are the retail figures at launch.

   The games come FIRST on this page, because they are the actual reason LEGO
   is on the franchises list at all: the bricks I grew up with, and the TT Games
   catalogue is how I met half the other franchises on this website. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid', note: 'Everyone is into LEGO. LEGO Star Wars first, and then I grew up on the whole run of games: Star Wars, Indiana Jones, Batman, the superheroes, Pirates of the Caribbean.' },
  sections: [

  /* every LEGO game, in lego-games.js, because /gaming/ shows the same
     section and neither page should hold a second copy of the list */
  window.LEGO_GAMES,


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
