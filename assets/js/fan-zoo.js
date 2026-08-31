/* fan-zoo.js: content for /worlds/san-diego-zoo/. Rendered by fanpage.js.
   A hundred acres in Balboa Park that started with the animals nobody
   collected after the 1915 exposition packed up. */
/* The `when:` line is read off the photographs and off Abubakr's own words.
   The first frame is the Skyfari in August 2010, then the zoo gate in March
   2018; the Safari Park is July 2020, on the Africa Tram with a rhino at the
   rail, and again in January 2021. The Safari Park is the favourite, in his
   words: the cheetah, everything to do with a safari, the camels, the little
   blue compass, and the giant build-your-own Icee machine. The ◆ marks
   follow that and nothing else. */
window.FAN_PAGE = {
  when: { at: 'Since I was small; the Safari Park is the favourite',
          note: 'The first photograph is the Skyfari in August 2010. The Safari Park is the cheetah, the camels, the little blue compass and the giant Icee machine.' },
  sections: [

  { id: 'story', kind: 'timeline', title: 'How It Started', note: '1915 onward',
    lede: 'It began as a leftovers problem. The Panama-California Exposition brought animals to Balboa Park for two years, and when it closed in 1916 there was a small collection and nobody with a plan for it.',
    items: [
      { when: '1915', title: 'The exposition',
        desc: 'San Diego threw a two-year world’s fair in Balboa Park to mark the opening of the Panama Canal, and part of it was a set of animal exhibits, including a few bears and some lions in cages on the grounds.' },
      { when: '1916', title: 'A surgeon hears a lion',
        desc: 'Harry M. Wegeforth, a local physician, was driving past with his brother, heard a lion roaring from the exposition grounds and said out loud that the city ought to build a zoo. He founded the Zoological Society of San Diego that October.' },
      { when: '1922', title: 'The permanent site',
        desc: 'The society got a hundred acres of canyon in Balboa Park, which is why the zoo is built up and down slopes rather than on a flat grid. The terrain is the reason for the Skyfari and for the bus.' },
      { when: '1920s', title: 'Cages come down early',
        desc: 'Wegeforth pushed moated, open enclosures decades before it was standard practice anywhere, partly on the argument that the climate allowed it. It is the thing the zoo is most historically important for.' },
      { when: '1969', title: 'The Skyfari',
        desc: 'A Swiss-built aerial tramway strung across the main canyon, which remains the only way to actually read the shape of the place. Still running, and it is the first photograph I have of this place: August 2010, in the gondola, small.' },
      { when: '1972', title: 'The Safari Park',
        desc: 'Eighteen hundred acres at Escondido, thirty miles north, opened as the San Diego Wild Animal Park. Same institution, fences moved a very long way out, and it exists mainly as breeding space. The favourite of the two, by a distance.' },
      { when: '1987', title: 'The condors',
        desc: 'The last wild California condor was taken into captivity, leaving twenty-seven birds alive on earth. San Diego and Los Angeles ran the breeding programme between them. There are now more than five hundred, and over half of those are flying.' },
      { when: '1996 · 2019 · 2024', title: 'Pandas, and then no pandas, and then pandas',
        desc: 'Giant pandas arrived on loan in 1996, and the zoo worked out enough about their reproduction that the technique spread everywhere. The last two went back to China in 2019. Two more, Yun Chuan and Xin Bao, arrived in 2024.' },
    ] },

  { id: 'places', kind: 'lands', title: 'Inside The Zoo', note: 'both sites, and what is in them',
    lede: 'It is organised by climate and terrain rather than by continent, which is why the map does not look like a world map. The canyon does most of the sorting.',
    items: [
      { title: 'Africa Rocks', sub: 'Opened 2017', unit: 'habitat',
        desc: 'The largest project the zoo has ever built, replacing enclosures that dated to the 1930s. Six African habitats along one canyon wall.',
        rides: [
          { n: 'Cape fynbos · African penguins', y: '' },
          { n: 'Madagascar forest · lemurs', y: '' },
          { n: 'Ethiopian highlands · geladas', y: '' },
          { n: 'Acacia woodland · leopards', y: '' },
          { n: 'Kopje · klipspringers, hyrax', y: '' },
          { n: 'West African forest', y: '' },
        ] },
      { title: 'Panda Ridge', sub: 'Reopened 2024', unit: 'species',
        desc: 'Empty from 2019 until 2024. The zoo’s panda research is the reason captive breeding works anywhere.',
        rides: [
          { n: 'Giant panda · Yun Chuan', y: '2024', big: true },
          { n: 'Giant panda · Xin Bao', y: '2024', big: true },
          { n: 'Red panda', y: '' },
          { n: "Chinese goral", y: '' },
        ] },
      { title: 'Elephant Odyssey', sub: 'Opened 2009', unit: 'species',
        desc: 'Built around the idea that everything in it has a fossil relative that lived in southern California, with the La Brea tar pits as the hook.',
        rides: [
          { n: 'African and Asian elephants', y: '' },
          { n: 'Jaguar', y: '' },
          { n: 'California condor', y: '', big: true },
          { n: 'Lion', y: '' },
          { n: 'Camel', y: '' },
        ] },
      { title: 'Lost Forest', sub: 'The canyon floor', unit: 'habitat',
        desc: 'The tropical section, and the coolest part of the zoo on a hot day because it is at the bottom.',
        rides: [
          { n: 'Gorilla Tropics', y: '1991' },
          { n: 'Scripps Aviary', y: '' },
          { n: 'Tiger Trail', y: '' },
          { n: 'Hippo Trail', y: '' },
          { n: 'Orangutans and siamangs', y: '' },
        ] },
      { title: 'Northern Frontier', sub: 'And Urban Jungle', unit: 'habitat',
        desc: 'The cold end and the walk between the two entrances.',
        rides: [
          { n: 'Polar Bear Plunge', y: '1996' },
          { n: 'Reindeer', y: '' },
          { n: 'Giraffe', y: '' },
          { n: 'Koala · the largest colony outside Australia', y: '', big: true },
        ] },
      { title: 'The Safari Park', sub: 'Escondido · the favourite', unit: 'thing',
        desc: 'The favourite, by a distance: eighteen hundred acres, a tram that loops the African field, and cheetahs with a straight to run on. Two visits are in my photographs, July 2020 on the tram with masks on and a rhino walking up to the rail, and January 2021.',
        rides: [
          { n: 'Africa Tram · the loop of the field', y: '', big: true },
          { n: 'Cheetah · the favourite animal', y: '', big: true },
          { n: 'The camels', y: '', big: true },
          { n: 'Giraffes and a rhino at the tram rail', y: '2020', big: true },
          { n: 'The giant build-your-own Icee machine', y: '', big: true },
          { n: 'The little blue compass', y: '', big: true },
          { n: 'Lion Camp', y: '2004' },
          { n: 'Condor Ridge', y: '2000' },
          { n: 'Walkabout Australia', y: '2018' },
          { n: 'Elephant Valley', y: '2026' },
        ] },
      { title: 'Getting Around', sub: 'the three ways', unit: 'ride',
        desc: 'The canyon is steep enough that how you move around it is a real decision.',
        rides: [
          { n: 'Skyfari Aerial Tram', y: '1969', big: true },
          { n: 'Guided Bus Tour', y: '' },
          { n: 'Kangaroo Express Bus', y: '' },
        ] },
    ] },

  { id: 'work', kind: 'cards', title: 'The Conservation Work', note: 'the part that is not a day out',
    lede: 'This is the argument for zoos, made about as well as it can be made. Two of these species would not exist without this institution.',
    items: [
      { title: 'The California condor', sub: 'Twenty-seven birds, in 1987', tag: 'The save', accent: '#7fc86a',
        desc: 'Every California condor alive was taken into captivity in 1987 because the wild population was down to twenty-two and falling. San Diego and Los Angeles bred them back. There are now over five hundred and more than half of them are flying free in California, Arizona and Baja.',
        meta: 'From twenty-seven to over five hundred' },
      { title: 'Giant panda reproduction', sub: 'Worked out here', tag: 'The method', accent: '#e8eef4',
        desc: 'Pandas were notoriously difficult to breed in captivity and San Diego did the endocrine work that made it reliable. Six cubs were born at the zoo between 1999 and 2012, and the technique is now used everywhere pandas are held.',
        meta: 'Six cubs, 1999 to 2012' },
      { title: 'The Frozen Zoo', sub: 'Since 1972', tag: 'The archive', accent: '#5fa3ec',
        desc: 'Living cell cultures from over eleven thousand individual animals across more than a thousand species, held in liquid nitrogen. It has already been used to clone a Przewalski’s horse and a black-footed ferret from cells frozen decades before either technique existed.',
        meta: 'Cells frozen before cloning was possible' },
      { title: 'The northern white rhino', sub: 'Two left, both female', tag: 'The hard case', accent: '#c9ced6',
        desc: 'The Safari Park holds cell lines from twelve individuals and is working on producing embryos from them with southern white surrogates. This is the honest version of what conservation looks like when it has already nearly failed.',
        meta: 'And the work is still going' },
      { title: 'Eighteen hundred acres', sub: 'The Safari Park', tag: 'The space', accent: '#e0a050',
        desc: 'Escondido exists so that herd animals can be kept in numbers large enough for the herd behaviour to be real, which is what breeding programmes actually need. It is not a bigger zoo, it is a different tool.',
        meta: 'Not a bigger zoo, a different tool' },
    ] },

  /* ── Rio ──
     This was its own tile and its own page until 2026-08-31, and it is here
     instead because this is where he actually met it: the zoo ran the film as
     a thing you could walk into, with the toys, and that is the memory. It
     earns the space twice over, because the bird the cartoon was about went
     extinct in the wild five years after the first film and was put back by
     exactly the kind of programme the section above this one is about.

     The first card is his, in his words: the tie-in is a childhood memory
     rather than something with a press release behind it, so it does not
     pretend to carry a date or a name it cannot prove. Everything after it is
     checkable and was written for the page this replaces. */
  { id: 'rio', kind: 'cards', title: 'Rio, At The Zoo', note: 'the tie-in, and the bird it was about',
    lede: 'The zoo ran Rio as something you could walk into: the film, the toys, the birds it was about, all in one place. It was one of the coolest things here as a kid, and it turned out to be about the most serious conservation story in the building.',
    items: [
      { title: 'The collaboration', sub: 'The films, as an attraction', tag: 'The memory', accent: '#3fc6a8',
        desc: 'Rio came to the zoo as a tie-in, with the toys and the film attached to the real macaws, which is a fair trade: the animals get the audience the cartoon brought them. This card is memory rather than record, so it carries no date.',
        meta: 'His own, and undated on purpose' },
      { title: 'The two films', sub: '2011 and 2014', tag: 'The films', accent: '#4a9ae8',
        desc: 'Blue Sky Studios made both and Carlos Saldanha directed both. He is from Rio, which is why the city in them has weather and traffic in it rather than a beach on a postcard: Corcovado kept small on its hill, the favelas as stacked colour up the slopes, the wave pattern in the Copacabana pavement that almost nobody animates.',
        meta: 'Real in Rio was nominated for an Oscar' },
      { title: 'The Spix’s macaw', sub: 'Cyanopsitta spixii', tag: 'The species', accent: '#5fa3ec',
        desc: 'A small blue macaw from one strip of dry caatinga along the Rio São Francisco in Bahia, and nowhere else. Named for Johann Baptist von Spix, who collected one in 1819 and shot it. The premise of a children’s cartoon, the last male of his species flown in to breed, was a live emergency at the time it was written.',
        meta: 'One valley in Bahia' },
      { title: 'Extinct in the wild', sub: '2019', tag: 'The finding', accent: '#e04a3a',
        desc: 'BirdLife International formally declared it extinct in the wild in 2019, five years after the sequel. The last known wild bird had gone in 2000. Everything alive was in captivity, most of it in private collections in Europe and Qatar.',
        meta: 'Five years after Rio 2' },
      { title: 'Put back, in 2022', sub: 'Curaçá, Bahia', tag: 'The return', accent: '#3fd589',
        desc: 'Captive-bred birds from a German breeding programme were released into the caatinga at Curaçá in June 2022, and some have bred in the wild since. It is the same argument as the condor two sections up, run by somebody else and won.',
        meta: 'And they have bred since' },
      { title: 'Blue Sky is gone', sub: 'Closed April 2021', tag: 'The studio', accent: '#c9ced6',
        desc: 'The studio that made both films, and Ice Age, was shut by Disney in April 2021 after the Fox acquisition. There will not be a third one, which is part of why this is a section here rather than a page of its own.',
        meta: 'Shut after the Fox deal' },
    ] },

  /* the complete index. On a zoo page this is the whole institution rather
     than a filmography: both sites, the habitats, and the programmes. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'two sites, and the record',
    lede: 'One institution on two sites, about twelve thousand animals across some six hundred and fifty species, and a research arm older than most of them.',
    items: [
      { title: 'The Two Sites', sub: '1916 · 1972', unit: 'site',
        desc: 'Same organisation, thirty miles apart, doing two different jobs. I have been to both; the Safari Park is the favourite.',
        rows: [
          { n: 'San Diego Zoo · Balboa Park', y: '1916', big: true },
          { n: 'Safari Park · Escondido', y: '1972', big: true },
        ] },
      { title: 'The Habitats', sub: 'Balboa Park', unit: 'area',
        desc: 'Sorted by climate and slope rather than by continent.',
        rows: [
          { n: 'Africa Rocks', y: '2017' },
          { n: 'Elephant Odyssey', y: '2009' },
          { n: 'Panda Ridge', y: '2024' },
          { n: 'Lost Forest', y: '' },
          { n: 'Northern Frontier', y: '' },
          { n: 'Urban Jungle', y: '' },
          { n: 'Discovery Outpost', y: '' },
          { n: "Wildlife Explorers Basecamp", y: '2022' },
        ] },
      { title: 'The Programmes', sub: 'what it is actually for', unit: 'programme',
        desc: 'The reason the institution describes itself as a wildlife alliance rather than a zoo.',
        rows: [
          { n: 'California Condor Recovery', y: '1987', big: true },
          { n: 'Frozen Zoo', y: '1972', big: true },
          { n: 'Giant panda conservation', y: '1996' },
          { n: 'Northern white rhino initiative', y: '2015' },
          { n: "Przewalski's horse cloning", y: '2020' },
          { n: 'Black-footed ferret cloning', y: '2020' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks',
    lede: 'A zoo has no theme tune, so this is the honest version: the two pieces of music the place is actually associated with. Nothing here is on a playlist yet.',
    items: [
      { title: 'Carnival of the Animals', accent: '#7fc86a', sub: 'Camille Saint-Saëns · 1886 · 22:00',
        desc: 'Written as a private joke and suppressed by the composer during his lifetime because he thought it would damage his reputation. It is now the piece every zoo on earth plays.',
        href: 'https://www.youtube.com/watch?v=clK9rM9JoIs', link: 'Listen' },
      { title: 'Balboa Park Organ Pavilion', accent: '#e0a050', sub: 'Spreckels Organ · since 1915',
        desc: 'Not the zoo, but a hundred metres from its gate: the largest outdoor pipe organ in the world, installed for the same 1915 exposition the animals were left over from, and still played free on Sundays.',
        href: 'https://spreckelsorgan.org/', link: 'The pavilion' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'San Diego Zoo', href: 'https://sandiegozoo.org/',
        desc: 'The zoo itself: what is currently on exhibit, and the live cameras.' },
      { title: 'San Diego Zoo Wildlife Alliance', href: 'https://sandiegozoowildlifealliance.org/',
        desc: 'The conservation arm, the Frozen Zoo, and the field programmes.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/San_Diego_Zoo',
        desc: 'The 1915 exposition, the lion, and everything since.' },
    ] },

] };
