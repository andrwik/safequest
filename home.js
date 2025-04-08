const track = document.querySelector(".carousel-track");
const images = document.querySelectorAll(".carousel-item");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
const totalImages = images.length;
const imageWidth = 1262; // Largura fixa

// Função para avançar o carrossel
// function nextSlide() {
//     index = (index + 1) % totalImages;
//     updateCarousel();
// }

// // Função para voltar o carrossel
// function prevSlide() {
//     index = (index - 1 + totalImages) % totalImages;
//     updateCarousel();
// }

// // Atualiza a posição do carrossel
// function updateCarousel() {
//     track.style.transform = `translateX(${-index * imageWidth}px)`;
// }

// // Configura a troca automática de slides
// let autoSlide = setInterval(nextSlide, 5000); // Troca a cada 5 segundos

// // Adiciona eventos aos botões
// nextBtn.addEventListener("click", () => {
//     nextSlide();
//     resetAutoSlide();
// });

// prevBtn.addEventListener("click", () => {
//     prevSlide();
//     resetAutoSlide();
// });

// Reinicia o temporizador ao interagir manualmente
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}
