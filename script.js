// ===== Carousel =====
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;
let autoTimer = null;

function showSlide(index) {
  if (!carousel) return;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showSlide(currentIndex);
}

// Bind controls if buttons exist
if (nextButton) nextButton.addEventListener('click', nextSlide);
if (prevButton) prevButton.addEventListener('click', prevSlide);

// Auto slide (pause on hover / focus)
function startAuto(){ if (!autoTimer) autoTimer = setInterval(nextSlide, 5000); }
function stopAuto(){ clearInterval(autoTimer); autoTimer = null; }
if (carousel) {
  startAuto();
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);
}

// Touch swipe for mobile
let startX = 0;
if (carousel) {
  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prevSlide();
  });
}

// ===== Sticky header on scroll =====
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ===== Hamburger menu =====
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.main-nav ul');
const navLinks = document.querySelectorAll('.main-nav ul li a');

function toggleMenu(){
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
  const expanded = hamburger.classList.contains('open');
  hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}
function closeMenu(){
  navMenu.classList.remove('active');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
}

if (hamburger && navMenu) {
  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') toggleMenu(); });
}
if (navLinks) navLinks.forEach(link => link.addEventListener('click', closeMenu));

// ===== Fade-in observer =====
const fadeInElements = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
},{ threshold:0.12 });

fadeInElements.forEach(el => io.observe(el));
