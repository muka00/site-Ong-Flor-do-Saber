// Menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

// Mostrar/esconder campos "outros" Áreas de Interesse
const outrosCheckInteresse = document.getElementById("outrosCheckInteresse");
const outrosTextoInteresse = document.getElementById("outrosTextoInteresse");
outrosCheckInteresse.addEventListener("change", () => {
  outrosTextoInteresse.style.display = outrosCheckInteresse.checked ? "block" : "none";
  if(!outrosCheckInteresse.checked) outrosTextoInteresse.value = "";
});

// Mostrar/esconder campos "outros" Experiência/Formação
const outrosCheckExp = document.getElementById("outrosCheckExp");
const outrosTextoExp = document.getElementById("outrosTextoExp");
outrosCheckExp.addEventListener("change", () => {
  outrosTextoExp.style.display = outrosCheckExp.checked ? "block" : "none";
  if(!outrosCheckExp.checked) outrosTextoExp.value = "";
});

// Política de privacidade
const privacyLink = document.querySelector("a[onclick='togglePrivacy()']");
privacyLink.addEventListener("click", (e) => {
  e.preventDefault();
  const text = document.getElementById("privacyText");
  text.style.display = text.style.display === "none" ? "block" : "none";
});

// Máscara CPF
const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = value;
});

// Máscara Telefone
const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", () => {
  let value = telefoneInput.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
  telefoneInput.value = value;
});

// Buscar CEP e atualizar mapa
window.buscarCep = function() {
  const cep = document.getElementById("cep").value.replace(/\D/g, '');
  if (cep.length !== 8) {
    showToast("⚠️ CEP inválido!");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        showToast("❌ CEP não encontrado!");
        return;
      }

      document.getElementById("rua").value = data.logradouro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;

      const endereco = encodeURIComponent(`${data.logradouro}, ${data.localidade}, ${data.uf}`);
      document.getElementById("mapa").src = `https://www.google.com/maps?q=${endereco}&output=embed`;

      showToast("📍 Endereço carregado com sucesso!");
    })
    .catch(() => showToast("❌ Erro ao buscar CEP."));
};

// Envio do formulário
const form = document.getElementById("cadastroForm");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  showToast("✅ Cadastro enviado com sucesso!");
  form.reset();
});
