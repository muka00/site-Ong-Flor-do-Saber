class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.mainContent = document.getElementById('main-content');
        
        this.init();
    }
    
    init() {
        // Configurar rotas
        this.addRoute('/', 'index.html');
        this.addRoute('/projetos', 'projetos.html');
        this.addRoute('/cadastro', 'cadastro.html');
        this.addRoute('/doacoes', 'doacoes.html');
        this.addRoute('/transparencia', 'transparencia.html');
        this.addRoute('/contato', 'contato.html');
        this.addRoute('/blog', 'blog.html');
        
        // Interceptar clicks em links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                this.navigate(path);
            }
        });
        
        // Navegação do browser
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });
        
        // Carregar rota inicial
        this.loadRoute(window.location.pathname);
    }
    
    addRoute(path, template) {
        this.routes[path] = template;
    }
    
    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute(path);
    }
    
    async loadRoute(path) {
        const route = this.routes[path] || this.routes['/'];
        
        try {
            // Mostrar loading
            this.mainContent.innerHTML = '<div class="loading">Carregando...</div>';
            
            // Simular carregamento de conteúdo
            setTimeout(() => {
                this.renderPage(route);
            }, 300);
            
        } catch (error) {
            console.error('Erro ao carregar rota:', error);
            this.mainContent.innerHTML = '<div class="error">Página não encontrada</div>';
        }
    }
    
    renderPage(route) {
        // Aqui você implementaria o carregamento real das páginas
        // Por enquanto, vou simular com conteúdo básico
        const content = this.getPageContent(route);
        this.mainContent.innerHTML = content;
        
        // Executar scripts específicos da página
        this.executePageScripts(route);
    }
    
    getPageContent(route) {
        // Simulação de conteúdo - na implementação real, você carregaria HTML real
        const pages = {
            'index.html': `
                <section class="sobre">
                    <h2>🌱 Sobre Nós</h2>
                    <p>A ONG Flor do Saber tem como propósito promover o desenvolvimento integral de crianças...</p>
                </section>
            `,
            'cadastro.html': `
                <h2>Faça Seu Cadastro</h2>
                <form id="cadastroForm">
                    <!-- Seu formulário de cadastro aqui -->
                </form>
            `
            // Adicione outras páginas...
        };
        
        return pages[route] || '<div>Página não encontrada</div>';
    }
    
    executePageScripts(route) {
        switch(route) {
            case 'cadastro.html':
                if (typeof initializeCadastro === 'function') {
                    initializeCadastro();
                }
                break;
            case 'blog.html':
                if (typeof initializeBlog === 'function') {
                    initializeBlog();
                }
                break;
            // Adicione outros casos...
        }
    }
}

// Inicializar router
const router = new Router();