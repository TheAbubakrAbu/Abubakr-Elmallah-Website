/* fan-mc.js: content for /franchises/minecraft/. Rendered by fanpage.js.
   Y-levels and durability are for current Java Edition. */
window.FAN_PAGE = { sections: [

  { id: 'tiers', kind: 'tiles', title: 'Tool Tiers', note: 'durability · what it can mine',
    lede: 'The whole progression loop of the game is one ladder: punch a tree, and eventually you are standing in the End.',
    items: [
      { title: 'Wood', accent: '#a9763f', sub: '59 uses', desc: 'Mines stone. Lasts about one cave.' },
      { title: 'Stone', accent: '#8f8f8f', sub: '131 uses', desc: 'Mines iron. The first tier that feels like a tool.' },
      { title: 'Iron', accent: '#e0e0e0', sub: '250 uses', desc: 'Mines diamond, redstone and lapis. Most of the game happens here.' },
      { title: 'Gold', accent: '#f0c840', sub: '32 uses', desc: 'Fastest tier and the most fragile. Best enchantments, worst idea.' },
      { title: 'Diamond', accent: '#4fd0d6', sub: '1,561 uses', desc: 'Mines obsidian, which is the door to the Nether.' },
      { title: 'Netherite', accent: '#8a6a5f', sub: '2,031 uses', desc: 'Survives lava, floats in it, and needs ancient debris from below Y-16.' },
    ] },

  { id: 'ores', kind: 'tiles', title: 'Where To Dig', note: 'best Y-level per ore',
    items: [
      { title: 'Diamond', accent: '#4fd0d6', sub: 'Y −59', desc: 'Deepslate layers. Bring a water bucket for the lava.' },
      { title: 'Ancient Debris', accent: '#8a6a5f', sub: 'Y 15 (Nether)', desc: 'Bed mining, or TNT. Never exposed to air.' },
      { title: 'Redstone', accent: '#e04a3a', sub: 'Y −59', desc: 'Same depth as diamond, ten times as common.' },
      { title: 'Gold', accent: '#f0c840', sub: 'Y −16', desc: 'And all over the badlands, near the surface.' },
      { title: 'Iron', accent: '#d8d8d8', sub: 'Y 16 & 232', desc: 'Everywhere. Mountains up top are the fastest source.' },
      { title: 'Copper', accent: '#c96f4f', sub: 'Y 48', desc: 'Dripstone caves. It oxidises green if you leave it out.' },
      { title: 'Lapis', accent: '#3f5fd0', sub: 'Y 0', desc: 'The whole enchanting table runs on it.' },
      { title: 'Emerald', accent: '#3fd06f', sub: 'Y 236', desc: 'Mountain biomes only, and one block at a time.' },
      { title: 'Coal', accent: '#4a4a4a', sub: 'Y 96', desc: 'The first thing you ever need and the last thing you ever lack.' },
    ] },

  { id: 'dimensions', kind: 'cards', title: 'The Three Dimensions', note: 'overworld · nether · end',
    items: [
      { title: 'The Overworld', sub: 'Where you spawn', tag: 'Home', desc: 'Sixty-odd biomes, a day-night cycle of twenty minutes, and a build limit from Y −64 to 320.', meta: 'Villages · mineshafts · ancient cities' },
      { title: 'The Nether', sub: 'Eight blocks to one', tag: 'Portal', desc: 'A ceiling instead of a sky, no water, and the fastest way to travel long distances in the Overworld.', meta: 'Fortresses · bastions · blaze rods' },
      { title: 'The End', sub: 'The last stop', tag: 'Boss', desc: 'Floating obsidian pillars, a dragon on top of them, and the credits poem when it falls.', meta: 'Elytra · shulkers · End cities' },
    ] },

  { id: 'mobs', kind: 'cards', title: 'Mobs Worth Respecting', note: 'the ones that ended a run',
    items: [
      { title: 'Creeper', sub: 'Hisses · 1.5 seconds', tag: 'Hostile', desc: 'A texture-mapping accident that became the mascot. Silent until it is not.', meta: 'Blast radius 3 · drops gunpowder' },
      { title: 'Enderman', sub: 'Do not look up', tag: 'Hostile', desc: 'Neutral until you make eye contact with its head. Teleports behind you, always.', meta: 'Drops ender pearls' },
      { title: 'The Warden', sub: '500 health', tag: 'Boss-tier', desc: 'Blind, listens for you, and hits hard enough to kill through full netherite. Sneak.', meta: 'Deep Dark · ancient cities' },
      { title: 'The Wither', sub: 'You build it', tag: 'Boss', desc: 'Three skulls and four soul sand, and then a fight you should have prepared more for.', meta: 'Drops the nether star' },
      { title: 'Ender Dragon', sub: 'The final boss', tag: 'Boss', desc: 'Beds do not work in the End as beds. They work very well as bombs.', meta: 'End · 200 health' },
      { title: 'Villager', sub: 'Hmm.', tag: 'Passive', desc: 'The entire economy. Cure a zombie one and the prices never recover.', meta: 'Trades · workstations' },
    ] },

  { id: 'updates', kind: 'timeline', title: 'Updates That Changed It', note: '2009 – now',
    items: [
      { when: 'May 2009', title: 'Cave Game', desc: 'Notch posts a browser prototype. Blocks, and not much else.' },
      { when: 'Nov 2011', title: '1.0, Release', desc: 'The End, the Ender Dragon, and an actual ending to reach.' },
      { when: 'Jun 2020', title: '1.16, Nether Update', desc: 'Biomes in the Nether, netherite, piglin trading. The best single update it has had.' },
      { when: 'Dec 2021', title: '1.18, Caves & Cliffs', desc: 'World height doubled, terrain generation rewritten, mountains that look like mountains.' },
      { when: 'Jun 2022', title: '1.19, The Wild', desc: 'The Deep Dark, ancient cities and the Warden: a stealth game inside a building game.' },
      { when: 'Now', title: 'Still going', desc: 'Sixteen years in, still the best-selling game ever made, and still the one I learned logic from.' },
    ] },

] };
