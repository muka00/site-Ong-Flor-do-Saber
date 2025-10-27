document.addEventListener('DOMContentLoaded', () => {
  // ===== Menu Hamburguer =====
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // ===== Toast =====
  const toast = document.getElementById('toast');
  const newsletterForm = document.getElementById('newsletterForm');
  const postForm = document.getElementById('postForm');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Newsletter cadastrada com sucesso!');
      newsletterForm.reset();
    });
      // ====== Validação de email ======
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
      const valor = e.target.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(valor)) {
        alert('Email inválido! Digite um email correto.');
        e.target.focus();
      }
    });
  }
  }

  // Post
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Post enviado para aprovação!');
      postForm.reset();
    });
  }
});

