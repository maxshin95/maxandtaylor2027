/* Save-the-date address form — client-side validation; the browser POSTs to FormSubmit,
   which redirects to /thanks/ (the _next hidden field). */
(function () {
  'use strict';
  var form = document.getElementById('addrForm');
  if (!form) return;
  var btn = document.getElementById('submitBtn');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      var first = form.querySelector(':invalid');
      if (first) first.focus();
      msg.textContent = 'Please fill in your name and full address.';
      msg.classList.add('bad');
      return;
    }
    msg.textContent = '';
    btn.textContent = 'Sending…';
    setTimeout(function () { btn.disabled = true; }, 0);
  });
})();
