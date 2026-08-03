/* planets-data.js: the galactic atlas on /star-wars/.
   Every world is drawn in pure CSS (no images): the `type` picks the surface
   pattern, `colors` tints it. planets.js does the rendering, star-wars.css
   holds the looks. Worlds repeat across eras on purpose, Tatooine really is
   in five of them.

   Group fields:
     id      required: filter key, also the chip label's data-era
     label   required: section heading
     note    required: small line beside the heading

   World fields (all optional unless noted):
     name    required: display name
     type    required: surface pattern, one of:
             desert ice ocean tropic city volcanic gas forest jungle swamp
             rock crystal storm station salt toxic plains mist junk
     colors  required: [base, shadow, highlight] hex, used by every layer
     glow    required: atmosphere / halo colour
     src     required: where it first showed up (short label)
     meta    required: climate · region line
     desc    required, one sentence
     ring    true -> ring system drawn around the sphere
     moon    true -> a small satellite orbits the planet
     dish    true -> superlaser dish (battle stations)
     wip     true -> unfinished superstructure sector (Death Star II)
     weapon  true -> planet-sized weapon well (Starkiller Base)
     spin    seconds for one rotation (default 44) */

window.SW_PLANETS = [

  /* ═══════════ Prequel Trilogy ═══════════ */
  { id: 'prequels', label: 'Prequel Planets', note: 'Episodes I–III', worlds: [
    { name: 'Naboo', type: 'plains', colors: ['#5da068', '#1d4632', '#dcf2c6'], glow: '#6fd28a', src: 'Ep. I', meta: 'Temperate · Mid Rim', desc: 'Lakes, waterfalls, and the Gungan cities in the planet core.' },
    { name: 'Tatooine', type: 'desert', colors: ['#e0ad6d', '#8a5220', '#ffeccb'], glow: '#f2b25a', src: 'Ep. I', meta: 'Desert · Outer Rim', desc: 'Twin suns, endless dunes, and the moisture farm that started it all.' },
    { name: 'Coruscant', type: 'city', colors: ['#8a95ad', '#232a45', '#ffe0a3'], glow: '#ffc86a', src: 'Ep. I', meta: 'City-world · Core', desc: 'One city wrapped around one planet, the capital of the galaxy.' },
    { name: 'Kamino', type: 'ocean', colors: ['#6b8fc7', '#16264a', '#e2edff'], glow: '#8fc0ff', src: 'Ep. II', meta: 'Ocean · Wild Space', desc: 'A storm-lashed water world where the clone army was grown.' },
    { name: 'Geonosis', type: 'desert', colors: ['#c76840', '#5a2211', '#f7c39a'], glow: '#e07a3f', src: 'Ep. II', meta: 'Rock · Outer Rim', desc: 'Rust-coloured hives, droid foundries, and the first battle of the war.', ring: true },
    { name: 'Utapau', type: 'rock', colors: ['#c4a882', '#493826', '#f4e6cd'], glow: '#d8bb86', src: 'Ep. III', meta: 'Arid · Outer Rim', desc: 'Sinkhole cities drilled beneath a wind-scoured surface.' },
    { name: 'Kashyyyk', type: 'jungle', colors: ['#4e8a44', '#15311a', '#cfe9a6'], glow: '#6fd06a', src: 'Ep. III', meta: 'Forest · Mid Rim', desc: 'Wroshyr trees the size of towers, the Wookiee homeworld.' },
    { name: 'Mustafar', type: 'volcanic', colors: ['#a83318', '#280a05', '#ffd08a'], glow: '#ff5c1f', src: 'Ep. III', meta: 'Volcanic · Outer Rim', desc: 'Rivers of lava, and the duel that ended Anakin Skywalker.' },
    { name: 'Felucia', type: 'jungle', colors: ['#b95ba6', '#3a1440', '#ffd1f2'], glow: '#e879d0', src: 'Ep. III', meta: 'Fungal · Outer Rim', desc: 'Bioluminescent fungal forests where Aayla Secura fell.' },
    { name: 'Mygeeto', type: 'crystal', colors: ['#9dc3da', '#294660', '#eaf7ff'], glow: '#9fdcff', src: 'Ep. III', meta: 'Frozen · Outer Rim', desc: 'A crystalline banking world fought over in the last days of the war.' },
    { name: 'Cato Neimoidia', type: 'mist', colors: ['#b08a5b', '#372715', '#f1dcb5'], glow: '#d9b06a', src: 'Ep. III', meta: 'Cloudy · Colonies', desc: 'Bridge cities slung between enormous rock arches.' },
    { name: 'Saleucami', type: 'plains', colors: ['#a58a52', '#382d18', '#e9dcb0'], glow: '#cbb06a', src: 'Ep. III', meta: 'Arid · Outer Rim', desc: 'Quiet homesteads and the deserter clone who farmed one.' },
    { name: 'Polis Massa', type: 'rock', colors: ['#8b8b93', '#23232a', '#e6e6ee'], glow: '#a8b8c8', src: 'Ep. III', meta: 'Asteroid · Outer Rim', desc: 'The asteroid medical base where Luke and Leia were born.' },
    { name: 'Alderaan', type: 'plains', colors: ['#74accb', '#1e4959', '#e6f6ff'], glow: '#8fd8e8', src: 'Ep. III', meta: 'Temperate · Core', desc: 'Snow-capped mountains and no weapons, the Organas’ world.' },
  ] },

  /* ═══════════ Original Trilogy ═══════════ */
  { id: 'originals', label: 'Original Planets', note: 'Episodes IV–VI', worlds: [
    { name: 'Tatooine', type: 'desert', colors: ['#e0ad6d', '#8a5220', '#ffeccb'], glow: '#f2b25a', src: 'Ep. IV', meta: 'Desert · Outer Rim', desc: 'Where the droids landed and a farm boy looked at two setting suns.' },
    { name: 'Alderaan', type: 'plains', colors: ['#74accb', '#1e4959', '#e6f6ff'], glow: '#8fd8e8', src: 'Ep. IV', meta: 'Temperate · Core', desc: 'Two billion people, erased to make a point about fear.' },
    { name: 'Yavin 4', type: 'jungle', colors: ['#4d8a5a', '#16311f', '#d6f0bd'], glow: '#74d18a', src: 'Ep. IV', meta: 'Jungle moon · Outer Rim', desc: 'Massassi temples turned into the hangar that launched Red Squadron.', moon: true },
    { name: 'Death Star', type: 'station', colors: ['#8f949c', '#1b1d22', '#dfe4ea'], glow: '#7fe0c0', src: 'Ep. IV', meta: 'Battle station · 160 km', desc: 'A moon-sized station with one thermal exhaust port too many.', dish: true },
    { name: 'Hoth', type: 'ice', colors: ['#cfe2f2', '#4d6d8c', '#ffffff'], glow: '#a8d8ff', src: 'Ep. V', meta: 'Frozen · Outer Rim', desc: 'Echo Base, tauntauns, wampas, and a very cold night.' },
    { name: 'Bespin', type: 'gas', colors: ['#e09a4e', '#5c2c14', '#ffe2ae'], glow: '#ffb45e', src: 'Ep. V', meta: 'Gas giant · Outer Rim', desc: 'Cloud City floats in the narrow band of breathable air.' },
    { name: 'Dagobah', type: 'swamp', colors: ['#5c7148', '#161f14', '#c6d9a2'], glow: '#7fa05c', src: 'Ep. V', meta: 'Swamp · Outer Rim', desc: 'Fog, roots, a sunken X-wing, and a Jedi Master in exile.' },
    { name: 'Endor', type: 'forest', colors: ['#4f8348', '#16301b', '#d3ebb0'], glow: '#7ed07a', src: 'Ep. VI', meta: 'Forest moon · Outer Rim', desc: 'The shield generator, the Ewoks, and the end of the Empire.', moon: true },
    { name: 'Death Star II', type: 'station', colors: ['#8a8f98', '#191b20', '#dfe4ea'], glow: '#5fd0ff', src: 'Ep. VI', meta: 'Battle station · Endor orbit', desc: 'Still under construction, and fully operational anyway.', dish: true, wip: true },
  ] },

  /* ═══════════ Sequel Trilogy ═══════════ */
  { id: 'sequels', label: 'Sequel Planets', note: 'Episodes VII–IX', worlds: [
    { name: 'Jakku', type: 'junk', colors: ['#d9b681', '#6d4a24', '#ffeecb'], glow: '#e8b866', src: 'Ep. VII', meta: 'Desert · Western Reaches', desc: 'A graveyard of Star Destroyers, picked over for portions.' },
    { name: 'Takodana', type: 'forest', colors: ['#4f8d5c', '#15311f', '#cfeeb8'], glow: '#79d691', src: 'Ep. VII', meta: 'Temperate · Mid Rim', desc: 'Maz Kanata’s castle above the lake, and a lightsaber in the basement.' },
    { name: 'D’Qar', type: 'plains', colors: ['#6f9b62', '#22401f', '#dcf0bd'], glow: '#8ed07a', src: 'Ep. VII', meta: 'Temperate · Outer Rim', desc: 'The Resistance base, evacuated one dreadnought at a time.' },
    { name: 'Starkiller Base', type: 'ice', colors: ['#cfdff0', '#3f5f80', '#ffffff'], glow: '#ff4f3a', src: 'Ep. VII', meta: 'Weaponised planet · Unknown Regions', desc: 'A world hollowed out to drink a star and fire it at five more.', weapon: true },
    { name: 'Ahch-To', type: 'ocean', colors: ['#5f8fb0', '#173044', '#dff0ff'], glow: '#7fc5e0', src: 'Ep. VIII', meta: 'Ocean · Unknown Regions', desc: 'Island cliffs, porgs, and the first Jedi Temple.' },
    { name: 'Cantonica', type: 'desert', colors: ['#dcc07f', '#6f5424', '#fff3d0'], glow: '#f0d07a', src: 'Ep. VIII', meta: 'Desert · Mid Rim', desc: 'An artificial sea and a casino city built on selling weapons.' },
    { name: 'Crait', type: 'salt', colors: ['#f0eae4', '#8a3b32', '#ffffff'], glow: '#ff6a55', src: 'Ep. VIII', meta: 'Mineral · Outer Rim', desc: 'White salt over red crystal, every skimmer left a bleeding trail.' },
    { name: 'Exegol', type: 'storm', colors: ['#4a2b3f', '#100810', '#c07adf'], glow: '#a24bff', src: 'Ep. IX', meta: 'Sith world · Unknown Regions', desc: 'Permanent lightning above the fleet the Emperor spent decades building.' },
    { name: 'Kijimi', type: 'ice', colors: ['#c3d2e2', '#41556e', '#ffffff'], glow: '#9fc4ff', src: 'Ep. IX', meta: 'Frozen · Mid Rim', desc: 'A snowbound spire city, and Zorii Bliss on the rooftops.' },
    { name: 'Pasaana', type: 'desert', colors: ['#e4bd85', '#7d5628', '#fff0cd'], glow: '#f0bf6a', src: 'Ep. IX', meta: 'Desert · Middian system', desc: 'The Festival of the Ancestors, held once every forty-two years.' },
    { name: 'Kef Bir', type: 'ocean', colors: ['#5c8f7a', '#173328', '#d4f0e0'], glow: '#7fd6b0', src: 'Ep. IX', meta: 'Ocean moon · Endor system', desc: 'Grass-topped cliffs and the wreck of the second Death Star.', moon: true },
    { name: 'Batuu', type: 'plains', colors: ['#9a9070', '#33301f', '#e8e2c0'], glow: '#c8bb7a', src: 'Galaxy’s Edge', meta: 'Frontier · Outer Rim', desc: 'Black Spire Outpost, the last stop before Wild Space.' },
  ] },

  /* ═══════════ The Clone Wars ═══════════ */
  { id: 'clonewars', label: 'Clone Wars Planets', note: 'The Clone Wars (2008–2020)', worlds: [
    { name: 'Christophsis', type: 'crystal', colors: ['#79b6d6', '#1e3f5c', '#e6f8ff'], glow: '#7fd6ff', src: 'S1', meta: 'Crystalline · Outer Rim', desc: 'Green crystal towers, a siege, and Ahsoka’s first day on the job.' },
    { name: 'Teth', type: 'jungle', colors: ['#6b8f4a', '#20301a', '#d9eab0'], glow: '#94cc6a', src: 'S1', meta: 'Jungle · Wild Space', desc: 'A monastery on a spire, reachable only by climbing.' },
    { name: 'Toydaria', type: 'swamp', colors: ['#7e9a58', '#20301c', '#d8e8ae'], glow: '#9fc46a', src: 'S1', meta: 'Swamp · Mid Rim', desc: 'King Katuunko’s neutral world, and the Republic’s hardest sell.' },
    { name: 'Rodia', type: 'swamp', colors: ['#4f8f6e', '#152f26', '#cdf0d8'], glow: '#6fd6a0', src: 'S1', meta: 'Swamp · Outer Rim', desc: 'Greenhouse domes over the marshes; Greedo’s homeworld.' },
    { name: 'Florrum', type: 'toxic', colors: ['#b98a3f', '#3c2a10', '#f5dc9a'], glow: '#d8b04a', src: 'S1', meta: 'Acidic · Outer Rim', desc: 'Acid geysers, salt flats, and Hondo Ohnaka’s pirate base.' },
    { name: 'Pantora', type: 'ice', colors: ['#b9d4e8', '#3d5c78', '#ffffff'], glow: '#a0cdf0', src: 'S1', meta: 'Frozen moon · Mid Rim', desc: 'Riyo Chuchi’s moon, above frozen Orto Plutonia.', moon: true },
    { name: 'Ryloth', type: 'desert', colors: ['#c9a06a', '#4d3418', '#f4e0b6'], glow: '#d8ab5f', src: 'S1', meta: 'Tidally locked · Outer Rim', desc: 'One side burning, one side frozen, the Twi’leks living in between.' },
    { name: 'Saleucami', type: 'plains', colors: ['#a58a52', '#382d18', '#e9dcb0'], glow: '#cbb06a', src: 'S1', meta: 'Arid · Outer Rim', desc: 'Where Cut Lawquane traded a rifle for a farm.' },
    { name: 'Felucia', type: 'jungle', colors: ['#b95ba6', '#3a1440', '#ffd1f2'], glow: '#e879d0', src: 'S3', meta: 'Fungal · Outer Rim', desc: 'Giant glowing spores, and four Jedi hiding among the farmers.' },
    { name: 'Malastare', type: 'plains', colors: ['#a9793f', '#372313', '#eed6a4'], glow: '#d09a4f', src: 'S1', meta: 'Arid · Mid Rim', desc: 'Podracing, fuel rights, and one very angry Zillo Beast.' },
    { name: 'Dathomir', type: 'storm', colors: ['#8f3a3a', '#2a0d0f', '#ffb3ae'], glow: '#e04a4a', src: 'S3', meta: 'Red mists · Outer Rim', desc: 'Nightsister magick on one side, Nightbrothers on the other.' },
    { name: 'Mon Cala', type: 'ocean', colors: ['#3f7fbf', '#0f2745', '#cfeaff'], glow: '#5fb0ff', src: 'S4', meta: 'Ocean · Calamari sector', desc: 'A civil war fought entirely underwater, with a Jedi and a shark.' },
    { name: 'Umbara', type: 'mist', colors: ['#5c5f8c', '#14162b', '#b9bce8'], glow: '#7d80d6', src: 'S4', meta: 'Shadow world · Expansion Region', desc: 'Perpetual gloom, glowing plants, and the worst orders of the war.' },
    { name: 'Mandalore', type: 'plains', colors: ['#c9c2b0', '#3f3a30', '#f6f2e6'], glow: '#d8d2bd', src: 'S2', meta: 'Domed cities · Outer Rim', desc: 'White domes over a desert its own wars turned to glass.' },
    { name: 'Onderon', type: 'jungle', colors: ['#5e9150', '#1a3319', '#d6ebae'], glow: '#84cc74', src: 'S5', meta: 'Jungle · Inner Rim', desc: 'The walled city of Iziz, and the rebellion the Jedi taught to fight.' },
    { name: 'Scipio', type: 'ice', colors: ['#c6d8ea', '#425a75', '#ffffff'], glow: '#9dc8f0', src: 'S6', meta: 'Frozen · Albarrio sector', desc: 'The Banking Clan’s vaults, cut into the ice spires.' },
    { name: 'Lola Sayu', type: 'volcanic', colors: ['#8f4a2a', '#22090a', '#ffc07a'], glow: '#ff7a3a', src: 'S3', meta: 'Shattered · Outer Rim', desc: 'A half-destroyed world holding up the Citadel prison.' },
    { name: 'Zygerria', type: 'desert', colors: ['#cf9a52', '#4f3315', '#ffe4b0'], glow: '#e8ad5f', src: 'S4', meta: 'Arid · Outer Rim', desc: 'The slaver empire that tried to buy its way back into power.' },
    { name: 'Moraband', type: 'desert', colors: ['#a35a3f', '#331209', '#f0bd94'], glow: '#c96a45', src: 'S6', meta: 'Dead world · Outer Rim', desc: 'The Valley of the Dark Lords, where Yoda faced the truth.' },
  ] },

  /* ═══════════ Rebels ═══════════ */
  { id: 'rebels', label: 'Rebels Planets', note: 'Star Wars Rebels (2014–2018)', worlds: [
    { name: 'Lothal', type: 'plains', colors: ['#a8a05f', '#3a3418', '#eee8b0'], glow: '#cfc46a', src: 'S1', meta: 'Grassland · Outer Rim', desc: 'Grass, spires, a comm tower, and the crew of the Ghost.' },
    { name: 'Garel', type: 'rock', colors: ['#93968f', '#2b2d2a', '#e2e5df'], glow: '#a8b0a0', src: 'S1', meta: 'Arid · Outer Rim', desc: 'The spaceport hub the early rebel cells kept slipping through.' },
    { name: 'Kessel', type: 'toxic', colors: ['#8a6a4f', '#241610', '#e0bd94'], glow: '#c98a4f', src: 'S1', meta: 'Mining · Outer Rim', desc: 'Spice mines worked by prisoners who rarely came back out.' },
    { name: 'Concord Dawn', type: 'rock', colors: ['#a37f5c', '#2f1f14', '#e8cba6'], glow: '#c99a66', src: 'S2', meta: 'Shattered · Mandalore sector', desc: 'The Protectors’ home, still in pieces after an old collision.' },
    { name: 'Lira San', type: 'forest', colors: ['#5a9160', '#173322', '#d4eec0'], glow: '#7fd68f', src: 'S2', meta: 'Temperate · Wild Space', desc: 'The Lasat’s true homeworld, waiting on the other side of the rift.' },
    { name: 'Atollon', type: 'desert', colors: ['#d0a86f', '#4f3418', '#f7e2b8'], glow: '#e0b06a', src: 'S3', meta: 'Arid · Outer Rim', desc: 'Coral spires, krykna spiders, and Chopper Base.' },
    { name: 'Malachor', type: 'rock', colors: ['#6b6470', '#171420', '#c9c0d6'], glow: '#8f7fd6', src: 'S2', meta: 'Dead world · Outer Rim', desc: 'A Sith temple built over a battlefield nobody was meant to find.' },
    { name: 'Dathomir', type: 'storm', colors: ['#8f3a3a', '#2a0d0f', '#ffb3ae'], glow: '#e04a4a', src: 'S3', meta: 'Red mists · Outer Rim', desc: 'The Nightsisters were gone; what they left behind was not.' },
    { name: 'Dantooine', type: 'plains', colors: ['#8fa05c', '#2c3618', '#e4eeb0'], glow: '#b0c46a', src: 'S4', meta: 'Grassland · Outer Rim', desc: 'Quiet farmland that kept becoming an Alliance staging ground.' },
    { name: 'Krownest', type: 'ice', colors: ['#c3d6e6', '#42586e', '#ffffff'], glow: '#9fc8e8', src: 'S3', meta: 'Frozen · Mandalore sector', desc: 'Clan Wren’s stronghold in the snow, and a very tense family dinner.' },
    { name: 'Yavin 4', type: 'jungle', colors: ['#4d8a5a', '#16311f', '#d6f0bd'], glow: '#74d18a', src: 'S4', meta: 'Jungle moon · Outer Rim', desc: 'The scattered cells finally parked in the same jungle.', moon: true },
    { name: 'Lothal · Dume', type: 'plains', colors: ['#7a86a8', '#212840', '#e6ecff'], glow: '#8fa8ff', src: 'S4', meta: 'Jedi temple · Lothal', desc: 'The white Loth-wolf, the temple doors, and the World Between Worlds.' },
  ] },

  /* ═══════════ Jedi: Fallen Order & Survivor ═══════════ */
  { id: 'jedi', label: 'Fallen Order Planets', note: 'Jedi: Fallen Order & Survivor', worlds: [
    { name: 'Bracca', type: 'junk', colors: ['#8f8a7f', '#2a2823', '#ded8c8'], glow: '#c9a86a', src: 'Fallen Order', meta: 'Scrapyard · Mid Rim', desc: 'Star Destroyers cut apart for scrap, and a rigger hiding in plain sight.' },
    { name: 'Bogano', type: 'plains', colors: ['#7f9a6a', '#26331e', '#e0eec4'], glow: '#9fd07f', src: 'Fallen Order', meta: 'Temperate · Outer Rim', desc: 'Empty plains, binog herds, and a Zeffo vault nobody else found.' },
    { name: 'Zeffo', type: 'rock', colors: ['#9aa3a8', '#2c3236', '#e2eaee'], glow: '#a8c4d6', src: 'Fallen Order', meta: 'Windswept · Outer Rim', desc: 'Tombs of an ancient Force-wielding people, and Imperial excavators.' },
    { name: 'Dathomir', type: 'storm', colors: ['#8f3a3a', '#2a0d0f', '#ffb3ae'], glow: '#e04a4a', src: 'Fallen Order', meta: 'Red mists · Outer Rim', desc: 'Merrin, Malicos, and a lightsaber broken in the dark.' },
    { name: 'Kashyyyk', type: 'jungle', colors: ['#4e8a44', '#15311a', '#cfe9a6'], glow: '#6fd06a', src: 'Fallen Order', meta: 'Forest · Mid Rim', desc: 'The Shyyyk climb, Saw Gerrera’s partisans, and a very long elevator.' },
    { name: 'Ilum', type: 'crystal', colors: ['#a8d2ea', '#2f5470', '#f2fbff'], glow: '#8fdcff', src: 'Fallen Order', meta: 'Kyber caves · Unknown Regions', desc: 'The Jedi crystal caves, already being carved into something worse.' },
    { name: 'Nur', type: 'ocean', colors: ['#3f6f96', '#0f2338', '#c9e6ff'], glow: '#5fb0e0', src: 'Fallen Order', meta: 'Ocean · Mustafar system', desc: 'Fortress Inquisitorius, sunk beneath a black sea.' },
    { name: 'Koboh', type: 'plains', colors: ['#b08a5c', '#3a2917', '#f2ddb8'], glow: '#d6a86a', src: 'Survivor', meta: 'Frontier · Outer Rim', desc: 'Rambler’s Reach, Pyloon’s Saloon, and far too many Bedlam Raiders.' },
    { name: 'Jedha', type: 'desert', colors: ['#c9a479', '#4a3117', '#f4e2c0'], glow: '#d8ac66', src: 'Survivor', meta: 'Desert moon · Mid Rim', desc: 'Cold dunes over the ruins of the Holy City.', moon: true },
    { name: 'Nova Garon', type: 'volcanic', colors: ['#8f3f22', '#210806', '#ffc48a'], glow: '#ff7038', src: 'Survivor', meta: 'Volcanic · Outer Rim', desc: 'The High Republic-era fortress the Empire made its own.' },
    { name: 'Tanalorr', type: 'jungle', colors: ['#4f9a7a', '#153027', '#cfeedd'], glow: '#6fd6ae', src: 'Survivor', meta: 'Hidden · beyond the Abyss', desc: 'A sanctuary you can only reach if you can see through the storm.' },
    { name: 'Coruscant', type: 'city', colors: ['#8a95ad', '#232a45', '#ffe0a3'], glow: '#ffc86a', src: 'Survivor', meta: 'City-world · Core', desc: 'The Undercity, a rail heist, and an Imperial Security Bureau problem.' },
    { name: 'Shattered Moon', type: 'rock', colors: ['#8b8b93', '#23232a', '#e6e6ee'], glow: '#9fb0c0', src: 'Fallen Order', meta: 'Broken moon · Mustafar system', desc: 'Half a moon and a hangar, hanging over Nur.', moon: true },
  ] },

  /* ═══════════ Rogue One & Solo ═══════════ */
  { id: 'anthology', label: 'Anthology Planets', note: 'Rogue One & Solo', worlds: [
    { name: 'Lah’mu', type: 'rock', colors: ['#5c5a55', '#191817', '#cfd0cc'], glow: '#8fa08f', src: 'Rogue One', meta: 'Black sand · Outer Rim', desc: 'A farm on black volcanic soil, and the day the Ersos ran out of time.' },
    { name: 'Jedha', type: 'desert', colors: ['#c9a479', '#4a3117', '#f4e2c0'], glow: '#d8ac66', src: 'Rogue One', meta: 'Desert moon · Mid Rim', desc: 'The kyber pilgrimage city, the Death Star’s first single-reactor test.', moon: true },
    { name: 'Eadu', type: 'storm', colors: ['#4f5a63', '#12171b', '#c0cfd8'], glow: '#6f96b0', src: 'Rogue One', meta: 'Storm-wracked · Outer Rim', desc: 'Rain, cliffs, and a research facility Galen never left.' },
    { name: 'Scarif', type: 'tropic', colors: ['#3fb0b0', '#0f4045', '#e2fff5'], glow: '#5fe0d6', src: 'Rogue One', meta: 'Tropical · Outer Rim', desc: 'Turquoise shallows, a shield gate, and the plans that changed everything.' },
    { name: 'Wobani', type: 'toxic', colors: ['#7a7a68', '#22221b', '#d0d0bc'], glow: '#a0a074', src: 'Rogue One', meta: 'Labour camp · Mid Rim', desc: 'An Imperial work colony, where Jyn Erso was serving twenty years.' },
    { name: 'Corellia', type: 'city', colors: ['#7f8794', '#22262e', '#e6dcc0'], glow: '#d6a85f', src: 'Solo', meta: 'Shipyards · Core', desc: 'Coronet City’s shipyards, and two kids trying to buy their way off.' },
    { name: 'Vandor', type: 'ice', colors: ['#c0d2e2', '#3f5468', '#ffffff'], glow: '#9fc0e0', src: 'Solo', meta: 'Frozen · Outer Rim', desc: 'Mountain snow, Fort Ypso, and a conveyex worth robbing.' },
    { name: 'Kessel', type: 'toxic', colors: ['#8a6a4f', '#241610', '#e0bd94'], glow: '#c98a4f', src: 'Solo', meta: 'Mining · Outer Rim', desc: 'The run, the Maw, and twelve parsecs of creative rounding.' },
    { name: 'Savareen', type: 'tropic', colors: ['#d8bd8f', '#5a4425', '#fff2d6'], glow: '#e8cf8f', src: 'Solo', meta: 'Coastal · Outer Rim', desc: 'A refinery on the coral coast, and one very tense standoff.' },
    { name: 'Mimban', type: 'swamp', colors: ['#6b6a4f', '#1f1e15', '#cfcfa8'], glow: '#94946a', src: 'Solo', meta: 'Mud · Expansion Region', desc: 'Trench warfare in the mud, where Han met a very large friend.' },
    { name: 'Numidian Prime', type: 'jungle', colors: ['#4f8f5f', '#163020', '#d0eeba'], glow: '#74d68f', src: 'Solo', meta: 'Jungle · Outer Rim', desc: 'A sabacc table, a hidden card, and the Falcon changing hands.' },
  ] },

  /* ═══════════ The Mandalorian & Ahsoka ═══════════ */
  { id: 'mando', label: 'Mandalorian Planets', note: 'The Mandalorian, Boba Fett & Ahsoka', worlds: [
    { name: 'Arvala-7', type: 'desert', colors: ['#c99a6f', '#452c17', '#f2dcbc'], glow: '#d8a06a', src: 'Mando S1', meta: 'Arid · Outer Rim', desc: 'Blurrg country, a Ugnaught moisture farmer, and one bounty in a pram.' },
    { name: 'Sorgan', type: 'forest', colors: ['#5c8f5c', '#1a3020', '#d6eebd'], glow: '#7fd08f', src: 'Mando S1', meta: 'Forest · Outer Rim', desc: 'Krill ponds, a quiet village, and an AT-ST in the trees.' },
    { name: 'Nevarro', type: 'volcanic', colors: ['#8a4f33', '#22100a', '#f0c497', ], glow: '#e0703a', src: 'Mando S1', meta: 'Volcanic · Outer Rim', desc: 'Lava flats outside the walls, and the covert underneath the city.' },
    { name: 'Tython', type: 'rock', colors: ['#9a8f70', '#2e2a1c', '#e8e0c0'], glow: '#c0b07f', src: 'Mando S2', meta: 'Ancient · Deep Core', desc: 'The seeing stone on the mountaintop, and whoever answers it.' },
    { name: 'Corvus', type: 'forest', colors: ['#6b6f5c', '#1e2019', '#d0d4b8'], glow: '#9aa87f', src: 'Mando S2', meta: 'Ashen forest · Outer Rim', desc: 'Calodan behind its walls, and Ahsoka Tano in the fog.' },
    { name: 'Morak', type: 'jungle', colors: ['#5c8a4f', '#1a2f18', '#d4eeb0'], glow: '#84cc74', src: 'Mando S2', meta: 'Jungle · Outer Rim', desc: 'A rhydonium refinery, a stolen transport, and the worst helmet swap.' },
    { name: 'Mandalore', type: 'plains', colors: ['#b0aa9a', '#33302a', '#eeeade'], glow: '#c9c2ad', src: 'Mando S3', meta: 'Glassed · Outer Rim', desc: 'The Living Waters still run under the ruins of Sundari.' },
    { name: 'Kalevala', type: 'plains', colors: ['#9aa8b0', '#2c333a', '#e2eaee'], glow: '#a8bcc9', src: 'Mando S3', meta: 'Temperate · Mandalore sector', desc: 'Bo-Katan’s castle, empty, then not there at all.' },
    { name: 'Plazir-15', type: 'ocean', colors: ['#4f8fbf', '#153048', '#d6eeff'], glow: '#6fc0f0', src: 'Mando S3', meta: 'Domed city · Outer Rim', desc: 'The only direct democracy in the sector, with a droid problem.' },
    { name: 'Seatos', type: 'forest', colors: ['#4f7f6a', '#152a24', '#cfeadd'], glow: '#6fc4a8', src: 'Ahsoka', meta: 'Temperate · Denab system', desc: 'A star map on the cliffs, pointing somewhere it should not.' },
    { name: 'Denab', type: 'gas', colors: ['#7f6ab0', '#241a3a', '#ded0ff'], glow: '#9f8fe0', src: 'Ahsoka', meta: 'Gas giant · Outer Rim', desc: 'The Eye of Sion was built in its ring, out of everyone’s sight.', ring: true },
    { name: 'Peridea', type: 'storm', colors: ['#8f6a4f', '#251609', '#f0c9a0'], glow: '#e0904f', src: 'Ahsoka', meta: 'Extragalactic · beyond the void', desc: 'Where the purrgil go, and where the Nightsisters ended up.' },
  ] },

  /* ═══════════ Andor & Obi-Wan Kenobi ═══════════ */
  { id: 'andor', label: 'Andor Planets', note: 'Andor & Obi-Wan Kenobi', worlds: [
    { name: 'Ferrix', type: 'rock', colors: ['#9a7f66', '#2c2018', '#e8d6bc'], glow: '#c99a6a', src: 'Andor S1', meta: 'Salvage · Free Trade sector', desc: 'Anvils, brick streets, and a funeral that turned into an uprising.' },
    { name: 'Aldhani', type: 'plains', colors: ['#6b8a6a', '#1f2c1e', '#d6e8c9'], glow: '#8fbc8f', src: 'Andor S1', meta: 'Highlands · Outer Rim', desc: 'The Eye above the valley, and eighty million credits below it.' },
    { name: 'Narkina 5', type: 'ocean', colors: ['#5c94a8', '#152c38', '#d6f0f8'], glow: '#7fc9d6', src: 'Andor S1', meta: 'Prison complex · Outer Rim', desc: 'A factory floor on an ocean, where the floor is the guard.' },
    { name: 'Niamos', type: 'tropic', colors: ['#4fb0a8', '#13403f', '#dffff8'], glow: '#5fe0cf', src: 'Andor S1', meta: 'Resort · Outer Rim', desc: 'A beach holiday that ended in a six-year sentence for nothing.' },
    { name: 'Ghorman', type: 'city', colors: ['#8f8fa0', '#26263a', '#e6dcd0'], glow: '#c9a0a0', src: 'Andor S2', meta: 'Twill spinners · Sern sector', desc: 'A spider-silk trade, a staged riot, and a massacre with a name.' },
    { name: 'Mina-Rau', type: 'plains', colors: ['#c9b06a', '#3f3316', '#f4e8b8'], glow: '#d8c47f', src: 'Andor S2', meta: 'Farmland · Outer Rim', desc: 'Wheat fields, an undocumented family, and an Imperial audit.' },
    { name: 'Daiyu', type: 'city', colors: ['#7a6a8f', '#1e1830', '#ff9fd0'], glow: '#ff6ac0', src: 'Kenobi', meta: 'Neon port · Mid Rim', desc: 'Spice dealers, bounty hunters, and a ten-year-old princess for sale.' },
    { name: 'Mapuzo', type: 'rock', colors: ['#8f6a5c', '#261813', '#e2c4b0'], glow: '#c98f6a', src: 'Kenobi', meta: 'Mining · Outer Rim', desc: 'A mining world, a transport driver, and a droid that talked too much.' },
    { name: 'Jabiim', type: 'desert', colors: ['#a89060', '#332916', '#eaddb0'], glow: '#c9b06a', src: 'Kenobi', meta: 'Arid · Outer Rim', desc: 'The Path’s hidden hangar, one wall away from an Inquisitor.' },
  ] },

  /* ═══════════ The Bad Batch ═══════════ */
  { id: 'badbatch', label: 'Bad Batch Planets', note: 'The Bad Batch (2021–2024)', worlds: [
    { name: 'Kamino', type: 'ocean', colors: ['#6b8fc7', '#16264a', '#e2edff'], glow: '#8fc0ff', src: 'S1', meta: 'Ocean · Wild Space', desc: 'Tipoca City, and the day the Empire dropped it into the sea.' },
    { name: 'Ord Mantell', type: 'junk', colors: ['#9a8a6a', '#2c261a', '#e6dcc0'], glow: '#c9b07f', src: 'S1', meta: 'Harbour city · Mid Rim', desc: 'Cid’s parlour, the scrap markets, and every job that went sideways.' },
    { name: 'Pabu', type: 'tropic', colors: ['#4fb0c9', '#134048', '#e2fbff'], glow: '#5fd6f0', src: 'S3', meta: 'Island · Outer Rim', desc: 'A cliffside town that rebuilds after every wave, and a home, briefly.' },
    { name: 'Wayland', type: 'jungle', colors: ['#4f7a4f', '#152618', '#cfe8b8'], glow: '#7fc47f', src: 'S3', meta: 'Mountain · Outer Rim', desc: 'Mount Tantiss, Hemlock’s vault, and every stolen clone inside it.' },
    { name: 'Daro', type: 'rock', colors: ['#7a7f8a', '#1e2126', '#d6dce6'], glow: '#9fb0c4', src: 'S1', meta: 'Cliffside · Outer Rim', desc: 'A secret Imperial base carved into the rock spires.' },
    { name: 'Serenno', type: 'plains', colors: ['#7f9a6a', '#26331e', '#e0eec4'], glow: '#a8c98f', src: 'S1', meta: 'Temperate · Outer Rim', desc: 'Dooku’s estate, stripped by the Empire one crate at a time.' },
    { name: 'Barton IV', type: 'ice', colors: ['#c9d8e6', '#44586b', '#ffffff'], glow: '#a8c4d8', src: 'S1', meta: 'Frozen · Outer Rim', desc: 'An Imperial supply depot, a snowstorm, and a very bad rescue.' },
  ] },

  /* ═══════════ Legends & Games ═══════════ */
  { id: 'legends', label: 'Legends Planets', note: 'KOTOR, The Old Republic & Battlefront', worlds: [
    { name: 'Korriban', type: 'desert', colors: ['#a35a3f', '#331209', '#f0bd94'], glow: '#c96a45', src: 'KOTOR', meta: 'Sith tombs · Outer Rim', desc: 'The original Valley of the Dark Lords, before it was called Moraband.' },
    { name: 'Taris', type: 'city', colors: ['#7f8794', '#20242c', '#dcd0b0'], glow: '#c99a5f', src: 'KOTOR', meta: 'Ruined ecumenopolis · Outer Rim', desc: 'A city-world Malak bombarded to slag to kill one Jedi.' },
    { name: 'Manaan', type: 'ocean', colors: ['#3fa8c9', '#0f3a4a', '#dcf8ff'], glow: '#5fd6ff', src: 'KOTOR', meta: 'Ocean · Mid Rim', desc: 'Ahto City floating above the only source of kolto in the galaxy.' },
    { name: 'Nar Shaddaa', type: 'city', colors: ['#6f6a7f', '#1c1a26', '#ffd08f'], glow: '#ff9f4f', src: 'KOTOR II', meta: 'Smuggler’s Moon · Hutt Space', desc: 'A moon lit end to end, and nothing on it that is not for sale.', moon: true },
    { name: 'Dromund Kaas', type: 'storm', colors: ['#3f4f4a', '#0d1614', '#9fd6b0'], glow: '#4fbc8f', src: 'The Old Republic', meta: 'Storm jungle · Sith Empire', desc: 'Kaas City under permanent thunder, the Sith Emperor’s capital.' },
    { name: 'Malachor V', type: 'rock', colors: ['#6b6470', '#171420', '#c9c0d6'], glow: '#8f7fd6', src: 'KOTOR II', meta: 'Shattered · Outer Rim', desc: 'What the Mass Shadow Generator left of a planet and a war.' },
    { name: 'Zakuul', type: 'city', colors: ['#c9a85f', '#3a2d13', '#fff0c0'], glow: '#f0c46a', src: 'The Old Republic', meta: 'Golden spires · Wild Space', desc: 'The Eternal Empire’s capital, hidden for centuries and then not.' },
    { name: 'Vardos', type: 'city', colors: ['#8a8f9a', '#242830', '#e6e0cf'], glow: '#a8b8c9', src: 'Battlefront II', meta: 'Imperial world · Outer Rim', desc: 'Iden Versio’s home, made an example of by its own Empire.' },
  ] },

];
