document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-doacoes');
  const emailInput = document.getElementById('email');
  const telefoneInput = document.getElementById('telefone');
  const valorInput = document.getElementById('valor');

  if (!form) return;

  // Formatação do telefone enquanto digita
  telefoneInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      valor = valor.replace(/^(\d*)/, '($1');
    }

    e.target.value = valor;
  });

  // Validação básica de email
  emailInput.addEventListener('blur', (e) => {
    const valor = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      alert('Email inválido! Digite um email correto.');
      e.target.focus();
    }
  });

  // Salvar dados no localStorage
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const doacao = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      valor: document.getElementById("valor").value,
      metodo: document.getElementById("metodo").value,
      mensagem: document.getElementById("mensagem").value
    };

    localStorage.setItem("doacao", JSON.stringify(doacao));
    alert("Doação registrada com sucesso! Obrigado por contribuir ❤️");
    form.reset();
  });
});
