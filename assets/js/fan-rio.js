/* fan-rio.js: content for /worlds/rio/. Rendered by fanpage.js.
   A macaw from Minnesota flown to Rio de Janeiro to save his species, and the
   species went extinct in the wild three years after the sequel. */
/* The `when:` line is Abubakr's own, and so is the verdict: "all of it is
   fire". Both films and both records are marked in the index because he did
   not rank one over the other, and neither does this page. */
window.FAN_PAGE = {
  when: { at: 'As a kid, both films',
          note: 'All of it is fire: the films, the flying, and the whole soundtrack.' },
  sections: [

  { id: 'films', kind: 'films', title: 'The Two', note: 'Carlos Saldanha · 2011 and 2014',
    lede: 'Blue Sky Studios made both, and Carlos Saldanha directed both. He is from Rio, which is the reason the city in these films is a place with weather and traffic in it rather than a postcard with a beach.',
    items: [
      { num: 'I', title: 'Rio', sub: '2011', accent: '#3fc6a8',
        desc: 'A Spix’s macaw raised in a bookshop in Minnesota is flown to Brazil to breed with the last female of his species, discovers he cannot fly, and spends most of the film chained to her. It is a road movie through Carnival, and the animation of the city, the favelas and the birds in flight is far better than the premise suggests.',
        meta: 'Real in Rio was nominated for an Oscar' },
      { num: 'II', title: 'Rio 2', sub: '2014', accent: '#4a9ae8',
        desc: 'The family goes to the Amazon and finds a whole population of their species, which is the exact opposite of the fact the first film was built on. Bigger, louder, more songs, and a logging plot. Most people rank it below the first one; I do not, and the flying is still excellent.',
        meta: 'And then the Amazon' },
    ] },

  { id: 'city', kind: 'tiles', title: 'The City', note: 'what the film actually gets right',
    lede: 'Saldanha grew up there and the film shows the parts a tourist reel leaves out. Everything here is a real place drawn recognisably.',
    items: [
      { title: 'Corcovado', accent: '#f0d8b8', sub: 'Christ the Redeemer',
        desc: 'In almost every establishing shot, and correctly small: from the bay it is a figure on a hill rather than a landmark filling the frame.' },
      { title: 'Sugarloaf', accent: '#8fb8e0', sub: 'Pão de Açúcar',
        desc: 'The lump at the mouth of the bay, with the cable car the film uses as a set piece.' },
      { title: 'The favelas', accent: '#e0a050', sub: 'On the hills',
        desc: 'Drawn as stacked colour up the slopes, and the film sets a real chunk of its action in them rather than treating them as scenery.' },
      { title: 'Carnival', accent: '#e04a9a', sub: 'The Sambadrome',
        desc: 'The finale is a parade float, and the sequence is the studio’s excuse to animate about four thousand things moving at once.' },
      { title: 'Copacabana', accent: '#f0c040', sub: 'The beach and the pavement',
        desc: 'Including the wave pattern in the pavement, which is a real thing in Rio and almost nobody animates it.' },
      { title: 'Lapa', accent: '#b06fd8', sub: 'The arches',
        desc: 'The old aqueduct with the tram over it, in the background of the night sequences.' },
    ] },

  { id: 'bird', kind: 'cards', title: 'The Real Bird', note: 'the uncomfortable part',
    lede: 'The premise of this children’s cartoon was a live conservation emergency at the time it was made, and it got worse before it got better.',
    items: [
      { title: 'The Spix’s macaw', sub: 'Cyanopsitta spixii', tag: 'The species', accent: '#4a9ae8',
        desc: 'A small blue macaw from one specific strip of dry forest along the Rio São Francisco in Bahia. Named for Johann Baptist von Spix, who collected one in 1819 and shot it. It has always been rare and it was never found anywhere else.',
        meta: 'One valley in Bahia' },
      { title: 'Extinct in the wild', sub: '2019', tag: 'The finding', accent: '#e04a3a',
        desc: 'BirdLife International formally declared it extinct in the wild in 2019, three years after the sequel came out. The last known wild bird had disappeared in 2000. Everything alive was in captivity, and most of it was in private collections in Europe and Qatar.',
        meta: 'Three years after Rio 2' },
      { title: 'Put back, in 2022', sub: 'Curaçá, Bahia', tag: 'The return', accent: '#3fd589',
        desc: 'Captive-bred birds from a German breeding programme were released back into the caatinga at Curaçá in June 2022, and some have since bred in the wild. It is the first time this has worked for a bird declared extinct in the wild.',
        meta: 'And they have bred since' },
      { title: 'The film raised money for it', sub: 'And the town used the name', tag: 'The effect', accent: '#f0c040',
        desc: 'Curaçá adopted the film’s bird as its own symbol and the release programme has run alongside the attention. Whether a cartoon helped or just happened alongside is arguable, but the animals are there.',
        meta: 'Arguable, and the birds are there' },
      { title: 'Blue Sky is gone', sub: 'Closed in 2021', tag: 'The studio', accent: '#c9ced6',
        desc: 'The studio that made both films, and Ice Age, was shut down by Disney in April 2021 after the Fox acquisition. There will not be a third one.',
        meta: 'Shut by Disney after the Fox deal' },
    ] },

  /* the complete index. ◆ marks the ones that are mine, which is both films
     and both records: I do not rank them. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'two films, a short, and the record',
    lede: 'A small franchise: two films, one short and a soundtrack that did better than either of them.',
    items: [
      { title: 'The Films', sub: '2011 · 2014', unit: 'film',
        desc: 'Both directed by Carlos Saldanha at Blue Sky.',
        rows: [
          { n: 'Rio', y: '2011' , big: true },
          { n: 'Rio 2', y: '2014' , big: true },
        ] },
      { title: 'Around Them', sub: '2011 – 2014', unit: 'thing',
        desc: 'A short, a tie-in game, and the soundtrack, which is the part that actually travelled.',
        rows: [
          { n: 'Rio (video game)', y: '2011' },
          { n: 'Angry Birds Rio', y: '2011' },
          { n: 'Rio: Original Motion Picture Soundtrack', y: '2011' , big: true },
          { n: 'Rio 2: Music from the Motion Picture', y: '2014' , big: true },
        ] },
      { title: 'The Voices', sub: 'both films', unit: 'part',
        desc: 'Jemaine Clement as Nigel is the one everybody remembers, and he sings.',
        rows: [
          { n: 'Jesse Eisenberg · Blu', y: '2011' },
          { n: 'Anne Hathaway · Jewel', y: '2011' },
          { n: 'Leslie Mann · Linda', y: '2011' },
          { n: 'George Lopez · Rafael', y: '2011' },
          { n: 'Jamie Foxx · Nico', y: '2011' },
          { n: 'will.i.am · Pedro', y: '2011' },
          { n: 'Jemaine Clement · Nigel', y: '2011' },
          { n: 'Bruno Mars · Roberto', y: '2014' },
          { n: 'Kristin Chenoweth · Gabi', y: '2014' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'three tracks',
    lede: 'Sergio Mendes produced the music and John Powell scored it, which is a considerably better pair of names than a talking-bird cartoon needed. All of it is fire, and these are the three I would start with.',
    items: [
      { title: 'Real in Rio', accent: '#3fc6a8', sub: 'Sergio Mendes, Carlinhos Brown & Siedah Garrett · 2011 · 2:19',
        desc: 'The opening number, and the one nominated for the Academy Award for Best Original Song. Half of it is in Portuguese and the film does not apologise for that.',
        href: 'https://www.youtube.com/watch?v=dZ1iKGSdeyI', link: 'Listen' },
      { title: 'Hot Wings (I Wanna Party)', accent: '#f0c040', sub: 'will.i.am & Jamie Foxx · 2011 · 2:35',
        desc: 'The samba club sequence, and the track the film is actually remembered by.',
        href: 'https://www.youtube.com/watch?v=rqa1jXnSXmE', link: 'Listen' },
      { title: 'Fly Love', accent: '#4a9ae8', sub: 'Jamie Foxx · 2011 · 3:38',
        desc: 'The quiet one, over the night flight. Written by Carlinhos Brown and sung straight.',
        href: 'https://www.youtube.com/watch?v=s2NInX7vkSg', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Rio_(2011_film)',
        desc: 'The film, the production, and Saldanha making it about his own city.' },
      { title: "The Spix's macaw", href: 'https://en.wikipedia.org/wiki/Spix%27s_macaw',
        desc: 'The real bird: extinct in the wild in 2019, released back into Bahia in 2022.' },
      { title: 'BirdLife International', href: 'https://www.birdlife.org/',
        desc: 'The organisation that made the 2019 assessment, and the one tracking it since.' },
    ] },

] };
