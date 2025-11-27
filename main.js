// Funcionalidade principal - Carregamento JSON e Validação de Formulário
class PortfolioApp {
  constructor() {
    this.skills = [];
    this.projects = [];
    this.init();
  }

  async init() {
    console.log("🚀 Iniciando PortfolioApp...");
    await this.loadSkills();
    await this.loadProjects();
    this.setupFormValidation();
    this.animateStats();
  }

  // Carregar habilidades do JSON
  async loadSkills() {
    try {
      console.log("📁 Tentando carregar skills...");

      // Tenta diferentes caminhos
      let response = await this.tryFetchPaths([
        "./data/projects.json",
        "/data/projects.json",
        "data/projects.json",
        "../data/projects.json",
      ]);

      if (!response) {
        // Fallback: usa dados hardcoded
        console.log("🔄 Usando fallback para skills...");
        this.useFallbackData();
        return;
      }

      const data = await response.json();
      console.log("✅ JSON carregado:", data);

      this.skills = data.skills;
      console.log("📊 Skills encontradas:", this.skills);

      this.renderSkills();
    } catch (error) {
      console.error("❌ Erro ao carregar habilidades:", error);
      this.useFallbackData();
    }
  }

  // Tenta diferentes caminhos para o arquivo
  async tryFetchPaths(paths) {
    for (let path of paths) {
      try {
        console.log(`🔍 Tentando caminho: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          console.log(`✅ Caminho funcionou: ${path}`);
          return response;
        }
      } catch (error) {
        console.log(`❌ Caminho falhou: ${path}`);
      }
    }
    return null;
  }

  // Dados de fallback caso o JSON não carregue
  useFallbackData() {
    console.log("🔄 Carregando dados de fallback...");

    this.skills = [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Gestão de Projetos Ágeis", level: 85 },
      { name: "Liderança Técnica", level: 80 },
      { name: "Comunicação com Stakeholders", level: 90 },
      { name: "Scrum/Kanban", level: 85 },
      { name: "Resolução de Problemas", level: 90 },
    ];

    this.projects = [
      {
        title: "Vizinhança App",
        description:
          "Protótipo de aplicativo mobile para comunidade local, desenvolvido no Figma. Interface moderna e intuitiva para conectar vizinhos.",
        tags: ["Figma", "UI/UX Design", "Prototipagem", "Mobile App"],
        demo: "https://www.figma.com/proto/Qw3nPGgJb4mMftUVVBFZOc/Vizinhan%C3%A7a-app?node-id=1-2&p=f&t=conCHkDRCooZIQ2j-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
        type: "design",
      },
    ];

    this.renderSkills();
    this.renderProjects();
    this.showMessage("Dados carregados com sucesso! ✅", "success");
  }

  renderSkills() {
    const container = document.getElementById("skills-container");
    console.log("🎯 Container de skills:", container);

    if (!container) {
      console.error("❌ Elemento skills-container não encontrado!");
      return;
    }

    if (!this.skills || this.skills.length === 0) {
      console.error("❌ Nenhuma skill para renderizar!");
      container.innerHTML = "<p>Nenhuma habilidade encontrada.</p>";
      return;
    }

    console.log("🎨 Renderizando skills...");
    container.innerHTML = this.skills
      .map(
        (skill) => `
                <div class="skill-card">
                    <h3>${skill.name}</h3>
                    <div class="skill-level">
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%"></div>
                        </div>
                        <span>${skill.level}%</span>
                    </div>
                </div>
            `
      )
      .join("");

    console.log("✅ Skills renderizadas com sucesso!");
  }

  // Carregar projetos do JSON
  async loadProjects() {
    try {
      console.log("📁 Tentando carregar projetos...");

      let response = await this.tryFetchPaths([
        "./data/projects.json",
        "/data/projects.json",
        "data/projects.json",
        "../data/projects.json",
      ]);

      if (!response) {
        // Já foi carregado no fallback
        return;
      }

      const data = await response.json();
      this.projects = data.projects;
      console.log("📊 Projetos encontrados:", this.projects);

      this.renderProjects();
    } catch (error) {
      console.error("❌ Erro ao carregar projetos:", error);
      // Fallback já foi aplicado
    }
  }

  renderProjects() {
    const container = document.getElementById("projects-container");
    console.log("🎯 Container de projetos:", container);

    if (!container) {
      console.error("❌ Elemento projects-container não encontrado!");
      return;
    }

    if (!this.projects || this.projects.length === 0) {
      console.error("❌ Nenhum projeto para renderizar!");
      container.innerHTML = "<p>Nenhum projeto encontrado.</p>";
      return;
    }

    container.innerHTML = this.projects
      .map(
        (project) => `
        <div class="project-card" data-type="${project.type || "development"}">
          <div class="project-icon">
            <img src="assets/images/Perfil 3.jpg" alt="Logo ${
              project.title
            }" class="project-logo">
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}
            </div>
            <div class="project-links">
              <a href="${
                project.demo
              }" target="_blank" rel="noopener noreferrer" class="demo-link">
                ${
                  project.type === "design" ? "🎨 Ver Protótipo" : "🌐 Ver Demo"
                }
              </a>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    console.log("✅ Projetos renderizados com sucesso!");
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc2626;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 10000;
            max-width: 90%;
            text-align: center;
        `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  showMessage(text, type) {
    const messageEl = document.createElement("div");
    messageEl.className = `message ${type}`;
    messageEl.textContent = text;
    messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: white;
            background: ${type === "success" ? "#10b981" : "#dc2626"};
            z-index: 10000;
        `;

    document.body.appendChild(messageEl);
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }

  // ... resto das funções (form validation, animateStats, etc.)
  setupFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.handleFormSubmit(form);
      }
    });

    ["name", "email", "message"].forEach((field) => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener("blur", () => this.validateField(field));
      }
    });
  }

  validateForm() {
    let isValid = true;
    ["name", "email", "message"].forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    let isValid = true;
    let message = "";

    switch (fieldName) {
      case "name":
        if (field.value.trim().length < 2) {
          isValid = false;
          message = "Nome deve ter pelo menos 2 caracteres";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          message = "Email inválido";
        }
        break;
      case "message":
        if (field.value.trim().length < 10) {
          isValid = false;
          message = "Mensagem deve ter pelo menos 10 caracteres";
        }
        break;
    }

    field.classList.toggle("error", !isValid);
    errorElement.textContent = message;
    return isValid;
  }

  async handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      console.log("Dados do formulário:", data);
      this.showMessage("Mensagem enviada com sucesso!", "success");
      form.reset();
    } catch (error) {
      this.showMessage("Erro ao enviar mensagem. Tente novamente.", "error");
    }
  }

  animateStats() {
    const stats = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    stats.forEach((stat) => observer.observe(stat));
  }

  animateValue(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM Carregado - Iniciando aplicação...");
  new PortfolioApp();
});
