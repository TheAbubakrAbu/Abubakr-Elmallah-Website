/* fan-jl.js: content for /worlds/justice-league/. Rendered by fanpage.js.
   The founding roster is drawn as a ring in the page itself. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid, on the cartoons', note: 'The animated shows were on when I was small. This one is here for four characters rather than any devotion to the comics.' },
  sections: [
  { id: 'guys', kind: 'cards', title: 'The Ones I Actually Like', note: 'Batman, Superman, Green Lantern, the Flash',
    lede: 'If I say DC, this is who I mean. Two of them I would put on any list; the other two I like for the ideas behind them more than for any particular story.',
    items: [
      { title: 'Batman', sub: 'Bruce Wayne · Gotham', tag: 'My favourite', accent: '#8f98a8',
        desc: 'No powers on a team of gods, and a contingency plan for every one of them in a drawer at home. He has his own page on this site, which tells you where he actually ranks for me. On this team he is the interesting one precisely because he should not be able to keep up and does.',
        meta: 'Has his own page here' },
      { title: 'Superman', sub: 'Clark Kent · Metropolis', tag: 'My favourite', accent: '#4f8fe0',
        desc: 'The one everybody calls boring, which I have never agreed with. His problem is restraint, not power: he could end almost any situation instantly and spends every story choosing not to. That is a harder character to write than a brooding one, and when somebody gets it right it is the best thing DC has.',
        meta: 'The restraint is the point' },
      { title: 'Green Lantern', sub: 'Hal Jordan · John Stewart', tag: 'Like the concept', accent: '#4fd07f',
        desc: 'A ring that builds anything you can picture, limited only by willpower and imagination. That is a genuinely great premise: the power is literally how good you are at thinking of something. John Stewart is the one I know best, because he is the one in the cartoon.',
        meta: 'Sector 2814' },
      { title: 'The Flash', sub: 'Barry Allen · Wally West', tag: 'Like the concept', accent: '#e04a3a',
        desc: 'Fastest man alive, and in most versions the one holding the team together socially. The fun of him is that the writers have to keep inventing reasons he cannot just solve everything in half a second.',
        meta: 'Central City' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, and those are taken from what this
     page already says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the films, the cartoons, the animated ones',
    lede: 'The whole live-action run in order, the animated series that are still the best version of most of these characters, and a shelf of direct-to-video animated films that quietly outclass the cinema ones.',
    items: [
      { title: 'The Films', sub: 'DC Extended Universe · 2013 – 2023', unit: 'film',
        desc: 'Ten years, one shared universe, and the four-hour cut that arrived three years after the theatrical one.',
        rows: [
          { n: 'Man of Steel', y: '2013' },
          { n: 'Batman v Superman: Dawn of Justice', y: '2016' },
          { n: 'Suicide Squad', y: '2016' },
          { n: 'Wonder Woman', y: '2017' },
          { n: 'Justice League', y: '2017' },
          { n: 'Aquaman', y: '2018' },
          { n: 'Shazam!', y: '2019' },
          { n: 'Birds of Prey', y: '2020' },
          { n: 'Wonder Woman 1984', y: '2020' },
          { n: 'Zack Snyder’s Justice League', y: '2021', big: true },
          { n: 'The Suicide Squad', y: '2021' },
          { n: 'Black Adam', y: '2022' },
          { n: 'Shazam! Fury of the Gods', y: '2023' },
          { n: 'The Flash', y: '2023' },
          { n: 'Blue Beetle', y: '2023' },
          { n: 'Aquaman and the Lost Kingdom', y: '2023' },
        ] },
      { title: 'The New One', sub: 'DC Universe · 2025 – ', unit: 'film',
        desc: 'James Gunn starting again from scratch.',
        rows: [
          { n: 'Superman', y: '2025' },
          { n: 'Supergirl', y: '2026' },
        ] },
      { title: 'The Cartoons', sub: 'the DC Animated Universe · 1992 – 2006', unit: 'series',
        desc: 'Bruce Timm and Paul Dini, one continuity across fourteen years. Still the definitive version.',
        rows: [
          { n: 'Batman: The Animated Series', y: '1992' },
          { n: 'Superman: The Animated Series', y: '1996' },
          { n: 'Batman Beyond', y: '1999' },
          { n: 'Static Shock', y: '2000' },
          { n: 'Justice League', y: '2001', big: true },
          { n: 'Teen Titans', y: '2003' },
          { n: 'Justice League Unlimited', y: '2004', big: true },
          { n: 'Young Justice', y: '2010' },
        ] },
      { title: 'The Animated Films', sub: 'DC Universe Animated · a selection', unit: 'film',
        desc: 'The direct-to-video line, which has adapted more of the comics properly than the cinema ever has.',
        rows: [
          { n: 'Justice League: The New Frontier', y: '2008' },
          { n: 'Justice League: Crisis on Two Earths', y: '2010' },
          { n: 'Batman: The Dark Knight Returns', y: '2012' },
          { n: 'Justice League: The Flashpoint Paradox', y: '2013' },
          { n: 'Justice League: War', y: '2014' },
          { n: 'Justice League Dark', y: '2017' },
        ] },
    ] },


  { id: 'seven', kind: 'cards', title: 'The Founders', note: 'the rest of the table, for completeness',
    lede: 'The line-up shifts with every era. This is the one the 2001 animated series settled on, and the one most people picture.',
    items: [
      { title: 'Superman', sub: 'Kal-El · Clark Kent', tag: 'Krypton', desc: 'The one the others measure themselves against, and the only member whose real problem is restraint rather than power.', meta: 'Debut 1938 · Metropolis' },
      { title: 'Batman', sub: 'Bruce Wayne', tag: 'Human', desc: 'No powers on a team of gods, and the contingency plans for every one of them in a drawer at home.', meta: 'Debut 1939 · Gotham' },
      { title: 'Wonder Woman', sub: 'Diana of Themyscira', tag: 'Amazon', desc: 'Raised as a diplomat and trained as a soldier, and the member most likely to end an argument by being right.', meta: 'Debut 1941 · Themyscira' },
      { title: 'The Flash', sub: 'Barry Allen · Wally West', tag: 'Speed Force', desc: 'Fastest man alive, and in most versions the one holding the team together socially.', meta: 'Debut 1940 · Central City' },
      { title: 'Green Lantern', sub: 'Hal Jordan · John Stewart', tag: 'Corps', desc: 'A ring that builds anything you can picture, powered by willpower and limited by imagination.', meta: 'Debut 1940 · Sector 2814' },
      { title: 'Aquaman', sub: 'Arthur Curry', tag: 'Atlantis', desc: 'King of two thirds of the planet, and the running joke that the comics have spent forty years dismantling.', meta: 'Debut 1941 · Atlantis' },
      { title: 'Martian Manhunter', sub: "J'onn J'onzz", tag: 'Mars', desc: 'Telepath, shapeshifter, and the emotional centre of the animated series. Replaced by Cyborg in the New 52 founding.', meta: 'Debut 1955 · Mars' },
    ] },

  { id: 'cartoons', kind: 'cards', title: 'The Cartoons', note: 'how I actually met these people',
    lede: 'This is the real answer to why DC is on this page at all. The animated shows were on when I was a kid, and they are still the versions of these characters I picture first.',
    items: [
      { title: 'Justice League & Unlimited', sub: '2001 – 2006', tag: 'The main one', accent: '#5f9fe0',
        desc: 'The Bruce Timm run. It built a shared universe on television years before the films managed it, and for most of the roster it is still the definitive version. Unlimited opened the team up to dozens of heroes and somehow got better.',
        meta: 'Still the best version' },
      { title: 'Batman: The Animated Series', sub: '1992 – 1995', tag: 'The classic', accent: '#8f98a8',
        desc: 'Where the whole animated universe starts, and the show that fixed what Batman sounds like for a generation. Kevin Conroy and Mark Hamill are the voices, permanently.',
        meta: 'Conroy · Hamill' },
      { title: 'Superman: The Animated Series', sub: '1996 – 2000', tag: 'The classic', accent: '#4f8fe0',
        desc: 'The same team doing Metropolis, and the show that leads directly into the League cartoon.',
        meta: 'Same universe' },
      { title: 'Teen Titans / Young Justice', sub: '2003 · 2010', tag: 'Also watched', accent: '#d8b45f',
        desc: 'The sidekick shows. Teen Titans was the fun one; Young Justice was the one that took itself seriously and got away with it.',
        meta: 'The younger bench' },
    ] },

  { id: 'films', kind: 'rank', title: 'The Films', note: 'the Snyder run, mostly',
    items: [
      { num: '01', title: 'Zack Snyder’s Justice League', sub: '2021 · four hours', desc: 'The one worth watching. Snyder left the original production and it was finished by somebody else; years of campaigning got this version made and released, and it is a genuinely better film: the characters get room, the Flash and Cyborg get arcs, and it looks like one person made it.' },
      { num: '02', title: 'Batman v Superman: Dawn of Justice', sub: '2016', desc: 'I liked this more than most people did. It is heavy and it is long and the plot has real problems, but Affleck is a great Batman and the film is actually about something: what it would mean to live under someone who could do anything.' },
      { num: '03', title: 'Man of Steel', sub: '2013', desc: 'Where the run starts. Divisive ending, but the Krypton opening and the first flight are excellent.' },
      { num: '04', title: 'Justice League', sub: '2017 · theatrical', desc: 'The compromised one, cut down and reshot by a different director into a shorter, lighter film. I did not hate it. I understand why almost everyone else did.' },
      { num: '05', title: 'Superman', sub: '2025', desc: 'Gunn restarting the whole thing, with a much brighter take on the character, a deliberate answer to how serious the Snyder films were.' },
    ] },

  { id: 'foes', kind: 'tiles', title: 'The Opposition', note: 'what needs seven of them',
    items: [
      { title: 'Darkseid', accent: '#c04a3a', sub: 'Apokolips', desc: 'The Anti-Life Equation, the Omega Beams, and the reason a League has to exist at all.' },
      { title: 'Starro', accent: '#a06fe0', sub: 'The first', desc: 'A giant telepathic starfish. Genuinely the villain of the League\u2019s first appearance in 1960.' },
      { title: 'Lex Luthor', accent: '#5fd07f', sub: 'Metropolis', desc: 'No powers, a laboratory, and the argument that Superman is the problem.' },
      { title: 'Brainiac', accent: '#4f9fd0', sub: 'Collector', desc: 'Shrinks cities into bottles and files them. Kandor is still in one.' },
      { title: 'Sinestro', accent: '#f0c840', sub: 'Korugar', desc: 'The greatest Green Lantern there was, running a corps powered by fear instead.' },
      { title: 'The Legion of Doom', accent: '#c9402f', sub: 'Hall of Doom', desc: 'The mirror image: thirteen villains in a swamp headquarters shaped like a helmet.' },
    ] },

  /* the music: the one DC track on my playlist that is not Batman's (those
     are on the Batman page), named as the 1978 album names it and linked to
     John Williams' own upload; the playlist has the Royal Philharmonic's
     recording of it */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks · Superman, and the cartoon',
    lede: 'Two here; the Batman ones are on his own page. The Superman march is on my playlist in the Royal Philharmonic’s recording, and this is Williams’ own; the cartoon theme is not on it yet.',
    items: [
      { title: 'Prelude and Main Title March', accent: '#5f9fe0', sub: 'Superman · 1978 · 5:30',
        desc: 'John Williams. The Superman march, and the only theme that has been handed down to every version of him since.',
        href: 'https://www.youtube.com/watch?v=QmHhIDUrdVA', link: 'Listen' },
      { title: 'Justice League Unlimited Theme', accent: '#4f8fe0', sub: 'Michael McCuistion · 2004 · 1:03',
        desc: 'Michael McCuistion. The guitar and the drums under the roll call, and the reason a whole generation knows every hero on the roster. How I actually met these people.',
        href: 'https://www.youtube.com/watch?v=pesEIkgz5Ko', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'DC.com', href: 'https://www.dc.com/',
        desc: 'The official home of the whole universe.' },
      { title: 'DC Database', href: 'https://dc.fandom.com/wiki/DC_Comics_Database',
        desc: 'Every character, every crisis, every continuity reset.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Justice_League',
        desc: 'The team, since 1960.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "The Four I Actually Mean",
  intro: "I am not a comics reader and this page does not pretend to be. When I say DC I mean these four, and I met all of them through the cartoons rather than the books. Pick one.",
  prompt: "Four emblems.",
  said: "%.",
  items: [
    { n: "Batman", s: "No powers, all preparation", c: "#8f98a8", d: "M2 8c3 3 4 1 5 4 1-2 4-2 5 0 1-2 4-2 5 0 1-3 2-1 5-4-1 5-3 9-10 11C5 17 3 13 2 8z", note: "The interesting one on this team precisely because he should not be able to keep up and does. He has his own page on this site, which tells you where he actually ranks for me." },
    { n: "Superman", s: "The restraint is the point", c: "#4f8fe0", d: "M12 3l8 3-2 9-6 6-6-6-2-9z M8 9h8l-5 4h5", note: "Everybody calls him boring and I have never agreed. He could end almost any situation instantly and spends every story choosing not to, which is harder to write than brooding." },
    { n: "Green Lantern", s: "Willpower and imagination", c: "#4fd07f", d: "M4 9h16v3H4z M4 15h16v3H4z M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", note: "A ring that builds anything you can picture: the power is literally how good you are at thinking of something. John Stewart is the one I know, because he is the one in the cartoon." },
    { n: "The Flash", s: "Fastest man alive", c: "#e04a3a", d: "M13 3L6 13h4l-2 8 8-11h-4l3-7z", note: "The fun of him is that the writers have to keep inventing reasons he cannot solve everything in half a second. Also usually the one holding the team together socially." },
    { n: "The cartoons", s: "How I got in", c: "#d8b45f", d: "M4 5h16v12H4z M4 19h16 M9 9l4 2-4 2z", note: "Justice League and Unlimited, Batman: The Animated Series, Superman: TAS. The Bruce Timm run is where I met every one of these people and it is still the version I picture." },
  ],
};
