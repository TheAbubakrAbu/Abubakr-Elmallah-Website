/* fan-angrybirds.js: content for /worlds/angry-birds/. Rendered by fanpage.js.
   A projectile-motion problem with a grudge. Rovio's fifty-second game, and
   for a couple of years the most recognisable thing on a phone. */
window.FAN_PAGE = {
  when: { at: 'Since elementary school' },
  sections: [  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the games, the films, the shows',
    lede: 'Rovio shipped these faster than anyone could keep up with, and then took most of them back off the store. The struck-through ones cannot be bought any more, which is the subject of a section further down.',
    items: [
      { title: 'The Games', sub: 'Rovio · 2009 – now', unit: 'game',
        desc: 'The 2009 original was delisted in 2019 and now exists only as a paid re-release.',
        rows: [
          { n: 'Angry Birds', gone: 'delisted, 2019' },
          { n: 'Angry Birds Seasons', gone: 'delisted, 2019' },
          { n: 'Angry Birds Rio', gone: 'delisted, 2019' },
          { n: 'Angry Birds Space', y: '2012' },
          { n: 'Angry Birds Star Wars', gone: 'delisted, 2019' },
          { n: 'Angry Birds Star Wars II', gone: 'delisted, 2019' },
          { n: 'Angry Birds Go!', gone: 'delisted, 2019' },
          { n: 'Angry Birds Epic', gone: 'delisted, 2019' },
          { n: 'Angry Birds Transformers', y: '2014' },
          { n: 'Angry Birds 2', y: '2015', big: true },
          { n: 'Angry Birds Dream Blast', y: '2019' },
          { n: 'Rovio Classics: Angry Birds', y: '2022' },
        ] },
      { title: 'The Films', sub: '2016 – now', unit: 'film',
        desc: 'Two so far, and a third announced. Better than a physics puzzle game had any right to produce.',
        rows: [
          { n: 'The Angry Birds Movie', y: '2016' },
          { n: 'The Angry Birds Movie 2', y: '2019' },
          { n: 'The Angry Birds Movie 3', y: '2027' },
        ] },
      { title: 'On Television', sub: '2013 – now', unit: 'series',
        desc: 'Short-form animation, mostly wordless, made to feed the apps.',
        rows: [
          { n: 'Angry Birds Toons', y: '2013' },
          { n: 'Angry Birds Stella', y: '2014' },
          { n: 'Angry Birds Blues', y: '2017' },
          { n: 'Summer Madness', y: '2022' },
          { n: 'Mystery Island', y: '2025' },
        ] },
    ] },


  { id: 'flock', kind: 'tiles', title: 'The Flock', note: 'one ability each', compact: true,
    lede: 'The original roster, in the order the game hands them to you. The design rule is that the ability has to be guessable from the silhouette, which is why nothing here needs a label in-game.',
    items: [
      { title: 'Red', accent: '#e03a2a', sub: 'No ability', desc: 'The baseline. Pure mass and angle, and the one the whole game is calibrated against.' },
      { title: 'The Blues', accent: '#5fa8e0', sub: 'Splits into three', desc: 'Jay, Jake and Jim. Tap and you get three smaller birds in a spread: the answer to glass.' },
      { title: 'Chuck', accent: '#f0d040', sub: 'Speed burst', desc: 'Tap mid-flight and he accelerates in a straight line. The answer to wood, and to anything behind it.' },
      { title: 'Bomb', accent: '#3a3f4a', sub: 'Explodes', desc: 'Tap to detonate, or let him land and wait. The answer to stone, and to a pig buried in the middle of one.' },
      { title: 'Matilda', accent: '#e8e6e0', sub: 'Drops an egg', desc: 'Tap and she drops an egg bomb and rockets upward. Two hits from one bird, in two directions.' },
      { title: 'Hal', accent: '#5fbf6a', sub: 'Boomerangs', desc: 'The toucan. Tap and he turns around, which is how you hit the thing the slingshot cannot see.' },
      { title: 'Terence', accent: '#a83a2a', sub: 'Just enormous', desc: 'No ability and no tap. He simply goes through the level, and the level does not survive it.' },
      { title: 'Bubbles', accent: '#e0763a', sub: 'Inflates', desc: 'Tap and he expands, shoving everything around him outward. Best used inside a structure rather than at it.' },
      { title: 'Mighty Eagle', accent: '#c9a06f', sub: 'The get-out', desc: 'A paid one-tap clear with a sardine. Rovio charging a dollar to skip the level is the first sign of what was coming.' },
    ] },

  { id: 'games', kind: 'rank', title: 'The Games', note: 'the ones where the physics kept moving',
    lede: 'Rovio shipped a lot of these. The first four are the ones where the physics kept getting a new idea; after that the series mostly stopped being about launching a bird at a building.',
    items: [
      { num: '01', title: 'Angry Birds', sub: '2009', accent: '#e03a2a',
        desc: 'The original. Rovio’s fifty-second game, made by a small team for a company that was nearly out of money, and released on iOS in December 2009 for a dollar.' },
      { num: '02', title: 'Angry Birds Seasons', sub: '2010', accent: '#5fbf6a',
        desc: 'The same game with a new set of levels every holiday for years. No new mechanic, but it is where most of the good level design ended up.' },
      { num: '03', title: 'Angry Birds Space', sub: '2012', accent: '#7f9fd0',
        desc: 'The one genuinely new idea: gravity wells. Shots curve around planets, and a good throw can orbit into a target the slingshot is not even facing. Fifty million downloads in about five weeks.' },
      { num: '04', title: 'Angry Birds Star Wars', sub: '2012', accent: '#ffe81f',
        desc: 'A licensed crossover that had no business being good and was: lightsabers, force pushes, blaster shots, and the Death Star levels reusing the Space gravity engine. Two of the worlds on this site, in one app.' },
      { num: '05', title: 'Angry Birds Go!', sub: '2013', accent: '#e0a050',
        desc: 'A kart racer. The point at which the birds became a brand to be applied to genres rather than a game.' },
      { num: '06', title: 'Angry Birds 2', sub: '2015', accent: '#c94a3a',
        desc: 'Better looking, multi-stage levels, and a life timer with a shop attached. Free-to-play arrived and the design started answering to it.' },
      { num: '07', title: 'The films', sub: '2016 and 2019',
        accent: '#f0d040',
        desc: 'The Angry Birds Movie and its sequel, which gave the birds a plot they never needed. The second one is the better film, largely because it stops taking the war seriously.' },
    ] },

  { id: 'gone', kind: 'cards', title: 'You Cannot Buy It Any More', note: 'a note on the original',
    lede: 'The version everybody remembers is genuinely hard to obtain legitimately now, which is worth writing down because it is a strange fate for one of the best-selling games ever made.',
    items: [
      { title: 'The original was delisted', sub: 'Pulled from the stores', tag: 'The catch', accent: '#8f9ab0',
        desc: 'Rovio removed the classic paid game from sale, re-released a faithful port as Rovio Classics: Angry Birds in 2022, and then pulled that too. If you bought it, you have it; if you did not, the thing on your phone today is a different game with the same birds on it.',
        meta: 'Owning it is now the only way' },
      { title: 'What replaced it', sub: 'Timers and boosts', tag: 'The trade', accent: '#c94a3a',
        desc: 'Angry Birds 2, Dream Blast, Friends and the rest are free, which means the physics puzzle now sits behind an energy meter and a shop. The 2009 game asked for a dollar once and then left you alone, and that is most of why it is the one people miss.',
        meta: 'A dollar, once' },
    ] },

  /* the music: the theme; nothing Angry Birds is on my playlist yet */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'eight tracks · the games and the films',
    lede: 'Ari Pulkkinen wrote the original theme in a bedroom in Finland for a game that cost almost nothing to make, and Rovio has never managed to replace it in fifteen years of trying. The spin-offs each got their own version of it, which is the fun part: the same tune, re-orchestrated for space, for pigs, and once for a galaxy far, far away.',
    items: [
      { title: 'Angry Birds Theme', accent: '#e03a2a', sub: 'Ari Pulkkinen · 2009 · 1:13',
        desc: 'A tuba, a rattle of drums and a melody that fits in a ringtone, which for a 2009 phone game was the entire brief. Pulkkinen wrote it, the sound effects and the pig grunts, all of it, alone.',
        href: 'https://www.youtube.com/watch?v=r6vX3lrwq-4', link: 'Listen' },
      { title: 'Angry Birds Space Theme', accent: '#5f8fe0', sub: 'Salla Hakkola · Angry Birds Space · 2012 · 1:32',
        desc: 'The same melody with the gravity taken out: strings, a choir and a lot of reverb, because the birds are in orbit now. The best of the re-orchestrations.',
        href: 'https://www.youtube.com/watch?v=bgeZ1XBEZls', link: 'Listen' },
      { title: 'Angry Birds Star Wars Theme', accent: '#f0d040', sub: 'Angry Birds Star Wars · 2012 · 2:06',
        desc: 'Rovio got a real Star Wars licence and the theme got a real Star Wars arrangement: Williams’s fanfare shape wrapped round Pulkkinen’s tune, for a game where the Red bird is Luke and the pigs are the Empire. It should not work.',
        href: 'https://www.youtube.com/watch?v=_Rt0jW3hl8o', link: 'Fan upload' },
      { title: 'Bad Piggies Theme', accent: '#7fbf4f', sub: 'Ilmari Hakkola · Bad Piggies · 2012 · 2:41',
        desc: 'The spin-off where you play as the pigs and build vehicles instead of firing birds, with a theme that is genuinely a better piece of music than the one it is spinning off from. Two and a half minutes of accordion and bad intentions.',
        href: 'https://www.youtube.com/watch?v=EgAOqt8I5ac', link: 'Listen' },
      { title: 'The Angry Birds Movie (Score Medley)', accent: '#e0704a', sub: 'Heitor Pereira · 2016 · 3:19',
        desc: 'Heitor Pereira scored both films. The medley is the whole thing: Pulkkinen’s tune arranged for an orchestra that cost more than the original game did.',
        href: 'https://www.youtube.com/watch?v=nvMHkYJ21Og', link: 'Listen' },
      { title: 'I Need Your Help', accent: '#c9a05f', sub: 'Heitor Pereira · The Angry Birds Movie · 2016 · 2:27',
        desc: 'The trek up the mountain to find the Mighty Eagle, who turns out to be a washed-up recluse in a lake. The one cue in the film that is played completely straight.',
        href: 'https://www.youtube.com/watch?v=8FIenvni0vs', link: 'Listen' },
      { title: 'The Mighty Eagle Song', accent: '#8fa8c0', sub: 'Peter Dinklage · The Angry Birds Movie · 2016 · 2:07',
        desc: 'Peter Dinklage, as the Mighty Eagle, singing his own legend at himself. Two minutes of a man doing a bit, and one of the funniest things in either film.',
        href: 'https://www.youtube.com/watch?v=Ow83XTVkTQc', link: 'Listen' },
      { title: 'I Will Survive', accent: '#e0407a', sub: 'Demi Lovato · The Angry Birds Movie · 2016 · 4:03',
        desc: 'Gloria Gaynor’s 1978 single, redone by Demi Lovato for the end of the first film. A disco standard about surviving a breakup, attached to a film about birds bombing a pig city, and it is used completely sincerely.',
        href: 'https://www.youtube.com/watch?v=Sh3EUvi9b4Y', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'the flock, elsewhere',
    items: [
      { title: 'Angry Birds', href: 'https://www.angrybirds.com/',
        desc: 'The official site: what is still live, and what the birds are being sold as this year.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Angry_Birds',
        desc: 'The series, the download figures, the delistings, and the Sega acquisition.' },
      { title: 'Angry Birds Wiki', href: 'https://angrybirds.fandom.com/wiki/Angry_Birds_Wiki',
        desc: 'Every bird, every pig, and every level of every version, three-starred by somebody with a great deal of patience.' },
    ] },

] };
