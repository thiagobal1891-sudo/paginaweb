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
  //  CARRUSEL TRATAMIENTOS
  // ══════════════════════════════════════════════
  const trackTrat = document.querySelector(".carta-tratamientos");
  const nextBtn   = document.querySelector(".arrow.right");
  const prevBtn   = document.querySelector(".arrow.left");

  if (trackTrat && nextBtn && prevBtn) {
    const scrollAmount = () => trackTrat.clientWidth;
    nextBtn.addEventListener("click", () => {
      trackTrat.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
    prevBtn.addEventListener("click", () => {
      trackTrat.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
  }

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