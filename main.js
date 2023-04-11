const slideshowPopup = document.querySelector('.slideshow-popup');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const exitButton = document.querySelector('.exit');
let currentSlide = 0;

function showSlide(index) {
    slides[currentSlide].style.display = 'none';
    slides[index].style.display = 'block';
    currentSlide = index;
}

function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    showSlide(newIndex);
}

function exitSlideShow() {
    slideshowPopup.style.display = 'none';
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
exitButton.addEventListener('click', exitSlideShow);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    }
});

document.querySelector('.open-slideshow').addEventListener('click', function() {
    slideshowPopup.style.display = 'block';
    showSlide(0);
});
