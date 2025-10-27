class App {
    constructor() {
        this.storage = new StorageManager();
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
            this.setupEventListeners();
            this.loadInitialData();
        });
    }
    
    initializeComponents() {
        // Inicializar menu
        this.initializeMenu();
        
        // Inicializar validações
        initializeFormValidations();
        
        // Inicializar máscaras
        this.initializeMasks();
        
        // Inicializar componentes específicos
        this.initializeSpecificComponents();
    }
    
    initializeMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menu = document.getElementById('menu');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    }
    
    initializeMasks() {
        // Máscara de CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', this.maskCPF);
        }
        
        // Máscara de telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', this.maskPhone);
        }
        
        // Máscara de CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', this.maskCEP);
        }
    }
    
    maskCPF(e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    }
    
    maskPhone(e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
        e.target.value = value;
    }
    
    maskCEP(e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = value;
    }
    
    initializeSpecificComponents() {
        // Buscar CEP
        const cepButton = document.querySelector('button[onclick="buscarCep()"]');
        if (cepButton) {
            cepButton.addEventListener('click', this.buscarCep);
        }
        
        // Campos "outros"
        this.initializeOtherFields();
    }
    
    initializeOtherFields() {
        // Áreas de interesse
        const outrosCheckInteresse = document.getElementById("outrosCheckInteresse");
        const outrosTextoInteresse = document.getElementById("outrosTextoInteresse");
        if (outrosCheckInteresse && outrosTextoInteresse) {
            outrosCheckInteresse.addEventListener("change", () => {
                outrosTextoInteresse.style.display = outrosCheckInteresse.checked ? "block" : "none";
                if(!outrosCheckInteresse.checked) outrosTextoInteresse.value = "";
            });
        }
        
        // Experiência
        const outrosCheckExp = document.getElementById("outrosCheckExp");
        const outrosTextoExp = document.getElementById("outrosTextoExp");
        if (outrosCheckExp && outrosTextoExp) {
            outrosCheckExp.addEventListener("change", () => {
                outrosTextoExp.style.display = outrosCheckExp.checked ? "block" : "none";
                if(!outrosCheckExp.checked) outrosTextoExp.value = "";
            });
        }
    }
    
    async buscarCep() {
        const cepInput = document.getElementById("cep");
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            this.showToast("⚠️ CEP inválido!");
            return;
        }
        
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                this.showToast("❌ CEP não encontrado!");
                return;
            }
            
            document.getElementById("rua").value = data.logradouro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
            
            const endereco = encodeURIComponent(`${data.logradouro}, ${data.localidade}, ${data.uf}`);
            const mapa = document.getElementById("mapa");
            if (mapa) {
                mapa.src = `https://www.google.com/maps?q=${endereco}&output=embed`;
            }
            
            this.showToast("📍 Endereço carregado com sucesso!");
        } catch (error) {
            this.showToast("❌ Erro ao buscar CEP.");
        }
    }
    
    setupEventListeners() {
        // Política de privacidade
        const privacyLink = document.querySelector("a[onclick='togglePrivacy()']");
        if (privacyLink) {
            privacyLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.togglePrivacy();
            });
        }
    }
    
    togglePrivacy() {
        const text = document.getElementById("privacyText");
        if (text) {
            text.style.display = text.style.display === "none" ? "block" : "none";
        }
    }
    
    loadInitialData() {
        // Carregar dados iniciais se necessário
        this.loadVolunteers();
        this.loadProjects();
    }
    
    loadVolunteers() {
        // Exemplo de carregamento dinâmico de voluntários
        const volunteersContainer = document.querySelector('.grid-12');
        if (volunteersContainer) {
            const volunteers = [
                { name: "Ana Souza", role: "Reforço Escolar" },
                { name: "Lucas Pereira", role: "Alimentação" },
                // ... outros voluntários
            ];
            
            const html = templateEngine.renderMultiple('volunteerCard', volunteers);
            volunteersContainer.innerHTML = html;
        }
    }
    
    loadProjects() {
        // Carregar projetos dinamicamente
        const projectsContainer = document.querySelector('.cards-container');
        if (projectsContainer) {
            const projects = [
                {
                    id: 1,
                    image: "imagens/dever_de_casa.png",
                    title: "Reforço Escolar",
                    description: "Oferecemos aulas de reforço escolar para crianças..."
                },
                // ... outros projetos
            ];
            
            const html = templateEngine.renderMultiple('projectCard', projects);
            projectsContainer.innerHTML = html;
        }
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
}

// Gerenciador de Armazenamento
class StorageManager {
    constructor() {
        this.initializeStorage();
    }
    
    initializeStorage() {
        if (!localStorage.getItem('volunteers')) {
            localStorage.setItem('volunteers', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('newsletterSubscribers')) {
            localStorage.setItem('newsletterSubscribers', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('donations')) {
            localStorage.setItem('donations', JSON.stringify([]));
        }
    }
    
    saveVolunteer(data) {
        const volunteers = JSON.parse(localStorage.getItem('volunteers'));
        volunteers.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('volunteers', JSON.stringify(volunteers));
    }
    
    getVolunteers() {
        return JSON.parse(localStorage.getItem('volunteers'));
    }
}

// Inicializar aplicação
const app = new App();