/* fan-knotts.js: content for /franchises/knotts/. Rendered by fanpage.js.
   Every ride and land links back to the park's own page. */
window.FAN_PAGE = {
  when: { at: 'Elementary school', note: 'A classic, and I have loved the ghost-town feel of it since elementary school.' },
  sections: [

  { id: 'story', kind: 'timeline', title: 'How A Berry Stand Became A Park', note: 'Buena Park, California',
    items: [
      { when: '1920', title: 'A roadside stand', desc: 'Walter and Cordelia Knott sell berries, preserves and pies from a stand on Highway 39. That is the entire business.' },
      { when: '1932', title: 'The boysenberry', desc: 'Walter tracks down the last surviving vines of a cross Rudolph Boysen had abandoned, nurses them back, and names the berry after him. It is still the thing the park tastes like.' },
      { when: '1934', title: 'Mrs Knott\u2019s Chicken Dinner', desc: 'Cordelia serves eight chicken dinners on her wedding china for 65 cents each. Within a few years the queue is hours long and runs down the road.' },
      { when: '1940', title: 'Ghost Town', desc: 'Walter builds an Old West street out of real buildings hauled in from abandoned towns, purely to give the dinner queue something to look at. It is the first themed land in America, fifteen years before Disneyland opens.' },
      { when: '1960', title: 'Calico Mine Ride', desc: 'A full dark ride through a working mine, built in-house, and still running.' },
      { when: '1968', title: 'A gate goes up', desc: 'After nearly fifty years of being free to walk into, the farm starts charging admission.' },
      { when: '1983', title: 'Camp Snoopy', desc: 'The Peanuts gang moves in, and Knott\u2019s becomes the park a lot of Southern California kids see first.' },
      { when: '1997 to now', title: 'Under new owners', desc: 'The Knott family sells to Cedar Fair, and the park keeps the ghost town, the boysenberry and the chicken dinner exactly where they were.' },
    ] },

  { id: 'visited', kind: 'stats', title: 'The Local One', note: 'been going since elementary school',
    items: [
      { title: 'Since elementary', sub: 'How long', desc: 'The one I have been going to longest, and the one closest to home.' },
      { title: '1 park', sub: 'Plus Soak City', desc: 'No second gate, no resort sprawl, no monorail. You can cross the whole thing in ten minutes.' },
      { title: '7 miles', sub: 'From Disneyland', desc: 'Buena Park to Anaheim. Knott\u2019s got there fifteen years earlier.' },
      { title: 'Every October', sub: 'Scary Farm', desc: 'For anybody who grew up in Orange County this is simply what October is.' },
    ] },

  { id: 'lands', kind: 'cards', title: 'The Four Lands', note: 'walkable in an afternoon, which is the point',
    lede: 'Knott\u2019s is small next to the parks down the road and that is its best feature. You can cross the whole thing in ten minutes, the queues move, and nothing about the day is a logistics exercise. It is the one big park in Southern California you can go to on a whim.',
    items: [
      { title: 'Ghost Town', sub: '1940 · the original', tag: 'Land', accent: '#c9924a',
        desc: 'The oldest themed land in America and still the best part of the park. Real buildings, moved here and rebuilt, with a working blacksmith, a stagecoach, panning for gold and the Bird Cage Theatre. GhostRider runs along the edge of it and the Calico Mine Ride goes into the mountain at the back.',
        meta: 'Calico Mine · Log Ride · GhostRider' },
      { title: 'Fiesta Village', sub: '1969', tag: 'Land', accent: '#d8934a',
        desc: 'The Spanish-California side of the park, and where Montezooma has fired people forwards and backwards through a loop since 1978. Rebuilt in 2024 and still the ride that defines the area.',
        meta: 'Montezooma · Jaguar!' },
      { title: 'The Boardwalk', sub: 'Seaside, inland', tag: 'Land', accent: '#5fa8d0',
        desc: 'The thrill corner. Xcelerator launching a fifties hot rod to eighty-two miles an hour in a bit over two seconds, HangTime hanging you over a drop before it takes it, and the funnel cake.',
        meta: 'Xcelerator · HangTime' },
      { title: 'Camp Snoopy', sub: 'Since 1983', tag: 'Land', accent: '#f0c840',
        desc: 'The first Peanuts land anywhere, and the licence that every Cedar Fair park ended up sharing. Built as a High Sierra camp around a creek, and genuinely charming rather than just a place to park children.',
        meta: 'The oldest Peanuts licence in parks' },
    ] },

  { id: 'rides', kind: 'cards', title: 'The Rides', note: 'oldest first',
    items: [
      { title: 'Calico Mine Ride', sub: '1960', tag: 'Dark ride', desc: 'Ore cars through a mountain of glowing minerals and a cave-in. Built by the park itself, and restored rather than replaced.',
        href: 'https://www.knotts.com/rides/calico-mine-ride', link: 'knotts.com', meta: 'Ghost Town' },
      { title: 'Timber Mountain Log Ride', sub: '1969', tag: 'Water', desc: 'One of the oldest log flumes anywhere, with a full show building of animatronics on the way up.',
        href: 'https://www.knotts.com/rides/timber-mountain-log-ride', link: 'knotts.com', meta: 'Ghost Town' },
      { title: 'Montezooma', sub: '1978', tag: 'Coaster', desc: 'A shuttle loop that fires you forwards, through a loop, and then does the whole thing again backwards. Rebuilt in 2024.',
        href: 'https://www.knotts.com/rides', link: 'knotts.com', meta: 'Fiesta Village' },
      { title: 'GhostRider', sub: '1998', tag: 'Coaster', desc: 'The longest wooden coaster on the west coast, retracked in 2016 and much better for it.',
        href: 'https://www.knotts.com/rides/ghostrider', link: 'knotts.com', meta: 'Ghost Town' },
      { title: 'Xcelerator', sub: '2002', tag: 'Coaster', desc: 'Nought to eighty-two miles an hour in 2.3 seconds, up a top hat, in a fifties hot-rod car.',
        href: 'https://www.knotts.com/rides/xcelerator-the-ride', link: 'knotts.com', meta: 'Boardwalk' },
      { title: 'Silver Bullet', sub: '2004', tag: 'Coaster', desc: 'An inverted coaster that runs out over the middle of the park, so you hear it all day from anywhere.',
        href: 'https://www.knotts.com/rides/silver-bullet', link: 'knotts.com', meta: 'Ghost Town' },
    ] },

  { id: 'town', kind: 'tiles', title: 'Ghost Town', note: 'the reason the place exists',
    lede: 'Real buildings, moved in from real abandoned towns, and a street that has been kept in character for eighty-five years.',
    items: [
      { title: 'The Calico Railroad', accent: '#c9762f', sub: 'Narrow gauge, 1881', desc: 'Actual nineteenth-century rolling stock, still running a loop of the park, still getting robbed on schedule.' },
      { title: 'Bird Cage Theatre', accent: '#d8934a', sub: 'Since 1954', desc: 'Melodrama on a tiny stage, where the audience is meant to boo the villain.' },
      { title: 'The Blacksmith', accent: '#a8703a', sub: 'Working forge', desc: 'A real smith making real hooks and hardware, which is a strange thing to find inside a theme park.' },
      { title: 'Ghost Town Alive', accent: '#e0a050', sub: 'Summer', desc: 'The whole street turned into an improvised play you can wander into and be given a job in.' },
      { title: 'Boysenberry Festival', accent: '#8f4fd0', sub: 'Spring', desc: 'A few weeks where every stall sells something made of the berry the park saved from extinction.' },
      { title: 'The Haunt', accent: '#6f7f4f', sub: 'Autumn, since 1973', desc: 'Knott\u2019s invented the seasonal theme-park scare event. Every park that runs one now is copying this.' },
    ] },

  { id: 'seasons', kind: 'tiles', title: 'The Year', note: 'the park runs on seasons',
    items: [
      { title: 'Boysenberry Festival', accent: '#b06fd8', sub: 'Spring', desc: 'Six weeks where every stall sells something purple, including things that probably should not be.' },
      { title: 'Ghost Town Alive', accent: '#d8934a', sub: 'Summer', desc: 'The whole street becomes an improvised play. Actors stay in character all day and will give you a job in it.' },
      { title: 'The Haunt', accent: '#6f7f4f', sub: 'Autumn, since 1973', desc: 'Knott\u2019s invented the seasonal theme park scare event. Every park running one now is copying this park.' },
      { title: 'Merry Farm', accent: '#8fb0d0', sub: 'Winter', desc: 'Ghost Town in snow, a tree lighting, and the calmest the place gets all year.' },
      { title: 'Peanuts Celebration', accent: '#f0c840', sub: 'Late winter', desc: 'Camp Snoopy has had the Peanuts licence since 1983, longer than most park licences last.' },
    ] },

  { id: 'haunt', kind: 'cards', title: 'Knott\u2019s Scary Farm', note: 'they invented this, in 1973',
    lede: 'Every Halloween event at every theme park in the world is downstream of this one. In 1973 Knott\u2019s put some staff in costume, turned the lights off in Ghost Town and opened for three nights. It worked, and now it is a format the entire industry runs.',
    items: [
      { title: 'It started as an experiment', sub: '1973 · three nights', tag: 'Origin', accent: '#6f7f4f',
        desc: 'October was a dead month, so they tried something. A few dozen employees in makeup, the ghost town lit badly on purpose, and a queue around the block. Nothing about it was planned as an industry standard.',
        meta: 'Now every major park' },
      { title: 'Ghost Town does the work', sub: 'The setting', tag: 'Why it works', accent: '#c9924a',
        desc: 'The park has an enormous advantage: it already looks like this. Most parks have to dress a bright cheerful street into something frightening; Knott\u2019s just turns the lights down on a genuine ghost town and lets the fog in.',
        meta: 'No set dressing required' },
      { title: 'The scare zones', sub: 'The streets between mazes', tag: 'The format', accent: '#8f6fd0',
        desc: 'The bit people underrate. Mazes are a queue and a corridor; the fog-filled streets between them, with monsters roaming free, are where the night actually lives. Knott\u2019s invented that too.',
        meta: 'Fog to the knees' },
      { title: 'Local institution', sub: 'Every October', tag: 'The honest bit', accent: '#d8934a',
        desc: 'For anybody who grew up in Orange County this is simply what October is. It is not a park doing a Halloween promotion — it is the event the park is most famous for, and the one the calendar is built around.',
        meta: 'Buena Park' },
    ] },

  { id: 'firsts', kind: 'cards', title: 'The Firsts', note: 'claims the park makes, and mostly earns',
    items: [
      { title: 'The first themed land', sub: 'Ghost Town, 1940', tag: 'Claim', desc: 'Widely credited as the first permanently themed area at any American attraction, fifteen years before Disneyland opened seven miles away.', meta: 'Buena Park' },
      { title: 'Built in house', sub: 'The workshop', tag: 'Engineering', desc: 'The Calico Mine Ride and the Log Ride were designed and built by the park\u2019s own team rather than bought from a manufacturer.', meta: 'Bud Hurlbut' },
      { title: 'The seasonal haunt', sub: '1973', tag: 'Format', desc: 'Started as a few staff in costume on a slow October weekend, and became an industry standard.', meta: 'Now every major park' },
      { title: 'Free for 48 years', sub: 'Until 1968', tag: 'History', desc: 'You could walk into the ghost town, watch the shows and eat, and pay only per ride. The gate went up nearly half a century in.', meta: 'Admission introduced' },
    ] },

  { id: 'food', kind: 'cards', title: 'The Food', note: 'older than the rides',
    items: [
      { title: 'Mrs Knott\u2019s Chicken Dinner', sub: 'Since 1934', tag: 'Restaurant', desc: 'Fried chicken, mashed potatoes, a biscuit and rhubarb, served outside the gate so you do not need a ticket to eat it.',
        href: 'https://www.knotts.com/dining', link: 'knotts.com', meta: 'Outside the park gate' },
      { title: 'Boysenberry pie', sub: 'The signature', tag: 'Bakery', desc: 'The berry exists commercially because Walter Knott went looking for it. The pie is the whole story in one slice.', meta: 'Ghost Town bakery' },
      { title: 'Funnel cake', sub: 'Boardwalk', tag: 'Snack', desc: 'With boysenberry, obviously.', meta: 'Boardwalk' },
      { title: 'Knott\u2019s Berry Farm jam', sub: 'In supermarkets', tag: 'Retail', desc: 'The preserves outlived the family ownership and are still on shelves nationally.', meta: 'Since the 1920s' },
    ] },


  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Knott’s Berry Farm', href: 'https://www.knotts.com/',
        desc: 'The official park site: hours, rides and Ghost Town.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Knott%27s_Berry_Farm',
        desc: 'A boysenberry stand in 1920 that turned into a theme park.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "roll",
  title: "A Night At Scary Farm",
  intro: "They invented this in 1973 \u2014 a few staff in costume, the lights off in Ghost Town, three nights in a dead October. Every Halloween event at every park in the world is downstream of it. Walk into the fog and see what finds you.",
  prompt: "Ghost Town after dark. The fog is knee-deep.",
  button: "Go in",
  again: "Go back in",
  wait: [
        "The lights go out along the street.",
        "Fog, to the knees.",
        "Something is walking behind you."
      ],
  items: [
    { n: "A scare zone", s: "The streets between mazes", c: "#6f7f4f", w: 4, said: "The fog moves and there are six of them in it.", d: "M3 16c4-2 6 2 9 0s5-2 9 0 M7 11a2 2 0 1 1 0 .1 M15 10a2 2 0 1 1 0 .1", note: "The bit people underrate. Mazes are a queue and a corridor; the fog-filled streets between them, with monsters roaming free, are where the night actually lives. Knott\u2019s invented those too." },
    { n: "Ghost Town does the work", s: "No set dressing needed", c: "#c9924a", w: 3, said: "You forget it is a set. It has been a ghost town since 1940.", d: "M4 20h16 M6 20V9l3-3 3 3 3-3 3 3v11 M10 20v-5h4v5", note: "The park\u2019s enormous advantage: it already looks like this. Everywhere else has to dress a bright cheerful street into something frightening \u2014 Knott\u2019s just turns the lights down." },
    { n: "The Calico Mine Ride", s: "In the dark", c: "#d8934a", w: 2, said: "The mine ride, but they have put things in it.", d: "M4 20V13a8 8 0 0 1 16 0v7 M8 20v-6h8v6 M12 8V4", note: "Built by the park\u2019s own workshop in 1960 and still running. During the Haunt they put actors inside it, which is entirely unfair." },
    { n: "Somebody with a chainsaw", s: "No blade, still effective", c: "#8f6fd0", w: 3, said: "Chainsaw. Behind you. It has no chain and it does not matter.", d: "M3 11h9l7-3v6l-7-2H3z M3 11v3h7 M6 11v3", note: "The oldest trick they have and it works every single year on every single person, including people who know it is coming." },
    { n: "You are fine, actually", s: "Boysenberry funnel cake", c: "#b06fd8", w: 2, said: "You get out and buy a funnel cake. With boysenberry.", d: "M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14z M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z", note: "The correct end to the night. Walter Knott went looking for an abandoned berry, nursed it back on his own land, and the whole park is downstream of one rescued plant." },
  ],
};
