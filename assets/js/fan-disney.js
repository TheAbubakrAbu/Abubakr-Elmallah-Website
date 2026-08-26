/* fan-disney.js: content for /worlds/disney/. Rendered by fanpage.js.
   Every resort and studio card links to its own official site. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid', note: 'Disneyland for as long as I can remember. It is the baseline every other park gets measured against.' },
  sections: [

  /* `been: true` turns on the seventh card row: the "I went here" stamp and,
     under it, my own photograph from there (photos-data.js). Three of the six
     resorts carry it; the other three get neither, which is the point. */
  { id: 'parks', kind: 'cards', title: 'The Parks', note: 'six resorts · twelve theme parks · three continents', been: true,
    lede: 'Every Disney resort on earth, oldest first, with the parks inside each one, and whether I have actually been.',
    items: [
      { title: 'Disneyland Resort', sub: 'Anaheim, California · 1955', tag: 'Resort I', desc: 'The original, and the only one Walt Disney walked through himself. Disneyland Park and Disney California Adventure, plus Downtown Disney.',
        href: 'https://disneyland.disney.go.com/', link: 'disneyland.disney.go.com', meta: '2 parks · opened 17 July 1955',
        been: true, beenWhen: 'since childhood', photo: 'hs-senior/2024-06-02-2048-2.avif',
        photoAlt: 'holding the lightsaber I built, under the Millennium Falcon at Galaxy’s Edge',
        photoCap: 'Galaxy’s Edge, June 2024' },
      { title: 'Walt Disney World', sub: 'Bay Lake, Florida · 1971', tag: 'Resort II', desc: 'The largest of them by a distance: Magic Kingdom, EPCOT, Hollywood Studios and Animal Kingdom on a site the size of a city.',
        href: 'https://disneyworld.disney.go.com/', link: 'disneyworld.disney.go.com', meta: '4 parks · 2 water parks',
        been: true, beenWhen: 'all four parks' },
      { title: 'Tokyo Disney Resort', sub: 'Urayasu, Japan · 1983', tag: 'Resort III', desc: 'Licensed rather than owned, run by the Oriental Land Company, and home to DisneySea: which a lot of people will tell you is the best theme park ever built.',
        href: 'https://www.tokyodisneyresort.jp/en/', link: 'tokyodisneyresort.jp', meta: 'Disneyland · DisneySea',
        been: true, beenWhen: 'July 2026', photo: 'uci-second/2026-07-14-0941.avif',
        photoAlt: 'Mediterranean Harbour and Mount Prometheus at Tokyo DisneySea',
        photoCap: 'DisneySea, July 2026' },
      { title: 'Disneyland Paris', sub: 'Marne-la-Vallée, France · 1992', tag: 'Resort IV', desc: 'Le Château de la Belle au Bois Dormant, and the most ornate castle of the six. Disneyland Park and Walt Disney Studios Park.',
        href: 'https://www.disneylandparis.com/', link: 'disneylandparis.com', meta: '2 parks · Val d’Europe' },
      { title: 'Hong Kong Disneyland', sub: 'Lantau Island · 2005', tag: 'Resort V', desc: 'The smallest of the six, on reclaimed land at Penny’s Bay, with the Castle of Magical Dreams.',
        href: 'https://www.hongkongdisneyland.com/', link: 'hongkongdisneyland.com', meta: '1 park' },
      { title: 'Shanghai Disney Resort', sub: 'Pudong, China · 2016', tag: 'Resort VI', desc: 'The newest and the most different: Enchanted Storybook Castle is the biggest of them, and Tron Lightcycle Power Run debuted here.',
        href: 'https://www.shanghaidisneyresort.com/en/', link: 'shanghaidisneyresort.com', meta: '1 park · Disneytown' },
      { title: 'All Disney Parks', sub: 'The hub', tag: 'Official', desc: 'One page for every resort, cruise line and Adventures by Disney trip.',
        href: 'https://disneyparks.disney.go.com/', link: 'disneyparks.disney.go.com', meta: 'Parks, Experiences & Products' },
      { title: 'Disney Cruise Line', sub: 'Since 1998', tag: 'At sea', desc: 'Plus Castaway Cay and Lookout Cay, the private-island half of the parks business.',
        href: 'https://disneycruise.disney.go.com/', link: 'disneycruise.disney.go.com', meta: 'Growing fleet' },
    ] },

  { id: 'studios', kind: 'cards', title: 'The Studios', note: 'what Disney actually owns',
    items: [
      { title: 'Walt Disney Animation', sub: 'Since 1923', tag: 'Animation', desc: 'Snow White in 1937 was the first full-length animated feature anyone had attempted. Sixty-odd films later it is still the flagship.',
        href: 'https://www.disneyanimation.com/', link: 'disneyanimation.com', meta: 'Burbank' },
      { title: 'Pixar', sub: 'Acquired 2006', tag: 'Animation', desc: 'Toy Story was the first fully computer-animated feature, and the studio ran an unbeaten streak for about fifteen years afterwards.',
        href: 'https://www.pixar.com/', link: 'pixar.com', meta: 'Emeryville' },
      { title: 'Marvel Studios', sub: 'Acquired 2009', tag: 'Live action', desc: 'Twenty-three films that told one story, and everything after it.',
        href: 'https://www.marvel.com/', link: 'marvel.com', meta: 'The Infinity Saga' },
      { title: 'Lucasfilm', sub: 'Acquired 2012', tag: 'Live action', desc: 'Star Wars and Indiana Jones, plus ILM and Skywalker Sound.',
        href: 'https://www.starwars.com/', link: 'starwars.com', meta: 'A galaxy far, far away' },
      { title: '20th Century Studios', sub: 'Acquired 2019', tag: 'Live action', desc: 'The last of the old Hollywood majors to change hands, and the reason Avatar sits under the same roof.',
        href: 'https://www.20thcenturystudios.com/', link: '20thcenturystudios.com', meta: 'Formerly Fox' },
      { title: 'Disney+', sub: 'Since 2019', tag: 'Streaming', desc: 'Where all of the above ended up, and why the release model changed for everyone.',
        href: 'https://www.disneyplus.com/', link: 'disneyplus.com', meta: 'Nov 2019' },
    ] },

  { id: 'rides', kind: 'cards', title: 'The Rides', note: 'the ones that turn up in more than one park',
    items: [
      { title: 'Pirates of the Caribbean', sub: '1967', tag: 'Dark ride', desc: 'The last attraction Walt personally worked on, and the only ride that has ever produced a film franchise rather than the other way round.',
        href: 'https://disneyland.disney.go.com/attractions/disneyland/pirates-of-the-caribbean/', link: 'disneyland.disney.go.com', meta: 'Anaheim · Orlando · Paris · Tokyo · Shanghai' },
      { title: 'Haunted Mansion', sub: '1969', tag: 'Dark ride', desc: 'Nine hundred and ninety-nine happy haunts, room for a thousand, and a stretching room that is an elevator in Anaheim and a lift-free room in Orlando.',
        href: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/haunted-mansion/', link: 'disneyworld.disney.go.com', meta: 'Four resorts' },
      { title: 'it\u2019s a small world', sub: '1964', tag: 'Boat ride', desc: 'Built for the New York World\u2019s Fair in eleven months, moved to Anaheim afterwards, and the song has never once stopped.', meta: 'Five resorts' },
      { title: 'Space Mountain', sub: '1975', tag: 'Coaster', desc: 'An indoor coaster in the dark, which is a simple trick that no amount of speed has improved on.', meta: 'Five resorts' },
      { title: 'Tower of Terror', sub: '1994', tag: 'Drop', desc: 'A ride system built specifically for it: the cabin is pulled down faster than gravity, and it moves horizontally halfway through.', meta: 'Orlando · Tokyo · Paris' },
      { title: 'Rise of the Resistance', sub: '2019', tag: 'Trackless', desc: 'Four ride systems in one attraction, and widely called the most ambitious thing the company has ever built.',
        href: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/star-wars-rise-of-the-resistance/', link: 'disneyworld.disney.go.com', meta: 'Anaheim · Orlando' },
    ] },

  { id: 'numbers', kind: 'tiles', title: 'The Numbers', note: 'the scale of it',
    items: [
      { title: 'Opening day, 1955', accent: '#9fd0ff', sub: 'A disaster', desc: 'Counterfeit tickets, a gas leak, tarmac still setting in the heat. Walt called it Black Sunday, and it recovered inside a month.' },
      { title: 'Twice Manhattan', accent: '#7fd0ff', sub: 'Walt Disney World', desc: 'Around a hundred square kilometres in Florida, bought quietly through shell companies so the price would not move.' },
      { title: 'Most visited park', accent: '#f0c840', sub: 'Magic Kingdom', desc: 'Roughly seventeen million people a year, more than any other theme park on earth.' },
      { title: '1937', accent: '#e0a0d0', sub: 'Snow White', desc: 'Called Disney\u2019s Folly right up until it became the highest-grossing film in the world.' },
      { title: '100 years', accent: '#c9a05f', sub: '1923 to 2023', desc: 'Started as the Disney Brothers Cartoon Studio in a garage in Los Angeles.' },
      { title: '12 parks', accent: '#5fd0a0', sub: 'Six resorts', desc: 'Plus a cruise line, two private islands, and a seventh resort under discussion more or less permanently.' },
    ] },

  { id: 'eras', kind: 'timeline', title: 'The Animation Eras', note: '1937 – now',
    items: [
      { when: '1937 – 1942', title: 'The Golden Age', desc: 'Snow White, Pinocchio, Fantasia, Dumbo, Bambi. Five films that invented the form and nearly bankrupted the studio.' },
      { when: '1950 – 1959', title: 'The Silver Age', desc: 'Cinderella, Alice, Peter Pan, Lady and the Tramp, Sleeping Beauty, and Disneyland opening in the middle of it.' },
      { when: '1970 – 1988', title: 'The Dark Age', desc: 'The Black Cauldron and a studio unsure what it was for. The Little Mermaid ends it.' },
      { when: '1989 – 1999', title: 'The Renaissance', desc: 'Mermaid, Beauty and the Beast, Aladdin, The Lion King. Broadway structure, and the peak of hand-drawn animation.' },
      { when: '2010 – now', title: 'The Revival', desc: 'Tangled, Frozen, Zootopia, Encanto: computer animation with the Renaissance’s instincts back in place.' },
    ] },


  { id: 'visited', kind: 'stats', title: 'Where I Have Actually Been', note: 'eight of the twelve',
    items: [
      { title: '8 of 12', sub: 'Parks visited', desc: 'Every park at Disneyland, Walt Disney World and Tokyo.' },
      { title: '3 of 6', sub: 'Resorts visited', desc: 'Anaheim, Orlando and Chiba. Paris, Hong Kong and Shanghai still to do.' },
      { title: '2', sub: 'Continents', desc: 'North America and Asia.' },
      { title: '1955 \u2013 2001', sub: 'Opening range', desc: 'From the original Disneyland to Tokyo DisneySea and California Adventure.' },
    ] },

  { id: 'anaheim', kind: 'cards', title: 'Disneyland Resort', note: 'Anaheim, California \u00b7 both parks, been to all of it', been: true,
    lede: 'The original, and the local one. Walt actually walked around this park, which is a thing no other resort can say, and you can feel it in how tightly everything is packed: there is no spare land here, so every corner had to earn its place.',
    items: [
      { title: 'Disneyland Park', sub: '1955', tag: '\u2713 Been', accent: '#8fd8f0',
        desc: 'The one Walt built, opened in a year and a day. Main Street, the castle, Pirates, the Haunted Mansion, the Matterhorn. Smaller than Magic Kingdom and better laid out than it, and the only park where the man himself picked the sightlines.',
        meta: 'The original',
        been: true, beenWhen: 'since childhood', photo: 'uci-second/2026-05-06-1827.avif',
        photoAlt: 'in front of Sleeping Beauty Castle at Disneyland',
        photoCap: 'Sleeping Beauty Castle' },
      { title: 'Disney California Adventure', sub: '2001', tag: '\u2713 Been', accent: '#7fc0f0',
        desc: 'Opened badly and got fixed. Cars Land is the best single land Disney has built anywhere, Radiator Springs Racers is the best ride at the resort, and Pixar Pier finally gave the place an identity.',
        meta: 'Cars Land',
        been: true, beenWhen: 'many times', photo: 'uci-second/2025-09-18-1737.avif',
        photoAlt: 'Pixar Pier at dusk, with the Incredicoaster and the Pixar Pal-A-Round',
        photoCap: 'Pixar Pier, Sept 2025' },
    ] },

  { id: 'wdw', kind: 'cards', title: 'Walt Disney World', note: 'Florida \u00b7 all four parks, been to every one', been: true,
    lede: 'Forty square miles, roughly the size of San Francisco, bought quietly through shell companies so nobody could work out what was happening and raise the price. Four parks, and I have done all four.',
    items: [
      { title: 'Magic Kingdom', sub: '1971', tag: '\u2713 Been', accent: '#8fd8f0', been: true,
        desc: 'The bigger Disneyland, with the taller castle and the utilidors running underneath so cast members never walk through the wrong land. Space Mountain, the Haunted Mansion, Seven Dwarfs Mine Train.',
        meta: 'Cinderella Castle' },
      { title: 'EPCOT', sub: '1982', tag: '\u2713 Been', accent: '#7fc0f0', been: true,
        desc: 'The strangest and most ambitious park anybody has built. A permanent world\u2019s fair with eleven countries around a lagoon, each staffed by people from that country. Walt\u2019s original plan was a working city; this is what got built instead, and it is still like nothing else.',
        meta: 'Spaceship Earth' },
      { title: 'Hollywood Studios', sub: '1989', tag: '\u2713 Been', accent: '#a89aff', been: true,
        desc: 'Galaxy\u2019s Edge and Rise of the Resistance, which is the most technically ambitious ride Disney has ever built. Also Tower of Terror and Rock \u2018n\u2019 Roller Coaster.',
        meta: 'Rise of the Resistance' },
      { title: 'Animal Kingdom', sub: '1998', tag: '\u2713 Been', accent: '#5fd0a0', been: true,
        desc: 'Pandora, a real savannah with actual animals, and Flight of Passage, which I would put up as the best ride Disney has made. Neither the animals nor Pandora exist on the west coast.',
        meta: 'Flight of Passage' },
    ] },

  { id: 'tokyo', kind: 'cards', title: 'Tokyo Disney Resort', note: 'Chiba, Japan \u00b7 both parks, been to both', been: true,
    lede: 'Not owned by Disney; it is licensed to the Oriental Land Company, which is exactly why it is the best-run resort in the world. They have money, space and no obligation to copy anybody, so they build things nowhere else has.',
    items: [
      { title: 'Tokyo Disneyland', sub: '1983', tag: '\u2713 Been', accent: '#8fd8f0',
        desc: 'The first Disney park outside America, and the one where the standard of upkeep genuinely embarrasses the US resorts. A covered World Bazaar instead of Main Street, because it rains.',
        meta: 'The first outside the US',
        been: true, beenWhen: 'July 2026', photo: 'uci-second/2026-07-13-1931.avif',
        photoAlt: 'Cinderella Castle floodlit blue at Tokyo Disneyland',
        photoCap: 'Cinderella Castle at dusk' },
      { title: 'Tokyo DisneySea', sub: '2001', tag: '\u2713 Been', accent: '#4fb8d0',
        desc: 'Widely held to be the best theme park on earth, and I am not going to argue. Seven nautical ports, a volcano you can ride into, and a level of detail that makes everything else look like a first draft. Nothing at any other resort comes close to Mediterranean Harbour at night.',
        meta: 'The best park anywhere',
        been: true, beenWhen: 'July 2026', photo: 'uci-second/2026-07-14-0941.avif',
        photoAlt: 'Mount Prometheus over Mediterranean Harbour at Tokyo DisneySea',
        photoCap: 'Mediterranean Harbour' },
    ] },

  { id: 'togo', kind: 'tiles', title: 'Still To Go', note: 'the four I have not done', compact: true,
    items: [
      { title: 'Disneyland Paris', accent: '#a89aff', sub: '1992 · not yet', desc: 'The prettiest castle of the lot, by some distance, and Phantom Manor instead of the Haunted Mansion.' },
      { title: 'Walt Disney Studios Park', accent: '#8f98a8', sub: '2002 · not yet', desc: 'Paris\u2019 second gate, currently being rebuilt into Disney Adventure World.' },
      { title: 'Hong Kong Disneyland', accent: '#7fc0f0', sub: '2005 · not yet', desc: 'The smallest of them, with a castle that got a full rebuild in 2020.' },
      { title: 'Shanghai Disneyland', accent: '#f0a8d8', sub: '2016 · not yet', desc: 'The newest and largest castle, and TRON Lightcycle Power Run, which Florida then copied.' },
    ] },

  { id: 'florida', kind: 'cards', title: 'Florida Is The Best One', note: 'and it is not close',
    lede: 'Walt Disney World is the answer. Anaheim has the history and Walt actually walked around it, and I will always love it for that, but Florida is where the scale is. Roughly forty square miles, about the size of San Francisco, bought quietly through shell companies so nobody could work out what was going on and put the price up.',
    items: [
      { title: 'Four parks, not two', sub: 'Walt Disney World', tag: 'Scale', accent: '#8fd8f0',
        desc: 'Magic Kingdom, EPCOT, Hollywood Studios and Animal Kingdom, plus two water parks and a whole district on top. Anaheim has two parks you can walk between in ten minutes.',
        meta: '~40 square miles' },
      { title: 'EPCOT', sub: 'Nothing else like it anywhere', tag: 'Only here', accent: '#7fc0f0',
        desc: 'A permanent world’s fair with eleven countries around a lagoon, staffed by people from each of them. Walt’s original idea was a working city; what got built instead is still the strangest and most ambitious park anyone has made.',
        meta: 'Spaceship Earth' },
      { title: 'Animal Kingdom', sub: 'Pandora and a real savannah', tag: 'Only here', accent: '#5fd0a0',
        desc: 'Flight of Passage is the best ride Disney has ever built, and the park has actual animals in it. Neither of those exists on the west coast.',
        meta: 'Flight of Passage' },
      { title: 'It got all of it', sub: 'The rides land here first', tag: 'Verdict', accent: '#8fd8f0',
        desc: 'Star Wars, the Ratatouille ride, Guardians: Cosmic Rewind, Tron. Florida gets the space to build them properly and usually gets them first. It is the biggest and it has the most, and that is the whole argument.',
        meta: 'The one to go to' },
    ] },

  /* the music: the one Disney Animation track on my playlist, linked to Alan
     Menken's own upload */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks · the signature, and the one from my playlist',
    lede: 'The seven notes over the castle at the start of every film, and the one piece of Disney Animation score I keep on. Both linked to the albums’ own uploads.',
    items: [
      { title: 'When You Wish Upon a Star', accent: '#8fd8f0', sub: 'Cliff Edwards · Pinocchio · 1940 · 3:14',
        desc: 'Cliff Edwards as Jiminy Cricket. The Pinocchio song that became the studio’s signature, and the castle logo every film opens on.',
        href: 'https://www.youtube.com/watch?v=Z0aKxrcEH30', link: 'Listen' },
      { title: 'Kingdom Dance', accent: '#e8c56a', sub: 'Tangled · 2010 · 2:21',
        desc: 'Alan Menken. The square in the kingdom, a fiddle, and Rapunzel pulling the whole town into the dance. The cue Tangled is remembered by.',
        href: 'https://www.youtube.com/watch?v=0X0sLw63KLU', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Disney.com', href: 'https://www.disney.com/',
        desc: 'The official home.' },
      { title: 'Disney Wiki', href: 'https://disney.fandom.com/wiki/The_Walt_Disney_Company',
        desc: 'Every film, short, park and character.' },
      { title: 'Disneyland', href: 'https://disneyland.disney.go.com/',
        desc: 'The park down the road from me.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "Pick A Park",
  intro: "Eight of the twelve, across three resorts. Pick one and see whether I have actually been, and what it is for.",
  prompt: "Twelve parks, six resorts, three of them done.",
  said: "%.",
  items: [
    { n: "Disneyland", s: "Anaheim, 1955 \u00b7 been", c: "#8fd8f0", d: "M12 3l7 5v12H5V8z M9 20v-6h6v6 M12 3v-1 M8 11h1 M15 11h1", note: "The original, built in a year and a day, and the only park Walt actually walked around. Tighter than Magic Kingdom and better laid out for it: no spare land, so every corner had to earn its place." },
    { n: "California Adventure", s: "Anaheim, 2001 \u00b7 been", c: "#7fc0f0", d: "M3 18h18 M5 18l3-6 3 4 2-3 3 5 M9 8a2 2 0 1 1 0 .1", note: "Opened badly and got fixed. Cars Land is the best single land Disney has built anywhere, and Radiator Springs Racers is the best ride at the resort." },
    { n: "Magic Kingdom", s: "Florida, 1971 \u00b7 been", c: "#8fd8f0", d: "M12 3l8 6v11H4V9z M9 20v-7h6v7 M12 3v-1 M7 12h1 M16 12h1", note: "The bigger Disneyland, with the taller castle and the utilidors running underneath so cast members never walk through the wrong land." },
    { n: "EPCOT", s: "Florida, 1982 \u00b7 been", c: "#7fc0f0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M12 3v18 M3 12h18 M6 6l12 12 M18 6L6 18", note: "The strangest and most ambitious park anybody has built. Eleven countries round a lagoon, each staffed by people from that country. Walt wanted a working city; this is what got built instead." },
    { n: "Hollywood Studios", s: "Florida, 1989 \u00b7 been", c: "#a89aff", d: "M4 6h16v12H4z M8 6v12 M16 6v12 M11 10l4 2-4 2z", note: "Galaxy\u2019s Edge and Rise of the Resistance, which is the most technically ambitious ride Disney has ever built. Also Tower of Terror." },
    { n: "Animal Kingdom", s: "Florida, 1998 \u00b7 been", c: "#5fd0a0", d: "M12 21V9 M12 9c-5 0-7-4-7-7 5 0 7 3 7 7z M12 9c5 0 7-4 7-7-5 0-7 3-7 7z M9 21h6", note: "Pandora, a real savannah, and Flight of Passage, which I would put up as the best ride Disney has made." },
    { n: "Tokyo Disneyland", s: "Chiba, 1983 \u00b7 been", c: "#8fd8f0", d: "M12 3l7 6v11H5V9z M8 20v-6h8v6 M4 9h16", note: "The first Disney park outside America, and the standard of upkeep genuinely embarrasses the US resorts. A covered World Bazaar instead of Main Street, because it rains." },
    { n: "Tokyo DisneySea", s: "Chiba, 2001 \u00b7 been", c: "#4fb8d0", d: "M12 4c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z M3 20c3-2 5 2 9 0s6-2 9 0", note: "Widely held to be the best theme park on earth and I am not going to argue. Seven nautical ports, a volcano you ride into, and Mediterranean Harbour at night is unmatched anywhere." },
    { n: "Paris, Hong Kong, Shanghai", s: "Not yet", c: "#8f98a8", d: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z M12 8v5 M12 16v.01", note: "The four I have not done. Paris has the prettiest castle by a distance and Phantom Manor instead of the Haunted Mansion; Shanghai has the biggest castle and TRON, which Florida then copied." },
  ],
};
