/* fan-sw.js: content for /worlds/star-wars/ (the fandom page, no apps).

   Rendered by fanpage.js. Dates use the in-universe BBY/ABY scale, counted
   from the Battle of Yavin.

   The order is deliberate. The four screen sections run together, prequels
   first, because that is the order they matter to me rather than the order
   they were released: Prequels → Originals → Sequels → Spinoffs. Then the
   Clone Wars block (arcs, legions, Order 66), then kyber, the lines, and the
   music (my playlist, by trilogy and show). */
window.FAN_PAGE = {
  when: { at: 'Around 2012, age six', note: 'As Cassian says: I have been in this fight since I was six years old. Lightsabers and the Force were the first things that ever made me want a whole universe to be real.' },
  sections: [
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

  { id: 'prequels', kind: 'films', title: 'The Prequels', note: '1999 – 2005 · 32 – 19 BBY · the ones that are mine',
    lede: 'I never had to grow into these or defend them at a table. They were the first Star Wars I saw, and they are still the ones I put on: a Republic rotting from the inside, a war run by the man on both sides of it, and a Jedi Order too pleased with itself to notice either.',
    items: [
      { num: 'I', title: 'The Phantom Menace', sub: 'May 1999', accent: '#f0c840', meta: 'Naboo · 32 BBY',
        desc: 'Podracing, a trade dispute that is actually a coup, and Duel of the Fates: still the best choreography and the best needle-drop in the saga.' },
      { num: 'II', title: 'Attack of the Clones', sub: 'May 2002', accent: '#e08a3a', meta: 'Kamino · Geonosis · 22 BBY',
        desc: 'Obi-Wan works a murder case across half the galaxy and finds an army nobody ordered. The Republic marches out to Geonosis and calls it a rescue.' },
      { num: 'III', title: 'Revenge of the Sith', sub: 'May 2005', accent: '#ff4b2b', meta: 'Coruscant · Mustafar · 19 BBY',
        desc: 'The one everything was built toward. Order 66, the opera house, and a friendship that ends on a lava bank. My favourite film of the eleven.' },
    ] },

  { id: 'originals', kind: 'films', title: 'The Originals', note: '1977 – 1983 · 0 BBY – 4 ABY · the ones that made the rest possible',
    lede: 'I came to these after the prequels, which spoils the one great reveal and sharpens everything else: you watch Luke walk toward a man you have already watched fall, and you know exactly what is waiting at the bottom of Cloud City.',
    items: [
      { num: 'IV', title: 'A New Hope', sub: 'May 1977', accent: '#3f8fff', meta: 'Tatooine · Yavin · 0 BBY',
        desc: 'A farm boy, two droids and a trench run that rewrote what films could do. Everything made since is in some way a reply to it.' },
      { num: 'V', title: 'The Empire Strikes Back', sub: 'May 1980', accent: '#9fc4e8', meta: 'Hoth · Dagobah · Bespin · 3 ABY',
        desc: 'Walkers on the ice, a swamp, a carbonite chamber, and the best twist ever committed to film. The darkest of them and the best made.' },
      { num: 'VI', title: 'Return of the Jedi', sub: 'May 1983', accent: '#3fd07f', meta: 'Endor · 4 ABY',
        desc: 'The throne room. No fight won it: a son threw his lightsaber away and refused, and his father chose him over the Emperor.' },
    ] },

  { id: 'sequels', kind: 'films', title: 'The Sequels', note: '2015 – 2019 · 34 – 35 ABY · the ones I saw on opening night',
    lede: 'The only trilogy I got to see in a cinema as it came out, three years apart, arguing about it the whole way home. Uneven, and I would not trade the experience of it for a tidier set of films.',
    items: [
      { num: 'VII', title: 'The Force Awakens', sub: 'December 2015', accent: '#4fa8ff', meta: 'Jakku · Starkiller · 34 ABY',
        desc: 'Jakku, Rey, Finn, and the Falcon back in the air. It plays the old song note for note, and the old song still works.' },
      { num: 'VIII', title: 'The Last Jedi', sub: 'December 2017', accent: '#e8261d', meta: 'Ahch-To · Crait · 34 ABY',
        desc: 'Ahch-To, the throne room fight, and red salt kicked up under white ground on Crait. The most argued-about film on the list and the best-looking one.' },
      { num: 'IX', title: 'The Rise of Skywalker', sub: 'December 2019', accent: '#f0c840', meta: 'Exegol · Tatooine · 35 ABY',
        desc: 'Exegol, the end of the ninety-year Palpatine problem, and a yellow blade lit on Tatooine over two buried ones.' },
    ] },

  { id: 'saga', kind: 'tiles', compact: true, title: 'The Skywalker Saga', note: 'all nine, in episode order',
    lede: 'The nine numbered films in one place, in the order the numerals say rather than the order they came out. Each trilogy gets its own section above; this is the index.',
    items: [
      { title: 'I · The Phantom Menace', accent: '#f0c840', sub: 'May 1999 · 32 BBY', desc: 'Podracing, Darth Maul, and Duel of the Fates.' },
      { title: 'II · Attack of the Clones', accent: '#e08a3a', sub: 'May 2002 · 22 BBY', desc: 'Kamino, Geonosis, and the war that hands Palpatine his army.' },
      { title: 'III · Revenge of the Sith', accent: '#ff4b2b', sub: 'May 2005 · 19 BBY', desc: 'Order 66 and Mustafar. My favourite of the eleven.' },
      { title: 'IV · A New Hope', accent: '#3f8fff', sub: 'May 1977 · 0 BBY', desc: 'A farm boy, two droids and a trench run.' },
      { title: 'V · The Empire Strikes Back', accent: '#9fc4e8', sub: 'May 1980 · 3 ABY', desc: 'Hoth, Dagobah, Bespin. The best made of them.' },
      { title: 'VI · Return of the Jedi', accent: '#3fd07f', sub: 'May 1983 · 4 ABY', desc: 'The throne room, and a refusal rather than a victory.' },
      { title: 'VII · The Force Awakens', accent: '#4fa8ff', sub: 'December 2015 · 34 ABY', desc: 'Jakku, Rey, Finn, and the Falcon back in the air.' },
      { title: 'VIII · The Last Jedi', accent: '#e8261d', sub: 'December 2017 · 34 ABY', desc: 'Ahch-To, Crait, and the most argued-about one.' },
      { title: 'IX · The Rise of Skywalker', accent: '#f0c840', sub: 'December 2019 · 35 ABY', desc: 'Exegol, and a yellow blade on Tatooine.' },
    ] },

  { id: 'beyond', kind: 'cards', title: 'The Spinoffs', note: 'everything outside the nine, and half of the best of it',
    items: [
      { title: 'Andor', sub: 'September 2022 – May 2025', tag: 'Series', desc: 'The best-written thing with the Star Wars logo on it. A revolution assembled out of paperwork, prisons and one funeral.', meta: '2 seasons · Ferrix · 5 BBY – 0 BBY' },
      { title: 'Rogue One', sub: 'December 2016', tag: 'Film', desc: 'How the Death Star plans got to Leia. The Vader hallway is three minutes of pure dread.', meta: 'Scarif · 0 BBY, days before A New Hope' },
      { title: 'Rebels', sub: 'October 2014 – March 2018', tag: 'Animation', desc: 'The Ghost crew between the trilogies, and the World Between Worlds: the boldest idea in the canon.', meta: '4 seasons · Lothal · 5 BBY – 0 BBY, epilogue 5 ABY' },
      { title: 'The Bad Batch', sub: 'May 2021 – May 2024', tag: 'Animation', desc: 'What happens to the clones after the war they were made for is over and the Empire has no use for them.', meta: '3 seasons · Kamino · 19 – 18 BBY' },
      { title: 'The Mandalorian', sub: 'November 2019 –', tag: 'Series', desc: 'A bounty hunter, a foundling, and the New Republic era finally getting a shape.', meta: '3 seasons · 9 ABY' },
      { title: 'Ahsoka', sub: 'August 2023 –', tag: 'Series', desc: 'Rebels in live action, purrgil and all, and a trip past the edge of the galaxy.', meta: 'Peridea · 9 ABY' },
      { title: 'Jedi: Fallen Order & Survivor', sub: '2019 · 2023', tag: 'Games', desc: 'Cal Kestis, BD-1, and the best Star Wars combat ever shipped in a game.', meta: 'Koboh · Tanalorr' },
      { title: 'Battlefront II', sub: '2005 · 2017', tag: 'Games', desc: 'Galactic Conquest on the original, and the 501st Journal narration that half of us can still quote.', meta: 'The 501st' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the films, the series, the games',
    lede: 'Twelve films, a television side that is now longer than the film side, and a games shelf that goes back to 1982. The marked games are the ones I have finished, listed again at the bottom of this page with the dates.',
    items: [
      { title: 'The Films', sub: '1977 – now', unit: 'film',
        desc: 'Nine numbered, two standalone, one animated, and the next one shooting.',
        rows: [
          { n: 'A New Hope', y: '1977' },
          { n: 'The Empire Strikes Back', y: '1980' },
          { n: 'Return of the Jedi', y: '1983' },
          { n: 'The Phantom Menace', y: '1999' },
          { n: 'Attack of the Clones', y: '2002' },
          { n: 'Revenge of the Sith', y: '2005', big: true },
          { n: 'The Clone Wars', y: '2008' },
          { n: 'The Force Awakens', y: '2015' },
          { n: 'Rogue One', y: '2016' },
          { n: 'The Last Jedi', y: '2017' },
          { n: 'Solo', y: '2018' },
          { n: 'The Rise of Skywalker', y: '2019' },
          { n: 'The Mandalorian and Grogu', y: '2026' },
        ] },
      { title: 'The Series', sub: '2008 – now', unit: 'series',
        desc: 'The Clone Wars is the best stretch of Star Wars there is, and Andor is the best-made.',
        rows: [
          { n: 'The Clone Wars', y: '2008', big: true },
          { n: 'Rebels', y: '2014' },
          { n: 'Resistance', y: '2018' },
          { n: 'The Mandalorian', y: '2019' },
          { n: 'The Bad Batch', y: '2021' },
          { n: 'Visions', y: '2021' },
          { n: 'The Book of Boba Fett', y: '2021' },
          { n: 'Obi-Wan Kenobi', y: '2022' },
          { n: 'Andor', y: '2022', big: true },
          { n: 'Tales of the Jedi', y: '2022' },
          { n: 'Ahsoka', y: '2023' },
          { n: 'The Acolyte', y: '2024' },
          { n: 'Skeleton Crew', y: '2024' },
        ] },
      { title: 'The Games', sub: '1993 – now', unit: 'game',
        desc: 'The marked ones are mine, at a hundred percent, with the finish dates further down.',
        rows: [
          { n: 'X-Wing', y: '1993' },
          { n: 'Dark Forces', y: '1995' },
          { n: 'Rogue Squadron', y: '1998' },
          { n: 'Knights of the Old Republic', y: '2003' },
          { n: 'Battlefront II', y: '2005' },
          { n: 'The Force Unleashed', y: '2008' },
          { n: 'LEGO Star Wars: The Complete Saga', y: '2007', big: true },
          { n: 'LEGO Star Wars III: The Clone Wars', y: '2011', big: true },
          { n: 'The Old Republic', y: '2011' },
          { n: 'LEGO Star Wars: The Force Awakens', y: '2016', big: true },
          { n: 'Battlefront II', y: '2017', big: true },
          { n: 'Jedi: Fallen Order', y: '2019', big: true },
          { n: 'Squadrons', y: '2020' },
          { n: 'Droid Repair Bay', y: '2019', big: true },
          { n: 'LEGO Star Wars: The Skywalker Saga', y: '2022', big: true },
          { n: 'Jedi: Survivor', y: '2023', big: true },
          { n: 'Outlaws', y: '2024', big: true },
        ] },
    ] },


  { id: 'clonewars', kind: 'rank', title: 'The Clone Wars', note: '2008 – 2020 · 22 – 19 BBY · one arc per season, S1 to S7',
    lede: 'Seven seasons of a war we already knew the ending of, which is exactly why it works: every clone on screen is walking toward Order 66 and none of them know it. One arc from each season, in order, so you can watch the show grow up.',
    items: [
      { num: 'S1', title: 'Rookies', sub: 'E05', accent: '#3f7fe0', meta: 'Aired November 2008 · 22 BBY',
        desc: 'Domino Squad on the Rishi moon. Hevy holds the detonator. The episode that made the clones people instead of set dressing.' },
      { num: 'S2', title: 'Landing at Point Rain', sub: 'E05', accent: '#e08a3a', meta: 'Aired October 2009 · 21 BBY',
        desc: 'Geonosis again, this time as a proper beach landing. The most expensive-looking twenty-two minutes in the show.' },
      { num: 'S3', title: 'Mortis', sub: 'E15 – E17', accent: '#5fd07f', meta: 'Aired January 2011 · 21 BBY',
        desc: 'The Father, the Son and the Daughter, and the strangest three episodes in the canon. Nothing else has ever been allowed to be this abstract.' },
      { num: 'S4', title: 'Umbara', sub: 'E07 – E10', accent: '#8f6fd0', meta: 'Aired October 2011 · 20 BBY',
        desc: 'A Jedi general who is worse than the enemy, and clones ordered to shoot clones. The show stops asking whether the war is winnable and starts asking whether it is worth it.' },
      { num: 'S5', title: 'The Wrong Jedi', sub: 'E17 – E20', accent: '#f0a63c', meta: 'Aired March 2013 · 20 BBY',
        desc: 'The Order hands Ahsoka to the courts to protect itself, and she walks down the temple steps and does not turn round. The clearest indictment of the Jedi in anything.' },
      { num: 'S6', title: 'The Lost One', sub: 'E01 – E04 · Fives', accent: '#e04a4a', meta: 'Aired March 2014 · 20 BBY',
        desc: 'Fives finds the inhibitor chip, tells the truth, and is shot for it. The whole tragedy of the clones in four episodes, filed as a medical mystery.' },
      { num: 'S7', title: 'The Siege of Mandalore', sub: 'E09 – E12', accent: '#4fa8ff', meta: 'Aired April – May 2020 · 19 BBY, during Revenge of the Sith',
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
    lede: 'The other way I have spent time in this galaxy. Thirty-six Star Wars games in the library and a wall of hundred-percents, including four LEGO games taken all the way to the last gold brick. Every one of the nine is underneath with its own receipts: the library banner, the save slot, the achievement screen.',
    /* both frames are captioned once, in fan-shots.js: the shelf is on
       /gaming/ as well, and the LEGO run on the LEGO page */
    pick: ['sw-shelf', 'lego-star-wars-hundred'] },

  /* one tile per finished game, in the order I finished them, with the date
     (`finished`, see fanpage.js), the play time off its own library banner,
     and the screenshots that prove it: `shot` is the banner and `shots` the
     rest of that game's set, opening together in the lightbox, the same shape
     the LEGO catalogue and the Wizarding World page use. A `shots` name with
     no slash resolves beside the banner, so each game names its folder once.
     Raw captures in _originals/franchises/, and every frame is on /gaming/
     with the date it was taken. The LEGO four also sit in the catalogue on
     the LEGO page, where their hours are set against a projected time. */
  { id: 'finished', kind: 'tiles', compact: true, cols: 2, views: true, tally: 'at 100%',
    title: 'When I Finished Them', note: 'to a hundred percent',
    items: [
      { title: 'LEGO Star Wars: The Skywalker Saga', accent: '#ffd21f', sub: '2022 · Steam', done: true, hours: '79.4', finished: '2022-05-06',
        desc: 'All nine films rebuilt from scratch, and nearly eighty hours: more than twice any other LEGO game I have finished.',
        shot: '/assets/img/franchises/lego/skywalker-saga/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Skywalker Saga, showing my play time' },
      { title: 'LEGO Star Wars: The Complete Saga', accent: '#ffd21f', sub: '2007 · Steam', done: true, hours: '35.2', finished: '2022-07-10',
        desc: 'All six films in one, and the definitive version of the old formula.',
        shot: '/assets/img/franchises/lego/complete-saga/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'stud-fountain'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Complete Saga, showing my play time' },
      { title: 'LEGO Star Wars III: The Clone Wars', accent: '#ffd21f', sub: '2011 · Steam', done: true, hours: '24.1', finished: '2022-07-13',
        desc: 'Ground battles with commandable troops. Ambitious, and messy, and the better game for it.',
        shot: '/assets/img/franchises/lego/clone-wars/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters'],
        shotAlt: 'Steam library banner for LEGO Star Wars III: The Clone Wars, showing my play time' },
      { title: 'LEGO Star Wars: The Force Awakens', accent: '#ffd21f', sub: '2016 · Steam', done: true, hours: '24.6', finished: '2022-07-17',
        desc: 'Multi-build, and blaster battles with cover.',
        shot: '/assets/img/franchises/lego/force-awakens/banner.jpg',
        shots: ['start-screen', 'pause-screen', 'load-game', 'characters', 'galaxy-map'],
        shotAlt: 'Steam library banner for LEGO Star Wars: The Force Awakens, showing my play time' },
      { title: 'Jedi: Survivor', accent: '#4fa8ff', sub: '2023', done: true, hours: '50.8', finished: '2023-07-16',
        desc: 'The save slot is the receipt: Koboh, Pyloon’s Saloon, journey complete at 100% on 7/16/23 after 41.7 hours, with a New Journey+ slot started the same evening. Every faction at a hundred percent in the tactical guide, Koboh and Coruscant fully explored on the galaxy map, and 53 of 53 achievements. 144 sessions of it took 38% of my 2023, more than any other game in four years of Replays.',
        shot: '/assets/img/franchises/star-wars/survivor/banner.jpg',
        shots: ['start-screen', 'load-game', 'achievements', 'galaxy-map', 'tactical-guide'],
        shotAlt: 'Steam library banner for STAR WARS Jedi: Survivor, showing 50.8 hours and 53 of 53 achievements' },
      { title: 'Jedi: Fallen Order', accent: '#4fa8ff', sub: '2019', done: true, hours: '17.7', finished: '2024-03-22',
        desc: 'Finished three times: first on Dec 12 2019, the week it came out; again on Apr 30 2022, which is the save that reads 100% and Journey Complete; and once more straight after Survivor, on Mar 22 2024, the run that took the last of the 39 achievements. The 17.7 hours is only what Steam saw: the EA app has 214 hours and 21 minutes on the same game.',
        shot: '/assets/img/franchises/star-wars/fallen-order/banner.jpg',
        shots: ['start-screen', 'load-game', 'achievements', 'tactical-guide', 'play-time'],
        shotAlt: 'Steam library banner for STAR WARS Jedi: Fallen Order, showing 39 of 39 achievements' },
      { title: 'Droid Repair Bay', accent: '#9fc4e8', sub: '2017 · VR', done: true, hours: '3.8', finished: '2024-09-27',
        desc: 'A free VR short where you are the mechanic: 3.8 hours, and the only game on this list that needs a headset.',
        shot: '/assets/img/franchises/star-wars/droid-repair-bay/banner.jpg',
        shotAlt: 'Steam library banner for Star Wars: Droid Repair Bay, marked 100% and VR required' },
      { title: 'Star Wars Outlaws', accent: '#e0a020', sub: '2024', done: true, hours: '53.4', finished: '2024-12-03',
        desc: 'Finished at 53 of 53, which is what the Steam page here reads, and then the list itself grew: the banner says 59 of 59, six more earned once the DLC added them, the last being Stranger Tides for escaping the Khepi tomb.',
        shot: '/assets/img/franchises/star-wars/outlaws/banner.jpg',
        shots: ['achievements', 'all-achievements'],
        shotAlt: 'Steam library banner for Star Wars Outlaws, showing 53.4 hours and 59 of 59 achievements' },
      { title: 'Battlefront II', accent: '#9fc4e8', sub: '2017', done: true, hours: '27.3', finished: '2025-03-11',
        desc: 'Iden Versio’s campaign finished at 11:37 PM on Mar 10 2025 and the last achievements the next day, which the in-game feed dates itself: March 10, then March 11. 43 of 43, and 83 sessions of it took 23% of my 2025.',
        shot: '/assets/img/franchises/star-wars/battlefront-2/banner.jpg',
        shots: ['campaign-complete', 'achievements', 'milestones'],
        shotAlt: 'Steam library banner for STAR WARS Battlefront II: Celebration Edition, showing 27.3 hours and 43 of 43 achievements' },
    ] },

  /* ── the two Minecraft servers ──
     Imagine Fun's Star Wars half in three rooms, then the Star Wars MC server.
     Every frame is captioned once, in fan-shots.js; the Minecraft page picks a
     few of the same rows. */
  { id: 'galaxys-edge', set: 'galaxys-edge' },
  { id: 'may-the-fourth', set: 'may-the-fourth' },
  { id: 'trivia', set: 'star-wars-trivia' },
  { id: 'swmc', set: 'star-wars-mc' },

  /* ── the music ──
     My own playlist: forty-seven tracks, named as the albums name them rather
     than as the uploads do, and grouped by trilogy, film and show. `series` is
     the group, `when` is the in-universe year of the film or episode the
     track scores (BBY negative, ABY positive, as the eras rail counts), `year`
     is when it came out, `secs` is how long it runs, and the link is the
     album's own upload on YouTube (the composer's Topic channel, or
     DisneyMusicVEVO) wherever one exists. Written earliest-first, hence
     `authored: 'asc'` on the sort.

     Four have no album upload and say so on the tile. The march on the Jedi
     Temple was never released at all, so it has no official name and the copy
     is Pianistec's arrangement; the Force theme has no track of its own, so
     the link is Jorah the Andal's suite of it; the 1997 Special Edition cut of
     the Dune Sea cue only exists on YouTube as a fan upload titled Tatooine
     Theme; and March of the First Order has no official upload, so its link
     is a mirror of the album audio. */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'fifty-five tracks · by trilogy, film and show',
    lede: 'My own playlist, plus one that should be on it: every Star Wars theme I keep coming back to, with the names the albums give them rather than the ones YouTube does, and a link to hear each one. Grouped by trilogy, film and show, in the order the galaxy’s own calendar puts them; sort it by when they came out or by how long they run, or switch the grouping off and read it as one list. John Williams unless it says otherwise. The links are the albums’ own uploads wherever there is one; the four that are not say so.',
    groupable: { key: 'series', label: 'Group', on: 'By trilogy, film and show', open: 'on' },
    sortable: { label: 'Sort', authored: 'asc', by: [
      { key: 'when', label: 'Timeline', asc: 'Earliest', desc: 'Latest' },
      { key: 'year', label: 'Released', asc: 'Oldest',   desc: 'Newest' },
      { key: 'secs', label: 'Length',   asc: 'Shortest', desc: 'Longest' },
    ] },
    items: [
      // The Prequels
      { title: 'Duel of the Fates', series: 'The Prequels', accent: '#f0c840', when: -32, year: 1999, secs: 255, sub: 'The Phantom Menace · 1999 · 4:15',
        desc: 'Maul against Qui-Gon and Obi-Wan, with a choir singing Sanskrit taken from a Welsh poem. Still the best needle-drop in the saga.',
        href: 'https://www.youtube.com/watch?v=D_2bluVPsb0', link: 'Listen' },
      { title: 'Anakin\'s Theme', series: 'The Prequels', accent: '#f0c840', when: -32, year: 1999, secs: 188, sub: 'The Phantom Menace · 1999 · 3:08',
        desc: 'Gentle, and with the first bars of the Imperial March hidden inside it, which is the whole point.',
        href: 'https://www.youtube.com/watch?v=WUC7MgkOgKA', link: 'Listen' },
      { title: 'The Arrival at Tatooine and the Flag Parade', series: 'The Prequels', accent: '#f0c840', when: -32, year: 1999, secs: 244, sub: 'The Phantom Menace · 1999 · 4:04',
        desc: 'The Boonta Eve podrace, the flags going up. The parade is the back half of the track and the part that lives on loop.',
        href: 'https://www.youtube.com/watch?v=inyJGAXkbEg', link: 'Listen' },
      { title: 'The Phantom Menace End Credits', series: 'The Prequels', accent: '#f0c840', when: -32, year: 1999, sub: 'The Phantom Menace · 1999' },
      { title: 'Across the Stars', series: 'The Prequels', accent: '#e08a3a', when: -22, year: 2002, secs: 334, sub: 'Attack of the Clones · 2002 · 5:34',
        desc: 'Anakin and Padmé’s love theme, written to sound doomed from its first phrase.',
        href: 'https://www.youtube.com/watch?v=7wMiMDBHnJ0', link: 'Listen' },
      { title: 'Grievous Speaks to Lord Sidious', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 169, sub: 'Revenge of the Sith · 2005 · 2:49',
        desc: 'Grievous on Utapau, taking orders from a hologram. The quiet, creeping one.',
        href: 'https://www.youtube.com/watch?v=k_OTAM5Yu3M', link: 'Listen' },
      { title: 'Anakin\'s Betrayal', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 246, sub: 'Revenge of the Sith · 2005 · 4:06',
        desc: 'Order 66. The choir over Aayla, Ki-Adi-Mundi and Plo Koon, shot by their own men.',
        href: 'https://www.youtube.com/watch?v=m2p-im7cxa4', link: 'Listen' },
      { title: 'Jedi Temple March', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 205, sub: 'Revenge of the Sith · unreleased · 3:25',
        desc: 'Anakin and the 501st going up the Temple steps. It never made the album, so it has no official name; the copy I have is Pianistec’s arrangement.',
        href: 'https://www.youtube.com/watch?v=4Ee-1M57_hk', link: 'Epic version' },
      { title: 'Anakin\'s Dark Deeds', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 245, sub: 'Revenge of the Sith · 2005 · 4:05',
        desc: 'Mustafar and the Separatist council, with a choir chanting rather than mourning.',
        href: 'https://www.youtube.com/watch?v=FVWr249AUq4', link: 'Listen' },
      { title: 'Battle of the Heroes', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 223, sub: 'Revenge of the Sith · 2005 · 3:43',
        desc: 'Obi-Wan against Anakin on the lava. A Duel of the Fates for a fight that nobody wins.',
        href: 'https://www.youtube.com/watch?v=FHuD5y-PZM0', link: 'Listen' },
      { title: 'The Birth of the Twins and Padmé\'s Destiny', series: 'The Prequels', accent: '#ff4b2b', when: -19, year: 2005, secs: 220, sub: 'Revenge of the Sith · 2005 · 3:40',
        desc: 'Luke and Leia born on Polis Massa while Vader is bolted together on Coruscant, cut against each other.',
        href: 'https://www.youtube.com/watch?v=Oppez7oQ30w', link: 'Listen' },

      // The Clone Wars
      { title: 'Star Wars Main Title & A Galaxy Divided', series: 'The Clone Wars', accent: '#3f7fe0', when: -22, year: 2008, secs: 74, sub: 'The Clone Wars · 2008 · 1:14',
        desc: 'Kevin Kiner. The fanfare, then the drums and the newsreel theme that opened every episode for twelve years.',
        href: 'https://www.youtube.com/watch?v=iKZgzM8Ghns', link: 'Listen' },
      { title: 'Ahsoka’s Theme', series: 'The Clone Wars', accent: '#3f7fe0', when: -22, year: 2008, sub: 'The Clone Wars · 2008' },
      { title: 'Ahsoka Leaves', series: 'The Clone Wars', accent: '#3f7fe0', when: -20, year: 2013, secs: 143, sub: 'The Clone Wars · 2013 · 2:23',
        desc: 'Kevin Kiner. The Wrong Jedi: Ahsoka walking down the Temple steps and not turning round.',
        href: 'https://www.youtube.com/watch?v=QE3AMWnfVXM', link: 'Listen' },
      { title: 'Burying the Dead', series: 'The Clone Wars', accent: '#3f7fe0', when: -19, year: 2020, secs: 137, sub: 'The Clone Wars · 2020 · 2:17',
        desc: 'Kevin Kiner. Victory and Death: Ahsoka and Rex burying the 501st, helmets on their blasters, in the last minutes of the show.',
        href: 'https://www.youtube.com/watch?v=MJrEkTEkE4Q', link: 'Listen' },

      // The Bad Batch
      { title: 'The Bad Batch', series: 'The Bad Batch', accent: '#627f9d', when: -19, year: 2021, sub: 'The Bad Batch · 2021' },

      // Obi-Wan Kenobi
      { title: 'Obi-Wan', series: 'Obi-Wan Kenobi', accent: '#3f8fff', when: -9, year: 2022, secs: 246, sub: 'Obi-Wan Kenobi · 2022 · 4:06',
        desc: 'Williams came back at ninety to write one theme for the series and let Natalie Holt score the rest around it.',
        href: 'https://www.youtube.com/watch?v=HLn8e3aU7eI', link: 'Listen' },

      // Rebels
      { title: 'Rebels Theme', series: 'Rebels', accent: '#f0a63c', when: -5, year: 2014, secs: 56, sub: 'Rebels · 2014 · 0:56',
        desc: 'Kevin Kiner. Fifty-six seconds of main title, with more Williams in it than anything since the films.',
        href: 'https://www.youtube.com/watch?v=_kzU06rrIws', link: 'Listen' },
      { title: 'Thrawn\'s Deductions', series: 'Rebels', accent: '#f0a63c', when: -2, year: 2017, secs: 146, sub: 'Rebels · 2017 · 2:26',
        desc: 'Kevin and Sean Kiner. Thrawn working a culture out from its art, which is how he wins.',
        href: 'https://www.youtube.com/watch?v=m53YlifziPg', link: 'Listen' },
      { title: 'Kanan and the Fire', series: 'Rebels', accent: '#f0a63c', when: -1, year: 2018, secs: 86, sub: 'Rebels · 2018 · 1:26',
        desc: 'Kevin Kiner. Jedi Night: Kanan holding back the fuel-pod blast with the Force so the others get out, and the last thing he does.',
        href: 'https://www.youtube.com/watch?v=PeiuEb7iGTk', link: 'Listen' },

      // Andor
      { title: 'Past/Present Suite', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, secs: 225, sub: 'Andor · 2022 · 3:45',
        desc: 'Nicholas Britell. The Kenari flashbacks cut against Ferrix in the present, as one suite.',
        href: 'https://www.youtube.com/watch?v=DbQAyWJxOQE', link: 'Listen' },
      { title: 'Niamos!', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, sub: 'Andor · 2022' },
      { title: 'My Name Is Kino Loy', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, sub: 'Andor · 2022' },
      { title: 'Pilgrim', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, secs: 89, sub: 'Andor · 2022 · 1:29',
        desc: 'Nicholas Britell at his sparest: a handful of notes and a lot of air.',
        href: 'https://www.youtube.com/watch?v=lyKYUivIUlE', link: 'Listen' },
      { title: 'The Cassian Way', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, secs: 102, sub: 'Andor · 2022 · 1:42',
        desc: 'Nicholas Britell. Cassian’s own motif, from before the show has decided whether he is a hero.',
        href: 'https://www.youtube.com/watch?v=VhirPhzfnTk', link: 'Listen' },
      { title: 'Climb!', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, secs: 150, sub: 'Andor · 2022 · 2:30',
        desc: 'Nicholas Britell. The Eye: the freighter going straight up through the meteors with Nemik shouting the word, and the best heist in Star Wars pulled off.',
        href: 'https://www.youtube.com/watch?v=0jj78zUCwQk', link: 'Listen' },
      { title: 'The Morning After', series: 'Andor', accent: '#e0642a', when: -5, year: 2022, secs: 76, sub: 'Andor · 2022 · 1:16',
        desc: 'Nicholas Britell. The morning after the heist, the money and the dead counted. Quiet, which is the loudest he gets.',
        href: 'https://www.youtube.com/watch?v=bp02vkQmHSc', link: 'Listen' },
      { title: 'Brasso', series: 'Andor', accent: '#e0642a', when: -4, year: 2025, secs: 178, sub: 'Andor · 2025 · 2:58',
        desc: 'Brandon Roberts. Mina-Rau, and Brasso’s theme played for the last time.',
        href: 'https://www.youtube.com/watch?v=HK1u_X_rsx4', link: 'Listen' },
      { title: 'The Bix Is Back', series: 'Andor', accent: '#e0642a', when: -3, year: 2025, secs: 102, sub: 'Andor · 2025 · 1:42',
        desc: 'Nicholas Britell. Bix, still carrying Ferrix and Dr Gorst, getting back up.',
        href: 'https://www.youtube.com/watch?v=g3lJ1CI6drw', link: 'Listen' },
      { title: 'Bix\'s Message', series: 'Andor', accent: '#e0642a', when: -2, year: 2025, secs: 181, sub: 'Andor · 2025 · 3:01',
        desc: 'Brandon Roberts. The recording she leaves him on Coruscant, so that he can go and be what the Rebellion needs.',
        href: 'https://www.youtube.com/watch?v=iQUmCrxr1fk', link: 'Listen' },

      // Rogue One
      { title: 'The Imperial Suite', series: 'Rogue One', accent: '#8f98a8', when: 0, year: 2016, secs: 150, sub: 'Rogue One · 2016 · 2:30',
        desc: 'Michael Giacchino. Krennic and the Empire, and the closest anyone but Williams has come to the Imperial March.',
        href: 'https://www.youtube.com/watch?v=-C2wCcuKmLI', link: 'Listen' },

      // The Originals
      { title: 'Main Title', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 325, sub: 'A New Hope · 1977 · 5:25',
        desc: 'The fanfare, the crawl and the blockade runner, exactly as the 1977 album cut it.',
        href: 'https://www.youtube.com/watch?v=e9lapdvLSGw', link: 'Listen' },
      { title: 'Imperial Attack', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 379, sub: 'A New Hope · 1977 · 6:19',
        desc: 'Vader boarding the Tantive IV. The Empire’s first six minutes on screen.',
        href: 'https://www.youtube.com/watch?v=msqfRw197tk', link: 'Listen' },
      { title: 'The Dune Sea of Tatooine / Jawa Sandcrawler', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 301, sub: 'A New Hope · 1997 Special Edition · 5:01',
        desc: 'Threepio alone in the desert, then the Jawas: Stravinsky in the sand, and the cue every kid who played the LEGO Complete Saga knows. Uploaded everywhere as Tatooine Theme, which is not its name.',
        href: 'https://www.youtube.com/watch?v=7FO9sxl821Q', link: 'Fan upload' },
      { title: 'The Princess Appears', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 248, sub: 'A New Hope · 1977 · 4:08',
        desc: 'Leia’s hologram in Luke’s garage, then the twin suns: Binary Sunset, the Force theme’s first full statement.',
        href: 'https://www.youtube.com/watch?v=r6Qbbyc1eLc', link: 'Listen' },
      { title: 'The Force Theme', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 275, sub: 'Binary Sunset · 1977 · 4:35',
        desc: 'It has no track of its own on any album, so this is Jorah the Andal’s suite of it: Inner City, The Princess Appears, Funeral Pyre for a Jedi, The Jedi Steps.',
        href: 'https://www.youtube.com/watch?v=eb2zuegwcwk', link: 'Fan suite' },
      { title: 'Cantina Band', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 165, sub: 'A New Hope · 1977 · 2:45',
        desc: 'Figrin D’an and the Modal Nodes: Williams’ idea of aliens who had heard one Benny Goodman record and were doing their best.',
        href: 'https://www.youtube.com/watch?v=EsvfptdFXf4', link: 'Listen' },
      { title: 'The Last Battle', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 730, sub: 'A New Hope · 1977 · 12:10',
        desc: 'The whole Battle of Yavin in one take, twelve minutes from the briefing to Luke switching the targeting computer off.',
        href: 'https://www.youtube.com/watch?v=1W8DIwfQDa4', link: 'Listen' },
      { title: 'The Throne Room and End Title', series: 'The Originals', accent: '#3f8fff', when: 0, year: 1977, secs: 335, sub: 'A New Hope · 1977 · 5:35',
        desc: 'Medals on Yavin 4, then the credits. The only ending in the saga that is pure victory.',
        href: 'https://www.youtube.com/watch?v=trYeKG17hYc', link: 'Listen' },
      { title: 'The Imperial March (Darth Vader\'s Theme)', series: 'The Originals', accent: '#9fc4e8', when: 3, year: 1980, secs: 180, sub: 'The Empire Strikes Back · 1980 · 3:00',
        desc: 'Vader’s theme, and the most recognisable bars of film music there are. It is not in A New Hope at all, which still surprises people.',
        href: 'https://www.youtube.com/watch?v=u7HF4JG1pOg', link: 'Listen' },
      { title: 'The Asteroid Field', series: 'The Originals', accent: '#9fc4e8', when: 3, year: 1980, secs: 256, sub: 'The Empire Strikes Back · 1980 · 4:16',
        desc: 'The Falcon through the rocks with the TIEs behind it, and Williams at his most Stravinsky: the fastest thing on any of the albums.',
        href: 'https://www.youtube.com/watch?v=XNDEljd1cQI', link: 'Listen' },
      { title: 'Yoda\'s Theme', series: 'The Originals', accent: '#9fc4e8', when: 3, year: 1980, secs: 208, sub: 'The Empire Strikes Back · 1980 · 3:28',
        desc: 'Dagobah. Written for a puppet, and it makes him the wisest thing in the room before he has said a word.',
        href: 'https://www.youtube.com/watch?v=9C8J-jhMtRA', link: 'Listen' },
      { title: 'Lando\'s Palace', series: 'The Originals', accent: '#9fc4e8', when: 3, year: 1980, secs: 234, sub: 'The Empire Strikes Back · 1980 · 3:54',
        desc: 'Cloud City, all sunshine and welcome, right up until the dining room.',
        href: 'https://www.youtube.com/watch?v=nIcSjmRWbCY', link: 'Listen' },
      { title: 'The Return of the Jedi', series: 'The Originals', accent: '#3fd07f', when: 4, year: 1983, secs: 304, sub: 'Return of the Jedi · 1983 · 5:04',
        desc: 'The sail barge fight over the Sarlacc pit, Luke’s rescue as five minutes of action music: the cue that names the film.',
        href: 'https://www.youtube.com/watch?v=MtB6kOMh5_k', link: 'Listen' },

      // The Mandalorian
      { title: 'The Mandalorian', series: 'The Mandalorian', accent: '#9aa8b4', when: 9, year: 2019, secs: 199, sub: 'The Mandalorian · 2019 · 3:19',
        desc: 'Ludwig Göransson. A bass recorder, a beat and a theme that sounds like nothing else on this list.',
        href: 'https://www.youtube.com/watch?v=2YDKxcdIXBs', link: 'Listen' },
      { title: 'Mando Rescue', series: 'The Mandalorian', accent: '#9aa8b4', when: 9, year: 2019, secs: 135, sub: 'Chapter 3 · 2019 · 2:15',
        desc: 'Ludwig Göransson. The Sin: the covert coming out of hiding to get him and the child off Nevarro. This is the way.',
        href: 'https://www.youtube.com/watch?v=jnVaD71JeQo', link: 'Listen' },
      { title: 'You Are a Mandalorian', series: 'The Mandalorian', accent: '#9aa8b4', when: 9, year: 2019, sub: 'The Mandalorian · 2019' },

      // The Book of Boba Fett
      { title: 'The Book of Boba Fett', series: 'The Book of Boba Fett', accent: '#5fbf6a', when: 9, year: 2022, secs: 176, sub: 'The Book of Boba Fett · 2022 · 2:56',
        desc: 'Ludwig Göransson. Boba’s theme, chanted, which is the only way to score a man who climbed out of a Sarlacc.',
        href: 'https://www.youtube.com/watch?v=3a0tH0fkvW8', link: 'Listen' },

      // The Mandalorian and Grogu
      { title: 'Shakari', series: 'The Mandalorian and Grogu', accent: '#9aa8b4', when: 9, year: 2026, secs: 89, sub: 'The Mandalorian and Grogu · 2026 · 1:29',
        desc: 'Ludwig Göransson. The neon planet where Rotta is held, the Mando theme rebuilt in synths. Imperial_vector’s four-minute suite of it is the one I have on.',
        href: 'https://www.youtube.com/watch?v=DZHshyzeoK0', link: 'Listen' },

      // Ahsoka
      { title: 'Ahsoka - End Credits', series: 'Ahsoka', accent: '#e8eef4', when: 9, year: 2023, secs: 225, sub: 'Ahsoka · 2023 · 3:45',
        desc: 'Kevin Kiner. Her theme, grown up with her: the Clone Wars motif with a choir under it, over the credits of the live-action series.',
        href: 'https://www.youtube.com/watch?v=uF5IPOEFndw', link: 'Listen' },

      // The Sequels
      { title: 'Rey\'s Theme', series: 'The Sequels', accent: '#4fa8ff', when: 34, year: 2015, secs: 192, sub: 'The Force Awakens · 2015 · 3:12',
        desc: 'Williams in his eighties, and the best new theme the saga had had in a generation.',
        href: 'https://www.youtube.com/watch?v=65As1V0vQDM', link: 'Listen' },
      { title: 'March of the Resistance', series: 'The Sequels', accent: '#4fa8ff', when: 34, year: 2015, secs: 156, sub: 'The Force Awakens · 2015 · 2:36',
        desc: 'The X-wings coming in low over the lake at Takodana. All brass, all confidence.',
        href: 'https://www.youtube.com/watch?v=ueqKtype7Kk', link: 'Listen' },
      { title: 'Kylo Ren Arrives at the Battle', series: 'The Sequels', accent: '#4fa8ff', when: 34, year: 2015, secs: 120, sub: 'The Force Awakens · 2015 · 2:00',
        desc: 'Kylo Ren’s theme at full volume, landing on Takodana. Wookieeman’s five-minute suite stitches it to Torn Apart, The Abduction and the Jakku attack, and that is the one I keep on.',
        href: 'https://www.youtube.com/watch?v=NRRPCjr1Ito', link: 'Listen' },
      { title: 'March of the First Order', series: 'The Sequels', accent: '#4fa8ff', when: 34, year: 2015, secs: 116, sub: 'The Force Awakens · 2015 · 1:56',
        desc: 'Hux’s rally on Starkiller Base: a march in the Imperial style with the swing taken out of it. No official upload of it exists, so this is a mirror of the album audio.',
        href: 'https://www.youtube.com/watch?v=85oW_RSFr24', link: 'Mirror' },
      { title: 'The Jedi Steps and Finale', series: 'The Sequels', accent: '#4fa8ff', when: 34, year: 2015, secs: 532, sub: 'The Force Awakens · 2015 · 8:52',
        desc: 'Rey climbing to Luke on Ahch-To, then the credits, with every theme in the film taking a bow.',
        href: 'https://www.youtube.com/watch?v=cUBUlKgsNK8', link: 'Listen' },
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
