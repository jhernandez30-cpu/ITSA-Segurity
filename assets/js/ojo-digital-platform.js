(function () {
	"use strict";

	const WHATSAPP_NUMBER = "50557885446";
	const POWERBI_EMBED_URL = "";

	const STORAGE = {
		users: "od_users",
		session: "od_session",
		sites: "od_sites",
		checks: "od_checks",
		reports: "od_reports"
	};

	const demoUsers = [
		{ id: "usr-client-demo", name: "Cliente Demo", email: "cliente@demo.local", role: "client", pin: "demo123", plan: "Profesional", createdAt: "2026-05-29T12:00:00.000Z" },
		{ id: "usr-admin-demo", name: "Admin ITSA", email: "admin@demo.local", role: "admin", pin: "admin123", plan: "Admin", createdAt: "2026-05-29T12:00:00.000Z" }
	];

	const demoSites = [
		{ id: "site-colegio-norte", client: "Colegio Norte", siteName: "Portal Colegio Norte", url: "https://colegionorte.edu.ni", plan: "Profesional", status: "saludable", lastCheck: "2026-05-29T15:40:00.000Z" },
		{ id: "site-iglesia-vida", client: "Iglesia Vida Nueva", siteName: "Iglesia Vida Nueva", url: "https://iglesiavida.org", plan: "Basico", status: "advertencia", lastCheck: "2026-05-29T14:10:00.000Z" },
		{ id: "site-tienda-central", client: "Tienda Central", siteName: "Tienda Central Online", url: "https://tiendacentral.com.ni", plan: "Empresarial", status: "critico", lastCheck: "2026-05-29T13:30:00.000Z" },
		{ id: "site-emprende", client: "Emprende Studio", siteName: "Landing Emprende Studio", url: "https://emprendestudio.com", plan: "Profesional", status: "saludable", lastCheck: "2026-05-29T12:50:00.000Z" }
	];

	const demoChecks = [
		createCheck("Portal Colegio Norte", "https://colegionorte.edu.ni", "saludable", 200, 430, true, 88, 81, 86, "2026-05-29T15:40:00.000Z"),
		createCheck("Iglesia Vida Nueva", "https://iglesiavida.org", "advertencia", 200, 980, true, 72, 64, 78, "2026-05-29T14:10:00.000Z"),
		createCheck("Tienda Central Online", "https://tiendacentral.com.ni", "critico", 503, 2150, true, 58, 42, 63, "2026-05-29T13:30:00.000Z"),
		createCheck("Landing Emprende Studio", "https://emprendestudio.com", "saludable", 200, 520, true, 84, 79, 82, "2026-05-29T12:50:00.000Z")
	];

	const demoReports = [
		createReport("rep-2026-05-colegio", "Colegio Norte", demoChecks[0], "99.8%", "Profesional"),
		createReport("rep-2026-05-iglesia", "Iglesia Vida Nueva", demoChecks[1], "98.9%", "Basico"),
		createReport("rep-2026-05-tienda", "Tienda Central", demoChecks[2], "94.2%", "Empresarial")
	];

	document.addEventListener("DOMContentLoaded", init);

	function init() {
		seedDemoData();
		bindGlobalActions();

		const page = document.body.dataset.page || "";
		if (!guardPage()) return;

		renderCurrentUser();

		if (page === "login") initLogin();
		if (page === "register") initRegister();
		if (page === "dashboard") renderDashboard();
		if (page === "reports") renderReports();
		if (page === "excel") renderExcelDashboard();
		if (page === "powerbi") renderPowerBi();
		if (page === "admin") renderAdmin();
	}

	function seedDemoData() {
		if (!read(STORAGE.users)) write(STORAGE.users, demoUsers);
		if (!read(STORAGE.sites)) write(STORAGE.sites, demoSites);
		if (!read(STORAGE.checks)) write(STORAGE.checks, demoChecks);
		if (!read(STORAGE.reports)) write(STORAGE.reports, demoReports);
	}

	function guardPage() {
		const protectedPage = document.body.dataset.protected === "true";
		const requiredRole = document.body.dataset.role || "";
		const session = getSession();

		if (protectedPage && !session) {
			const current = window.location.pathname.split("/").pop() || "dashboard.html";
			window.location.href = `login.html?next=${encodeURIComponent(current)}`;
			return false;
		}

		if (requiredRole && session && session.role !== requiredRole) {
			const main = document.querySelector(".platform-main");
			if (main) {
				main.innerHTML = `
					<section class="platform-card">
						<h1>Acceso restringido</h1>
						<p class="platform-muted">Esta vista requiere rol ${escapeHtml(requiredRole)}. Inicia sesion con el perfil demo de administrador.</p>
						<div class="platform-actions">
							<a class="platform-link-button" href="login.html">Cambiar sesion</a>
							<a class="platform-link-button secondary" href="dashboard.html">Volver al dashboard</a>
						</div>
					</section>`;
			}
			return false;
		}

		return true;
	}

	function initLogin() {
		const form = document.querySelector("[data-login-form]");
		const message = document.querySelector("[data-form-message]");

		document.querySelectorAll("[data-demo-login]").forEach((button) => {
			button.addEventListener("click", () => {
				const role = button.dataset.demoLogin;
				const user = getUsers().find((item) => item.role === role) || demoUsers[0];
				startSession(user);
			});
		});

		if (!form) return;
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const data = new FormData(form);
			const email = String(data.get("email") || "").trim().toLowerCase();
			const pin = String(data.get("pin") || "").trim();
			const user = getUsers().find((item) => item.email.toLowerCase() === email && item.pin === pin);
			if (!user) {
				showMessage(message, "No se encontro un usuario demo con esos datos. Usa cliente@demo.local / demo123 o admin@demo.local / admin123.", "error");
				return;
			}
			startSession(user);
		});
	}

	function initRegister() {
		const form = document.querySelector("[data-register-form]");
		const message = document.querySelector("[data-form-message]");
		if (!form) return;

		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const data = new FormData(form);
			const name = String(data.get("name") || "").trim();
			const email = String(data.get("email") || "").trim().toLowerCase();
			const role = String(data.get("role") || "client");
			const pin = String(data.get("pin") || "").trim();

			if (!name || !email || pin.length < 6) {
				showMessage(message, "Completa nombre, correo y un PIN demo de al menos 6 caracteres.", "error");
				return;
			}

			const users = getUsers();
			if (users.some((user) => user.email.toLowerCase() === email)) {
				showMessage(message, "Ese correo ya existe en el entorno demo.", "error");
				return;
			}

			const user = { id: `usr-${Date.now()}`, name, email, role, pin, plan: role === "admin" ? "Admin" : "Basico", createdAt: new Date().toISOString() };
			users.push(user);
			write(STORAGE.users, users);
			startSession(user);
		});
	}

	function startSession(user) {
		write(STORAGE.session, {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			plan: user.plan || "Basico",
			startedAt: new Date().toISOString()
		});
		const params = new URLSearchParams(window.location.search);
		window.location.href = params.get("next") || "dashboard.html";
	}

	function bindGlobalActions() {
		document.querySelectorAll("[data-logout]").forEach((button) => {
			button.addEventListener("click", () => {
				localStorage.removeItem(STORAGE.session);
				window.location.href = "login.html";
			});
		});

		document.querySelectorAll("[data-whatsapp]").forEach((link) => {
			const text = link.dataset.whatsapp || "Hola, quiero solicitar asesoria con ITSA SEGURITY.";
			link.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
			link.setAttribute("target", "_blank");
			link.setAttribute("rel", "noopener");
		});
	}

	function renderCurrentUser() {
		const session = getSession();
		document.querySelectorAll("[data-current-user]").forEach((target) => {
			target.textContent = session ? `${session.name} (${session.role})` : "Sesion demo";
		});
	}

	function renderDashboard() {
		renderMetrics(document.getElementById("dashboardMetrics"));
		renderSites(document.getElementById("sitesList"));
		renderHistoryTable(document.getElementById("historyTable"));
		renderAlerts(document.getElementById("alertsList"));
		renderRecommendations(document.getElementById("recommendationsList"));
		bindSiteForm();
		bindDownloads();
	}

	function bindSiteForm() {
		const form = document.getElementById("siteForm");
		const message = document.querySelector("[data-site-message]");
		if (!form) return;

		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const data = new FormData(form);
			const siteName = String(data.get("siteName") || "").trim();
			const url = String(data.get("url") || "").trim();
			if (!siteName || !isValidPublicUrl(url)) {
				showMessage(message, "Ingresa nombre y una URL publica valida que inicie con http:// o https://.", "error");
				return;
			}
			const session = getSession();
			const sites = getSites();
			const site = {
				id: `site-${Date.now()}`,
				client: session ? session.name : "Cliente Demo",
				siteName,
				url,
				plan: session ? session.plan : "Basico",
				status: "advertencia",
				lastCheck: new Date().toISOString()
			};
			sites.unshift(site);
			write(STORAGE.sites, sites);
			const check = generateCheck(site);
			const checks = getChecks();
			checks.unshift(check);
			write(STORAGE.checks, checks);
			showMessage(message, "Sitio agregado y revision demo ejecutada.", "success");
			form.reset();
			renderDashboard();
		});
	}

	function renderMetrics(container) {
		if (!container) return;
		const sites = getSites();
		const checks = getChecks();
		const latest = checks[0];
		const avg = average(checks.map((check) => check.generalScore));
		const active = sites.filter((site) => site.status !== "critico").length;
		const critical = checks.filter((check) => check.status === "critico").length;
		const seo = average(checks.map((check) => check.seoScore));
		const performance = average(checks.map((check) => check.performanceScore));
		const sslOk = checks.filter((check) => check.sslValid).length;
		const session = getSession();

		const metrics = [
			["Total de sitios", sites.length, "Sitios monitoreados"],
			["Sitios activos", active, "Sin estado critico"],
			["Alertas criticas", critical, "Requieren revision"],
			["Puntaje promedio", `${avg}/100`, "Salud general"],
			["Ultima revision", latest ? formatDate(latest.checkedAt) : "Sin datos", "Historial demo"],
			["Plan actual", session ? session.plan : "Demo", "LocalStorage"],
			["Estado SSL", `${sslOk}/${checks.length || 0}`, "Certificados validos"],
			["SEO / rendimiento", `${seo}/${performance}`, "Promedios"]
		];

		container.innerHTML = metrics.map(([label, value, hint]) => `
			<article class="metric-card">
				<span>${escapeHtml(label)}</span>
				<strong>${escapeHtml(String(value))}</strong>
				<small>${escapeHtml(hint)}</small>
			</article>
		`).join("");
	}

	function renderSites(container) {
		if (!container) return;
		const checksByUrl = new Map(getChecks().map((check) => [check.url, check]));
		container.innerHTML = getSites().map((site) => {
			const check = checksByUrl.get(site.url);
			return `
				<article class="site-card">
					<h3>${escapeHtml(site.siteName)}</h3>
					<p class="platform-muted">${escapeHtml(site.client)} · ${escapeHtml(site.url)}</p>
					<p>Plan: <strong>${escapeHtml(site.plan)}</strong></p>
					${check ? `<p>Score: <strong>${check.generalScore}/100</strong> · HTTP ${check.httpStatus} · ${check.responseTimeMs} ms</p>` : ""}
					<span class="status-badge status-${escapeHtml(site.status)}">${escapeHtml(site.status)}</span>
					<div class="platform-actions" style="margin-top: .8rem;">
						<button class="platform-button secondary" type="button" data-run-check="${escapeHtml(site.id)}">Ejecutar revision</button>
					</div>
				</article>`;
		}).join("");

		container.querySelectorAll("[data-run-check]").forEach((button) => {
			button.addEventListener("click", () => {
				const sites = getSites();
				const site = sites.find((item) => item.id === button.dataset.runCheck);
				if (!site) return;
				const check = generateCheck(site);
				site.status = check.status;
				site.lastCheck = check.checkedAt;
				write(STORAGE.sites, sites);
				const checks = getChecks();
				checks.unshift(check);
				write(STORAGE.checks, checks);
				renderDashboard();
			});
		});
	}

	function renderHistoryTable(container) {
		if (!container) return;
		container.innerHTML = buildChecksTable(getChecks().slice(0, 8));
	}

	function renderAlerts(container) {
		if (!container) return;
		const alerts = getChecks().filter((check) => check.status !== "saludable").slice(0, 6);
		container.innerHTML = alerts.length ? alerts.map((check) => `
			<li><strong>${escapeHtml(check.siteName)}</strong>: ${escapeHtml(check.findings[0] || "Revision pendiente")} <span class="status-badge status-${escapeHtml(check.status)}">${escapeHtml(check.status)}</span></li>
		`).join("") : "<li>No hay alertas activas.</li>";
	}

	function renderRecommendations(container) {
		if (!container) return;
		const recommendations = getChecks().flatMap((check) => check.recommendations.map((item) => ({ siteName: check.siteName, item }))).slice(0, 7);
		container.innerHTML = recommendations.map((entry) => `<li><strong>${escapeHtml(entry.siteName)}:</strong> ${escapeHtml(entry.item)}</li>`).join("");
	}

	function renderReports() {
		const reports = getReports();
		const list = document.getElementById("reportsList");
		if (list) {
			list.innerHTML = reports.map((report) => `
				<article class="report-card">
					<h3>${escapeHtml(report.client)}</h3>
					<p class="platform-muted">${escapeHtml(report.siteName)} · ${escapeHtml(report.url)}</p>
					<p>Fecha: ${escapeHtml(report.date)} · Disponibilidad: <strong>${escapeHtml(report.availability)}</strong></p>
					<p>SSL: ${escapeHtml(report.ssl)} · SEO ${report.seo} · Rendimiento ${report.performance} · Seguridad ${report.security}</p>
					<p>Puntaje general: <strong>${report.generalScore}/100</strong></p>
					<span class="status-badge status-${escapeHtml(report.status)}">${escapeHtml(report.status)}</span>
					<h4>Hallazgos</h4>
					<ul>${report.findings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
					<h4>Recomendaciones</h4>
					<ul>${report.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
				</article>
			`).join("");
		}
		bindDownloads();
	}

	function renderExcelDashboard() {
		renderMetrics(document.getElementById("excelMetrics"));
		const table = document.getElementById("excelTable");
		if (table) table.innerHTML = buildChecksTable(getChecks());
		bindDownloads();
	}

	function renderPowerBi() {
		renderMetrics(document.getElementById("powerbiMetrics"));
		const frame = document.getElementById("powerbiFrame");
		const open = document.getElementById("openPowerbi");
		if (!frame) return;

		if (!POWERBI_EMBED_URL) {
			frame.innerHTML = `
				<div class="powerbi-placeholder">
					<h2>Power BI no configurado</h2>
					<p>El dashboard Power BI aun no esta configurado. Conecta el enlace publico o embed seguro desde Power BI Service.</p>
				</div>`;
			if (open) {
				open.setAttribute("aria-disabled", "true");
				open.classList.add("secondary");
				open.removeAttribute("href");
			}
			return;
		}

		frame.innerHTML = `<iframe title="Power BI Ojo Digital SaaS" src="${escapeHtml(POWERBI_EMBED_URL)}" allowfullscreen></iframe>`;
		if (open) {
			open.href = POWERBI_EMBED_URL;
			open.target = "_blank";
			open.rel = "noopener";
		}
	}

	function renderAdmin() {
		renderMetrics(document.getElementById("adminMetrics"));
		const users = document.getElementById("adminUsers");
		const sites = document.getElementById("adminSites");
		const summary = document.getElementById("adminSummary");
		if (summary) {
			const checks = getChecks();
			const plans = new Set(getSites().map((site) => site.plan));
			summary.innerHTML = `
				<li>Total de usuarios demo: <strong>${getUsers().length}</strong></li>
				<li>Total de sitios registrados: <strong>${getSites().length}</strong></li>
				<li>Total de revisiones: <strong>${checks.length}</strong></li>
				<li>Alertas criticas: <strong>${checks.filter((check) => check.status === "critico").length}</strong></li>
				<li>Planes activos: <strong>${Array.from(plans).join(", ")}</strong></li>`;
		}
		if (users) {
			users.innerHTML = `
				<table class="platform-table"><thead><tr><th>Nombre</th><th>Correo demo</th><th>Rol</th><th>Plan</th></tr></thead><tbody>
				${getUsers().map((user) => `<tr><td>${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td>${escapeHtml(user.role)}</td><td>${escapeHtml(user.plan || "Basico")}</td></tr>`).join("")}
				</tbody></table>`;
		}
		if (sites) {
			sites.innerHTML = `
				<table class="platform-table"><thead><tr><th>Cliente</th><th>Sitio</th><th>URL</th><th>Plan</th><th>Estado</th></tr></thead><tbody>
				${getSites().map((site) => `<tr><td>${escapeHtml(site.client)}</td><td>${escapeHtml(site.siteName)}</td><td>${escapeHtml(site.url)}</td><td>${escapeHtml(site.plan)}</td><td><span class="status-badge status-${escapeHtml(site.status)}">${escapeHtml(site.status)}</span></td></tr>`).join("")}
				</tbody></table>`;
		}
	}

	function bindDownloads() {
		document.querySelectorAll("[data-download]").forEach((button) => {
			if (button.dataset.bound === "true") return;
			button.dataset.bound = "true";
			button.addEventListener("click", () => {
				const type = button.dataset.download;
				if (type === "checks-csv") download("ojo-digital-revisiones.csv", checksToCsv(getChecks()), "text/csv");
				if (type === "reports-json") download("ojo-digital-reportes.json", JSON.stringify(getReports(), null, 2), "application/json");
				if (type === "report-html") download("ojo-digital-reporte-demo.html", reportHtml(getReports()), "text/html");
			});
		});
	}

	function buildChecksTable(checks) {
		return `
			<div class="platform-table-wrap">
				<table class="platform-table">
					<thead>
						<tr><th>Sitio</th><th>URL</th><th>HTTP</th><th>Respuesta</th><th>SSL</th><th>SEO</th><th>Rendimiento</th><th>Seguridad</th><th>General</th><th>Estado</th></tr>
					</thead>
					<tbody>
						${checks.map((check) => `
							<tr>
								<td>${escapeHtml(check.siteName)}</td>
								<td>${escapeHtml(check.url)}</td>
								<td>${check.httpStatus}</td>
								<td>${check.responseTimeMs} ms</td>
								<td>${check.sslValid ? "Valido" : "Revisar"}</td>
								<td>${check.seoScore}</td>
								<td>${check.performanceScore}</td>
								<td>${check.securityScore}</td>
								<td><strong>${check.generalScore}</strong></td>
								<td><span class="status-badge status-${escapeHtml(check.status)}">${escapeHtml(check.status)}</span></td>
							</tr>
						`).join("")}
					</tbody>
				</table>
			</div>`;
	}

	function generateCheck(site) {
		const base = 58 + Math.floor(Math.random() * 38);
		const performance = clamp(base - 8 + Math.floor(Math.random() * 16), 35, 98);
		const seo = clamp(base - 4 + Math.floor(Math.random() * 12), 40, 98);
		const security = clamp(base - 2 + Math.floor(Math.random() * 12), 42, 98);
		const general = Math.round((performance + seo + security) / 3);
		const status = general >= 80 ? "saludable" : general >= 65 ? "advertencia" : "critico";
		const httpStatus = status === "critico" && Math.random() > 0.45 ? 503 : 200;
		return {
			siteName: site.siteName,
			url: site.url,
			status,
			httpStatus,
			responseTimeMs: status === "critico" ? 1700 + Math.floor(Math.random() * 700) : 380 + Math.floor(Math.random() * 720),
			sslValid: true,
			seoScore: seo,
			performanceScore: performance,
			securityScore: security,
			generalScore: general,
			findings: findingsFor(status),
			recommendations: recommendationsFor(status),
			checkedAt: new Date().toISOString()
		};
	}

	function findingsFor(status) {
		if (status === "saludable") return ["Disponibilidad estable", "SSL valido", "Senales SEO principales presentes"];
		if (status === "advertencia") return ["Rendimiento movil mejorable", "Metadatos incompletos", "Revisar politica de backups"];
		return ["Servicio intermitente o lento", "Puntajes tecnicos bajos", "Se requieren correcciones prioritarias"];
	}

	function recommendationsFor(status) {
		if (status === "saludable") return ["Mantener revision mensual", "Agregar datos estructurados", "Medir conversiones"];
		if (status === "advertencia") return ["Optimizar imagenes", "Completar titulos y metadescripciones", "Documentar respaldo"];
		return ["Revisar hosting y logs", "Activar cache y monitoreo de uptime", "Corregir errores criticos antes de campanas"];
	}

	function isValidPublicUrl(value) {
		try {
			const url = new URL(value);
			if (!["http:", "https:"].includes(url.protocol)) return false;
			const host = url.hostname.toLowerCase();
			if (!host.includes(".")) return false;
			if (host === "localhost" || host.endsWith(".local")) return false;
			if (/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) return false;
			return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host);
		} catch (error) {
			return false;
		}
	}

	function createCheck(siteName, url, status, httpStatus, responseTimeMs, sslValid, seoScore, performanceScore, securityScore, checkedAt) {
		return {
			siteName,
			url,
			status,
			httpStatus,
			responseTimeMs,
			sslValid,
			seoScore,
			performanceScore,
			securityScore,
			generalScore: Math.round((seoScore + performanceScore + securityScore) / 3),
			findings: findingsFor(status),
			recommendations: recommendationsFor(status),
			checkedAt
		};
	}

	function createReport(id, client, check, availability, plan) {
		return {
			id,
			client,
			siteName: check.siteName,
			url: check.url,
			date: check.checkedAt.slice(0, 10),
			availability,
			ssl: check.sslValid ? "Valido" : "Revisar",
			seo: check.seoScore,
			performance: check.performanceScore,
			security: check.securityScore,
			generalScore: check.generalScore,
			status: check.status,
			findings: check.findings,
			recommendations: check.recommendations,
			plan
		};
	}

	function getUsers() { return read(STORAGE.users) || []; }
	function getSites() { return read(STORAGE.sites) || []; }
	function getChecks() { return read(STORAGE.checks) || []; }
	function getReports() { return read(STORAGE.reports) || []; }
	function getSession() { return read(STORAGE.session); }

	function read(key) {
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : null;
		} catch (error) {
			return null;
		}
	}

	function write(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	function showMessage(target, text, type) {
		if (!target) return;
		target.textContent = text;
		target.className = `platform-message is-visible is-${type}`;
	}

	function average(values) {
		const clean = values.filter((value) => Number.isFinite(Number(value)));
		if (!clean.length) return 0;
		return Math.round(clean.reduce((sum, value) => sum + Number(value), 0) / clean.length);
	}

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function formatDate(value) {
		try {
			return new Intl.DateTimeFormat("es-NI", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
		} catch (error) {
			return value;
		}
	}

	function checksToCsv(checks) {
		const rows = [[
			"Cliente", "Sitio Web", "URL", "Fecha de Revision", "Disponibilidad", "Codigo HTTP", "Tiempo de Respuesta",
			"SSL Valido", "Puntaje SEO", "Puntaje Rendimiento", "Puntaje Seguridad", "Estado General", "Alertas", "Recomendaciones", "Plan"
		]];
		const sitesByUrl = new Map(getSites().map((site) => [site.url, site]));
		checks.forEach((check) => {
			const site = sitesByUrl.get(check.url) || {};
			rows.push([
				site.client || "Cliente Demo",
				check.siteName,
				check.url,
				check.checkedAt.slice(0, 10),
				check.status === "critico" ? "94.2%" : "99.5%",
				check.httpStatus,
				check.responseTimeMs,
				check.sslValid ? "Si" : "No",
				check.seoScore,
				check.performanceScore,
				check.securityScore,
				check.status,
				check.findings.join("; "),
				check.recommendations.join("; "),
				site.plan || "Basico"
			]);
		});
		return rows.map((row) => row.map(csvCell).join(",")).join("\n");
	}

	function reportHtml(reports) {
		return `<!doctype html><html lang="es"><meta charset="utf-8"><title>Reporte demo Ojo Digital SaaS</title><body><h1>Reporte demo Ojo Digital SaaS</h1>${reports.map((report) => `<article><h2>${escapeHtml(report.client)}</h2><p>${escapeHtml(report.siteName)} - ${escapeHtml(report.url)}</p><p>Score: ${report.generalScore}/100 - Estado: ${escapeHtml(report.status)}</p><h3>Hallazgos</h3><ul>${report.findings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Recomendaciones</h3><ul>${report.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("")}</body></html>`;
	}

	function download(filename, content, type) {
		const blob = new Blob([content], { type: `${type};charset=utf-8` });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
	}

	function csvCell(value) {
		const text = String(value ?? "");
		return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
	}

	function escapeHtml(value) {
		return String(value ?? "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
})();
