/* ===== LÓGICA DE LOGIN (simulada) ===== */
(() => {
  if (OA.usuario()) { location.replace('index.html'); return; }
  const f = document.getElementById('f-login'), u = document.getElementById('u'),
        s = document.getElementById('s'), msg = document.getElementById('msg');
  let erros = 0;
  u.focus();
  f.addEventListener('submit', e => {
    e.preventDefault();
    const nome = u.value.trim();
    if (!nome || !s.value) { msg.textContent = '[ERRO] PREENCHA USUARIO E SENHA.'; return; }
    if (nome.toLowerCase() === 'admin' && s.value === 'arcade123') {
      sessionStorage.setItem('oa_user', nome.toUpperCase());
      msg.textContent = '[OK] ACESSO CONCEDIDO. CARREGANDO HUB...';
      setTimeout(() => location.href = 'index.html', 700);
    } else {
      erros++;
      msg.textContent = '[ERRO] ACESSO NEGADO. TENTATIVA ' + erros + '.';
      s.value = ''; s.focus();
    }
  });
})();
