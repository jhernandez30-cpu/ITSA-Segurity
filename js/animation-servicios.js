// animation-servicios.js - Animaciones exclusivas para la página de servicios
gsap.registerPlugin(ScrollTrigger);

// Función auxiliar para animar solo si el elemento existe
function animateIfExists(selector, animationFn) {
    const elements = document.querySelectorAll(selector);
    if (elements.length) {
        animationFn(elements);
    }
}

// Animación inicial de la hero (si existe)
window.addEventListener('load', () => {
    if (document.querySelector('.hero-title')) {
        const tl = gsap.timeline();
        tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power3.out' })
          .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
          .from('.hero-cta .btn', { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.8 }, '-=0.4')
          .from('.hero-scroll-indicator', { opacity: 0, y: -20, duration: 0.6 }, '-=0.2');
    }
});

// Revelado de secciones (genérico) - Aplica a todas las .section
animateIfExists('.section', (sections) => {
    gsap.from(sections, {
        scrollTrigger: {
            trigger: sections,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });
});

// Animación de tarjetas de servicios (clase .servicio-card)
// Ahora sí encuentra el trigger '#servicios' que acabamos de agregar
animateIfExists('.servicio-card', (cards) => {
    gsap.from(cards, {
        scrollTrigger: { trigger: '#servicios', start: 'top 70%' },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out'
    });
});

// Animación para items de metodología (sin cambios, funciona correctamente)
animateIfExists('.metodologia-item', (items) => {
    gsap.from(items, {
        scrollTrigger: { trigger: '.metodologia-grid', start: 'top 85%' },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
    });
});
