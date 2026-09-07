/* fan-beyblade.js: content for /worlds/beyblade/. Rendered by fanpage.js.
   A customisation game about angular momentum, sold to eight-year-olds. */
window.FAN_PAGE = {
  when: { at: 'As a kid', note: 'The rare toy-anime pairing where the toy is genuinely a system rather than a piece of merchandise with a cartoon attached.' },
  sections: [

  { id: 'types', kind: 'cards', title: 'The Four Types', note: 'and why the toy is actually a system',
    lede: 'A Beyblade comes apart into a handful of parts and every combination is a real trade-off. That is the whole hook: you are not collecting characters, you are building for a matchup, and the physics is not decorative.',
    items: [
      { title: 'Attack', sub: 'Fast, aggressive, short-lived', tag: 'Type', accent: '#e0483a',
        desc: 'A flat tip that skids across the arena into the opponent. Enormous impact, terrible stamina, and it will knock itself out of the ring as often as it wins. Beats Stamina, loses to Defence.',
        meta: 'Flat tip · low spin time' },
      { title: 'Defence', sub: 'Heavy, low, immovable', tag: 'Type', accent: '#5f9fe0',
        desc: 'Wide, weighted at the rim, sitting on a flat-ish tip to absorb hits. Made to survive an Attack type running out of energy. Beats Attack, loses to Stamina.',
        meta: 'Weight at the rim' },
      { title: 'Stamina', sub: 'Spin until the other one stops', tag: 'Type', accent: '#5fbf7f',
        desc: 'Tall, thin, on a sharp tip with almost no friction. It does nothing at all except outlast you. Beats Defence, loses to Attack.',
        meta: 'Sharp tip · minimal contact' },
      { title: 'Balance', sub: 'A bit of everything', tag: 'Type', accent: '#f0c840',
        desc: 'The compromise, and usually the worst option competitively, which is a lesson a lot of children learned about game design without noticing.',
        meta: 'Jack of all trades' },
      { title: 'The launch', sub: 'The one thing skill actually is', tag: 'The player', accent: '#a06fd0',
        desc: 'Rip cord, winder or string launcher, and the angle and force you use decide where the top lands and how it moves. It is the only input you get, and against equal builds it is the whole game.',
        meta: 'Let it rip' },
      { title: 'Burst', sub: 'The 2015 rules change', tag: 'The reboot', accent: '#e0704a',
        desc: 'Takara added a third win condition: hit a Beyblade hard enough and it comes apart in the arena. It made matches shorter, louder and much more sellable, since a burst top needs rebuilding and possibly replacing.',
        meta: 'Ring out, sleep out, burst' },
    ] },

  { id: 'works', kind: 'works', title: 'Everything In It', note: 'four generations of toy and anime',
    lede: 'Takara (later Takara Tomy) has rebooted this four times, each with its own toy line and its own anime, and each generation is a genuine redesign of the toy rather than a repaint.',
    items: [
      { title: 'The Generations', sub: '1999 – now', unit: 'era',
        desc: 'Original, Metal, Burst, X. Each one has its own anime run and its own incompatible hardware.',
        rows: [
          { n: 'Beyblade (original)', y: '1999', big: true },
          { n: 'Beyblade: Metal Fusion / Metal Saga', y: '2008', big: true },
          { n: 'Beyblade Burst', y: '2015', big: true },
          { n: 'Beyblade X', y: '2023' },
        ] },
      { title: 'The Anime', sub: '2001 – now', unit: 'series',
        desc: 'Each toy generation gets its own show, and each show exists to demonstrate the new parts.',
        rows: [
          { n: 'Beyblade', y: '2001' },
          { n: 'Beyblade V-Force', y: '2002' },
          { n: 'Beyblade G-Revolution', y: '2003' },
          { n: 'Metal Fusion', y: '2009' },
          { n: 'Metal Masters', y: '2010' },
          { n: 'Metal Fury', y: '2011' },
          { n: 'Shogun Steel', y: '2012' },
          { n: 'Beyblade Burst', y: '2016' },
          { n: 'Beyblade X', y: '2023' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'three tracks · one per generation',
    lede: 'Every generation gets an opening built to be shouted along to, and the English dubs commissioned their own rather than subtitling the Japanese ones, which is why most people outside Japan know completely different songs.',
    items: [
      { title: 'Let\'s Beyblade', accent: '#4f9fe0', sub: 'Original series · 2001 · 3:01',
        desc: 'The one with "let it rip" in it. The English opening for the original run, and the reason that phrase followed an entire generation into adulthood.',
        href: 'https://www.youtube.com/watch?v=UdyBu_1aWso', link: 'Listen' },
      { title: 'Metal Fusion Openings', accent: '#e0704a', sub: 'Metal Saga · 2009 – 2012 · 3:13',
        desc: 'All four English openings from the Metal era, back to back, from the official channel. This is the generation most people mean when they say Beyblade.',
        href: 'https://www.youtube.com/watch?v=SWkyBfTi8XA', link: 'Watch' },
      { title: 'Our Time', accent: '#f0c840', sub: 'Beyblade Burst · 2016 · 1:44',
        desc: 'The Burst theme, as an actual music video. Burst is the generation where the marketing budget became visible.',
        href: 'https://www.youtube.com/watch?v=2OzD4b_sNmA', link: 'Watch' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Beyblade',
        desc: 'The Takara history, the four generations, and the sales figures.' },
      { title: 'Beyblade Wiki', href: 'https://beyblade.fandom.com/wiki/Beyblade_Wiki',
        desc: 'Every part, every combination, and the competitive metagame for each generation.' },
      { title: 'World Beyblade Organization', href: 'https://worldbeyblade.org/',
        desc: 'The fan-run competitive body, which has published tournament rules since 2008.' },
    ] },

] };
