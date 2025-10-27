// projetos.js

// ===============================
// Template Engine
// ===============================
class TemplateEngine {
  constructor() {
    this.templates = {};
  }

  register(name, templateString) {
    this.templates[name] = templateString;
  }

  render(templateName, data) {
    const templateString = this.templates[templateName];
    if (!templateString) return '';
    return templateString.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => data[key.trim()] || '');
  }

  renderMultiple(templateName, dataArray) {
    return dataArray.map(data => this.render(templateName, data)).join('');
  }
}

const templateEngine = new TemplateEngine();

// ===============================
// Templates
// ===============================
templateEngine.register('projectCard', `
  <div class="card">
    <img src="{{image}}" alt="{{title}}">
    <h3>{{title}}</h3>
    <p>{{description}}</p>
    <form action="cadastro.html">
      <button type="submit">Inscreva-se como voluntário</button>
    </form>
  </div>
`);

templateEngine.register('volunteerCard', `
  <div class="vol-card">
    <h3>{{name}}</h3>
    <p>{{role}}</p>
  </div>
`);

// ===============================
// Dados
// ===============================
const projects = [
  { title: "Reforço Escolar", description: "Aulas de reforço para crianças em vulnerabilidade.", image: "imagens/dever_de_casa.png" },
  { title: "Atividades Recreativas", description: "Oficinas de arte, música e recreação.", image: "imagens/crianças_brincando_no_parque.png" },
  { title: "Eventos Educativos", description: "Workshops e eventos educativos.", image: "imagens/teatro_de_fantoches.png" },
  { title: "Projeto Cozinhando com Amor", description: "Atividades de culinária para crianças.", image: "imagens/projeto_culinaria.png" },
  { title: "Quem Canta os Males Espanta", description: "Oficinas de música e recreação.", image: "imagens/projeto_musical.png" },
  { title: "Roda de Sentimentos", description: "Rodas de conversa e atividades afetivas.", image: "imagens/roda_de_sentimentos.png" },
  { title: "Reciclar Faz Parte do Nosso Dia a Dia", description: "Educação ambiental para crianças.", image: "imagens/atividade_reciclar.png" },
  { title: "Projeto Fome Zero", description: "Alimentação saudável para crianças.", image: "imagens/crianças_comendo.png" },
  { title: "Projeto Lazer", description: "Brincadeiras interativas fora das telas.", image: "imagens/atividade_socio_esportiva.png" },
];

const volunteers = [
  { name: "Ana Souza", role: "Reforço Escolar" },
  { name: "Lucas Pereira", role: "Alimentação" },
  { name: "Mariana Costa", role: "Artes e Recreação" },
  { name: "João Lima", role: "Apoio Psicológico" },
  { name: "Carla Mendes", role: "Eventos" },
  { name: "Rafael Silva", role: "Administração" },
  { name: "Michael Douglas", role: "Gestor de Rh e seleção" },
  { name: "Natanael Santos", role: "Reforço Escolar" },
  { name: "Lucas Piorino", role: "Aula de Mágica" },
  { name: "João Vitor", role: "Financeiro" },
  { name: "Camila Coelho", role: "Apoio Mágico" },
  { name: "Clara Mendes", role: "Ajudante Geral" },
  { name: "Alexandre Pió", role: "Comunicação" },
  { name: "Joao Mendes", role: "Cozinheiro" },
  { name: "maisa cavalcante", role: "Recreação" },
];

// ===============================
// Renderização
// ===============================
function renderProjects() {
  const container = document.querySelector('.cards-container');
  if (container) container.innerHTML = templateEngine.renderMultiple('projectCard', projects);
}

function renderVolunteers() {
  const container = document.querySelector('.grid-12');
  if (container) container.innerHTML = templateEngine.renderMultiple('volunteerCard', volunteers);
}

// ===============================
// Validação de formulários simples
// ===============================
function setupFormValidation() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.border = '2px solid red';
        } else {
          input.style.border = '';
        }
      });

      if (!valid) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos corretamente!');
      }
    });
  });
}

// ===============================
// Inicialização
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderVolunteers();
  setupFormValidation();
});

