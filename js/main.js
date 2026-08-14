/* Taylor & Max — maxandtaylor2027.com */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ---- countdown (against midnight ET on the wedding day) ---- */
  var target = new Date('2027-05-29T00:00:00-04:00');
  var el = document.getElementById('countdown');
  function renderCountdown() {
    var now = new Date();
    var days = Math.ceil((target - now) / 86400000);
    if (days > 1) {
      el.innerHTML = days + '<small>days to go</small>';
    } else if (days === 1) {
      el.innerHTML = 'Tomorrow!<small>see you there</small>';
    } else if (days === 0) {
      el.innerHTML = 'Today!<small>see you there</small>';
    } else {
      el.innerHTML = 'Married!<small>May 29, 2027</small>';
    }
  }
  if (el) { renderCountdown(); setInterval(renderCountdown, 3600000); }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-photo');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (n) { io.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add('in'); });
  }

  /* ---- lightbox ---- */
  var box = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.ph'));
  var current = 0;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    var img = buttons[current].querySelector('img');
    lbImg.src = img.getAttribute('data-full') || img.currentSrc || img.src;
    lbImg.alt = img.alt;
  }
  if (box && typeof box.showModal === 'function' && lbImg && buttons.length) {
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { show(i); box.showModal(); });
    });
    document.getElementById('lbClose').addEventListener('click', function () { box.close(); });
    document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('close', function () { lbImg.removeAttribute('src'); });
    document.addEventListener('keydown', function (e) {
      if (!box.open) return;
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
