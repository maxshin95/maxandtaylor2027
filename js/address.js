/* Save-the-date address form.
   1) Client-side validation.
   2) On submit, silently mirror the reply into Max's Google Sheet (via the linked Google Form).
   3) The browser then POSTs to FormSubmit (email) and lands on /thanks/ (the _next hidden field). */
(function () {
  'use strict';
  var form = document.getElementById('addrForm');
  if (!form) return;
  var btn = document.getElementById('submitBtn');
  var msg = document.getElementById('formMsg');

  var SHEET_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdB_yokZaGtvNSSt8renM2RxJVxOjaLuMZ1C23wBTCrSQeJJQ/formResponse';
  var MAP = {
    'Name(s)': 'entry.268167716',
    'Street': 'entry.1270695253',
    'City': 'entry.516389653',
    'State': 'entry.908971629',
    'ZIP': 'entry.397995863',
    'Email': 'entry.1120665982',
    'Planning to attend': 'entry.392846014'
  };

  function mirrorToSheet() {
    try {
      var fd = new FormData(form);
      var body = new URLSearchParams();
      Object.keys(MAP).forEach(function (k) { body.append(MAP[k], fd.get(k) || ''); });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(SHEET_FORM, new Blob([body.toString()], { type: 'application/x-www-form-urlencoded' }));
      } else if (window.fetch) {
        fetch(SHEET_FORM, { method: 'POST', mode: 'no-cors', keepalive: true, body: body });
      }
    } catch (e) { /* never block the real submit */ }
  }

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
    mirrorToSheet();
    btn.textContent = 'Sending…';
    setTimeout(function () { btn.disabled = true; }, 0);
  });
})();
