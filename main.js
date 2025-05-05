
// Deixa o carrossel em loop (automático)
let indice = 0;
const banner = document.querySelectorAll('.carBanner');
const carousel = document.getElementById('carousel');
let intervalo;

function start() {
  intervalo = setInterval(() => {
    banner[indice].style.display = 'none';
    indice++;
    if (indice === banner.length) {
      indice = 0;
    }
    banner[indice].style.display = 'block';
  }, 4000);
}

function stop() {
  clearInterval(intervalo);
}

carousel.addEventListener('mouseover', stop);
carousel.addEventListener('mouseout', start);

start();


// Habilita os botões < e > do carrossel
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

prevBtn.addEventListener('click', () => {
  banner[indice].style.display = 'none';
  indice--;
  if (indice < 0) {
    indice = banner.length - 1;
  }
  banner[indice].style.display = 'block';
});

nextBtn.addEventListener('click', () => {
  banner[indice].style.display = 'none';
  indice++;
  if (indice === banner.length) {
    indice = 0;
  }
  banner[indice].style.display = 'block';
});
