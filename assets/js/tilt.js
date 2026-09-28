/* tilt.js: pointer-tracked 3D tilt + glare on cards and images */
(function tilt() {
  if (!fine || reduceMotion) return;

  const splitList = s => s.split(/,\s*(?![^()]*\))/);   // commas outside cubic-bezier(…)
  const fill = (list, n) => Array.from({ length: n }, (_, i) => list[i % list.length]);

  /* One scroll listener, one resize listener and one ResizeObserver for all
     the cards, rather than a set of each per card: /projects/ had about
     fifty scroll handlers, every one of them run on every scroll frame to
     do the same thing (drop that card's cached box, see rest() below). Each
     card registers its own drop here; the shared handlers run them all, and
     the observer looks up the card it reports. What happens is unchanged:
     any scroll or resize drops every card's box, a card changing size drops
     its own. */
  const drops = new Map();                     // element -> drop its cached box
  const dropAll = () => { drops.forEach(f => f()); };
  addEventListener('scroll', dropAll, { passive: true });
  addEventListener('resize', dropAll);
  const sizes = 'ResizeObserver' in window
    ? new ResizeObserver(entries => { for (const en of entries) { const f = drops.get(en.target); if (f) f(); } })
    : null;

  function bind(el, max, lift) {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.transformStyle = 'preserve-3d';

    const glare = document.createElement('span');
    glare.className = 'card-glare';
    el.appendChild(glare);

    /* While the pointer is on the element only the transform entry of its own
       transition list is made quick; the rest keep their timing. This used to
       write the `transition` shorthand, which wiped the whole list: a card's
       border and background snapped on hover-in and eased on hover-out, so
       its outline blinked off. Whatever inline lists were already there
       (magnetic.js writes some) come back on leave. */
    const cs = getComputedStyle(el);
    let props = cs.transitionProperty === 'none' ? [] : splitList(cs.transitionProperty);
    let durs = fill(splitList(cs.transitionDuration), props.length);
    let eases = fill(splitList(cs.transitionTimingFunction), props.length);
    const ti = props.indexOf('transform');
    if (ti === -1) { props.push('transform'); durs.push('.08s'); eases.push('linear'); }
    else { durs[ti] = '.08s'; eases[ti] = 'linear'; }
    const quick = [props.join(', '), durs.join(', '), eases.join(', ')];
    const saved = [el.style.transitionProperty, el.style.transitionDuration, el.style.transitionTimingFunction];
    const setTransition = v => {
      el.style.transitionProperty = v[0];
      el.style.transitionDuration = v[1];
      el.style.transitionTimingFunction = v[2];
    };

    /* The resting box, from layout rather than getBoundingClientRect(): the
       rect of a tilted, lifted card is not where the card sits, and reading it
       on every move was a layout read per event. Dropped on scroll/resize
       (the shared handlers above), and when the card opens or closes, since
       that changes its size under the pointer (the shared observer). */
    let r = null;
    const rest = () => {
      const p = el.offsetParent;
      if (!p) return el.getBoundingClientRect();
      const b = p.getBoundingClientRect();
      const left = b.left + p.clientLeft + el.offsetLeft, top = b.top + p.clientTop + el.offsetTop;
      return { left, top, right: left + el.offsetWidth, bottom: top + el.offsetHeight, width: el.offsetWidth, height: el.offsetHeight };
    };
    drops.set(el, () => { r = null; });
    if (sizes) sizes.observe(el);

    el.addEventListener('pointermove', e => {
      r = r || rest();
      const px = (e.clientX - r.left) / r.width;   // 0..1
      const py = (e.clientY - r.top) / r.height;   // 0..1
      /* The tilt and the lift fade to nothing over the outer 40px. At full
         strength the edge under a pointer resting near it pulled away (the
         lift raises it, and the tilt makes that side recede and shrink):
         the pointer fell off the card, the card dropped back under it, and it
         flickered, 27 hover flips along one bottom edge. A 16px band still
         left the corners shrinking ~5px, so it is 40. */
      const edge = Math.min(e.clientX - r.left, r.right - e.clientX, e.clientY - r.top, r.bottom - e.clientY);
      const k = Math.max(0, Math.min(1, edge / 40));
      const rx = (0.5 - py) * max * 2 * k;
      const ry = (px - 0.5) * max * 2 * k;
      setTransition(quick);
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` + (lift ? ` translateY(${(lift * k).toFixed(2)}px)` : '');
      glare.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      glare.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      glare.style.opacity = '1';
    });
    el.addEventListener('pointerleave', () => {
      setTransition(saved);       // back to the element's own timing, the CSS ease-out
      el.style.transform = '';
      glare.style.opacity = '0';
      r = null;
    });
  }

  // cards lift as they tilt (.crest = the Hogwarts / Westerosi / bending crests)
  document.querySelectorAll('.app-card, .proj-card, .crest').forEach(el => bind(el, 7, -6));
  // standalone images / media tilt a touch harder
  document.querySelectorAll('.pic-frame, .flyer, .wall, .year-card').forEach(el => bind(el, 9, 0));
  // the hero name uses the magnetic drift effect instead (see magnetic.js)
})();
