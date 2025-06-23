document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO CARROSSEL ---
    const carousel = document.getElementById('carousel');
    if (carousel) {
        let indice = 0;
        const banner = document.querySelectorAll('.carBanner');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let intervalo;

        // Esconde todos os banners exceto o primeiro para evitar um "salto" inicial
        banner.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });

        // Função centralizada para mostrar o banner correto
        function mostrarBanner(novoIndice) {
            if (banner[indice]) {
                banner[indice].style.display = 'none';
            }
            
            indice = novoIndice;

            if (indice >= banner.length) {
                indice = 0;
            }
            if (indice < 0) {
                indice = banner.length - 1;
            }

            if (banner[indice]) {
                banner[indice].style.display = 'block';
            }
        }

        // Função para parar o timer
        function stop() {
            clearInterval(intervalo);
        }

        // Função para iniciar e reiniciar o timer
        function start() {
            stop(); // Garante que não haja múltiplos intervalos rodando
            intervalo = setInterval(() => {
                mostrarBanner(indice + 1);
            }, 4000);
        }
        
        // Event listeners do carrossel
        carousel.addEventListener('mouseover', stop);
        carousel.addEventListener('mouseout', start);

        prevBtn.addEventListener('click', () => {
            mostrarBanner(indice - 1);
            start(); // Reinicia o timer após a interação manual
        });

        nextBtn.addEventListener('click', () => {
            mostrarBanner(indice + 1);
            start(); // Reinicia o timer após a interação manual
        });
        
        // Inicia o carrossel pela primeira vez
        start();
    }


    // --- LÓGICA PARA O CARDÁPIO RESPONSIVO ---
    const menuImageContainers = document.querySelectorAll('.cardapioImg');

    menuImageContainers.forEach(container => {
        const images = container.querySelectorAll('div');

        images.forEach(image => {
            image.addEventListener('click', function() {
                // Só executa a lógica de expandir em telas menores (<= 768px)
                if (window.innerWidth <= 768) {
                    
                    const isAlreadyExpanded = this.classList.contains('expanded-mobile');

                    // Fecha todas as imagens neste container
                    images.forEach(img => {
                        img.classList.remove('expanded-mobile');
                    });

                    // Se a imagem clicada não estava expandida, a expande.
                    if (!isAlreadyExpanded) {
                        this.classList.add('expanded-mobile');
                    }
                }
            });
        });
    });
});