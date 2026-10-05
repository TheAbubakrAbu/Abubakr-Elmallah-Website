/* mc-servers.js: my Minecraft multiplayer list, drawn once and shown on two
   pages (/worlds/minecraft/ and /gaming/), the way lego-games.js is.

   WHERE IT COMES FROM. iCloud's Minecraft/Servers/ was thirteen empty text
   files, each named for an address: a server list kept by hand (now in
   _originals/minecraft-servers/, out of iCloud). Twelve were
   saved on 23 December 2016 and StarWarsWM on 8 July 2017; `saved` is each
   file's own date.

   THE STATUS IS A SNAPSHOT, NOT A LIVE PING. Every address was asked once, on
   30 September 2026, through api.mcsrvstat.us: `players` and `motd` are what
   came back, and `up: false` means nothing answered that day. Nothing here is
   fetched when the page loads. The icons are the servers' own 64px favicons
   from that same check, in /assets/img/mc-servers/ (both Mineplex addresses
   sent the same one); a server that is down, or sent none, gets the game's
   own blank pack square, drawn in CSS.

   Rendered by kind 'serverlist' in fanpage.js; the look is .mcs-* in
   fanpages.css. */
window.MC_SERVERS = {
  id: 'server-list', kind: 'serverlist', title: 'My Server List', note: 'saved December 2016',
  lede: 'Before Imagine Fun and the Realm, the multiplayer screen was thirteen addresses typed in by hand: two Harry Potter servers, two Star Wars ones, Mineplex twice and 2b2t. I asked every one of them again on 30 September 2026, and six still answer. Click one to copy its address.',
  checked: '30 Sep 2026',
  items: [
    { host: '2b2t.org', name: '2b2t', icon: '2b2t.png', up: true, players: '1,209',
      motd: ['2B Updated to 1.21.4', '2T 2b2t.org - status.2b2t.org'], saved: '2016-12-23' },
    { host: 'us.mineplex.com', name: 'Mineplex, US', icon: 'mineplex.png', up: true, players: '318',
      motd: ['[ Mineplex Games ]', 'CASTLE SIEGE - OUT NOW!'], saved: '2016-12-23' },
    { host: 'eu.mineplex.com', name: 'Mineplex, EU', icon: 'mineplex.png', up: true, players: '308',
      motd: ['[ Mineplex Games ]', 'CASTLE SIEGE - OUT NOW!'], saved: '2016-12-23' },
    { host: 'play.potterworldmc.com', name: 'PotterworldMC', icon: 'potterworldmc.png', up: true, players: '17',
      motd: ['PotterworldMC', 'Connect using 26.1+'], saved: '2016-12-23' },
    { host: 'hp.knockturnmc.com', name: 'KnockturnMC', up: true, players: '0',
      motd: ['<<KnockturnMC>>', 'A Magical World to Explore - Towny, Events, & More!'], saved: '2016-12-23' },
    { host: 'mc.snapcraft.net', name: 'Snapcraft', icon: 'snapcraft.png', up: true, players: '0',
      motd: ['SNAPCRAFT'], saved: '2016-12-23' },
    { host: 'play.starwarsmc.org', name: 'Star Wars MC', up: false, saved: '2016-12-23' },
    { host: 'StarWarsWM.us.to', name: 'StarWarsWM', up: false, saved: '2017-07-08' },
    { host: 'hivemc.eu', name: 'The Hive', up: false, saved: '2016-12-23' },
    { host: 'TreasureWars.net', name: 'TreasureWars', up: false, saved: '2016-12-23' },
    { host: 'Play.modrealms.com', name: 'ModRealms', up: false, saved: '2016-12-23' },
    { host: 'mc.MineNite.com', name: 'MineNite', up: false, saved: '2016-12-23' },
    { host: 'ShadowSB.com', name: 'ShadowSB', up: false, saved: '2016-12-23' },
  ],
};
