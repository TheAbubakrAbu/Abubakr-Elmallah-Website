/* fan-knotts.js: content for /franchises/knotts/. Rendered by fanpage.js.
   Every ride and land links back to the park's own page. */
window.FAN_PAGE = { sections: [

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

] };
