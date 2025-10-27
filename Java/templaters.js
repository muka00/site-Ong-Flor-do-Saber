class TemplateEngine {
    constructor() {
        this.templates = {};
        this.registerDefaultTemplates();
    }
    
    registerDefaultTemplates() {
        // Template para cards de projetos
        this.register('projectCard', `
            <div class="card">
                <img src="{{image}}" alt="{{title}}">
                <h3>{{title}}</h3>
                <p>{{description}}</p>
                <button class="btn-volunteer" data-project="{{id}}">Inscreva-se como voluntário</button>
            </div>
        `);
        
        // Template para posts do blog
        this.register('blogPost', `
            <article class="post">
                <section class="sobre">
                    <img src="{{image}}" alt="{{title}}">
                    <div class="texto">
                        <h3>{{title}}</h3>
                        <p><small>Publicado em {{date}}</small></p>
                        <p>{{content}}</p>
                    </div>
                </section>
            </article>
        `);
        
        // Template para voluntários
        this.register('volunteerCard', `
            <div class="vol-card">
                <h3>{{name}}</h3>
                <p>{{role}}</p>
            </div>
        `);
    }
    
    register(name, templateString) {
        this.templates[name] = templateString;
    }
    
    render(templateName, data) {
        const templateString = this.templates[templateName];
        if (!templateString) {
            console.error(`Template "${templateName}" não encontrado`);
            return '';
        }
        
        return templateString.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
            return data[key.trim()] || '';
        });
    }
    
    renderMultiple(templateName, dataArray) {
        return dataArray.map(data => this.render(templateName, data)).join('');
    }
}

// Instância global
const templateEngine = new TemplateEngine();