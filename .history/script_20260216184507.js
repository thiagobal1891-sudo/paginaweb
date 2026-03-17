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
  // CARRUSEL
  // =============================
  const carousel = document.querySelector(".carta-tratamientos");
  const cards = document.querySelectorAll(".carta");
  const btnLeft = document.querySelector(".arrow.left");
  const btnRight = document.querySelector(".arrow.right");

  if (!carousel || cards.length === 0 || !btnLeft || !btnRight) {
    console.log("Error: No se encontraron elementos del carrusel");
    return;
  }

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
function moveSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
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
  emailjs.init("1Zhdm30MzVJUn7EkG"); // ← pegá tu public key acá
})();
document.getElementById("consulta-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_979cmej", "template_7xu573o", this)
    .then(function() {
      document.getElementById("mensaje-confirmacion").innerText =
        "Consulta enviada correctamente 💌";
      document.getElementById("consulta-form").reset();
    }, function(error) {
      document.getElementById("mensaje-confirmacion").innerText =
        "Error al enviar. Intenta nuevamente.";
      console.log(error);
    });
});
emailjs.sendForm("service_979cmej", "template_7xu573o", this, {
  time: new Date().toLocaleString()
});



});




