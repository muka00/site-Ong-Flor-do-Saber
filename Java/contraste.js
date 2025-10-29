const botaoModo = document.getElementById('modo');

function atualizarIcone() {
  if (document.body.classList.contains('modo-escuro')) {
    botaoModo.innerHTML = '🌚';
    botaoModo.setAttribute('aria-label', 'Ativar modo claro');
  } else {
    botaoModo.innerHTML = '🌞';
    botaoModo.setAttribute('aria-label', 'Ativar modo escuro');
  }
}

botaoModo.addEventListener('click', () => {
  document.body.classList.toggle('modo-escuro');
  atualizarIcone();
  localStorage.setItem(
    'tema',
    document.body.classList.contains('modo-escuro') ? 'escuro' : 'claro'
  );
});

// Mantém o tema escolhido pelo usuário ao recarregar
if (localStorage.getItem('tema') === 'escuro') {
  document.body.classList.add('modo-escuro');
}

// Ícone inicial (executa depois de tudo estar pronto)
atualizarIcone();
