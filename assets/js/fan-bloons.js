/* fan-bloons.js: content for /worlds/bloons/. Rendered by fanpage.js.
   A Flash game about monkeys that turned into one of the deepest tower
   defence systems anyone has shipped. */
window.FAN_PAGE = {
  when: { at: 'Since the browser days', note: 'Started on the Flash versions in a school computer lab, the way everyone did, and BTD6 is the one that stuck.' },
  sections: [

  { id: 'towers', kind: 'cards', title: 'The Monkeys', note: 'and the balloons they are trying to pop',
    lede: 'The system is small enough to explain in a paragraph and deep enough to have been argued about for eighteen years. Balloons walk a fixed path. You buy monkeys. Monkeys pop balloons. Everything interesting comes from what happens underneath that.',
    items: [
      { title: 'Layers', sub: 'A balloon is a stack', tag: 'The core idea', accent: '#d84a3a',
        desc: 'Popping a red bloon removes it. Popping a blue one leaves a red. A ceramic takes ten hits and then leaves two of whatever was inside. Damage is not a number you compare to health, it is a number of layers you peel, which changes what every tower is actually for.',
        meta: 'Red, blue, green, yellow, pink, black, white, purple, lead, zebra, rainbow, ceramic' },
      { title: 'Immunities', sub: 'Not everything can pop everything', tag: 'The constraint', accent: '#8f7fd0',
        desc: 'Black bloons are immune to explosions. White ones are immune to ice. Lead cannot be popped by sharp objects. Purple is immune to magic, fire and energy. Camo cannot be seen at all without a tower that grants detection. A board with no answer to one of these simply loses.',
        meta: 'The reason you cannot just buy the best tower' },
      { title: 'Two paths of three', sub: 'The upgrade rule', tag: 'The depth', accent: '#5fbf7f',
        desc: 'Every tower has three upgrade paths and you may only take two of them, and only one of those beyond tier two. So a dart monkey is not one tower, it is a set of mutually exclusive towers, and the choice is permanent.',
        meta: 'Introduced properly in BTD6' },
      { title: 'MOAB class', sub: 'The big ones', tag: 'The escalation', accent: '#e0a83a',
        desc: 'Massive Ornary Air Blimp, and it gets worse: BFB, ZOMG, DDT, BAD. Each one splits into several of the previous one. The late rounds of a freeplay game are a wall of blimps that each contain a wall of blimps.',
        meta: 'BAD: Big Airship of Doom' },
      { title: 'Heroes', sub: 'One per game, they level themselves', tag: 'BTD6', accent: '#4f9fe0',
        desc: 'Quincy, Gwendolin, Obyn, Adora and the rest: one tower you can only place once, which gains levels on its own as the rounds pass rather than being bought upward.',
        meta: 'Twenty-odd of them now' },
      { title: 'Still updating', sub: 'Seven years and counting', tag: 'The oddity', accent: '#c9a05f',
        desc: 'BTD6 shipped in 2018 as a mobile sequel to a browser game and Ninja Kiwi have kept adding to it ever since. It has outlived Flash itself, which is the platform the whole series started on.',
        meta: 'Ninja Kiwi, Auckland' },
    ] },

  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the tower defence line, and the rest',
    lede: 'Bloons started in 2007 as a puzzle game about a monkey throwing darts. The tower defence spin-off arrived a few months later and completely ate the parent series.',
    items: [
      { title: 'Bloons TD', sub: '2007 – now', unit: 'game',
        desc: 'The main line. BTD5 is the browser and mobile classic; BTD6 is the one still being updated.',
        rows: [
          { n: 'Bloons Tower Defense', y: '2007' },
          { n: 'Bloons TD 2', y: '2008' },
          { n: 'Bloons TD 3', y: '2008' },
          { n: 'Bloons TD 4', y: '2009' },
          { n: 'Bloons TD 5', y: '2011', big: true },
          { n: 'Bloons TD Battles', y: '2012' },
          { n: 'Bloons TD 6', y: '2018', big: true },
          { n: 'Bloons TD Battles 2', y: '2022' },
          { n: 'Bloons Card Storm', y: '2024' },
        ] },
      { title: 'The Rest of Bloons', sub: '2007 – 2016', unit: 'game',
        desc: 'The original puzzle series the tower defence games were spun out of, plus the odd experiment.',
        rows: [
          { n: 'Bloons', y: '2007' },
          { n: 'Bloons 2', y: '2008' },
          { n: 'Bloons Player Pack series', y: '2008' },
          { n: 'Bloons Super Monkey', y: '2010' },
          { n: 'Bloons Adventure Time TD', y: '2018' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Music', note: 'three tracks · Tim Haywood and Ninja Kiwi',
    lede: 'Tim Haywood writes the BTD6 music, and it is a great deal better than a game about monkeys needs. Bright, looping, and built to be heard for four hours without becoming annoying, which is a genuinely hard brief.',
    items: [
      { title: 'Main Theme', accent: '#d84a3a', sub: 'Tim Haywood · Bloons TD 6 · 1:59',
        desc: 'The BTD6 title music. Two minutes of it, and if you have played this game you have heard it several hundred times without ever getting sick of it.',
        href: 'https://www.youtube.com/watch?v=4mpffFZlNBE', link: 'Listen' },
      { title: 'Title Music (Party Time)', accent: '#f0a83a', sub: 'Tim Haywood · Bloons TD 6 · 4:13',
        desc: 'The longer, brassier menu variant, and the one that sounds most like the game thinks it is a carnival.',
        href: 'https://www.youtube.com/watch?v=edwooGpMg8g', link: 'Listen' },
      { title: 'Bloons TD 5 Main Theme', accent: '#5fbf7f', sub: 'Ninja Kiwi · 2011 · 1:58',
        desc: 'The older one, from the Flash and early mobile era. Chiptune-adjacent in a way BTD6 deliberately is not, and the sound of a lot of school computer labs.',
        href: 'https://www.youtube.com/watch?v=sjX99AhnIlg', link: 'Fan upload' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'Ninja Kiwi', href: 'https://ninjakiwi.com/',
        desc: 'The studio, in Auckland, still shipping updates for a 2018 game.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Bloons_TD_6',
        desc: 'The series history and the move off Flash.' },
      { title: 'Bloons Wiki', href: 'https://bloons.fandom.com/wiki/Bloons_Wiki',
        desc: 'Every tower, every path, every bloon type and its immunities.' },
    ] },

] };
