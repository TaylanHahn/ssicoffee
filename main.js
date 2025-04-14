const carousel = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? carousel.children.length - 1 : currentIndex - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === carousel.children.length - 1) ? 0 : currentIndex + 1;
  updateCarousel();
});