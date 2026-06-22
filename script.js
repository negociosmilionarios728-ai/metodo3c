const header = document.querySelector(".topbar");

function updateHeaderShadow() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderShadow();
window.addEventListener("scroll", updateHeaderShadow, { passive: true });

const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dots button"));
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentSlide = 0;
let touchStartX = 0;

function showSlide(index) {
  if (!track || slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

prevButton?.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton?.addEventListener("click", () => showSlide(currentSlide + 1));

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

carousel?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true }
);

carousel?.addEventListener(
  "touchend",
  (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 45) return;
    showSlide(currentSlide + (distance < 0 ? 1 : -1));
  },
  { passive: true }
);
