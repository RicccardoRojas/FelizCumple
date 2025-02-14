// script.js
const backgrounds = [
    'img/IMG_1377.jpg',
    'img/IMG_1802.JPG',
    'img/IMG_3153.JPG',
    'img/IMG_3795.JPG'
];

const modalImages = [
    'img/IMG_1377.jpg',
    'img/IMG_1802.JPG',
    'img/IMG_3153.JPG',
    'img/IMG_3795.JPG'
];

let currentBackgroundIndex = 0;

// Precargar imágenes de fondo y del modal
function preloadImages() {
    backgrounds.forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    modalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

// Cambiar el fondo
function changeBackground() {
    const backgroundElements = document.querySelectorAll('.background');
    const nextBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;

    // Ocultar el fondo actual
    backgroundElements[currentBackgroundIndex].classList.remove('active');

    // Mostrar el siguiente fondo
    backgroundElements[nextBackgroundIndex].classList.add('active');

    currentBackgroundIndex = nextBackgroundIndex;
}

// Crear capas de fondo
function createBackgroundLayers() {
    const body = document.body;
    backgrounds.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('background');
        div.style.backgroundImage = `url('${src}')`;
        if (index === 0) div.classList.add('active'); // Mostrar la primera imagen
        body.insertBefore(div, body.firstChild);
    });
}

// Abrir modal
function openModal(imageSrc, text) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalText = document.getElementById('modal-text');

    // Precargar la imagen del modal
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        modalImage.src = imageSrc;
        modalText.textContent = text;
        modal.classList.add('active');
    };
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Inicializar
preloadImages();
createBackgroundLayers();
setInterval(changeBackground, 5000); // Cambiar cada 5 segundos

// Confeti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

const confettiPieces = [];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 2;
        this.angle += 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createConfetti() {
    if (confettiPieces.length < 200) {
        confettiPieces.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((piece, index) => {
        piece.update();
        piece.draw();
        if (piece.y > canvas.height) {
            confettiPieces.splice(index, 1);
        }
    });
    requestAnimationFrame(animateConfetti);
}

setInterval(createConfetti, 100);
animateConfetti();

// Ajustar el tamaño del canvas al tamaño de la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;