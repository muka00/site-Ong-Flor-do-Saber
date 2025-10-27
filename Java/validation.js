class FormValidator {
    constructor(formId, rules) {
        this.form = document.getElementById(formId);
        this.rules = rules;
        this.errors = {};
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        // Configurar validações
        this.setupValidationRules();
        
        // Validar no submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validação em tempo real
        this.setupRealTimeValidation();
    }
    
    setupValidationRules() {
        this.rules.forEach(rule => {
            const field = this.form.querySelector(`[name="${rule.field}"]`);
            if (field) {
                field.setAttribute('data-validation', rule.validations.join(' '));
            }
        });
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('[data-validation]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input.name));
            input.addEventListener('input', () => this.clearFieldError(input.name));
        });
    }
    
    validateField(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const value = field.value.trim();
        const rules = field.getAttribute('data-validation').split(' ');
        
        this.clearFieldError(fieldName);
        
        for (const rule of rules) {
            const [ruleName, ruleParam] = rule.split(':');
            
            if (!this[`validate_${ruleName}`](value, ruleParam)) {
                this.errors[fieldName] = this.getErrorMessage(ruleName, ruleParam);
                this.showFieldError(fieldName);
                return false;
            }
        }
        
        this.showFieldSuccess(fieldName);
        return true;
    }
    
    validate_required(value) {
        return value !== '';
    }
    
    validate_email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
    
    validate_minlength(value, length) {
        return value.length >= parseInt(length);
    }
    
    validate_cpf(value) {
        const cpf = value.replace(/\D/g, '');
        if (cpf.length !== 11) return false;
        
        // Validação básica de CPF
        return /^\d{11}$/.test(cpf);
    }
    
    validate_phone(value) {
        const phone = value.replace(/\D/g, '');
        return phone.length >= 10 && phone.length <= 11;
    }
    
    validate_cep(value) {
        const cep = value.replace(/\D/g, '');
        return cep.length === 8;
    }
    
    getErrorMessage(rule, param) {
        const messages = {
            required: 'Este campo é obrigatório',
            email: 'Digite um email válido',
            minlength: `Mínimo de ${param} caracteres`,
            cpf: 'CPF inválido',
            phone: 'Telefone inválido',
            cep: 'CEP inválido'
        };
        
        return messages[rule] || 'Campo inválido';
    }
    
    showFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorElement = this.getErrorElement(fieldName);
        
        errorElement.textContent = this.errors[fieldName];
        errorElement.style.display = 'block';
        field.classList.add('error');
        field.classList.remove('success');
    }
    
    showFieldSuccess(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorElement = this.getErrorElement(fieldName);
        
        errorElement.style.display = 'none';
        field.classList.remove('error');
        field.classList.add('success');
    }
    
    clearFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorElement = this.getErrorElement(fieldName);
        
        errorElement.style.display = 'none';
        field.classList.remove('error');
    }
    
    getErrorElement(fieldName) {
        let errorElement = document.getElementById(`error-${fieldName}`);
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = `error-${fieldName}`;
            errorElement.className = 'error-message';
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            field.parentNode.appendChild(errorElement);
        }
        
        return errorElement;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos os campos
        let isValid = true;
        const inputs = this.form.querySelectorAll('[data-validation]');
        
        inputs.forEach(input => {
            if (!this.validateField(input.name)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.submitForm();
        } else {
            this.showGlobalError('Por favor, corrija os erros no formulário.');
        }
    }
    
    showGlobalError(message) {
        // Remover erro global anterior
        const existingError = this.form.querySelector('.global-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar novo erro global
        const errorDiv = document.createElement('div');
        errorDiv.className = 'global-error alert alert-danger';
        errorDiv.textContent = message;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Salvar no localStorage
        this.saveToStorage(data);
        
        // Mostrar sucesso
        this.showSuccessMessage('Formulário enviado com sucesso!');
        
        // Limpar formulário
        this.form.reset();
        
        // Remover classes de sucesso
        const inputs = this.form.querySelectorAll('[data-validation]');
        inputs.forEach(input => {
            input.classList.remove('success');
        });
    }
    
    saveToStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    }
    
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;
        
        this.form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Configurações de validação para diferentes formulários
const validationRules = {
    cadastro: [
        { field: 'nome', validations: ['required', 'minlength:3'] },
        { field: 'email', validations: ['required', 'email'] },
        { field: 'cpf', validations: ['required', 'cpf'] },
        { field: 'telefone', validations: ['required', 'phone'] },
        { field: 'cep', validations: ['required', 'cep'] },
        { field: 'motivacao', validations: ['required', 'minlength:10'] }
    ],
    newsletter: [
        { field: 'email', validations: ['required', 'email'] }
    ],
    doacao: [
        { field: 'nome', validations: ['required'] },
        { field: 'email', validations: ['required', 'email'] },
        { field: 'valor', validations: ['required'] }
    ]
};

// Inicializar validadores
function initializeFormValidations() {
    // Cadastro
    if (document.getElementById('cadastroForm')) {
        new FormValidator('cadastroForm', validationRules.cadastro);
    }
    
    // Newsletter
    if (document.getElementById('newsletterForm')) {
        new FormValidator('newsletterForm', validationRules.newsletter);
    }
    
    // Doações
    if (document.getElementById('doacaoForm')) {
        new FormValidator('doacaoForm', validationRules.doacao);
    }
}