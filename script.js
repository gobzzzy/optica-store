// Caruselul de imagini
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function showSlide(index) {
    if (carousel) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
}

// Adăugăm evenimente de click doar dacă butoanele există
if (nextButton && prevButton) {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
}

// Auto-slide la fiecare 5 secunde
if (carousel) {
    setInterval(nextSlide, 5000);
}

// Efect sticky header la scroll
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gestionarea meniului hamburger
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

// Funcția pentru a deschide/închide meniul
function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
}

// Funcția pentru a închide meniul
function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('open');
}

// Eveniment pentru butonul hamburger
if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);
}

// Închidere meniu când se face click pe un link
if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Efecte subtile fade-in pentru secțiuni
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Aplicăm observația pentru toate elementele cu clasa fade-in
fadeInElements.forEach(el => observer.observe(el));
