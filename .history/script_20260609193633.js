document.addEventListener("DOMContentLoaded", () => {

  // ══════════════════════════════════════════════
  //  MOTION — prefers-reduced-motion guard
  // ══════════════════════════════════════════════
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ══════════════════════════════════════════════
  //  APPEAR OBSERVER (todas las variantes)
  // ══════════════════════════════════════════════
  const revealTargets = document.querySelectorAll(
    ".appear, .appear-up, .appear-left, .appear-right, .appear-scale"
  );

  const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // Una vez revelado, desobservamos para no re-animar
        appearObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px"
  });

  revealTargets.forEach(el => appearObserver.observe(el));

  // ══════════════════════════════════════════════
  //  STAGGER INDIVIDUAL — Confianza grid
  // ══════════════════════════════════════════════
  document.querySelectorAll(".confianza-item").forEach((item, i) => {
    item.setAttribute("data-delay", i + 1);
    item.classList.add("appear-scale");
    appearObserver.observe(item);
  });

  // ══════════════════════════════════════════════
  //  SECTION TITLE LINE REVEAL
  // ══════════════════════════════════════════════
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".section-title").forEach(el => titleObserver.observe(el));

  // ══════════════════════════════════════════════
  //  PARALLAX LIGERO EN EL HERO (solo desktop)
  // ══════════════════════════════════════════════
  if (!prefersReduced && window.innerWidth >= 1024) {
    const heroBg = document.querySelector(".hero-bg");
    const heroContent = document.querySelector(".hero-content");
    const heroStats   = document.querySelector(".hero-stats");

    if (heroBg) {
      let ticking = false;
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const y = window.scrollY;
            // Fondo: se desplaza más lento (efecto profundidad)
            heroBg.style.transform = `scale(1.03) translateY(${y * 0.18}px)`;
            // Contenido: sube levemente más rápido que el scroll
            if (heroContent) heroContent.style.transform = `translateY(${y * -0.06}px)`;
            if (heroStats)   heroStats.style.transform   = `translateY(${y * -0.04}px)`;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // ══════════════════════════════════════════════
  //  TILT MAGNÉTICO — imagen Sobre mí (desktop)
  // ══════════════════════════════════════════════
  if (!prefersReduced && window.innerWidth >= 768) {
    document.querySelectorAll(".sobre-img").forEach(wrapper => {
      const img = wrapper.querySelector("img");
      if (!img) return;

      wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * 6;   // max ±6deg
        const ry = ((e.clientX - cx) / rect.width)  * -6;
        img.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });

      wrapper.addEventListener("mouseleave", () => {
        img.style.transform = "";
      });
    });
  }

  // ══════════════════════════════════════════════
  //  COUNTER ANIMADO — Stats del hero
  // ══════════════════════════════════════════════
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim(); // ej. "+200", "7", "2 años"
      const num = parseInt(raw.replace(/\D/g, ""), 10);
      if (isNaN(num) || prefersReduced) return;

      const prefix = raw.match(/^[+]/)  ? "+"  : "";
      const suffix = raw.replace(/[^a-zA-Z\s]+/g, "").trim();
      let start = 0;
      const duration = 1200;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = `${prefix}${Math.floor(ease * num)}${suffix ? " " + suffix : ""}`;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = raw; // asegurar valor final exacto
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ══════════════════════════════════════════════
  //  OCULTAR FLOATS EN FOOTER
  // ══════════════════════════════════════════════
  const footer = document.querySelector("footer");
  const floats = document.querySelectorAll(".whatsapp-float, .instagram-float");

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      floats.forEach(btn =>
        btn.classList.toggle("hide-float", entry.isIntersecting)
      );
    });
  });

  if (footer) footerObserver.observe(footer);

  // ══════════════════════════════════════════════
  //  CARRUSEL TRATAMIENTOS — infinito por clonado
  // ══════════════════════════════════════════════
  (() => {
    const track = document.querySelector(".carta-tratamientos");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");
    if (!track || !nextBtn || !prevBtn) return;

    // Cuántas cartas avanzan por click según breakpoint
    const visibleCount = () => window.innerWidth >= 1024 ? 2 : 1;

    // ── Clonar todas las cartas al final y al inicio ──
    const originals = Array.from(track.querySelectorAll(".carta"));
    const total = originals.length;

    originals.forEach(card => track.appendChild(card.cloneNode(true)));
    originals.forEach(card => track.insertBefore(card.cloneNode(true), track.firstChild));

    // Helper: lista fresca de todas las cartas (incluye clones)
    const allCards = () => Array.from(track.querySelectorAll(".carta"));

    // Empezamos en el primer original (posición = total, tras los clones del inicio)
    let currentIndex = total;
    let isAnimating = false;

    // Teleport sin animación
    const jumpTo = (index) => {
      track.style.scrollBehavior = "auto";
      track.scrollLeft = allCards()[index].offsetLeft;
      track.getBoundingClientRect(); // fuerza reflow
      track.style.scrollBehavior = "smooth";
    };

    // Scroll animado hacia índice
    const scrollToIndex = (index) => {
      track.scrollTo({ left: allCards()[index].offsetLeft, behavior: "smooth" });
    };

    // Carta más cercana al borde izquierdo visible
    const getNearestIndex = () => {
      const cards = allCards();
      const sl = track.scrollLeft;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - sl);
        if (d < minDist) { minDist = d; closest = i; }
      });
      return closest;
    };

    // Posición inicial sin flash
    jumpTo(currentIndex);

    // ── Navegación por flechas ──
    const navigate = (dir) => {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex += dir * visibleCount();
      scrollToIndex(currentIndex);

      setTimeout(() => {
        // Entró en clones del final → teleportar al inicio real
        if (currentIndex >= total * 2) { currentIndex -= total; jumpTo(currentIndex); }
        // Entró en clones del inicio → teleportar al final real
        if (currentIndex < total)      { currentIndex += total; jumpTo(currentIndex); }
        isAnimating = false;
      }, 420);
    };

    nextBtn.addEventListener("click", () => navigate(1));
    prevBtn.addEventListener("click", () => navigate(-1));

    // ── Sincronizar si el usuario arrastra manualmente ──
    let dragTimer;
    track.addEventListener("scroll", () => {
      clearTimeout(dragTimer);
      dragTimer = setTimeout(() => {
        if (isAnimating) return;
        currentIndex = getNearestIndex();
        if (currentIndex >= total * 2) { currentIndex -= total; jumpTo(currentIndex); }
        if (currentIndex < total)      { currentIndex += total; jumpTo(currentIndex); }
      }, 150);
    }, { passive: true });
  })();

  // ══════════════════════════════════════════════
  //  EMAILJS
  // ══════════════════════════════════════════════
  (function () {
    emailjs.init("-SPDqU_q1CFNoGYAI");
  })();

  const form = document.getElementById("consulta-form");
  if (form) {
    const btn = form.querySelector("button");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      btn.innerText = "Enviando...";
      btn.style.opacity = "0.7";
      btn.style.pointerEvents = "none";

      emailjs.sendForm("service_979cmej", "template_7xu573o", this)
        .then(() => {
          const msg = document.getElementById("mensaje-confirmacion");
          msg.innerText = "Consulta enviada correctamente 💌";
          msg.style.color = "var(--primary)";
          msg.style.marginTop = "16px";
          msg.style.fontSize = "14px";
          form.reset();
          btn.innerText = "Enviar consulta";
          btn.style.opacity = "1";
          btn.style.pointerEvents = "auto";
        })
        .catch((error) => {
          const msg = document.getElementById("mensaje-confirmacion");
          msg.innerText = "Error al enviar. Intentá nuevamente.";
          msg.style.color = "var(--primary)";
          msg.style.marginTop = "16px";
          msg.style.fontSize = "14px";
          console.log(error);
          btn.innerText = "Enviar consulta";
          btn.style.opacity = "1";
          btn.style.pointerEvents = "auto";
        });
    });
  }

  // ══════════════════════════════════════════════
  //  CARRUSEL INFOCOSMET
  // ══════════════════════════════════════════════
  const track = document.querySelector(".carousel_infocosmet .carousel-track");
  if (track) {
    let slides = track.querySelectorAll(".slide");
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);
    slides = track.querySelectorAll(".slide");
    let slideIndex = 0;

    function moveCarousel() {
      slideIndex++;
      track.style.transition = "transform 1s cubic-bezier(0.22, 1, 0.36, 1)";
      track.style.transform = `translateX(-${slideIndex * 100}%)`;
      if (slideIndex === slides.length - 1) {
        setTimeout(() => {
          track.style.transition = "none";
          slideIndex = 0;
          track.style.transform = "translateX(0%)";
        }, 1000);
      }
    }
    setInterval(moveCarousel, 8000);
  }

  // ══════════════════════════════════════════════
  //  HEADER SCROLLED
  // ══════════════════════════════════════════════
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

});