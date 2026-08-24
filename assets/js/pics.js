/* pics.js: the one switch that decides whether the personal photo galleries
   are open for business.

   /high-school/, /college/ and /travels/ all show a cover: one card per school
   year, one photo per trip. That is the part anybody is meant to see, and it is
   always there. Everything behind it -- the four hundred-odd photos inside each
   year, the trip grids, and the counts that advertise how many there are -- is
   off unless you go and ask for it.

   Off (the default):
     the covers render exactly as they do now, minus every "466 photos" and
     every count badge, and touching one does nothing at all.
   On:
     the counts come back and the covers open into their galleries.

   Deliberately not a link, not a query string and not a per-page setting: it is
   one localStorage key shared by all three pages, so turning it on once means
   the whole site behaves that way until it is turned off again.

   The OFF state is pure CSS (`html:not([data-show-pics="on"])`, see pics.css),
   which matters: the counts sit in the static HTML of the headings, and if this
   file had to hide them they would flash on screen first. So the attribute
   below only ever turns things ON.

   Mount the switch with <div class="picsw" data-pics-toggle></div>; read the
   state from other scripts with window.AEpics.on(), and listen for 'ae:pics'
   on the document to react when it changes. */
(function pics() {
  var KEY = 'ae-show-pics';
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY) === 'on'; } catch (e) { return false; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch (e) { /* private mode */ }
  }

  var showing = read();

  function apply(v, announce) {
    showing = v;
    if (v) root.dataset.showPics = 'on';
    else delete root.dataset.showPics;

    var btns = document.querySelectorAll('.picsw-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-checked', v ? 'true' : 'false');
      btns[i].querySelector('.picsw-label').textContent =
        v ? 'hide other pictures' : 'show other pictures';
    }
    if (announce) document.dispatchEvent(new CustomEvent('ae:pics', { detail: { on: v } }));
  }

  /* The service worker keeps the whole site on the device for offline use, and
     the galleries are the heavy part of that. Turning the switch on is the
     moment it becomes worth having them; until then it must not touch them.
     (Turning it off does not delete what is already cached -- that would only
     mean downloading it again on the next change of mind.) */
  function tellWorker(on) {
    if (!on || !navigator.serviceWorker) return;
    var reg = navigator.serviceWorker.controller;
    if (reg) reg.postMessage({ type: 'prefetch', photos: true });
  }

  window.AEpics = { on: function () { return showing; } };

  apply(showing, false);

  /* Another tab flipped it: keep every open page in step rather than letting
     them disagree about what the same one setting says. */
  addEventListener('storage', function (e) {
    if (e.key === KEY) apply(read(), true);
  });

  /* ── load the photographs last ──

     That is lazy.js's job: years.js and travels.js write every gallery frame
     with data-src instead of src, and lazy.js hands each one its src when it
     comes within a screen of the viewport, a few at a time, nearest first, and
     takes it back once it is scrolled far away. So the page is complete and
     readable before a single photograph has been asked for, the pictures fill
     in as you reach them, and a 700-frame year never has more than a few
     screens' worth of decoded bitmaps alive at once.

     Two earlier answers, for the record. Holding every src back until the load
     event put the photographs strictly last, which wasted the connection
     during the page load. fetchpriority="low" fixed that but bounded nothing:
     native loading="lazy" still fires everything within a couple of screens
     at once, which on a phone was sixty requests and sixty decodes in one go. */

  var mounts = document.querySelectorAll('[data-pics-toggle]');
  if (!mounts.length) return;

  for (var m = 0; m < mounts.length; m++) {
    mounts[m].innerHTML =
        '<button class="picsw-btn" type="button" role="switch"'
      + ' aria-checked="' + (showing ? 'true' : 'false') + '">'
      +   '<span class="picsw-track" aria-hidden="true"><span class="picsw-knob"></span></span>'
      +   '<span class="picsw-label">'
      +     (showing ? 'hide other pictures' : 'show other pictures')
      +   '</span>'
      + '</button>';

    mounts[m].querySelector('.picsw-btn').addEventListener('click', function () {
      var next = !showing;
      write(next);
      apply(next, true);
      tellWorker(next);
    });
  }
})();
