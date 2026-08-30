/* fandom.js: renders the franchise tiles from FANDOMS (see fandom-data.js).

   Each tile is a plate: an emblem drawn as an SVG glyph (mine, not the studio's),
   the name set in a lettering style that nods at the franchise without copying
   its logo, and a caption. Nothing here loads an image.

   Loads AFTER fandom-data.js and BEFORE reveal.js. */
(function fandom() {
  var root = document.getElementById('fandoms');
  var data = window.FANDOMS;
  if (!root || !data) return;

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  /* hand-drawn emblems, 24×24, currentColor */
  var GLYPHS = {
    /* ── who I am ── */
    // Rubʿ al-Ḥizb: two overlaid squares, the eight-point star that marks a
    // quarter-ḥizb in the muṣḥaf. Nothing figurative, which is the point.
    rub:     '<rect x="5" y="5" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"/>'
             + '<rect x="5" y="5" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(45 12 12)"/>'
             + '<circle cx="12" cy="12" r="2.1"/>',
    // a qalam: the reed pen, cut at an angle, over the stroke it just made
    qalam:   '<path d="M20.6 3.4 9.8 14.2l-1.4 3.6 3.6-1.4L22.8 5.6a1.6 1.6 0 0 0 0-2.2 1.6 1.6 0 0 0-2.2 0z"/>'
             + '<path d="M2.4 20.4c3.4-2.2 6.4-2.2 9 0 2.6 2.2 6 1.4 9.6-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    // two pyramids on the west bank, the sun behind them, the Nile below
    pyramid: '<circle cx="17.4" cy="6.2" r="3"/>'
             + '<path d="M9.4 5.4 17.8 17H1z"/>'
             + '<path d="M17.6 9.8 23 17h-10.8z" opacity=".75"/>'
             + '<path d="M1 20.4c3-1.6 5.4-1.6 8 0s5 1.6 8 0 3.4-1.2 6-.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    // a broadcast microphone on its stand: the radio era in one object
    mic:     '<rect x="8.4" y="2" width="7.2" height="12" rx="3.6"/>'
             + '<path d="M8.4 6.2h7.2M8.4 9h7.2M8.4 11.8h7.2" stroke="#000" stroke-width="1" opacity=".35"/>'
             + '<path d="M5.4 10.6v.8a6.6 6.6 0 0 0 13.2 0v-.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
             + '<path d="M11.2 18h1.6v3h-1.6z"/>'
             + '<rect x="7.6" y="21" width="8.8" height="1.6" rx=".7"/>',
    // an open muṣḥaf on its raḥl: two leaves, the spine, and the stand's legs
    mushaf:  '<path d="M12 5.4C9.9 3.9 6.9 3.4 3.2 4v12.3c3.7-.6 6.7-.1 8.8 1.4 2.1-1.5 5.1-2 8.8-1.4V4c-3.7-.6-6.7-.1-8.8 1.4z"/>'
             + '<path d="M12 5.4v12.3" fill="none" stroke="#000" stroke-width="1.2" opacity=".4"/>'
             + '<path d="M5.4 7.5c1.7-.2 3.2 0 4.6.6M5.4 10.1c1.7-.2 3.2 0 4.6.6M14 8.1c1.4-.6 2.9-.8 4.6-.6M14 10.7c1.4-.6 2.9-.8 4.6-.6" fill="none" stroke="#000" stroke-width="1" opacity=".3" stroke-linecap="round"/>'
             + '<path d="M4.4 21.6 12 17.9l7.6 3.7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    // the green dome and one minaret: al-Masjid an-Nabawī in elevation
    dome:    '<path d="M11.2 1.4h1.6v3h-1.6z"/>'
             + '<path d="M12 4.2c3.7 1.1 5.9 3.8 5.9 7.4H6.1c0-3.6 2.2-6.3 5.9-7.4z"/>'
             + '<path d="M2.6 21V9.6h2.8V21z"/><path d="M2.2 9.6h3.6L4 6.4z"/>'
             + '<path d="M6.6 13h10.8v8H6.6z" opacity=".85"/>'
             + '<path d="M10.8 21v-3.8a1.2 1.2 0 0 1 2.4 0V21z" fill="#000" opacity=".4"/>'
             + '<rect x="1" y="21" width="22" height="1.6" rx=".6"/>',
    // the King's Tower with its crown parked on top
    kingtower: '<path d="M8.4 6.4 9.5 2.8l2.5 2.1 2.5-2.1 1.1 3.6z"/>'
             + '<path d="M5.2 8.2h3v3.4h-3zM10.5 8.2h3v3.4h-3zM15.8 8.2h3v3.4h-3z"/>'
             + '<path d="M6 11.6h12V21H6z"/>'
             + '<path d="M10.7 21v-3.6a1.3 1.3 0 0 1 2.6 0V21z" fill="#000" opacity=".4"/>'
             + '<rect x="4.4" y="21" width="15.2" height="1.6" rx=".6"/>',
    // a Berk viking helmet: the dome, two horns, and the nose guard
    helm:    '<path d="M5.6 12.2a6.4 6.4 0 0 1 12.8 0v2.6H5.6z"/>'
             + '<path d="M6 10.6C3.7 10 2.4 8.1 2.2 4.8c2.9 1 4.6 2.7 5.2 5z"/>'
             + '<path d="M18 10.6c2.3-.6 3.6-2.5 3.8-5.8-2.9 1-4.6 2.7-5.2 5z"/>'
             + '<rect x="4.6" y="14.8" width="14.8" height="2.2" rx="1"/>'
             + '<path d="M11.1 17h1.8v4.4h-1.8z"/>',
    // a pineapple, because there is one address everybody knows
    pineapple: '<path d="M9 7.8C8.3 5.1 9.3 2.8 12 1c-.4 1.7 0 2.9 1.1 3.7 1.4-.8 2.8-.8 4.2 0-2.7.6-4.5 1.7-5.5 3.1z"/>'
             + '<ellipse cx="12" cy="15" rx="6" ry="7.4"/>'
             + '<path d="M7.2 11l9.6 8M16.8 11l-9.6 8M6.1 15h11.8" fill="none" stroke="#000" stroke-width="1" opacity=".3"/>',

    burst:   '<path d="M12 1l1.9 6.4L20 5l-2.6 5.9L23 12l-5.6 1.1L20 19l-6.1-2.4L12 23l-1.9-6.4L4 19l2.6-5.9L1 12l5.6-1.1L4 5l6.1 2.4z"/>',
    bolt:    '<path d="M13.4 1.5 4.8 13.2h5.1L9 22.5l9-12.1h-5.2z"/>',
    circleA:  '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>'
              + '<path d="M7 18.4 12 5.2l5 13.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>'
              + '<path d="M8.6 13.6h7.2M13.6 11.2l2.4 2.4-2.4 2.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    block:   '<path d="M12 2 3 6.4v11.2L12 22l9-4.4V6.4zm0 2.2 6.6 3.2L12 10.6 5.4 7.4zM4.8 9l6.3 3v7.5l-6.3-3zm14.4 0v7.5l-6.3 3V12z"/>',
    skull:   '<path d="M12 2C7.3 2 4 5.3 4 9.6c0 2.4 1 4 2.4 5.2V18c0 .6.4 1 1 1h1.2v2c0 .6.5 1 1 1h4.8c.5 0 1-.4 1-1v-2h1.2c.6 0 1-.4 1-1v-3.2C18 13.6 20 12 20 9.6 20 5.3 16.7 2 12 2zm-3.3 6.6a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm6.6 0a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM12 13.4l1.1 2.2h-2.2z"/>',
    rex:      '<path d="M12 22.2c-2.2 0-3.6-1.3-3.6-3 0-1.5 1-2.4 1.2-4.2h4.8c.2 1.8 1.2 2.7 1.2 4.2 0 1.7-1.4 3-3.6 3z"/>'
              + '<ellipse cx="6.6" cy="11.4" rx="2" ry="3.2" transform="rotate(-24 6.6 11.4)"/>'
              + '<ellipse cx="12" cy="8.6" rx="2.1" ry="3.6"/>'
              + '<ellipse cx="17.4" cy="11.4" rx="2" ry="3.2" transform="rotate(24 17.4 11.4)"/>',
    bulbs:   '<path d="M1 5c3.6 5.6 7.2 5.6 10.8 0 3.6 5.6 7.2 5.6 10.8 0" fill="none" stroke="currentColor" stroke-width="1.5"/>'
             + '<rect x="3.4" y="8.4" width="2.4" height="2" rx=".5"/><circle cx="4.6" cy="13.4" r="3.1"/>'
             + '<rect x="10.8" y="10.4" width="2.4" height="2" rx=".5"/><circle cx="12" cy="15.4" r="3.1"/>'
             + '<rect x="18.2" y="8.4" width="2.4" height="2" rx=".5"/><circle cx="19.4" cy="13.4" r="3.1"/>',
    crown:   '<path d="M2.5 8.5 6 13l3-8 3 5.4L15 5l3 8 3.5-4.5L20 20H4z"/>',
    spiral:  '<path d="M12 2a10 10 0 1 0 10 10 8 8 0 0 0-8-8 6 6 0 0 0-6 6 4 4 0 0 0 4 4 2.6 2.6 0 0 0 2.6-2.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    badge:   '<path d="M12 1.5 14.6 7l6 .9-4.3 4.3 1 6.1L12 15.4 6.7 18.3l1-6.1L3.4 7.9 9.4 7z"/><circle cx="12" cy="10.5" r="2.2" fill="none" stroke="#000" stroke-width="1" opacity=".35"/>',
    spinner: '<path d="M12 1.6 20 12l-8 10.4L4 12z"/><path d="M12 6.4 16.6 12 12 17.6 7.4 12z" fill="#000" opacity=".3"/>',
    // the top from Inception: stem, body, and the point it is balanced on
    top:     '<path d="M11.2 1.6h1.6v3.2h-1.6z"/>'
             + '<path d="M12 4.6c4.2 0 7 1.7 7 4.1 0 1.8-1.6 3.2-4.2 3.8L12 22.4l-2.8-9.9C6.6 11.9 5 10.5 5 8.7c0-2.4 2.8-4.1 7-4.1z"/>'
             + '<path d="M7.2 8.7c0-1.3 2.1-2.3 4.8-2.3s4.8 1 4.8 2.3" fill="none" stroke="#000" stroke-width="1" opacity=".3"/>',
    donut:   '<path d="M12 2.6A9.4 9.4 0 1 0 21.4 12 9.4 9.4 0 0 0 12 2.6zm0 5.8A3.6 3.6 0 1 1 8.4 12 3.6 3.6 0 0 1 12 8.4z"/><rect x="6" y="5.6" width="3" height="1.3" rx=".6" transform="rotate(24 7.5 6.2)" opacity=".55"/><rect x="15" y="7" width="3" height="1.3" rx=".6" transform="rotate(-38 16.5 7.6)" opacity=".55"/><rect x="14.6" y="16" width="3" height="1.3" rx=".6" transform="rotate(30 16 16.6)" opacity=".55"/><rect x="5.6" y="14" width="3" height="1.3" rx=".6" transform="rotate(-24 7 14.6)" opacity=".55"/>',
    mug:     '<path d="M4 5h12v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/><path d="M16 8h2.4a2.6 2.6 0 0 1 0 5.2H16" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 7.4h7v1.4h-7z" fill="#000" opacity=".35"/>',
    splat:   '<path d="M12 1.5 14.6 7l6 .9-4.3 4.3 1 6.1L12 15.4 6.7 18.3l1-6.1L3.4 7.9 9.4 7z"/><circle cx="19" cy="19" r="2.2" opacity=".75"/><circle cx="4.6" cy="20" r="1.3" opacity=".55"/>',
    bat:     '<path d="M1.5 9.5c2.4-.6 3.6.3 4.4 1.6.2-2 1-3.6 2.6-4.6.3 1.4.9 2.2 1.7 2.6L12 6.4l1.8 2.7c.8-.4 1.4-1.2 1.7-2.6 1.6 1 2.4 2.6 2.6 4.6.8-1.3 2-2.2 4.4-1.6-1.8 1.2-2.6 2.7-2.6 4.6-2.4-1-4.6-.6-6.2 1.2L12 17.6l-1.7-2.3c-1.6-1.8-3.8-2.2-6.2-1.2 0-1.9-.8-3.4-2.6-4.6z"/>',
    spider:  '<ellipse cx="12" cy="12.6" rx="3.2" ry="4.2"/><circle cx="12" cy="7.4" r="2.2"/><path d="M9 9 3.5 5.5M9 12H2.6M9.4 15 4 19M15 9l5.5-3.5M15 12h6.4M14.6 15 20 19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    pokeball:'<path d="M12 2a10 10 0 0 0-9.9 8.8h6.2a3.9 3.9 0 0 1 7.4 0h6.2A10 10 0 0 0 12 2zM2.1 13.2A10 10 0 0 0 12 22a10 10 0 0 0 9.9-8.8h-6.2a3.9 3.9 0 0 1-7.4 0z"/><circle cx="12" cy="12" r="2.2"/>',
    bear:    '<circle cx="5.4" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>'
             + '<circle cx="18.6" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>'
             + '<circle cx="12" cy="12.6" r="6.6" fill="none" stroke="currentColor" stroke-width="1.6"/>'
             + '<circle cx="9.6" cy="11.6" r="1.2"/><circle cx="14.4" cy="11.6" r="1.2"/>'
             + '<path d="M12 14.2v1.4M12 15.6c-1.2 0-2 .6-2.4 1.4M12 15.6c1.2 0 2 .6 2.4 1.4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'
             + '<path d="M7.6 4.6h8.8l-.9 2.4H8.5z"/><path d="M8.8 1.8h6.4v3H8.8z"/>'
             + '<path d="M9.4 20.2 12 18.4l2.6 1.8-1 2.2h-3.2z"/>',
    storm:   '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".5"/><circle cx="12" cy="12" r="6.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13.4 5.6 9.8 12h3l-1.4 6.4L16 11.4h-3z"/>',
    fedora:  '<path d="M6.4 10.6c-.4-3.4.6-5.6 2.2-6.4 1.6-.8 5.6-.8 6.9.6 1 1.1 1.2 3.2 1 5.8z"/><path d="M2 12.2c2-1.2 4-1.6 5.4-1.6h9.2c1.4 0 3.4.4 5.4 1.6-1.8 2-5.6 3-10 3s-8.2-1-10-3z"/><path d="M4 18.4c3-1.4 6-1.4 9 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>',
    pine:    '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.6 16.4 12h-2.6l3 4.8H7.2l3-4.8H7.6z"/><rect x="11.2" y="16.4" width="1.6" height="3"/>',
    ring:    '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M6.6 8.4c1.6-.8 2.4.8 4 .2M13 8c1.4-.9 2.6.6 4.2 0M6.8 16c1.7.7 2.4-.9 4-.3M13.2 15.7c1.5.8 2.5-.7 4-.2" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>',
    panda:   '<circle cx="5.6" cy="6.2" r="2.8"/><circle cx="18.4" cy="6.2" r="2.8"/>'
             + '<circle cx="12" cy="13" r="7.6" fill="none" stroke="currentColor" stroke-width="1.7"/>'
             + '<ellipse cx="8.9" cy="11.6" rx="2" ry="2.6" transform="rotate(-18 8.9 11.6)"/>'
             + '<ellipse cx="15.1" cy="11.6" rx="2" ry="2.6" transform="rotate(18 15.1 11.6)"/>'
             + '<ellipse cx="12" cy="15.6" rx="1.7" ry="1.3"/>'
             + '<path d="M12 16.9c-.9 1-2 1.2-3 .6M12 16.9c.9 1 2 1.2 3 .6" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>',
    seed:    '<path d="M12 2c1.2 2.6 1.2 4.6 0 6.4C10.8 6.6 10.8 4.6 12 2z"/><circle cx="12" cy="11.4" r="3"/><path d="M12 14.4c.6 3 2.4 5.2 5 6.6-3 .4-5-.8-6.2-2.6M12 14.4c-.6 3-2.4 5.2-5 6.6 3 .4 5-.8 6.2-2.6M6.6 9.4C4 9.8 2.4 11 1.6 13c2.6-.6 4.4-1.4 5.6-2.6M17.4 9.4c2.6.4 4.2 1.6 5 3.6-2.6-.6-4.4-1.4-5.6-2.6" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
    mask:    '<path d="M2.6 8.4c3-2 5.6-3 9.4-3s6.4 1 9.4 3c-1 4.6-2.2 7.2-4 8.6-1.4-2.6-3.2-3.8-5.4-3.8s-4 1.2-5.4 3.8c-1.8-1.4-3-4-4-8.6z"/><path d="M6 9.6c1.6-.8 3-1.2 4.4-1.2l-.8 2.6c-1.4 0-2.6-.4-3.6-1.4zM18 9.6c-1.6-.8-3-1.2-4.4-1.2l.8 2.6c1.4 0 2.6-.4 3.6-1.4z" fill="#000" opacity=".45"/>',
    trident: '<path d="M11.2 2h1.6v20h-1.6z"/><path d="M4.4 5.6c0 4.4 1.6 6.8 4.6 7.6l.6-1.8c-2-.6-3-2.2-3-5.8zM19.6 5.6c0 4.4-1.6 6.8-4.6 7.6l-.6-1.8c2-.6 3-2.2 3-5.8z"/><path d="M3.4 3.4h2v3.6h-2zM18.6 3.4h2v3.6h-2zM11 3.4h2v3.6h-2z"/><path d="M8.4 20.4h7.2V22H8.4z"/>',
    worm:    '<circle cx="7.4" cy="5.6" r="3"/><circle cx="16.4" cy="4.6" r="1.9" opacity=".7"/>'
             + '<path d="M1 21c3.4-5 6-5 9 0 3-5 6.6-5 13-1v3H1z"/>'
             + '<path d="M4.6 17.6c2.4-2.6 5-2.6 7.4 0" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".5"/>',
    brick:   '<rect x="2.5" y="9" width="19" height="10" rx="1.4"/>'
             + '<rect x="4.6" y="5.6" width="4.4" height="4" rx="1.2"/><rect x="10" y="5.6" width="4.4" height="4" rx="1.2"/>'
             + '<rect x="15.4" y="5.6" width="4.4" height="4" rx="1.2"/>'
             + '<rect x="4.6" y="19" width="14.8" height="1.6" rx=".6" opacity=".45"/>',
    castle:  '<path d="M11.2 1.6h1.6v3.4h-1.6z"/><path d="M12 2.6l2.2 1.2-2.2 1.2-2.2-1.2z"/>'
             + '<path d="M9.4 21V10.8c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6V21z"/>'
             + '<path d="M6 21v-7.6l1.6-2.6 1.6 2.6V21zM15 21v-7.6l1.6-2.6 1.6 2.6V21z"/>'
             + '<path d="M2.6 21v-4.4l1.4-2.2 1.4 2.2V21zM19 21v-4.4l1.4-2.2 1.4 2.2V21z"/>'
             + '<rect x="1" y="21" width="22" height="1.8" rx=".6"/>'
             + '<path d="M11.2 15.6h1.6v5.4h-1.6z" fill="#000" opacity=".4"/>',
    globe:   '<circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" stroke-width="1.7"/>'
             + '<ellipse cx="12" cy="12" rx="4" ry="9.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'
             + '<path d="M2.9 9h18.2M2.9 15h18.2" stroke="currentColor" stroke-width="1.2"/>'
             + '<rect x="1" y="10.8" width="22" height="2.4" rx="1.2" opacity=".9"/>',
    league:  '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>'
             + '<path d="M6.4 17.6 17.6 6.4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>'
             + '<path d="M12 6.6l1.5 3.6 3.9.3-3 2.5.9 3.8L12 14.8 8.7 16.8l.9-3.8-3-2.5 3.9-.3z"/>',
    // Luxo Jr.: a desk lamp leaning over, its light, and the ball
    lamp:    '<rect x="4.4" y="20.4" width="9.2" height="1.8" rx=".9"/>'
             + '<path d="M9 20.4 13.4 13.2M13.4 13.2 9.6 8.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
             + '<circle cx="13.4" cy="13.2" r="1.2"/>'
             + '<path d="M12.6 4.2 5.2 8.6l3.4 3.6 5.4-5z"/>'
             + '<circle cx="8" cy="12.6" r="1.3" opacity=".7"/>'
             + '<circle cx="19.2" cy="19.4" r="2.6" opacity=".8"/>',
    // Red, in profile: the beak, and the two brows that are the whole joke
    bird:    '<circle cx="11" cy="12.4" r="7.4"/>'
             + '<path d="M18 10.6 23 12.4l-5 1.8z"/>'
             + '<path d="M5.8 3.6c1.8-.6 3.2-.1 4.2 1.4-1.8.1-3.1.5-3.9 1.2z"/>'
             + '<circle cx="9" cy="11.4" r="1.5" fill="#000" opacity=".5"/>'
             + '<circle cx="13.6" cy="11.4" r="1.5" fill="#000" opacity=".5"/>'
             + '<path d="M6.4 8 10.2 10M16.2 8 12.4 10" fill="none" stroke="#000" stroke-width="1.7" opacity=".5" stroke-linecap="round"/>',
    // the mockingjay pin: a ring, a bird in flight, and the arrow through it
    mockingjay: '<circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" stroke-width="1.5"/>'
             + '<path d="M4.9 19.1 19.1 4.9" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".55"/>'
             + '<path d="M19.1 4.9 15.5 5.6l2.9 2.9z" opacity=".55"/>'
             + '<path d="M12 3.6 12.9 4.7 18.9 3 15.8 7.9 19.7 9.8 13.5 9.9 14.8 15.9 12 13.5 9.2 15.9 10.5 9.9 4.3 9.8 8.2 7.9 5.1 3 11.1 4.7Z"/>',
    // a Continental coin: rim, inner rule, and the crest struck into it
    coin:    '<circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" stroke-width="1.7"/>'
             + '<circle cx="12" cy="12" r="7.4" fill="none" stroke="currentColor" stroke-width=".9" opacity=".55"/>'
             + '<path d="M12 6.2 17 8.2v3.6c0 2.9-2 5-5 6-3-1-5-3.1-5-6V8.2z"/>'
             + '<path d="M12 8.8v6.4M9.4 11.4h5.2" fill="none" stroke="#000" stroke-width="1.1" opacity=".4" stroke-linecap="round"/>',
    saloon:  '<path d="M3 21V9.4l9-6.4 9 6.4V21z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
             + '<path d="M2 21h20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
             + '<path d="M9.4 21v-6.2a2.6 2.6 0 0 1 5.2 0V21z"/>'
             + '<path d="M5.8 10.4h3.2v3H5.8zM15 10.4h3.2v3H15z" opacity=".65"/>',

    /* ── three later additions ── */
    // Geometry Dash: the cube, tilted the way it is mid-jump, with the spike
    // it is usually about to land on. The whole game in two shapes.
    cube:    '<rect x="6.4" y="6.4" width="11.2" height="11.2" rx="1.6"'
             + ' transform="rotate(20 12 12)"/>'
             + '<path d="M2 22h6l-3-5.2z" opacity=".85"/>'
             + '<path d="M16 22h6l-3-5.2z" opacity=".85"/>',
    // Rio: a macaw in profile. Not the Angry Birds circle, which is a
    // different bird and already spoken for.
    macaw:   '<path d="M15.6 4.2c3 0 5.2 2.3 5.2 5.2 0 4.6-3.9 8.2-8.6 8.2H8.2'
             + 'c-2.9 0-5-2-5-4.6 0-3.1 2.5-5.2 5.8-5.2h1.4c.7-2.2 2.6-3.6 5.2-3.6z"/>'
             + '<circle cx="16.4" cy="8.4" r="1.05" fill="#0b0b0f"/>'
             + '<path d="M9.4 17.6 7 22h2.6l1.8-4.4z" opacity=".8"/>',
    // San Diego Zoo: a paw. The zoo's own mark is a panda and that glyph is
    // already Kung Fu Panda's, so this is the animal-agnostic version.
    paw:     '<circle cx="7.2" cy="8.4" r="2.15"/><circle cx="12" cy="6.6" r="2.15"/>'
             + '<circle cx="16.8" cy="8.4" r="2.15"/><circle cx="19.4" cy="13" r="1.9"/>'
             + '<path d="M12 11.4c3.1 0 5.6 2.4 5.6 5 0 2-1.6 3.2-3.6 3.2h-4'
             + 'c-2 0-3.6-1.2-3.6-3.2 0-2.6 2.5-5 5.6-5z"/>',

    /* ── seven later additions ── */
    // DreamWorks: the crescent and the boy fishing off it, which is the only
    // logo on this page that is already a drawing rather than a wordmark.
    moon:    '<path d="M3.2 8.3A9.6 9.6 0 1 0 20.8 8.3 9.6 9.6 0 0 1 3.2 8.3z"/>'
             + '<circle cx="9.2" cy="8.5" r="1.9"/>'
             + '<path d="M8.1 10.4h2.2v3.4H8.1z"/>'
             + '<path d="M10.4 10.8 17.8 5.6" fill="none" stroke="currentColor"'
             + ' stroke-width="1.2" stroke-linecap="round"/>'
             + '<path d="M17.8 5.6v5.2" fill="none" stroke="currentColor"'
             + ' stroke-width=".8" opacity=".65"/>'
             + '<circle cx="17.8" cy="11.5" r="1" opacity=".65"/>',
    // Nintendo: the Famicom pad. A cross and two round buttons is the shape
    // they invented in 1983 and every controller since has kept.
    dpad:    '<path d="M6.2 5.2h4.4v3.6h3.6v4.4h-3.6v3.6H6.2v-3.6H2.6V8.8h3.6z"/>'
             + '<circle cx="17.6" cy="9.6" r="2.4"/>'
             + '<circle cx="20.4" cy="14.8" r="2.4" opacity=".72"/>',
    // Zelda: the Triforce. Three triangles and the fourth one you do not draw.
    triforce: '<path d="M12 2.4 17.4 12H6.6z"/>'
             + '<path d="M6.4 12.9 11.8 22.4H1z"/>'
             + '<path d="M17.6 12.9 23 22.4H12.2z"/>',
    // Splatoon: a blot of ink with two drops thrown off it. The squid would be
    // the obvious pick and the game is not about the squid, it is about the
    // floor being your colour.
    ink:     '<path d="M12 2.6c2.6 0 3.9 1.9 5.4 3.2 1.6 1.4 3.8 2 3.8 4.6 0 2.4-1.9'
             + ' 3.6-2.8 5.3-1 1.9-.9 4.4-3.2 5.1-2.2.7-3.7-1-5.7-1.3-2.1-.3-4.4.9-5.8-.8'
             + '-1.4-1.7-.2-3.8-.5-5.9-.3-2.2-1.9-3.9-.9-5.9C3.2 6.1 5.7 6.3 7.4 5.3'
             + ' 9 4.4 9.7 2.6 12 2.6z"/>'
             + '<circle cx="20.6" cy="20.4" r="2" opacity=".75"/>'
             + '<circle cx="4.6" cy="21" r="1.15" opacity=".55"/>',
    // Looney Tunes: the bullseye the cartoons open and close inside.
    target:  '<circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" stroke-width="2.5"/>'
             + '<circle cx="12" cy="12" r="6.2" fill="none" stroke="currentColor" stroke-width="2.5" opacity=".68"/>'
             + '<circle cx="12" cy="12" r="2.3"/>',
    // LEGOLAND: a minifigure head. `brick` is already LEGO's on this page, and
    // the park is the one place the brick is a person rather than a part.
    minifig: '<rect x="9.6" y="1.6" width="4.8" height="2.8" rx="1.1"/>'
             + '<rect x="6.4" y="4.4" width="11.2" height="15" rx="3.2"/>'
             + '<circle cx="9.7" cy="10.2" r="1.35" fill="#000" opacity=".55"/>'
             + '<circle cx="14.3" cy="10.2" r="1.35" fill="#000" opacity=".55"/>'
             + '<path d="M8.5 13.2c.9 2.1 2.1 3.2 3.5 3.2s2.6-1.1 3.5-3.2" fill="none"'
             + ' stroke="#000" stroke-width="1.3" opacity=".55" stroke-linecap="round"/>',
    // Six Flags: six is the whole name, so the glyph is flags. Three of them,
    // set back in depth, because six at 24 pixels is a smear.
    flags:   '<path d="M3.6 2.4h1.7V22H3.6z"/><path d="M5.3 3.4 13 6.2l-7.7 2.8z"/>'
             + '<path d="M11 6.2h1.5v15.8H11z" opacity=".8"/>'
             + '<path d="M12.5 7 19.2 9.4l-6.7 2.4z" opacity=".8"/>'
             + '<path d="M17.6 10.2h1.3V22h-1.3z" opacity=".58"/>'
             + '<path d="M18.9 11 23.8 12.8l-4.9 1.8z" opacity=".58"/>'
  };

  function glyph(key) {
    if (!key || !GLYPHS[key]) return '';
    return '<svg class="fr-glyph" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' + GLYPHS[key] + '</svg>';
  }

  // Breaking Bad sets its own two letters as elements; everything else is one word-mark
  function lettering(f) {
    if (f.wm === 'breakingbad') {
      return '<span class="fr-name wm--breakingbad">'
        + '<i class="bb-tile"><b>Br</b><em>35</em></i>eaking '
        + '<i class="bb-tile"><b>Ba</b><em>56</em></i>ad</span>';
    }
    return '<span class="fr-name wm--' + f.wm + '">' + esc(f.name) + '</span>';
  }

  /* The whole tile is the link, not just the plate: clicking the blurb, the
     meta line or any dead space opens the page. The plate keeps data-magnetic
     so it still drifts toward the cursor inside the card. */
  function tile(f) {
    var tag = f.href ? 'a' : 'article';
    var attr = f.href ? ' href="' + f.href + '"' : '';
    return '<' + tag + ' class="fr-card reveal" style="--c1:' + f.c1 + ';--c2:' + f.c2 + '"' + attr + '>'
      + '<span class="fr-plate"' + (f.href ? ' data-magnetic' : '') + '>'
      +   glyph(f.glyph)
      +   lettering(f)
      +   (f.href ? '<span class="fr-enter">Enter ↗</span>' : '')
      + '</span>'
      + '<span class="fr-body">'
      +   '<span class="fr-desc">' + esc(f.desc) + '</span>'
      /* when I got into it -- the one line that makes this a personal list
         rather than a catalogue. Optional, so a tile without it still works. */
      /* the empty stand-in matters: the tiles share the rows of their grid
         (subgrid, see fandom.css) so every tile in a row puts its blurb, its
         "when" line and its meta line on the same lines. A tile with no `when`
         still has to occupy that row, or everything under it climbs one. */
      +   (f.when ? '<span class="fr-when">' + esc(f.when) + '</span>'
                  : '<span class="fr-slot" aria-hidden="true"></span>')
      +   '<span class="fr-meta">' + esc(f.meta) + '</span>'
      + '</span>'
      + '</' + tag + '>';
  }

  var total = data.reduce(function (n, g) { return n + g.items.length; }, 0);

  root.innerHTML = data.map(function (g) {
    return '<section class="fr-group fr-group--' + g.id + '">'
      + '<h3 class="subsec subsec--fr reveal">' + esc(g.label)
      +   '<span class="subsec-yr">' + esc(g.note) + '</span>'
      +   '<span class="fr-count">' + g.items.length + '</span>'
      + '</h3>'
      + '<div class="fr-grid">' + g.items.map(tile).join('') + '</div>'
      + '</section>';
  }).join('');

  /* These nodes carry .reveal, so they start invisible until reveal.js observes
     them. It scans once on load; this file currently runs before it, but making
     that a load-order dependency is how the atlas on /star-wars/ ended up blank.
     Handing the markup back is idempotent and makes the order irrelevant.

     This call used to sit INSIDE the map callback above, after its `return`,
     which meant it never ran at all. */
  if (typeof window.AEreveal === 'function') window.AEreveal(root);

  /* the count, wherever the page prints it: the lede and the button that opens
     the whole block both carry it, and neither should be a number typed by hand */
  var counts = document.querySelectorAll('.fr-total, #fandomTotal');
  for (var ci = 0; ci < counts.length; ci++) counts[ci].textContent = total;

  /* ── the switch ──
     Everything this file renders is a world that ships nothing, so on /worlds/
     it all sits behind one button: the two portals that DO ship apps are the
     page, and this is what you open. No button on the page (or a page that
     wants the tiles open) simply gets them, which is why the guard is a return
     rather than a class. */
  var btn = document.getElementById('frVaultBtn');
  var vault = document.getElementById('frVault');
  if (!btn || !vault) return;

  var label = btn.querySelector('.fr-vaultbtn-l');
  var arrow = btn.querySelector('.fr-vaultbtn-a');

  /* Remembered, the same way the "show other pictures" switch is (pics.js) and
     the cursor and sound toggles are: one localStorage key, wrapped in
     try/catch because private mode throws on the getter, not just the setter.
     Open it once and it stays open on the next visit, so somebody who came here
     for the tiles is not made to ask twice. */
  var KEY = 'ae-worlds-open';
  function read() {
    try { return localStorage.getItem(KEY) === 'on'; } catch (e) { return false; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch (e) { /* private mode */ }
  }

  /* `late` is whether this is a change rather than the initial state.

     It only controls the reveal pass, and the distinction matters: the tiles
     carry .reveal, and a tile laid out inside a `hidden` block has never
     intersected the viewport, so reveal.js is still waiting on all of it. On a
     CHANGE the observer needs a nudge on the next frame, once the block has a
     box. On LOAD it needs nothing: this file runs before reveal.js, so the
     block is already open by the time reveal.js does its first scan and the
     tiles are picked up like anything else on the page. */
  function apply(open, late) {
    vault.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Hide the other worlds' : 'Show the other worlds';
    if (arrow) arrow.textContent = open ? '\u2191' : '\u2193';
    if (open && late && typeof window.AEreveal === 'function') {
      requestAnimationFrame(function () { window.AEreveal(vault); });
    }
  }

  apply(read(), false);

  btn.addEventListener('click', function () {
    var open = vault.hidden;
    write(open);
    apply(open, true);
  });

  /* Another tab flipped it: keep every open copy of this page in step rather
     than letting them disagree about what the same one setting says. */
  addEventListener('storage', function (e) {
    if (e.key === KEY) apply(read(), true);
  });
})();
