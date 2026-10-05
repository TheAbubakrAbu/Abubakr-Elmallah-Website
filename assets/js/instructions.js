/* instructions.js: /instructions/, the LEGO instruction booklet.

   The steps are the ordinary list of links in instructions.html, each
   carrying its brick, colour and parts in data- attributes; this file is the
   booklet around them:

     the brick    one drawn brick per step, in that step's colour, built from
                  its data-brick shape. SVG written here, so a step only has
                  to name a shape and a colour
     the parts    the parts list printed under each step, from data-parts
     the count    the piece total, added up from every step's data-pcs rather
                  than written down, so it cannot drift from the list
     the ticks    a checkbox per step, remembered in localStorage: a booklet
                  you can actually work through

   Everything it draws is SVG; nothing here loads a file, and no logo or
   wordmark is reproduced. */
(function instructions() {
  'use strict';

  var root = document.getElementById('lg');
  if (!root) return;
  function $(id) { return document.getElementById(id); }

  /* smooth scrolling only after load, so back/forward restores the position
     instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  /* ───────────── the bricks ─────────────
     One drawing per shape, in studs. Each returns the brick's body and its
     studs; the colour is passed in, and the outline is always the ink so a
     pale brick still reads on white paper. */

  function studs(n, y, w) {
    var out = '', gap = w / n, i;
    for (i = 0; i < n; i++) {
      var cx = gap * i + gap / 2;
      out += '<rect x="' + (cx - 3.4) + '" y="' + y + '" width="6.8" height="4.6" rx="1.8"'
           + ' fill="currentColor" stroke="#16181c" stroke-width="1.4"/>';
    }
    return out;
  }

  var SHAPES = {
    /* a plain brick, n studs wide: the body, then the studs on top */
    brick: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 2, w)
        + '<rect x="0" y="6.4" width="' + w + '" height="16" rx="1.6"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>'
        /* the near face, a shade darker, which is what makes it read as 3D */
        + '<rect x="0" y="16" width="' + w + '" height="6.4" fill="#16181c" opacity=".16"/>' };
    },
    /* a plate: the same footprint, a third of the height */
    plate: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 7.6, w)
        + '<rect x="0" y="12" width="' + w + '" height="7.4" rx="1.4"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>' };
    },
    /* a tile: a plate with no studs at all, which is the point of a tile */
    tile: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          '<rect x="0" y="11" width="' + w + '" height="8.4" rx="1.4"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>'
        + '<rect x="2.4" y="13.2" width="' + (w - 4.8) + '" height="1.4" fill="#16181c" opacity=".2"/>' };
    },
    /* an arch: the one shape that is obviously a shape and not a box */
    arch: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 2, w)
        + '<path d="M0 22.4V8a1.6 1.6 0 0 1 1.6-1.6h' + (w - 3.2)
        + 'a1.6 1.6 0 0 1 1.6 1.6v14.4h-6V16a' + (w / 2 - 5) + ' ' + 7
        + ' 0 0 0-' + (w - 12) + ' 0v6.4z"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>' };
    },
  };

  /* what each data-brick name draws: a shape and a width in studs */
  var BRICKS = {
    '1x2':  ['brick', 2], '1x4': ['brick', 4],
    '2x2':  ['brick', 2], '2x3': ['brick', 3], '2x4': ['brick', 4],
    'plate': ['plate', 4], 'tile': ['tile', 3], 'arch': ['arch', 4],
  };

  function draw(name, colour) {
    var spec = BRICKS[name] || BRICKS['2x2'];
    var made = SHAPES[spec[0]](spec[1]);
    return '<svg class="lg-brick" viewBox="0 0 ' + made.w + ' ' + made.h + '"'
      + ' aria-hidden="true" style="color:' + colour + '">' + made.body + '</svg>';
  }

  /* ───────────── build the booklet ───────────── */

  var steps = Array.prototype.slice.call(document.querySelectorAll('.lg-step'));
  if (!steps.length) return;

  var KEY = 'ae-lego-built';
  var built = {};
  try { built = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { built = {}; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(built)); } catch (e) { /* private mode */ }
  }

  var total = 0;

  steps.forEach(function (step) {
    var brick = step.getAttribute('data-brick');
    var colour = step.getAttribute('data-c') || '#f5d222';
    var parts = step.getAttribute('data-parts');
    var pcs = parseInt(step.getAttribute('data-pcs'), 10);
    if (!isNaN(pcs)) total += pcs;

    /* the brick goes between the number and the text */
    var n = step.querySelector('.lg-step-n');
    if (n && brick) n.insertAdjacentHTML('afterend', draw(brick, colour));

    /* the parts list under the step's own title */
    var t = step.querySelector('.lg-step-t');
    if (t && parts) {
      var p = document.createElement('span');
      p.className = 'lg-step-p';
      p.textContent = parts;
      t.appendChild(p);
    }

    /* the tick. It is a real button rather than a checkbox inside the link,
       because a control inside an <a> is not reachable by the keyboard in the
       order anybody expects: the step stays a link, and the tick sits beside
       it as its own control with its own label. */
    var href = step.getAttribute('href') || '';
    var tick = document.createElement('button');
    tick.type = 'button';
    tick.className = 'lg-tick';
    tick.setAttribute('aria-pressed', built[href] ? 'true' : 'false');
    tick.setAttribute('aria-label', 'Mark this step built');
    tick.textContent = built[href] ? '✓' : '';
    if (built[href]) step.classList.add('is-built');

    tick.addEventListener('click', function () {
      var on = !built[href];
      if (on) built[href] = 1; else delete built[href];
      tick.setAttribute('aria-pressed', on ? 'true' : 'false');
      tick.textContent = on ? '✓' : '';
      step.classList.toggle('is-built', on);
      save();
    });
    step.parentNode.insertBefore(tick, step.nextSibling);
    /* the tick and its step share a row */
    step.parentNode.style.display = 'flex';
    step.parentNode.style.alignItems = 'center';
    step.parentNode.style.gap = '0.5rem';
    step.style.flex = '1';
  });

  /* the counts, added up rather than written down */
  var pcTxt = total.toLocaleString() + ' pcs';
  if ($('lgCount')) $('lgCount').textContent = pcTxt;
  if ($('lgFootPc')) $('lgFootPc').textContent = total.toLocaleString();
  if ($('lgSteps')) $('lgSteps').textContent = steps.length;

  /* "open bag 1" just goes to the first step, which is what it means */
  var start = $('lgStart');
  if (start) start.addEventListener('click', function () {
    var first = document.querySelector('.lg-step');
    if (!first) return;
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    first.focus({ preventScroll: true });
  });
})();
