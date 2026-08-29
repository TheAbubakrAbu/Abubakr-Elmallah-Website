/* fan-nolan.js: content for /worlds/christopher-nolan/. Rendered by fanpage.js.
   Thirteen films about time, told out of order and shot on film stock the
   size of a postcard, and the two composers who kept up with him. */
/* NO `when:` BLOCK YET, on purpose. That field is when Abubakr actually got
   into the thing, and the rest of this site's fan pages mean it literally. A
   plausible-sounding date here would make the one honest line on the page
   unreliable, so it is left for him to fill in:

     when: { at: '...', note: '...' },

   goes directly above `sections`. Same reason the tile in fandom-data.js has
   no `when`. */
window.FAN_PAGE = {
  sections: [

  { id: 'films', kind: 'rank', title: 'The Thirteen', note: '1998 – 2026 · in order',
    lede: 'Every one of them, in the order they came out, which is the only order he has ever been willing to respect. Six thousand pounds and a borrowed camera to a film shot entirely on IMAX, and the same obsessions the whole way.',
    items: [
      { title: 'Following', sub: '1998', desc: 'Shot on weekends over a year, on 16mm black and white, for about six thousand pounds, with a cast of friends. Already told out of order.' },
      { title: 'Memento', sub: '2000', desc: 'Backwards, in colour, with a black-and-white strand running forwards until the two meet. Polaroids and tattoos for a memory. The one that got him everything after.' },
      { title: 'Insomnia', sub: '2002', desc: 'Pacino, Robin Williams, and an Alaskan summer where the sun never sets on a detective who badly needs it to. The only one he did not write.' },
      { title: 'Batman Begins', sub: '2005', desc: 'The origin, done as a crime film: Ra’s al Ghul, the fear toxin, and a Batmobile that is a tank. The reboot every reboot since has copied.' },
      { title: 'The Prestige', sub: '2006', desc: 'Two magicians, three diaries, and David Bowie as Tesla. Are you watching closely? The trick is in the first line.' },
      { title: 'The Dark Knight', sub: '2008', desc: 'Ledger’s Joker, the first feature with sequences shot on IMAX cameras, and the film that made the genre respectable to people who dislike the genre.' },
      { title: 'Inception', sub: '2010', desc: 'A heist inside dreams inside dreams, with a rotating hallway built for real and a spinning top for an ending. Still the film people mean when they say Nolan.' },
      { title: 'The Dark Knight Rises', sub: '2012', desc: 'Bane, a plane pulled apart in the air for real, and the end of the trilogy. Bigger than the second one and not better, and it knows it.' },
      { title: 'Interstellar', sub: '2014', desc: 'A black hole rendered from Kip Thorne’s equations, a bookshelf tesseract, and Zimmer on a church organ. An hour on Miller’s planet is seven years at home.' },
      { title: 'Dunkirk', sub: '2017', desc: 'A week on the mole, a day on the sea, an hour in the air, cut into one. Almost no dialogue, and a ticking watch under the whole score.' },
      { title: 'Tenet', sub: '2020', desc: 'Time running backwards through the middle of a spy film, opened into a pandemic. The one you have to watch twice, and the palindrome is the point.' },
      { title: 'Oppenheimer', sub: '2023', desc: 'Three hours of men talking in rooms, in colour and in black and white, and it took seven Oscars including Picture and Director. Murphy in the role of his life.' },
      { title: 'The Odyssey', sub: '2026', desc: 'Homer, shot entirely on IMAX film, with Matt Damon as Odysseus and Göransson scoring it on lyres and gongs instead of an orchestra. Out July 2026.' },
    ] },

  { id: 'mine', kind: 'films', title: 'The Big Five', note: 'the ones the rest are measured against',
    lede: 'Thirteen films and five of them are the conversation: the crime film, the heist, the space film, the biography, and now the epic. Each one is the biggest thing in its genre for a decade either side of it.',
    items: [
      { num: 'I', title: 'The Dark Knight', sub: '2008', accent: '#e0a03a', meta: 'Bale · Ledger',
        desc: 'A crime picture with a cape in it, about what a city does when someone turns up who cannot be bargained with. Ledger’s Joker has no origin and no plan he will admit to, and the film is better for refusing to explain him.' },
      { num: 'II', title: 'Inception', sub: '2010', accent: '#8fa8c0', meta: 'DiCaprio · the top',
        desc: 'A heist film where the vault is a man’s head. Four levels of dream, each running slower than the one above it, a hallway that turns over with the actors inside it, and an ending that cuts to black at the exact moment the argument starts.' },
      { num: 'III', title: 'Interstellar', sub: '2014', accent: '#d0d8e0', meta: 'McConaughey · Gargantua',
        desc: 'A father leaving a daughter, with the physics done honestly enough that a paper came out of the black hole render. Docking scene, tesseract, and Zimmer’s organ, which is the sound this page is built around.' },
      { num: 'IV', title: 'Oppenheimer', sub: '2023', accent: '#e0703a', meta: 'Murphy · Trinity',
        desc: 'The bomb as a courtroom drama, told twice: in colour from inside his head and in black and white from Strauss’s. Three hours without an action scene, and the biggest film of its summer anyway.' },
      { num: 'V', title: 'The Odyssey', sub: '2026', accent: '#5fa8a0', meta: 'Damon · the Sirens',
        desc: 'Homer, shot entirely on IMAX film cameras, the first feature ever to be. Matt Damon as Odysseus, a decade at sea in one summer, and Göransson scoring it on ancient instruments and gongs instead of an orchestra: Sirens, further down, is the whole approach in two and a half minutes.' },
    ] },

  { id: 'rules', kind: 'tiles', title: 'The Rules', note: 'what a Nolan film is made of',
    lede: 'Thirteen films and the same habits in every one. Some of them are method and some of them are stubbornness, and it is not always clear which.',
    items: [
      { title: 'Time is the subject', accent: '#d0d8e0', sub: 'Every film', desc: 'Backwards, nested, relative, inverted, or simply running out. The clock is the villain more often than any person is.' },
      { title: 'Film, not digital', accent: '#d0d8e0', sub: '65mm and IMAX', desc: 'He has never shot a feature digitally. The Odyssey is the first film ever shot entirely on IMAX cameras.' },
      { title: 'In camera', accent: '#e0703a', sub: 'Practical first', desc: 'The hallway rotated, the plane came apart, the truck flipped, and the Trinity test was done without CGI. Effects are added last and least.' },
      { title: 'No second unit', accent: '#8fa8c0', sub: 'He shoots it all', desc: 'One crew, and he is on set for every shot, which is unusual at this scale and explains the consistency.' },
      { title: 'The score is structure', accent: '#e0a03a', sub: 'Zimmer, then Göransson', desc: 'Dunkirk is built on a Shepard tone, Interstellar on a ticking clock, Oppenheimer on a violin that keeps changing tempo. The music is written into the cut, not laid over it.' },
      { title: 'Mixed loud', accent: '#8fa8c0', sub: 'Dialogue under it', desc: 'The mixes are famous for burying lines under the score, and he has said that it is deliberate. Subtitles are not cheating.' },
      { title: 'The family firm', accent: '#d0d8e0', sub: 'Syncopy', desc: 'Emma Thomas, his wife, has produced every film; his brother Jonathan wrote the story Memento came from and co-wrote The Prestige, the Batman films and Interstellar.' },
      { title: 'No phones on set', accent: '#e0703a', sub: 'And no chairs, allegedly', desc: 'Phones stay off the set, and the story that there are no chairs is Anne Hathaway’s and only half true. It runs like a stage, not a lounge.' },
    ] },

  { id: 'time', kind: 'timeline', title: 'How Each One Handles Time', note: 'the obsession, film by film',
    items: [
      { when: '2000 · Memento', title: 'Backwards', desc: 'Colour scenes in reverse order, black and white forwards, meeting in the middle. You know exactly as much as Leonard does, which is nothing.' },
      { when: '2006 · The Prestige', title: 'Three diaries', desc: 'Two men reading each other’s journals, so the film is three timelines pretending to be one.' },
      { when: '2010 · Inception', title: 'Nested', desc: 'Five minutes at the top is an hour a level down. The van falls off the bridge for the whole third act.' },
      { when: '2014 · Interstellar', title: 'Relative', desc: 'An hour on Miller’s planet is seven years on the Endurance, and twenty-three years of messages waiting when they get back.' },
      { when: '2017 · Dunkirk', title: 'Three speeds', desc: 'A week, a day and an hour, intercut so the same events arrive three times from three directions.' },
      { when: '2020 · Tenet', title: 'Inverted', desc: 'Objects and people moving backwards through forward time, and a battle fought in both directions at once.' },
      { when: '2023 · Oppenheimer', title: 'Fission and fusion', desc: 'Colour for what he saw, black and white for what Strauss saw, and the two strands only line up at the very end.' },
      { when: '2026 · The Odyssey', title: 'Twenty years gone', desc: 'Ten at Troy and ten at sea, and a son who has spent his whole life waiting for a man he has never met.' },
    ] },

  { id: 'people', kind: 'cards', title: 'The Company', note: 'the same names on every call sheet',
    items: [
      { title: 'Emma Thomas', sub: 'Producer', tag: 'Syncopy', desc: 'Every film since Following, and his wife. Won the Best Picture Oscar for Oppenheimer alongside him.', meta: 'All thirteen' },
      { title: 'Jonathan Nolan', sub: 'Writer', tag: 'The brother', desc: 'The short story Memento came from, then co-writer on The Prestige, the Batman films and Interstellar, before making Westworld and Fallout.', meta: 'Memento → Interstellar' },
      { title: 'Hans Zimmer', sub: 'Composer', tag: 'Score', desc: 'Six films, Batman Begins to Dunkirk: the two-note Batman, the brass of Inception, the organ of Interstellar, the ticking watch of Dunkirk.', meta: '2005 – 2017' },
      { title: 'Ludwig Göransson', sub: 'Composer', tag: 'Score', desc: 'Tenet, then Oppenheimer, which won him the Oscar, then The Odyssey without an orchestra. Also the Mandalorian, which is on another page of this site.', meta: '2020 –' },
      { title: 'Hoyte van Hoytema', sub: 'Cinematographer', tag: 'IMAX', desc: 'Interstellar onwards. The one who worked out how to hand-hold an IMAX camera, and then how to shoot a whole film on one.', meta: '2014 –' },
      { title: 'Wally Pfister', sub: 'Cinematographer', tag: 'Film', desc: 'Memento to The Dark Knight Rises, and the Oscar for Inception. The look of the first half of the career.', meta: '2000 – 2012' },
      { title: 'Michael Caine', sub: 'Alfred, mostly', tag: 'The regular', desc: 'Every film from Batman Begins to Tenet, sometimes for a scene. He has said he stopped reading the scripts and just turned up.', meta: 'Eight films' },
      { title: 'Cillian Murphy', sub: 'Scarecrow → Oppenheimer', tag: 'The regular', desc: 'Five supporting parts over eighteen years, and then the lead, and the Oscar for it.', meta: 'Six films' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    items: [
      { title: 'You mustn’t be afraid to dream a little bigger, darling.', sub: 'Eames · Inception' },
      { title: 'Some men just want to watch the world burn.', sub: 'Alfred · The Dark Knight' },
      { title: 'Are you watching closely?', sub: 'The Prestige' },
      { title: 'Do not go gentle into that good night.', sub: 'Brand, quoting Dylan Thomas · Interstellar' },
      { title: 'Don’t try to understand it. Feel it.', sub: 'Laura · Tenet' },
      { title: 'Now I am become Death, the destroyer of worlds.', sub: 'Oppenheimer, quoting the Gita' },
    ] },

  /* the music: the tracks from my playlist, named as the albums name them
     and linked to the album's own upload (WaterTower, Back Lot Music, the
     composers' Topic channels) wherever there is one. The Dark Knight theme
     was never put on one album track, so that copy is a fan edit and says so;
     it sits on the Batman page as well. */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'eight tracks · five films',
    lede: 'The reason a lot of people can hum these films. Eight tracks in film order, six from my playlist and two that should be, named as the albums name them and linked to the albums’ own uploads wherever there is one. Zimmer for the first five, Göransson for the last three, ending on The Odyssey’s Sirens.',
    items: [
      { title: 'The Dark Knight (Main Theme)', accent: '#e0a03a', sub: 'The Dark Knight · 2008 · 7:43',
        desc: 'Hans Zimmer and James Newton Howard. Two notes for Batman, one rising note for the Joker. A fan edit of the theme; on the album it runs through Like a Dog Chasing Cars and A Dark Knight.',
        href: 'https://www.youtube.com/watch?v=iGx5a1ifSDs', link: 'Fan edit' },
      { title: 'Dream Is Collapsing', accent: '#8fa8c0', sub: 'Inception · 2010 · 2:24',
        desc: 'Hans Zimmer. The brass that every trailer copied for a decade, for the first dream coming apart around Cobb and Arthur. Not on the playlist yet, and it should be.',
        href: 'https://www.youtube.com/watch?v=OzLhXesNkCI', link: 'Listen' },
      { title: 'Time', accent: '#8fa8c0', sub: 'Inception · 2010 · 4:35',
        desc: 'Hans Zimmer. The last cue in the film, and the one that made a generation of trailers sound like this: a four-chord climb that never quite arrives.',
        href: 'https://www.youtube.com/watch?v=c56t7upa8Bk', link: 'Listen' },
      { title: 'Cornfield Chase', accent: '#d0d8e0', sub: 'Interstellar · 2014 · 2:07',
        desc: 'Hans Zimmer. A church organ and a ticking clock, over a truck through the corn. The whole score in two minutes.',
        href: 'https://www.youtube.com/watch?v=JuSsvM8B4Jc', link: 'Listen' },
      { title: 'No Time For Caution', accent: '#d0d8e0', sub: 'Interstellar · 2014 · 4:07',
        desc: 'Hans Zimmer. The docking scene: the organ climbing while the Endurance spins, and the loudest four minutes he has written. Not on the playlist yet either.',
        href: 'https://www.youtube.com/watch?v=kpK4cDk2bRs', link: 'Listen' },
      { title: 'Can You Hear The Music', accent: '#e0703a', sub: 'Oppenheimer · 2023 · 1:51',
        desc: 'Ludwig Göransson. Twenty-one tempo changes in under two minutes, for a man seeing the atom before anyone else can.',
        href: 'https://www.youtube.com/watch?v=4JZ-o3iAJv4', link: 'Listen' },
      { title: 'Destroyer Of Worlds', accent: '#e0703a', sub: 'Oppenheimer · 2023 · 2:55',
        desc: 'Ludwig Göransson. The stamping feet in the gymnasium, and the sound of the film turning on him.',
        href: 'https://www.youtube.com/watch?v=Pswx6OQp1Ks', link: 'Listen' },
      { title: 'Sirens', accent: '#5fa8a0', sub: 'The Odyssey · 2026 · 2:39',
        desc: 'Ludwig Göransson. Gongs, lyres and an aulos instead of an orchestra, for the one trial Odysseus has himself tied to the mast to survive.',
        href: 'https://www.youtube.com/watch?v=p-Qu614bYgY', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Nolan Fans', href: 'https://www.nolanfans.com/',
        desc: 'The long-running fan site, and the best archive of his interviews.' },
      { title: 'The filmography', href: 'https://en.wikipedia.org/wiki/Christopher_Nolan_filmography',
        desc: 'All thirteen, with the shorts and the producing credits.' },
      { title: 'The Odyssey', href: 'https://en.wikipedia.org/wiki/The_Odyssey_(2026_film)',
        desc: 'The newest one: the cast, the IMAX cameras, and the score.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "The Totem",
  intro: "In Inception every dreamer carries a small object whose weight and balance only they know, so they can tell a dream from the real thing. Pick one up and see what it tells you.",
  prompt: "Pick a totem and hold it.",
  said: "%.",
  items: [
    { n: "The top", s: "Cobb", c: "#d0d8e0", d: "M12 3l5 6-5 12-5-12z M12 3v-1.5 M7 9h10", note: "Mal’s, then his. If it falls, it is real. The film cuts before it does, and the argument has not stopped since 2010." },
    { n: "The loaded die", s: "Arthur", c: "#8fa8c0", d: "M4 8l8-4 8 4-8 4z M4 8v8l8 4 8-4V8 M12 12v8", note: "Weighted, so only he knows which face comes up. The rule is that nobody else may ever touch your totem, or it stops working." },
    { n: "The bishop", s: "Ariadne", c: "#e0a03a", d: "M12 3a2 2 0 0 1 2 2v2h-4V5a2 2 0 0 1 2-2z M9 8h6l1 8H8z M7 19h10", note: "Hollow, with a weight she chose herself. Built rather than bought, which is what she is for in the story: the one who makes the places." },
    { n: "The poker chip", s: "Eames", c: "#e0703a", d: "M12 3a9 9 0 1 0 .1 0 M12 8a4 4 0 1 0 .1 0", note: "A forger’s totem is a chip, which is the joke: the one object in the film that is only worth what everyone agrees it is." },
    { n: "The watch", s: "Dunkirk", c: "#5fa8a0", d: "M12 4a8 8 0 1 0 .1 0 M12 8v4l3 2 M9 2h6 M9 22h6", note: "Not a totem, but the object under every one of these films. Nolan’s own pocket watch was recorded ticking and built into the Dunkirk score." },
  ],
};
