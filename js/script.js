// script.js - Menú móvil, preloader, smooth scroll (Lenis), contadores, carrusel, formulario

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => preloader.style.display = 'none'
    });
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll con Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Contadores animados (stats)
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounting = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

// ScrollTrigger para activar contadores
ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 80%',
    onEnter: () => {
        counters.forEach(counter => {
            if (counter.innerText == '0') startCounting(counter);
        });
    }
});

// Carrusel de testimonios (auto-play simple)
const track = document.querySelector('.carousel-track');
if (track) {
    const testimonials = document.querySelectorAll('.testimonial');
    let index = 0;
    const total = testimonials.length;
    const width = testimonials[0].clientWidth;

    setInterval(() => {
        index = (index + 1) % total;
        gsap.to(track, {
            x: -index * width,
            duration: 0.8,
            ease: 'power2.inOut'
        });
    }, 4000);
}

// Formulario: validación visual y feedback
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulación de envío
        gsap.to(form, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        // Aquí podrías enviar con fetch
        alert('Mensaje enviado (simulado). Nos pondremos en contacto pronto.');
        form.reset();
    });

    // Animación focus en inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { borderColor: '#00ff88', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { borderColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
        });
    });
}
// Formulario de la página contacto.html
const contactPageForm = document.getElementById('contact-form-page');
if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to(contactPageForm, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        alert('Mensaje enviado (simulado). Nos pondremos en contacto pronto.');
        contactPageForm.reset();
    });

    const inputsPage = contactPageForm.querySelectorAll('input, textarea');
    inputsPage.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { borderColor: '#00ff88', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { borderColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
        });
    });
}