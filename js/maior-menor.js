/* ===== JOGO 2: MAIOR OU MENOR ===== */
window.Jogos = window.Jogos || {};
Jogos.maior = (() => {
  const f = document.getElementById('f-maior'), i = document.getElementById('i-maior'),
        st = document.getElementById('st-maior'), lg = document.getElementById('lg-maior');
  const MAX = 7;
  let segredo, tent, fim;

  function iniciar() {
    segredo = OA.rnd(1, 100); tent = 0; fim = false;
    lg.innerHTML = ''; i.value = ''; i.disabled = false;
    OA.log(lg, 'NUMERO OCULTO GERADO (1-100). TENTATIVAS: ' + MAX + '.');
    st.textContent = 'TENTATIVAS: 0/' + MAX;
    i.focus();
  }

  f.addEventListener('submit', e => {
    e.preventDefault();
    if (fim) return;
    const n = parseInt(i.value, 10);
    if (isNaN(n) || n < 1 || n > 100) { OA.log(lg, 'ERRO: DIGITE UM NUMERO ENTRE 1 E 100.', 'err'); return; }
    tent++;
    st.textContent = 'TENTATIVAS: ' + tent + '/' + MAX;
    i.value = '';
    if (n === segredo) { OA.log(lg, n + ' -> ACERTOU EM ' + tent + ' TENTATIVA(S)!', 'ok'); fim = true; }
    else {
      OA.log(lg, n + ' -> O NUMERO OCULTO E ' + (segredo > n ? 'MAIOR ▲' : 'MENOR ▼'));
      if (tent >= MAX) { OA.log(lg, 'FIM DAS TENTATIVAS. O NUMERO ERA ' + segredo + '.', 'err'); fim = true; }
    }
    if (fim) i.disabled = true;
  });

  return { iniciar };
})();
