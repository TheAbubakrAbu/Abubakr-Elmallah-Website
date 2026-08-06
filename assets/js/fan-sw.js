/* fan-sw.js: content for /franchises/star-wars/ (the fandom page, no apps).

   Rendered by fanpage.js. Dates use the in-universe BBY/ABY scale, counted
   from the Battle of Yavin.

   The order is deliberate. The four screen sections run together, prequels
   first, because that is the order they matter to me rather than the order
   they were released: Prequels → Originals → Sequels → Spinoffs. Then the
   Clone Wars block (arcs, legions, Order 66), then kyber and the lines. */
window.FAN_PAGE = {
  when: { at: 'Around 2012, age six', note: 'As Cassian says: I have been in this fight since I was six years old. Lightsabers and the Force were the first things that ever made me want a whole universe to be real.' },
  sections: [

  { id: 'count', kind: 'stats', title: 'The Short Version', note: 'before any of the arguing starts',
    items: [
      { title: '1977', sub: 'Where it starts', desc: 'A New Hope, and every space film since owes it something.' },
      { title: 'III', sub: 'The one for me', desc: 'Revenge of the Sith. I have never had to be talked into the prequels.' },
      { title: '133', sub: 'Clone Wars episodes', desc: 'Seven seasons that made the prequel era the best stretch of Star Wars there is.' },
      { title: '4', sub: 'Builds shipped', desc: 'Two Apple apps and two Discord droids, all of them Aurebesh or Sabacc.' },
      { title: '60+', sub: 'Worlds in the atlas', desc: 'Every planet at the bottom of this page is drawn in CSS. No images.' },
    ] },

  { id: 'eras', kind: 'era', title: 'The Eras', note: 'BBY / ABY, before and after the Battle of Yavin',
    lede: 'Everything canon is filed into one of these. The whole Skywalker story is about fifty years wide; the galaxy around it runs for twenty-five thousand. Drag the rail sideways to travel down it.',
    items: [
      { when: '25,000 BBY', title: 'The Republic is founded', meta: 'Coruscant',
        desc: 'The Jedi Order and the Galactic Republic grow up together, and neither of them ever really works out how to be separate.' },
      { when: '382 – 82 BBY', title: 'The High Republic', meta: 'Starlight Beacon',
        desc: 'The Order at its height, expanding into the frontier, with the Nihil waiting in the Drift.' },
      { when: '32 – 19 BBY', title: 'The Fall of the Jedi', meta: 'Naboo → Order 66',
        desc: 'The prequels and the Clone Wars. A Republic votes itself into an Empire and applauds while it happens.' },
      { when: '19 – 5 BBY', title: 'Reign of the Empire', meta: 'Lothal · Ferrix',
        desc: 'Inquisitors hunt the survivors. Rebel cells form on a hundred worlds that never meet each other.' },
      { when: '5 BBY – 4 ABY', title: 'Age of Rebellion', meta: 'Yavin · Hoth · Endor',
        desc: 'Scarif, then Yavin, then fifteen years of it: two Death Stars and an Emperor, all of it started by stolen plans.' },
      { when: '4 – 28 ABY', title: 'The New Republic', meta: 'Nevarro · Mandalore',
        desc: 'A government that will not admit the war is not over, and a Mandalorian carrying a foundling through the middle of it.' },
      { when: '28 – 35 ABY', title: 'Rise of the First Order', meta: 'Jakku → Exegol',
        desc: 'Starkiller Base, Crait, Exegol, and the last of the Skywalkers deciding to be one on purpose.' },
    ] },

  { id: 'prequels', kind: 'films', title: 'The Prequels', note: '1999 – 2005 · the ones that are mine',
    lede: 'I never had to grow into these or defend them at a table. They were the first Star Wars I saw, and they are still the ones I put on: a Republic rotting from the inside, a war run by the man on both sides of it, and a Jedi Order too pleased with itself to notice either.',
    items: [
      { num: 'I', title: 'The Phantom Menace', sub: '1999', accent: '#f0c840', meta: 'Naboo · 32 BBY',
        desc: 'Podracing, a trade dispute that is actually a coup, and Duel of the Fates: still the best choreography and the best needle-drop in the saga.' },
      { num: 'II', title: 'Attack of the Clones', sub: '2002', accent: '#e08a3a', meta: 'Kamino · Geonosis · 22 BBY',
        desc: 'Obi-Wan works a murder case across half the galaxy and finds an army nobody ordered. The Republic marches out to Geonosis and calls it a rescue.' },
      { num: 'III', title: 'Revenge of the Sith', sub: '2005', accent: '#ff4b2b', meta: 'Coruscant · Mustafar · 19 BBY',
        desc: 'The one everything was built toward. Order 66, the opera house, and a friendship that ends on a lava bank. My favourite film of the eleven.' },
    ] },

  { id: 'originals', kind: 'films', title: 'The Originals', note: '1977 – 1983 · the ones that made the rest possible',
    lede: 'I came to these after the prequels, which spoils the one great reveal and sharpens everything else: you watch Luke walk toward a man you have already watched fall, and you know exactly what is waiting at the bottom of Cloud City.',
    items: [
      { num: 'IV', title: 'A New Hope', sub: '1977', accent: '#3f8fff', meta: 'Tatooine · Yavin · 0 BBY',
        desc: 'A farm boy, two droids and a trench run that rewrote what films could do. Everything made since is in some way a reply to it.' },
      { num: 'V', title: 'The Empire Strikes Back', sub: '1980', accent: '#9fc4e8', meta: 'Hoth · Dagobah · Bespin · 3 ABY',
        desc: 'Walkers on the ice, a swamp, a carbonite chamber, and the best twist ever committed to film. The darkest of them and the best made.' },
      { num: 'VI', title: 'Return of the Jedi', sub: '1983', accent: '#3fd07f', meta: 'Endor · 4 ABY',
        desc: 'The throne room. No fight won it: a son threw his lightsaber away and refused, and his father chose him over the Emperor.' },
    ] },

  { id: 'sequels', kind: 'films', title: 'The Sequels', note: '2015 – 2019 · the ones I saw on opening night',
    lede: 'The only trilogy I got to see in a cinema as it came out, three years apart, arguing about it the whole way home. Uneven, and I would not trade the experience of it for a tidier set of films.',
    items: [
      { num: 'VII', title: 'The Force Awakens', sub: '2015', accent: '#4fa8ff', meta: 'Jakku · Starkiller · 34 ABY',
        desc: 'Jakku, Rey, Finn, and the Falcon back in the air. It plays the old song note for note, and the old song still works.' },
      { num: 'VIII', title: 'The Last Jedi', sub: '2017', accent: '#e8261d', meta: 'Ahch-To · Crait · 34 ABY',
        desc: 'Ahch-To, the throne room fight, and red salt kicked up under white ground on Crait. The most argued-about film on the list and the best-looking one.' },
      { num: 'IX', title: 'The Rise of Skywalker', sub: '2019', accent: '#f0c840', meta: 'Exegol · Tatooine · 35 ABY',
        desc: 'Exegol, the end of the ninety-year Palpatine problem, and a yellow blade lit on Tatooine over two buried ones.' },
    ] },

  { id: 'saga', kind: 'tiles', compact: true, title: 'The Skywalker Saga', note: 'all nine, in episode order',
    lede: 'The nine numbered films in one place, in the order the numerals say rather than the order they came out. Each trilogy gets its own section above; this is the index.',
    items: [
      { title: 'I · The Phantom Menace', accent: '#f0c840', sub: '1999 · 32 BBY', desc: 'Podracing, Darth Maul, and Duel of the Fates.' },
      { title: 'II · Attack of the Clones', accent: '#e08a3a', sub: '2002 · 22 BBY', desc: 'Kamino, Geonosis, and the war that hands Palpatine his army.' },
      { title: 'III · Revenge of the Sith', accent: '#ff4b2b', sub: '2005 · 19 BBY', desc: 'Order 66 and Mustafar. My favourite of the eleven.' },
      { title: 'IV · A New Hope', accent: '#3f8fff', sub: '1977 · 0 BBY', desc: 'A farm boy, two droids and a trench run.' },
      { title: 'V · The Empire Strikes Back', accent: '#9fc4e8', sub: '1980 · 3 ABY', desc: 'Hoth, Dagobah, Bespin. The best made of them.' },
      { title: 'VI · Return of the Jedi', accent: '#3fd07f', sub: '1983 · 4 ABY', desc: 'The throne room, and a refusal rather than a victory.' },
      { title: 'VII · The Force Awakens', accent: '#4fa8ff', sub: '2015 · 34 ABY', desc: 'Jakku, Rey, Finn, and the Falcon back in the air.' },
      { title: 'VIII · The Last Jedi', accent: '#e8261d', sub: '2017 · 34 ABY', desc: 'Ahch-To, Crait, and the most argued-about one.' },
      { title: 'IX · The Rise of Skywalker', accent: '#f0c840', sub: '2019 · 35 ABY', desc: 'Exegol, and a yellow blade on Tatooine.' },
    ] },

  { id: 'beyond', kind: 'cards', title: 'The Spinoffs', note: 'everything outside the nine, and half of the best of it',
    items: [
      { title: 'Andor', sub: '2022 – 2025', tag: 'Series', desc: 'The best-written thing with the Star Wars logo on it. A revolution assembled out of paperwork, prisons and one funeral.', meta: '2 seasons · Ferrix' },
      { title: 'Rogue One', sub: '2016', tag: 'Film', desc: 'How the Death Star plans got to Leia. The Vader hallway is three minutes of pure dread.', meta: 'Scarif · 0 BBY' },
      { title: 'Rebels', sub: '2014 – 2018', tag: 'Animation', desc: 'The Ghost crew between the trilogies, and the World Between Worlds: the boldest idea in the canon.', meta: '4 seasons · Lothal' },
      { title: 'The Bad Batch', sub: '2021 – 2024', tag: 'Animation', desc: 'What happens to the clones after the war they were made for is over and the Empire has no use for them.', meta: '3 seasons · Kamino' },
      { title: 'The Mandalorian', sub: '2019 –', tag: 'Series', desc: 'A bounty hunter, a foundling, and the New Republic era finally getting a shape.', meta: '3 seasons · 9 ABY' },
      { title: 'Ahsoka', sub: '2023 –', tag: 'Series', desc: 'Rebels in live action, purrgil and all, and a trip past the edge of the galaxy.', meta: 'Peridea · 9 ABY' },
      { title: 'Jedi: Fallen Order & Survivor', sub: '2019 · 2023', tag: 'Games', desc: 'Cal Kestis, BD-1, and the best Star Wars combat ever shipped in a game.', meta: 'Koboh · Tanalorr' },
      { title: 'Battlefront II', sub: '2005 · 2017', tag: 'Games', desc: 'Galactic Conquest on the original, and the 501st Journal narration that half of us can still quote.', meta: 'The 501st' },
    ] },

  { id: 'clonewars', kind: 'rank', title: 'The Clone Wars', note: '2008 – 2020 · one arc per season, S1 to S7',
    lede: 'Seven seasons of a war we already knew the ending of, which is exactly why it works: every clone on screen is walking toward Order 66 and none of them know it. One arc from each season, in order, so you can watch the show grow up.',
    items: [
      { num: 'S1', title: 'Rookies', sub: 'E05', accent: '#3f7fe0',
        desc: 'Domino Squad on the Rishi moon. Hevy holds the detonator. The episode that made the clones people instead of set dressing.' },
      { num: 'S2', title: 'Landing at Point Rain', sub: 'E05', accent: '#e08a3a',
        desc: 'Geonosis again, this time as a proper beach landing. The most expensive-looking twenty-two minutes in the show.' },
      { num: 'S3', title: 'Mortis', sub: 'E15 – E17', accent: '#5fd07f',
        desc: 'The Father, the Son and the Daughter, and the strangest three episodes in the canon. Nothing else has ever been allowed to be this abstract.' },
      { num: 'S4', title: 'Umbara', sub: 'E07 – E10', accent: '#8f6fd0',
        desc: 'A Jedi general who is worse than the enemy, and clones ordered to shoot clones. The show stops asking whether the war is winnable and starts asking whether it is worth it.' },
      { num: 'S5', title: 'The Wrong Jedi', sub: 'E17 – E20', accent: '#f0a63c',
        desc: 'The Order hands Ahsoka to the courts to protect itself, and she walks down the temple steps and does not turn round. The clearest indictment of the Jedi in anything.' },
      { num: 'S6', title: 'The Lost One', sub: 'E01 – E04 · Fives', accent: '#e04a4a',
        desc: 'Fives finds the inhibitor chip, tells the truth, and is shot for it. The whole tragedy of the clones in four episodes, filed as a medical mystery.' },
      { num: 'S7', title: 'The Siege of Mandalore', sub: 'E09 – E12', accent: '#4fa8ff',
        desc: 'Ahsoka and Maul, and then Order 66 arrives from the wrong side of the window. Twelve years of setup paid off in four episodes, ending with a field of helmets and one buried lightsaber.' },
    ] },

  { id: 'legions', kind: 'tiles', title: 'The Legions', note: 'they painted their own armour',
    lede: 'The clones were issued identical plastoid and then, one unit at a time, made it theirs: colour, kill markings, names, jaig eyes. The paint is the whole argument the show is making.',
    items: [
      { title: '501st Legion', accent: '#3f7fe0', sub: 'Vader’s Fist', desc: 'Anakin and Rex. Torrent Company: Fives, Echo, Jesse, Hardcase, Kix.' },
      { title: '212th Attack Battalion', accent: '#f0a63c', sub: 'Ghost Company', desc: 'Obi-Wan and Cody. Waxer and Boil, and a Twi’lek kid on Ryloth called Numa.' },
      { title: '104th Battalion', accent: '#9aa8b4', sub: 'Wolfpack', desc: 'Plo Koon and Wolffe. The most quietly loyal unit in the war.' },
      { title: '327th Star Corps', accent: '#f0d23c', sub: 'Bly’s command', desc: 'Aayla Secura, and a Felucia sunrise that everyone remembers for the wrong reason.' },
      { title: '41st Elite Corps', accent: '#5fbf6a', sub: 'Green Company', desc: 'Gree, Luminara, and the Kashyyyk beachhead Yoda walks away from.' },
      { title: '187th Legion', accent: '#8f5fd0', sub: 'Windu’s command', desc: 'Purple, because of course it is. Half legend, half merchandise.' },
      { title: 'Coruscant Guard', accent: '#e04a4a', sub: 'Shock troopers', desc: 'Fox and the Guard, who never left the capital and carried out the worst orders in the war.' },
      { title: 'Clone Force 99', accent: '#c05a2a', sub: 'The Bad Batch', desc: 'Hunter, Wrecker, Tech, Crosshair and Echo. Defective, which is why they survived the chip.' },
    ] },

  { id: 'order66', kind: 'timeline', title: 'Order 66', note: '19 BBY · one afternoon, galaxy-wide',
    lede: 'Not a betrayal, in the end: a command executed by soldiers with a chip in their heads that had been there since Kamino. That is what makes it unbearable rather than shocking.',
    items: [
      { when: 'Contingency Order 66', accent: '#e04a4a', title: '“Execute Order 66.”',
        desc: 'Three words on a comm, sent at the same moment to every clone commander in the field. No argument, no pause, no orders questioned.' },
      { when: 'Utapau', accent: '#e04a4a', title: 'Cody hands the lightsaber back, then fires',
        desc: 'He returns Obi-Wan’s blade to him with a nod, takes the transmission ninety seconds later, and orders the cannons turned on the cliff.' },
      { when: 'Kashyyyk', accent: '#5fbf6a', title: 'Yoda hears it a half-second early',
        desc: 'Two guards raise their rifles behind him. He is nine hundred years old and he still only just makes it.' },
      { when: 'The Jedi Temple', accent: '#4fa8ff', title: 'The 501st walks up the steps',
        desc: 'Anakin at the front, and the legion that trusted him more than anyone follows him inside.' },
      { when: 'Mandalore', accent: '#4fa8ff', title: 'Ahsoka and Rex fight their way off a falling ship',
        desc: 'She pulls his chip out and he comes back to himself. Then she buries her lightsaber with the clones she could not save.' },
      { when: 'Mustafar', accent: '#ff4b2b', title: 'Anakin becomes the thing he was built to stop',
        desc: 'A duel on a lava bank between two people who love each other, which is why it is the only one that ever really hurts.' },
    ] },

  { id: 'kyber', kind: 'sabers', title: 'Kyber', note: 'the crystal picks the Jedi, not the other way round',
    lede: 'A kyber crystal is colourless until it is bonded, and then it stays that colour for good. The blade is a record of who bonded it and how. Hover a hilt to ignite it, or click to leave it burning.',
    items: [
      { title: 'Blue', accent: '#3f8fff', sub: 'Guardian', desc: 'The Jedi who leads with the blade: Obi-Wan, Anakin, Rex’s general on every front of the war.' },
      { title: 'Green', accent: '#3fd07f', sub: 'Consular', desc: 'The Jedi who leads with the Force: Yoda, Qui-Gon, and Luke walking onto the skiff at Jabba’s.' },
      { title: 'Purple', accent: '#a06fe0', sub: 'Vaapad', desc: 'Mace Windu, and a form that works by walking right up to the edge of the dark and staying there.' },
      { title: 'Yellow', accent: '#f0c840', sub: 'Sentinel', desc: 'Temple Guards and their pikes, and Rey’s own blade on Tatooine at the very end.' },
      { title: 'Orange', accent: '#e08a3a', sub: 'Rare', desc: 'A handful of Jedi and Inquisitors. Mostly a games-and-comics colour, and better for it.' },
      { title: 'Red', accent: '#e83a2a', sub: 'Bled', desc: 'A Sith takes a crystal and pours rage into it until it bleeds. Not grown, stolen.' },
      { title: 'White', accent: '#e8eef4', sub: 'Purified', desc: 'Ahsoka healed two bled crystals after she left the Order. The colour of a blade that answers to nobody.' },
      { title: 'Darksaber', accent: '#aab6c6', sub: 'Unique', dark: true, desc: 'Forged by Tarre Vizsla, the first Mandalorian Jedi. A black blade you only see by the white edge burning off it, and whoever holds it rules Mandalore, if they won it properly.' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    lede: 'Every quote below is graded to whoever said it: their blade colour if they carried one, and their faction’s if they never did. Senate gold for Padmé, 501st blue for the clones, beskar for Mandalore, Alliance orange for the Rebellion, Sith red for Vader.',
    items: [
      { title: 'Do. Or do not. There is no try.', sub: 'Yoda · The Empire Strikes Back · green blade', accent: '#3fd07f' },
      { title: 'Hello there.', sub: 'Obi-Wan Kenobi · twice, twenty-six years apart · blue blade', accent: '#3f8fff' },
      { title: 'In my experience, there is no such thing as luck.', sub: 'Obi-Wan Kenobi · A New Hope · blue blade', accent: '#3f8fff' },
      { title: 'So this is how liberty dies. With thunderous applause.', sub: 'Padmé Amidala · Revenge of the Sith · the Senate', accent: '#d8b45f' },
      { title: 'Good soldiers follow orders.', sub: 'The Clone Wars · the 501st, and it is not a compliment', accent: '#9fc4e8' },
      { title: 'I find your lack of faith disturbing.', sub: 'Darth Vader · A New Hope · red blade', accent: '#e83a2a' },
      { title: 'Be careful not to choke on your aspirations, Director.', sub: 'Darth Vader · Rogue One · red blade', accent: '#e83a2a' },
      { title: 'You underestimate the power of the dark side.', sub: 'Darth Vader · Return of the Jedi · red blade', accent: '#e83a2a' },
      { title: 'I am one with the Force. The Force is with me.', sub: 'Chirrut Îmwe · Rogue One · the Rebellion', accent: '#e0642a' },
      { title: 'I have friends everywhere.', sub: 'Cassian Andor · Andor · the Rebellion', accent: '#e0642a' },
      { title: 'One way out.', sub: 'Cassian Andor · Narkina 5 · the Rebellion', accent: '#e0642a' },
      { title: 'This is the way.', sub: 'The Mandalorian · beskar', accent: '#9aa8b4' },
    ] },


  // mount:'end' → renders into #fanBodyEnd, below the hand-written planet atlas
  { id: 'parks', kind: 'cards', title: 'Where It Exists', note: 'Batuu, and the places you can stand in it',
    lede: 'Galaxy’s Edge is Black Spire Outpost on Batuu, set between The Last Jedi and The Rise of Skywalker so it belongs to no film in particular. It is the most expensive land Disney has ever built, and the detail is absurd: the bins are in-universe, the signage is all Aurebesh, and nothing anywhere says “Star Wars” on it.',
    items: [
      { title: 'Galaxy’s Edge · Disneyland', sub: 'Anaheim, California', tag: '2019', accent: '#ffe81f',
        desc: 'Opened 31 May 2019, and the closest one to me. Rise of the Resistance is the best theme-park attraction ever built: a full-size hangar, a Star Destroyer corridor, an AT-AT bay and a trackless ride system pretending to be a prison break.',
        meta: 'Rise of the Resistance · Smugglers Run' },
      { title: 'Galaxy’s Edge · Hollywood Studios', sub: 'Walt Disney World, Florida', tag: '2019', accent: '#ffe81f',
        desc: 'Opened three months after Anaheim and slightly larger. Same two rides, same Droid Depot and Savi’s Workshop, same Black Spire Outpost.',
        meta: 'The bigger of the two' },
      { title: 'Savi’s Workshop', sub: 'Both parks', tag: 'Build', accent: '#3f8fff',
        desc: 'You build a lightsaber. An actual one, from parts, in a room with a ceremony and no photographs, and you pick the kyber colour. It costs a fortune and everybody who does it says it was worth it.',
        meta: 'Handbuilt Lightsabers' },
      { title: 'Droid Depot', sub: 'Both parks', tag: 'Build', accent: '#e08a3a',
        desc: 'Build an astromech off a conveyor of parts. It moves, it beeps, and it reacts to things elsewhere in the land.',
        meta: 'R-series or BB-series' },
      { title: 'Star Tours', sub: 'Four parks worldwide', tag: '1987', accent: '#9fc4e8',
        desc: 'The original, and it long predates Galaxy’s Edge. The 2011 rebuild randomises the destinations, so no two flights are the same. Anaheim, Florida, Tokyo and Paris.',
        meta: 'The Adventures Continue' },
      { title: 'Galactic Starcruiser', sub: 'Walt Disney World', tag: 'Closed', accent: '#8f8f9f',
        desc: 'The Halcyon: a two-night, fully in-character hotel where the windows were screens and the plot happened around you. It opened in March 2022, cost about six thousand dollars for a family, and closed eighteen months later. Extraordinary, and doomed.',
        meta: '2022 – 2023' },
    ] },

  { id: 'played', kind: 'gallery', title: 'Every One of Them, Finished', note: 'my own screenshots · 100%',
    lede: 'The other way I have spent time in this galaxy. Thirty-six Star Wars games in the library and a wall of hundred-percents, including five LEGO games taken all the way to the last gold brick.',
    items: [
      { title: 'The Star Wars shelf', src: '/assets/img/franchises/star-wars-games.jpg',
        alt: 'A row of Star Wars game covers, each marked 100% Complete',
        desc: 'LEGO The Force Awakens, LEGO The Skywalker Saga, Droid Repair Bay, Jedi: Fallen Order, Jedi: Survivor and Outlaws, all at a hundred percent.',
        meta: '36 in the collection' },
      { title: 'The LEGO Star Wars run', src: '/assets/img/franchises/star-wars-lego-100.jpg',
        alt: 'Completion screens from five LEGO Star Wars games, all at 100 percent',
        desc: 'The Complete Saga at 26 hours 40. The Clone Wars at 22 hours 05. The Force Awakens with every planet on the galaxy map at 100. The Skywalker Saga with all 1,200 Kyber bricks, 380 characters and 135 ships.',
        meta: 'Five games · 100.0% each' },
    ] },

  { id: 'links', kind: 'links', mount: 'end', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'StarWars.com', href: 'https://www.starwars.com/',
        desc: 'The official site: news, the databank, and the release order for everything canon.' },
      { title: 'Wookieepedia', href: 'https://starwars.fandom.com/wiki/Main_Page',
        desc: 'The deepest fan wiki on the internet, and the one I have lost whole evenings to.' },
      { title: 'Canon Timeline', href: 'https://starwarscanontimeline.com/',
        desc: 'Every film, show, book and comic laid out on one BBY/ABY axis. The best way to see the shape of it.' },
      { title: 'Filming Locations', href: 'https://www.google.com/maps/d/u/0/viewer?mid=1rq_owJmVi-DRImH4x0IB4lj_EIRXvgw&shorturl=1',
        desc: 'A Google map of where they actually shot it, Skellig Michael to Tozeur.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "Build Your Lightsaber",
  intro: "Kyber crystals are colourless until a Jedi meditates on one and it responds to them. The colour is not chosen; it is what the crystal decides you are. Pick one and see what it means.",
  prompt: "Take a crystal and hold it.",
  said: "The crystal settles. %.",
  items: [
    { n: "Blue", s: "Jedi Guardian", c: "#4fa8f0", d: "M12 2v14M12 16v6M9 16h6", note: "The most common blade, and the one carried by Jedi who lean on the lightsaber form of the Order: Anakin, Obi-Wan, Luke on Hoth. Straightforward, and the colour most people picture." },
    { n: "Green", s: "Jedi Consular", c: "#4fd07f", d: "M12 2v14M12 16v6M9 16h6", note: "The scholars and negotiators. Luke builds a green one for the sail barge because the blue one went down the reactor shaft with his hand, and it is the better-looking blade." },
    { n: "Purple", s: "Mace Windu", c: "#a86ff0", d: "M12 2v14M12 16v6M9 16h6", note: "Exists because Samuel L. Jackson asked George Lucas for it so he could find himself in the crowd scenes. It stayed, and the fandom built a whole philosophy on top of it afterwards." },
    { n: "Yellow", s: "Jedi Sentinel", c: "#f0d040", d: "M12 2v14M12 16v6M9 16h6", note: "The Temple Guards, and Rey at the very end of the sequels: a blade built out of a staff, in the one colour nobody in the family had used." },
    { n: "Red", s: "Sith", c: "#e0342a", d: "M12 2v14M12 16v6M9 16h6", note: "Not a crystal that chose you. A Sith takes a kyber crystal and forces it (bleeds it) until it turns red. Every red blade in the galaxy is a crystal that was made to scream." },
    { n: "Darksaber", s: "Mandalore", c: "#8f98a8", d: "M12 3l3 4-3 11-3-11z M12 18v3", note: "One of a kind, black with a white edge, forged by the only Mandalorian ever admitted to the Jedi Order. Whoever holds it holds a claim to Mandalore, which is why it keeps changing hands." },
  ],
};
