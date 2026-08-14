/* fan-egypt.js: content for /franchises/egypt/. Rendered by fanpage.js.

   The third of the three identity pages. The point is the one that gets lost
   under the pyramids: Egypt did not stop. It is one continuous inhabited place
   with a five-thousand-year written record, and the part my family comes from
   is the last fourteen hundred years of it, not the first three thousand.

   The era rail (kind: 'era') is the spine — drag it and you are scrolling
   through the whole thing at one scale. */
window.FAN_PAGE = {
  when: { at: 'Where my family is from', note: 'Miṣr. My parents left it and I did not, exactly — you do not stop being from somewhere. The food, the dialect and the jokes all came with them.' },
  sections: [

  { id: 'nile', kind: 'stats', title: 'One River', note: 'and everything else is desert',
    lede: 'Ninety-five percent of Egypt is uninhabitable sand. Effectively the entire population lives on the five percent within walking distance of one river, which is why the country has always been a thin green line on a map rather than a shape.',
    items: [
      { title: '6,650 km', sub: 'The Nile', accent: '#5fa3ec', desc: 'From Lake Victoria and the Ethiopian highlands to the Mediterranean. Among the longest rivers on earth, and the only reason any of the rest of this page happened.' },
      { title: '~4%', sub: 'Habitable land', accent: '#3fd589', desc: 'The valley and the delta. Everything else is Sahara, on both sides, for a thousand kilometres.' },
      { title: '~110 m', sub: 'People', accent: '#e8a13f', desc: 'The most populous Arab country, and about a third of everyone who speaks Arabic as a first language.' },
      { title: '5,000 yrs', sub: 'Written record', accent: '#e8c56a', desc: 'From the first dynasty to this morning, in one place, with almost no break in the documentation.' },
      { title: '1970', sub: 'The flood stopped', accent: '#a05fd0', desc: 'The Aswan High Dam ended the annual inundation that had fertilised the valley every year since before the pyramids. It also ended the silt.' },
      { title: '193 km', sub: 'Suez', accent: '#e0642a', desc: 'The canal, opened 1869. Around twelve percent of world trade goes through a ditch in the Egyptian desert.' },
    ] },

  { id: 'timeline', kind: 'era', title: 'Five Thousand Years', note: 'drag the rail',
    lede: 'The thing everybody gets wrong about Egypt is the shape of its history. Cleopatra lived closer to the invention of the iPhone than to the building of the Great Pyramid — the pyramids were already two and a half thousand years old and a tourist attraction when she was born. And the pharaonic period, the part everyone knows, is only the first half of the story.',
    items: [
      { when: 'c. 3100 BC', title: 'Unification', accent: '#e8c56a',
        desc: 'Upper and Lower Egypt brought under one crown, and the double crown that follows is the reason the country is a country at all.', meta: 'Early Dynastic' },
      { when: 'c. 2670 BC', title: 'Djoser’s step pyramid', accent: '#e8c56a',
        desc: 'Saqqara. The first monumental stone building anywhere on earth, designed by Imhotep, who is also the first architect whose name we know.', meta: 'Old Kingdom' },
      { when: 'c. 2560 BC', title: 'Giza', accent: '#e8a13f',
        desc: 'The Great Pyramid: 2.3 million blocks, aligned to true north to within a twentieth of a degree, and the tallest structure made by anyone for the next 3,800 years.', meta: 'Fourth Dynasty' },
      { when: 'c. 1479 BC', title: 'Hatshepsut', accent: '#3fd589',
        desc: 'Twenty-two years of the most prosperous reign of the era, ruled by a woman who took the full pharaonic titulary — and whose successor then tried to erase her from the monuments.', meta: 'New Kingdom' },
      { when: 'c. 1332 BC', title: 'Tutankhamun', accent: '#e8c56a',
        desc: 'A minor king who died at about nineteen and would be a footnote, except that his was the one tomb the robbers missed. Found intact in 1922.', meta: 'Eighteenth Dynasty' },
      { when: 'c. 1279 BC', title: 'Ramesses II', accent: '#e0642a',
        desc: 'Sixty-six years on the throne, Abu Simbel, and the earliest surviving peace treaty between two states — with the Hittites, and both copies still exist.', meta: 'Nineteenth Dynasty' },
      { when: '332 BC', title: 'Alexander, then the Ptolemies', accent: '#a05fd0',
        desc: 'Alexandria founded, and with it the Library and the Lighthouse. Three hundred years of Greek rule ending with Cleopatra VII.', meta: 'Ptolemaic' },
      { when: '30 BC', title: 'Rome', accent: '#8f98a8',
        desc: 'Egypt becomes the personal property of the emperor and the grain supply of the empire. Christianity arrives early and takes deeply: the Coptic church dates itself to Mark, in the first century.', meta: 'Roman · Byzantine' },
      { when: '641', title: 'The Arab conquest', accent: '#3fd589',
        desc: 'ʿAmr ibn al-ʿĀṣ takes Egypt and founds Fusṭāṭ, which is the seed Cairo grows from. This is where my half of the history starts, and Arabic gradually replaces Coptic over the next few centuries.', meta: 'Rāshidūn' },
      { when: '969', title: 'Cairo founded', accent: '#e8c56a',
        desc: 'The Fatimids build al-Qāhirah, "the victorious", next to Fusṭāṭ, and found al-Azhar the year after — which has been running ever since and is one of the oldest universities on earth.', meta: 'Fatimid' },
      { when: '1171', title: 'Ṣalāḥ ad-Dīn', accent: '#3fd589',
        desc: 'Saladin ends the Fatimid caliphate, builds the Citadel, and rules Egypt and Syria as one state from Cairo.', meta: 'Ayyubid' },
      { when: '1250', title: 'The Mamluks', accent: '#e8a13f',
        desc: 'A slave-soldier caste takes power outright and holds it for two and a half centuries, stops the Mongols at ʿAyn Jālūt in 1260, and leaves the architecture that makes Islamic Cairo what it is.', meta: 'Mamluk Sultanate' },
      { when: '1517', title: 'The Ottomans', accent: '#8f98a8',
        desc: 'Egypt becomes a province of Istanbul, and stays one, on paper, for four hundred years.', meta: 'Ottoman' },
      { when: '1805', title: 'Muḥammad ʿAlī', accent: '#5fa3ec',
        desc: 'The founder of modern Egypt: an Albanian officer who takes power, builds an army, a navy, factories and schools, and is why the country looks the way it does now.', meta: 'The dynasty' },
      { when: '1869', title: 'The Suez Canal', accent: '#e0642a',
        desc: 'Opened, then used as the lever the British take the country with in 1882. Nationalised by Nasser in 1956, which starts a war.', meta: 'The canal' },
      { when: '1952', title: 'The Revolution', accent: '#3fd589',
        desc: 'The Free Officers end the monarchy. A republic, and the beginning of the Egypt my parents were actually born into.', meta: 'Republic' },
      { when: '2011', title: 'Taḥrīr', accent: '#e8c56a',
        desc: 'Eighteen days in one square that the rest of the world watched live. Whatever anyone concluded about it afterwards, it is the moment my generation of Egyptians grew up on.', meta: 'Modern' },
    ] },

  { id: 'monuments', kind: 'cards', mount: 'end', title: 'The Monuments', note: 'the ones that are still standing',
    items: [
      { title: 'The Pyramids of Giza', sub: 'c. 2560 BC', tag: 'Old Kingdom', accent: '#e8a13f',
        desc: 'The only one of the seven ancient wonders still standing, and the only one that was not really a wonder to the Egyptians — by the time of the New Kingdom they were simply very old buildings on the edge of the city.',
        meta: 'Khufu · Khafre · Menkaure' },
      { title: 'The Sphinx', sub: 'c. 2500 BC', tag: 'Old Kingdom', accent: '#e8c56a',
        desc: 'Seventy-three metres of one limestone outcrop, carved in place rather than assembled. Nobody wrote down who it is meant to be, which is why the argument is still going.',
        meta: 'Carved, not built' },
      { title: 'Karnak', sub: 'c. 2000–300 BC', tag: 'Thebes', accent: '#3fd589',
        desc: 'Not one temple but two thousand years of them added to each other. The hypostyle hall alone is 134 columns, the tallest of them twenty-one metres.',
        meta: 'Luxor' },
      { title: 'Abu Simbel', sub: 'c. 1264 BC', tag: 'Ramesses II', accent: '#e0642a',
        desc: 'Cut into a cliff so that twice a year the sun reaches the innermost sanctuary. In the 1960s the entire mountain was sawn into blocks and moved uphill to save it from the Aswan reservoir, and the alignment still works.',
        meta: 'Moved, and still aligned' },
      { title: 'The Valley of the Kings', sub: 'c. 1539–1075 BC', tag: 'New Kingdom', accent: '#a05fd0',
        desc: 'Sixty-odd tombs cut into a valley behind a natural pyramid-shaped peak, because by then it was obvious that a pyramid was simply a very large sign saying "treasure here".',
        meta: '63 tombs and counting' },
      { title: 'Al-Azhar', sub: '970', tag: 'Fatimid Cairo', accent: '#3fd589',
        desc: 'A mosque founded the year after the city itself, teaching continuously ever since. It is either the oldest or second-oldest university in the world depending on how you define one, and it is still the reference point for Sunni scholarship.',
        href: 'https://www.azhar.eg/', link: 'al-Azhar', meta: 'Still teaching' },
    ] },

  { id: 'cairo', kind: 'tiles', mount: 'end', title: 'Cairo', note: 'the city of a thousand minarets', compact: true,
    lede: 'One of the largest cities on earth, and layered rather than planned: Fusṭāṭ, then al-Qāhirah beside it, then Saladin’s citadel above both, then Muḥammad ʿAlī’s boulevards through the middle, then everything since.',
    items: [
      { title: 'Islamic Cairo', accent: '#e8c56a', sub: 'UNESCO', desc: 'The densest collection of medieval Islamic architecture anywhere, and most of it is still in daily use rather than roped off.' },
      { title: 'Khan el-Khalili', accent: '#e0642a', sub: 'Since 1382', desc: 'The market. Six hundred years in the same alleys, and still the place you are sent to buy anything specific.' },
      { title: 'The Citadel', accent: '#8f98a8', sub: 'Saladin, 1176', desc: 'The fortress on the Muqattam hills, with Muḥammad ʿAlī’s alabaster mosque on top of it, visible from most of the city.' },
      { title: 'Coptic Cairo', accent: '#5fa3ec', sub: 'Roman-era', desc: 'The Hanging Church, Abu Serga and the Ben Ezra synagogue, all inside a few hundred metres of Roman fort wall.' },
      { title: 'The Egyptian Museum', accent: '#a05fd0', sub: '1902 · and the GEM', desc: 'The old one on Tahrir, and now the Grand Egyptian Museum out by the pyramids — the largest museum in the world devoted to one civilisation.' },
      { title: 'Al-Muʿizz Street', accent: '#3fd589', sub: 'Fatimid', desc: 'A kilometre of continuous Fatimid, Ayyubid and Mamluk monuments, one after another, on a single road.' },
    ] },

  { id: 'food', kind: 'cards', mount: 'end', title: 'The Food', note: 'the part that actually came with us',
    lede: 'Countries survive emigration as recipes more reliably than as anything else. This is the Egypt that is in my house.',
    items: [
      { title: 'Koshari', sub: 'كشري', tag: 'The national dish', accent: '#e0642a',
        desc: 'Rice, lentils, macaroni, chickpeas, tomato sauce, fried onions and a vinegar-garlic sauce, in one bowl. Carbohydrate on carbohydrate on carbohydrate, entirely vegan by accident, and unimprovable.',
        meta: 'Street food, properly' },
      { title: 'Ful medames', sub: 'فول مدمس', tag: 'Breakfast', accent: '#3fd589',
        desc: 'Slow-cooked fava beans with oil, lemon and cumin. It has been breakfast in Egypt since the pharaohs, more or less literally: fava beans have been found in Twelfth Dynasty tombs.',
        meta: 'Four thousand years old' },
      { title: 'Taʿmiya', sub: 'طعمية', tag: 'The original', accent: '#3fd589',
        desc: 'Falafel, but made from fava beans rather than chickpeas, and green inside because of the herbs. The Egyptian version is the older one, whatever anybody else claims.',
        meta: 'Fava, not chickpea' },
      { title: 'Molokhia', sub: 'ملوخية', tag: 'The divisive one', accent: '#3fd589',
        desc: 'Jute leaf cooked down into something between a soup and a sauce, finished with garlic fried in coriander. Egyptians will fight about the consistency. Everyone else has an opinion on the texture.',
        meta: 'You are either in or out' },
      { title: 'Umm ʿAli', sub: 'أم علي', tag: 'Dessert', accent: '#e8c56a',
        desc: 'Pastry, milk, nuts and cream baked into a bread pudding, with a genuinely lurid thirteenth-century origin story about the wife of a sultan.',
        meta: 'Mamluk-era, allegedly' },
      { title: 'Shai and karkadeh', sub: 'شاي · كركديه', tag: 'The drinks', accent: '#e0642a',
        desc: 'Black tea taken sweet and strong enough to stand a spoon in, and hibiscus, drunk hot in winter and iced in summer and dark red either way.',
        meta: 'Both, constantly' },
    ] },

  { id: 'quotes', kind: 'quotes', mount: 'end', title: 'Lines', note: 'the two that get quoted most',
    items: [
      { title: 'Egypt is the gift of the Nile.', sub: 'Herodotus, c. 440 BC', accent: '#5fa3ec' },
      { title: 'Man fears time, but time fears the pyramids.', sub: 'Arab proverb', accent: '#e8a13f' },
    ] },

  { id: 'links', kind: 'links', mount: 'end', title: 'Links', note: 'where to read more',
    items: [
      { title: 'The Grand Egyptian Museum', href: 'https://visit-gem.com/',
        desc: 'The new one at Giza, and the largest museum in the world dedicated to a single civilisation.' },
      { title: 'The Griffith Institute · Tutankhamun', href: 'https://www.griffith.ox.ac.uk/discoveringtut/',
        desc: 'Carter’s original excavation records, notes and photographs, digitised card by card.' },
      { title: 'The British Museum · Rosetta Stone', href: 'https://www.britishmuseum.org/collection/object/Y_EA24',
        desc: 'The trilingual decree that broke hieroglyphs open in 1822. Still in London, which Egypt has opinions about.' },
      { title: 'Al-Azhar', href: 'https://www.azhar.eg/',
        desc: 'Founded 970 and still going.' },
    ] },

] };
