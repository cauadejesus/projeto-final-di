/* ===== JOGO 1: SENHA MESTRE ===== */
window.Jogos = window.Jogos || {};
Jogos.senha = (() => {
  const f = document.getElementById('f-senha'), i = document.getElementById('i-senha'),
        st = document.getElementById('st-senha'), lg = document.getElementById('lg-senha');
  const MAX = 10;
  let senha, tent, fim;

  function iniciar() {
    const d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];            // embaralha os dígitos (Fisher-Yates)
    for (let k = 9; k > 0; k--) { const j = OA.rnd(0, k); [d[k], d[j]] = [d[j], d[k]]; }
    senha = d.slice(0, 4).join('');
    tent = 0; fim = false;
    lg.innerHTML = ''; i.value = ''; i.disabled = false;
    OA.log(lg, 'SENHA GERADA: 4 DIGITOS UNICOS. TENTATIVAS: ' + MAX + '.');
    st.textContent = 'TENTATIVAS: 0/' + MAX;
    i.focus();
  }

  f.addEventListener('submit', e => {
    e.preventDefault();
    if (fim) return;
    const p = i.value.trim();
    if (!/^\d{4}$/.test(p) || new Set(p).size < 4) { OA.log(lg, 'ERRO: DIGITE 4 DIGITOS DIFERENTES.', 'err'); return; }
    tent++;
    let exato = 0, outra = 0;
    for (let k = 0; k < 4; k++) {
      if (p[k] === senha[k]) exato++;
      else if (senha.includes(p[k])) outra++;
    }
    OA.log(lg, p + ' -> ' + exato + ' NA POSICAO EXATA | ' + outra + ' EM OUTRA POSICAO');
    st.textContent = 'TENTATIVAS: ' + tent + '/' + MAX;
    i.value = '';
    if (exato === 4) { OA.log(lg, 'ACESSO CONCEDIDO! SENHA ' + senha + ' EM ' + tent + ' TENTATIVA(S).', 'ok'); fim = true; }
    else if (tent >= MAX) { OA.log(lg, 'SISTEMA BLOQUEADO. A SENHA ERA ' + senha + '.', 'err'); fim = true; }
    if (fim) i.disabled = true;
  });

  return { iniciar };
})();
