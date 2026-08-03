/* fan-sw.js: content for /franchises/star-wars/ (the fandom page, no apps).
   Rendered by fanpage.js. Dates use the in-universe BBY/ABY scale. */
window.FAN_PAGE = { sections: [

  { id: 'eras', kind: 'timeline', title: 'The Eras', note: 'BBY / ABY, before and after the Battle of Yavin',
    lede: 'Everything canon is filed into one of these. The whole Skywalker story is about fifty years wide; the galaxy around it runs for thousands.',
    items: [
      { when: '25,000 BBY', title: 'The Republic is founded', desc: 'The Jedi Order and the Galactic Republic grow up together on Coruscant.' },
      { when: '382 – 82 BBY', title: 'The High Republic', desc: 'The Order at its height: Starlight Beacon, the Nihil, and a Republic still expanding.' },
      { when: '32 – 19 BBY', title: 'The Fall of the Jedi', desc: 'Naboo to Order 66. The Clone Wars end with the Republic voting itself into an Empire.' },
      { when: '19 – 5 BBY', title: 'Reign of the Empire', desc: 'Inquisitors hunt the survivors. Rebel cells form on Lothal, Ferrix and a hundred other worlds.' },
      { when: '5 BBY – 4 ABY', title: 'Age of Rebellion', desc: 'Scarif, Yavin, Hoth, Endor: the Alliance takes down two Death Stars and an Emperor.' },
      { when: '4 – 28 ABY', title: 'The New Republic', desc: 'A government that will not admit the war is not over, and a Mandalorian with a foundling.' },
      { when: '28 – 35 ABY', title: 'Rise of the First Order', desc: 'Starkiller Base, Crait, Exegol, and the last of the Skywalkers.' },
    ] },

  { id: 'saga', kind: 'rank', title: 'The Skywalker Saga', note: 'nine films, 1977 – 2019',
    items: [
      { num: 'I', title: 'The Phantom Menace', sub: '1999', desc: 'Podracing, Darth Maul, and Duel of the Fates: still the best lightsaber choreography in the saga.' },
      { num: 'II', title: 'Attack of the Clones', sub: '2002', desc: 'Kamino, Geonosis, and the war that hands Palpatine his army.' },
      { num: 'III', title: 'Revenge of the Sith', sub: '2005', desc: 'Order 66 and Mustafar. The one the whole prequel trilogy was building toward.' },
      { num: 'IV', title: 'A New Hope', sub: '1977', desc: 'A farm boy, two droids and a trench run that rewrote what films could be.' },
      { num: 'V', title: 'The Empire Strikes Back', sub: '1980', desc: 'Hoth, Dagobah, Bespin: the darkest and the best of them.' },
      { num: 'VI', title: 'Return of the Jedi', sub: '1983', desc: 'The throne room scene: no fight won it, a refusal did.' },
      { num: 'VII', title: 'The Force Awakens', sub: '2015', desc: 'Jakku, Rey, Finn, and the Falcon back in the air.' },
      { num: 'VIII', title: 'The Last Jedi', sub: '2017', desc: 'Ahch-To, Crait, and the most argued-about film on the list.' },
      { num: 'IX', title: 'The Rise of Skywalker', sub: '2019', desc: 'Exegol, and the end of the ninety-year Palpatine problem.' },
    ] },

  { id: 'beyond', kind: 'cards', title: 'Beyond the Saga', note: 'the spinoffs that carry the universe',
    items: [
      { title: 'The Clone Wars', sub: '2008 – 2020', tag: 'Animation', desc: 'Seven seasons that turned the prequel era into the richest stretch of Star Wars there is. Ahsoka, Maul, the 501st, the Siege of Mandalore.', meta: '7 seasons · 133 episodes' },
      { title: 'Rebels', sub: '2014 – 2018', tag: 'Animation', desc: 'The Ghost crew between the trilogies, and the World Between Worlds: the boldest idea in the canon.', meta: '4 seasons · Lothal' },
      { title: 'Rogue One', sub: '2016', tag: 'Film', desc: 'How the Death Star plans got to Leia. The Vader hallway is three minutes of pure dread.', meta: 'Scarif · 0 BBY' },
      { title: 'Andor', sub: '2022 – 2025', tag: 'Series', desc: 'The best-written thing with the Star Wars logo on it. A revolution assembled out of paperwork, prisons and one funeral.', meta: '2 seasons · Ferrix' },
      { title: 'The Mandalorian', sub: '2019 –', tag: 'Series', desc: 'A bounty hunter, a foundling, and the New Republic era finally getting a shape.', meta: '3 seasons · 9 ABY' },
      { title: 'Ahsoka', sub: '2023 –', tag: 'Series', desc: 'Rebels, live action, purrgil and all, and a trip past the edge of the galaxy.', meta: 'Peridea · 9 ABY' },
      { title: 'The Bad Batch', sub: '2021 – 2024', tag: 'Animation', desc: 'What happened to the clones after the war they were made for ended.', meta: '3 seasons · Kamino' },
      { title: 'Jedi: Fallen Order & Survivor', sub: '2019 · 2023', tag: 'Games', desc: 'Cal Kestis, BD-1 and the best Star Wars combat ever shipped in a game.', meta: 'Koboh · Tanalorr' },
    ] },

  { id: 'kyber', kind: 'tiles', title: 'Kyber', note: 'the crystal picks the Jedi, not the other way round',
    lede: 'A kyber crystal is colourless until it is bonded. The blade colour is a record of who bonded it and how.',
    items: [
      { title: 'Blue', accent: '#4fa8ff', sub: 'Guardian', desc: 'The Jedi who leads with the blade: Obi-Wan, Anakin, Rey.' },
      { title: 'Green', accent: '#5fd07f', sub: 'Consular', desc: 'The Jedi who leads with the Force: Yoda, Qui-Gon, Luke at Jabba’s.' },
      { title: 'Purple', accent: '#a06fe0', sub: 'Vaapad', desc: 'Mace Windu, and a fighting form that walks right up to the edge of the dark.' },
      { title: 'Yellow', accent: '#f0c840', sub: 'Sentinel', desc: 'Temple Guards, and Rey’s own blade at the very end.' },
      { title: 'Red', accent: '#e03a2a', sub: 'Bled', desc: 'A Sith takes a crystal by force until it bleeds. Not grown, stolen.' },
      { title: 'White', accent: '#e8eef4', sub: 'Purified', desc: 'Ahsoka healed two bled crystals. The colour of a blade that belongs to no order.' },
      { title: 'Darksaber', accent: '#8f8fa0', sub: 'Unique', desc: 'Forged by the first Mandalorian Jedi. Whoever holds it rules Mandalore, if they won it.' },
      { title: 'Orange', accent: '#e08a3a', sub: 'Rare', desc: 'A handful of Jedi and Inquisitors; mostly a games-and-comics colour.' },
    ] },

  { id: 'holocron', kind: 'cards', title: 'The Holocron', note: 'a Star Wars terminal I built for this site',
    lede: 'The same idea as the J.A.R.V.I.S. page, in Star Wars grammar: a Jedi archive you can actually open.',
    items: [
      { title: 'H.O.L.O.C.R.O.N.', sub: 'Jedi Archives terminal', tag: 'Live', desc: 'A holocron turning inside a projector cone, kyber readings, a Galactic Standard stardate, and every page on this site filed as an archive entry. The cube is real CSS 3D, not an image.',
        href: '/holocron/', link: 'Unseal the archive', meta: 'CSS 3D · no images' },
      { title: 'E.L.M.A.L.L.A.H.', sub: 'The holotable', tag: 'Live', desc: 'The older one: a Star Wars holotable of the whole portfolio, with a spinning holocron, a drifting starfield and a sector scan.',
        href: '/elmallah/', link: 'Engage', meta: 'Holoterminal' },
      { title: 'Aurebesh', sub: 'The alphabet', tag: 'Apps', desc: 'The written language of the galaxy, and the reason two of my apps exist at all.',
        href: '/star-wars/', link: 'The apps', meta: 'Datapad · Aurebesh Translator' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    items: [
      { title: 'Do. Or do not. There is no try.', sub: 'Yoda · The Empire Strikes Back' },
      { title: 'This is the way.', sub: 'The Mandalorian' },
      { title: 'I am one with the Force. The Force is with me.', sub: 'Chirrut Îmwe · Rogue One' },
      { title: 'Hello there.', sub: 'Obi-Wan Kenobi · twice, twenty-six years apart' },
      { title: 'I would rather die than give you what you want. And you need me alive.', sub: 'Cassian Andor · Andor' },
      { title: 'Rebellions are built on hope.', sub: 'Jyn Erso · Rogue One' },
    ] },

] };
