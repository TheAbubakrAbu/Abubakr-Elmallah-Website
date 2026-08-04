/* fan-pokemon.js: content for /franchises/pokemon/. Rendered by fanpage.js.
   Type colours below are the ones the games have used since Gen VI. */
window.FAN_PAGE = { sections: [

  { id: 'gens', kind: 'timeline', title: 'The Generations', note: 'nine regions, 1996 – now',
    items: [
      { when: 'Gen I · 1996', title: 'Kanto, Red & Blue', desc: 'One hundred and fifty-one, a Game Boy link cable, and a franchise nobody saw coming.' },
      { when: 'Gen II · 1999', title: 'Johto, Gold & Silver', desc: 'Day-night cycle, breeding, two regions in one cartridge. Still the best-value game in the series.' },
      { when: 'Gen III · 2002', title: 'Hoenn, Ruby & Sapphire', desc: 'Abilities, natures, double battles, and weather that actually matters.' },
      { when: 'Gen IV · 2006', title: 'Sinnoh, Diamond & Pearl', desc: 'The physical–special split, which quietly rebuilt competitive play from the ground up.' },
      { when: 'Gen V · 2010', title: 'Unova, Black & White', desc: 'A whole new dex before the postgame, and the best story the series has told.' },
      { when: 'Gen VI · 2013', title: 'Kalos, X & Y', desc: '3D at last, Mega Evolution, and the Fairy type arriving to fix Dragon.' },
      { when: 'Gen VII · 2016', title: 'Alola, Sun & Moon', desc: 'Island trials instead of gyms, regional forms, and Z-moves.' },
      { when: 'Gen VIII · 2019', title: 'Galar, Sword & Shield', desc: 'The Wild Area, Dynamax, and the first open spaces in the series.' },
      { when: 'Gen IX · 2022', title: 'Paldea, Scarlet & Violet', desc: 'Fully open world, three storylines at once, and a frame rate everybody argued about.' },
    ] },

  { id: 'types', kind: 'tiles', title: 'The Eighteen Types', note: 'the entire game is this chart',
    items: [
      { title: 'Normal', accent: '#a8a878', sub: 'Weak to Fighting' },
      { title: 'Fire', accent: '#f08030', sub: 'Beats Grass, Ice, Bug, Steel' },
      { title: 'Water', accent: '#6890f0', sub: 'Beats Fire, Ground, Rock' },
      { title: 'Grass', accent: '#78c850', sub: 'Beats Water, Ground, Rock' },
      { title: 'Electric', accent: '#f8d030', sub: 'Nothing beats Ground for it' },
      { title: 'Ice', accent: '#98d8d8', sub: 'Great offence, terrible defence' },
      { title: 'Fighting', accent: '#c03028', sub: 'Beats Normal, Ice, Rock, Dark, Steel' },
      { title: 'Poison', accent: '#a040a0', sub: 'The Fairy answer' },
      { title: 'Ground', accent: '#e0c068', sub: 'The only Electric immunity' },
      { title: 'Flying', accent: '#a890f0', sub: 'Beats Fighting, Bug, Grass' },
      { title: 'Psychic', accent: '#f85888', sub: 'Broken in Gen I, fixed in Gen II' },
      { title: 'Bug', accent: '#a8b820', sub: 'Early game, late-game surprises' },
      { title: 'Rock', accent: '#b8a038', sub: 'Stealth Rock changed everything' },
      { title: 'Ghost', accent: '#705898', sub: 'Immune to Normal and Fighting' },
      { title: 'Dragon', accent: '#7038f8', sub: 'Only Ice, Dragon and Fairy resist it' },
      { title: 'Dark', accent: '#705848', sub: 'Added to answer Psychic' },
      { title: 'Steel', accent: '#b8b8d0', sub: 'Eleven resistances. Eleven.' },
      { title: 'Fairy', accent: '#ee99ac', sub: 'Added in Gen VI to answer Dragon' },
    ] },

  { id: 'stuck', kind: 'cards', title: 'The Ones That Stuck', note: 'no accounting for taste',
    items: [
      { title: 'Pikachu', sub: 'No. 025 · Electric', tag: 'Mascot', desc: 'Was not the mascot originally. Clefairy was the plan until the anime put this one on Ash\u2019s shoulder and refused to put it in a ball.', meta: 'Gen I' },
      { title: 'Charizard', sub: 'No. 006 · Fire, Flying', tag: 'Starter', desc: 'Not part Dragon, which every child on a playground has argued about at least once.', meta: 'Gen I' },
      { title: 'Mewtwo', sub: 'No. 150 · Psychic', tag: 'Legendary', desc: 'Made in a lab from Mew\u2019s DNA, and the first Pok\u00e9mon the series let be genuinely angry about it.', meta: 'Cerulean Cave' },
      { title: 'Eevee', sub: 'No. 133 · Normal', tag: 'Branching', desc: 'Eight evolutions and counting, which turned one design into an entire mechanic.', meta: 'Gen I onward' },
      { title: 'Gengar', sub: 'No. 094 · Ghost, Poison', tag: 'Fan favourite', desc: 'Grins in the background of half the games and has the best competitive history of any Ghost type.', meta: 'Gen I' },
      { title: 'Snorlax', sub: 'No. 143 · Normal', tag: 'Obstacle', desc: 'Blocks a road until you play a flute at it. An entire route design built around one sleeping animal.', meta: 'Gen I' },
      { title: 'Lucario', sub: 'No. 448 · Fighting, Steel', tag: 'Gen IV', desc: 'Reads aura, carries a film on its own, and has been in every crossover since.', meta: 'Sinnoh' },
      { title: 'Greninja', sub: 'No. 658 · Water, Dark', tag: 'Gen VI', desc: 'A ninja frog that throws shuriken made of compressed water. Voted the single most popular Pok\u00e9mon in a global poll.', meta: 'Kalos' },
    ] },

  { id: 'start', kind: 'rank', title: 'Where To Start', note: 'if you are picking one up now',
    items: [
      { title: 'HeartGold and SoulSilver', sub: '2009 · DS', desc: 'Two regions, sixteen gyms, and your lead Pok\u00e9mon walks behind you. Widely rated the best remakes ever made.' },
      { title: 'Emerald', sub: '2004 · GBA', desc: 'Hoenn with both villain teams, the Battle Frontier, and the tightest of the early-generation games.' },
      { title: 'Platinum', sub: '2008 · DS', desc: 'Sinnoh fixed: better pacing, better dex, and the Distortion World.' },
      { title: 'Black and White', sub: '2010 · DS', desc: 'A completely new dex until the credits roll, and the only game in the series with a villain who has a point.' },
      { title: 'Legends: Arceus', sub: '2022 · Switch', desc: 'Throws out the formula: no gyms, real-time catching, and an open region two hundred years before the rest.' },
      { title: 'Scarlet and Violet', sub: '2022 · Switch', desc: 'Fully open, three storylines at once, and a frame rate everybody argued about for a year.' },
    ] },

  { id: 'beyond', kind: 'tiles', title: 'Beyond The Games', note: 'the rest of the machine',
    items: [
      { title: 'The anime', accent: '#f8d030', sub: '1997, still running', desc: 'Over twelve hundred episodes. Ash finally won a world championship in 2022 and then handed the show over.' },
      { title: 'The trading card game', accent: '#6890f0', sub: 'Since 1996', desc: 'Over sixty billion cards printed, and a first edition Charizard that sells for the price of a car.' },
      { title: 'Pok\u00e9mon GO', accent: '#78c850', sub: '2016', desc: 'Put the entire concept outside for one strange summer, and is still one of the highest-grossing mobile games ever.' },
      { title: 'Detective Pikachu', accent: '#f0c840', sub: '2019', desc: 'The one live-action film that understood the assignment: make them look like animals, not toys.' },
      { title: 'The competitive scene', accent: '#c03028', sub: 'VGC', desc: 'Double battles, team preview, and a world championship with a real prize pool.' },
      { title: 'Highest-grossing media franchise', accent: '#a040a0', sub: 'Anywhere', desc: 'Ahead of Star Wars, Marvel and Mickey Mouse. A hundred billion dollars and counting, from a game about catching bugs.' },
    ] },

  { id: 'starters', kind: 'cards', title: 'First Partners', note: 'the choice you make in the first five minutes',
    items: [
      { title: 'Kanto', sub: 'Bulbasaur · Charmander · Squirtle', tag: 'Gen I', desc: 'The one everybody has an opinion about, thirty years later.', meta: 'Prof. Oak' },
      { title: 'Johto', sub: 'Chikorita · Cyndaquil · Totodile', tag: 'Gen II', desc: 'Cyndaquil, and it is not a debate.', meta: 'Prof. Elm' },
      { title: 'Hoenn', sub: 'Treecko · Torchic · Mudkip', tag: 'Gen III', desc: 'So I herd u liek Mudkipz, the internet has never let this one go.', meta: 'Prof. Birch' },
      { title: 'Sinnoh', sub: 'Turtwig · Chimchar · Piplup', tag: 'Gen IV', desc: 'Infernape carried an entire generation of playthroughs.', meta: 'Prof. Rowan' },
      { title: 'Unova', sub: 'Snivy · Tepig · Oshawott', tag: 'Gen V', desc: 'And an entire regional dex with no old Pokémon in it until the credits.', meta: 'Prof. Juniper' },
      { title: 'Paldea', sub: 'Sprigatito · Fuecoco · Quaxly', tag: 'Gen IX', desc: 'Three routes through an open region, in any order you like.', meta: 'Prof. Sada / Turo' },
    ] },


  { id: 'played', kind: 'gallery', title: 'Pixelmon', note: 'my own screenshot · Pokémon inside Minecraft',
    lede: 'The way a lot of us actually played the most Pokémon: a Minecraft mod that rebuilt the whole capture-and-battle system block by block, on a public server with its own economy.',
    items: [
      { title: 'A level 100 Mewtwo at spawn', src: '/assets/img/franchises/minecraft-pixelmon.jpg',
        alt: 'A Pixelmon server spawn in Minecraft with a level 100 Mewtwo sent out',
        desc: 'Mewtwo and Flareon at level 100, with Emboar, Raichu, Staraptor and a badly neglected Seadra behind them. The server is telling me off for sending Mewtwo out at spawn, which is fair.',
        meta: 'Pixelmon · aelmallah' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Pokemon.com', href: 'https://www.pokemon.com/us',
        desc: 'The official site: games, cards, and the anime.' },
      { title: 'Bulbapedia', href: 'https://bulbapedia.bulbagarden.net/',
        desc: 'The reference. Base stats, learnsets, type charts, everything.' },
      { title: 'Serebii', href: 'https://www.serebii.net/',
        desc: 'The other reference, and the faster one for a new generation’s data.' },
    ] },

] };
