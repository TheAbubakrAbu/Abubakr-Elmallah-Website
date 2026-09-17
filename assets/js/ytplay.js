/* ytplay.js: the inline YouTube player, shared by /worlds/<franchise>/ and
   /music/.

   THIS CODE USED TO LIVE IN fanpage.js and moved here unchanged when a second
   page wanted it. The fan pages drive it with their defaults and behave exactly
   as they did before; /music/ drives it with its own selectors. Nothing about
   the playback, the transport or the teardown was altered in the move.

   WHAT IS SHARED AND WHAT IS PER-ROOT, which is the whole design:
     shared   the YouTube API itself. One script tag, one onYouTubeIframeAPIReady
              chain, one set of preconnects, one `seat` counter so the element
              ids it mints are unique across the document. Arming it twice is a
              no-op, and two attached roots must not each inject the API.
     per-root everything about what is currently playing: the pressed button,
              the panel, the YT.Player, the progress ticker. Kept in attach()'s
              closure so two roots on one page cannot stop each other's track.

   Load BEFORE fanpage.js / music.js. */
(function () {
  'use strict';

  /* A local copy rather than a parameter: it escapes a title and a video id
     into a double-quoted attribute, so it has to handle the quote too, and
     the callers' own esc() helpers do not all do that. Three lines is cheaper
     than an option nobody can get wrong. */
  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  };

  /* ── the player ──
     One player for the whole page, built when a button is pressed and DESTROYED
     when it stops. Not hidden, destroyed: a paused YouTube iframe is still a
     live document holding a socket and a decoder, and thirty of them left
     behind after a scroll through the Star Wars themes is a page that never
     settles. Creating it costs nothing until asked and tearing it down gives
     everything back.

     NOTHING IS HOSTED HERE. See visit() above for why: these are commercial
     recordings played through the embed their rights holder publishes them
     with, which is both the legal path and the free one.

     ── why there is an API script, and why it loads WITH the page ──
     A bare <iframe> plays and nothing more: it cannot be asked where it is in
     the track, so there is no progress bar to scrub and no way to jump ten
     seconds. YouTube's IFrame API is what makes those possible.

     It wants to be lazy -- load it on the first press and a visitor who only
     reads the page fetches nothing from Google -- and that was how this was
     written first. It does not work. Injected after the load event the player
     is constructed, its iframe is created with enablejsapi on it, and then no
     method is ever attached to it and onReady never fires; injected with the
     page, the same call is ready with a duration in well under a second.
     Measured on this exact page with everything else held identical, so it is
     the timing of the injection and nothing else.

     So it is injected here, at render, and ONLY on a page that actually has a
     track on it: `armApi()` below is called from the first visit() that emits
     a play button, so the 40-odd pages with music pay for it and the rest do
     not. It is async and it blocks nothing.

     If it cannot load at all (offline, blocked, an extension), fall() drops
     back to exactly the plain iframe this had before: the track still plays,
     it simply has no scrubber. A missing nicety must not cost the feature. */
  var YT_SRC = 'https://www.youtube.com/iframe_api';
  var apiState = 0;                   // 0 untouched, 1 loading, 2 ready, 3 failed
  var apiWaiting = [];

  function withApi(cb) {
    if (apiState === 2) return cb(true);
    if (apiState === 3) return cb(false);
    apiWaiting.push(cb);
    if (apiState === 1) return;
    armApi();
  }

  /* ── warming the connection ──
     Pressing Play should not also be paying for a DNS lookup, a TCP handshake
     and a TLS negotiation with three Google hosts before the embed document
     has even been asked for; on a cold connection that is most of the wait
     between the press and the sound. These are hints and nothing else: no
     request is made, no content is fetched and no cookie is sent, the browser
     simply opens the sockets early so that when the iframe is created the
     connection it needs is already there. They go in alongside the API script,
     so only the pages that actually carry a track pay for them. */
  var WARM = [
    'https://www.youtube-nocookie.com',   // the embed document itself
    'https://www.youtube.com',            // the API script and the player core
    'https://i.ytimg.com',                // the poster frame behind the player
  ];
  function warm() {
    WARM.forEach(function (href) {
      var l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      l.crossOrigin = '';
      document.head.appendChild(l);
    });
  }

  function armApi() {
    if (apiState) return;
    apiState = 1;
    warm();

    function settle(ok) {
      apiState = ok ? 2 : 3;
      var q = apiWaiting; apiWaiting = [];
      q.forEach(function (f) { f(ok); });
    }
    /* The API calls one global when it is ready. Something else on the page may
       want it one day, so whatever is already there is called too. */
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') { try { prev(); } catch (e) {} }
      settle(true);
    };
    var tag = document.createElement('script');
    tag.src = YT_SRC;
    tag.async = true;
    tag.onerror = function () { settle(false); };
    document.head.appendChild(tag);
    /* onerror does not fire for every way this can fail, so time it out too
       rather than leaving a button that says Play and never does anything. */
    setTimeout(function () { if (apiState === 1) settle(false); }, 6000);
  }

  var seat = 0;        // unique id per player element, document-wide

  /* ── one instance per root ──
     Returns nothing useful; call it once with the element your rows live in. */
  function attach(rootEl, opts) {
    if (!rootEl) return;
    opts = opts || {};
    var O = {
      btn:      opts.btn      || '.fan-hear',
      holder:   opts.holder   || '.fan-tile, .fan-card, .fan-linkcard, li',
      label:    opts.label === undefined ? '.fan-hear-t' : opts.label,
      playText: opts.playText || 'Play',
      stopText: opts.stopText || 'Stop',
      id:       opts.id       || function (b) { return b.getAttribute('data-yt'); },
      title:    opts.title    || function (b) { return b.getAttribute('data-t'); },
    };

    var heard = null;    // the button currently playing
    var stage = null;    // the panel under it
    var player = null;   // the YT.Player, when the API came up
    var ticker = null;   // the progress poll

    function clock(t) {
      if (!isFinite(t) || t < 0) t = 0;
      var m = Math.floor(t / 60), sec = Math.floor(t % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function silence() {
      if (ticker) { clearInterval(ticker); ticker = null; }
      if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
      player = null;
      if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
      stage = null;
      if (heard) {
        heard.classList.remove('is-playing');
        heard.setAttribute('aria-pressed', 'false');
        var t = (O.label ? heard.querySelector(O.label) : null);
        if (t) t.textContent = O.playText;
        heard = null;
      }
    }

    /* ── the transport ──
       Rendered whether or not the API came up; without it the row is left off
       entirely rather than shown dead, because a scrubber that does not scrub is
       worse than no scrubber. */
    function transport(id) {
      return '<div class="fan-tr">'
        + '<button class="fan-tr-b" type="button" data-seek="-10" aria-label="Back ten seconds">'
        +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>'
        +   '<u>10</u></button>'
        + '<button class="fan-tr-b fan-tr-pp" type="button" data-pp aria-label="Pause">'
        +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z"/></svg></button>'
        + '<button class="fan-tr-b" type="button" data-seek="10" aria-label="Forward ten seconds">'
        +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2l5 4-5 4V7a6 6 0 1 0 6 6h2a8 8 0 1 1-8-8z"/></svg>'
        +   '<u>10</u></button>'
        + '<div class="fan-scrub" role="slider" tabindex="0" aria-label="Seek"'
        +   ' aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0:00">'
        +   '<span class="fan-scrub-track"></span>'
        +   '<span class="fan-scrub-fill"></span>'
        +   '<span class="fan-scrub-knob"></span>'
        + '</div>'
        + '<span class="fan-tr-t"><b>0:00</b>/<i>0:00</i></span>'
        + '</div>';
    }

    /* ── why this is not simply a click handler ──
       A mouse press and the click it turns into are two separate events with a
       gap between them: the browser will not call click until the button comes
       back up, so every millisecond the finger rests on the button is a
       millisecond the player has not started loading. Building it on the way
       down instead hands the embed that gap for free, and the embed needs every
       bit of it -- it is a whole second document, fetched and parsed before a
       note can play.

       Only for mouse and pen. On touch, pointerdown fires at the START of a
       gesture that very often turns out to be a scroll, and a page that starts
       playing music because somebody swiped past a tile is far worse than one
       that takes an extra moment; touch keeps the click, which fires only once
       the gesture has resolved into a tap. Anything other than the primary
       button is left alone too.

       The click still arrives afterwards, and running the toggle a second time
       would stop the track that had just been started, so a button handled on
       the way down swallows its own click. Keyboard activation (Enter, Space)
       produces a click with no pointerdown before it and is unaffected. */
    var primed = null, primedAt = 0;

    rootEl.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch' || (e.button !== undefined && e.button !== 0)) return;
      var btn = e.target.closest(O.btn);
      if (!btn) return;
      primed = btn; primedAt = Date.now();
      hear(btn);
    });

    rootEl.addEventListener('click', function (e) {
      var btn = e.target.closest(O.btn);
      if (!btn) return;
      e.preventDefault();
      if (btn === primed && Date.now() - primedAt < 900) { primed = null; return; }
      hear(btn);
    });

    function hear(btn) {
      /* pressing the one that is already going is how you stop it */
      if (btn === heard) { silence(); return; }
      silence();

      /* Hang the player off whatever block the button sits in, falling back to
         the button's own parent, so this works in a tile, a card, a link row or
         anything added later without needing to know about each. */
      var holder = btn.closest(O.holder) || btn.parentNode;
      var vid = O.id(btn);
      var title = O.title(btn);
      var slot = 'fanyt' + (++seat);

      stage = document.createElement('div');
      stage.className = 'fan-stage is-waiting';
      /* The placeholder carries real width/height ATTRIBUTES, not just CSS. The
         API reads the element it is given to decide how big to build its iframe,
         and this panel is inserted and measured in the same frame it is animated
         in, so an aspect-ratio box can still be zero high at that moment. A
         zero-sized YouTube iframe never finishes its handshake and the player
         then has no methods at all, which looks exactly like the API failing. */
      stage.innerHTML =
        '<div class="fan-stage-vid"><div id="' + slot + '" width="426" height="240"></div></div>'
        + '<button class="fan-stage-x" type="button" aria-label="Stop">Stop</button>';

      if (holder.parentNode) holder.parentNode.insertBefore(stage, holder.nextSibling);
      else holder.appendChild(stage);

      heard = btn;
      btn.classList.add('is-playing');
      btn.setAttribute('aria-pressed', 'true');
      var lbl = (O.label ? btn.querySelector(O.label) : null);
      if (lbl) lbl.textContent = O.stopText;

      var mine = stage;   // so a late callback from a player already stopped does nothing

      /* ── when the video refuses to play here ──
         YouTube error 101 and 150 both mean the same thing: the owner has
         disabled playback inside other people's pages. Labels set it on a lot
         of chart music, and there is nothing a page can do about it: a plain
         iframe hits exactly the same wall, so falling back to one just leaves
         a dead black rectangle, which is what "the play button doesn't work"
         looks like from the outside.

         So say it, and give the one thing that does work: a link out to the
         video on YouTube itself. The button resets so it does not sit there
         claiming to be playing. */
      function refuse() {
        if (mine !== stage) return;
        if (ticker) { clearInterval(ticker); ticker = null; }
        if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
        player = null;
        stage.classList.remove('is-waiting');
        stage.classList.add('is-refused');
        stage.innerHTML =
          '<p class="fan-stage-no">This one will not play inside another page. '
          + '<a href="https://www.youtube.com/watch?v=' + esc(vid) + '"'
          + ' target="_blank" rel="noopener">Open it on YouTube</a></p>'
          + '<button class="fan-stage-x" type="button" aria-label="Close">Close</button>';
        if (heard) {
          heard.classList.remove('is-playing');
          heard.setAttribute('aria-pressed', 'false');
          var lb = O.label ? heard.querySelector(O.label) : null;
          if (lb) lb.textContent = O.playText;
        }
      }

      /* the no-API path: what this did before there was a scrubber */
      function fall() {
        if (mine !== stage) return;
        /* If a player was constructed but never came up, it still owns an iframe
           in here; drop it before writing the plain one over the top. */
        if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
        player = null;
        var vidbox = stage.querySelector('.fan-stage-vid');
        if (vidbox) vidbox.innerHTML = '<div id="' + slot + '"></div>';
        var host = stage.querySelector('#' + slot);
        if (!host) return;
        host.outerHTML =
          '<iframe title="' + esc(title) + '" allow="autoplay; encrypted-media"'
          + ' referrerpolicy="origin-when-cross-origin" loading="lazy" allowfullscreen'
          + ' src="https://www.youtube-nocookie.com/embed/' + esc(vid)
          + '?autoplay=1&rel=0&modestbranding=1&playsinline=1"></iframe>';
        stage.classList.remove('is-waiting');
      }

      withApi(function (ok) {
        if (mine !== stage) return;          // stopped while the script was loading
        if (!ok || !window.YT || !window.YT.Player) return fall();

        /* onReady is the fast path and NOT the only one. It is documented to
           fire once the player is usable, and there are real conditions where it
           does not arrive at all while the player is nonetheless working: a
           blocked autoplay, a throttled background tab. That left the panel
           sitting on its spinner forever with a track playing underneath it,
           which is the worst of both.

           So readiness is also POLLED. Whichever notices first calls arm(), and
           arm() only ever runs once. Four seconds is the giving-up point, and
           giving up means falling back to the plain iframe rather than leaving
           a spinner: a scrubber is worth a short wait and not a long one. */
        var armed = false;
        function arm() {
          if (armed || mine !== stage) return;
          if (!player || !player.getDuration || !(player.getDuration() > 0)) return;
          armed = true;
          if (probe) { clearInterval(probe); probe = null; }
          stage.classList.remove('is-waiting');
          stage.insertAdjacentHTML('beforeend', transport(slot));
          wire(stage);
        }

        /* ── why playVideo() is called by hand ──
           `autoplay: 1` below is a playerVar and the browser does not reliably
           honour it. The API builds its own iframe a beat or two after the click
           that asked for it, and by then the gesture no longer reaches the new
           document; what you get instead is the embed sitting on its poster
           frame with YouTube's play button in the middle, which is the exact
           thing the button was pressed to skip past. Asking the player itself is
           what actually starts it.

           Asked more than once, because the first call can land while the player
           is still cueing and is simply dropped. States -1 (unstarted) and 5
           (cued) both mean loaded and not playing, so those are the two worth
           another push; anything else is either playing, buffering, paused by
           hand or ended, and none of those should be overridden. Four pushes at
           400ms and then it stops, so a visitor who deliberately pauses within
           the first second is not fought by the page. */
        var nudges = 0;
        function start() {
          if (mine !== stage || !player || !player.playVideo) return;
          try { player.playVideo(); } catch (e) {}
          if (++nudges > 4) return;
          setTimeout(function () {
            if (mine !== stage || !player || !player.getPlayerState) return;
            var st;
            try { st = player.getPlayerState(); } catch (e) { return; }
            if (st === -1 || st === 5) start();
          }, 400);
        }

        var probe = null, waited = 0;
        try {
          player = new window.YT.Player(slot, {
            videoId: vid,
            host: 'https://www.youtube-nocookie.com',
            playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
            events: {
              /* start() before arm(): playback is the point, and it must not wait
                 on a duration the transport needs but the audio does not. */
              onReady: function () { start(); arm(); },
              onStateChange: arm,
              /* 101 and 150: embedding disabled by the owner, which no
                 fallback can get around. 2/5/100 are a bad id, a player
                 problem or a removed video, where the plain iframe is still
                 worth a try. */
              onError: function (e) {
                if (mine !== stage) return;
                var c = e && e.data;
                if (c === 101 || c === 150) refuse(); else fall();
              },
            },
          });
        } catch (err) { return fall(); }

        probe = setInterval(function () {
          if (mine !== stage) { clearInterval(probe); probe = null; return; }
          waited += 250;
          /* onReady is not guaranteed (see arm), so the poll asks for playback
             too, once the player has methods to ask with. `nudges` keeps this
             from turning into a request every quarter second. */
          if (!nudges) start();
          arm();
          if (!armed && waited >= 4000) {
            clearInterval(probe); probe = null;
            fall();
          }
        }, 250);
      });
    }

    /* ── wiring one transport to the live player ── */
    function wire(host) {
      var scrub = host.querySelector('.fan-scrub');
      var fill = host.querySelector('.fan-scrub-fill');
      var knob = host.querySelector('.fan-scrub-knob');
      var now = host.querySelector('.fan-tr-t b');
      var end = host.querySelector('.fan-tr-t i');
      var pp = host.querySelector('.fan-tr-pp');
      var dragging = false;

      function dur() {
        var d = player && player.getDuration ? player.getDuration() : 0;
        return isFinite(d) && d > 0 ? d : 0;
      }
      function at() {
        var t = player && player.getCurrentTime ? player.getCurrentTime() : 0;
        return isFinite(t) && t > 0 ? t : 0;
      }
      function paint(t, d) {
        var pct = d ? Math.max(0, Math.min(100, (t / d) * 100)) : 0;
        fill.style.width = pct + '%';
        knob.style.left = pct + '%';
        now.textContent = clock(t);
        end.textContent = clock(d);
        scrub.setAttribute('aria-valuenow', Math.round(pct));
        scrub.setAttribute('aria-valuetext', clock(t) + ' of ' + clock(d));
      }
      function go(t) {
        var d = dur();
        t = Math.max(0, d ? Math.min(d, t) : t);
        if (player && player.seekTo) player.seekTo(t, true);
        paint(t, d);
      }

      /* 200 ms is under the eye's threshold for a bar this width and is 5 calls a
         second into an iframe, which is nothing. Stops with the player. */
      if (ticker) clearInterval(ticker);
      ticker = setInterval(function () {
        if (!player || dragging) return;
        paint(at(), dur());
        if (pp && player.getPlayerState) {
          var playing = player.getPlayerState() === 1;
          pp.classList.toggle('is-paused', !playing);
          pp.setAttribute('aria-label', playing ? 'Pause' : 'Play');
        }
      }, 200);
      paint(0, dur());

      host.addEventListener('click', function (e) {
        var b = e.target.closest('[data-seek]');
        if (b) { e.preventDefault(); go(at() + parseFloat(b.getAttribute('data-seek'))); return; }
        if (e.target.closest('[data-pp]')) {
          e.preventDefault();
          if (!player) return;
          if (player.getPlayerState() === 1) player.pauseVideo(); else player.playVideo();
        }
      });

      /* Scrub. Pointer events so mouse, pen and touch are one path, and capture
         so the drag survives leaving the bar, which is where a scrub usually
         ends up. */
      function frac(e) {
        var r = scrub.getBoundingClientRect();
        return r.width ? Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) : 0;
      }
      scrub.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        dragging = true;
        scrub.classList.add('is-scrubbing');
        try { scrub.setPointerCapture(e.pointerId); } catch (x) {}
        paint(frac(e) * dur(), dur());
      });
      scrub.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        paint(frac(e) * dur(), dur());
      });
      function drop(e) {
        if (!dragging) return;
        dragging = false;
        scrub.classList.remove('is-scrubbing');
        go(frac(e) * dur());
      }
      scrub.addEventListener('pointerup', drop);
      scrub.addEventListener('pointercancel', function () {
        dragging = false;
        scrub.classList.remove('is-scrubbing');
      });

      /* A slider has to work from the keyboard or it is a picture of a slider. */
      scrub.addEventListener('keydown', function (e) {
        var k = e.key, d = dur();
        if (k === 'ArrowRight' || k === 'ArrowUp') { go(at() + 5); }
        else if (k === 'ArrowLeft' || k === 'ArrowDown') { go(at() - 5); }
        else if (k === 'PageUp') { go(at() + 30); }
        else if (k === 'PageDown') { go(at() - 30); }
        else if (k === 'Home') { go(0); }
        else if (k === 'End') { go(d); }
        else return;
        e.preventDefault();
      });
    }

    rootEl.addEventListener('click', function (e) {
      if (e.target.closest('.fan-stage-x')) { e.preventDefault(); silence(); }
    });

    /* Escape stops it, the same key that closes everything else on this site. */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && heard) silence();
    });
  }

  window.AEyt = { attach: attach, arm: armApi };
}());
