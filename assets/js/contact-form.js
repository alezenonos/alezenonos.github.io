(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';
    status.textContent = '';
    status.removeAttribute('role');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (r) {
        if (r.ok) {
          status.textContent = 'Message sent \u2014 I\u2019ll be in touch soon.';
          form.reset();
        } else {
          return r.json().then(function (d) {
            throw new Error(d.error || 'Submission failed.');
          });
        }
      })
      .catch(function (err) {
        status.setAttribute('role', 'alert');
        status.textContent = 'Something went wrong: ' + err.message + ' Please email alezenonos@gmail.com directly.';
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = 'Send message';
      });
  });
})();
