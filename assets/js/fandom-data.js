/* fandom-data.js: the franchises I love, on /franchises/.
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

  { id: 'core', label: 'The Core Three', note: 'the ones I know by heart', items: [
    { name: 'Star Wars', wm: 'starwars', glyph: 'burst', c1: '#ffe81f', c2: '#2a2408',
      meta: 'Film · 1977', href: '/franchises/star-wars/',
      desc: 'Prequels, Clone Wars, and the Aurebesh alphabet I ended up shipping twice. Its own page: the eras, the saga, the spinoffs, kyber.' },
    { name: 'Harry Potter', wm: 'potter', glyph: 'bolt', c1: '#d9b45f', c2: '#241d10',
      meta: 'Books · 1997', href: '/franchises/harry-potter/',
      desc: 'Read the whole set before I could tell you what a compiler was. Still the best world-building in a children’s series.' },
    { name: 'Avengers', wm: 'avengers', glyph: 'circleA', c1: '#e0483a', c2: '#2a1210',
      meta: 'Film · 2012', href: '/franchises/avengers/',
      desc: 'The reason there is a J.A.R.V.I.S. terminal on this site at all.' },
    ] },

  { id: 'primary', label: 'Primary', note: 'lived in, not just watched', items: [
    { name: 'Minecraft', wm: 'minecraft', glyph: 'block', c1: '#7fbf4f', c2: '#16240f',
      meta: 'Game · 2011', href: '/franchises/minecraft/',
      desc: 'Redstone was my first logic gate. Command blocks were my first scripting language.' },
    { name: 'Pirates of the Caribbean', wm: 'pirates', glyph: 'skull', c1: '#d8c9a0', c2: '#1c1a14',
      meta: 'Film · 2003', href: '/franchises/pirates/',
      desc: 'Jack Sparrow, the Black Pearl, and a soundtrack that makes any task feel like a heist.' },
    { name: 'Jurassic Park', wm: 'jurassic', glyph: 'rex', c1: '#e0642a', c2: '#2a1408',
      meta: 'Film · 1993', href: '/franchises/jurassic-park/',
      desc: 'Practical effects that still hold up after thirty years, and the first film that scared me properly.' },

    { name: 'Stranger Things', wm: 'stranger', glyph: 'bulbs', c1: '#e8261d', c2: '#26090a',
      meta: 'Series · 2016', href: '/franchises/stranger-things/', desc: 'Eighties synth, a wall of Christmas lights, and kids on bikes.' },

    { name: 'Game of Thrones', wm: 'thrones', glyph: 'crown', c1: '#b9c2cc', c2: '#161a1f',
      meta: 'Series · 2011', href: '/franchises/game-of-thrones/', desc: 'The first six seasons are still the high-water mark for television scale.' },

    { name: 'Avatar: The Last Airbender', wm: 'atla', glyph: 'spiral', c1: '#e8a13f', c2: '#241a0c',
      meta: 'Animation · 2005', href: '/franchises/avatar-last-airbender/', desc: 'The best-written cartoon ever made, and it is not particularly close.' },

  ] },
  { id: 'secondary', label: 'Secondary', note: 'in regular rotation', items: [
                { name: 'Red Dead Redemption', wm: 'reddead', glyph: 'badge', c1: '#c9402f', c2: '#26100c',
      meta: 'Game · 2010', href: '/franchises/red-dead/', desc: 'A western that respects your time and then breaks your heart in the epilogue.' },
    { name: 'Ninjago', wm: 'ninjago', glyph: 'spinner', c1: '#e0b040', c2: '#20180a',
      meta: 'Animation · 2011', href: '/franchises/ninjago/', desc: 'Somehow a LEGO toy line grew into a genuinely good sixteen-season saga.' },
    { name: 'The Simpsons', wm: 'simpsons', glyph: 'donut', c1: '#ffd21f', c2: '#1a2438',
      meta: 'Animation · 1989', href: '/franchises/the-simpsons/', desc: 'The golden-age seasons wrote half the jokes the internet still runs on.' },
    { name: 'The Office', wm: 'office', glyph: 'mug', c1: '#e8e6e0', c2: '#191b20',
      meta: 'Series · 2005', href: '/franchises/the-office/', desc: 'The comfort rewatch. Nothing else works as background noise this well.' },
    { name: 'The Boys', wm: 'boys', glyph: 'splat', c1: '#e02a2a', c2: '#210b0b',
      meta: 'Series · 2019', href: '/franchises/the-boys/', desc: 'Superheroes as a PR department, which is a much scarier idea than a villain.' },
    { name: 'Batman', wm: 'batman', glyph: 'bat', c1: '#c9cdd2', c2: '#121417',
      meta: 'Comics · 1939', href: '/franchises/batman/', desc: 'No powers, just preparation: the animated series and the Arkham games especially.' },
    { name: 'Spider-Man', wm: 'spiderman', glyph: 'spider', c1: '#e02a3a', c2: '#1a0e14',
      meta: 'Comics · 1962', href: '/franchises/spider-man/', desc: 'The one superhero whose problems are the same size as everyone else’s.' },
    { name: 'Pokémon', wm: 'pokemon', glyph: 'pokeball', c1: '#ffd43f', c2: '#152040',
      meta: 'Game · 1996', href: '/franchises/pokemon/', desc: 'A hundred and fifty creatures memorised before I memorised the times tables.' },
  ] },

  { id: 'tertiary', label: 'Tertiary', note: 'good, and picked up when the mood hits', items: [
    { name: 'Five Nights at Freddy’s', wm: 'fnaf', glyph: 'bear', c1: '#c98f4f', c2: '#1a1410',
      meta: 'Game · 2014', href: '/franchises/five-nights-at-freddys/', desc: 'A horror game made of security cameras and a battery meter. Ruthlessly efficient design.' },
    { name: 'Fortnite', wm: 'fortnite', glyph: 'storm', c1: '#6fb0ff', c2: '#141a30',
      meta: 'Game · 2017', href: '/franchises/fortnite/', desc: 'The building mechanic turned a shooter into a construction race.' },
    { name: 'Indiana Jones', wm: 'indiana', glyph: 'fedora', c1: '#d8b06a', c2: '#221a0e',
      meta: 'Film · 1981', href: '/franchises/indiana-jones/', desc: 'Archaeology as an action sport, with the best-scored opening scene in cinema.' },
    { name: 'Parks and Recreation', wm: 'parks', glyph: 'pine', c1: '#5fbf7f', c2: '#0f2016',
      meta: 'Series · 2009', href: '/franchises/parks-and-recreation/', desc: 'The rare comedy where everyone is trying their best and it is still funny.' },
    { name: 'The Lord of the Rings', wm: 'lotr', glyph: 'ring', c1: '#d9b45f', c2: '#1a1710',
      meta: 'Books · 1954', href: '/franchises/lord-of-the-rings/', desc: 'The trilogy every fantasy since has been quietly measured against.' },
    { name: 'Breaking Bad', wm: 'breakingbad', glyph: '', c1: '#4fbf7f', c2: '#101a14',
      meta: 'Series · 2008', href: '/franchises/breaking-bad/', desc: 'Five seasons without a wasted scene, and the best-shot show on this list.' },
    { name: 'Kung Fu Panda', wm: 'kungfu', glyph: 'panda', c1: '#e0703a', c2: '#231108',
      meta: 'Animation · 2008', href: '/franchises/kung-fu-panda/', desc: 'A slapstick premise that turned out to have a real film underneath it.' },
    { name: 'Avatar', wm: 'avatar', glyph: 'seed', c1: '#5fd6e0', c2: '#0c1e26',
      meta: 'Film · 2009', href: '/franchises/avatar/', desc: 'Pandora at 48 frames a second is still the closest cinema has come to a place.' },
    { name: 'Invincible', wm: 'invincible', glyph: 'mask', c1: '#f0d040', c2: '#161a2a',
      meta: 'Animation · 2021', href: '/franchises/invincible/', desc: 'Starts as a superhero cartoon and turns, in one episode, into something else.' },
    { name: 'Percy Jackson', wm: 'percy', glyph: 'trident', c1: '#5fa8e0', c2: '#0e1a2a',
      meta: 'Books · 2005', href: '/franchises/percy-jackson/', desc: 'Greek mythology retold for kids who were about to be handed the Iliad.' },
    { name: 'Dune', wm: 'dune', glyph: 'worm', c1: '#e0a050', c2: '#241a0e',
      meta: 'Books · 1965', href: '/franchises/dune/', desc: 'Ecology, religion and empire in one desert. The 2021 adaptation finally did it justice.' },

    { name: 'LEGO', wm: 'lego', glyph: 'brick', c1: '#ffd21f', c2: '#2a0d0c',
      meta: 'Toy · 1958', href: '/franchises/lego/',
      desc: 'The clutch power patent is from 1958 and a brick from then still fits one moulded this morning.' },

    { name: 'Disney', wm: 'disney', glyph: 'castle', c1: '#9fd0ff', c2: '#0d1430',
      meta: 'Studio · 1923', href: '/franchises/disney/',
      desc: 'Six resorts, twelve parks, and most of the other franchises on this page now live under the same roof.' },

    { name: 'Universal Studios', wm: 'universal', glyph: 'globe', c1: '#8fb8e8', c2: '#0b1424',
      meta: 'Studio · 1912', href: '/franchises/universal-studios/',
      desc: 'A working backlot you can ride through, and the parks that build the best themed lands going.' },
  ] },

];
