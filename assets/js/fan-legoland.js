/* fan-legoland.js: content for /worlds/legoland/. Rendered by fanpage.js.
   A park built next to the factory because too many people kept turning up to
   watch the bricks being moulded. */
/* Everything personal on this page is read off the photographs, which is
   what Abubakr asked for: twenty-five frames of Carlsbad in the library. The
   first is October 2010, with the brick-built Darth Vader; five visits fall
   between June and October 2016, in the opening year of NINJAGO World, and
   that is where the dojo doors, the golden weapons, Master Wu, Jay's drill,
   Kai's spinner, Cole's climb, the elemental dragons, the ride entrance, the
   Hoth diorama, the Driving School car and the Sky Patrol helicopter all come
   from; the last two are the hotel in July 2020. The ◆ marks follow the
   photographs and nothing else. */
window.FAN_PAGE = {
  when: { at: 'Since I was small; most of it in 2016',
          note: 'Carlsbad. The first photograph is from October 2010, five visits are from June to October 2016, and the hotel is from July 2020.' },
  sections: [

  { id: 'parks', kind: 'timeline', title: 'The Resorts', note: 'eleven, and the first one was an accident',
    lede: 'Billund opened because the factory could not stop people coming to look at it. Everything after that is the same idea exported, and the newest one is bigger than the original by a factor of about ten.',
    items: [
      { when: '1968', title: 'LEGOLAND Billund · Denmark',
        desc: 'Next door to the original factory in Jutland. Godtfred Kirk Christiansen built it because visitors kept arriving to watch the moulding machines and there was nowhere to put them. Six hundred and twenty-five thousand people came in the first year, to a town of about six thousand.' },
      { when: '1996', title: 'LEGOLAND Windsor · England',
        desc: 'The second one, twenty-eight years later, on the site of an old safari park. Miniland here is Europe rather than one country.' },
      { when: '1999', title: 'LEGOLAND California · Carlsbad',
        desc: 'The first outside Europe, an hour up the coast from San Diego. The one I know. Miniland USA is the largest section and it is what the park is arranged around.' },
      { when: '2002', title: 'LEGOLAND Deutschland · Günzburg',
        desc: 'Between Munich and Stuttgart, and the busiest of the European parks.' },
      { when: '2011', title: 'LEGOLAND Florida · Winter Haven',
        desc: 'Built on the bones of Cypress Gardens, which was Florida’s oldest theme park. Several of the original botanical gardens are still in it.' },
      { when: '2012 · 2016', title: 'Malaysia, then Dubai',
        desc: 'Johor Bahru in 2012, the first in Asia, and then Dubai in 2016 inside the Dubai Parks and Resorts complex.' },
      { when: '2017 · 2021', title: 'Japan, then New York',
        desc: 'Nagoya on reclaimed waterfront land, and then Goshen in the Hudson Valley, which opened into the middle of a pandemic.' },
      { when: '2022 · 2025', title: 'Korea, then Shanghai',
        desc: 'Chuncheon on an island in the Bukhan river, and then Shanghai, which is the largest LEGOLAND ever built.' },
    ] },

  { id: 'miniland', kind: 'cards', title: 'Miniland', note: 'the actual point of the place',
    lede: 'Every LEGOLAND is arranged around one section, and it is not a ride. It is a set of cities laid out at one twentieth scale, and it is the only thing in the park that could not exist anywhere else.',
    items: [
      { title: 'One to twenty', sub: 'The scale, everywhere', tag: 'The rule', accent: '#f5d222',
        desc: 'Every Miniland in every park is built at 1:20, which is roughly the scale at which a minifigure is a person. It means a six-storey building is about a metre, and a city block is a table.',
        meta: 'A minifigure is a person at this scale' },
      { title: 'Millions of pieces', sub: 'And a model shop on site', tag: 'The build', accent: '#e0452f',
        desc: 'Carlsbad’s Miniland is around thirty million bricks. Every park keeps its own model shop with full-time builders, because the models are outdoors and the sun and the visitors take a constant toll on them.',
        meta: 'Full-time builders, permanently' },
      { title: 'It is glued', sub: 'And that is a real decision', tag: 'The compromise', accent: '#2f5fd6',
        desc: 'Models this size outdoors have to be bonded or they come apart. It is the one place the company breaks its own principle that a brick should always come off again, and they are quite quiet about it.',
        meta: 'The one place the clutch is beaten' },
      { title: 'Star Wars, until 2020', sub: 'Hoth, Naboo, and the AT-ATs', tag: 'Carlsbad', accent: '#c9ced6',
        desc: 'The California park had a separate Miniland Star Wars section with the major battles built out at scale, from March 2011 to January 2020. There are photographs of the Hoth diorama and the AT-ATs in my library from 2016.',
        meta: 'Closed in 2020' },
      { title: 'It changes', sub: 'The cities get updated', tag: 'The upkeep', accent: '#7fc86a',
        desc: 'New buildings go up in the real cities and eventually go up in Miniland too. It is the only part of a theme park that has to be edited to stay accurate rather than just maintained.',
        meta: 'Edited, not just maintained' },
    ] },

  { id: 'lands', kind: 'lands', title: 'Inside Carlsbad', note: 'the areas, and what is in them',
    lede: 'Twelve areas on about a hundred and eighty acres, plus a water park and an aquarium next door. It is a park built for people who are eight, and it does not pretend otherwise, which is why it is better at it than the parks that hedge.',
    items: [
      { title: 'Miniland USA', sub: 'The centre of the park', unit: 'section',
        desc: 'Seven American regions at 1:20, and the thing everything else is arranged around. Star Wars is in my photographs twice: with the life-size brick Darth Vader in October 2010, five months before the Miniland section itself opened, and on Hoth in 2016.',
        rides: [
          { n: 'Washington, D.C.', y: '' },
          { n: 'New York City', y: '' },
          { n: 'New Orleans', y: '' },
          { n: 'California coastline', y: '' },
          { n: 'Las Vegas', y: '' },
          { n: 'Coast Cruise', y: 'boat ride' },
          { n: 'Miniland Star Wars', y: '2011', big: true, gone: '2011 – 2020' },
        ] },
      { title: 'LEGO Ninjago World', sub: 'Opened 2016', unit: 'attraction',
        desc: 'Built around the interactive ride, and the area most of my photographs from 2016 are of: the opening year, in June and July, with the four dojo doors, the golden weapons lit up, Master Wu, and the courtyard of training games.',
        rides: [
          { n: 'LEGO Ninjago The Ride', y: '2016', big: true },
          { n: 'Kai’s Spinners', y: '2016', big: true },
          { n: 'Jay’s Lightning Drill', y: '2016', big: true },
          { n: 'Cole’s Rock Climb', y: '2016', big: true },
          { n: 'Zane’s Temple Build', y: '2016', big: true },
          { n: 'The elemental dragons', y: '2016', big: true },
        ] },
      { title: 'Castle Hill', sub: 'The medieval end', unit: 'attraction',
        desc: 'The park’s only proper roller coaster, and the arm.',
        rides: [
          { n: 'The Dragon', y: '1999', big: true },
          { n: 'Knights’ Tournament', y: '2006' },
          { n: 'Royal Joust', y: '1999' },
          { n: 'Merlin’s Challenge', y: '1999' },
          { n: 'Enchanted Walk', y: '1999' },
        ] },
      { title: 'Fun Town', sub: 'The one everybody remembers', unit: 'attraction',
        desc: 'The Driving School is the reason a lot of children ask to come back, and the licence they hand you at the end is the souvenir. I am in car 15, in August 2016.',
        rides: [
          { n: 'Driving School', y: '1999', big: true },
          { n: 'Junior Driving School', y: '1999' },
          { n: 'Boating School', y: '1999' },
          { n: 'Rescue Academy', y: '1999' },
          { n: 'Skipper School', y: '2018' },
        ] },
      { title: 'Dino Valley', sub: 'Formerly Land of Adventure', unit: 'attraction',
        desc: 'Rebuilt in 2021 around the dinosaurs, and the coaster in it is the small one.',
        rides: [
          { n: 'Coastersaurus', y: '2004' },
          { n: 'Dino Dig', y: '2021' },
          { n: 'Swamp Boat Adventure', y: '2021' },
        ] },
      { title: 'LEGO Movie World', sub: 'Opened 2021', unit: 'attraction',
        desc: 'The newest area, built on the site of the old Explore Village.',
        rides: [
          { n: 'Emmet’s Flying Adventure Ride', y: '2021' },
          { n: 'Unikitty’s Disco Drop', y: '2021' },
          { n: 'Battle of Bricksburg', y: '2021' },
        ] },
      { title: 'The Rest Of It', sub: 'six more areas', unit: 'area',
        desc: 'Fun Town, Pirate Shores, Heartlake City, Imagination Zone, Duplo Village and The Beginning, plus the two gates next door. The Sky Patrol helicopter is October 2016; the hotel, the Adventure room and the brick Lloyd in the lobby are July 2020.',
        rides: [
          { n: 'Fun Town · Sky Patrol, Sky Cruiser, Fairy Tale Brook', y: '', big: true },
          { n: 'Pirate Shores · Splash Battle, Pirate Reef', y: '' },
          { n: 'Heartlake City · Mia’s Riding Adventure', y: '2014' },
          { n: 'Imagination Zone · Aquazone Wave Racers', y: '' },
          { n: 'Duplo Village · for the very small', y: '' },
          { n: 'SEA LIFE Aquarium', y: '2008' },
          { n: 'LEGOLAND Water Park', y: '2010' },
          { n: 'LEGOLAND Hotel', y: '2013', big: true },
        ] },
    ] },

  /* the complete index. On a park page this is the chain rather than a
     filmography: every resort, every discovery centre, and the two hotels. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the whole chain',
    lede: 'Eleven parks, and a much larger number of the small indoor version, which is the format the company actually expands with now.',
    items: [
      { title: 'The Resorts', sub: '1968 – 2025', unit: 'park',
        desc: 'In opening order. The Carlsbad one is the one in my photographs, and the only one I have been to.',
        rows: [
          { n: 'LEGOLAND Billund · Denmark', y: '1968' },
          { n: 'LEGOLAND Windsor · England', y: '1996' },
          { n: 'LEGOLAND California · Carlsbad', y: '1999', big: true },
          { n: 'LEGOLAND Deutschland · Günzburg', y: '2002' },
          { n: 'LEGOLAND Florida · Winter Haven', y: '2011' },
          { n: 'LEGOLAND Malaysia · Johor Bahru', y: '2012' },
          { n: 'LEGOLAND Dubai', y: '2016' },
          { n: 'LEGOLAND Japan · Nagoya', y: '2017' },
          { n: 'LEGOLAND New York · Goshen', y: '2021' },
          { n: 'LEGOLAND Korea · Chuncheon', y: '2022' },
          { n: 'LEGOLAND Shanghai', y: '2025' },
        ] },
      { title: 'Closed Or Never Built', sub: 'the ones that did not last', unit: 'park',
        desc: 'One park has closed in the chain’s history, and it is the one nobody remembers.',
        rows: [
          { n: 'LEGOLAND Sierksdorf · Germany', y: '1973', gone: 'closed 1976' },
        ] },
      { title: 'The Small Format', sub: 'Discovery Centres', unit: 'centre',
        desc: 'Indoor, about two hours long, and there are now over thirty of them worldwide. It is how the brand actually reaches most cities.',
        rows: [
          { n: 'First one · Duisburg, Germany', y: '2007' },
          { n: 'Over thirty worldwide since', y: '2026' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks',
    lede: 'A park does not really have a theme tune, so these are the two pieces of music the place actually plays at you. Nothing here is on a playlist yet.',
    items: [
      { title: 'Everything Is Awesome', accent: '#f5d222', sub: 'Tegan and Sara feat. The Lonely Island · 2014 · 2:47',
        desc: 'From the film, and now unavoidable in every LEGOLAND on earth. Nominated for an Academy Award, which is genuinely funny given what the song is about.',
        href: 'https://www.youtube.com/watch?v=StTqXEQ2l-Y', link: 'Listen' },
      { title: 'Everything Is Awesome (Instrumental)', accent: '#e0452f', sub: 'Mark Mothersbaugh · 2014 · 3:27',
        desc: 'The same tune as it sits in the actual score under the film, which is much better than the song it is remembered for.',
        href: 'https://www.youtube.com/watch?v=Vt4bG6wr1co', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'LEGOLAND California', href: 'https://www.legoland.com/california/',
        desc: 'The Carlsbad park: hours, the map, and what is currently standing.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Legoland',
        desc: 'The whole chain, from the factory car park in 1968 to Shanghai.' },
      { title: 'The LEGO page here', href: '/worlds/lego/',
        desc: 'The brick itself, the sets, the games and the films. This page is only the parks.' },
    ] },

] };
