/* Inform Systems Group — behaviour only (no text content lives here).
   Modules: theme, header, drawer, hero slider, reveal + counters, squares, partners marquee. */
(function () {
  'use strict';
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Theme toggle */
  var themeBtn = $('[data-theme-toggle]');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.classList.add('is-theme-switching');
    root.dataset.theme = next;
    try { localStorage.setItem('isg-theme', next); } catch (e) {}
    setTimeout(function () { root.classList.remove('is-theme-switching'); }, 450);
  });

  /* Mobile drawer: clones the desktop nav, so menu text stays in HTML only */
  var burger = $('[data-burger]'), drawer = $('[data-drawer]'), nav = $('.nav');
  if (burger && drawer && nav) {
    var clone = nav.cloneNode(true);
    clone.classList.add('nav--drawer');
    drawer.appendChild(clone);
    var setDrawer = function (open) {
      drawer.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('is-open')); });
    drawer.addEventListener('click', function (e) {
      var link = e.target.closest('.nav__link');
      if (link) { e.preventDefault(); link.parentNode.classList.toggle('is-open'); return; }
      if (e.target.closest('a')) setDrawer(false);
    });
  }

  /* Hero slider */
  var hero = $('[data-hero]');
  if (hero) {
    var slides = $$('.hero__slide', hero), tabs = $$('.hero__tab', hero), cur = 0, timer;
    var go = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle('is-active', j === cur); });
      tabs.forEach(function (t, j) {
        t.classList.remove('is-active'); void t.offsetWidth;
        if (j === cur) t.classList.add('is-active');
      });
      var d = +slides[cur].dataset.duration || 7;
      tabs[cur].style.setProperty('--duration', d + 's');
      clearTimeout(timer);
      timer = setTimeout(function () { go(cur + 1); }, d * 1000);
    };
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { go(i); }); });
    $('[data-hero-prev]', hero).addEventListener('click', function () { go(cur - 1); });
    $('[data-hero-next]', hero).addEventListener('click', function () { go(cur + 1); });
    hero.addEventListener('mouseenter', function () { hero.classList.add('is-paused'); clearTimeout(timer); });
    hero.addEventListener('mouseleave', function () { hero.classList.remove('is-paused'); go(cur); });
    go(0);
  }

  /* Reveal on scroll */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(function (el) { revealIO.observe(el); });

  /* Counters: final text stays in HTML, JS only animates towards it */
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, final = el.textContent, to = +el.dataset.count, from = +(el.dataset.from || 0), t0 = performance.now();
      countIO.unobserve(el);
      (function tick(t) {
        var p = Math.min((t - t0) / 1600, 1), v = from + (to - from) * (1 - Math.pow(1 - p, 4));
        el.textContent = p < 1 ? Math.round(v).toLocaleString('ru') : final;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach(function (el) { countIO.observe(el); });

  /* Squares motif: squares fade in/out and hop to a new grid cell on each cycle */
  var buildSquares = function () {
    $$('[data-squares]').forEach(function (box) {
      $$('.squares__item', box).forEach(function (n) { n.remove(); });
      var cell = +(box.dataset.cell || 32), count = +box.dataset.squares, x0 = +(box.dataset.x || 0);
      var colors = (box.dataset.colors || '#0166ff,#39ac59').split(','), w = box.clientWidth, h = box.clientHeight;
      box.style.setProperty('--cell', cell + 'px');
      if (!w) return;
      var place = function (q) {
        q.style.left = Math.floor((x0 + Math.random() * (1 - x0)) * w / cell) * cell + 'px';
        q.style.top = Math.floor(Math.random() * h / cell) * cell + 'px';
        q.style.background = colors[Math.floor(Math.random() * colors.length)];
      };
      for (var i = 0; i < count; i++) {
        var q = document.createElement('i');
        q.className = 'squares__item';
        q.style.width = q.style.height = cell + 'px';
        q.style.animationDuration = 5 + Math.random() * 5 + 's';
        q.style.animationDelay = -Math.random() * 8 + 's';
        place(q);
        q.addEventListener('animationiteration', place.bind(null, q));
        box.appendChild(q);
      }
    });
  };
  buildSquares();
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildSquares, 250); });

  /* Partners marquee: duplicate the track for a seamless loop */
  $$('.partners__track').forEach(function (track) {
    $$('.partners__item', track).forEach(function (item) {
      var copy = item.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    });
  });
})();
