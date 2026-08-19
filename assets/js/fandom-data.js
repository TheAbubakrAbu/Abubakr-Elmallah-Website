/* fandom-data.js: the franchises I love, on /worlds/.
   These are fandoms, not products: no app ships from most of them. Every tile
   is set in type and drawn by hand: no studio logos, no posters, no photos.
   fandom.js renders them, fandom.css holds the lettering styles.

   Fields (all required unless noted):
     name   what the tile says
     wm     lettering style, a `.wm--<wm>` rule in fandom.css
     glyph  emblem key, a path in fandom.js's GLYPHS table ('' for none)
     c1/c2  tile colours: ink and backdrop tint
     meta   medium · year line
     desc   one line on it
     href   optional, link out to a page on this site */

window.FANDOMS = [

  /* Who I am sits above everything else, and none of it is a fandom: you do
     not pick your faith, your language or where your family is from the way you
     pick a film series. They are on this page because the rest of the page does
     not make sense without them, and because they are what I would still be if
     you deleted every other tile here. */
  { id: 'identity', label: 'Who I Am', note: 'not fandoms; this is what I actually am', items: [
    { name: 'Islam', wm: 'islam', glyph: 'rub', c1: '#3fd589', c2: '#0a2015',
      when: 'Before I could speak',
      meta: 'Dīn · 610 CE', href: '/worlds/islam/',
      desc: 'The only thing on this page that is not a preference. Twenty-five prophets named in the Qurʾān, the three mosques worth setting out to travel for, and the chain of scholarship every bit of it came down.' },
    { name: 'Arab', wm: 'arab', glyph: 'qalam', c1: '#e8c56a', c2: '#241c0a',
      when: 'My first language at home',
      meta: 'Lisān · 6th c.', href: '/worlds/arab/',
      desc: 'Twenty-eight letters, each with four shapes depending on where it stands, written right to left and joined up by default. The language my family speaks, and the reason I read a page from the back.' },
    { name: 'Egypt', wm: 'egypt', glyph: 'pyramid', c1: '#e8a13f', c2: '#26170a',
      when: 'Where my family is from',
      meta: 'Miṣr · 3100 BC', href: '/worlds/egypt/',
      desc: 'Five thousand years of continuous record in one valley, along one river, and the country my parents left. Where I am from before I am from anywhere else.' },
    { name: 'Minshāwī', wm: 'minshawi', glyph: 'mic', c1: '#d9b88a', c2: '#1f150a',
      when: 'The house voice, since always',
      meta: 'Qāriʾ · 1920', href: '/worlds/minshawi/',
      desc: 'Muḥammad Ṣiddīq al-Minshāwī, 1920–1969: the Upper-Egyptian voice the Qurʾān plays in inside this house. Dead at forty-nine, which means every recording there will ever be of him already exists.' },
    { name: 'Qurʾān', wm: 'quran', glyph: 'mushaf', c1: '#e0b84f', c2: '#0b2418',
      when: 'Recited to me before I could read it',
      meta: 'Kitāb · 610 CE', href: '/worlds/quran/',
      desc: 'The speech of Allah: 114 sūrahs revealed over twenty-three years, memorised end to end by millions, and never revised since. A recitation before it is a book, which is what the tile before this one is about.' },
    { name: 'Sunnah', wm: 'sunnah', glyph: 'dome', c1: '#6fcfa4', c2: '#0a221a',
      when: 'The other half of the dīn',
      meta: 'Ḥadīth · 7th c.', href: '/worlds/sunnah/',
      desc: 'What the Prophet ﷺ said, did and approved of, carried by named chains of people and graded link by link. The Qurʾān says pray; this is where the how of it lives.' },
    ] },

  { id: 'core', label: 'The Core Three', note: 'the ones I know by heart', items: [
    { name: 'Star Wars', wm: 'starwars', glyph: 'burst', c1: '#ffe81f', c2: '#2a2408',
      when: 'Around 2012, age six',
      meta: 'Film · 1977', href: '/worlds/star-wars/',
      desc: 'In this fight since I was six years old. The prequels, the Clone Wars, and an alphabet I liked enough to ship twice.' },
    { name: 'Harry Potter', wm: 'potter', glyph: 'bolt', c1: '#d9b45f', c2: '#241d10',
      when: '5th grade, 2016\u201317',
      meta: 'Books · 1997', href: '/worlds/harry-potter/',
      desc: 'Read the whole set before I could tell you what a compiler was. Still the best world-building in a children’s series.' },
    { name: 'Avengers', wm: 'avengers', glyph: 'circleA', c1: '#e0483a', c2: '#2a1210',
      when: '7th grade, 2018 \u00b7 Infinity War',
      meta: 'Film · 2012', href: '/worlds/avengers/',
      desc: 'Infinity War pulled me in and Endgame is still my favourite film ever made. Also the reason there is a J.A.R.V.I.S. terminal on this site.' },
    ] },

  { id: 'primary', label: 'Primary', note: 'lived in, not just watched', items: [
    { name: 'Minecraft', wm: 'minecraft', glyph: 'block', c1: '#7fbf4f', c2: '#16240f',
      when: 'Since I was a kid',
      meta: 'Game · 2011', href: '/worlds/minecraft/',
      desc: 'Redstone was my first logic gate. Command blocks were my first scripting language.' },
    { name: 'Pirates of the Caribbean', wm: 'pirates', glyph: 'skull', c1: '#d8c9a0', c2: '#1c1a14',
      when: 'Middle school, around 2017\u201320',
      meta: 'Film · 2003', href: '/worlds/pirates/',
      desc: 'Jack Sparrow, the Black Pearl, and a soundtrack that makes any task feel like a heist.' },
    { name: 'Jurassic Park', wm: 'jurassic', glyph: 'rex', c1: '#e0642a', c2: '#2a1408',
      when: 'Middle school, around 2017\u201320',
      meta: 'Film · 1993', href: '/worlds/jurassic-park/',
      desc: 'Practical effects that still hold up after thirty years, and the first film that scared me properly.' },

    { name: 'Stranger Things', wm: 'stranger', glyph: 'bulbs', c1: '#e8261d', c2: '#26090a',
      when: '2nd year of college, 2025\u201326',
      meta: 'Series · 2016', href: '/worlds/stranger-things/', desc: 'Eighties synth, a wall of bulbs on the plaster, and kids on bikes.' },

    { name: 'Game of Thrones', wm: 'thrones', glyph: 'crown', c1: '#b9c2cc', c2: '#161a1f',
      when: '2nd year of college, 2025\u201326',
      meta: 'Series · 2011', href: '/worlds/game-of-thrones/', desc: 'The first six seasons are still the high-water mark for television scale.' },

    { name: 'Avatar: The Last Airbender', wm: 'atla', glyph: 'spiral', c1: '#e8a13f', c2: '#241a0c',
      when: 'Elementary school',
      meta: 'Animation · 2005', href: '/worlds/avatar-last-airbender/', desc: 'The best-written cartoon ever made, and it is not particularly close.' },

  ] },
  { id: 'secondary', label: 'Secondary', note: 'in regular rotation', items: [
    { name: 'Red Dead Redemption', wm: 'reddead', glyph: 'badge', c1: '#c9402f', c2: '#26100c',
      when: '1st year of college, 2024\u201325',
      meta: 'Game · 2010', href: '/worlds/red-dead/', desc: 'A western that respects your time and then breaks your heart in the epilogue.' },

    { name: 'Ninjago', wm: 'ninjago', glyph: 'spinner', c1: '#e0b040', c2: '#20180a',
      when: 'Around 2012\u201313, age six or seven',
      meta: 'Animation · 2011', href: '/worlds/ninjago/', desc: 'Picked it up right after Star Wars and never really put it down. A toy line that grew into a sixteen-season saga.' },

    { name: 'The Simpsons', wm: 'simpsons', glyph: 'donut', c1: '#ffd21f', c2: '#1a2438',
      when: '8th and 9th grade, 2019\u201321',
      meta: 'Animation · 1989', href: '/worlds/the-simpsons/', desc: 'Universal Studios got me into it before I had really watched it. The golden-age seasons wrote half the jokes the internet runs on.' },

    { name: 'The Office', wm: 'office', glyph: 'mug', c1: '#e8e6e0', c2: '#191b20',
      when: '8th grade, 2019\u201320',
      meta: 'Series · 2005', href: '/worlds/the-office/', desc: 'The comfort rewatch, and the first of the two. Parks might be funnier; this is the one that stuck.' },

    { name: 'The Boys', wm: 'boys', glyph: 'splat', c1: '#e02a2a', c2: '#210b0b',
      when: 'Summer 2022, going into 11th grade',
      meta: 'Series · 2019', href: '/worlds/the-boys/', desc: 'Superheroes as a PR department, which is a much scarier idea than a villain.' },

    { name: 'Pokémon', wm: 'pokemon', glyph: 'pokeball', c1: '#ffd43f', c2: '#152040',
      when: 'Elementary school; big surge 5th grade, 2016\u201317',
      meta: 'Game · 1996', href: '/worlds/pokemon/', desc: 'A hundred and fifty creatures memorised before I memorised the times tables.' },

    { name: 'The Justice League', wm: 'jl', glyph: 'league', c1: '#5f9fe0', c2: '#0d1730',
      when: 'Since I was a kid, on the cartoons',
      meta: 'Comics · 1960', href: '/worlds/justice-league/',
      desc: 'Shorthand for the DC guys: Batman, Superman, Green Lantern, the Flash. The cartoons got me, not the comics.' },

    { name: 'Batman', wm: 'batman', glyph: 'bat', c1: '#c9cdd2', c2: '#121417',
      when: '5th grade, 2016\u201317',
      meta: 'Comics · 1939', href: '/worlds/batman/', desc: 'No powers, just preparation: the animated series and the Arkham games especially.' },

    { name: 'Spider-Man', wm: 'spiderman', glyph: 'spider', c1: '#e02a3a', c2: '#1a0e14',
      when: 'Since I was little; the Amazing era, 2012\u201314',
      meta: 'Comics · 1962', href: '/worlds/spider-man/', desc: 'The one superhero whose problems are the same size as everyone else’s.' },

    
  ] },

  { id: 'tertiary', label: 'Tertiary', note: 'good, and picked up when the mood hits', items: [
    { name: 'Five Nights at Freddy’s', wm: 'fnaf', glyph: 'bear', c1: '#c98f4f', c2: '#1a1410',
      when: 'Middle school, around 2017\u201320',
      meta: 'Game · 2014', href: '/worlds/five-nights-at-freddys/', desc: 'A horror game made of security cameras and a battery meter. Ruthlessly efficient design.' },
    { name: 'Fortnite', wm: 'fortnite', glyph: 'storm', c1: '#6fb0ff', c2: '#141a30',
      when: '2018\u201319, 6th\u20137th grade',
      meta: 'Game · 2017', href: '/worlds/fortnite/', desc: 'Chapter 1, seasons three to seven, and Omega at tier one hundred. Nothing since has come close.' },
    { name: 'Indiana Jones', wm: 'indiana', glyph: 'fedora', c1: '#d8b06a', c2: '#221a0e',
      when: 'As a kid, through the LEGO games',
      meta: 'Film · 1981', href: '/worlds/indiana-jones/', desc: 'Archaeology as an action sport, with the best-scored opening scene in cinema.' },
    { name: 'Parks and Recreation', wm: 'parks', glyph: 'pine', c1: '#5fbf7f', c2: '#0f2016',
      when: '8th grade, 2019\u201320',
      meta: 'Series · 2009', href: '/worlds/parks-and-recreation/', desc: 'The rare comedy with no cruelty in it. Possibly funnier than The Office, and it does not get the credit.' },
    { name: 'The Lord of the Rings', wm: 'lotr', glyph: 'ring', c1: '#d9b45f', c2: '#1a1710',
      when: '1st year of college, 2024\u201325',
      meta: 'Books · 1954', href: '/worlds/lord-of-the-rings/', desc: 'The trilogy every fantasy since has been quietly measured against.' },
    { name: 'Breaking Bad', wm: 'breakingbad', glyph: '', c1: '#4fbf7f', c2: '#101a14',
      when: '10th grade, 2021\u201322',
      meta: 'Series · 2008', href: '/worlds/breaking-bad/', desc: 'Five seasons without a wasted scene, and the best-shot show on this list.' },
    { name: 'Percy Jackson', wm: 'percy', glyph: 'trident', c1: '#5fa8e0', c2: '#0e1a2a',
      when: '6th grade, 2017\u201318',
      meta: 'Books · 2005', href: '/worlds/percy-jackson/', desc: 'Greek mythology for kids about to be handed the Iliad. Read straight after Harry Potter and always a close second to it.' },
    { name: 'Avatar', wm: 'avatar', glyph: 'seed', c1: '#5fd6e0', c2: '#0c1e26',
      when: '11th grade, 2022, for Way of Water',
      meta: 'Film · 2009', href: '/worlds/avatar/', desc: 'Pandora at 48 frames a second is still the closest cinema has come to a place.' },
    { name: 'Invincible', wm: 'invincible', glyph: 'mask', c1: '#f0d040', c2: '#161a2a',
      when: 'Summer 2024, into freshman year',
      meta: 'Animation · 2021', href: '/worlds/invincible/', desc: 'Starts as a superhero cartoon and turns, in one episode, into something else. I bounced off it once and came back for the finale.' },
    { name: 'Kung Fu Panda', wm: 'kungfu', glyph: 'panda', c1: '#e0703a', c2: '#231108',
      when: 'Since I was a kid',
      meta: 'Animation · 2008', href: '/worlds/kung-fu-panda/', desc: 'A slapstick premise that turned out to have a real film underneath it.' },
    { name: 'Dune', wm: 'dune', glyph: 'worm', c1: '#e0a050', c2: '#241a0e',
      when: '2021 and 2024, 10th and 12th grade',
      meta: 'Books · 1965', href: '/worlds/dune/', desc: 'One of the greatest things I have ever seen in a cinema. I fell asleep in both films and still knew they were great.' },

    { name: 'LEGO', wm: 'lego', glyph: 'brick', c1: '#ffd21f', c2: '#2a0d0c',
      when: 'Since I was a kid',
      meta: 'Toy · 1958', href: '/worlds/lego/',
      desc: 'The clutch power patent is from 1958 and a brick from then still fits one moulded this morning.' },

    { name: 'Clash Royale', wm: 'clash', glyph: 'kingtower', c1: '#6f9fe8', c2: '#101a30',
      when: 'Elementary school, when it launched',
      meta: 'Game · 2016', href: '/worlds/clash-royale/',
      desc: 'Three-minute chess with an elixir bar: two lanes, three towers, eight cards. Clash of Clans lives inside its page, because that is the village the whole thing marched out of.' },

    { name: 'How to Train Your Dragon', wm: 'httyd', glyph: 'helm', c1: '#7fd0e8', c2: '#0c1620',
      when: 'Since the first film, as a kid',
      meta: 'Film · 2010', href: '/worlds/how-to-train-your-dragon/',
      desc: 'The best flight scenes in animation, John Powell’s best score, and a boy who fixes what he broke with engineering. The Test Drive sequence still does it.' },

    { name: 'SpongeBob', wm: 'spongebob', glyph: 'pineapple', c1: '#f0e03f', c2: '#0a2a3a',
      when: 'Since I was a kid',
      meta: 'Animation · 1999', href: '/worlds/spongebob/',
      desc: 'The golden-age seasons are some of the best-written comedy ever animated, and the internet has been speaking in its screenshots for twenty years.' },

    
      ] },

  { id: 'parks', label: 'Theme Parks', note: 'the ones worth the drive', items: [
    { name: 'Disney', wm: 'disney', glyph: 'castle', c1: '#8fd8f0', c2: '#141033',
      when: 'Since I was a kid',
      meta: 'Studio · 1923', href: '/worlds/disney/',
      desc: 'Six resorts, twelve parks, and most of the other franchises on this page now live under the same roof.' },

    { name: 'Universal Studios', wm: 'universal', glyph: 'globe', c1: '#f0a83a', c2: '#231206',
      when: 'First visit 2015; properly 7th\u20138th grade, 2018\u201320',
      meta: 'Studio · 1912', href: '/worlds/universal-studios/',
      desc: 'Transformers and Jurassic got me first, years before I knew what the Wizarding World was. The best themed lands going.' },

    { name: 'Knott\u2019s Berry Farm', wm: 'knotts', glyph: 'saloon', c1: '#b06fd8', c2: '#1e0f26',
      when: 'Elementary school',
      meta: 'Park \u00b7 1920', href: '/worlds/knotts/',
      desc: 'A berry stand that grew a ghost town around the queue for its chicken dinners, fifteen years before Disneyland opened.' },

  ] },

];
