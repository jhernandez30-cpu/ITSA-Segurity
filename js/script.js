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

// ========== NUEVO: Manejo del formulario de contacto con AJAX ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const statusDiv = document.getElementById('form-status');
        
        // Mostrar mensaje de carga
        statusDiv.innerHTML = '<p style="color: #00aaff;">Enviando...</p>';
        statusDiv.style.display = 'block';
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusDiv.innerHTML = '<p style="color: #00ffaa;">✓ ¡Mensaje enviado con éxito! Te contactaremos pronto.</p>';
                form.reset();
                // Opcional: resetear el select al placeholder
                const select = form.querySelector('#service');
                if (select) select.value = '';
            } else {
                const data = await response.json();
                if (data.errors) {
                    statusDiv.innerHTML = `<p style="color: #ff6666;">Error: ${data.errors.map(e => e.message).join(', ')}</p>`;
                } else {
                    statusDiv.innerHTML = '<p style="color: #ff6666;">Error al enviar. Intenta de nuevo más tarde.</p>';
                }
            }
        } catch (error) {
            statusDiv.innerHTML = '<p style="color: #ff6666;">Error de red. Comprueba tu conexión.</p>';
        }
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    });
}
