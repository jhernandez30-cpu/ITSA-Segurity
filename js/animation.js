// animation.js - Animaciones con GSAP y ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

// Hero animation
const heroTimeline = gsap.timeline();
heroTimeline
    .to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.btn-cta', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

// Parallax ligero en hero
gsap.to('.hero-background', {
    y: 100,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Presentación: texto e imagen con scroll
gsap.from('.presentation-text', {
    scrollTrigger: {
        trigger: '#presentacion',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
    },
    x: -100,
    opacity: 0
});

gsap.from('.presentation-image', {
    scrollTrigger: {
        trigger: '#presentacion',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
    },
    x: 100,
    opacity: 0
});

// Servicios: stagger
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#servicios-destacados',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.2)'
});

// Experiencia: timeline items con efecto escalera
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '#experiencia',
        start: 'top 70%',
    },
    x: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3
});

// Estadísticas ya se manejan con contadores, pero podemos animar la entrada del contenedor
gsap.from('.stats-grid', {
    scrollTrigger: {
        trigger: '#stats',
        start: 'top 80%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1
});

// Testimonios carrusel: animación de entrada
gsap.from('.testimonials-carousel', {
    scrollTrigger: {
        trigger: '#testimonios',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1
});

// Contacto: animación de formulario e info
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '#contacto',
        start: 'top 80%',
    },
    x: -50,
    opacity: 0,
    duration: 1
});

gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '#contacto',
        start: 'top 80%',
    },
    x: 50,
    opacity: 0,
    duration: 1
});

// Footer sutil
gsap.from('.footer', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
    },
    opacity: 0,
    y: 20,
    duration: 0.8
});

// Split text animation opcional (si se desea, se puede agregar para títulos)
// Ejemplo: dividir el título del hero en letras
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerText;
    heroTitle.innerHTML = '';
    [...text].forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.display = 'inline-block';
        heroTitle.appendChild(span);
    });
    gsap.from('.hero-title span', {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });
}