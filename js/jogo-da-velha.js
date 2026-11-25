/* ===== JOGO 3: JOGO DA VELHA (jogador [X] x IA [O]) ===== */
window.Jogos = window.Jogos || {};
Jogos.velha = (() => {
  const g = document.getElementById('grade-velha'), lg = document.getElementById('lg-velha');
  const LINHAS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const cel = [];
  let t, fim;

  for (let k = 0; k < 9; k++) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'cel';
    b.setAttribute('aria-label', 'Linha ' + (Math.floor(k / 3) + 1) + ', coluna ' + (k % 3 + 1));
    b.addEventListener('click', () => jogar(k));
    g.appendChild(b); cel.push(b);
  }

  const pos = k => 'LINHA ' + (Math.floor(k / 3) + 1) + ', COLUNA ' + (k % 3 + 1);

  function vencedor() {
    for (const [a, b, c] of LINHAS) if (t[a] && t[a] === t[b] && t[a] === t[c]) return t[a];
    return t.every(Boolean) ? 'E' : null;
  }

  // Procura uma jogada que complete (ou bloqueie) uma linha de 2 marcas iguais.
  function achar(m) {
    for (const l of LINHAS) {
      const v = l.map(k => t[k]);
      if (v.filter(x => x === m).length === 2 && v.includes(null)) return l[v.indexOf(null)];
    }
    return -1;
  }

  function marcar(k, m) { t[k] = m; cel[k].textContent = '[' + m + ']'; cel[k].disabled = true; }

  function ia() {
    let k = achar('O');                                   // 1) vencer
    if (k < 0) k = achar('X');                            // 2) bloquear
    if (k < 0 && !t[4]) k = 4;                            // 3) centro
    if (k < 0) { const c = [0, 2, 6, 8].filter(x => !t[x]); if (c.length) k = c[OA.rnd(0, c.length - 1)]; } // 4) canto
    if (k < 0) { const l = t.map((v, x) => v ? -1 : x).filter(x => x >= 0); k = l[OA.rnd(0, l.length - 1)]; } // 5) qualquer
    marcar(k, 'O');
    OA.log(lg, 'IA [O] JOGOU: ' + pos(k));
  }

  function checar() {
    const r = vencedor();
    if (!r) return false;
    fim = true; cel.forEach(c => c.disabled = true);
    if (r === 'X') OA.log(lg, 'VITORIA! VOCE VENCEU A IA.', 'ok');
    else if (r === 'O') OA.log(lg, 'DERROTA! A IA VENCEU.', 'err');
    else OA.log(lg, 'EMPATE! NINGUEM VENCEU.', 'ok');
    return true;
  }

  function jogar(k) {
    if (fim || t[k]) return;
    marcar(k, 'X'); OA.log(lg, 'VOCE [X] JOGOU: ' + pos(k));
    if (checar()) return;
    ia(); checar();
  }

  function iniciar() {
    t = Array(9).fill(null); fim = false;
    cel.forEach(c => { c.textContent = ''; c.disabled = false; });
    lg.innerHTML = '';
    OA.log(lg, 'VOCE E [X]. A IA E [O]. FACA SUA JOGADA.');
    cel[4].focus();
  }

  return { iniciar };
})();
