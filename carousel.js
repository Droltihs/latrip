let currentSlideIndex = 0;
let slides = [];
let dots = [];
let autoSlideInterval;

function buildCarousel() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');

    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';

    carouselPhotos.forEach((photo, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'carousel-slide' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = `photos/${photo}`;
        img.alt = `Travel memory ${index + 1}`;

        slideDiv.appendChild(img);
        carousel.appendChild(slideDiv);

        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => currentSlide(index);
        dotsContainer.appendChild(dot);
    });

    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
}

function updateBackground() {
    const background = document.getElementById('carousel-background');
    const currentPhoto = carouselPhotos[currentSlideIndex];
    background.style.backgroundImage = `url('photos/${currentPhoto}')`;
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');

    updateBackground();
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
}

function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

buildCarousel();
showSlide(currentSlideIndex);
startAutoSlide();

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});
