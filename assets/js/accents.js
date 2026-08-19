/* accents.js: renders /accents/ from ACCENT_PAGE (see accents-data.js).

   Two lists on one page, sharing one card: the accents, grouped by the school
   year I picked them up in, and the four impersonations, which are a different
   job and get their own block.

   THE AUDIO. Every card is wired for a recording and, right now, none of them
   exist. Rather than ship twenty-three buttons that 404, a card only becomes a
   player when its data entry says `rec: true`; everything else renders a plain
   "not recorded yet" chip. See the header of accents-data.js for the filename
   convention and the encode settings.

   Only one clip is ever audible at a time (starting a second one stops the
   first), because a page of voices all talking over each other is the obvious
   failure mode here.

   Loads AFTER accents-data.js and BEFORE reveal.js. */
(function accents() {
  var root = document.getElementById('acRoot');
  var page = window.ACCENT_PAGE;
  if (!root || !page) return;

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  var AUDIO_DIR = '/assets/audio/accents/';

  /* the play control, or the honest absence of one */
  function player(it) {
    if (!it.rec) {
      return '<span class="ac-soon"><i aria-hidden="true"></i>Not recorded yet</span>';
    }
    return '<button class="ac-play" type="button" data-clip="' + esc(it.id) + '"'
      + ' aria-label="Play my ' + esc(it.name) + ' accent">'
      + '<span class="ac-play-i" aria-hidden="true"></span>'
      + '<span class="ac-play-t">Play</span>'
      + '<span class="ac-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>'
      + '</button>';
  }

  function card(it, kind) {
    return '<article class="ac-card reveal' + (it.rec ? ' has-rec' : '') + '" id="ac-' + esc(it.id) + '">'
      + '<div class="ac-head">'
      +   '<span class="ac-medal" aria-hidden="true"><b>' + esc(it.ar) + '</b></span>'
      +   '<span class="ac-titles">'
      +     '<h4>' + esc(it.name) + '</h4>'
      +     '<span class="ac-from">' + esc(kind === 'imp' ? it.from : it.note) + '</span>'
      +   '</span>'
      +   (it.n ? '<span class="ac-n" aria-label="Number ' + it.n + ' in the order I learned them">'
      +     (it.n < 10 ? '0' + it.n : it.n) + '</span>' : '')
      + '</div>'
      + '<p class="ac-line">&ldquo;' + esc(it.line) + '&rdquo;</p>'
      + '<p class="ac-desc">' + esc(it.desc) + '</p>'
      + '<div class="ac-foot">' + player(it) + '</div>'
      + '</article>';
  }

  var groups = page.groups || [];
  var imps = page.impressions || [];
  var nAcc = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  var all = groups.reduce(function (a, g) { return a.concat(g.items); }, []).concat(imps);
  var nRec = all.filter(function (it) { return it.rec; }).length;

  var counter = '<div class="ac-tally reveal">'
    + '<span><b>' + nAcc + '</b><i>accents</i></span>'
    + '<span><b>' + imps.length + '</b><i>impersonations</i></span>'
    + '<span class="ac-tally--rec"><b>' + nRec + ' / ' + all.length + '</b><i>recorded</i></span>'
    + '</div>';

  root.innerHTML = counter
    + '<section class="ac-sec" id="accents">'
    +   groups.map(function (g) {
          return '<div class="ac-group">'
            + '<h3 class="subsec subsec--ac reveal">' + esc(g.label)
            +   '<span class="subsec-yr">' + esc(g.note) + '</span>'
            +   '<span class="ac-count">' + g.items.length + '</span>'
            + '</h3>'
            + '<div class="ac-grid">' + g.items.map(function (it) { return card(it, 'acc'); }).join('') + '</div>'
            + '</div>';
        }).join('')
    + '</section>'
    + '<section class="ac-sec" id="impressions">'
    +   '<h3 class="subsec subsec--ac reveal">Impersonations'
    +     '<span class="subsec-yr">one person, not one region</span>'
    +     '<span class="ac-count">' + imps.length + '</span>'
    +   '</h3>'
    +   '<p class="ac-lede reveal">An accent is a system you can run any sentence through. An impersonation is one specific voice, which means the pitch, the pace and the damage matter as much as the vowels do. These four are the ones I actually do rather than the ones I can approximate.</p>'
    +   '<div class="ac-grid ac-grid--imp">' + imps.map(function (it) { return card(it, 'imp'); }).join('') + '</div>'
    + '</section>';

  /* These nodes carry .reveal and this file runs before reveal.js, but handing
     the markup back is idempotent and makes the load order irrelevant: the
     same guard every other renderer on this site uses. */
  if (typeof window.AEreveal === 'function') window.AEreveal(root);

  /* ── playback ──
     One <audio> element for the whole page, re-pointed per clip, so there is
     never a second voice running underneath the one you asked for. A clip that
     fails to load marks its own card rather than failing silently. */
  var audio = new Audio();
  audio.preload = 'none';
  var playing = null;

  function stop() {
    if (!playing) return;
    playing.classList.remove('is-playing');
    playing.querySelector('.ac-play-t').textContent = 'Play';
    playing = null;
  }

  audio.addEventListener('ended', stop);
  audio.addEventListener('error', function () {
    if (!playing) return;
    var host = playing.closest('.ac-card');
    playing.outerHTML = '<span class="ac-soon"><i aria-hidden="true"></i>Recording missing</span>';
    if (host) host.classList.remove('has-rec');
    playing = null;
  });

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.ac-play');
    if (!btn) return;

    if (playing === btn) { audio.pause(); stop(); return; }

    stop();
    audio.pause();
    audio.src = AUDIO_DIR + btn.getAttribute('data-clip') + '.m4a';
    playing = btn;
    btn.classList.add('is-playing');
    btn.querySelector('.ac-play-t').textContent = 'Stop';
    /* play() rejects if the file is missing or autoplay policy blocks it; the
       error listener above handles the first case, and the catch keeps the
       second from surfacing as an unhandled rejection in the console. */
    var p = audio.play();
    if (p && p.catch) p.catch(function () { stop(); });
  });
})();
