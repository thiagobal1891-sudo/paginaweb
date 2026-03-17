document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // =============================
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.15,
  rootMargin:"0px 0px -80px 0px"
});

document.querySelectorAll(".appear").forEach(el=>{
  observer.observe(el);
});





  
// =============================
// CARRUSEL TRATAMIENTOS
// =============================

const trackTrat = document.querySelector(".carta-tratamientos");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

if(trackTrat){

const scrollAmount = () => {
return window.innerWidth >= 768
? trackTrat.clientWidth
: trackTrat.clientWidth;
};

nextBtn.addEventListener("click", () => {
trackTrat.scrollBy({
left: scrollAmount(),
behavior: "smooth"
});
});

prevBtn.addEventListener("click", () => {
trackTrat.scrollBy({
left: -scrollAmount(),
behavior: "smooth"
});
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
slides.forEach(s => s.classList.remove("active"));
slides[current].classList.add("active");
});





