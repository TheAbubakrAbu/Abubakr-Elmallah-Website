/* fan-pixar.js: content for /worlds/pixar/. Rendered by fanpage.js.
   The studio that kept betting a cartoon could be about grief and kept
   being right. Founded as a hardware company, which is the part nobody
   remembers and the reason the software was ever any good. */
/* NO `when:` BLOCK YET, on purpose. That field is when Abubakr actually got
   into the thing, and the rest of this site's fan pages mean it literally. A
   plausible-sounding date here would make the one honest line on the page
   unreliable, so it is left for him to fill in:

     when: { at: '...', note: '...' },

   goes directly above `sections`. Same reason the tile in fandom-data.js has
   no `when`. */
window.FAN_PAGE = {
  sections: [

  { id: 'story', kind: 'timeline', title: 'How It Got Here', note: 'a hardware company that failed upward',
    lede: 'Pixar was not founded to make films. It was the computer-graphics division of Lucasfilm, sold off in 1986 to a buyer who mostly wanted a workstation business, and it spent nine years making adverts and shorts to keep the lights on while the tools it needed did not exist yet.',
    items: [
      { when: '1979', title: 'The Graphics Group', accent: '#4fa8e0',
        desc: 'Ed Catmull hired into Lucasfilm to work out whether a computer could do anything useful for a film. The answer took sixteen years.' },
      { when: '1986', title: 'Sold for five million', accent: '#5fc0d8',
        desc: 'Steve Jobs bought the division out of Lucasfilm and put the same again in as capital. It was, on paper, a company that sold the Pixar Image Computer.' },
      { when: '1986', title: 'Luxo Jr.', accent: '#f0c860',
        desc: 'A two-minute short about a desk lamp and a ball, made to show off the renderer. Oscar-nominated, and the lamp never left: it is still in the logo.' },
      { when: '1988', title: 'Tin Toy', accent: '#e0a050',
        desc: 'The first computer-animated short to win the Academy Award. Its baby is also the first honest admission that human skin was going to be hard.' },
      { when: '1991', title: 'The Disney deal', accent: '#8fd0f0',
        desc: 'Three films, Disney distributing. The hardware business was shut down; from here it was a film studio that happened to write its own renderer.' },
      { when: '1995', title: 'Toy Story', accent: '#e04a3a',
        desc: 'The first fully computer-animated feature ever released. It made about 370 million dollars against a 30 million budget and settled the argument.' },
      { when: '2006', title: 'Bought by Disney', accent: '#b06fd8',
        desc: 'About 7.4 billion dollars, in stock, which made Jobs Disney’s largest shareholder. Catmull and Lasseter were put in charge of Disney Animation too, and Disney Animation promptly got good again.' },
      { when: '2024', title: 'Inside Out 2', accent: '#f0d040',
        desc: 'The highest-grossing animated film ever made, nearly thirty years after the first one. A sequel to a film about a girl’s feelings.' },
    ] },

  { id: 'films', kind: 'films', title: 'The Ones That Matter', note: 'not the whole shelf',
    lede: 'Ten of them, in release order rather than ranked, because any ranking of these changes with whichever one was watched last. The through-line is not the animation: it is that each of these is willing to be about something a children’s film is normally steered away from.',
    items: [
      { num: '95', title: 'Toy Story', sub: '1995', accent: '#e04a3a',
        desc: 'A film about being replaced. Woody’s problem is not the villain next door, it is that he has been superseded by a better product, and he behaves badly about it for most of the runtime before the film lets him off.',
        meta: 'The one that had to work' },
      { num: '99', title: 'Toy Story 2', sub: '1999', accent: '#e0763a',
        desc: 'Started as a direct-to-video sequel, rebuilt from scratch in nine months after the story reel was judged not good enough. Contains Jessie’s two-minute flashback, which is the studio quietly announcing what it is now capable of.',
        meta: 'The rescue job' },
      { num: '03', title: 'Finding Nemo', sub: '2003', accent: '#4fa8e0',
        desc: 'The one that is actually about a parent, not a child. Marlin is not overprotective as a character flaw to be corrected; he is overprotective because his family was eaten in the first four minutes, and the film knows the difference.',
        meta: 'First Best Animated Feature win' },
      { num: '04', title: 'The Incredibles', sub: '2004', accent: '#e0483a',
        desc: 'Brad Bird’s film, and the only superhero story that is really about a marriage and a mid-life crisis. Also the best-designed one: mid-century modern, Michael Giacchino’s brass, and a villain whose motive is being told no.',
        meta: 'Still the best-looking' },
      { num: '07', title: 'Ratatouille', sub: '2007', accent: '#5fbf6a',
        desc: 'A film about criticism that ends with the critic being right. Anton Ego’s review is the most honest thing the studio has ever written about its own job, and the flashback that triggers it is one shot long.',
        meta: 'The one for the grown-ups' },
      { num: '08', title: 'WALL·E', sub: '2008', accent: '#e8c56a',
        desc: 'Forty minutes with almost no dialogue, on a dead Earth, in a children’s film released in July. Then it swerves into a much softer second half and people have argued about that for seventeen years.',
        meta: 'The bravest first act' },
      { num: '09', title: 'Up', sub: '2009', accent: '#b06fd8',
        desc: 'The four-minute married-life montage is the most efficient piece of storytelling in the studio’s catalogue: no dialogue, one theme, an entire life, and the rest of the film is the widower it produced. Nominated for Best Picture.',
        meta: 'The first four minutes' },
      { num: '10', title: 'Toy Story 3', sub: '2010', accent: '#e0a050',
        desc: 'The incinerator scene: five toys stop struggling and hold hands, in a film about a boy leaving for college. Also nominated for Best Picture, and the point at which the trilogy should have stopped.',
        meta: 'The ending it earned' },
      { num: '15', title: 'Inside Out', sub: '2015', accent: '#f0d040',
        desc: 'A film whose actual thesis is that sadness is functional: the emotion everybody wants managed out is the one that gets help. Pete Docter built a family drama out of a diagram and it holds.',
        meta: 'The idea nobody else would fund' },
      { num: '20', title: 'Soul', sub: '2020', accent: '#5fc0d8',
        desc: 'Released straight to streaming during the pandemic, which is a shame, because it is a jazz film about the difference between a purpose and a life. The barbershop scene and the last ten minutes are the studio at full strength.',
        meta: 'The one that got buried' },
    ] },

  { id: 'shorts', kind: 'tiles', title: 'The Shorts', note: 'where the studio actually experiments', compact: true,
    lede: 'The shorts are not warm-up acts. They are how a technique gets proved before a two-hundred-million-dollar feature depends on it, and how directors get tried out. Every one of these was a hard problem in rendering before it was a story.',
    items: [
      { title: 'Luxo Jr.', accent: '#f0c860', sub: '1986', desc: 'Two lamps, one ball. Made to show that computer animation could carry character, and it is still in front of every film.' },
      { title: 'Red’s Dream', accent: '#e04a3a', sub: '1987', desc: 'A unicycle in a bike shop, and the studio’s first attempt at rain and a wet street.' },
      { title: 'Tin Toy', accent: '#e0a050', sub: '1988', desc: 'The first CG short to win the Oscar, and the reason Toy Story exists at all: it is Toy Story’s premise in five minutes.' },
      { title: 'Knick Knack', accent: '#8fd0f0', sub: '1989', desc: 'A snow-globe snowman trying to get out. Shipped in front of Finding Nemo, and the funniest thing they have made.' },
      { title: 'Geri’s Game', accent: '#c9a06f', sub: '1997', desc: 'An old man playing chess against himself. Won the Oscar, and the cloth and skin work went straight into Toy Story 2.' },
      { title: 'For the Birds', accent: '#5fbf6a', sub: '2000', desc: 'Birds on a wire and one very patient consequence. Also an Oscar, and about as pure as a gag gets.' },
      { title: 'Presto', accent: '#b06fd8', sub: '2008', desc: 'A magician, a rabbit and a hat, done at Looney Tunes speed. Proof they could still time a slapstick beat.' },
      { title: 'Piper', accent: '#e8c56a', sub: '2016', desc: 'A sandpiper learning to feed. Photoreal water and sand in a five-minute film with no dialogue. Oscar.' },
      { title: 'Bao', accent: '#e0763a', sub: '2018', desc: 'A dumpling that becomes a son. Domee Shi’s short, the first Pixar short directed by a woman, and another Oscar.' },
    ] },

  { id: 'why', kind: 'cards', title: 'Why It Lands', note: 'the machinery under the fur',
    items: [
      { title: 'The story is fixed before the render', sub: 'Reels, not renders', tag: 'The process', accent: '#4fa8e0',
        desc: 'Every film is cut as a storyboard reel with scratch dialogue and watched end to end, repeatedly, for years, until it works as a film with no animation in it. Toy Story 2 was thrown out at that stage and rebuilt in nine months. The pixels are the last thing to be committed to.',
        meta: 'The reel is the film' },
      { title: 'The Braintrust', sub: 'Notes with no authority', tag: 'The culture', accent: '#5fc0d8',
        desc: 'Directors screen their reel for the other directors, who say what is not working and have no power to force a change. Catmull’s point in Creativity, Inc. is that the moment notes become orders, people stop giving honest ones.',
        meta: 'Candour without mandate' },
      { title: 'They wrote the renderer', sub: 'RenderMan', tag: 'The tools', accent: '#f0c860',
        desc: 'Pixar built the software the films needed because it did not exist: RenderMan, the RenderMan Interface Specification, and a pile of Academy Sci-Tech awards. Half the visual-effects industry rendered on it, including films that had nothing to do with Pixar.',
        meta: 'A tools company that makes films' },
      { title: 'The first four minutes', sub: 'Get the loss in early', tag: 'The pattern', accent: '#b06fd8',
        desc: 'Up, Finding Nemo, Toy Story 3, Soul, Inside Out: the grief is loaded at the front and the rest of the film is the response to it, not the build-up. It is why these hold up on rewatch when the jokes are spent.',
        meta: 'Grief first, plot after' },
      { title: 'The 22 rules', sub: 'Emma Coats’ list', tag: 'The writing', accent: '#5fbf6a',
        desc: 'A storyboard artist tweeted twenty-two rules of thumb from around the building in 2011 and they escaped into every writing class since. Number six is the one that does the work: what is your character good at, and what is the opposite of that.',
        meta: 'Rule 2: what the audience wants' },
      { title: 'It is not flawless', sub: 'The sequel decade', tag: 'The honest bit', accent: '#8f9ab0',
        desc: 'Cars 2, Monsters University, The Good Dinosaur, three more Cars-adjacent films and a Toy Story 4 that the trilogy did not need. Post-2010 the ratio of original films to sequels went the wrong way, and Soul and Luca got dumped onto streaming while the sequels got cinemas.',
        meta: 'Nobody is owed a hot streak' },
    ] },

  { id: 'numbers', kind: 'stats', title: 'By the Numbers', note: 'the ones worth knowing',
    items: [
      { title: '1986', sub: 'Bought out of Lucasfilm', desc: 'For about five million dollars, plus five million in capital.', accent: '#4fa8e0' },
      { title: '1995', sub: 'Toy Story', desc: 'The first fully computer-animated feature film released.', accent: '#e04a3a' },
      { title: '11', sub: 'Best Animated Feature', desc: 'Wins, out of a category that only exists from 2001.', accent: '#f0c860' },
      { title: '2', sub: 'Best Picture nominations', desc: 'Up and Toy Story 3, back when the category widened.', accent: '#b06fd8' },
    ] },

  { id: 'quotes', kind: 'quotes', title: 'Lines', note: 'the three that stay',
    items: [
      { title: 'Not everyone can become a great artist, but a great artist can come from anywhere.', sub: 'Anton Ego · Ratatouille', accent: '#5fbf6a' },
      { title: 'Adventure is out there!', sub: 'Ellie Fredricksen · Up', accent: '#b06fd8' },
      { title: 'You are a toy!', sub: 'Woody · Toy Story', accent: '#e04a3a' },
    ] },

  /* the music: the Pixar tracks on my playlist, one per film, named as the
     albums name them and linked to the album's own upload wherever there is
     one; the Inside Out theme has no album upload, so its copy is a fan's */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'seven tracks · seven films',
    lede: 'Seven films, one track each, six from my playlist and one that should be, named as the albums name them and linked to the albums’ own uploads wherever there is one. Giacchino gets three of them, which is about right.',
    items: [
      { title: 'You\'ve Got a Friend in Me', accent: '#4fa8e0', sub: 'Toy Story · 1995 · 2:05',
        desc: 'Randy Newman. The song, from the first one, before it became the studio’s anthem.',
        href: 'https://www.youtube.com/watch?v=tL0uGc5gNiA', link: 'Listen' },
      { title: 'Monsters, Inc.', accent: '#5fbf7f', sub: 'Monsters, Inc. · 2001 · 2:07',
        desc: 'Randy Newman. The opening titles as a jazz number: walking bass and a big band, for a factory that runs on screams.',
        href: 'https://www.youtube.com/watch?v=ayMPmc0_2r8', link: 'Listen' },
      { title: 'The Incredits', accent: '#e03a2a', sub: 'The Incredibles · 2004 · 7:22',
        desc: 'Michael Giacchino. Big-band spy brass for the end credits, seven minutes of it, which is where the theme everybody calls the Incredibles theme actually lives.',
        href: 'https://www.youtube.com/watch?v=voLQroAnoLI', link: 'Listen' },
      { title: 'Define Dancing', accent: '#8fd0e0', sub: 'WALL-E · 2008 · 2:32',
        desc: 'Thomas Newman. The two robots dancing through space with a fire extinguisher, and the only love scene Pixar has scored for machines. Not on the playlist yet, and it should be.',
        href: 'https://www.youtube.com/watch?v=wvEwsc0Qmnw', link: 'Listen' },
      { title: 'Married Life', accent: '#e8603a', sub: 'Up · 2009 · 4:11',
        desc: 'Michael Giacchino. The four-minute montage: a marriage, a house, a nursery repainted, and a funeral, with one waltz doing all of it.',
        href: 'https://www.youtube.com/watch?v=2rn-vMbFglI', link: 'Listen' },
      { title: 'It\'s Finn McMissile!', accent: '#c02020', sub: 'Cars 2 · 2011 · 5:55',
        desc: 'Michael Giacchino. A Bond score for a car: the oil-rig opening, and the best thing in the studio’s weakest film.',
        href: 'https://www.youtube.com/watch?v=QXpqUGRjt8U', link: 'Listen' },
      { title: 'Bundle of Joy', accent: '#f0d040', sub: 'Inside Out · 2015 · 4:17',
        desc: 'Michael Giacchino. Riley being born, and Joy switching on. The album has no upload of it, so the copy here is a fan’s.',
        href: 'https://www.youtube.com/watch?v=r1of5y40gcI', link: 'Fan upload' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'the studio, on the record',
    items: [
      { title: 'Pixar', href: 'https://www.pixar.com/',
        desc: 'The official site: the features, the shorts, and the SparkShorts programme.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Pixar',
        desc: 'The Lucasfilm years, the hardware business, the Disney deal, and every feature in order.' },
      { title: 'RenderMan', href: 'https://renderman.pixar.com/',
        desc: 'The renderer they wrote because nothing existed. Free for non-commercial use.' },
    ] },

] };
