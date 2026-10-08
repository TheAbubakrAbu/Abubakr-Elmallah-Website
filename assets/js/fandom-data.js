/* fandom-data.js: the franchises I love, on /worlds/.
   These are fandoms, not products: no app ships from most of them. Every tile
   is set in type and drawn by hand: no studio logos, no posters, no photos.
   fandom.js renders them, fandom.css holds the lettering styles.

   Fields (all required unless noted):
     name   what the tile says
     wm     lettering style, a `.wm--<wm>` rule in fandom.css
     glyph  emblem key, a path in fandom.js's GLYPHS table ('' for none)
     c1/c2  tile colors: ink and backdrop tint
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
      desc: 'Not a preference. One unbroken chain.' },
    { name: 'Qurʾān', wm: 'quran', glyph: 'mushaf', c1: '#e0b84f', c2: '#0b2418',
      when: 'Recited to me before I could read it',
      meta: 'Kitāb · 610 CE', href: '/worlds/quran/',
      desc: '114 sūrahs, never revised.' },
    { name: 'Sunnah', wm: 'sunnah', glyph: 'dome', c1: '#6fcfa4', c2: '#0a221a',
      when: 'The other half of the dīn',
      meta: 'Ḥadīth · 7th c.', href: '/worlds/sunnah/',
      desc: 'What the Prophet ﷺ said, by named chains.' },
    { name: 'Arab', wm: 'arab', glyph: 'qalam', c1: '#e8c56a', c2: '#241c0a',
      when: 'My first language at home',
      meta: 'Lisān · 6th c.', href: '/worlds/arab/',
      desc: 'Twenty-eight letters, four shapes each, right to left.' },
    { name: 'Minshāwī', wm: 'minshawi', glyph: 'mic', c1: '#d9b88a', c2: '#1f150a',
      when: 'The house voice, since always',
      meta: 'Qāriʾ · 1920', href: '/worlds/minshawi/',
      desc: 'The Upper-Egyptian voice it plays in at home.' },
    { name: 'Egypt', wm: 'egypt', glyph: 'pyramid', c1: '#e8a13f', c2: '#26170a',
      when: 'Where my family is from',
      meta: 'Miṣr · 3100 BC', href: '/worlds/egypt/',
      desc: 'Five thousand years in one valley. Where we are from.' },
    ] },

  { id: 'core', label: 'The Core Three', note: 'the ones I know by heart', items: [
    { name: 'Star Wars', wm: 'starwars', glyph: 'burst', c1: '#ffe81f', c2: '#2a2408',
      when: 'Around 2012, age six',
      meta: 'Film · 1977', href: '/worlds/star-wars/',
      desc: 'In it since I was six. An alphabet I shipped twice.' },
    { name: 'Harry Potter', wm: 'potter', glyph: 'bolt', c1: '#d9b45f', c2: '#241d10',
      when: '5th grade, 2016\u201317',
      meta: 'Books · 1997', href: '/worlds/harry-potter/',
      desc: 'Read the whole set before I knew what a compiler was.' },
    { name: 'Avengers', wm: 'avengers', glyph: 'circleA', c1: '#e0483a', c2: '#2a1210',
      when: '7th grade, 2018 \u00b7 Infinity War',
      meta: 'Film · 2012', href: '/worlds/avengers/',
      desc: 'Endgame is still my favorite film.' },
    ] },

  { id: 'primary', label: 'Primary', note: 'lived in, not just watched', items: [
    { name: 'Minecraft', wm: 'minecraft', glyph: 'block', c1: '#7fbf4f', c2: '#16240f',
      when: '2nd grade, around 2013–14',
      meta: 'Game · 2011', href: '/worlds/minecraft/',
      desc: 'Redstone was my first logic gate.' },
    { name: 'Pirates of the Caribbean', wm: 'pirates', glyph: 'skull', c1: '#d8c9a0', c2: '#1c1a14',
      when: 'Middle school, around 2017\u201320',
      meta: 'Film · 2003', href: '/worlds/pirates/',
      desc: 'A soundtrack that makes any task feel like a heist.' },
    { name: 'Jurassic Park', wm: 'jurassic', glyph: 'rex', c1: '#e0642a', c2: '#2a1408',
      when: 'Middle school, around 2017\u201320',
      meta: 'Film · 1993', href: '/worlds/jurassic-park/',
      desc: 'Practical effects that hold up. The first to scare me.' },

    { name: 'Stranger Things', wm: 'stranger', glyph: 'bulbs', c1: '#e8261d', c2: '#26090a',
      when: '2nd year of college, 2025\u201326',
      meta: 'Series · 2016', href: '/worlds/stranger-things/', desc: 'Eighties synth, a wall of bulbs, and kids on bikes.' },

    { name: 'Game of Thrones', wm: 'thrones', glyph: 'crown', c1: '#b9c2cc', c2: '#161a1f',
      when: '2nd year of college, 2025\u201326',
      meta: 'Series · 2011', href: '/worlds/game-of-thrones/', desc: 'The first six seasons set the bar for TV scale.' },

    { name: 'Avatar: The Last Airbender', wm: 'atla', glyph: 'spiral', c1: '#e8a13f', c2: '#241a0c',
      when: 'Elementary school',
      meta: 'Animation · 2005', href: '/worlds/avatar-last-airbender/', desc: 'The best-written cartoon ever made, and not closely.' },

  ] },
  { id: 'secondary', label: 'Secondary', note: 'in regular rotation', items: [
    { name: 'Ninjago', wm: 'ninjago', glyph: 'spinner', c1: '#e0b040', c2: '#20180a',
      when: 'Around 2012\u201313, age six or seven',
      meta: 'Animation · 2011', href: '/worlds/ninjago/', desc: 'A toy line that grew into a sixteen-season saga.' },

    { name: 'Red Dead Redemption', wm: 'reddead', glyph: 'badge', c1: '#c9402f', c2: '#26100c',
      when: '1st year of college, 2024\u201325',
      meta: 'Game · 2010', href: '/worlds/red-dead/', desc: 'A western that breaks your heart in the epilogue.' },

    { name: 'The Office', wm: 'office', glyph: 'mug', c1: '#e8e6e0', c2: '#191b20',
      when: '8th grade, 2019\u201320',
      meta: 'Series · 2005', href: '/worlds/the-office/', desc: 'The comfort rewatch. This one stuck.' },

    { name: 'The Simpsons', wm: 'simpsons', glyph: 'donut', c1: '#ffd21f', c2: '#1a2438',
      when: '8th and 9th grade, 2019\u201321',
      meta: 'Animation · 1989', href: '/worlds/the-simpsons/', desc: 'The golden age wrote half the internet’s jokes.' },

    { name: 'The Boys', wm: 'boys', glyph: 'splat', c1: '#e02a2a', c2: '#210b0b',
      when: 'Summer 2022, going into 11th grade',
      meta: 'Series · 2019', href: '/worlds/the-boys/', desc: 'Superheroes as a PR department.' },

    { name: 'Pokémon', wm: 'pokemon', glyph: 'pokeball', c1: '#ffd43f', c2: '#152040',
      when: 'Elementary school; big surge 5th grade, 2016\u201317',
      meta: 'Game · 1996', href: '/worlds/pokemon/', desc: '150 creatures memorized before the times tables.' },

    { name: 'Batman', wm: 'batman', glyph: 'bat', c1: '#c9cdd2', c2: '#121417',
      when: '5th grade, 2016\u201317',
      meta: 'Comics · 1939', href: '/worlds/batman/', desc: 'No powers, just preparation.' },

    { name: 'Spider-Man', wm: 'spiderman', glyph: 'spider', c1: '#e02a3a', c2: '#1a0e14',
      when: 'Since I was little; the Amazing era, 2012\u201314',
      meta: 'Comics · 1962', href: '/worlds/spider-man/', desc: 'The hero whose problems are the size of yours.' },

    
  ] },

  { id: 'tertiary', label: 'Tertiary', note: 'good, and picked up when the mood hits', items: [
    /* The four at the head of the tier, 2026-10-07 (the owner's call): each
       one now has a Terminal Interface of its own, and they lead Tertiary in
       the order he named them. The Justice League came down from Secondary on
       2026-09-28; Green Lantern went in on 2026-10-04 because he is one of
       the six the League page is on this site for, and the only one of them
       with a corps, an oath and a rule set of his own. */
    { name: 'Indiana Jones', wm: 'indiana', glyph: 'fedora', c1: '#d8b06a', c2: '#221a0e',
      when: 'As a kid, through the LEGO games',
      meta: 'Film · 1981', href: '/worlds/indiana-jones/', desc: 'Archaeology as an action sport, superbly scored.' },
    { name: 'The Lord of the Rings', wm: 'lotr', glyph: 'ring', c1: '#d9b45f', c2: '#1a1710',
      when: '1st year of college, 2024\u201325',
      meta: 'Books · 1954', href: '/worlds/lord-of-the-rings/', desc: 'The trilogy every fantasy is measured against.' },
    { name: 'Green Lantern', wm: 'lantern', glyph: 'lantern', c1: '#4fd07f', c2: '#0b2416',
      when: 'Since I was a kid, on the cartoons',
      meta: 'Comics · 1940', href: '/worlds/green-lantern/',
      desc: 'A ring that builds whatever you picture.' },
    { name: 'The Justice League', wm: 'jl', glyph: 'league', c1: '#5f9fe0', c2: '#0d1730',
      when: 'Since I was a kid, on the cartoons',
      meta: 'Comics · 1960', href: '/worlds/justice-league/',
      desc: 'The DC guys, on the cartoons.' },
    { name: 'LEGO', wm: 'lego', glyph: 'brick', c1: '#ffd21f', c2: '#2a0d0c',
      when: 'Since I was a young kid',
      meta: 'Toy · 1958', href: '/worlds/lego/',
      desc: 'The 1958 patent still fits a brick made today.' },

    /* The batch that went in after the first pass, in the order he ranks them
       rather than the order they arrived. They went in without a `when` line,
       because the rest of this file says when I actually got into each thing
       and a made-up date would make the one honest column on the page
       unreliable; he has since given every one, so every tile here has one.
       Four of that batch, Pixar, Angry Birds, Geometry Dash and The Hunger
       Games, are down in the As a Kid group now. */
    { name: 'Fortnite', wm: 'fortnite', glyph: 'storm', c1: '#6fb0ff', c2: '#141a30',
      when: '2018\u201319, 6th\u20137th grade',
      meta: 'Game · 2017', href: '/worlds/fortnite/', desc: 'Chapter 1, seasons three to seven. Omega at tier 100.' },
    { name: 'Five Nights at Freddy’s', wm: 'fnaf', glyph: 'bear', c1: '#c98f4f', c2: '#1a1410',
      when: 'Middle school, around 2017\u201320',
      meta: 'Game · 2014', href: '/worlds/five-nights-at-freddys/', desc: 'A horror game of cameras and a battery meter.' },
    { name: 'Parks and Recreation', wm: 'parks', glyph: 'pine', c1: '#5fbf7f', c2: '#0f2016',
      when: '8th grade, 2019\u201320',
      meta: 'Series · 2009', href: '/worlds/parks-and-recreation/', desc: 'The rare comedy with no cruelty in it.' },
    { name: 'Breaking Bad', wm: 'breakingbad', glyph: '', c1: '#4fbf7f', c2: '#101a14',
      when: '10th grade, 2021\u201322',
      meta: 'Series · 2008', href: '/worlds/breaking-bad/', desc: 'Five seasons without a wasted scene.' },
    { name: 'Percy Jackson', wm: 'percy', glyph: 'trident', c1: '#5fa8e0', c2: '#0e1a2a',
      when: '6th grade, 2017\u201318',
      meta: 'Books · 2005', href: '/worlds/percy-jackson/', desc: 'Greek myth for kids about to be handed the Iliad.' },
    { name: 'Avatar', wm: 'avatar', glyph: 'seed', c1: '#5fd6e0', c2: '#0c1e26',
      when: '11th grade, 2022, for Way of Water',
      meta: 'Film · 2009', href: '/worlds/avatar/', desc: 'Pandora at 48fps: the closest film gets to a place.' },
    { name: 'Invincible', wm: 'invincible', glyph: 'mask', c1: '#f0d040', c2: '#161a2a',
      when: 'Summer 2024, into freshman year',
      meta: 'Animation · 2021', href: '/worlds/invincible/', desc: 'A superhero cartoon that turns in one episode.' },
    { name: 'Kung Fu Panda', wm: 'kungfu', glyph: 'panda', c1: '#e0703a', c2: '#231108',
      when: 'Since I was a kid; the first film is older than I can remember',
      meta: 'Animation · 2008', href: '/worlds/kung-fu-panda/', desc: 'A slapstick premise with a real film underneath.' },
    { name: 'Dune', wm: 'dune', glyph: 'worm', c1: '#e0a050', c2: '#241a0e',
      when: '2021 and 2024, 10th and 12th grade',
      meta: 'Books · 1965', href: '/worlds/dune/', desc: 'I fell asleep in both films and still knew they were great.' },

    { name: 'John Wick', wm: 'wick', glyph: 'coin', c1: '#d84a52', c2: '#170a0d',
      when: '9th or 10th grade',
      meta: 'Film · 2014', href: '/worlds/john-wick/',
      desc: 'An assassins’ guild with its own paperwork.' },
    { name: 'Christopher Nolan', wm: 'nolan', glyph: 'top', c1: '#d0d8e0', c2: '#0e1217',
      when: '10th grade, 2021–22, through Inception',
      meta: 'Director · 1998', href: '/worlds/christopher-nolan/',
      desc: 'Thirteen films about time, told out of order.' },

    { name: 'Overwatch', wm: 'overwatch', glyph: 'visor', c1: '#f09d3a', c2: '#16233a',
      when: '5th grade, 2016–17; properly in 6th and 7th',
      meta: 'Game \u00b7 2016', href: '/worlds/overwatch/',
      desc: 'Nobody has the same gun.' },

    { name: 'Clash Royale', wm: 'clash', glyph: 'kingtower', c1: '#6f9fe8', c2: '#101a30',
      when: '4th grade, 2016, when it launched; still on my phone',
      meta: 'Game · 2016', href: '/worlds/clash-royale/',
      desc: 'Three-minute chess: two lanes, eight cards.' },

    /* The two animation studios, moved up out of As a Kid on 2026-10-07. They
       came to him as a kid, but unlike the rest of that group he still rates
       and rewatches them, which is the test for being up here. */
    { name: 'Pixar', wm: 'pixar', glyph: 'lamp', c1: '#4fa8e0', c2: '#0a1524',
      when: 'Since elementary school, and still',
      meta: 'Studio · 1986', href: '/worlds/pixar/',
      desc: 'It bet a cartoon could be about grief, and won.' },
    { name: 'DreamWorks', wm: 'dreamworks', glyph: 'moon', c1: '#8fb8e0', c2: '#0c1626',
      when: 'Since I was a kid, and still',
      meta: 'Studio · 1994', href: '/worlds/dreamworks/',
      desc: 'The only studio to take animation off Disney.' },

      ] },

  /* ── As a Kid ──
     Split out of Tertiary on 2026-09-06, and nothing above Tertiary was
     touched to do it. Everything in here I loved properly once, at an age when
     a thing being on after school was most of the argument for it, and none of
     it is what I put on now. That is not the same as thinking less of them:
     the tiles above are the ones I would still argue for with somebody my own
     age, and these are the ones I would argue for with a nine-year-old. The
     `when` line on each tile is the reason it is down here rather than up
     there. Teen Titans Go and Despicable Me arrived straight into this group
     on the same day, because there was never a point at which they belonged
     anywhere else.

     2026-09-07: eight more came down out of Tertiary, in the order he ranks
     them, which is why they sit above the ones that were always here. Clash
     Royale went the other way on the same day; it is still on his phone, so it
     was never an As a Kid tile in the first place. */
  { id: 'kid', label: 'As a Kid', note: 'everything to me then; I do not put them on now', items: [
    { name: 'The Hunger Games', wm: 'hunger', glyph: 'mockingjay', c1: '#e0b040', c2: '#1a1408',
      when: 'Somewhere in middle school',
      meta: 'Books · 2008', href: '/worlds/hunger-games/',
      desc: 'A televised contest, won by refusing to finish it.' },
    { name: 'SpongeBob', wm: 'spongebob', glyph: 'pineapple', c1: '#f0e03f', c2: '#0a2a3a',
      when: 'Since I was a kid',
      meta: 'Animation · 1999', href: '/worlds/spongebob/',
      desc: 'The golden age: the best-written animated comedy.' },
    { name: 'DuckTales', wm: 'ducktales', glyph: 'moneybin', c1: '#f0b333', c2: '#10363a',
      when: 'As a kid',
      meta: 'Animation \u00b7 1987', href: '/worlds/ducktales/',
      desc: 'Three nephews and a building full of money.' },
    { name: 'How to Train Your Dragon', wm: 'httyd', glyph: 'helm', c1: '#7fd0e8', c2: '#0c1620',
      when: 'Since the first film, as a kid',
      meta: 'Film · 2010', href: '/worlds/how-to-train-your-dragon/',
      desc: 'The best flight scenes in animation.' },

    /* The studios moved up to Tertiary on 2026-10-07. Looney Tunes stays in
       this group; the theme parks that arrived with them are in the parks
       group at the foot of the page. */

    /* The Zelda and Splatoon tiles came out on 2026-08-31, when both of their
       pages were folded into this one. */
    { name: 'Nintendo', wm: 'nintendo', glyph: 'dpad', c1: '#e0403a', c2: '#220e0c',
      when: 'Since I was a kid; the Switch on launch, 2017',
      meta: 'Company \u00b7 1889', href: '/worlds/nintendo/',
      desc: 'An 1889 card company that found Mario.' },

    /* September 2026. Mario comes out from under Nintendo, which keeps the
       company and hands over the plumber. The rest of that batch, Rio and the
       toy lines, are further down this group. */
    { name: 'Mario', wm: 'mario', glyph: 'mushroom', c1: '#e0403a', c2: '#2a0e0c',
      when: 'Since I was a kid',
      meta: 'Game \u00b7 1981', href: '/worlds/mario/',
      desc: 'The jump came before the character.' },
    { name: 'The Maze Runner', wm: 'mazerunner', glyph: 'spiral', c1: '#8fbf78', c2: '#132018',
      when: 'Middle school',
      meta: 'Books \u00b7 2009', href: '/worlds/maze-runner/',
      desc: 'A boy wakes in a maze, with rules.' },

    { name: 'Angry Birds', wm: 'angrybirds', glyph: 'bird', c1: '#e03a2a', c2: '#241009',
      when: 'Since elementary school',
      meta: 'Game · 2009', href: '/worlds/angry-birds/',
      desc: 'A projectile-motion problem with a grudge.' },
    { name: 'Roblox', wm: 'roblox', glyph: 'noob', c1: '#e5453c', c2: '#1b1d22',
      when: 'As a kid, on a school laptop',
      meta: 'Platform \u00b7 2006', href: '/worlds/roblox/',
      desc: 'An engine, not a game. All of it made by kids.' },
    { name: 'Geometry Dash', wm: 'geodash', glyph: 'cube', c1: '#39d6f0', c2: '#0a1a24',
      when: 'As a kid, as far as Theory of Everything',
      meta: 'Game \u00b7 2013', href: '/worlds/geometry-dash/',
      desc: 'One button, no checkpoints, and no mercy.' },
    { name: 'Looney Tunes', wm: 'looney', glyph: 'target', c1: '#f0c040', c2: '#111c3a',
      when: 'As a kid',
      meta: 'Animation \u00b7 1930', href: '/worlds/looney-tunes/',
      desc: 'Seven minutes and a rabbit who wins by staying calm.' },
    { name: 'Phineas and Ferb', wm: 'phineas', glyph: 'bolt', c1: '#74c95a', c2: '#102617',
      when: 'As a kid',
      meta: 'Animation \u00b7 2007', href: '/worlds/phineas-and-ferb/',
      desc: 'A hundred and four days of summer, and a platypus.' },
    /* October 2026. The two after-school cartoons that were always in this
       group in spirit and had simply never been written down. Both sit beside
       Phineas and Ferb because that is the same slot on the same afternoons. */
    { name: 'The Fairly OddParents', wm: 'fop', glyph: 'wand', c1: '#e05a9f', c2: '#2a0e20',
      when: 'As a kid, on after school',
      meta: 'Animation \u00b7 2001', href: '/worlds/fairly-oddparents/',
      desc: 'Every wish granted as worded, never as you meant.' },
    { name: 'Johnny Test', wm: 'jt', glyph: 'atom', c1: '#e07a2a', c2: '#2a1408',
      when: 'As a kid, on after school',
      meta: 'Animation \u00b7 2005', href: '/worlds/johnny-test/',
      desc: 'A talking dog and a whip-crack on every cut.' },
    { name: 'Teen Titans Go!', wm: 'ttg', glyph: 'ttower', c1: '#e04a9f', c2: '#1d0e26',
      when: 'As a kid, on after school',
      meta: 'Animation \u00b7 2013', href: '/worlds/teen-titans-go/',
      desc: 'Eleven minutes, voiced by the 2003 cast.' },
    { name: 'Despicable Me', wm: 'despicable', glyph: 'goggle', c1: '#f2c531', c2: '#2b2340',
      when: 'As a kid; the first one when I was four',
      meta: 'Film \u00b7 2010', href: '/worlds/despicable-me/',
      desc: 'A supervillain adopts three girls, and keeps them.' },
    { name: 'Rio', wm: 'rio', glyph: 'macaw', c1: '#3fc8d8', c2: '#0d2b31',
      when: 'As a kid, and again at the zoo',
      meta: 'Film \u00b7 2011', href: '/worlds/rio/',
      desc: 'The last Spix’s macaws, since put back in the wild.' },
    { name: 'Yu-Gi-Oh!', wm: 'ygo', glyph: 'duelcard', c1: '#b06fd8', c2: '#22133a',
      when: 'As a kid',
      meta: 'Manga \u00b7 1996', href: '/worlds/yu-gi-oh/',
      desc: 'A card game ate its manga, then sold 25 billion cards.' },
    { name: 'Beyblade', wm: 'beyblade', glyph: 'beytop', c1: '#4f9fe0', c2: '#122238',
      when: 'As a kid',
      meta: 'Toy \u00b7 1999', href: '/worlds/beyblade/',
      desc: 'Spinning tops with a rip cord, and an anime to sell them.' },

    /* Added 2026-10-06. It sits with the other toy lines that reached him
       through a screen first (Yu-Gi-Oh above, Beyblade and Skylanders
       around it), because that is the order it happened in: the Bay films
       and the Universal ride, and the toys after them. */
    { name: 'Transformers', wm: 'transformers', glyph: 'autobot', c1: '#c9342b', c2: '#2a1416',
      when: 'As a kid, on the Bay films and the Universal ride',
      meta: 'Toy \u00b7 1984', href: '/worlds/transformers/',
      desc: 'A car that folds into a robot, sold for four decades.' },
    { name: 'Ice Age', wm: 'iceage', glyph: 'acorn', c1: '#8fd0e8', c2: '#12262f',
      when: 'As a kid',
      meta: 'Film \u00b7 2002', href: '/worlds/ice-age/',
      desc: 'A mammoth, a sloth, and one doomed squirrel.' },
    { name: 'Skylanders', wm: 'skylanders', glyph: 'portal', c1: '#f0a83a', c2: '#221a38',
      when: 'As a kid',
      meta: 'Game \u00b7 2011', href: '/worlds/skylanders/',
      desc: 'Figure on the portal, and it appears.' },
    { name: 'Bloons TD', wm: 'bloons', glyph: 'balloon', c1: '#d84a3a', c2: '#2c1512',
      when: 'Since the browser days',
      meta: 'Game \u00b7 2007', href: '/worlds/bloons/',
      desc: 'Monkeys darting balloons, seriously.' },
    { name: 'Wild Kratts', wm: 'kratts', glyph: 'cdisc', c1: '#4fce6a', c2: '#08210f',
      when: 'As a kid, on PBS in the morning',
      meta: 'Animation \u00b7 2011', href: '/worlds/wild-kratts/',
      desc: 'A suit that grants one true animal ability.' },
    { name: 'Dinosaur Train', wm: 'dinotrain', glyph: 'loco', c1: '#3fb8b0', c2: '#10262c',
      when: 'As a kid, before I could read',
      meta: 'Animation \u00b7 2009', href: '/worlds/dinosaur-train/',
      desc: 'A T. rex raised by pteranodons.' },
  ] },

  { id: 'parks', label: 'Theme Parks', note: 'the ones worth the drive', items: [
    { name: 'Disney', wm: 'disney', glyph: 'castle', c1: '#8fd8f0', c2: '#141033',
      when: 'Since I was a kid',
      meta: 'Studio · 1923', href: '/worlds/disney/',
      desc: 'Six resorts, twelve parks, one roof.' },

    { name: 'Universal Studios', wm: 'universal', glyph: 'globe', c1: '#f0a83a', c2: '#231206',
      when: 'First visit 2015; properly 7th\u20138th grade, 2018\u201320',
      meta: 'Studio · 1912', href: '/worlds/universal-studios/',
      desc: 'Transformers and Jurassic got me first.' },

    { name: 'LEGOLAND', wm: 'legoland', glyph: 'minifig', c1: '#f5d222', c2: '#12260f',
      when: 'Since I was small; most of it in 2016',
      meta: 'Park \u00b7 1968', href: '/worlds/legoland/',
      desc: 'Miniland is the point: cities at 1:20, in brick.' },

    { name: 'San Diego Zoo', wm: 'zoo', glyph: 'paw', c1: '#7fc86a', c2: '#0f1d0c',
      when: 'Since I was small; the Safari Park most of all',
      meta: 'Zoo \u00b7 1916', href: '/worlds/san-diego-zoo/',
      desc: 'A hundred acres in Balboa Park, fences out.' },

    { name: 'Knott\u2019s Berry Farm', wm: 'knotts', glyph: 'saloon', c1: '#b06fd8', c2: '#1e0f26',
      when: 'Elementary school',
      meta: 'Park \u00b7 1920', href: '/worlds/knotts/',
      desc: 'A berry stand that grew a ghost town, pre-Disneyland.' },

    { name: 'Six Flags', wm: 'sixflags', glyph: 'flags', c1: '#e03a3a', c2: '#0d1630',
      when: 'Magic Mountain, every ride in it',
      meta: 'Park \u00b7 1961', href: '/worlds/six-flags/',
      desc: 'More coasters than any park on earth. That is the pitch.' },

  ] },

];
