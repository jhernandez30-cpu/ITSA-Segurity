// script.js

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 800);
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Contadores animados
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            el.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.innerText = target;
        }
    };
    updateCounter();
}

// Intersection Observer para contadores
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));
}

// Carrusel de testimonios automático
const track = document.querySelector('.testimonial-track');
if (track) {
    let index = 0;
    const cards = document.querySelectorAll('.testimonial-card');
    const total = cards.length;
    setInterval(() => {
        index = (index + 1) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
}

// Efecto tilt en tarjetas
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Formulario de contacto: ya no interceptamos el envío porque usamos Formspree
// El código anterior que prevenía el envío y mostraba alert ha sido eliminado.
