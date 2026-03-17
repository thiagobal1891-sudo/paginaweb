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

const carousel = document.querySelector(".carta-tratamientos");
const cards = document.querySelectorAll(".carta");
const btnLeft = document.querySelector(".arrow.left");
const btnRight = document.querySelector(".arrow.right");

if (carousel && cards.length > 0 && btnLeft && btnRight) {

  let index = 0;
  const total = cards.length;

  function moveSlide() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  btnRight.addEventListener("click", () => {
    index = (index + 1) % total;
    moveSlide();
  });

  btnLeft.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    moveSlide();
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

  setInterval(moveCarousel, 4000);

}

});




