/* ===== LÓGICA DO HUB: sessão, busca/filtro do catálogo e formulário de contato ===== */
OA.exigirLogin();
(() => {
  document.getElementById('usr').textContent = OA.usuario();
  document.getElementById('sair').addEventListener('click', () => OA.sair());

  // ----- Busca + abas de categoria -----
  const abas = [...document.querySelectorAll('[role=tab]')],
        itens = [...document.querySelectorAll('#lista > li')],
        q = document.getElementById('q'), vazio = document.getElementById('vazio');
  let cat = 'todos';
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function filtrar() {
    const termo = norm(q.value.trim());
    let n = 0;
    itens.forEach(li => {
      const ok = (cat === 'todos' || li.dataset.cat === cat) && norm(li.dataset.nome).includes(termo);
      li.hidden = !ok;
      if (ok) n++;
    });
    vazio.textContent = n ? '' : '[ERRO] Nenhum jogo encontrado.';
  }
  abas.forEach(a => a.addEventListener('click', () => {
    cat = a.dataset.cat;
    abas.forEach(x => x.setAttribute('aria-selected', String(x === a)));
    filtrar();
  }));
  q.addEventListener('input', filtrar);
  document.getElementById('f-busca').addEventListener('submit', e => { e.preventDefault(); filtrar(); });

  // ----- Contato (envio simulado; a validação nativa continua valendo) -----
  const fc = document.getElementById('f-contato');
  fc.addEventListener('submit', e => {
    e.preventDefault();
    fc.reset();
    document.getElementById('ok-contato').textContent = '[OK] Mensagem enviada (simulação). Obrigado pelo contato!';
  });
})();
