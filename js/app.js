function go(name) {
  document.querySelectorAll('.view')
    .forEach(v => v.classList.remove('active'));

  document
    .getElementById('v-' + name)
    .classList.add('active');
}

function v(id) {
  return document.getElementById(id).value.trim();
}

function n(id) {
  return Math.abs(
    Number(document.getElementById(id).value)
  );
}

function msg(key, text, ok = true) {
  const el =
    document.getElementById('m-' + key);

  el.textContent = text;

  el.className =
    'msg ' + (ok ? 'ok' : 'err');

  setTimeout(() => {
    el.className = 'msg';
  }, 3000);
}

function getClientName(id) {
  const c = DB.clients.find(
    c => String(c.id) === String(id)
  );

  return c ? c.name : '⚠️';
}
