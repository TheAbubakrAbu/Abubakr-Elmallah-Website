/* fan-universal.js: content for /worlds/universal-studios/. Rendered by fanpage.js.
   Every destination card links to its own official site. */
window.FAN_PAGE = {
  when: { at: 'First visit 2015; properly 7th\u20138th grade, 2018\u201320', note: 'We went for three days about a year before the Wizarding World opened; I did not know a thing about Harry Potter yet. Transformers and Jurassic were what got me, and I really fell for the place in seventh and eighth grade.' },
  sections: [

  /* `been: true` turns on the seventh card row: the "I went here" stamp and,
     under it, my own photograph from that park (photos-data.js). Six of the
     eight have one; Epic Universe and Beijing carry neither, which is the
     honest way round. */
  { id: 'parks', kind: 'cards', title: 'The Parks', note: 'Universal Destinations & Experiences', been: true,
    lede: 'Every Universal park and resort open or announced, with the parks inside each one, and whether I have actually been.',
    items: [
      { title: 'Universal Studios Hollywood', sub: 'Los Angeles · 1964', tag: 'Original', desc: 'A working studio you can ride through. The Studio Tour is older than the theme park around it, and still the point of the place.',
        href: 'https://www.universalstudioshollywood.com/', link: 'universalstudioshollywood.com', meta: 'Studio Tour · Super Nintendo World',
        been: true, beenWhen: '2020, 2021, 2025', photo: 'ms-middle/2020-06-14-1251.avif',
        photoAlt: 'the Universal Studios Hollywood globe', photoCap: 'The globe, June 2020' },
      { title: 'Universal Orlando Resort', sub: 'Florida · 1990', tag: 'Resort', desc: 'Universal Studios Florida, Islands of Adventure, Volcano Bay, and since 2025 Epic Universe: the biggest single park expansion the company has done.',
        href: 'https://www.universalorlando.com/', link: 'universalorlando.com', meta: '4 parks · CityWalk',
        been: true, beenWhen: 'Dec 2020', photo: 'hs-freshman/2020-12-25-1347.avif',
        photoAlt: 'Hogwarts Castle at Islands of Adventure', photoCap: 'Hogsmeade, Christmas 2020' },
      { title: 'Epic Universe', sub: 'Orlando · 2025', tag: 'Newest', desc: 'Five worlds around a central hub: Super Nintendo World, the Wizarding World’s Ministry of Magic, How to Train Your Dragon, Dark Universe and Celestial Park.',
        href: 'https://www.universalorlando.com/web/en/us/theme-parks/epic-universe', link: 'Epic Universe', meta: 'Opened 22 May 2025' },
      { title: 'Universal Studios Japan', sub: 'Osaka · 2001', tag: 'International', desc: 'The park that got Super Nintendo World first, and runs the best seasonal events of any Universal park.',
        href: 'https://www.usj.co.jp/en/', link: 'usj.co.jp', meta: 'Osaka Bay',
        been: true, beenWhen: 'July 2026', photo: 'uci-second/2026-07-21-1549.avif',
        photoAlt: 'the Super Nintendo World warp pipe at Universal Studios Japan', photoCap: 'Super Nintendo World' },
      { title: 'Universal Studios Singapore', sub: 'Sentosa · 2010', tag: 'International', desc: 'Inside Resorts World Sentosa: the most compact of them, with Minion Land and a Jurassic Park river ride.',
        href: 'https://www.rwsentosa.com/en/attractions/universal-studios-singapore', link: 'rwsentosa.com', meta: '7 zones',
        been: true, beenWhen: 'Jan 2024', photo: 'hs-senior/2024-01-05-1900.avif',
        photoAlt: 'the globe at Universal Studios Singapore', photoCap: 'The globe, Sentosa' },
      { title: 'Universal Beijing Resort', sub: 'Tongzhou · 2021', tag: 'International', desc: 'The largest Universal park by area, with a Kung Fu Panda land that exists nowhere else.',
        href: 'https://www.universalbeijingresort.com/', link: 'universalbeijingresort.com', meta: '7 lands' },
      { title: 'Universal Kids Resort', sub: 'Frisco, Texas · 2026', tag: 'Announced', desc: 'A smaller park built specifically for younger families, the first of its kind for the company.',
        href: 'https://www.universalkidsresort.com/', link: 'universalkidsresort.com', meta: 'Under construction' },
      { title: 'Universal Destinations', sub: 'The hub', tag: 'Official', desc: 'One page for every park, plus Horror Unleashed in Las Vegas and the announced UK resort in Bedford.',
        href: 'https://www.universaldestinationsandexperiences.com/', link: 'universaldestinationsandexperiences.com', meta: 'NBCUniversal' },
    ] },

  { id: 'lands', kind: 'tiles', title: 'The Lands', note: 'what Universal builds better than anyone',
    items: [
      { title: 'The Wizarding World', accent: '#c9a05f', sub: 'Since 2010', desc: 'Hogsmeade, Diagon Alley, a train between them in Orlando, and the land that reset what a theme park could be.' },
      { title: 'Super Nintendo World', accent: '#e04a3a', sub: 'Since 2021', desc: 'A Power-Up Band on your wrist turns the whole land into a game with a score.' },
      { title: 'Jurassic Park / World', accent: '#7fb04f', sub: 'Since 1996', desc: 'The River Adventure, the VelociCoaster, and the gates with the torches.' },
      { title: 'The Studio Tour', accent: '#8fb0d0', sub: 'Since 1964', desc: 'Hollywood only. Backlot streets, King Kong 360, and the Psycho house on the hill.' },
      { title: 'Halloween Horror Nights', accent: '#a04fd0', sub: 'Since 1991', desc: 'Original mazes plus licensed ones, and the busiest nights of the year at three of the parks.' },
      { title: 'Minion Land', accent: '#f0c840', sub: 'Since 2012', desc: 'Illumination’s side of the business, and the most profitable animation studio in the group.' },
    ] },

  { id: 'rides', kind: 'cards', title: 'The Rides', note: 'what Universal actually builds',
    items: [
      { title: 'Forbidden Journey', sub: '2010', tag: 'Wizarding World', desc: 'A robotic arm on a track, inside Hogwarts, and the ride system that made every other park rethink what a dark ride could do.',
        href: 'https://www.universalorlando.com/', link: 'universalorlando.com', meta: 'Orlando · Hollywood · Japan' },
      { title: 'Escape from Gringotts', sub: '2014', tag: 'Wizarding World', desc: 'A coaster, a dark ride and a 3D projection show at once, reached through a bank lobby with animatronic goblins in it.', meta: 'Orlando' },
      { title: 'Hagrid\u2019s Motorbike Adventure', sub: '2019', tag: 'Coaster', desc: 'Seven launches, a vertical drop track, and queue times that stayed over two hours for years.', meta: 'Islands of Adventure' },
      { title: 'VelociCoaster', sub: '2021', tag: 'Coaster', desc: 'Widely rated the best coaster in America. Two launches, a stall over the lagoon, and a raptor paddock queue.', meta: 'Islands of Adventure' },
      { title: 'Mario Kart', sub: '2021', tag: 'Super Nintendo World', desc: 'Augmented reality visors on a trackless ride where you actually steer and throw shells. Nobody else has attempted this.', meta: 'Japan · Hollywood · Orlando' },
      { title: 'The Studio Tour', sub: '1964', tag: 'Hollywood', desc: 'An hour on a tram through working backlot streets, the Psycho house, the flash flood, King Kong 360 and Fast & Furious. The oldest thing on the property.',
        href: 'https://www.universalstudioshollywood.com/', link: 'universalstudioshollywood.com', meta: 'Hollywood only' },
    ] },

  { id: 'studio', kind: 'timeline', title: 'The Studio', note: 'Universal Pictures, since 1912',
    items: [
      { when: '1912', title: 'Carl Laemmle founds it', desc: 'One of the oldest surviving film studios in the world, and the first to open its backlot to visitors.' },
      { when: '1931 – 1954', title: 'The Universal Monsters', desc: 'Dracula, Frankenstein, the Mummy, the Wolf Man, the Creature: the shared universe that predates all the others by eighty years.',
        href: 'https://www.universalstudiosentertainment.com/', link: 'universalstudiosentertainment.com' },
      { when: '1975 · 1993', title: 'Jaws, then Jurassic Park', desc: 'Spielberg invents the summer blockbuster, then twenty years later invents the modern effects film.' },
      { when: '2001 – now', title: 'The Fast Saga & Illumination', desc: 'Ten films about family, and a minion-shaped money printer.' },
      { when: '2025', title: 'Epic Universe opens', desc: 'The first entirely new major theme park in Orlando since 1999.' },
    ] },


  { id: 'visited', kind: 'stats', title: 'Where I Have Actually Been', note: 'six of the eight',
    items: [
      { title: '6 of 8', sub: 'Parks visited', desc: 'Hollywood, both Orlando gates, Volcano Bay, Japan and Singapore.' },
      { title: '4 of 6', sub: 'Resorts visited', desc: 'Only Beijing and the new Epic Universe left.' },
      { title: '3', sub: 'Continents', desc: 'North America and two stops in Asia.' },
      { title: '1964 \u2013 2017', sub: 'Opening range', desc: 'From the original Hollywood tram tour to Volcano Bay.' },
    ] },

  { id: 'hollywood', kind: 'cards', title: 'Universal Studios Hollywood', note: 'California \u00b7 been', been: true,
    lede: 'The original, and the only one that is a real working studio. Films are shot on that backlot while people ride past it, which no other park on earth can offer, and the tram tour is still the thing that makes this place different rather than just smaller.',
    items: [
      { title: 'The Studio Tour', sub: 'Since 1964', tag: '\u2713 Been', accent: '#f0a83a',
        desc: 'An hour on a tram through actual standing sets, the Bates Motel, the flash flood, the plane crash from War of the Worlds. It is the oldest thing here and still the best reason to come.',
        meta: 'The real backlot',
        been: true, beenWhen: '2020, 2021, 2025', photo: 'uci-first/2025-03-30-1101.avif',
        photoAlt: 'wearing the Mario Kart augmented-reality visor at Super Nintendo World',
        photoCap: 'Mario Kart, in the visor' },
      { title: 'What got me first', sub: 'Transformers and Jurassic', tag: 'Personal', accent: '#c9a05f',
        desc: 'We came for three days about a year before the Wizarding World opened, and I did not know a thing about Harry Potter yet. Transformers: The Ride and Jurassic Park are what I actually remember, and they are why I kept coming back.',
        meta: 'My first Universal' },
      { title: 'Built up a hill', sub: 'Upper and Lower Lots', tag: 'The layout', accent: '#a8763a',
        desc: 'Split across two levels joined by a very long escalator, which is a genuinely odd way to lay out a theme park and entirely the fault of the terrain.',
        meta: 'The Starway' },
    ] },

  /* ── the local park, taken apart ──
     The Disney page does this for Anaheim; this is the same treatment for the
     other one down the freeway. `kind: 'lands'` is the only section kind that
     lists attractions one by one, and Hollywood needs it more than most
     because its geography is genuinely odd: the park is cut in half by a
     hillside, and which lot a land is on tells you more about it than the year
     it opened does. See fanpage.js. */
  { id: 'ush-lands', kind: 'lands', title: 'Universal Studios Hollywood, Land by Land',
    note: 'eight areas · two lots · every ride in each',
    lede: 'This park is built up the side of a hill, which no theme park would ever choose. The Upper Lot has the gate, the tram and everything themed; the Lower Lot has the three big rides and is reached by the Starway, a stack of escalators that drops about a hundred feet and takes a few minutes each way. Diamonds are the headliners.',
    items: [
      { title: 'The Studio Tour', sub: 'Upper Lot · 1964', accent: '#f0a83a',
        desc: 'Older than the theme park built around it, and still the reason to come. An hour on a tram through standing sets that films are genuinely shot on, with set pieces triggered along the way.',
        rides: [
          { n: 'King Kong 360 3-D', y: '2010', big: true },
          { n: 'Fast & Furious: Supercharged', y: '2015', big: true },
          { n: 'The backlot streets', y: '1964' },
          { n: 'The Bates Motel and the Psycho house', y: '1964' },
          { n: 'Jaws', y: '1976' },
          { n: 'Earthquake: The Big One', y: '1989' },
          { n: 'The War of the Worlds crash site', y: '2005' },
        ] },
      { title: 'The Wizarding World of Harry Potter', sub: 'Upper Lot · 2016', accent: '#c9a05f',
        desc: 'Hogsmeade and the castle, which is the thing you see from the freeway. Hollywood got it six years after Orlando and built it into the far corner of the Upper Lot, so you turn a bend and it is simply there.',
        rides: [
          { n: 'Harry Potter and the Forbidden Journey', y: '2016', big: true },
          { n: 'Flight of the Hippogriff', y: '2016' },
          { n: 'Ollivanders', y: '2016' },
          { n: 'The Nighttime Lights at Hogwarts Castle', y: '2016' },
        ] },
      { title: 'Super Nintendo World', sub: 'Upper Lot · 2023', accent: '#e04a3a',
        desc: 'Osaka built it first in 2021 and Hollywood got the second one. The Power-Up Band on your wrist turns the land itself into a game with a score, which nobody else has attempted.',
        rides: [
          { n: 'Mario Kart: Bowser’s Challenge', y: '2023', big: true },
          { n: 'Power-Up Band Key Challenges', y: '2023' },
          { n: 'Toadstool Cafe', y: '2023' },
        ] },
      { title: 'Springfield, U.S.A.', sub: 'Upper Lot · 2015', accent: '#f0c840',
        desc: 'The ride came first in 2008 and the town was built around it seven years later. Moe’s and Krusty Burger actually serve you, which is most of the joke.',
        rides: [
          { n: 'The Simpsons Ride', y: '2008', big: true },
          { n: 'Kang & Kodos’ Twirl ’n’ Hurl', y: '2015' },
          { n: 'Moe’s Tavern', y: '2015' },
          { n: 'Krusty Burger', y: '2015' },
        ] },
      { title: 'The shows', sub: 'Upper Lot', accent: '#5fb0d0',
        desc: 'Not a land, but the Upper Lot has always run on live shows in a way the Florida parks do not, and one of them has been going for thirty years.',
        rides: [
          { n: 'WaterWorld: A Live Sea War Spectacular', y: '1995', big: true },
          { n: 'DreamWorks Theatre', y: '2018' },
          { n: 'Universal’s Animal Actors', y: '1988' },
        ] },
      { title: 'Jurassic World', sub: 'Lower Lot · 1996', accent: '#7fb04f',
        desc: 'Opened as Jurassic Park: The Ride in 1996 with the biggest drop of any water ride at the time, and rebuilt in 2019 into the Jurassic World version. Same eighty-four-foot fall at the end.',
        rides: [
          { n: 'Jurassic World: The Ride', y: '2019', big: true },
          { n: 'Raptor Encounter', y: '2015' },
          { n: 'DinoPlay', y: '2019' },
          { n: 'Jurassic Park: The Ride', gone: 'gone, 1996–2018' },
        ] },
      { title: 'Transformers', sub: 'Lower Lot · 2012', accent: '#6f9fd0',
        desc: 'One ride and no land to speak of, and it is the thing that got me the first time I came. A motion base on a track through 3D screens, and it still holds up.',
        rides: [
          { n: 'Transformers: The Ride-3D', y: '2012', big: true },
        ] },
      { title: 'Revenge of the Mummy', sub: 'Lower Lot · 2004', accent: '#a86f3a',
        desc: 'An indoor coaster that starts as a dark ride, launches backwards, and pretends to end twice. It took the building E.T. used to fly out of.',
        rides: [
          { n: 'Revenge of the Mummy: The Ride', y: '2004', big: true },
          { n: 'E.T. Adventure', gone: 'gone, 1991–2003' },
        ] },
    ] },

  { id: 'orlando', kind: 'cards', title: 'Universal Orlando', note: 'Florida \u00b7 been to everything except Epic Universe', been: true,
    lede: 'The best Universal resort, and the argument for Florida in one place. Two theme parks joined by a real Hogwarts Express, a water park built inside a volcano, and now a third gate I have not done yet.',
    items: [
      { title: 'Universal Studios Florida', sub: '1990', tag: '\u2713 Been', accent: '#f0a83a',
        desc: 'Diagon Alley, which is the single best-realised themed land anywhere including anything Disney has built. Gringotts, the dragon on the roof, and the alley being hidden behind a London facade so you have to find it.',
        meta: 'Diagon Alley',
        been: true, beenWhen: 'Dec 2020', photo: 'hs-freshman/2020-12-24-1630.avif',
        photoAlt: 'Potage\u2019s Cauldron Shop in Diagon Alley', photoCap: 'Potage\u2019s Cauldron Shop' },
      { title: 'Islands of Adventure', sub: '1999', tag: '\u2713 Been', accent: '#f0c840',
        desc: 'Hogsmeade, Jurassic Park, Marvel Super Hero Island, and VelociCoaster, one of the best roller coasters on earth and the strongest single argument for this resort over Hollywood.',
        meta: 'VelociCoaster',
        been: true, beenWhen: 'Dec 2020', photo: 'hs-freshman/2020-12-25-1347.avif',
        photoAlt: 'Hogwarts Castle over Hogsmeade at Islands of Adventure', photoCap: 'Hogwarts, from the boardwalk' },
      { title: 'Volcano Bay', sub: '2017', tag: '\u2713 Been', accent: '#5fb0d0',
        desc: 'A water park built around a 200-foot volcano, with a virtual queue system so you are not standing on hot concrete all day. Genuinely well thought through.',
        meta: 'Krakatau', been: true },
      { title: 'Epic Universe', sub: '2025', tag: 'Not yet', accent: '#8f98a8',
        desc: 'The one I have not done. First entirely new major US park in decades: Super Nintendo World, the Ministry of Magic, Isle of Berk and Dark Universe around a central portal hub. Top of the list.',
        meta: 'Still to go' },
    ] },

  { id: 'asia', kind: 'cards', title: 'Japan and Singapore', note: 'both been', been: true,
    items: [
      { title: 'Universal Studios Japan', sub: 'Osaka, 2001', tag: '\u2713 Been', accent: '#f0a83a',
        desc: 'Where Super Nintendo World opened first, in 2021, years before America got it. Also the busiest Universal park in the world and it feels like it.',
        meta: 'Super Nintendo World first',
        been: true, beenWhen: 'July 2026', photo: 'uci-second/2026-07-21-1444.avif',
        photoAlt: 'the Discovery Restaurant T. rex in Jurassic Park at Universal Studios Japan',
        photoCap: 'Jurassic Park, Osaka' },
      { title: 'Universal Studios Singapore', sub: 'Sentosa, 2010', tag: '\u2713 Been', accent: '#c9a05f',
        desc: 'The smallest of them, on a resort island, and the only one with Battlestar Galactica: Human vs Cylon, duelling coasters launched side by side.',
        meta: 'On Sentosa Island',
        been: true, beenWhen: 'Jan 2024', photo: 'hs-senior/2024-01-05-1320.avif',
        photoAlt: 'the Jurassic Park gate at Universal Studios Singapore',
        photoCap: 'The Lost World gate' },
      { title: 'Universal Beijing', sub: '2021', tag: 'Not yet', accent: '#8f98a8',
        desc: 'The largest Universal park by area, with a Kung Fu Panda land that exists nowhere else. Not done it.',
        meta: 'Still to go' },
    ] },

  { id: 'florida', kind: 'cards', title: 'Florida Is The Best One', note: 'and Epic Universe settled it',
    lede: 'Hollywood is the real studio: an actual working backlot with a tram going through it, and that is genuinely special. But Orlando is the better resort by a distance, and Epic Universe ended the argument in 2025.',
    items: [
      { title: 'Three parks now', sub: 'Universal Orlando', tag: 'Scale', accent: '#f0a83a',
        desc: 'Universal Studios Florida, Islands of Adventure, and Epic Universe. Hollywood is one park built up the side of a hill, with the tram doing a lot of the work.',
        meta: 'Plus Volcano Bay' },
      { title: 'Epic Universe', sub: '2025', tag: 'The clincher', accent: '#f0c840',
        desc: 'The first entirely new major park in the US in decades. Super Nintendo World, the Ministry of Magic, How to Train Your Dragon’s Isle of Berk, and Dark Universe, all around a central portal hub.',
        meta: 'Four lands and a hub' },
      { title: 'Two Wizarding Worlds', sub: 'And a train between them', tag: 'Only here', accent: '#c9a05f',
        desc: 'Hogsmeade in Islands of Adventure, Diagon Alley in Universal Studios, and a real Hogwarts Express running between the two parks with different scenes each way. Hollywood has Hogsmeade and that is it.',
        meta: 'Now three, with the Ministry' },
      { title: 'VelociCoaster', sub: 'Islands of Adventure', tag: 'Only here', accent: '#3fbf6f',
        desc: 'One of the best roller coasters on Earth, and the single strongest argument for the Florida resort over the California one.',
        meta: '70 mph · four inversions' },
    ] },

  /* the music: the fanfare, which is the closest thing a studio has to a theme */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'one track · the fanfare',
    lede: 'A studio does not have a theme, but it has a logo, and this one has had music under it since 1997: the globe turning, and thirty seconds of brass before every film.',
    items: [
      { title: 'Universal Pictures Fanfare', accent: '#f0a83a', sub: 'Jerry Goldsmith · 1997 · 0:27',
        desc: 'Jerry Goldsmith, for the 1997 logo: the spinning globe and the fanfare every Universal film has opened with since. Brian Tyler re-recorded it, bigger, for the centenary in 2012.',
        href: 'https://www.youtube.com/watch?v=GyqThsI6ghY', link: 'Live' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Universal Studios Hollywood', href: 'https://www.universalstudioshollywood.com/',
        desc: 'The park, the backlot tram, and the Lower Lot.' },
      { title: 'Universal Orlando', href: 'https://www.universalorlando.com/',
        desc: 'The Florida resort, and Epic Universe.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Universal_Pictures',
        desc: 'The studio, founded 1912.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "Pick A Park",
  intro: "Six of the eight, across four resorts. Hollywood is the real studio; Orlando is the better resort. Pick one.",
  prompt: "Eight parks. Six done.",
  said: "%.",
  items: [
    { n: "Universal Studios Hollywood", s: "1964 \u00b7 been", c: "#f0a83a", d: "M4 15h16l-2 5H6z M6 15V9h12v6 M9 12h2 M13 12h2 M12 4v5", note: "The original and the only one that is a real working studio: films get shot on that backlot while people ride past it. Transformers and Jurassic are what got me first, years before I knew what the Wizarding World was." },
    { n: "Universal Studios Florida", s: "1990 \u00b7 been", c: "#f0a83a", d: "M4 20h16 M6 20V8h12v12 M9 12h2 M13 12h2 M12 4l6 4H6z", note: "Diagon Alley, which is the best-realised themed land anywhere including anything Disney has built. Hidden behind a London facade so you have to find it, and there is a dragon on the roof." },
    { n: "Islands of Adventure", s: "1999 \u00b7 been", c: "#f0c840", d: "M3 18c4-3 6 3 9 0s5-3 9 0 M8 12a4 4 0 1 1 8 0c0 3-4 6-4 6s-4-3-4-6z", note: "Hogsmeade, Jurassic Park, Marvel Super Hero Island, and VelociCoaster, one of the best coasters on earth and the strongest argument for Florida over Hollywood." },
    { n: "Volcano Bay", s: "2017 \u00b7 been", c: "#5fb0d0", d: "M3 20h18 M12 5L6 20h12z M12 5v-2 M9 14c2 2 4 2 6 0", note: "A water park built around a two-hundred-foot volcano, with a virtual queue so you are not standing on hot concrete all day. Genuinely well thought through." },
    { n: "Universal Studios Japan", s: "Osaka, 2001 \u00b7 been", c: "#f0a83a", d: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", note: "Where Super Nintendo World opened first, in 2021, years before America got it. Also the busiest Universal park in the world, and it feels like it." },
    { n: "Universal Studios Singapore", s: "Sentosa, 2010 \u00b7 been", c: "#c9a05f", d: "M3 12h18 M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M12 3c3 4 3 14 0 18 M12 3c-3 4-3 14 0 18", note: "The smallest of them, on a resort island, and the only one with Battlestar Galactica: Human vs Cylon, duelling coasters launched side by side." },
    { n: "Epic Universe", s: "2025 \u00b7 not yet", c: "#8f98a8", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z M12 3v4 M12 17v4", note: "The one I have not done, and top of the list. First entirely new major US park in decades: Super Nintendo World, the Ministry of Magic, Isle of Berk and Dark Universe around a portal hub." },
    { n: "Universal Beijing", s: "2021 \u00b7 not yet", c: "#8f98a8", d: "M4 19h16 M6 19V11l6-4 6 4v8 M10 19v-4h4v4", note: "The largest Universal park by area, and it has a Kung Fu Panda land that exists nowhere else, which is genuinely annoying." },
  ],
};
