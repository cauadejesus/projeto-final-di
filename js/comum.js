/* ===== FUNÇÕES COMPARTILHADAS (sessão, log de terminal, aleatório) ===== */
window.OA = {
  usuario: () => sessionStorage.getItem('oa_user'),
  exigirLogin() { if (!this.usuario()) location.replace('login.html'); },
  sair() { sessionStorage.removeItem('oa_user'); location.href = 'login.html'; },
  rnd: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  log(el, texto, classe) {
    const p = document.createElement('p');
    p.textContent = '> ' + texto;
    if (classe) p.className = classe;
    el.appendChild(p);
    el.scrollTop = el.scrollHeight;
  }
};

/* ===== TEMA CLARO/ESCURO: lembra a escolha entre as telas ===== */
(() => {
  const t = document.getElementById('tema');
  if (!t) return;
  try { t.checked = localStorage.getItem('oa_tema') === 'claro'; } catch {}
  t.addEventListener('change', () => {
    try { localStorage.setItem('oa_tema', t.checked ? 'claro' : 'escuro'); } catch {}
  });
})();
