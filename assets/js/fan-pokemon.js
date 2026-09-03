/* fan-pokemon.js: content for /worlds/pokemon/. Rendered by fanpage.js.
   Type colours below are the ones the games have used since Gen VI. */
window.FAN_PAGE = {
  when: { at: 'Elementary school; big surge 5th grade, 2016\u201317', note: 'Around since I was small, then two things blew it open: Pokémon GO the summer before fifth grade, and fifth grade itself when everybody had cards and we traded constantly. Pixelmon in Minecraft got an enormous amount of my time too.' },
  sections: [

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
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'every main game, by generation',
    lede: 'Nine generations of main-series games, a spin-off shelf larger than most franchises manage in total, and an anime that has been running since 1997 without ever quite ending.',
    items: [
      { title: 'The Main Series', sub: 'Game Freak · 1996 – now', unit: 'game',
        desc: 'Paired versions counted as one entry, which is how everybody actually thinks about them.',
        rows: [
          { n: 'Red & Blue', y: '1996' },
          { n: 'Yellow', y: '1998' },
          { n: 'Gold & Silver', y: '1999' },
          { n: 'Crystal', y: '2000' },
          { n: 'Ruby & Sapphire', y: '2002' },
          { n: 'FireRed & LeafGreen', y: '2004' },
          { n: 'Emerald', y: '2004' },
          { n: 'Diamond & Pearl', y: '2006' },
          { n: 'Platinum', y: '2008' },
          { n: 'HeartGold & SoulSilver', y: '2009' },
          { n: 'Black & White', y: '2010' },
          { n: 'Black 2 & White 2', y: '2012' },
          { n: 'X & Y', y: '2013' },
          { n: 'Omega Ruby & Alpha Sapphire', y: '2014' },
          { n: 'Sun & Moon', y: '2016' },
          { n: 'Ultra Sun & Ultra Moon', y: '2017' },
          { n: 'Let’s Go, Pikachu & Eevee', y: '2018' },
          { n: 'Sword & Shield', y: '2019' },
          { n: 'Brilliant Diamond & Shining Pearl', y: '2021' },
          { n: 'Legends: Arceus', y: '2022' },
          { n: 'Scarlet & Violet', y: '2022' },
          { n: 'Legends: Z-A', y: '2025' },
        ] },
      { title: 'The Spin-offs', sub: '1998 – now', unit: 'game',
        desc: 'The ones that got their own audiences. GO is on this page already for what it did to fifth grade.',
        rows: [
          { n: 'Pokémon Stadium', y: '1998' },
          { n: 'Pokémon Snap', y: '1999' },
          { n: 'Pokémon Colosseum', y: '2003' },
          { n: 'Mystery Dungeon', y: '2005' },
          { n: 'Pokkén Tournament', y: '2015' },
          { n: 'Pokémon GO', y: '2016', big: true },
          { n: 'New Pokémon Snap', y: '2021' },
          { n: 'Pokémon Unite', y: '2021' },
        ] },
      { title: 'On Screen', sub: '1997 – now', unit: 'work',
        desc: 'Over twelve hundred episodes and more than twenty films. Listed by era rather than one by one.',
        rows: [
          { n: 'The anime, Indigo League on', y: '1997' },
          { n: 'Mewtwo Strikes Back', y: '1998' },
          { n: 'Pokémon Horizons', y: '2023' },
          { n: 'Detective Pikachu', y: '2019' },
          { n: 'Pokémon Concierge', y: '2023' },
        ] },
      { title: 'The Cards', sub: 'Wizards of the Coast, then The Pokémon Company · 1996 – now', unit: 'thing',
        desc: 'The trading card game, which is the part of this that got traded across a fifth-grade classroom.',
        rows: [
          { n: 'The trading card game', y: '1996', big: true },
          { n: 'Pokémon TCG Live', y: '2023' },
          { n: 'Pokémon TCG Pocket', y: '2024' },
        ] },
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

  { id: 'favourites', kind: 'cards', title: 'Mine', note: 'the ones I would actually put on a team',
    lede: 'Charizard first, and it has never been close. After that a very specific set: one sky dragon, three birds, and the two that made the first film work.',
    items: [
      { title: 'Charizard', sub: 'No. 006 · Fire, Flying', tag: 'No. 1', accent: '#e0602a',
        desc: 'My favourite, permanently and without argument. Not even the best Fire starter on paper (it is four times weak to Rock, which is a genuinely terrible thing to be in Kanto), and none of that has ever mattered for a second.',
        meta: 'Mega X · Mega Y · Gigantamax' },
      { title: 'Charmander & Charmeleon', sub: 'No. 004 · No. 005 · Fire', tag: 'The line', accent: '#f0a03a',
        desc: 'The hardest first pick in the original game and the one I took every time. Charmander’s tail flame is a health bar: if it goes out, so does he, which is a lot to put on a child. Then Charmeleon: the awkward middle stage everybody skips past, bad-tempered, hard to control, and visibly halfway to being something enormous.',
        meta: 'Evolves at 16, then 36' },
      { title: 'Rayquaza', sub: 'No. 384 · Dragon, Flying', tag: 'No. 2', accent: '#3fbf7f',
        desc: 'Lives in the ozone layer and comes down only when Kyogre and Groudon start tearing the planet apart. It Mega Evolves without a stone, by knowing Dragon Ascent, which no other Pokémon can do. And the shiny is <b>black</b>, which is the single best recolour in the entire series.',
        meta: 'Shiny: black · Delta Episode' },
      { title: 'Articuno', sub: 'No. 144 · Ice, Flying', tag: 'Birds', accent: '#7fd0f0',
        desc: 'My favourite of the three birds. The Seafoam Islands, a trail of snow behind it, and the calmest of the trio by a distance.',
        meta: 'The Seafoam Islands' },
      { title: 'Zapdos', sub: 'No. 145 · Electric, Flying', tag: 'Birds', accent: '#f0c840',
        desc: 'Asleep in the Power Plant, and the one that actually feels dangerous to walk up to. I love all three of them, so this is here on merit rather than politeness.',
        meta: 'The Power Plant' },
      { title: 'Moltres', sub: 'No. 146 · Fire, Flying', tag: 'Birds', accent: '#e0602a',
        desc: 'Waiting at the end of Victory Road, right before the Elite Four, which is the most dramatic placement of the three. Together the trio is still the best legendary set Game Freak has ever designed.',
        meta: 'Victory Road' },
      { title: 'Mewtwo', sub: 'No. 150 · Psychic', tag: 'No. 3', accent: '#a06fe0',
        desc: 'Made in a lab from Mew’s DNA and immediately resentful about it. Cerulean Cave at level 70, after the Elite Four, which made it feel like the actual end of the game.',
        meta: 'Cerulean Cave · Mega X, Y' },
      { title: 'Mew', sub: 'No. 151 · Psychic', tag: 'No. 4', accent: '#f0a0c0',
        desc: 'The ancestor of everything, able to learn every single TM, and for years the most rumoured-about thing in gaming. Half my primary school believed it was under a lorry.',
        meta: 'Learns every TM' },
    ] },

  { id: 'stuck', kind: 'cards', title: 'The Ones That Stuck', note: 'no accounting for taste',
    items: [
      { title: 'Pikachu', sub: 'No. 025 · Electric', tag: 'Mascot', desc: 'Was not the mascot originally; Clefairy was the plan. Pikachu got the job and never gave it back, and is now one of the most recognisable characters on Earth.', meta: 'Gen I' },
      { title: 'Charizard', sub: 'No. 006 · Fire, Flying', tag: 'Starter', desc: 'Not part Dragon, which every child on a playground has argued about at least once.', meta: 'Gen I' },
      { title: 'Mewtwo', sub: 'No. 150 · Psychic', tag: 'Legendary', desc: 'Made in a lab from Mew\u2019s DNA, and the first Pok\u00e9mon the series let be genuinely angry about it.', meta: 'Cerulean Cave' },
      { title: 'Eevee', sub: 'No. 133 · Normal', tag: 'Branching', desc: 'Eight evolutions and counting, which turned one design into an entire mechanic.', meta: 'Gen I onward' },
      { title: 'Gengar', sub: 'No. 094 · Ghost, Poison', tag: 'Fan favourite', desc: 'Grins in the background of half the games and has the best competitive history of any Ghost type.', meta: 'Gen I' },
      { title: 'Snorlax', sub: 'No. 143 · Normal', tag: 'Obstacle', desc: 'Blocks a road until you play a flute at it. An entire route design built around one sleeping animal.', meta: 'Gen I' },
      { title: 'Lucario', sub: 'No. 448 · Fighting, Steel', tag: 'Gen IV', desc: 'Reads aura, carries a film on its own, and has been in every crossover since.', meta: 'Sinnoh' },
      { title: 'Greninja', sub: 'No. 658 · Water, Dark', tag: 'Gen VI', desc: 'A ninja frog that throws shuriken made of compressed water. Voted the single most popular Pok\u00e9mon in a global poll.', meta: 'Kalos' },
    ] },

  { id: 'start', kind: 'rank', title: 'Where To Start', note: 'if you are picking one up now · with the Western release and the region’s own place in the timeline',
    items: [
      { title: 'HeartGold and SoulSilver', sub: '2009 · DS', meta: 'Released March 2010 in the West · Johto, three years after Red and Blue', desc: 'Two regions, sixteen gyms, and your lead Pok\u00e9mon walks behind you. Widely rated the best remakes ever made.' },
      { title: 'Emerald', sub: '2004 · GBA', meta: 'Released May 2005 in the West · Hoenn, running alongside Ruby and Sapphire', desc: 'Hoenn with both villain teams, the Battle Frontier, and the tightest of the early-generation games.' },
      { title: 'Platinum', sub: '2008 · DS', meta: 'Released March 2009 in the West · Sinnoh, the definitive version of that story', desc: 'Sinnoh fixed: better pacing, better dex, and the Distortion World.' },
      { title: 'Black and White', sub: '2010 · DS', meta: 'Released March 2011 in the West · Unova, and its own sequels are set two years later', desc: 'A completely new dex until the credits roll, and the only game in the series with a villain who has a point.' },
      { title: 'Legends: Arceus', sub: '2022 · Switch', meta: 'Released January 2022 · Hisui, about two hundred years before Sinnoh', desc: 'Throws out the formula: no gyms, real-time catching, and an open region two hundred years before the rest.' },
      { title: 'Scarlet and Violet', sub: '2022 · Switch', meta: 'Released November 2022 · Paldea, present day', desc: 'Fully open, three storylines at once, and a frame rate everybody argued about for a year.' },
    ] },

  { id: 'beyond', kind: 'tiles', title: 'Beyond The Games', note: 'the rest of the machine',
    items: [
      { title: 'Pokémon GO', accent: '#f8d030', sub: '2016', desc: 'For one summer it had the entire world outside walking in circles round a park, which no game had managed before or since.' },
      { title: 'The trading card game', accent: '#6890f0', sub: 'Since 1996', desc: 'Over sixty billion cards printed, and a first edition Charizard that sells for the price of a car.' },
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


  /* Pixelmon is captioned once, in fan-shots.js, and shown here and on the
     Minecraft page from the same row; only the lede is this page's */
  { id: 'played', set: 'pixelmon', note: 'my own screenshot · Pok\u00e9mon inside Minecraft',
    lede: 'The way a lot of us actually played the most Pok\u00e9mon: a Minecraft mod that rebuilt the whole capture-and-battle system block by block, on a public server with its own economy.' },

  /* the Pok\u00e9mon Centers, July 2026: every one in the three cities but two.
     Mega Tokyo in Ikebukuro was shut that summer (closed from 27 March 2026,
     reopening in September) and Tokyo-Bay is out in Funabashi, Chiba, the
     best part of an hour from Shibuya. Four of them are photographed in the
     I Have Actually Been block further down, out of photos-data.js. */
  { id: 'centers', kind: 'tiles', compact: true, title: 'The Pok\u00e9mon Centers', note: 'July 2026 \u00b7 six of them',
    lede: 'Japan has a Pok\u00e9mon Center every few stops, and in July 2026 I went to every one in the three cities I was in, apart from two: Mega Tokyo in Ikebukuro, which was shut that summer, and Tokyo-Bay, which is out in Funabashi, the best part of an hour from Shibuya and not really in the city at all.',
    items: [
      { title: 'Tokyo DX', accent: '#e0402a', sub: 'Nihonbashi', desc: 'The flagship, with the Pok\u00e9mon Caf\u00e9 beside it. Snorlax, Pikachu and Mew over the door.' },
      { title: 'Shibuya', accent: '#8f5fd0', sub: 'Shibuya PARCO', desc: 'Mewtwo in its tube at the entrance, minutes after Nintendo TOKYO on the same floor.' },
      { title: 'Skytree Town', accent: '#3f9f5f', sub: 'Sumida', desc: 'Rayquaza coiled under the sign, in the mall at the foot of the tower.' },
      { title: 'Kyoto', accent: '#f0c840', sub: 'Kyoto', desc: 'The one in Kyoto, between the temples and the bamboo.' },
      { title: 'Osaka', accent: '#3f6fd0', sub: 'Umeda', desc: 'The one by the station.' },
      { title: 'Osaka DX', accent: '#e08a3a', sub: 'Shinsaibashi', desc: 'Articuno, Zapdos and Moltres over the door, the card tables inside, and the other Pok\u00e9mon Caf\u00e9 beside it.' },
    ] },

  { id: 'balls', kind: 'tiles', title: 'Every Ball', note: 'and what each one is actually doing', compact: true,
    lede: 'The catch formula weighs the target\u2019s remaining health, its status, its species rate and the ball. The ball is the only part you control, which is why there are so many of them and why almost all of them are conditional.',
    items: [
      { title: 'Poke Ball', accent: '#e0402a', sub: '\u00d71', desc: 'The baseline every other ball is measured against.' },
      { title: 'Great Ball', accent: '#3f6fd0', sub: '\u00d71.5', desc: 'The mid-game default.' },
      { title: 'Ultra Ball', accent: '#f0c840', sub: '\u00d72', desc: 'What you stock before a legendary.' },
      { title: 'Master Ball', accent: '#a05fd0', sub: 'Never fails', desc: 'One per game, and nobody ever throws it.' },
      { title: 'Quick Ball', accent: '#5fc0e0', sub: '\u00d75, turn one only', desc: 'Lead with it or do not bother.' },
      { title: 'Dusk Ball', accent: '#4a7f5f', sub: '\u00d73 at night or in caves', desc: 'Excellent if you plan around the clock.' },
      { title: 'Timer Ball', accent: '#c9cdd2', sub: 'Scales with turns', desc: 'For the long grinding fights.' },
      { title: 'Net Ball', accent: '#4fb0a0', sub: '\u00d73.5 water and bug', desc: 'Huge, when the type lines up.' },
      { title: 'Dive Ball', accent: '#3f8fd0', sub: '\u00d73.5 underwater', desc: 'Narrow window, superb inside it.' },
      { title: 'Nest Ball', accent: '#5fbf5f', sub: 'Better on low levels', desc: 'Early routes only.' },
      { title: 'Repeat Ball', accent: '#e0a83a', sub: '\u00d73.5 if already in the Pokedex', desc: 'Best exactly when you care least.' },
      { title: 'Heal Ball', accent: '#f0a8c4', sub: '\u00d71, heals fully', desc: 'Saves the trip to the Centre.' },
      { title: 'Luxury Ball', accent: '#c9a05f', sub: '\u00d71, double friendship', desc: 'Matters for Umbreon and Return.' },
      { title: 'Premier Ball', accent: '#e8e2d0', sub: '\u00d71, free in bulk', desc: 'Purely cosmetic, and hoarded anyway.' },
      { title: 'Level Ball', accent: '#8f9fd0', sub: 'Up to \u00d74 on level gap', desc: 'Kurt\u2019s Apricorn balls, from Johto.' },
      { title: 'Beast Ball', accent: '#6fd0c0', sub: '\u00d75 / \u00d70.1', desc: 'The harshest trade any ball offers.' },
      { title: 'Safari Ball', accent: '#8f7f4f', sub: 'Safari Zone only', desc: 'Bait and rocks instead of battling.' },
      { title: 'Cherish Ball', accent: '#e0483a', sub: 'Event only', desc: 'Tells you where a Pokemon came from.' },
    ] },

  /* the music: the two main themes, the anime's and the games'; nothing from
     Pokémon is on my playlist yet */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks · the main themes',
    lede: 'Nothing from Pokémon is on my playlist yet, so these are the two that count: the song every kid in 1998 could sing, and the Game Boy title screen under it.',
    items: [
      { title: 'Pokémon Theme', accent: '#f0c840', sub: 'Jason Paige · 1998 · 3:19',
        desc: 'Jason Paige. Gotta catch ’em all: the anime opening, and the reason a whole generation can sing a song about a training regimen.',
        href: 'https://www.youtube.com/watch?v=2zMIddjFAIA', link: 'Listen' },
      { title: 'Title Screen', accent: '#e0602a', sub: 'Pokémon Red & Green · Junichi Masuda · 1996 · 1:39',
        desc: 'Junichi Masuda, on a Game Boy sound chip. The title screen with the two starters fighting, and the four bars everything since has been arranged from.',
        href: 'https://www.youtube.com/watch?v=njoPUWILwpo', link: 'Fan upload' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Pokemon.com', href: 'https://www.pokemon.com/us',
        desc: 'The official site: the games, the cards, and every generation’s Pokédex.' },
      { title: 'Bulbapedia', href: 'https://bulbapedia.bulbagarden.net/',
        desc: 'The reference. Base stats, learnsets, type charts, everything.' },
      { title: 'Serebii', href: 'https://www.serebii.net/',
        desc: 'The other reference, and the faster one for a new generation’s data.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "roll",
  title: "The Poke Balls",
  intro: "Every ball in the series, and each one is a different maths problem: the catch rate is a multiplier applied to a formula that also weighs the target\u2019s remaining health and status. Pick one to read what it actually does, or throw at random and see what you get handed.",
  prompt: "Pick a ball, or press 1\u20139.",
  button: "Throw one at random",
  again: "Throw another",
  wait: [
        "Wind up.",
        "Throw.",
        "One shake.",
        "Two.",
        "Three\u2026"
      ],
  beat: 300,
  items: [
    { n: "Poke Ball", s: "x1", c: "#e0402a", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 8, said: "A standard Poke Ball. It will probably do.", note: "The baseline, and the one every formula is measured against. Cheap, available from the first shop in every game, and still the correct answer for most of the early route." },
    { n: "Great Ball", s: "x1.5", c: "#3f6fd0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 6, said: "A Great Ball. Fifty per cent better and four times the price.", note: "The first upgrade, and the one you spend most of the mid-game throwing. Blue with the red flare, and the shape people picture second after the original." },
    { n: "Ultra Ball", s: "x2", c: "#f0c840", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 5, said: "An Ultra Ball. Twice as good as standard.", note: "Black and yellow, twice the base rate, and what you stock up on before every legendary attempt because you cannot bring yourself to spend the Master Ball." },
    { n: "Master Ball", s: "Never fails", c: "#a05fd0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 1, said: "The Master Ball. It cannot fail. You will not use it.", note: "One per game, one hundred per cent catch rate, no exceptions. And almost nobody ever throws it, because the moment you do you no longer have a Master Ball, so it sits in the bag for the entire playthrough." },
    { n: "Quick Ball", s: "x5 on turn one", c: "#5fc0e0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 4, said: "A Quick Ball, thrown immediately. Five times the rate.", note: "Enormous multiplier, but only on the very first turn of the encounter and worthless after. Changes how you open a fight entirely: lead with it or do not bother." },
    { n: "Dusk Ball", s: "x3 in the dark", c: "#4a7f5f", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 4, said: "A Dusk Ball. It is dark enough for this to work.", note: "Triple rate at night or inside a cave. One of the best in the game if you are willing to plan around the clock, which is a very Pokemon thing to ask of you." },
    { n: "Timer Ball", s: "Better the longer it takes", c: "#c9cdd2", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 4, said: "A Timer Ball. The longer this goes, the better it gets.", note: "Scales up each turn to a cap, which makes it the right answer for a long grinding legendary fight and the wrong one for anything you meet on a route." },
    { n: "Net Ball", s: "x3.5 water and bug", c: "#4fb0a0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Net Ball. Water or bug, and it is very good at both.", note: "One of the strongest conditional multipliers in the series if the target happens to be the right type." },
    { n: "Dive Ball", s: "x3.5 underwater", c: "#3f8fd0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Dive Ball, underwater.", note: "Only useful while surfing or diving, which is a narrow window, but inside that window it is excellent." },
    { n: "Nest Ball", s: "Better on weak targets", c: "#5fbf5f", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Nest Ball. Low level, high chance.", note: "Scales inversely with the target\u2019s level, so it is superb on early routes and completely useless later." },
    { n: "Repeat Ball", s: "x3.5 if already caught", c: "#e0a83a", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Repeat Ball. You have caught one of these before.", note: "The completionist\u2019s ball: it gets better on species already in your Pokedex, which is exactly when you are least likely to care." },
    { n: "Heal Ball", s: "x1, heals on catch", c: "#f0a8c4", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Heal Ball. No better odds, but it comes out healthy.", note: "No catch bonus at all. Restores HP, PP and status the moment it lands, which saves a trip to the Centre and is quietly very convenient." },
    { n: "Luxury Ball", s: "x1, friendship", c: "#c9a05f", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 2, said: "A Luxury Ball. It will like you faster.", note: "Black and gold, no catch bonus, doubles friendship gain. Matters far more than it sounds if you want an Umbreon or a Return build." },
    { n: "Premier Ball", s: "x1, free", c: "#e8e2d0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 3, said: "A Premier Ball. Free with ten Poke Balls.", note: "Purely cosmetic (plain white with a red rim) and handed out when you buy in bulk. People hoard them anyway because the release animation is white." },
    { n: "Level Ball", s: "Apricorn", c: "#8f9fd0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 2, said: "A Level Ball. Yours is much higher level than theirs.", note: "One of Kurt\u2019s Apricorn balls from Johto. Scales with the level gap between your Pokemon and the target, and at 4x it is the strongest conditional in the game." },
    { n: "Beast Ball", s: "Ultra Beasts only", c: "#6fd0c0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 1, said: "A Beast Ball. Unless that is an Ultra Beast, this is going badly.", note: "Five times the rate on Ultra Beasts and one tenth on everything else, which is the harshest trade-off any ball has ever offered." },
    { n: "Safari Ball", s: "Safari Zone only", c: "#8f7f4f", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 2, said: "A Safari Ball. Bait or rock first?", note: "Only usable inside the Safari Zone, where you cannot battle at all and instead throw bait and rocks and hope. A completely different game hidden inside the main one." },
    { n: "Cherish Ball", s: "Event only", c: "#e0483a", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M3 12h6 M15 12h6 M12 12a3 3 0 1 1 0 .1", w: 1, said: "A Cherish Ball. This one came from an event.", note: "Never obtainable in normal play. It only exists on distributed event Pokemon, which makes it the one ball whose presence tells you where a Pokemon came from." },
  ],
};
