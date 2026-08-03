/* fan-hp.js: content for /franchises/harry-potter/. Rendered by fanpage.js.
   The four houses are drawn in the page itself; everything else lives here. */
window.FAN_PAGE = { sections: [

  { id: 'books', kind: 'rank', title: 'The Seven Books', note: '1997 – 2007',
    items: [
      { num: 'I', title: 'The Philosopher’s Stone', sub: '1997', desc: 'Diagon Alley, the Sorting Hat, and a mirror that shows you exactly what you want.' },
      { num: 'II', title: 'The Chamber of Secrets', sub: '1998', desc: 'A basilisk, a diary that writes back, and the first Horcrux nobody knew was one.' },
      { num: 'III', title: 'The Prisoner of Azkaban', sub: '1999', desc: 'The Marauders, a hippogriff and a time-turner. The best-plotted book of the seven.' },
      { num: 'IV', title: 'The Goblet of Fire', sub: '2000', desc: 'The Triwizard Tournament, and the graveyard scene that ends the childhood half of the series.' },
      { num: 'V', title: 'The Order of the Phoenix', sub: '2003', desc: 'Umbridge, the D.A., and the Ministry refusing to believe what everyone saw.' },
      { num: 'VI', title: 'The Half-Blood Prince', sub: '2005', desc: 'Memories, Horcruxes, and the Astronomy Tower.' },
      { num: 'VII', title: 'The Deathly Hallows', sub: '2007', desc: 'The hunt, the Hallows, King’s Cross, and the Battle of Hogwarts.' },
    ] },

  { id: 'spells', kind: 'tiles', title: 'The Spellbook', note: 'incantation · effect',
    lede: 'Wand movement matters as much as the words. Swish and flick.',
    items: [
      { title: 'Expelliarmus', accent: '#d3a625', sub: 'Disarming Charm', desc: 'Harry’s signature, and the spell he wins the whole thing with.' },
      { title: 'Expecto Patronum', accent: '#c0e8ff', sub: 'Patronus Charm', desc: 'Needs one memory strong enough to hold against a Dementor.' },
      { title: 'Wingardium Leviosa', accent: '#9fd0f0', sub: 'Levitation Charm', desc: 'Leviosa, not leviosaaa. First-year Charms, and it takes down a troll.' },
      { title: 'Lumos', accent: '#f6e8a8', sub: 'Wand-Lighting', desc: 'Light at the wand tip. Nox puts it out.' },
      { title: 'Alohomora', accent: '#c9a95f', sub: 'Unlocking Charm', desc: 'Opens most doors, and none of the interesting ones.' },
      { title: 'Accio', accent: '#7fd0a0', sub: 'Summoning Charm', desc: 'The Triwizard broom, and half the escapes in book seven.' },
      { title: 'Protego', accent: '#8fb8ff', sub: 'Shield Charm', desc: 'The D.A. spent a whole year on this one in a room that made itself.' },
      { title: 'Riddikulus', accent: '#e0a05f', sub: 'Boggart-Banishing', desc: 'You beat the thing you fear by making it ridiculous. Laughter finishes it.' },
      { title: 'Sectumsempra', accent: '#c04a4a', sub: 'For enemies', desc: 'Snape’s own invention, scribbled in a schoolbook margin.' },
      { title: 'Avada Kedavra', accent: '#4fbf5f', sub: 'Unforgivable', desc: 'No counter-curse, no shield. One person has ever survived it.' },
    ] },

  { id: 'horcruxes', kind: 'cards', title: 'The Horcruxes', note: 'seven pieces of one soul',
    lede: 'Six made on purpose, one by accident. Each one had to be destroyed by something beyond ordinary repair: basilisk venom, Fiendfyre, or the sword that absorbs what makes it stronger.',
    items: [
      { title: 'Tom Riddle’s Diary', sub: 'Destroyed 1993', tag: 'I', desc: 'Written into by Ginny for a year. Harry put a basilisk fang through it in the Chamber.', meta: 'By Harry · basilisk fang' },
      { title: 'Marvolo Gaunt’s Ring', sub: 'Destroyed 1996', tag: 'II', desc: 'It also held the Resurrection Stone, which is what cost Dumbledore his hand.', meta: 'By Dumbledore · Gryffindor’s sword' },
      { title: 'Slytherin’s Locket', sub: 'Destroyed 1997', tag: 'III', desc: 'Stolen by R.A.B., worn for months by the trio, and it fought back the whole time.', meta: 'By Ron · Gryffindor’s sword' },
      { title: 'Hufflepuff’s Cup', sub: 'Destroyed 1998', tag: 'IV', desc: 'Locked in the Lestrange vault at Gringotts, behind a dragon.', meta: 'By Hermione · basilisk fang' },
      { title: 'Ravenclaw’s Diadem', sub: 'Destroyed 1998', tag: 'V', desc: 'Hidden in the Room of Requirement, and lost to Fiendfyre in it.', meta: 'By Crabbe’s Fiendfyre' },
      { title: 'Nagini', sub: 'Destroyed 1998', tag: 'VI', desc: 'The last one made, and the last one killed: by Neville, with the sword, on the steps.', meta: 'By Neville · Gryffindor’s sword' },
      { title: 'Harry Potter', sub: 'Destroyed 1998', tag: 'VII', desc: 'Made by accident on the night the curse rebounded. Ended in the Forbidden Forest, by choice.', meta: 'By Voldemort · in the forest' },
    ] },

  { id: 'hallows', kind: 'cards', title: 'The Deathly Hallows', note: 'the three brothers',
    items: [
      { title: 'The Elder Wand', sub: 'The unbeatable wand', tag: 'Line', desc: 'Its allegiance moves to whoever disarms its owner, which is exactly how it ends up useless in Voldemort’s hand.', meta: 'Antioch Peverell' },
      { title: 'The Resurrection Stone', sub: 'To recall the dead', tag: 'Circle', desc: 'Brings back shadows, not people. Harry uses it once, walking into the forest, and drops it.', meta: 'Cadmus Peverell' },
      { title: 'The Cloak of Invisibility', sub: 'To hide from Death', tag: 'Triangle', desc: 'The only one that lasted: passed down the Potter line for centuries, and the only Hallow used well.', meta: 'Ignotus Peverell' },
    ] },

  { id: 'map', kind: 'cards', title: 'The Map', note: 'a Harry Potter terminal I built for this site',
    lede: 'The same idea as the J.A.R.V.I.S. page, on parchment instead of glass.',
    items: [
      { title: 'The Marauder\u2019s Map', sub: 'Parchment terminal', tag: 'Live', desc: 'Every room on this site drawn as a corridor of the castle, with footprints that move on their own, the charms that make it work, and a button that wipes the whole thing blank.',
        href: '/marauders-map/', link: 'I solemnly swear', meta: 'CSS only · no images' },
      { title: 'Mischief managed', sub: 'The exit', tag: 'Detail', desc: 'Press it and the ink drains out of the parchment, exactly as it should.', meta: 'Moony, Wormtail, Padfoot & Prongs' },
      { title: 'The other terminals', sub: 'Same idea, other worlds', tag: 'More', desc: 'A Stark heads-up display, a Jedi holocron archive, and a Star Wars holotable of the whole portfolio.',
        href: '/jarvis/', link: 'J.A.R.V.I.S.', meta: 'Also /holocron/ and /elmallah/' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    items: [
      { title: 'It does not do to dwell on dreams and forget to live.', sub: 'Albus Dumbledore' },
      { title: 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.', sub: 'Albus Dumbledore' },
      { title: 'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.', sub: 'Albus Dumbledore' },
      { title: 'Always.', sub: 'Severus Snape' },
    ] },

] };
