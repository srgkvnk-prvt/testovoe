/* home.js: behaviour for the homepage. In WordPress: wp_enqueue_script with defer. */
(function () {
	'use strict';
	var $ = function (s, c) { return (c || document).querySelector(s); };
	var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
	var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* footer year (in WP use date('Y')) */
	$('#year').textContent = new Date().getFullYear();

	/* email assembled by script, so spam bots cannot scrape it */
	$$('[data-mail]').forEach(function (a) {
		var m = a.dataset.mail + '@' + a.dataset.domain;
		a.href = 'mailto:' + m;
		a.textContent = m;
	});

	/* ---------- mobile drawer ---------- */
	var burger = $('#burger'), drawer = $('#drawer');
	function setDrawer(open) {
		burger.classList.toggle('burger--open', open);
		drawer.classList.toggle('drawer--open', open);
		burger.setAttribute('aria-expanded', open);
		burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		document.body.style.overflow = open ? 'hidden' : '';
	}
	burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('drawer--open')); });
	$$('.drawer__link').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });

	/* ---------- language ---------- */
	var lang = $('#lang'), langBtn = $('.lang__toggle', lang);
	langBtn.addEventListener('click', function (e) {
		e.stopPropagation();
		var o = lang.classList.toggle('lang--open');
		langBtn.setAttribute('aria-expanded', o);
	});
	document.addEventListener('click', function () { lang.classList.remove('lang--open'); langBtn.setAttribute('aria-expanded', false); });

	/* ---------- search with inline validation ---------- */
	var search = $('#search'), sInput = $('#searchInput'), sError = $('#searchError');
	function openSearch() { search.classList.add('search-overlay--open'); setTimeout(function () { sInput.focus(); }, 50); }
	function closeSearch() { search.classList.remove('search-overlay--open'); }
	$$('[data-open-search]').forEach(function (b) { b.addEventListener('click', openSearch); });
	$('#closeSearch').addEventListener('click', closeSearch);
	$('#searchForm').addEventListener('submit', function (e) {
		if (sInput.value.trim().length < 2) {
			e.preventDefault();
			sError.classList.add('search-overlay__error--show');
			sInput.focus();
		}
	});
	sInput.addEventListener('input', function () { sError.classList.remove('search-overlay__error--show'); });

	/* ---------- hero slider ---------- */
	var hero = $('#hero'), slides = $$('.slide', hero), tabs = $$('.hero__tab', hero), cur = 0, timer, DUR = 7000, paused = false;
	function go(i) {
		cur = (i + slides.length) % slides.length;
		slides.forEach(function (s, k) { s.classList.toggle('slide--active', k === cur); });
		tabs.forEach(function (t, k) {
			t.classList.toggle('hero__tab--active', k === cur);
			t.setAttribute('aria-selected', k === cur);
		});
		schedule();
	}
	function schedule() {
		clearTimeout(timer);
		if (!reduce && !paused) timer = setTimeout(function () { go(cur + 1); }, DUR);
	}
	tabs.forEach(function (t, k) { t.addEventListener('click', function () { go(k); }); });
	hero.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); });
	hero.addEventListener('mouseleave', function () { paused = false; schedule(); });
	schedule();

	/* ---------- scroll reveal, once, IntersectionObserver ---------- */
	var rev = new IntersectionObserver(function (es) {
		es.forEach(function (e) {
			if (!e.isIntersecting) return;
			e.target.classList.add('reveal--in');
			rev.unobserve(e.target);
		});
	}, { threshold: .15 });
	$$('.news-card, .product-card, .why, .job-card, .stats__item, .feature__content, .feature__media, .section__head').forEach(function (el, i) {
		el.classList.add('reveal');
		rev.observe(el);
	});

	/* ---------- counters ---------- */
	function runCounters() {
		$$('[data-count]').forEach(function (el) {
			var end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, t0 = null;
			function fmt(v) { return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
			if (reduce) { el.textContent = fmt(end); return; }
			(function step(t) {
				t0 = t0 || t;
				var p = Math.min((t - t0) / 1400, 1), v = end * (1 - Math.pow(1 - p, 3));
				el.textContent = fmt(v);
				if (p < 1) requestAnimationFrame(step);
			})(performance.now());
		});
	}
	var statsEl = $('#stats');
	var cio = new IntersectionObserver(function (es) {
		if (es[0].isIntersecting) { runCounters(); cio.disconnect(); }
	}, { threshold: .4 });
	cio.observe(statsEl);

	/* ---------- tagline: each word lights up as it crosses the trigger line ---------- */
	var tag = $('#tagline');
	var words = tag.textContent.trim().split(/\s+/);
	tag.textContent = '';
	var spans = words.map(function (w) {
		var s = document.createElement('span');
		s.className = 'tagline__word';
		s.textContent = w;
		tag.appendChild(s);
		tag.appendChild(document.createTextNode(' '));
		return s;
	});
	var wio = new IntersectionObserver(function (es) {
		es.forEach(function (e) {
			/* on when inside the viewport above the trigger line, or already scrolled past */
			e.target.classList.toggle('tagline__word--on', e.isIntersecting || e.boundingClientRect.top < 0);
		});
	}, { rootMargin: '0px 0px -35% 0px' });
	spans.forEach(function (s) { wio.observe(s); });

	/* ---------- chat (stub: connect an AI provider + Telegram handoff) ---------- */
	var chat = $('#chat'), log = $('#chatLog'), cInput = $('#chatInput'), cError = $('#chatError');
	$('#chatToggle').addEventListener('click', function () {
		var o = chat.classList.toggle('chat--open');
		this.setAttribute('aria-expanded', o);
		if (o) cInput.focus();
	});
	$('#chatClose').addEventListener('click', function () { chat.classList.remove('chat--open'); });
	function addMsg(text, who) {
		var d = document.createElement('div');
		d.className = 'chat__msg chat__msg--' + who;
		d.textContent = text;
		log.appendChild(d); log.scrollTop = log.scrollHeight;
		return d;
	}
	$('#chatForm').addEventListener('submit', function (e) {
		e.preventDefault();
		var v = cInput.value.trim();
		if (!v) { cError.classList.add('chat__error--show'); cInput.focus(); return; }
		cError.classList.remove('chat__error--show');
		addMsg(v, 'me'); cInput.value = '';
		var sk = document.createElement('div');                       /* skeleton while the reply loads */
		sk.className = 'chat__msg chat__msg--skeleton';
		sk.innerHTML = '<span class="chat__line"></span><span class="chat__line"></span>';
		log.appendChild(sk); log.scrollTop = log.scrollHeight;
		setTimeout(function () {
			sk.remove();
			addMsg('This is the layout preview. In production the AI assistant replies here, and you can pass the chat to a human in Telegram.', 'bot');
		}, 1100);
	});
	cInput.addEventListener('input', function () { cError.classList.remove('chat__error--show'); });

	/* ---------- cookie notice ---------- */
	var cookie = $('#cookie');
	try { if (localStorage.getItem('isg_cookie')) cookie.classList.add('cookie--hidden'); } catch (e) {}
	$$('[data-cookie]').forEach(function (b) {
		b.addEventListener('click', function () {
			cookie.classList.add('cookie--hidden');
			try { localStorage.setItem('isg_cookie', b.dataset.cookie); } catch (e) {}
		});
	});

	addEventListener('keydown', function (e) {
		if (e.key === 'Escape') { closeSearch(); chat.classList.remove('chat--open'); setDrawer(false); }
	});
})();
