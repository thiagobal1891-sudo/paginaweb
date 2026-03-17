document.addEventListener("DOMContentLoaded", () => {


// =============================
// ANIMACIONES SCROLL
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

if(trackTrat && nextBtn && prevBtn){

const scrollAmount = () => trackTrat.clientWidth;

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



// =============================
// EMAILJS FORMULARIO
// =============================

(function() {
  emailjs.init("-SPDqU_q1CFNoGYAI");
})();

const form = document.getElementById("consulta-form");

if (form) {

  const btn = form.querySelector("button");

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    btn.innerText = "Enviando...";

    emailjs.sendForm("service_979cmej","template_7xu573o",this)

    .then(()=>{
      document.getElementById("mensaje-confirmacion").innerText =
      "Consulta enviada correctamente 💌";
      form.reset();
      btn.innerText = "Enviar";
    })

    .catch((error)=>{
      document.getElementById("mensaje-confirmacion").innerText =
      "Error al enviar. Intenta nuevamente.";
      console.log(error);
      btn.innerText = "Enviar";
    });

  });

}

// =============================
// CARRUSEL INFOCOSMET
// =============================

const track = document.querySelector(".carousel_infocosmet .carousel-track");

if(track){

const slides = track.querySelectorAll(".slide");
let slideIndex = 0;

function moveCarousel(){

slideIndex = (slideIndex + 1) % slides.length;
track.style.transform = `translateX(-${slideIndex * 100}%)`;

}

setInterval(moveCarousel,6000);

}



window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if(window.scrollY > 80){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({
behavior:"smooth"
});

});

});
});