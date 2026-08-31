/* fan-nintendo.js: content for /worlds/nintendo/. Rendered by fanpage.js.
   A playing-card company from 1889 that took eighty years to find out what it
   was for, and then never once competed on the axis everybody else picked. */

/* THREE SERIES LIVE ON THIS PAGE TOO. Mario, Zelda and Splatoon each had a
   tile on /worlds/ and two of them had a page of their own; on 2026-08-31 they
   were folded in here, because they are one company, one console and the same
   afternoons, and split three ways the same launch-week Switch had to be
   introduced on three separate pages. Nothing was dropped in the move:
   everything that was on /worlds/zelda/ and /worlds/splatoon/ is below, both
   of their drawings included. Mario never had a page, and now has the section
   it should have had.

   The order is company first, then the three series in the order they started,
   then the music, then the links. */

/* The `when:` line is Abubakr's own, in his words: Nintendo since he was a
   kid, Mario and Zelda and Splatoon always, and a Switch the week it came out
   in March 2017, when they were "so hard to get". Breath of the Wild is the
   one he fell in love with, and his whole review of Splatoon 2 was "oh my
   gosh". The marks in the indexes are his too: the one machine he owns and
   the games he actually played. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid; the Switch the week it came out, March 2017',
          note: 'Mario, Zelda and Splatoon, always. The Switch was nearly impossible to find that spring, and then it was Breath of the Wild, Splatoon 2 and Snipperclips.' },
  sections: [

  { id: 'hardware', kind: 'timeline', title: 'The Machines', note: '1977 onward',
    lede: 'Not a straight line and never meant to be one. Every generation here is a different bet, several of them are outright failures, and the failures are where the good ideas came from: the Virtual Boy is why nobody at Nintendo is afraid of a strange controller.',
    items: [
      { when: '1977', title: 'Color TV-Game',
        desc: 'Six built-in variations on Pong, made with Mitsubishi. Sold about three million in Japan and nowhere else, and it is the first time the company shipped a machine rather than a toy.' },
      { when: '1980', title: 'Game & Watch',
        desc: 'Gunpei Yokoi saw a bored commuter playing with a calculator and built a game into an LCD watch. Forty-three million sold, and the second model introduced the directional cross that is on every controller in this list.' },
      { when: '1983 · 1985', title: 'Famicom, then the NES',
        desc: 'Japan in 1983, America in 1985 into a market that had just collapsed, sold as a toy with a robot next to it because no shop would stock a games console. Sixty-two million.' },
      { when: '1989', title: 'Game Boy',
        desc: 'Weaker than both its rivals, green and grey instead of colour, and it beat them by an order of magnitude on battery life and price. Yokoi called this lateral thinking with withered technology and it is still the clearest statement of what this company does.' },
      { when: '1990 · 1991', title: 'Super Famicom, then the SNES',
        desc: 'Forty-nine million, and the sharpest first-party run in the company’s history: Super Mario World, A Link to the Past, Super Metroid, Star Fox, Yoshi’s Island.' },
      { when: '1995', title: 'Virtual Boy',
        desc: 'Red-on-black stereoscopic 3D on a table-top stand that gave people headaches. Discontinued inside a year, about 770,000 sold, and the last thing Yokoi shipped there. The one unambiguous disaster.' },
      { when: '1996', title: 'Nintendo 64',
        desc: 'Three-pronged controller, an analogue stick, and cartridges when everybody else had moved to discs. The cartridge decision cost them Final Fantasy and most of the third parties; the analogue stick is on every controller made since.' },
      { when: '2001', title: 'GameCube · Game Boy Advance',
        desc: 'The worst-selling home console they have made and one of the best-loved, and alongside it a handheld that sold eighty-one million. The pattern of the next fifteen years starts here.' },
      { when: '2004', title: 'Nintendo DS',
        desc: 'Two screens, one of them a touchscreen, launched as a third pillar in case it failed. A hundred and fifty-four million later it is still the best-selling handheld ever made.' },
      { when: '2006', title: 'Wii',
        desc: 'A hundred and one million, most of them to people who had never bought a console. Underpowered on purpose, aimed sideways at a market the other two were not addressing, and for about four years it was the most talked-about object in the industry.' },
      { when: '2011 · 2012', title: '3DS, then Wii U',
        desc: 'Glasses-free 3D that mostly got switched off, and then a machine almost nobody could explain, including the shops selling it. The Wii U sold thirteen million and nearly all of its library was rescued by what came next.' },
      { when: '2017', title: 'Switch',
        desc: 'The Wii U’s idea with the cable cut: one machine that is a console on the television and a handheld in your hands, and the answer to the two-pillar problem the company had had since 2001. It became the best-selling home console they have ever made. Mine is from launch week, after a spring of it being sold out everywhere, and the first three things on it were Breath of the Wild, Splatoon 2 and Snipperclips, the paper-cutting co-op game that was quietly the best thing in the launch line-up.' },
      { when: '2025', title: 'Switch 2',
        desc: 'The first time they have followed a machine with a straightforwardly better version of the same machine, which for this company is the genuinely unusual move.' },
    ] },

  { id: 'rule', kind: 'cards', title: 'The House Method', note: 'why it keeps working',
    lede: 'There is a method here and it is stated out loud by the people who run it. It is not about power, it has never been about power, and every time the company has tried to compete on power it has lost.',
    items: [
      { title: 'Withered technology', sub: 'Old parts, new idea', tag: 'Yokoi', accent: '#e0403a',
        desc: 'Gunpei Yokoi’s doctrine: take a component that is cheap and thoroughly understood because it is old, and use it in a way nobody has. The Game Boy is a worse screen than its rivals attached to a better idea, and it outsold them roughly ten to one.',
        meta: 'Lateral thinking with withered technology' },
      { title: 'The toy comes first', sub: 'Then a game around it', tag: 'Miyamoto', accent: '#f0a83a',
        desc: 'Miyamoto builds the verb before the story: jumping, throwing, climbing, and only then a reason. Mario existed as a set of movement rules months before he had a name, which is why he still feels right in a game made forty years later.',
        meta: 'The verb, then the world' },
      { title: 'Sideways, not faster', sub: 'Refusing the arms race', tag: 'The strategy', accent: '#5fa3ec',
        desc: 'The Wii was weaker than both rivals and outsold them. The Switch shipped with a chip that was already old. Competing on teraflops is a fight against companies with more money, so they have simply declined to have it for twenty years.',
        meta: 'Blue ocean, in their words' },
      { title: 'A strange controller, every time', sub: 'The input is the product', tag: 'The habit', accent: '#3fd589',
        desc: 'A cross, then shoulder buttons, then an analogue stick, then a rumble pack, then two screens, then a pointer, then detachable halves. Roughly half fail. The company treats the input device as the thing being designed and the games as what proves it.',
        meta: 'Half of them fail' },
      { title: 'They keep the catalogue', sub: 'Nothing is sold off', tag: 'The library', accent: '#b06fd8',
        desc: 'Mario, Zelda, Metroid, Kirby, Donkey Kong, Pokémon, Animal Crossing, Splatoon, Fire Emblem. All still first-party, all still shipping, none of it licensed away, which is why a bad console generation is survivable here and nowhere else.',
        meta: 'Every one of them still running' },
      { title: 'Finish it, then ship it', sub: 'The delay is the policy', tag: 'The discipline', accent: '#f5c63c',
        desc: 'Miyamoto’s line is that a delayed game is eventually good and a rushed game is forever bad. It is a slightly smug thing to say and the release history broadly backs it up.',
        meta: 'A delayed game is eventually good' },
    ] },

  { id: 'makers', kind: 'tiles', title: 'The People', note: 'five names', compact: true,
    lede: 'A company this consistent is not consistent by accident. These five between them account for most of what is on the page above.',
    items: [
      { title: 'Fusajiro Yamauchi', accent: '#e0403a', sub: 'Founder · 1889',
        desc: 'Started it in Kyoto making hanafuda, hand-painted playing cards, for a market that was partly illegal gambling houses.' },
      { title: 'Hiroshi Yamauchi', accent: '#e0705a', sub: 'President · 1949 – 2002',
        desc: 'His great-grandson, president at twenty-two. Tried taxis, instant rice, a television network and a chain of love hotels, failed at all of them, and then bet the company on toys.' },
      { title: 'Gunpei Yokoi', accent: '#f0a83a', sub: 'Engineer · 1965 – 1996',
        desc: 'The Ultra Hand, the Game & Watch, the directional cross, the Game Boy. A maintenance engineer who was found making a toy at his workbench and told to make more.' },
      { title: 'Shigeru Miyamoto', accent: '#3fd589', sub: 'Designer · 1977 onward',
        desc: 'Donkey Kong, Mario, Zelda, Star Fox, Pikmin. Hired as an artist because the president knew his father, and given Donkey Kong because nobody else was free.' },
      { title: 'Satoru Iwata', accent: '#5fa3ec', sub: 'President · 2002 – 2015',
        desc: 'A programmer who became president, halved his own salary rather than make layoffs, and personally compressed Pokémon Gold and Silver enough to fit Kanto in as well. Died in office at fifty-five.' },
    ] },

  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it did not earn a
     card. ◆ marks the ones that are mine: the one machine I own, and the
     three series I grew up on, each of which has its own section below. */
  { id: 'works', kind: 'works', title: 'Everything They Made', note: 'the machines and the series',
    lede: 'Two lists: every machine, and the first-party series that are still running. The second list is the reason a bad generation has never actually killed this company.',
    items: [
      { title: 'The Home Consoles', sub: '1977 – 2025', unit: 'machine',
        desc: 'Nine of them, and the sales spread between the best and the worst is about eleven to one.',
        rows: [
          { n: 'Color TV-Game', y: '1977' },
          { n: 'Famicom / NES', y: '1983' },
          { n: 'Super Famicom / SNES', y: '1990' },
          { n: 'Nintendo 64', y: '1996' },
          { n: 'GameCube', y: '2001' },
          { n: 'Wii', y: '2006' },
          { n: 'Wii U', y: '2012' },
          { n: 'Switch', y: '2017' , big: true },
          { n: 'Switch 2', y: '2025' },
        ] },
      { title: 'The Handhelds', sub: '1980 – 2011', unit: 'machine',
        desc: 'Where the company actually made its money for thirty years, and where most of the strange ideas were tried first.',
        rows: [
          { n: 'Game & Watch', y: '1980' },
          { n: 'Game Boy', y: '1989' },
          { n: 'Virtual Boy', y: '1995' },
          { n: 'Game Boy Color', y: '1998' },
          { n: 'Game Boy Advance', y: '2001' },
          { n: 'Nintendo DS', y: '2004' },
          { n: 'Nintendo 3DS', y: '2011' },
        ] },
      { title: 'The Series They Kept', sub: '1981 onward', unit: 'series',
        desc: 'All first-party, all still shipping, none of them ever sold to anybody.',
        rows: [
          { n: 'Donkey Kong', y: '1981' },
          { n: 'Mario', y: '1983' , big: true },
          { n: 'The Legend of Zelda', y: '1986' , big: true },
          { n: 'Metroid', y: '1986' },
          { n: 'Kirby', y: '1992' },
          { n: 'Star Fox', y: '1993' },
          { n: 'Fire Emblem', y: '1990' },
          { n: 'Pokémon', y: '1996' },
          { n: 'Super Smash Bros.', y: '1999' },
          { n: 'Animal Crossing', y: '2001' },
          { n: 'Pikmin', y: '2001' },
          { n: 'Splatoon', y: '2015' , big: true },
        ] },
    ] },

  /* the hinge. These three used to be tiles of their own on /worlds/, and this
     is what replaced them: the same three names, in the order the series
     started, each one opening the block that follows. */
  { id: 'mine', kind: 'tiles', compact: true, title: 'The Three That Are Mine', note: 'Mario · Zelda · Splatoon',
    lede: 'Three series, one company, and for most of my life one machine at a time. Everything below is these three, in the order they started.',
    items: [
      { title: 'Super Mario', accent: '#e0403a', sub: 'since 1983',
        desc: 'The one that never stopped. A set of movement rules that were finished before the character had a name, and forty years of tuning them.' },
      { title: 'The Legend of Zelda', accent: '#e8c247', sub: 'since 1986',
        desc: 'A battery soldered onto a cartridge, so that a console remembered where you had been. Breath of the Wild came home with the Switch in launch week.' },
      { title: 'Splatoon', accent: '#c6f03a', sub: 'since 2015',
        desc: 'A shooter scored on ground covered rather than people hit. Splatoon 2 arrived that same summer, on the same machine.' },
    ] },

  /* ── Mario ───────────────────────────────────────────────────────────── */

  { id: 'mario', kind: 'films', title: 'Super Mario', note: 'six that moved it',
    lede: 'Forty years of one verb. None of this is about a story: Mario is a set of movement rules, tuned until they feel right, and these six are the ones that changed what the rules could do.',
    items: [
      { num: 'I', title: 'Super Mario Bros.', sub: 'NES · 1985', accent: '#e0403a',
        desc: 'The grammar of the side-scroller, settled in one game: run right, jump, and learn the entire system from the first screen without a word of instruction. A Goomba walks into you and a mushroom walks into you, and the difference between those two seconds is the whole tutorial.',
        meta: 'World 1-1 is the manual' },
      { num: 'II', title: 'Super Mario Bros. 3', sub: 'NES · 1988', accent: '#f0a83a',
        desc: 'A branching map, a suit for every idea they had that year, and the whole thing framed as a stage play: the scenery is bolted to a backdrop and the sprites cast shadows on the boards. The best-selling NES game that never came in the box with a console.',
        meta: 'Presented as a play' },
      { num: 'III', title: 'Super Mario World', sub: 'SNES · 1990', accent: '#3fd589',
        desc: 'Yoshi, the spin jump, the cape, and a map with secret exits that fold back on themselves: finish it the short way and you have seen a fraction of it. Ninety-six exits, and the Star Road is the first time one of these hid a second game inside the first.',
        meta: 'Ninety-six exits' },
      { num: 'IV', title: 'Super Mario 64', sub: 'N64 · 1996', accent: '#5fa3ec',
        desc: 'Worked out how a 3D game moves, in one go, on a stick that had not existed a year earlier: walk, run, tiptoe, long jump, wall kick, all analogue and all demonstrated on the castle lawn before you have entered a level. Every 3D platformer since is an argument with it.',
        meta: 'The stick, and everything after' },
      { num: 'V', title: 'Super Mario Galaxy', sub: 'Wii · 2007', accent: '#b06fd8',
        desc: 'Every planet carries its own gravity, so down is wherever you are standing and the level curves away under your feet. It is also the first of these with a live orchestra behind it, which the company had not thought necessary before.',
        meta: 'Down is wherever you are standing' },
      { num: 'VI', title: 'Super Mario Odyssey', sub: 'Switch · 2017', accent: '#e8c247',
        desc: 'Throw the hat at something and become it: a frog, a tank, a Bullet Bill, a length of pipe with eyes. The moons are scattered thickly enough that the game stops being a sequence of levels and turns into a place you comb.',
        meta: 'Capture anything' },
    ] },

  /* Nothing in these lists is marked. The series is mine and the mark for it is
     in the company index above; which individual games were mine is further
     back than I can honestly date, so none of them claim to be. */
  { id: 'mario-works', kind: 'works', title: 'Every Mario', note: 'the two lines, the karts and the rest',
    lede: 'The main line splits in two in 1996 and both halves are still running, alongside a kart series that outsells all of it.',
    items: [
      { title: 'The 2D Line', sub: '1985 – 2023', unit: 'game',
        desc: 'Flat, or near enough. The 1988 numbering is a mess: the Japanese Super Mario Bros. 2 is the punishing one that reached the West later as The Lost Levels, and the Super Mario Bros. 2 the West did get in 1988 was a different game with Mario characters put into it.',
        rows: [
          { n: 'Super Mario Bros.', y: '1985' },
          { n: 'The Lost Levels', y: '1986' },
          { n: 'Super Mario Bros. 2', y: '1988' },
          { n: 'Super Mario Bros. 3', y: '1988' },
          { n: 'Super Mario Land', y: '1989' },
          { n: 'Super Mario World', y: '1990' },
          { n: 'Super Mario Land 2', y: '1992' },
          { n: 'Yoshi’s Island', y: '1995' },
          { n: 'New Super Mario Bros.', y: '2006' },
          { n: 'New Super Mario Bros. Wii', y: '2009' },
          { n: 'New Super Mario Bros. 2', y: '2012' },
          { n: 'New Super Mario Bros. U', y: '2012' },
          { n: 'Super Mario Maker', y: '2015' },
          { n: 'Super Mario Maker 2', y: '2019' },
          { n: 'Super Mario Bros. Wonder', y: '2023' },
        ] },
      { title: 'The 3D Line', sub: '1996 – 2021', unit: 'game',
        desc: 'Every one of these changes how he moves rather than what he is doing.',
        rows: [
          { n: 'Super Mario 64', y: '1996' },
          { n: 'Super Mario Sunshine', y: '2002' },
          { n: 'Super Mario Galaxy', y: '2007' },
          { n: 'Super Mario Galaxy 2', y: '2010' },
          { n: 'Super Mario 3D Land', y: '2011' },
          { n: 'Super Mario 3D World', y: '2013' },
          { n: 'Super Mario Odyssey', y: '2017' },
          { n: 'Bowser’s Fury', y: '2021' },
        ] },
      { title: 'The Karts', sub: '1992 – 2025', unit: 'game',
        desc: 'Eleven of them, and the Switch one is the best-selling game on that machine by a distance.',
        rows: [
          { n: 'Super Mario Kart', y: '1992' },
          { n: 'Mario Kart 64', y: '1996' },
          { n: 'Mario Kart: Super Circuit', y: '2001' },
          { n: 'Mario Kart: Double Dash', y: '2003' },
          { n: 'Mario Kart DS', y: '2005' },
          { n: 'Mario Kart Wii', y: '2008' },
          { n: 'Mario Kart 7', y: '2011' },
          { n: 'Mario Kart 8', y: '2014' },
          { n: 'Mario Kart 8 Deluxe', y: '2017' },
          { n: 'Mario Kart Tour', y: '2019' },
          { n: 'Mario Kart World', y: '2025' },
        ] },
      { title: 'The Rest', sub: '1996 onward', unit: 'game',
        desc: 'The spin-offs that turned into series of their own.',
        rows: [
          { n: 'Super Mario RPG', y: '1996' },
          { n: 'Mario Party', y: '1998' },
          { n: 'Paper Mario', y: '2000' },
          { n: 'Luigi’s Mansion', y: '2001' },
          { n: 'Mario & Luigi: Superstar Saga', y: '2003' },
          { n: 'Mario + Rabbids Kingdom Battle', y: '2017' },
          { n: 'Princess Peach: Showtime!', y: '2024' },
        ] },
    ] },

  /* ── Zelda ───────────────────────────────────────────────────────────── */
  /* The Triforce came off the hero of /worlds/zelda/ when that page was folded
     in here, and now heads the block it belongs to. */

  { id: 'zelda', kind: 'rank', tone: '#e8c247', title: 'The Legend of Zelda', note: 'five of the twenty',
    art: { cls: 'zl-art',
      cap: 'Power, wisdom, courage · and the fourth triangle nobody draws',
      svg: '<svg viewBox="0 0 420 300" role="img" aria-label="The Triforce: three gold triangles arranged around an undrawn fourth">'
        + '<g class="zla-tri">'
        + '<path class="zla-p" d="M210 30 285 150H135z"/>'
        + '<path class="zla-p" d="M132 158 207 278H57z"/>'
        + '<path class="zla-p" d="M288 158 363 278H213z"/>'
        + '</g></svg>' },
    lede: 'Nearly forty years of the same three shapes: a sword, a shield, and a place that will not tell you where to go. Twenty games in the main line, and five of them moved the whole medium rather than only the series. The other fifteen are in the index below, and several of those are better than several of these.',
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

  { id: 'zelda-three', kind: 'tiles', tone: '#e8c247', title: 'The Three Pieces', note: 'and the three people holding them',
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

  { id: 'zelda-why', kind: 'cards', tone: '#e8c247', title: 'Why Zelda Works', note: 'the design under the sword',
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
        desc: 'Koji Kondo wrote the title theme in a day after Ravel’s Boléro turned out to still be under copyright. He has been writing the series since, and the trick has always been the same: one melody, stated plainly, that the rest of the score keeps quoting.',
        meta: 'Written in a day' },
      { title: 'It is not one timeline', sub: 'And it never mattered', tag: 'The lore', accent: '#e04a3a',
        desc: 'Nintendo eventually published an official timeline that splits into three branches, one of which is a defeat, and the fans have been arguing about it ever since. It was reverse-engineered after the fact and none of the games are worse for that.',
        meta: 'Three branches, one a loss' },
    ] },

  /* ◆ marks the one that is mine. */
  { id: 'zelda-works', kind: 'works', tone: '#e8c247', title: 'Every Zelda', note: 'twenty in the main line, and the rest',
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

  /* ── Splatoon ────────────────────────────────────────────────────────── */
  /* The turf came off the hero of /worlds/splatoon/, the same way. */

  { id: 'splatoon', kind: 'films', tone: '#c6f03a', title: 'Splatoon', note: '2015 · 2017 · 2022',
    art: { cls: 'sp-art',
      cap: 'Turf War · three minutes, and the score is how much of the floor is yours',
      svg: '<svg viewBox="0 0 460 270" role="img" aria-label="A stretch of floor half covered in ink, with a squid swimming up through it">'
        + '<rect class="spa-floor" x="10" y="18" width="440" height="234" rx="14"/>'
        + '<path class="spa-paint" d="M10 252V150c46-22 74 16 122 4 44-11 60-46 108-40 46 6 58 44 106 40 40-3 62-24 104-32v130z"/>'
        + '<path class="spa-squid" d="M232 74c26 0 46 19 46 44 0 12-6 20-6 28 0 8 8 13 21 16-13 10-27 10-39 3-8 9-14 13-22 13s-14-4-22-13c-12 7-26 7-39-3 13-3 21-8 21-16 0-8-6-16-6-28 0-25 20-44 46-44z"/>'
        + '<circle class="spa-eye" cx="219" cy="110" r="6.5"/>'
        + '<circle class="spa-eye" cx="245" cy="110" r="6.5"/>'
        + '<circle class="spa-drop" cx="396" cy="66" r="17"/>'
        + '<circle class="spa-drop" cx="428" cy="38" r="9"/>'
        + '</svg>' },
    lede: 'One game, then the same game on hardware people actually owned, then the same game again with ten years of accumulated ideas in it. That is not a criticism: the first one was already right. The middle one is mine, on the Switch from that spring, and “oh my gosh” is the whole review.',
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

  { id: 'splatoon-turf', kind: 'cards', tone: '#c6f03a', title: 'How Splatoon Works', note: 'the one decision',
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

  { id: 'splatoon-weapons', kind: 'tiles', tone: '#c6f03a', title: 'The Classes', note: 'eleven of them', compact: true,
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

  /* ◆ marks the one that is mine. */
  { id: 'splatoon-works', kind: 'works', tone: '#c6f03a', title: 'Every Splatoon', note: 'three games, two expansions, the modes',
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

  /* the music, last before the links, the way every fan page on this site
     ends. Nine tracks rather than three, because the three pages that became
     this one had three each; the two 1986 Zelda entries were the same track
     described twice, and they are two different pieces of music, so they are
     both here and now say which is which. */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'nine tracks',
    lede: 'Koji Kondo wrote the first three of these on a handful of channels in the 1980s, and two of them are probably the most recognised pieces of music written since. The Splatoon three are credited to bands who exist inside the game and sing in a language that does not.',
    items: [
      { title: 'Super Mario Bros. Theme', accent: '#e0403a', sub: 'Koji Kondo · 1985 · 1:26',
        desc: 'Written to fit three channels and a drum, and tested against a prototype of the walking speed so the tempo matched the legs.',
        href: 'https://www.youtube.com/watch?v=NTa6Xbzfq1U', link: 'Listen' },
      { title: 'Title Theme', accent: '#f0a83a', sub: 'Koji Kondo · The Legend of Zelda · 1986 · 1:20',
        desc: 'The plan was to open on Ravel’s Boléro, and it turned out to still be in copyright. Kondo wrote this replacement in a day.',
        href: 'https://www.youtube.com/watch?v=uyMKWJ5e1kg', link: 'Listen' },
      { title: 'Overworld Theme', accent: '#e8c247', sub: 'Koji Kondo · The Legend of Zelda · 1986 · 3:00',
        desc: 'The one everybody actually hums, written for the field you are dropped into with no instructions. It has been quoted in every game in the series since.',
        href: 'https://www.youtube.com/watch?v=ncg72VswyTs', link: 'Listen' },
      { title: 'Song of Storms', accent: '#5fa3ec', sub: 'Koji Kondo · Ocarina of Time · 1998 · 1:03',
        desc: 'Twelve bars on a wheel, taught to you by a man in a windmill who is angry that you taught it to him.',
        href: 'https://www.youtube.com/watch?v=UtgHZaq0EGs', link: 'Listen' },
      { title: 'Main Theme', accent: '#3fd589', sub: 'Manaka Kataoka · Breath of the Wild · 2017 · 2:20',
        desc: 'Almost the whole game is near-silence and a piano, and then this arrives over the plateau and states the 1986 melody back at you.',
        href: 'https://www.youtube.com/watch?v=U_Mm4Tia9zI', link: 'Listen' },
      { title: 'Splattack!', accent: '#c6f03a', sub: 'Squid Squad · Splatoon · 2015 · 2:19',
        desc: 'The first one, and the track that told everybody this game was not going to sound like a Nintendo game.',
        href: 'https://www.youtube.com/watch?v=LBQmvJyIKTg', link: 'Listen' },
      { title: 'Calamari Inkantation', accent: '#e04a9a', sub: 'Squid Sisters · Splatoon · 2015 · 1:52',
        desc: 'Plays over the final boss of the first game, and the series has since built actual plot around the fact that it is the song.',
        href: 'https://www.youtube.com/watch?v=UC7wfAKDizU', link: 'Listen' },
      { title: 'Anarchy Rainbow', accent: '#f0a83a', sub: 'Deep Cut · Splatoon 3 · 2022 · 2:14',
        desc: 'Three voices, three instruments and no shared key signature to speak of. The Splatfest track from the third game.',
        href: 'https://www.youtube.com/watch?v=DtMOAvOWTvY', link: 'Listen' },
      { title: 'Mii Channel', accent: '#5fa3ec', sub: 'Kazumi Totaka · 2006',
        desc: 'Written for a screen nobody was meant to sit on, and heard by more people than most film scores.',
        href: 'https://www.youtube.com/watch?v=po-0n1BKW2w', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Nintendo',
        desc: 'The hanafuda years, the taxis, the rice, and everything after.' },
      { title: 'Iwata Asks', href: 'https://iwataasks.nintendo.com/',
        desc: 'Satoru Iwata interviewing his own developers about how each machine got made. The best primary source there is on any of this.' },
      { title: 'Nintendo', href: 'https://www.nintendo.com/',
        desc: 'The current one.' },
      { title: 'Zelda, on Wikipedia', href: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda',
        desc: 'The whole series, the three-branch timeline, and the arguments about it.' },
      { title: 'Zelda Wiki', href: 'https://zeldawiki.wiki/wiki/Main_Page',
        desc: 'Every item, every dungeon, and a map of Hyrule for each game laid over the others.' },
      { title: 'Zelda', href: 'https://zelda.nintendo.com/',
        desc: 'Nintendo’s own hub for the series.' },
      { title: 'Splatoon, on Wikipedia', href: 'https://en.wikipedia.org/wiki/Splatoon',
        desc: 'The series, the tofu prototype, and the Splatfest results nobody accepts.' },
      { title: 'Inkipedia', href: 'https://splatoonwiki.org/wiki/Main_Page',
        desc: 'Every weapon kit, every map, and frame data for things Nintendo has never published.' },
      { title: 'Splatoon 3', href: 'https://splatoon.nintendo.com/',
        desc: 'Nintendo’s own page for the current one.' },
    ] },

] };
