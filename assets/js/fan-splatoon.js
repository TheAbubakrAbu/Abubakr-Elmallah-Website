/* fan-splatoon.js: content for /worlds/splatoon/. Rendered by fanpage.js.
   A shooter you win by covering the floor, which is the one design decision
   that let Nintendo make a shooter at all. */
/* The `when:` line is Abubakr's own: Splatoon 2 on the Switch he had from
   launch week, and his review of it was "oh my gosh". The ◆ in the index
   is his. */
window.FAN_PAGE = {
  when: { at: 'Splatoon 2, summer 2017',
          note: 'On the Switch from that spring. “Oh my gosh” is the whole review.' },
  sections: [

  { id: 'games', kind: 'films', title: 'The Three', note: '2015 · 2017 · 2022',
    lede: 'One game, then the same game on hardware people actually owned, then the same game again with ten years of accumulated ideas in it. That is not a criticism: the first one was already right.',
    items: [
      { num: 'I', title: 'Splatoon', sub: 'Wii U · 2015', accent: '#c6f03a',
        desc: 'Shipped with five weapons, five maps and one mode, on a console nobody had. It sold about five million anyway, which on the Wii U’s install base is extraordinary, and it did it by being the first genuinely new competitive shooter idea in about fifteen years.',
        meta: 'On the console nobody bought' },
      { num: 'II', title: 'Splatoon 2', sub: 'Switch · 2017', accent: '#8fd8f0',
        desc: 'The same game on a machine people were buying, plus Salmon Run, which is a co-operative horde mode about collecting fish eggs under a rising tide and is better than most games that are only that. The Octo Expansion in 2018 is the hardest thing Nintendo has published in years. This is the one I have, and the one I fell for.',
        meta: 'Salmon Run, and the Octo Expansion' },
      { num: 'III', title: 'Splatoon 3', sub: 'Switch · 2022', accent: '#e04a9a',
        desc: 'Stringers, Splatanas, a single-player campaign worth playing, and Tableturf Battle, a full card game sitting inside it as a side mode. Side Order in 2024 turned the expansion into a roguelike. The most complete version of the idea.',
        meta: 'And a card game inside it' },
    ] },

  { id: 'turf', kind: 'cards', title: 'How It Works', note: 'the one decision',
    lede: 'Every other thing in this game falls out of a single choice: the ink is both the scoreboard and the terrain. Nobody else has done this, and it is not obvious why not.',
    items: [
      { title: 'The floor is the score', sub: 'Not the kill count', tag: 'The objective', accent: '#c6f03a',
        desc: 'Four on four, three minutes, and at the end they measure the percentage of the ground in each colour. Splatting somebody buys you a few seconds of their absence; it does not score. A player who never fights anybody can carry a match.',
        meta: 'Three minutes, then they measure' },
      { title: 'You swim in your own ink', sub: 'The paint is the movement', tag: 'The verb', accent: '#8fd8f0',
        desc: 'Turn into a squid and you move through your own colour faster than you can run, hidden, refilling your tank as you go. So painting is the objective, the movement system and the reload, all at once, and the enemy’s colour is quicksand.',
        meta: 'Faster, hidden, and reloading' },
      { title: 'Nobody dies', sub: 'It is why it exists', tag: 'The rating', accent: '#e04a9a',
        desc: 'The reason Nintendo could publish a shooter. You are splatted and you respawn in a second, there is no blood and no gun in the ordinary sense, and the whole aesthetic is a skate park rather than a battlefield.',
        meta: 'Splatted, not shot' },
      { title: 'It started as tofu', sub: 'White blocks squirting ink', tag: 'The prototype', accent: '#f0c040',
        desc: 'The first working version was two teams of white rectangles shooting ink at a floor. The squid came months later, when they needed a reason for a thing to swim through paint. The mechanic came first and the characters were built to justify it.',
        meta: 'The mechanic came first' },
      { title: 'Two stages, two hours', sub: 'The rotation', tag: 'The rhythm', accent: '#b06fd8',
        desc: 'You do not pick the map. Two are in rotation at a time and they change every couple of hours, which is either the best or the worst thing about it depending on which two are up.',
        meta: 'You do not get to choose' },
      { title: 'Splatfests', sub: 'A referendum with a shooter attached', tag: 'The event', accent: '#3fd589',
        desc: 'A weekend-long question, usually stupid on purpose, that splits the entire player base into teams and then paints the results. Ketchup or mayonnaise was a real one and it settled nothing.',
        meta: 'Ketchup or mayonnaise' },
    ] },

  { id: 'weapons', kind: 'tiles', title: 'The Classes', note: 'eleven of them', compact: true,
    lede: 'Every weapon is really a shape: how much floor it covers, how far away, and how fast. Pick the shape and the role follows.',
    items: [
      { title: 'Shooters', accent: '#c6f03a', sub: 'The default',
        desc: 'Middle of everything. The Splattershot is the weapon the tutorial hands you and the one that wins the most matches.' },
      { title: 'Rollers', accent: '#e04a9a', sub: 'Paint the floor',
        desc: 'Drive over the ground to cover it, or flick it out in an arc. Enormous coverage, no range at all.' },
      { title: 'Chargers', accent: '#8fd8f0', sub: 'The sniper',
        desc: 'Hold to charge, fire a line across the map. Paints almost nothing and decides matches anyway.' },
      { title: 'Sloshers', accent: '#f0a83a', sub: 'A bucket',
        desc: 'Throw ink over cover in an arc. The class that punishes anybody hiding behind a wall.' },
      { title: 'Splatlings', accent: '#5fa3ec', sub: 'The minigun',
        desc: 'Spin up, then hold a lane. Slow to start and impossible to walk into once it is going.' },
      { title: 'Dualies', accent: '#b06fd8', sub: 'Two, and a dodge roll',
        desc: 'Added in 2. The only class with a proper evasive move, which changes how the whole fight reads.' },
      { title: 'Brellas', accent: '#3fd589', sub: 'A shield',
        desc: 'A shotgun with an umbrella on it that you can plant as cover for the team. Nobody else in the genre has this.' },
      { title: 'Brushes', accent: '#e8c247', sub: 'The fastest thing on the map',
        desc: 'Runs at a speed nothing else matches, painting a thin line. Almost no damage, and completely maddening to play against.' },
      { title: 'Blasters', accent: '#e04a3a', sub: 'It explodes',
        desc: 'Fires a shot that detonates, so you do not have to be accurate, you have to be near.' },
      { title: 'Stringers', accent: '#7fd0e8', sub: 'A bow · added in 3',
        desc: 'Three arrows that stick and then burst, so you shoot the floor ahead of somebody rather than at them.' },
      { title: 'Splatanas', accent: '#f0e03f', sub: 'A wiper · added in 3',
        desc: 'A squeegee. Swing it for a wave, or charge it for a line. Melee that actually paints.' },
    ] },

  /* the complete index. ◆ marks the one that is mine. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'three games, two expansions, the modes',
    lede: 'A small series that has never been diluted: three games in ten years, two paid expansions, and no spin-offs at all.',
    items: [
      { title: 'The Games', sub: '2015 – 2022', unit: 'game',
        desc: 'One per console generation, and each one has kept everything the last one worked out.',
        rows: [
          { n: 'Splatoon', y: '2015' },
          { n: 'Splatoon 2', y: '2017' , big: true },
          { n: 'Splatoon 3', y: '2022' },
        ] },
      { title: 'The Expansions', sub: '2018 · 2024', unit: 'expansion',
        desc: 'Both single-player, and both much harder than the games they are attached to.',
        rows: [
          { n: 'Octo Expansion', y: '2018' },
          { n: 'Side Order', y: '2024' },
        ] },
      { title: 'The Modes', sub: 'across the three', unit: 'mode',
        desc: 'Turf War is the one the game is about. The other four are the ranked ladder, and the last two are not shooting at anybody.',
        rows: [
          { n: 'Turf War', y: '2015' },
          { n: 'Splat Zones', y: '2015' },
          { n: 'Tower Control', y: '2015' },
          { n: 'Rainmaker', y: '2015' },
          { n: 'Clam Blitz', y: '2017' },
          { n: 'Salmon Run', y: '2017' },
          { n: 'Tableturf Battle', y: '2022' },
        ] },
      { title: 'The Bands', sub: 'the idols', unit: 'act',
        desc: 'Each game has a pair or trio who announce the map rotation and then headline the Splatfest, and the in-game music is credited to them.',
        rows: [
          { n: 'Squid Sisters · Callie and Marie', y: '2015' },
          { n: 'Off the Hook · Pearl and Marina', y: '2017' },
          { n: 'Deep Cut · Shiver, Frye, Big Man', y: '2022' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'three tracks',
    lede: 'The soundtrack is credited to bands who exist inside the game, sung in an invented language, and it is genuinely good rather than good-for-a-game.',
    items: [
      { title: 'Splattack!', accent: '#c6f03a', sub: 'Squid Squad · Splatoon · 2015 · 2:19',
        desc: 'The first one, and the track that told everybody this game was not going to sound like a Nintendo game.',
        href: 'https://www.youtube.com/watch?v=LBQmvJyIKTg', link: 'Listen' },
      { title: 'Calamari Inkantation', accent: '#e04a9a', sub: 'Squid Sisters · Splatoon · 2015 · 1:52',
        desc: 'Plays over the final boss of the first game, and the series has since built actual plot around the fact that it is the song.',
        href: 'https://www.youtube.com/watch?v=UC7wfAKDizU', link: 'Listen' },
      { title: 'Anarchy Rainbow', accent: '#f0a83a', sub: 'Deep Cut · Splatoon 3 · 2022 · 2:14',
        desc: 'Three voices, three instruments and no shared key signature to speak of. The Splatfest track from the third game.',
        href: 'https://www.youtube.com/watch?v=DtMOAvOWTvY', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Splatoon',
        desc: 'The series, the tofu prototype, and the Splatfest results nobody accepts.' },
      { title: 'Inkipedia', href: 'https://splatoonwiki.org/wiki/Main_Page',
        desc: 'Every weapon kit, every map, and frame data for things Nintendo has never published.' },
      { title: 'Splatoon 3', href: 'https://splatoon.nintendo.com/',
        desc: 'Nintendo’s own page for the current one.' },
    ] },

] };
