// animation.js
gsap.registerPlugin(ScrollTrigger);

// Animación inicial de la hero
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power3.out' })
      .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
      .from('.hero-cta .btn', { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.8 }, '-=0.4')
      .from('.hero-scroll-indicator', { opacity: 0, y: -20, duration: 0.6 }, '-=0.2');
});

// ScrollTrigger: revelado de secciones
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
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

// Animación de títulos con split (letra por letra)
gsap.utils.toArray('.section-title').forEach(title => {
    const chars = title.innerText.split('');
    title.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join('');
    gsap.from(title.querySelectorAll('.char'), {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.6,
        ease: 'back.out(1.7)'
    });
});

// Efecto parallax en hero (si tiene imagen de fondo)
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    backgroundPosition: '50% 30%', // ajusta según imagen
    ease: 'none'
});

// Animación de tarjetas de servicios (stagger)
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#servicios',
        start: 'top 70%',
    },
    opacity: 0,
    y: 60,
    stagger: 0.15,
    duration: 0.9,
    ease: 'power3.out'
});

// Animación de la línea de tiempo
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '#experiencia',
        start: 'top 70%',
    },
    opacity: 0,
    x: -100,
    stagger: 0.3,
    duration: 1
});

// Animación de la nube de habilidades (si existe)
gsap.from('.skill-item', {
    scrollTrigger: {
        trigger: '.skills-cloud',
        start: 'top 80%',
    },
    opacity: 0,
    scale: 0.5,
    stagger: 0.03,
    duration: 0.5,
    ease: 'back.out(1.2)'
});
