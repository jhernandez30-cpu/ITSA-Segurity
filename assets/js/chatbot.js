(function () {
	'use strict';

	const INITIAL_GREETING = 'Hola, soy ITSA, el asistente virtual de ITSA Segurity. Puedo ayudarte con desarrollo web, ciberseguridad, SEO, inteligencia artificial, marketing digital y consultoría tecnológica. ¿Qué servicio te interesa?';
	const UNKNOWN_RESPONSE = 'Gracias por tu mensaje. Para orientarte mejor, puedo ayudarte con Desarrollo Web, Ciberseguridad, SEO, Inteligencia Artificial, Marketing Digital o Consultoría Tecnológica. ¿Cuál de estos servicios te interesa?';
	const INACTIVITY_LIMIT = 120000;
	const WHATSAPP_URL = 'https://wa.me/50589871374?text=Hola%2C%20vengo%20desde%20la%20p%C3%A1gina%20web%20de%20ITSA%20Segurity.%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.';
	const EMAIL_URL = 'mailto:itsasecurity@gmail.com';

	const serviceResponses = {
		web: 'En Desarrollo Web creamos sitios web profesionales, landing pages, tiendas online, portafolios y páginas empresariales con diseño responsive, enfoque comercial y buena base técnica para crecer.',
		ciberseguridad: 'En Ciberseguridad ayudamos a proteger sitios web, accesos, datos y procesos digitales mediante buenas prácticas, revisión de riesgos, protección web y concientización empresarial.',
		seo: 'En SEO trabajamos SEO técnico, SEO On Page, meta títulos, descripciones, arquitectura SEO, posicionamiento web y mejoras para aumentar la visibilidad en Google con tráfico más cualificado.',
		ia: 'En Inteligencia Artificial implementamos chatbots, asistentes IA y automatizaciones para atención al cliente, procesos internos y apoyo a decisiones de negocio.',
		marketing: 'En Marketing Digital fortalecemos la presencia online de tu empresa con estrategia digital, redes sociales, campañas, contenido y acciones para mejorar la marca empresarial.',
		consultoria: 'En Consultoría Tecnológica realizamos diagnóstico tecnológico, selección de herramientas, roadmap digital, arquitectura de soluciones y acompañamiento para ejecutar proyectos con orden.'
	};

	const quickActions = [
		{ label: 'Desarrollo Web', intent: 'web' },
		{ label: 'Ciberseguridad', intent: 'ciberseguridad' },
		{ label: 'SEO', intent: 'seo' },
		{ label: 'Inteligencia Artificial', intent: 'ia' },
		{ label: 'Marketing Digital', intent: 'marketing' },
		{ label: 'Consultoría Tecnológica', intent: 'consultoria' },
		{ label: 'Hablar con un asesor', intent: 'contacto' },
		{ label: 'Solicitar cotización', intent: 'contacto' }
	];

	const intentKeywords = {
		web: ['web', 'página', 'pagina', 'sitio', 'landing', 'tienda', 'ecommerce', 'online', 'portafolio'],
		ciberseguridad: ['seguridad', 'hackeo', 'contraseña', 'contrasena', 'vulnerabilidad', 'datos', 'riesgo', 'protección', 'proteccion'],
		seo: ['seo', 'google', 'posicionar', 'búsqueda', 'busqueda', 'tráfico', 'trafico', 'meta', 'ranking'],
		ia: ['ia', 'chatbot', 'automatizar', 'asistente', 'inteligencia artificial', 'automatización', 'automatizacion'],
		marketing: ['marketing', 'redes', 'facebook', 'instagram', 'campaña', 'campana', 'marca', 'contenido'],
		consultoria: ['consultoría', 'consultoria', 'herramientas', 'diagnóstico', 'diagnostico', 'proyecto', 'tecnología', 'tecnologia', 'roadmap'],
		contacto: ['cotizar', 'precio', 'asesor', 'contacto', 'whatsapp', 'correo', 'email', 'presupuesto', 'contratar']
	};

	let chatbot;
	let toggleButton;
	let chatWindow;
	let closeButton;
	let messages;
	let actions;
	let form;
	let input;
	let inactivityTimer = null;

	document.addEventListener('DOMContentLoaded', initChatbot);

	function initChatbot() {
		chatbot = document.getElementById('itsa-chatbot');

		if (!chatbot) {
			return;
		}

		toggleButton = chatbot.querySelector('[data-itsa-chatbot-toggle]');
		chatWindow = chatbot.querySelector('[data-itsa-chatbot-window]');
		closeButton = chatbot.querySelector('[data-itsa-chatbot-close]');
		messages = chatbot.querySelector('[data-itsa-chatbot-messages]');
		actions = chatbot.querySelector('[data-itsa-chatbot-actions]');
		form = chatbot.querySelector('[data-itsa-chatbot-form]');
		input = chatbot.querySelector('[data-itsa-chatbot-input]');

		if (!toggleButton || !chatWindow || !closeButton || !messages || !actions || !form || !input) {
			return;
		}

		toggleButton.addEventListener('click', openChatbot);
		closeButton.addEventListener('click', closeChatbot);
		form.addEventListener('submit', handleFormSubmit);
		actions.addEventListener('click', handleQuickAction);
		input.addEventListener('input', resetInactivityTimer);
		input.addEventListener('keydown', resetInactivityTimer);
		chatbot.addEventListener('click', resetInactivityTimer);
		document.addEventListener('keydown', handleDocumentKeydown);
	}

	function openChatbot() {
		chatbot.classList.add('is-open');
		toggleButton.setAttribute('aria-expanded', 'true');
		chatWindow.setAttribute('aria-hidden', 'false');
		resetChatbot();
		window.setTimeout(function () {
			input.focus();
		}, 80);
	}

	function closeChatbot() {
		chatbot.classList.remove('is-open');
		toggleButton.setAttribute('aria-expanded', 'false');
		chatWindow.setAttribute('aria-hidden', 'true');
		stopInactivityTimer();
		resetChatbot(false);
		toggleButton.focus();
	}

	function resetChatbot(shouldRestartTimer) {
		messages.innerHTML = '';
		actions.innerHTML = '';
		input.value = '';
		showInitialGreeting();
		showQuickActions();

		if (shouldRestartTimer !== false && chatbot.classList.contains('is-open')) {
			startInactivityTimer();
		}
	}

	function showInitialGreeting() {
		addBotMessage(INITIAL_GREETING);
	}

	function addBotMessage(text) {
		addMessage(text, 'bot');
	}

	function addUserMessage(text) {
		addMessage(text, 'user');
	}

	function addMessage(text, type) {
		const message = document.createElement('div');
		message.className = 'itsa-chatbot-message is-' + type;
		message.textContent = text;
		messages.appendChild(message);
		messages.scrollTop = messages.scrollHeight;
	}

	function showQuickActions() {
		actions.innerHTML = '';

		quickActions.forEach(function (action) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'itsa-chatbot-action';
			button.dataset.itsaIntent = action.intent;
			button.textContent = action.label;
			actions.appendChild(button);
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		const value = input.value.trim();

		if (!value) {
			return;
		}

		addUserMessage(value);
		input.value = '';
		handleUserMessage(value);
		resetInactivityTimer();
	}

	function handleQuickAction(event) {
		const button = event.target.closest('[data-itsa-intent]');

		if (!button) {
			return;
		}

		const label = button.textContent.trim();
		const intent = button.dataset.itsaIntent;
		addUserMessage(label);

		if (intent === 'opciones') {
			addBotMessage('Claro, estas son las áreas en las que puedo orientarte.');
			showQuickActions();
			resetInactivityTimer();
			return;
		}

		if (intent === 'contacto') {
			addBotMessage('Perfecto. Puedes hablar con un asesor de ITSA Segurity por WhatsApp o enviar un correo para solicitar más información o una cotización.');
			showContactOptions();
			return;
		}

		replyWithService(intent);
		resetInactivityTimer();
	}

	function handleUserMessage(message) {
		const intent = detectServiceIntent(message);

		if (!intent) {
			addBotMessage(UNKNOWN_RESPONSE);
			showQuickActions();
			return;
		}

		if (intent === 'contacto') {
			addBotMessage('Claro. Te dejo las opciones directas para hablar con un asesor o solicitar una cotización.');
			showContactOptions();
			return;
		}

		replyWithService(intent);
	}

	function detectServiceIntent(message) {
		const normalized = normalizeText(message);

		for (const intent of Object.keys(intentKeywords)) {
			if (intentKeywords[intent].some(function (keyword) {
				return normalized.includes(normalizeText(keyword));
			})) {
				return intent;
			}
		}

		return null;
	}

	function replyWithService(intent) {
		addBotMessage(serviceResponses[intent]);
		addBotMessage('Si quieres, puedo ayudarte a convertir esta necesidad en una cotización o ponerte en contacto con un asesor.');
		showContactOptions();
	}

	function showContactOptions() {
		actions.innerHTML = '';
		actions.appendChild(createContactLink('WhatsApp', WHATSAPP_URL));
		actions.appendChild(createContactLink('Correo', EMAIL_URL));
		actions.appendChild(createQuickActionButton('Ver servicios', 'opciones'));
	}

	function createContactLink(label, href) {
		const link = document.createElement('a');
		link.className = 'itsa-chatbot-contact';
		link.href = href;
		link.textContent = label;

		if (href.indexOf('https://wa.me/') === 0) {
			link.target = '_blank';
			link.rel = 'noopener';
		}

		return link;
	}

	function createQuickActionButton(label, intent) {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'itsa-chatbot-action';
		button.dataset.itsaIntent = intent;
		button.textContent = label;
		return button;
	}

	function startInactivityTimer() {
		stopInactivityTimer();
		inactivityTimer = window.setTimeout(function () {
			if (chatbot.classList.contains('is-open')) {
				resetChatbot(false);
				startInactivityTimer();
			}
		}, INACTIVITY_LIMIT);
	}

	function resetInactivityTimer() {
		if (chatbot && chatbot.classList.contains('is-open')) {
			startInactivityTimer();
		}
	}

	function stopInactivityTimer() {
		if (inactivityTimer) {
			window.clearTimeout(inactivityTimer);
			inactivityTimer = null;
		}
	}

	function handleDocumentKeydown(event) {
		if (event.key === 'Escape' && chatbot && chatbot.classList.contains('is-open')) {
			closeChatbot();
		}
	}

	function normalizeText(text) {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}
}());
