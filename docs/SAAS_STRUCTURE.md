# Ojo Digital SaaS - estructura del sitio y plataforma

## Separacion principal

El proyecto queda separado en dos superficies:

- Sitio comercial: paginas publicas de ITSA SEGURITY, servicios, recursos y soluciones.
- Plataforma SaaS demo: carpeta `/plataforma/` con login, dashboard, reportes, Excel, Power BI y admin.

El `index.html` principal conserva su estructura visual. Solo se reorganiza el menu para incluir `Soluciones` con Ojo Digital SaaS y Plataforma con login y dashboard.

## Rutas comerciales

- `/index.html`
- `/servicios/index.html`
- `/servicios/desarrollo-web.html`
- `/servicios/software-a-medida.html`
- `/servicios/ciberseguridad.html`
- `/servicios/seo.html`
- `/servicios/automatizacion-ia.html`
- `/servicios/consultoria-tecnologica.html`
- `/soluciones/ojo-digital.html`
- `/soluciones/plataforma.html`
- `/recursos/index.html`
- `/empresa/metodologia.html`
- `/empresa/tecnologia.html`
- `/contacto/index.html`

## Rutas de plataforma

- `/plataforma/login.html`
- `/plataforma/register.html`
- `/plataforma/dashboard.html`
- `/plataforma/reportes.html`
- `/plataforma/excel-dashboard.html`
- `/plataforma/powerbi.html`
- `/plataforma/admin.html`

## Archivos de soporte

- `/assets/css/platform.css`: estilos aislados para la plataforma.
- `/assets/js/ojo-digital-platform.js`: motor demo con localStorage, roles y simulacion de revisiones.
- `/data/sites-demo.json`: sitios demo.
- `/data/checks-demo.json`: revisiones demo.
- `/data/reports-demo.json`: reportes demo.
- `/data/ojo-digital-demo.csv`: datos tabulares para Excel/Power BI.
- `/assets/templates/ojo-digital-dashboard.xlsx`: plantilla Excel con dashboard, revisiones y diccionario.
- `/assets/templates/ojo-digital-dashboard.csv`: plantilla CSV para importar datos en Excel o Power BI.

## Seguridad de la demo

La demo no ejecuta escaneo intrusivo ni comandos. La validacion de URL en el navegador exige:

- `http://` o `https://`
- dominio publico con punto
- bloqueo de `localhost`, `.local`, `127.*`, `10.*`, `192.168.*` y rangos privados `172.16.*` a `172.31.*`
- rechazo implicito de `javascript:`, `file:` y rutas locales

## Siguiente evolucion

La carpeta `/plataforma/` queda preparada para reemplazar localStorage por Supabase Auth, Postgres, motor real de monitoreo autorizado, reportes PDF y pagos.
