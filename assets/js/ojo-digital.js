(function () {
	'use strict';

	const page = document.querySelector('.ojo-digital-page');

	if (!page) {
		return;
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const counters = Array.from(document.querySelectorAll('[data-ojo-counter]'));
	const dashboard = document.querySelector('[data-ojo-dashboard]');
	const eventList = document.querySelector('[data-ojo-events]');
	const lastUpdate = document.querySelector('[data-ojo-last-update]');
	let updateTimer = null;

	document.addEventListener('DOMContentLoaded', initOjoDigital);

	function initOjoDigital() {
		resetCounters();
		initCounterAnimation();
		initOjoReveal();
		startStatusSimulation();

		document.addEventListener('visibilitychange', function () {
			if (!document.hidden) {
				resetCounters();
				initCounterAnimation();
				startStatusSimulation();
			}
		});
	}

	function initCounterAnimation() {
		if (!counters.length) {
			return;
		}

		if (!('IntersectionObserver' in window) || prefersReducedMotion) {
			counters.forEach(function (counter) {
				counter.textContent = counter.dataset.target || '0';
				counter.dataset.animated = 'true';
			});
			return;
		}

		const observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				animateCounter(entry.target);
				observer.unobserve(entry.target);
			});
		}, {
			threshold: 0.45
		});

		counters.forEach(function (counter) {
			observer.observe(counter);
		});
	}

	function animateCounter(counter) {
		if (counter.dataset.animated === 'true') {
			return;
		}

		const target = Number(counter.dataset.target || 0);
		const duration = 1100;
		const startTime = performance.now();
		counter.dataset.animated = 'true';

		function tick(now) {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			counter.textContent = String(Math.round(target * eased));

			if (progress < 1) {
				window.requestAnimationFrame(tick);
			}
		}

		window.requestAnimationFrame(tick);
	}

	function resetCounters() {
		counters.forEach(function (counter) {
			counter.textContent = '0';
			counter.dataset.animated = 'false';
		});
	}

	function initOjoReveal() {
		const items = Array.from(document.querySelectorAll('.ojo-card, .ojo-ethics-card, .ojo-tech-grid span, .ojo-dashboard'));

		if (!items.length || prefersReducedMotion) {
			items.forEach(function (item) {
				item.classList.add('ojo-visible');
			});
			return;
		}

		if (!('IntersectionObserver' in window)) {
			items.forEach(function (item) {
				item.classList.add('ojo-visible');
			});
			return;
		}

		const observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				entry.target.classList.add('ojo-visible');
				observer.unobserve(entry.target);
			});
		}, {
			threshold: 0.14,
			rootMargin: '0px 0px -8% 0px'
		});

		items.forEach(function (item) {
			observer.observe(item);
		});
	}

	function startStatusSimulation() {
		window.clearInterval(updateTimer);
		updateDashboardState();
		updateTimer = window.setInterval(updateDashboardState, 6500);
	}

	function updateDashboardState() {
		if (dashboard) {
			dashboard.classList.toggle('is-updating');
		}

		if (lastUpdate) {
			lastUpdate.textContent = 'Ultima actualizacion segura: ' + new Date().toLocaleTimeString('es-NI', {
				hour: '2-digit',
				minute: '2-digit'
			});
		}

		if (eventList) {
			const events = Array.from(eventList.querySelectorAll('li'));
			events.forEach(function (event) {
				event.classList.remove('is-current');
			});

			if (events.length) {
				const current = events[Math.floor(Math.random() * events.length)];
				current.classList.add('is-current');
			}
		}
	}
}());
