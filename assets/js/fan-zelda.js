/* fan-zelda.js: content for /worlds/zelda/. Rendered by fanpage.js.
   A battery soldered onto a cartridge, so that for the first time a console
   remembered where you had been. Everything else follows from that. */
/* The `when:` line is Abubakr's own: Zelda since he was a kid, and Breath of
   the Wild on a launch-week Switch in 2017 is the one he fell in love with.
   The ◆ in the index is his. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid; Breath of the Wild, March 2017',
          note: 'On the Switch the week it came out. That is the one I fell in love with.' },
  sections: [

  { id: 'games', kind: 'rank', title: 'The Ones That Changed It', note: 'five of the twenty',
    lede: 'Twenty games in the main line, and five of them moved the whole medium rather than just the series. The other fifteen are in the index further down, and several of those are better than several of these.',
    items: [
      { num: '01', title: 'Ocarina of Time', sub: 'N64 · 1998',
        desc: 'The first great 3D adventure game and the one that worked out how you point a camera at one. Z-targeting solved the problem of facing an enemy in three dimensions and every action game since has copied it, usually without changing the name much. It also has a horse, a day and night cycle, and a seven-year time skip in the middle.' },
      { num: '02', title: 'Breath of the Wild', sub: 'Switch · 2017',
        desc: 'Threw out the thing the series had been doing since 1991: no ordered dungeons, no item that unlocks the next area, no map full of markers. You can climb anything, you can go straight to the final boss from the opening plateau, and the world is built out of a small number of physical rules that combine rather than a large number of scripted events. This is the one I fell in love with, on a Switch from launch week.' },
      { num: '03', title: 'A Link to the Past', sub: 'SNES · 1991',
        desc: 'The template. Two overlapping worlds, a dungeon order, an item in each dungeon that opens the next, and a map that rewards going back. Every 2D entry for the next twenty years is a variation on this one, and so is most of the genre.' },
      { num: '04', title: "Majora's Mask", sub: 'N64 · 2000',
        desc: 'Made in a year on the previous game’s engine, and the strangest thing Nintendo has ever published. Three days on a loop, a moon with a face falling towards the town, and a cast whose entire lives you watch on repeat while failing to save them.' },
      { num: '05', title: 'The Legend of Zelda', sub: 'Famicom Disk System · 1986',
        desc: 'The battery. A cartridge that remembered, which meant a game that could be bigger than one sitting, which meant a game that could be about exploring rather than about finishing. It also drops you in a field with a sword in a cave and no instructions at all.' },
    ] },

  { id: 'three', kind: 'tiles', title: 'The Three Pieces', note: 'and the three people holding them',
    lede: 'The series has told roughly the same story twenty times and it is never actually about the princess. Three virtues, three characters, and a triangle with a hole in it.',
    items: [
      { title: 'Power', accent: '#e04a3a', sub: 'Ganon · Din',
        desc: 'Held by whoever is willing to take it, which is the point being made. Ganondorf is the only recurring villain in Nintendo who is genuinely written rather than just placed.' },
      { title: 'Wisdom', accent: '#5fa3ec', sub: 'Zelda · Nayru',
        desc: 'The princess the series is named after and the one who is usually doing the actual planning. In several games she is off solving it herself under a disguise while you fetch things.' },
      { title: 'Courage', accent: '#3fd589', sub: 'Link · Farore',
        desc: 'Silent, in green, and never the chosen one at the start. The name is not decoration: he is the link between the player and the world, which is why he does not talk.' },
      { title: 'The fourth triangle', accent: '#e8c247', sub: 'The one nobody draws',
        desc: 'Three triangles arranged around a hole that reads as a fourth. Nintendo have never made anything of it and it is the best thing about the design.' },
    ] },

  { id: 'why', kind: 'cards', title: 'Why It Works', note: 'the design under the sword',
    items: [
      { title: 'A place, not a level list', sub: 'Geography before content', tag: 'The world', accent: '#3fd589',
        desc: 'Hyrule is drawn as a country with a shape you can learn, not as a sequence of areas. The reason people can sketch the Ocarina map from memory twenty-five years later is that it was designed to be navigated rather than progressed through.',
        meta: 'You can draw it from memory' },
      { title: 'The item is the key', sub: 'And the lock came first', tag: 'The loop', accent: '#5fa3ec',
        desc: 'Find the hookshot, and suddenly a dozen gaps you had already walked past become crossable. The classic games are built backwards from that feeling: you are shown the lock long before you are given the key.',
        meta: 'You saw the lock an hour ago' },
      { title: 'Physics instead of scripts', sub: 'The Breath of the Wild turn', tag: 'The rewrite', accent: '#e8c247',
        desc: 'Wood burns, metal conducts, fire rises, things roll downhill. A small set of rules that all interact, rather than a large set of one-off scripted moments, which is why players found solutions the designers had never seen.',
        meta: 'Rules that combine' },
      { title: 'Nobody tells you where to go', sub: 'The instinct to be quiet', tag: 'The restraint', accent: '#b06fd8',
        desc: 'The first game gives you nothing. Breath of the Wild gives you a tower and a direction. The whole series is a long argument with the industry habit of putting an arrow on the screen, and it keeps winning it.',
        meta: 'No arrow' },
      { title: 'Kondo, on four channels', sub: 'The music does the work', tag: 'The sound', accent: '#f0a83a',
        desc: 'Koji Kondo wrote the main theme in a day after Ravel’s Boléro turned out to still be under copyright. He has been writing the series since, and the trick has always been the same: one melody, stated plainly, that the rest of the score keeps quoting.',
        meta: 'Written in a day' },
      { title: 'It is not one timeline', sub: 'And it never mattered', tag: 'The lore', accent: '#e04a3a',
        desc: 'Nintendo eventually published an official timeline that splits into three branches, one of which is a defeat, and the fans have been arguing about it ever since. It was reverse-engineered after the fact and none of the games are worse for that.',
        meta: 'Three branches, one a loss' },
    ] },

  /* the complete index. ◆ marks the one that is mine. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'twenty in the main line, and the rest',
    lede: 'Nearly forty years and about twenty games in the main line, plus the remakes, the handheld side and a couple that the series would rather you forgot.',
    items: [
      { title: 'The Main Line', sub: '1986 – 2024', unit: 'game',
        desc: 'In release order, which is not story order and nobody agrees what story order is.',
        rows: [
          { n: 'The Legend of Zelda', y: '1986' },
          { n: 'Zelda II: The Adventure of Link', y: '1987' },
          { n: 'A Link to the Past', y: '1991' },
          { n: "Link's Awakening", y: '1993' },
          { n: 'Ocarina of Time', y: '1998' },
          { n: "Majora's Mask", y: '2000' },
          { n: 'Oracle of Seasons / Oracle of Ages', y: '2001' },
          { n: 'The Wind Waker', y: '2002' },
          { n: 'Four Swords Adventures', y: '2004' },
          { n: 'The Minish Cap', y: '2004' },
          { n: 'Twilight Princess', y: '2006' },
          { n: 'Phantom Hourglass', y: '2007' },
          { n: 'Spirit Tracks', y: '2009' },
          { n: 'Skyward Sword', y: '2011' },
          { n: 'A Link Between Worlds', y: '2013' },
          { n: 'Tri Force Heroes', y: '2015' },
          { n: 'Breath of the Wild', y: '2017' , big: true },
          { n: 'Tears of the Kingdom', y: '2023' },
          { n: 'Echoes of Wisdom', y: '2024' },
        ] },
      { title: 'The Remakes', sub: '2011 – 2021', unit: 'remake',
        desc: 'Several of these are the version most people have actually played.',
        rows: [
          { n: 'Ocarina of Time 3D', y: '2011' },
          { n: 'The Wind Waker HD', y: '2013' },
          { n: "Majora's Mask 3D", y: '2015' },
          { n: 'Twilight Princess HD', y: '2016' },
          { n: "Link's Awakening", y: '2019' },
          { n: 'Skyward Sword HD', y: '2021' },
        ] },
      { title: 'The Spin-Offs', sub: '2014 – 2020', unit: 'game',
        desc: 'Musou, a strategy game and a maker. All better than they had any need to be.',
        rows: [
          { n: 'Hyrule Warriors', y: '2014' },
          { n: 'Cadence of Hyrule', y: '2019' },
          { n: 'Hyrule Warriors: Age of Calamity', y: '2020' },
        ] },
      { title: 'The Ones Nintendo Disowns', sub: '1993 – 1995', unit: 'game',
        desc: 'Licensed out to Philips as part of a CD-ROM deal that collapsed. Nintendo had no involvement and has never acknowledged them since.',
        rows: [
          { n: 'Link: The Faces of Evil', y: '1993' },
          { n: 'Zelda: The Wand of Gamelon', y: '1993' },
          { n: "Zelda's Adventure", y: '1995' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'three tracks',
    lede: 'Koji Kondo has been on this series since 1986. Nothing here is on a playlist yet; these are the three the games are actually remembered by.',
    items: [
      { title: 'Main Theme', accent: '#e8c247', sub: 'Koji Kondo · 1986 · 1:12',
        desc: 'Written in a day, after Ravel’s Boléro turned out to still be in copyright. It has been quoted in every game since.',
        href: 'https://www.youtube.com/watch?v=ncg72VswyTs', link: 'Listen' },
      { title: "Song of Storms", accent: '#5fa3ec', sub: 'Koji Kondo · Ocarina of Time · 1998 · 1:03',
        desc: 'Twelve bars on a wheel, taught to you by a man in a windmill who is angry that you taught it to him.',
        href: 'https://www.youtube.com/watch?v=UtgHZaq0EGs', link: 'Listen' },
      { title: 'Main Theme', accent: '#3fd589', sub: 'Manaka Kataoka · Breath of the Wild · 2017 · 2:20',
        desc: 'Almost the whole game is near-silence and a piano, and then this arrives over the plateau and states the 1986 melody back at you.',
        href: 'https://www.youtube.com/watch?v=U_Mm4Tia9zI', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda',
        desc: 'The whole series, the three-branch timeline, and the arguments about it.' },
      { title: 'Zelda Wiki', href: 'https://zeldawiki.wiki/wiki/Main_Page',
        desc: 'Every item, every dungeon, and a map of Hyrule for each game laid over the others.' },
      { title: 'Zelda', href: 'https://zelda.nintendo.com/',
        desc: 'Nintendo’s own hub for the series.' },
    ] },

] };
