// Header state, menu, parallax and reveal-on-scroll. Transform and opacity only; nothing moves under reduced motion.
(function () {
  var header = document.getElementById('header');
  var hero = document.querySelector('.hero');
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var layers = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var lastY = window.scrollY, ticking = false;

  // pages without a full-screen hero start with a solid header
  if (!hero) header.classList.add('solid', 'fixed-solid');

  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    if (hero) header.classList.toggle('solid', y > hero.offsetHeight - header.offsetHeight);
    // header slips away while scrolling down, returns on the way up
    header.classList.toggle('away', y > vh * 1.2 && y > lastY + 4 && menu.hidden);
    if (y < lastY - 4) header.classList.remove('away');
    lastY = y;
    if (calm) return;
    if (hero) {
      var hp = Math.min(1, Math.max(0, y / hero.offsetHeight));
      hero.style.setProperty('--hp', hp.toFixed(3));
    }
    layers.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
      el.style.setProperty('--py', (p * -90).toFixed(1) + 'px');
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // reveal on entry, once; siblings stagger by 70ms
  if (!calm && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    var counts = new Map();
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      var n = counts.get(el.parentNode) || 0;
      el.style.setProperty('--d', Math.min(n, 5) * 70 + 'ms');
      counts.set(el.parentNode, n + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  }

  // drawer: un-hide, then add .open on the next frame so it slides in; reverse on close
  var closeTimer;
  function setMenu(open) {
    clearTimeout(closeTimer);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('open'); }); });
    } else {
      menu.classList.remove('open');
      closeTimer = setTimeout(function () { menu.hidden = true; }, calm ? 0 : 600);
    }
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    (open ? closeBtn : openBtn).focus();
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  closeBtn.addEventListener('click', function () { setMenu(false); });
  menu.querySelector('[data-close]').addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  menu.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // hero slideshow: crossfade every 6s, with a pause button; still under reduced motion
  var slides = [].slice.call(document.querySelectorAll('#heroSlides .slide'));
  var pauseBtn = document.getElementById('heroPause');
  if (slides.length > 1 && !calm) {
    var cur = 0, timer;
    var next = function () {
      slides[cur].classList.remove('on');
      cur = (cur + 1) % slides.length;
      var s = slides[cur];
      s.style.animation = 'none'; s.offsetHeight; s.style.animation = '';
      s.classList.add('on');
    };
    var play = function () { timer = setInterval(next, 6000); };
    play();
    pauseBtn.addEventListener('click', function () {
      var paused = pauseBtn.getAttribute('aria-pressed') === 'true';
      if (paused) play(); else clearInterval(timer);
      pauseBtn.setAttribute('aria-pressed', String(!paused));
      pauseBtn.setAttribute('aria-label', paused ? 'עצירת החלפת התמונות' : 'המשך החלפת התמונות');
      hero.classList.toggle('paused', !paused);
    });
  } else if (pauseBtn) {
    pauseBtn.hidden = true;
  }

  // the form has no backend yet; it only validates
  var form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('formNote');
      var name = document.getElementById('f-name').value.trim();
      var phone = document.getElementById('f-phone').value.trim();
      note.textContent = (!name || !phone) ? 'נא למלא שם וטלפון.' : 'הטופס עוד לא מחובר. בקרוב.';
    });
  }

  frame();
})();
