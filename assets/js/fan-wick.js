/* fan-wick.js: content for /worlds/john-wick/. Rendered by fanpage.js.
   Four films built out of a dog, a car, and a decision to hold the shot.
   Directed by stuntmen, which is the only fact you need to explain any of it. */
/* NO `when:` BLOCK YET, on purpose. That field is when Abubakr actually got
   into the thing, and the rest of this site's fan pages mean it literally. A
   plausible-sounding date here would make the one honest line on the page
   unreliable, so it is left for him to fill in:

     when: { at: '...', note: '...' },

   goes directly above `sections`. Same reason the tile in fandom-data.js has
   no `when`. */
window.FAN_PAGE = {
  sections: [

  { id: 'films', kind: 'films', title: 'The Four', note: 'Chad Stahelski · 2014 onward',
    lede: 'One small revenge film, and then three progressively larger ones that keep the same rule: you can see the whole body, the whole room, and the actor’s face. The budgets went up by roughly ten times across the series and the method never changed.',
    items: [
      { num: 'I', title: 'John Wick', sub: '2014', accent: '#d84a52',
        desc: 'Eighty-five million against about twenty. A retired hitman, a stolen 1969 Mustang and a dead puppy, and a script small enough that all the effort went into the choreography and the world-building at the edges. The Continental, the coins and the rules are introduced without one line of exposition explaining them.',
        meta: 'The best-shot debut of the decade' },
      { num: 'II', title: 'Chapter 2', sub: '2017', accent: '#c94a5a',
        desc: 'The marker, Rome, the catacombs, and the film that turns the first one’s texture into a system: the High Table, excommunicado, the sommelier scene. Ends with Wick breaking the one rule that keeps him alive, on purpose, in the middle of Central Park.',
        meta: 'The world opens up' },
      { num: 'III', title: 'Parabellum', sub: '2019', accent: '#a83a4a',
        desc: 'Ninety minutes of consequence, starting in the rain with an hour left on the clock. The library, the knife shop, the horses, the dogs in Casablanca, and a glass-walled finale. The most inventive of the four, and the least interested in a plot.',
        meta: 'Si vis pacem, para bellum' },
      { num: 'IV', title: 'Chapter 4', sub: '2023', accent: '#e05a62',
        desc: 'Two hours and forty-nine minutes, and it earns them: the Osaka Continental, the top-down stairwell fight in Berlin shot like a video game, the Arc de Triomphe traffic sequence, dragon’s breath rounds, and a duel at sunrise on the steps of Sacré-Cœur. The series’ best-looking film and its actual ending.',
        meta: 'The one they were building to' },
    ] },

  { id: 'method', kind: 'cards', title: 'Why It Looks Like That', note: 'the stunt-team thesis',
    lede: 'Chad Stahelski and David Leitch were stunt performers and Keanu Reeves’ doubles on The Matrix before they ran 87Eleven and started directing. Everything distinctive about these films is a stunt team getting to choose the camera for once.',
    items: [
      { title: 'Wide, and held', sub: 'You can see the whole fight', tag: 'The camera', accent: '#d84a52',
        desc: 'Long takes, full-body framing, minimal cutting. The shaky-cam era chopped fights into fragments partly to hide that the actor was not doing them; if your actor has trained for months, the honest shot is the impressive one and the edit is the enemy.',
        meta: 'One take is the flex' },
      { title: 'The face is in the shot', sub: 'No doubles to hide', tag: 'The training', accent: '#c9ced6',
        desc: 'Reeves trained in judo, jiu-jitsu and three-gun for months per film and shoots on live ranges, so the camera never has to cut away at the moment of contact. It is the difference between watching a fight and being told one happened.',
        meta: 'Months per film' },
      { title: 'Gun fu', sub: 'Reloading as choreography', tag: 'The style', accent: '#8f9ab0',
        desc: 'Judo throws into a point-blank shot, and magazine changes timed as beats rather than hidden. The films count rounds and make you watch the reload, which turns a shootout into something with rhythm and stakes instead of infinite ammunition.',
        meta: 'The reload is the dance step' },
      { title: 'Nobody explains anything', sub: 'The world is just there', tag: 'The writing', accent: '#e05a62',
        desc: 'Gold coins, markers, a hotel switchboard staffed by tattooed operators, a Bowery King with a pigeon network. None of it gets a scene of exposition; it is treated as ordinary by everyone on screen, and the audience fills in a whole economy on its own.',
        meta: 'Confidence instead of a prologue' },
      { title: 'Colour instead of grey', sub: 'Neon, not desaturation', tag: 'The look', accent: '#7fa8d8',
        desc: 'Dan Laustsen shot the last three: blue and magenta, wet streets, mirrored rooms, an aquarium-lit hotel. The 2010s action default was to drain the colour out; these films go the other way and it is most of why a still from one is recognisable.',
        meta: 'A still is identifiable' },
      { title: 'The dog', sub: 'A small reason on purpose', tag: 'The motive', accent: '#c9a06f',
        desc: 'Daisy is a beagle puppy, posted by his wife after she died, killed in the first fifteen minutes. The film knows it is a small pretext and does not inflate it: the point is that Wick has nothing else left, and the audience needs about four minutes to be on board.',
        meta: 'And the car' },
    ] },

  { id: 'world', kind: 'tiles', title: 'The Rules', note: 'the world under the shooting', compact: true,
    lede: 'The best invention in the series is not the fighting, it is the bureaucracy: an assassins’ guild with a hospitality arm, a currency, an arbitration process, and paperwork. It is funny and it is played completely straight.',
    items: [
      { title: 'The Continental', accent: '#c9ced6', sub: 'The hotel', desc: 'A chain, one per city, run on two rules: coins only, and no business conducted on the premises. Break the second and you are excommunicado.' },
      { title: 'The coins', accent: '#d8b96a', sub: 'The currency', desc: 'Gold markers of service rather than money. Nobody ever says the exchange rate, which is exactly why it works.' },
      { title: 'The marker', accent: '#c94a5a', sub: 'The debt', desc: 'A blood oath in a medallion. Refuse to honour one and the High Table kills you; honour it and you do something you did not want to.' },
      { title: 'The High Table', accent: '#a83a4a', sub: 'The council', desc: 'Twelve crime families that the Continental answers to. Its authority is entirely procedural, and Chapter 4 is about testing whether that is enough.' },
      { title: 'The Adjudicator', accent: '#b06fd8', sub: 'Compliance', desc: 'Sent to audit people rather than to fight them. An HR function with a body count, and the funniest idea in the series.' },
      { title: 'The Bowery King', accent: '#5fbf6a', sub: 'The underside', desc: 'Laurence Fishburne running the city’s homeless and its pigeons as an intelligence network, outside the Table entirely.' },
      { title: 'The sommelier', accent: '#e8c56a', sub: 'The armourer', desc: 'A weapons fitting conducted as a wine tasting. Two minutes of dialogue that tell you everything about how this world talks about itself.' },
      { title: 'Excommunicado', accent: '#8f9ab0', sub: 'The sentence', desc: 'Membership revoked, services withdrawn, and an open contract announced by a switchboard operator typing on a card. The bounty rises by film.' },
    ] },

  { id: 'around', kind: 'cards', title: 'Around The Four', note: 'the spin-offs',
    items: [
      { title: 'The Continental', sub: '2023, three episodes', tag: 'Series', accent: '#8f9ab0',
        desc: 'A prequel about a young Winston taking the New York hotel in the 1970s. Different cast, different tone, and it establishes how the rules got there. Worth it for the setting more than the fighting.',
        meta: 'Peacock, 2023' },
      { title: 'Ballerina', sub: '2025', tag: 'Film', accent: '#e05a62',
        desc: 'Ana de Armas as Eve, set between Chapters 3 and 4, from the Ruska Roma thread the third film set up. Same choreography team, and Reeves turns up.',
        meta: 'From the World of John Wick' },
      { title: 'The pencil', sub: 'Three men, one pencil', tag: 'The legend', accent: '#c9a06f',
        desc: 'Viggo’s speech in the first film describes Wick killing three men in a bar with a pencil, and Chapter 2 pays it off on screen twice. The series’ habit of making a throwaway line into a set piece two films later starts here.',
        meta: 'Paid off in Chapter 2' },
    ] },

  { id: 'quotes', kind: 'quotes', title: 'Lines', note: 'the three that stay',
    items: [
      { title: 'Yeah. I’m thinking I’m back.', sub: 'John Wick · John Wick', accent: '#d84a52' },
      { title: 'Rules. Without them, we live with the animals.', sub: 'Winston · Chapter 2', accent: '#c9ced6' },
      { title: 'Si vis pacem, para bellum.', sub: 'If you want peace, prepare for war · Chapter 3', accent: '#a83a4a' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'the Continental, elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/John_Wick',
        desc: 'The four films, the spin-offs, and the box office climbing with every one.' },
      { title: '87Eleven Action Design', href: 'https://en.wikipedia.org/wiki/87Eleven',
        desc: 'The stunt company Stahelski and Leitch built, and the reason the fights are shot the way they are.' },
      { title: 'John Wick Wiki', href: 'https://johnwick.fandom.com/wiki/John_Wick_Wiki',
        desc: 'Every rule, every Continental, and a body count somebody has actually tallied.' },
    ] },

] };
