// DARKMODE - arquivo centralizando as funções de darkmode (index.html e pedido.html)


document.addEventListener('DOMContentLoaded', (event) => {
  const check = document.getElementById('check');
  const graosBackground = document.querySelector('.graos'); // Background de grãos
  const logoHeader = document.querySelector('.header-logo'); // Logo do cabeçalho

  function updateImages(isDarkMode) {
    // Atualiza o background dos grãos
    if (graosBackground) {
      if (isDarkMode) {
        graosBackground.style.backgroundImage = 'url("./archive/dark-images/graos_dark.png")';
      } else {
        graosBackground.style.backgroundImage = 'url("./archive/logos/graoscafe.png")';
      }
    }

    // Atualiza o logo
    if (logoHeader) {
      // Se o logo é uma tag <img>
      if (logoHeader.tagName === 'IMG') {
        if (isDarkMode) {
          logoHeader.setAttribute('src', './archive/dark-images/logo_alt2.png');
        } else {
          logoHeader.setAttribute('src', './archive/logos/logo_alt1.png');
        }
      }
    }
  }

  // Verifica se há uma preferência de tema salva no localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('darkmode');
    check.checked = true;
    updateImages(true);
  } else {
    updateImages(false);
  }

  check.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('darkmode');

    // Salva a preferência do tema no localStorage
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    updateImages(isDarkMode);
  });
});