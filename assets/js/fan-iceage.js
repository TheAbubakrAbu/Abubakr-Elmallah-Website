/* fan-iceage.js: content for /worlds/ice-age/. Rendered by fanpage.js.
   Blue Sky's first film, and a squirrel in a completely different one. */
window.FAN_PAGE = {
  when: { at: 'As a kid', note: 'The first one holds up and the sequels mostly do not, but Scrat is perfect in every single one of them, which is a strange thing to be able to say about a five-film series.' },
  sections: [

  { id: 'herd', kind: 'cards', title: 'The Herd', note: 'three animals who cannot stand each other',
    lede: 'The premise is a road movie: a mammoth, a sloth and a sabre-toothed cat carrying a human baby back to its father across a continent that is freezing over. It works because the three of them are genuinely mismatched and the film never pretends they are friends until they are.',
    items: [
      { title: 'Manny', sub: 'Ray Romano', tag: 'The mammoth', accent: '#8f7f6a',
        desc: 'Walking the wrong way, on purpose, because everything he had is dead. The film puts that on a cave wall in a single silent shot and then never mentions it again, which is far better writing than the sequels manage.',
        meta: 'The one carrying the plot' },
      { title: 'Sid', sub: 'John Leguizamo', tag: 'The sloth', accent: '#5fbf7f',
        desc: 'Abandoned by his own herd, talks constantly, and is the only one of the three who wants to help the baby for its own sake. The comic relief and, structurally, the reason the story starts.',
        meta: 'The one with the lisp' },
      { title: 'Diego', sub: 'Denis Leary', tag: 'The sabre-tooth', accent: '#e0763a',
        desc: 'Sent to lead them into an ambush, and the whole first film is him deciding not to. The only real arc in the series.',
        meta: 'The one who was lying' },
      { title: 'Scrat', sub: 'Chris Wedge', tag: 'The other film', accent: '#c9a05f',
        desc: 'A sabre-toothed squirrel with an acorn, no dialogue, no connection to the plot, and no chance of ever succeeding. He opens and closes every film in the series and appears in none of their stories. Chris Wedge, the director, does the voice himself.',
        meta: 'Never gets the acorn. Ever.' },
      { title: 'Blue Sky', sub: 'Greenwich, Connecticut', tag: 'The studio', accent: '#8fd0e8',
        desc: 'A visual effects house that wrote its own renderer and turned it into an animation studio. Ice Age was its first feature, made for about sixty million against a Pixar budget, and it took over four hundred million.',
        href: '/worlds/rio/', link: 'Their other one is Rio',
        meta: 'Closed by Disney in April 2021' },
    ] },

  { id: 'works', kind: 'works', title: 'Everything In It', note: 'five films, and a lot of specials',
    lede: 'The first is very good, the third is fine, and the series went on for a decade after it had anything left to say. All of it stopped when Disney closed the studio.',
    items: [
      { title: 'The Films', sub: '2002 – 2016', unit: 'film',
        desc: 'Five features. The first one is the reason for all the others.',
        rows: [
          { n: 'Ice Age', y: '2002', big: true },
          { n: 'The Meltdown', y: '2006' },
          { n: 'Dawn of the Dinosaurs', y: '2009' },
          { n: 'Continental Drift', y: '2012' },
          { n: 'Collision Course', y: '2016' },
        ] },
      { title: 'Shorts and Specials', sub: '2002 – 2022', unit: 'short',
        desc: 'Mostly Scrat, which is correct, since he is the only part of the franchise that never got worse.',
        rows: [
          { n: 'Gone Nutty', y: '2002' },
          { n: 'No Time for Nuts', y: '2006' },
          { n: 'A Mammoth Christmas', y: '2011' },
          { n: 'Cosmic Scrat-tastrophe', y: '2015' },
          { n: 'The Adventures of Buck Wild', y: '2022' },
          { n: 'Scrat Tales', y: '2022' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Music', note: 'three tracks · David Newman, and the song',
    lede: 'David Newman scored the first three, from a family that has written film music for ninety years. The song everyone remembers is not his, and it is not even original to the film.',
    items: [
      { title: 'Main Title', accent: '#8fd0e8', sub: 'David Newman · Ice Age · 2002 · 5:02',
        desc: 'Five minutes of the migration: the herd moving south, and the score doing the scale of a continent without a word of narration under it.',
        href: 'https://www.youtube.com/watch?v=xzKKmNxNVj0', link: 'Listen' },
      { title: 'Opening Travel Music', accent: '#c9a05f', sub: 'David Newman · Ice Age · 2002 · 1:18',
        desc: 'The Scrat cold open: a squirrel, an acorn, a glacier, and a full orchestra taking it entirely seriously. The best joke in the film happens in the first ninety seconds and has no dialogue.',
        href: 'https://www.youtube.com/watch?v=81XEBuvPtE4', link: 'Listen' },
      { title: 'Send Me On My Way', accent: '#5fbf7f', sub: 'Rusted Root · 1994 · 3:59',
        desc: 'Recorded in 1994, eight years before the film, and permanently attached to it anyway. It is over the ice-slide sequence, and it is the only thing most people can hum from any of these five films.',
        href: 'https://www.youtube.com/watch?v=IGMabBGydC0', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Ice_Age_(franchise)',
        desc: 'All five films, the shorts, and the Blue Sky closure.' },
      { title: 'Ice Age Wiki', href: 'https://iceage.fandom.com/wiki/Ice_Age_Wiki',
        desc: 'Every character and every one of Scrat\'s failures, catalogued.' },
    ] },

] };
