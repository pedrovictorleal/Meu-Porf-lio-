// Smooth Scroll para navegação
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Botão explorar
    const exploreBtn = document.getElementById("explore-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        document.querySelector("#about").scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }
}

// Intersection Observer para animações
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.sectionObserver = null;
    this.init();
  }

  init() {
    // Observer para cards (já existente)
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");

            // Efeito sequencial para skills
            if (entry.target.classList.contains("skill-card")) {
              const delay =
                Array.from(document.querySelectorAll(".skill-card")).indexOf(
                  entry.target
                ) * 100;
              entry.target.style.animationDelay = `${delay}ms`;
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Observer para sections completas
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Observar elementos para animação
    document
      .querySelectorAll(".skill-card, .project-card, .gallery-item")
      .forEach((el) => {
        this.observer.observe(el);
      });

    // Observar sections
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("section-fade-in");
      this.sectionObserver.observe(section);
    });
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  new SmoothScroll();
  new ScrollAnimations();
});
