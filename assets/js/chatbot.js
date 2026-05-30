(function () {
	'use strict';

	const INITIAL_GREETING = 'Hola, soy ITSA, el asistente virtual de ITSA SEGURITY. Puedo ayudarte con Ojo Digital SaaS, monitoreo web mensual, desarrollo web, software a medida, ciberseguridad, SEO, automatización con IA y consultoría tecnológica. ¿Qué necesitas resolver?';
	const UNKNOWN_RESPONSE = 'Gracias por tu mensaje. Puedo orientarte sobre Ojo Digital SaaS, monitoreo web, planes mensuales, desarrollo web, software, ciberseguridad, SEO, automatización con IA, consultoría, recursos o contacto. ¿Cuál tema te interesa?';
	const INACTIVITY_LIMIT = 120000;
	const WHATSAPP_URL = 'https://wa.me/50557885446?text=Hola%2C%20vengo%20desde%20la%20p%C3%A1gina%20web%20de%20ITSA%20SEGURITY.%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Ojo%20Digital%20SaaS.';
	const EMAIL_URL = 'mailto:itsasecurity@gmail.com';
	const AVATAR_ALT = 'ITSA, asistente virtual de ITSA SEGURITY';

	const siteLinks = {
		home: 'index.html',
		avatar: 'images/itsa-avatar.png',
		servicios: 'servicios/',
		web: 'servicios/desarrollo-web.html',
		software: 'servicios/software-a-medida.html',
		ciberseguridad: 'servicios/ciberseguridad.html',
		seo: 'servicios/seo.html',
		ia: 'servicios/automatizacion-ia.html',
		consultoria: 'servicios/consultoria-tecnologica.html',
		recursos: 'recursos/',
		guiaWeb: 'recursos/como-elegir-desarrollo-web.html',
		guiaSeguridad: 'recursos/guia-seguridad-web.html',
		guiaIA: 'recursos/beneficios-automatizacion-ia.html',
		ojo: 'soluciones/ojo-digital.html',
		contacto: 'contacto/',
		privacidad: 'legal/politica-privacidad.html',
		terminos: 'legal/terminos-condiciones.html',
		avisoLegal: 'legal/aviso-legal.html'
	};

	const serviceResponses = {
		servicios: 'ITSA SEGURITY ofrece servicios tecnológicos para empresas en Nicaragua: Ojo Digital SaaS, desarrollo web, software a medida, ciberseguridad, SEO, automatización con IA y consultoría tecnológica. Cada servicio tiene su propia página con alcance, entregables, proceso y preguntas frecuentes.',
		web: 'En Desarrollo Web creamos sitios corporativos, landing pages y páginas empresariales responsive con estructura SEO, llamadas a WhatsApp, formularios, seguridad básica y enfoque comercial para empresas en Nicaragua.',
		ciberseguridad: 'En Ciberseguridad ayudamos a proteger sitios web, accesos, datos y procesos digitales mediante buenas prácticas, revisión de riesgos, respaldos, protección web y concientización para empresas nicaragüenses.',
		seo: 'En SEO trabajamos arquitectura, titles, meta descriptions, contenido semántico, enlazado interno, sitemap, robots, canonical y optimizaciones para mejorar visibilidad en Google sin abusar de palabras clave.',
		ia: 'En Automatización con IA implementamos chatbots, asistentes, flujos automáticos y apoyo a procesos internos para reducir tareas repetitivas y mejorar atención, ventas o reportes.',
		software: 'En Software a Medida desarrollamos sistemas administrativos, aplicaciones web, paneles de control, bases de datos e integraciones para ordenar procesos y centralizar información empresarial.',
		consultoria: 'En Consultoría Tecnológica realizamos diagnóstico, selección de herramientas, arquitectura de soluciones, roadmap digital y acompañamiento para ejecutar proyectos con orden.',
		ojo: 'Ojo Digital SaaS es la plataforma mensual de ITSA SEGURITY para monitorear sitios web propios o autorizados: disponibilidad, SSL, seguridad básica, SEO, rendimiento, reportes, alertas y recomendaciones con IA.',
		recursos: 'En Recursos encuentras guías breves y preguntas frecuentes para decidir mejor: por qué una empresa necesita una web profesional, qué revisar en seguridad web y cuándo automatizar con IA.',
		nicaragua: 'ITSA SEGURITY trabaja con enfoque nacional para empresas, emprendimientos y negocios en Nicaragua. La web también está preparada para captar búsquedas locales como Managua cuando el proyecto lo necesite.',
		legal: 'El sitio incluye páginas base de Política de privacidad, Términos y condiciones y Aviso legal para reforzar confianza y transparencia. Son documentos informativos que pueden validarse con asesoría legal profesional.'
	};

	const intentLinks = {
		servicios: [
			{ label: 'Ver servicios', path: siteLinks.servicios },
			{ label: 'Contactar', path: siteLinks.contacto }
		],
		web: [
			{ label: 'Desarrollo Web', path: siteLinks.web },
			{ label: 'Guía web', path: siteLinks.guiaWeb },
			{ label: 'SEO relacionado', path: siteLinks.seo }
		],
		software: [
			{ label: 'Software a Medida', path: siteLinks.software },
			{ label: 'Automatización IA', path: siteLinks.ia },
			{ label: 'Consultoría', path: siteLinks.consultoria }
		],
		ciberseguridad: [
			{ label: 'Ciberseguridad', path: siteLinks.ciberseguridad },
			{ label: 'Guía seguridad web', path: siteLinks.guiaSeguridad },
			{ label: 'Desarrollo seguro', path: siteLinks.web }
		],
		seo: [
			{ label: 'SEO', path: siteLinks.seo },
			{ label: 'Desarrollo Web', path: siteLinks.web },
			{ label: 'Recursos', path: siteLinks.recursos }
		],
		ia: [
			{ label: 'Automatización IA', path: siteLinks.ia },
			{ label: 'Guía IA', path: siteLinks.guiaIA },
			{ label: 'Software a Medida', path: siteLinks.software }
		],
		consultoria: [
			{ label: 'Consultoría', path: siteLinks.consultoria },
			{ label: 'Servicios', path: siteLinks.servicios },
			{ label: 'Contacto', path: siteLinks.contacto }
		],
		ojo: [
			{ label: 'Ojo Digital SaaS', path: siteLinks.ojo },
			{ label: 'Ciberseguridad', path: siteLinks.ciberseguridad },
			{ label: 'Solicitar diagnóstico', path: siteLinks.contacto }
		],
		recursos: [
			{ label: 'Recursos', path: siteLinks.recursos },
			{ label: 'Guía web', path: siteLinks.guiaWeb },
			{ label: 'Guía seguridad', path: siteLinks.guiaSeguridad },
			{ label: 'Guía IA', path: siteLinks.guiaIA }
		],
		nicaragua: [
			{ label: 'Servicios Nicaragua', path: siteLinks.servicios },
			{ label: 'Contacto', path: siteLinks.contacto }
		],
		legal: [
			{ label: 'Privacidad', path: siteLinks.privacidad },
			{ label: 'Términos', path: siteLinks.terminos },
			{ label: 'Aviso legal', path: siteLinks.avisoLegal }
		]
	};

	const quickActions = [
		{ label: 'Desarrollo Web', intent: 'web' },
		{ label: 'Software a Medida', intent: 'software' },
		{ label: 'Ciberseguridad', intent: 'ciberseguridad' },
		{ label: 'SEO', intent: 'seo' },
		{ label: 'Automatización IA', intent: 'ia' },
		{ label: 'Consultoría Tecnológica', intent: 'consultoria' },
		{ label: 'Ojo Digital SaaS', intent: 'ojo' },
		{ label: 'Recursos', intent: 'recursos' },
		{ label: 'Contacto', intent: 'contacto' }
	];

	const intentKeywords = {
		servicios: ['servicios', 'soluciones', 'catalogo', 'catálogo', 'que ofrecen', 'qué ofrecen'],
		web: ['web', 'página', 'pagina', 'sitio', 'landing', 'tienda', 'ecommerce', 'online', 'portafolio'],
		ciberseguridad: ['seguridad', 'hackeo', 'contraseña', 'contrasena', 'vulnerabilidad', 'datos', 'riesgo', 'protección', 'proteccion'],
		seo: ['seo', 'google', 'posicionar', 'búsqueda', 'busqueda', 'tráfico', 'trafico', 'meta', 'ranking'],
		ia: ['ia', 'chatbot', 'automatizar', 'asistente', 'inteligencia artificial', 'automatización', 'automatizacion'],
		software: ['software', 'sistema', 'aplicacion', 'aplicación', 'panel', 'base de datos', 'crm', 'erp', 'proceso'],
		consultoria: ['consultoría', 'consultoria', 'herramientas', 'diagnóstico', 'diagnostico', 'proyecto', 'tecnología', 'tecnologia', 'roadmap'],
		ojo: ['ojo digital', 'ojo digital saas', 'monitoreo', 'monitoreo web', 'saas', 'planes', 'ssl', 'disponibilidad', 'reportes', 'dashboard', 'alertas'],
		recursos: ['recurso', 'recursos', 'guia', 'guía', 'preguntas', 'faq', 'comparativa', 'aprender', 'informacion', 'información'],
		nicaragua: ['nicaragua', 'nicaraguense', 'nicaragüense', 'managua', 'local', 'empresa en nicaragua', 'negocio en nicaragua'],
		legal: ['privacidad', 'terminos', 'términos', 'condiciones', 'aviso legal', 'legal', 'datos personales'],
		contacto: ['cotizar', 'precio', 'asesor', 'contacto', 'whatsapp', 'correo', 'email', 'presupuesto', 'contratar', 'demo']
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
	let actionPanelId = 0;

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

		if (type === 'bot') {
			const row = document.createElement('div');
			row.className = 'itsa-chatbot-message-row is-bot';
			row.appendChild(createAvatarImage('itsa-bot-avatar'));
			row.appendChild(message);
			messages.appendChild(row);
		} else {
			messages.appendChild(message);
		}

		messages.scrollTop = messages.scrollHeight;
	}

	function createAvatarImage(className) {
		const image = document.createElement('img');
		image.className = className;
		image.src = getInternalUrl(siteLinks.avatar);
		image.alt = AVATAR_ALT;
		image.width = className === 'itsa-bot-avatar' ? 36 : 44;
		image.height = className === 'itsa-bot-avatar' ? 36 : 44;
		image.loading = 'lazy';
		return image;
	}

	function showQuickActions() {
		renderActionDropdown('Opciones rápidas', quickActions.map(function (action) {
			return createQuickActionButton(action.label, action.intent);
		}));
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
		const toggle = event.target.closest('[data-itsa-actions-toggle]');

		if (toggle) {
			toggleActionDropdown(toggle);
			resetInactivityTimer();
			return;
		}

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
			addBotMessage('Perfecto. Puedes hablar con un asesor de ITSA SEGURITY por WhatsApp o enviar un correo para solicitar más información o una cotización.');
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
		const response = serviceResponses[intent] || UNKNOWN_RESPONSE;
		addBotMessage(response);
		addBotMessage('Te dejo accesos útiles para revisar el detalle o avanzar hacia una asesoría.');
		showIntentOptions(intent);
	}

	function showContactOptions() {
		renderActionDropdown('Contacto y cotización', [
			createInternalLink('Página de contacto', siteLinks.contacto),
			createContactLink('WhatsApp', WHATSAPP_URL),
			createContactLink('Correo', EMAIL_URL),
			createQuickActionButton('Ver servicios', 'opciones')
		]);
	}

	function showIntentOptions(intent) {
		const items = [];

		(intentLinks[intent] || intentLinks.servicios).forEach(function (link) {
			items.push(createInternalLink(link.label, link.path));
		});

		items.push(createContactLink('WhatsApp', WHATSAPP_URL));
		items.push(createQuickActionButton('Más opciones', 'opciones'));
		renderActionDropdown('Enlaces sugeridos', items);
	}

	function renderActionDropdown(label, items) {
		const panelId = 'itsa-chatbot-actions-panel-' + (++actionPanelId);
		const toggle = document.createElement('button');
		const panel = document.createElement('div');

		actions.innerHTML = '';

		toggle.type = 'button';
		toggle.className = 'itsa-chatbot-actions-toggle';
		toggle.dataset.itsaActionsToggle = 'true';
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-controls', panelId);
		toggle.textContent = label;

		panel.className = 'itsa-chatbot-actions-panel';
		panel.id = panelId;
		panel.hidden = true;

		items.forEach(function (item) {
			panel.appendChild(item);
		});

		actions.appendChild(toggle);
		actions.appendChild(panel);
	}

	function toggleActionDropdown(toggle) {
		const panel = document.getElementById(toggle.getAttribute('aria-controls'));
		const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

		toggle.setAttribute('aria-expanded', String(!isExpanded));

		if (panel) {
			panel.hidden = isExpanded;
		}
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

	function createInternalLink(label, path) {
		const link = document.createElement('a');
		link.className = 'itsa-chatbot-contact';
		link.href = getInternalUrl(path);
		link.textContent = label;
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

	function getInternalUrl(path) {
		const normalizedPath = String(path || '').replace(/^\/+/, '');
		const currentPath = window.location.pathname;
		const repoMarker = '/ITSA-Segurity/';
		const markerIndex = currentPath.indexOf(repoMarker);
		const siteRoot = markerIndex >= 0 ? currentPath.slice(0, markerIndex + repoMarker.length) : '/';

		return siteRoot + normalizedPath;
	}
}());
