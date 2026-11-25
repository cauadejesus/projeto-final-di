/* ===== JOGO 4: BATALHA NAVAL (radar 6x6, 3 navios, 15 mísseis) ===== */
window.Jogos = window.Jogos || {};
Jogos.naval = (() => {
  const N = 6, MISSEIS = 15, TAMANHOS = [3, 2, 2];
  const g = document.getElementById('grade-naval'), lg = document.getElementById('lg-naval'),
        st = document.getElementById('st-naval');
  const cel = [];
  let mapa, navios, m, fim;

  g.style.gridTemplateColumns = 'repeat(' + N + ',auto)';
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'cel';
    b.setAttribute('aria-label', 'Linha ' + (r + 1) + ', coluna ' + (c + 1));
    b.addEventListener('click', () => atirar(r, c));
    g.appendChild(b); cel.push(b);
  }

  // Posiciona cada navio (horizontal ou vertical) sem sobreposição.
  function posicionar() {
    mapa = Array(N * N).fill(-1); navios = [];
    TAMANHOS.forEach((tam, id) => {
      let ok = false;
      while (!ok) {
        const h = Math.random() < 0.5;
        const r = OA.rnd(0, h ? N - 1 : N - tam), c = OA.rnd(0, h ? N - tam : N - 1);
        const ps = [];
        for (let k = 0; k < tam; k++) ps.push((r + (h ? 0 : k)) * N + c + (h ? k : 0));
        if (ps.every(p => mapa[p] < 0)) { ps.forEach(p => mapa[p] = id); navios.push({ vida: tam }); ok = true; }
      }
    });
  }

  function atualizar() {
    const rest = navios.filter(n => n.vida > 0).length;
    st.textContent = 'MISSEIS: ' + m + '/' + MISSEIS + ' | NAVIOS RESTANTES: ' + rest;
    return rest;
  }

  function atirar(r, c) {
    const k = r * N + c;
    if (fim || cel[k].disabled) return;
    m--; cel[k].disabled = true;
    const id = mapa[k], coord = '(' + (r + 1) + ', ' + (c + 1) + ')';
    if (id >= 0) {
      navios[id].vida--;
      cel[k].textContent = 'X'; cel[k].classList.add('x');
      OA.log(lg, coord + ' -> ACERTOU!' + (navios[id].vida ? '' : ' NAVIO AFUNDADO!'), 'ok');
    } else {
      cel[k].textContent = '•';
      OA.log(lg, coord + ' -> AGUA');
    }
    const rest = atualizar();
    if (!rest) { fim = true; OA.log(lg, 'VITORIA! TODOS OS NAVIOS AFUNDADOS COM ' + (MISSEIS - m) + ' MISSEIS.', 'ok'); }
    else if (m <= 0) {
      fim = true; OA.log(lg, 'FIM DOS MISSEIS. VOCE PERDEU.', 'err');
      cel.forEach((x, p) => { if (mapa[p] >= 0 && !x.textContent) x.textContent = '#'; });  // revela navios restantes
    }
    if (fim) cel.forEach(x => x.disabled = true);
  }

  function iniciar() {
    posicionar(); m = MISSEIS; fim = false;
    cel.forEach(x => { x.textContent = ''; x.disabled = false; x.classList.remove('x'); });
    lg.innerHTML = '';
    OA.log(lg, 'RADAR ATIVO. 3 NAVIOS OCULTOS. COORDENADAS: (LINHA, COLUNA).');
    atualizar();
  }

  return { iniciar };
})();
