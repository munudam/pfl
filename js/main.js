// Carousel functionality
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
const totalSlides = slides.length;
let autoPlayInterval;
const AUTO_PLAY_DELAY = 4000; // 4 seconds

// Create indicators
function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
        });
        indicators.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

// Update indicator dots
function updateIndicators() {
    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Navigate to specific slide
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

// Previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
    }
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
    }
});

// Pause on mouse hover, resume on mouse leave
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

// Initialize
createIndicators();
startAutoPlay();

