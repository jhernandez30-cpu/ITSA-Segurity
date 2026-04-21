// animation.js - versión segura con verificación de elementos
gsap.registerPlugin(ScrollTrigger);

// Función auxiliar para animar solo si el elemento existe
function animateIfExists(selector, animationFn) {
    const elements = document.querySelectorAll(selector);
    if (elements.length) {
        animationFn(elements);
    }
}

// Animación inicial de la hero (solo si existe .hero-title)
window.addEventListener('load', () => {
    if (document.querySelector('.hero-title')) {
        const tl = gsap.timeline();
        tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power3.out' })
          .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
          .from('.hero-cta .btn', { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.8 }, '-=0.4')
          .from('.hero-scroll-indicator', { opacity: 0, y: -20, duration: 0.6 }, '-=0.2');
    }
});

// ScrollTrigger: revelado de secciones (genérico)
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

// Animación de títulos con split (solo si no tiene ya la clase 'char')
animateIfExists('.section-title', (titles) => {
    titles.forEach(title => {
        if (title.querySelector('.char')) return;
        const chars = title.innerText.split('');
        title.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join('');
        gsap.from(title.querySelectorAll('.char'), {
            scrollTrigger: { trigger: title, start: 'top 80%' },
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });
    });
});

// Animación de tarjetas de servicios (clase .servicio-card)
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

// Animación de la línea de tiempo (solo si existe .timeline-item)
animateIfExists('.timeline-item', (items) => {
    gsap.from(items, {
        scrollTrigger: { trigger: '#experiencia', start: 'top 70%' },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Animación de tarjetas de equipo (solo si existe .miembro-card)
animateIfExists('.miembro-card', (cards) => {
    gsap.from(cards, {
        scrollTrigger: { trigger: '.equipo', start: 'top 75%' },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
    });
});

// Animación de certificaciones (solo si existe .cert-item)
animateIfExists('.cert-item', (items) => {
    gsap.from(items, {
        scrollTrigger: { trigger: '.certificaciones', start: 'top 85%' },
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.2)'
    });
});
