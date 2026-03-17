document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // =============================
  const elements = document.querySelectorAll(".appear");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));





  

// =============================
// CARRUSEL TRATAMIENTOS
// =============================

// =============================
// CARRUSEL TRATAMIENTOS
// =============================
// =============================
// CARRUSEL TRATAMIENTOS
// =============================
const trackTrat = document.querySelector(".carta-tratamientos");
const cardsTrat = document.querySelectorAll(".carta");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

if (trackTrat && cardsTrat.length > 0) {

  let currentIndex = 0;

  function getVisibleCards() {
    return window.innerWidth >= 1024 ? 2 : 1;
  }

  function updateCarousel() {

    const visibleCards = getVisibleCards();
    const cardWidth = cardsTrat[0].getBoundingClientRect().width + 30;

    trackTrat.style.transform =
      `translateX(-${currentIndex * cardWidth * visibleCards}px)`;
  }

  nextBtn.addEventListener("click", () => {

    const visibleCards = getVisibleCards();
    const maxIndex = Math.ceil(cardsTrat.length / visibleCards) - 1;

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }

  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updateCarousel();
  });

}


window.addEventListener("load", function () {
  const target = document.getElementById("google-calendar-button");

  if (window.calendar && target) {
    calendar.schedulingButton.load({
      url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2eKdgVxdvbgrkUTVsqOwalHssheLS5kVcqAfOLuK-u68fTKpPQHXKQoJWOc8hcPsaKt-rAaWGU?gv=true",
      color: "#E16463",
      label: "Programar una cita",
      target: target,
    });
  }
});




(function() {
  emailjs.init("-SPDqU_q1CFNoGYAI");
})();

const form = document.getElementById("consulta-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_979cmej", "template_7xu573o", this)
      .then(() => {
        document.getElementById("mensaje-confirmacion").innerText =
          "Consulta enviada correctamente 💌";
        form.reset();
      })
      .catch((error) => {
        document.getElementById("mensaje-confirmacion").innerText =
          "Error al enviar. Intenta nuevamente.";
        console.log(error);
      });
  });
}



// =============================
// CARRUSEL INFOCOSMET
// =============================

const track = document.querySelector(".carousel_infocosmet .carousel-track");

if (track) {

  const slides = track.querySelectorAll(".slide");
  let slideIndex = 0;

  function moveCarousel() {
    slideIndex = (slideIndex + 1) % slides.length;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  setInterval(moveCarousel, 6000);

}

});




