// Caruselul de imagini
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;
const totalItems = items.length;

function showSlide(index) {
    if (carousel) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    if (!totalItems) return;
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
}

function prevSlide() {
    if (!totalItems) return;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
}

// Adăugăm evenimente de click doar dacă butoanele există
if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
}

if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
}

// Auto-slide la fiecare 5 secunde
if (carousel && totalItems > 1) {
    setInterval(nextSlide, 5000);
}

// Efect sticky header la scroll
const header = document.querySelector('.main-header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Gestionarea meniului hamburger
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

// Funcția pentru a deschide/închide meniul
function toggleMenu() {
    if (!navMenu || !hamburger) return;
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Funcția pentru a închide meniul
function closeMenu() {
    if (!navMenu || !hamburger) return;
    navMenu.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}

// Eveniment pentru butonul hamburger
if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);
}

// Închidere meniu când se face click pe un link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Efecte subtile fade-in pentru secțiuni
const fadeInElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeInElements.length) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(el => observer.observe(el));
} else {
    fadeInElements.forEach(el => el.classList.add('visible'));
}
