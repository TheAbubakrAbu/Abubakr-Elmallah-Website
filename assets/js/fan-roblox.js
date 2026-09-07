/* fan-roblox.js: content for /worlds/roblox/. Rendered by fanpage.js.
   Not a game. A place other people's games are, which is a different thing and
   the only interesting thing about it. No music section on this page on
   purpose: there is no official soundtrack to link to, and a page here does
   not invent one. */
window.FAN_PAGE = {
  when: { at: 'As a kid, on a school laptop', note: 'The other blocky one. Minecraft was the world I built in; this was the arcade you went to because everybody else was already in it, and half of what I played there was made by somebody about my age.' },
  sections: [

  { id: 'what', kind: 'cards', title: 'What It Actually Is', note: 'a toolchain with a lobby attached',
    lede: 'Roblox is not a game and never was. It is an engine, a marketplace and a chat client, and everything you play on it was made by somebody else who is not paid a salary. That is why it looks like nothing in particular: there is no art direction, because there is no art director.',
    items: [
      { title: 'Roblox Studio', sub: 'The whole point', tag: 'The tool', accent: '#e5453c',
        desc: 'The editor ships free with the platform, and it is the same one the platform is built on. A twelve-year-old can open it, drag a part into a world, publish, and have strangers playing it that afternoon. Nothing else in games has ever made that distance that short.',
        meta: 'Free, and the same tool all the way up' },
      { title: 'Luau', sub: 'A dialect of Lua 5.1', tag: 'The language', accent: '#5f9fe0',
        desc: 'Roblox wrote its own fork of Lua, gradually typed and much faster than the original, and open-sourced it under the MIT licence in November 2021. So the first programming language an enormous number of people ever touched was a real one, in a real editor, with a real type checker.',
        meta: 'Open-sourced, November 2021' },
      { title: 'Robux', sub: 'And the Developer Exchange', tag: 'The money', accent: '#f0a83a',
        desc: 'One currency, bought with money and spent on hats. Developers earn it and can put it back through the Developer Exchange for actual currency, with a floor of thirty thousand Robux before you can cash out. Teenagers have paid for university with this.',
        meta: '30,000 Robux to cash out' },
      { title: 'Not Minecraft', sub: 'The comparison everybody makes', tag: 'The difference', accent: '#7fbf4f',
        desc: 'Minecraft hands you one world and a set of rules and gets out of the way. Roblox hands you an engine and a shopfront and takes a cut. I spent far more hours in the first and far more different games in the second.',
        href: '/worlds/minecraft/', link: 'The one I actually lived in',
        meta: 'One world, versus a shopping centre of them' },
    ] },

  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the platform, and the games I actually played',
    lede: 'David Baszucki and Erik Cassel built it after Knowledge Revolution, where they made Interactive Physics: a 2D physics lab for schools. The story Baszucki tells is that the students were not running the experiments, they were building things and smashing them, and that is the whole company in one observation.',
    items: [
      { title: 'The Platform', sub: '2004 – now', unit: 'moment',
        desc: 'DynaBlocks in beta, then the name it kept, then twenty years of it.',
        rows: [
          { n: 'DynaBlocks, in beta', y: '2004' },
          { n: 'Public launch as Roblox', y: '2006', big: true },
          { n: 'Roblox Studio', y: '2006', big: true },
          { n: 'Erik Cassel dies of cancer', y: '2013' },
          { n: 'Direct listing, valued around $45bn', y: '2021', big: true },
          { n: 'Luau open-sourced', y: '2021' },
          { n: '85.3 million daily active users', y: '2025' },
        ] },
      { title: 'The Ones Everybody Played', sub: 'made by users, not by Roblox', unit: 'game',
        desc: 'None of these were made by the company. By July 2020 at least twenty games on the platform had been played more than a billion times each.',
        rows: [
          { n: 'Work at a Pizza Place', y: '2008', big: true },
          { n: 'Natural Disaster Survival', y: '2008', big: true },
          { n: 'Murder Mystery 2', y: '2014' },
          { n: 'MeepCity', y: '2016' },
          { n: 'Jailbreak', y: '2017', big: true },
          { n: 'Adopt Me!', y: '2017', big: true },
          { n: 'Tower of Hell', y: '2018' },
          { n: 'Blox Fruits', y: '2019' },
        ] },
    ] },

  { id: 'oof', kind: 'cards', title: 'The Oof', note: 'the strangest copyright story in games',
    lede: 'For about sixteen years, everybody who died in anything on this platform made the same noise, and nobody involved knew where it had come from. Then somebody worked it out.',
    items: [
      { title: 'Where it came from', sub: 'Messiah, 2000', tag: 'The sound', accent: '#e5453c',
        desc: 'A quarter-second grunt recorded by Tommy Tallarico for a Shiny Entertainment game almost nobody played. Roblox says the founders got it off a licensed stock sound CD-ROM while they were building the thing, which is exactly how a sound ends up somewhere nobody remembers putting it.',
        meta: 'Shiny Entertainment · 2000' },
      { title: 'What happened to it', sub: 'Pulled in 2022', tag: 'The dispute', accent: '#f0a83a',
        desc: 'Tallarico claimed it in 2019, an agreement followed, and in 2022 the default death sound was replaced and the original became a paid asset: a dollar, or a hundred Robux, to use the noise your entire childhood made.',
        meta: '100 Robux to use it' },
      { title: 'And then it came back', sub: 'July 2025', tag: 'The end of it', accent: '#5fbf5f',
        desc: 'Three years later Roblox put it back. There is no better illustration of what this platform is than a company having to negotiate the rights to a sound its own users had already decided was theirs.',
        meta: 'Reinstated, July 2025' },
      { title: 'The noob', sub: 'Yellow head, blue and green', tag: 'The look', accent: '#5f9fe0',
        desc: 'The default avatar, worn by anybody who had never spent anything, and therefore an insult and a badge at the same time. A whole visual language came out of a character nobody designed on purpose.',
        meta: 'The default, and the joke' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Roblox',
        desc: 'The platform, the founders, the numbers, and the arguments about it.' },
      { title: 'Roblox oof', href: 'https://en.wikipedia.org/wiki/Roblox_oof',
        desc: 'A sound effect with its own encyclopaedia article, which tells you most of what you need to know.' },
      { title: 'Luau', href: 'https://luau.org/',
        desc: 'The language, open-sourced: the type checker, the docs, and the sandbox.' },
    ] },

] };
