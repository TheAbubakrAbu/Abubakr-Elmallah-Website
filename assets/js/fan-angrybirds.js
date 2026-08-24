/* fan-angrybirds.js: content for /worlds/angry-birds/. Rendered by fanpage.js.
   A projectile-motion problem with a grudge. Rovio's fifty-second game, and
   for a couple of years the most recognisable thing on a phone. */
/* NO `when:` BLOCK YET, on purpose. That field is when Abubakr actually got
   into the thing, and the rest of this site's fan pages mean it literally. A
   plausible-sounding date here would make the one honest line on the page
   unreliable, so it is left for him to fill in:

     when: { at: '...', note: '...' },

   goes directly above `sections`. Same reason the tile in fandom-data.js has
   no `when`. */
window.FAN_PAGE = {
  sections: [

  { id: 'design', kind: 'cards', title: 'Why It Worked', note: 'the design, not the birds',
    lede: 'Angry Birds is one control. You drag back, you let go, and the rest is ballistics and collapsing timber. Everything that made it enormous is downstream of that: it is legible in one glance, it takes four seconds to attempt, and every failure is obviously your own fault.',
    items: [
      { title: 'One input, no tutorial', sub: 'Drag, release, watch', tag: 'The control', accent: '#e03a2a',
        desc: 'No buttons, no menus mid-level, no read-the-instructions screen. The slingshot draws a dotted arc of where the last shot went, so the game teaches you the parabola by showing you your own mistake and letting you adjust it by a thumb-width.',
        meta: 'The whole interface is one gesture' },
      { title: 'The physics is the content', sub: 'Box2D doing the writing', tag: 'The engine', accent: '#e0a050',
        desc: 'Nothing in a level is scripted. Wood, glass and stone have different mass and different failure behaviour, and a good shot is one that lets the structure fall on the pigs for you. The satisfying part is never the bird, it is the collapse.',
        meta: 'Score comes from the wreckage' },
      { title: 'Three stars', sub: 'Finishing is not the goal', tag: 'The hook', accent: '#f0d040',
        desc: 'Clearing a level is easy; clearing it with birds left over and the right debris is not. The star rating converts a five-minute game into a hundred-hour one without adding a single mechanic, which is the single best design decision in it.',
        meta: 'The reason anyone replayed it' },
      { title: 'A five-second loss', sub: 'Retry before you are annoyed', tag: 'The loop', accent: '#5fbf6a',
        desc: 'Fail and you are shooting again almost immediately. No load, no run to lose, no punishment beyond the shot itself. It is the same reason Flappy Bird and Threes worked: the cost of another go has to be lower than the cost of putting the phone down.',
        meta: 'Friction is the enemy' },
      { title: 'Each bird is one verb', sub: 'And it is on the bird', tag: 'The roster', accent: '#7fb8e8',
        desc: 'Blue splits into three, yellow accelerates, black explodes, white drops an egg, green turns around. You can read the ability off the shape and colour before you have used it once, and the level tells you which you are getting and in what order.',
        meta: 'The order is the puzzle' },
      { title: 'It stopped being a game', sub: 'And that is what killed it', tag: 'The honest bit', accent: '#8f9ab0',
        desc: 'Plush toys, a cartoon, two films, a theme-park area, an activity park chain, cereal. Rovio hired for a media company and the games got worse: the later ones are match-three and free-to-play timers with the same birds bolted on.',
        meta: 'The 2009 one is still the good one' },
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

  { id: 'facts', kind: 'stats', title: 'By the Numbers', note: 'the ones worth knowing',
    items: [
      { title: '52', sub: 'Rovio’s game number', desc: 'Fifty-one games before it, none of which you can name.', accent: '#e03a2a' },
      { title: '2009', sub: 'December, on iOS', desc: 'A paid app, at 99 cents, before free-to-play took the category.', accent: '#f0d040' },
      { title: '3', sub: 'Stars per level', desc: 'The rating that turned a short game into a long one.', accent: '#5fbf6a' },
      { title: '2023', sub: 'Sega bought Rovio', desc: 'For around 706 million euros, fourteen years after the first game.', accent: '#7fb8e8' },
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
