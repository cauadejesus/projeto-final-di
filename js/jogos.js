/* ===== ROTEADOR: mostra o jogo indicado em jogos.html#<id> ===== */
(() => {
  OA.exigirLogin();
  const nomes = { senha: 'SENHA_MESTRE.EXE', maior: 'MAIOR_MENOR.EXE', velha: 'JOGO_DA_VELHA.EXE', naval: 'BATALHA_NAVAL.EXE' };
  let atual;

  function abrir() {
    const id = location.hash.slice(1);
    if (!nomes[id]) { location.replace('index.html'); return; }
    atual = id;
    document.querySelectorAll('.jogo').forEach(s => s.hidden = s.id !== 'g-' + id);
    document.getElementById('titulo').textContent = nomes[id];
    document.title = nomes[id] + ' — OLD_ARCADE';
    document.getElementById('crumb').textContent = id;
    Jogos[id].iniciar();
  }

  document.getElementById('usr').textContent = OA.usuario();
  document.getElementById('reiniciar').addEventListener('click', () => Jogos[atual].iniciar());
  addEventListener('hashchange', abrir);
  abrir();
})();
