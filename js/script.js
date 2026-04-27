document.documentElement.classList.add("js-enabled");

(() => {
    "use strict";

    const CONTACT = {
        email: "hernandezg.josuea@hotmail.com",
        whatsapp: "50589871374"
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canAnimate = () => typeof window.anime === "function" && !prefersReducedMotion;

    document.addEventListener("DOMContentLoaded", () => {
        initPreloader();
        initNavigation();
        initHeroText();
        initHeroNetwork();
        initHeroAnimation();
        initRevealAnimations();
        initGsapSkills();
        initCounters();
        initCardHover();
        initWhatsAppLinks();
        initContactForm();
        initFaqAccordion();
        initReactStack();
    });

    function initPreloader() {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;

        const hide = () => {
            preloader.classList.add("is-hidden");
            setTimeout(() => preloader.remove(), 320);
        };

        if (document.readyState === "complete") {
            hide();
        } else {
            window.addEventListener("load", hide, { once: true });
        }
    }

    function initNavigation() {
        const header = document.getElementById("siteHeader");
        const toggle = document.querySelector(".nav-toggle, .hamburger");
        const menu = document.getElementById("navMenu");
        const links = menu.querySelectorAll("a[href]");
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const samePageHashLinks = Array.from(links).filter((link) => {
            const href = link.getAttribute("href") || "";
            return href.startsWith("#") || href.startsWith(`${currentFile}#`);
        });
        const sections = Array.from(document.querySelectorAll("main section[id]"));

        if (!header || !menu) return;

        let ticking = false;
        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 18);
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
        updateHeader();

        const closeMenu = () => {
            menu.classList.remove("is-open");
            document.body.classList.remove("nav-open");
            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Abrir menú");
                toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
            }
        };

        if (toggle) {
            toggle.addEventListener("click", () => {
                const isOpen = menu.classList.toggle("is-open");
                document.body.classList.toggle("nav-open", isOpen);
                toggle.setAttribute("aria-expanded", String(isOpen));
                toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
                toggle.innerHTML = isOpen
                    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
                    : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
            });
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href") || "";
                if (!href.startsWith("#")) {
                    closeMenu();
                    return;
                }

                const target = document.querySelector(href);
                if (!target) return;

                event.preventDefault();
                closeMenu();
                target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
                history.replaceState(null, "", href);
            });
        });

        if (sections.length && samePageHashLinks.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const activeLink = menu.querySelector(`a[href="#${entry.target.id}"], a[href$="#${entry.target.id}"]`);
                    samePageHashLinks.forEach((link) => link.classList.remove("is-active"));
                    if (activeLink) activeLink.classList.add("is-active");
                });
            }, {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0.01
            });

            sections.forEach((section) => sectionObserver.observe(section));
        }
    }

    function initHeroText() {
        const title = document.querySelector(".js-split");
        if (!title) return;

        const text = title.textContent.trim();
        title.setAttribute("aria-label", text);
        title.innerHTML = text
            .split(/\s+/)
            .map((word) => `<span class="word" aria-hidden="true">${escapeHtml(word)}</span>`)
            .join(" ");
    }

    function initHeroNetwork() {
        const networks = document.querySelectorAll(".hero-network");
        if (!networks.length) return;

        networks.forEach((network) => {
            if (network.children.length) return;

            const isPageHero = network.classList.contains("page-hero-network");
            const nodes = isPageHero ? 24 : 30;
            const lines = isPageHero ? 11 : 14;
            const fragment = document.createDocumentFragment();

            for (let index = 0; index < nodes; index += 1) {
                const node = document.createElement("span");
                node.className = "signal-node";
                node.style.left = `${8 + Math.random() * 84}%`;
                node.style.top = `${10 + Math.random() * 78}%`;
                fragment.appendChild(node);
            }

            for (let index = 0; index < lines; index += 1) {
                const line = document.createElement("span");
                line.className = "circuit-line";
                line.style.left = `${4 + Math.random() * 86}%`;
                line.style.top = `${14 + Math.random() * 72}%`;
                line.style.transform = `rotate(${Math.random() * 160 - 80}deg)`;
                fragment.appendChild(line);
            }

            network.appendChild(fragment);
        });

        if (!canAnimate()) return;

        window.anime({
            targets: ".signal-node",
            opacity: [0.12, 0.75, 0.12],
            scale: [0.8, 1.45, 0.8],
            delay: window.anime.stagger(85),
            duration: 2400,
            easing: "easeInOutSine",
            loop: true
        });

        window.anime({
            targets: ".circuit-line",
            translateX: ["-18px", "22px"],
            opacity: [0.08, 0.48, 0.08],
            delay: window.anime.stagger(140),
            duration: 3600,
            easing: "easeInOutSine",
            direction: "alternate",
            loop: true
        });
    }

    function initHeroAnimation() {
        if (!canAnimate()) {
            document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const timeline = window.anime.timeline({
            easing: "easeOutExpo",
            duration: 850
        });

        timeline
            .add({
                targets: ".hero-kicker",
                opacity: [0, 1],
                translateY: [18, 0]
            })
            .add({
                targets: ".hero-title .word",
                opacity: [0, 1],
                translateY: [34, 0],
                delay: window.anime.stagger(32)
            }, "-=520")
            .add({
                targets: ".hero-copy",
                opacity: [0, 1],
                translateY: [22, 0]
            }, "-=620")
            .add({
                targets: ".hero-actions .btn",
                opacity: [0, 1],
                translateY: [18, 0],
                delay: window.anime.stagger(90)
            }, "-=580")
            .add({
                targets: ".hero-trust",
                opacity: [0, 1],
                translateY: [16, 0]
            }, "-=560");

        document.querySelectorAll(".hero .reveal").forEach((element) => element.classList.add("is-visible"));
    }

    function initRevealAnimations() {
        const groups = document.querySelectorAll("[data-reveal-group]");
        if (!groups.length) return;

        if (!("IntersectionObserver" in window) || !canAnimate()) {
            document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const items = entry.target.querySelectorAll(".reveal:not(.is-visible)");
                if (!items.length) {
                    observer.unobserve(entry.target);
                    return;
                }

                window.anime({
                    targets: items,
                    opacity: [0, 1],
                    translateY: [26, 0],
                    duration: 760,
                    delay: window.anime.stagger(70),
                    easing: "easeOutCubic",
                    complete: () => {
                        items.forEach((item) => item.classList.add("is-visible"));
                    }
                });

                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        });

        groups.forEach((group) => observer.observe(group));
    }

    function initCounters() {
        const counters = document.querySelectorAll(".metric-value[data-target]");
        if (!counters.length) return;

        const runCounter = (element) => {
            const target = Number(element.dataset.target);
            const prefix = element.dataset.prefix || "";
            const suffix = element.dataset.suffix || "";
            if (!Number.isFinite(target)) return;

            const render = (value) => {
                element.textContent = `${prefix}${Math.round(value)}${suffix}`;
            };

            if (!canAnimate()) {
                render(target);
                return;
            }

            const state = { value: 0 };
            window.anime({
                targets: state,
                value: target,
                round: 1,
                duration: 1200,
                easing: "easeOutExpo",
                update: () => render(state.value)
            });
        };

        if (!("IntersectionObserver" in window)) {
            counters.forEach(runCounter);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                runCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.55 });

        counters.forEach((counter) => observer.observe(counter));
    }

    function initGsapSkills() {
        const section = document.querySelector(".skills-section");
        const meters = document.querySelectorAll(".skill-meter");
        const fills = document.querySelectorAll(".skill-bar-fill");
        if (!section || !meters.length || !fills.length) return;

        const setFinalWidths = () => {
            meters.forEach((meter) => {
                const fill = meter.querySelector(".skill-bar-fill");
                const level = Number(meter.dataset.level || 0);
                if (fill && Number.isFinite(level)) fill.style.width = `${level}%`;
            });
        };

        if (prefersReducedMotion || typeof window.gsap !== "function") {
            setFinalWidths();
            return;
        }

        if (window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
        }

        window.gsap.set(".gsap-skill-card", { autoAlpha: 0, y: 28 });
        window.gsap.set(".skill-chip", { autoAlpha: 0, y: 10 });
        window.gsap.set(fills, { width: "0%" });

        const timelineConfig = window.ScrollTrigger ? {
            scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true
            }
        } : {};

        const timeline = window.gsap.timeline(timelineConfig);

        timeline
            .to(".gsap-skill-card", {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
                stagger: 0.12
            })
            .to(fills, {
                width: (_index, element) => {
                    const meter = element.closest(".skill-meter");
                    return `${Number(meter?.dataset.level || 0)}%`;
                },
                duration: 1.05,
                ease: "power2.out",
                stagger: 0.08
            }, "-=0.32")
            .to(".skill-chip", {
                autoAlpha: 1,
                y: 0,
                duration: 0.34,
                ease: "power2.out",
                stagger: 0.025
            }, "-=0.72");
    }

    function initCardHover() {
        const cards = document.querySelectorAll(".interactive-card");
        const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!cards.length || !supportsHover || !canAnimate()) return;

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                window.anime.remove(card);
                window.anime({
                    targets: card,
                    translateY: -8,
                    scale: 1.012,
                    duration: 260,
                    easing: "easeOutQuad"
                });
            });

            card.addEventListener("mouseleave", () => {
                window.anime.remove(card);
                window.anime({
                    targets: card,
                    translateY: 0,
                    scale: 1,
                    duration: 320,
                    easing: "easeOutQuad"
                });
            });
        });
    }

    function initWhatsAppLinks() {
        document.querySelectorAll("[data-whatsapp-service]").forEach((link) => {
            const service = link.dataset.whatsappService;
            link.href = buildWhatsAppUrl(`Hola ITSA Segurity, quiero solicitar el servicio de ${service}.`);
        });
    }

    function initContactForm() {
        const form = document.getElementById("contactForm");
        const status = document.getElementById("formStatus");
        const whatsAppLink = document.getElementById("formWhatsApp");
        if (!form || !status) return;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const formData = new FormData(form);
            if (String(formData.get("website") || "").trim()) return;

            const data = {
                nombre: String(formData.get("nombre") || "").trim(),
                empresa: String(formData.get("empresa") || "").trim(),
                correo: String(formData.get("correo") || "").trim(),
                telefono: String(formData.get("telefono") || "").trim(),
                servicio: String(formData.get("servicio") || "").trim(),
                mensaje: String(formData.get("mensaje") || "").trim()
            };

            const subject = `Solicitud de asesoría - ${data.servicio || "ITSA Segurity"}`;
            const body = [
                "Hola ITSA Segurity, quiero solicitar asesoría.",
                "",
                `Nombre: ${data.nombre}`,
                `Empresa: ${data.empresa || "No especificada"}`,
                `Correo: ${data.correo}`,
                `Teléfono: ${data.telefono || "No especificado"}`,
                `Servicio de interés: ${data.servicio}`,
                "",
                "Mensaje:",
                data.mensaje
            ].join("\n");

            const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            const whatsappMessage = [
                "Hola ITSA Segurity, quiero solicitar asesoría.",
                `Nombre: ${data.nombre}`,
                `Empresa: ${data.empresa || "No especificada"}`,
                `Servicio: ${data.servicio}`,
                `Mensaje: ${data.mensaje}`
            ].join("\n");

            if (whatsAppLink) {
                whatsAppLink.href = buildWhatsAppUrl(whatsappMessage);
                whatsAppLink.hidden = false;
            }

            status.textContent = "Listo. Abriremos tu correo con el mensaje preparado para enviar.";
            window.location.href = mailto;
            form.reset();
        });
    }

    function initFaqAccordion() {
        document.querySelectorAll(".faq-question").forEach((question) => {
            question.addEventListener("click", () => {
                const item = question.closest(".faq-item") || question.parentElement;
                if (!item) return;
                item.classList.toggle("active");
            });
        });
    }

    function initReactStack() {
        const roots = document.querySelectorAll(".react-stack-root");
        if (!roots.length || !window.React || !window.ReactDOM) return;

        roots.forEach((root) => {
            const stack = String(root.dataset.stack || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            if (!stack.length) return;

            window.ReactDOM.createRoot(root).render(
                window.React.createElement(
                    window.React.Fragment,
                    null,
                    stack.map((name) => window.React.createElement("span", { key: name }, name))
                )
            );
        });
    }

    function buildWhatsAppUrl(message) {
        return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }
})();
