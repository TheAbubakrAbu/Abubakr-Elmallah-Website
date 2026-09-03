/* fan-jl.js: content for /worlds/justice-league/. Rendered by fanpage.js.
   The founding roster is drawn as a ring in the page itself. */
window.FAN_PAGE = {
  when: { at: 'Since I was a kid, on the cartoons', note: 'The animated shows were on when I was small, and I have never read a comic. This one is here for six characters, and for liking the films most people did not.' },
  sections: [
  { id: 'guys', kind: 'cards', title: 'The Ones I Actually Like', note: 'Batman first, then five more',
    lede: 'If I say DC, this is who I mean. Batman is the favourite by a distance and has his own page here; the other five I love outright, which is more than I can say for any comic, since I have never read one. All six came to me through television.',
    items: [
      { title: 'Batman', sub: 'Bruce Wayne · Gotham', tag: 'My favourite', accent: '#8f98a8',
        desc: 'No powers on a team of gods, and a contingency plan for every one of them in a drawer at home. He has his own page on this site, which tells you where he actually ranks for me. On this team he is the interesting one precisely because he should not be able to keep up and does.',
        meta: 'Has his own page here' },
      { title: 'Superman', sub: 'Clark Kent · Metropolis', tag: 'Love', accent: '#4f8fe0',
        desc: 'The one everybody calls boring, which I have never agreed with. His problem is restraint, not power: he could end almost any situation instantly and spends every story choosing not to. That is a harder character to write than a brooding one, and when somebody gets it right it is the best thing DC has.',
        meta: 'The restraint is the point' },
      { title: 'Green Lantern', sub: 'Hal Jordan · John Stewart', tag: 'Love', accent: '#4fd07f',
        desc: 'A ring that builds anything you can picture, limited only by willpower and imagination. That is a genuinely great premise: the power is literally how good you are at thinking of something. John Stewart is the one I know best, because he is the one in the cartoon, and now the one in Lanterns, which just came out and is fire.',
        meta: 'Sector 2814 · Lanterns, 2026' },
      { title: 'Cyborg', sub: 'Victor Stone · Detroit', tag: 'Love', accent: '#7fb0d0',
        desc: 'Half of him is machine after the accident that should have killed him, and he never asked for any of it. The four-hour cut of Justice League gives him the arc the theatrical one left on the floor, and it is the best thing in that film. Also, for the record, the funniest Titan.',
        meta: 'Debut 1980 · a founder since 2011' },
      { title: 'The Flash', sub: 'Barry Allen · Wally West', tag: 'Love', accent: '#e04a3a',
        desc: 'Fastest man alive, and in most versions the one holding the team together socially. The fun of him is that the writers have to keep inventing reasons he cannot just solve everything in half a second. And the 2023 film, which almost nobody else liked, I loved.',
        meta: 'Central City' },
      { title: 'Aquaman', sub: 'Arthur Curry · Atlantis', tag: 'Love', accent: '#3fb0a0',
        desc: 'King of two thirds of the planet, and the running joke the comics spent forty years dismantling. The films finished the job: Momoa’s two are both ones I loved, whatever the second one’s reviews said.',
        meta: 'Two films, both loved' },
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
          { n: 'Batman v Superman: Dawn of Justice', y: '2016', big: true },
          { n: 'Suicide Squad', y: '2016' },
          { n: 'Wonder Woman', y: '2017' },
          { n: 'Justice League', y: '2017', big: true },
          { n: 'Aquaman', y: '2018', big: true },
          { n: 'Shazam!', y: '2019' },
          { n: 'Birds of Prey', y: '2020' },
          { n: 'Wonder Woman 1984', y: '2020' },
          { n: 'Zack Snyder’s Justice League', y: '2021', big: true },
          { n: 'The Suicide Squad', y: '2021' },
          { n: 'Black Adam', y: '2022' },
          { n: 'Shazam! Fury of the Gods', y: '2023' },
          { n: 'The Flash', y: '2023', big: true },
          { n: 'Blue Beetle', y: '2023' },
          { n: 'Aquaman and the Lost Kingdom', y: '2023', big: true },
        ] },
      { title: 'The New One', sub: 'DC Universe · 2025 – ', unit: 'title',
        desc: 'James Gunn starting again from scratch, which I am excited about. Lanterns, the HBO series with Hal Jordan and John Stewart, arrived in August 2026 and it is fire.',
        rows: [
          { n: 'Superman', y: '2025' },
          { n: 'Supergirl', y: '2026' },
          { n: 'Lanterns', y: '2026', big: true },
        ] },
      { title: 'The Cartoons', sub: 'the animated series · 1992 – now', unit: 'series',
        desc: 'Bruce Timm and Paul Dini first, one continuity across fourteen years and still the definitive version, and the ones that came after it.',
        rows: [
          { n: 'Batman: The Animated Series', y: '1992' },
          { n: 'Superman: The Animated Series', y: '1996' },
          { n: 'Batman Beyond', y: '1999' },
          { n: 'Static Shock', y: '2000' },
          { n: 'Justice League', y: '2001', big: true },
          { n: 'Teen Titans', y: '2003' },
          { n: 'Justice League Unlimited', y: '2004', big: true },
          { n: 'Young Justice', y: '2010' },
          { n: 'Teen Titans Go!', y: '2013', big: true },
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
      { title: 'Justice League & Unlimited', sub: 'November 2001 – May 2006', tag: 'The main one', accent: '#5f9fe0',
        desc: 'The Bruce Timm run. It built a shared universe on television years before the films managed it, and for most of the roster it is still the definitive version. Unlimited opened the team up to dozens of heroes and somehow got better.',
        meta: 'Still the best version' },
      { title: 'Batman: The Animated Series', sub: 'September 1992 – September 1995', tag: 'The classic', accent: '#8f98a8',
        desc: 'Where the whole animated universe starts, and the show that fixed what Batman sounds like for a generation. Kevin Conroy and Mark Hamill are the voices, permanently.',
        meta: 'Conroy · Hamill' },
      { title: 'Superman: The Animated Series', sub: 'September 1996 – February 2000', tag: 'The classic', accent: '#4f8fe0',
        desc: 'The same team doing Metropolis, and the show that leads directly into the League cartoon.',
        meta: 'Same universe' },
      { title: 'Teen Titans / Young Justice', sub: 'July 2003 · November 2010', tag: 'Also watched', accent: '#d8b45f',
        desc: 'The sidekick shows. Teen Titans was the fun one; Young Justice was the one that took itself seriously and got away with it.',
        meta: 'The younger bench' },
      { title: 'Teen Titans Go!', sub: 'April 2013 – now', tag: 'Fire', accent: '#e0c040',
        desc: 'The one the internet decided to hate for not being the 2003 show, and the one I will defend: it is fire. Eleven-minute episodes, no respect for anything, including its own characters, and now the longest-running DC cartoon there has ever been.',
        meta: 'Cyborg and the waffles' },
    ] },

  { id: 'films', kind: 'cards', title: 'The Films', note: 'the ones I liked, against the consensus',
    lede: 'I liked parts of the DCEU that most people wrote off. The Snyder cut is the one everybody allows themselves to like; I liked the theatrical Justice League too, and the three that got laughed at are the ones I loved.',
    items: [
      { title: 'Aquaman', sub: 'December 2018 · Wan', tag: 'Loved', accent: '#3fb0a0',
        desc: 'Momoa, a trench full of monsters, an octopus on the drums, and a billion dollars at the box office. It knows exactly what it is and never once apologises for it.',
        meta: 'Set months after Justice League · $1.15 billion' },
      { title: 'Aquaman and the Lost Kingdom', sub: 'December 2023 · Wan', tag: 'Loved', accent: '#3fb0a0',
        desc: 'The last DCEU film, released to shrugs, and I loved it anyway. Arthur and Orm as a reluctant double act is the best part of it.',
        meta: 'Set about four years after the first · the last one' },
      { title: 'The Flash', sub: 'June 2023 · Muschietti', tag: 'Loved', accent: '#e04a3a',
        desc: 'Two Barrys, Keaton back in the suit, and a plot about not being able to fix the one thing you most want to. It got buried on the way out; I loved it.',
        meta: 'Set after Justice League, and then in 2013 · Keaton returns' },
      { title: 'Batman v Superman: Dawn of Justice', sub: 'March 2016 · Snyder', tag: 'Liked', accent: '#8f9fb0',
        desc: 'I liked this more than most people did. Heavy and long, with real plot problems, but Affleck is a great Batman and the film is actually about something: what it would mean to live under someone who could do anything.',
        meta: 'Set eighteen months after Man of Steel · Affleck' },
      { title: 'Justice League, both of them', sub: 'November 2017 · March 2021', tag: 'Liked', accent: '#5f9fe0',
        desc: 'The theatrical one and the four-hour Snyder cut. People generally only allow the second; I liked both. The long one gives the Flash and Cyborg their arcs and looks like one person made it, and the short one is still a fun two hours.',
        meta: 'Both set weeks after Batman v Superman · two cuts, both liked' },
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
  title: "The Six I Actually Mean",
  intro: "I am not a comics reader and this page does not pretend to be. When I say DC I mean these six, and I met all of them on television rather than in the books. Pick one.",
  prompt: "Six emblems.",
  said: "%.",
  items: [
    { n: "Batman", s: "No powers, all preparation", c: "#8f98a8", d: "M2 8c3 3 4 1 5 4 1-2 4-2 5 0 1-2 4-2 5 0 1-3 2-1 5-4-1 5-3 9-10 11C5 17 3 13 2 8z", note: "The interesting one on this team precisely because he should not be able to keep up and does. He has his own page on this site, which tells you where he actually ranks for me." },
    { n: "Superman", s: "The restraint is the point", c: "#4f8fe0", d: "M12 3l8 3-2 9-6 6-6-6-2-9z M8 9h8l-5 4h5", note: "Everybody calls him boring and I have never agreed. He could end almost any situation instantly and spends every story choosing not to, which is harder to write than brooding." },
    { n: "Green Lantern", s: "Willpower and imagination", c: "#4fd07f", d: "M4 9h16v3H4z M4 15h16v3H4z M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", note: "A ring that builds anything you can picture: the power is literally how good you are at thinking of something. John Stewart is the one I know, because he is the one in the cartoon and now the one in Lanterns." },
    { n: "Cyborg", s: "Half machine, all Victor", c: "#7fb0d0", d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M12 3v18 M14 10h4v4h-4z M7 12h2", note: "The four-hour Justice League gives him the arc the theatrical one cut, and it is the best thing in that film. Also the funniest Titan, which is a different show entirely and I stand by it." },
    { n: "The Flash", s: "Fastest man alive", c: "#e04a3a", d: "M13 3L6 13h4l-2 8 8-11h-4l3-7z", note: "The fun of him is that the writers have to keep inventing reasons he cannot solve everything in half a second. Also usually the one holding the team together socially, and the 2023 film I loved." },
    { n: "Aquaman", s: "King of two thirds of the planet", c: "#3fb0a0", d: "M12 4v17 M7 6c0 4 2 7 5 7s5-3 5-7 M7 6v3 M17 6v3 M9 21h6", note: "The joke the comics spent forty years dismantling, and the films finished the job. Both of Momoa's are ones I loved, whatever the second one's reviews said." },
    { n: "The cartoons", s: "How I got in", c: "#d8b45f", d: "M4 5h16v12H4z M4 19h16 M9 9l4 2-4 2z", note: "Justice League and Unlimited, Batman: The Animated Series, Superman: TAS. The Bruce Timm run is where I met every one of these people and it is still the version I picture." },
  ],
};
