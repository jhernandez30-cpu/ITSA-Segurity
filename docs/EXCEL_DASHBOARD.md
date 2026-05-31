# Dashboard Excel de Ojo Digital SaaS

## Archivo inicial

La plantilla inicial esta en:

`/assets/templates/ojo-digital-dashboard.xlsx`

Tambien se entrega una version CSV compatible con Excel y Power BI:

`/assets/templates/ojo-digital-dashboard.csv`

Tambien hay datos demo en:

`/data/ojo-digital-demo.csv`

El archivo XLSX incluye hoja de dashboard, tabla de revisiones demo y diccionario de campos. El CSV queda como formato simple para importacion, Power BI o exportaciones futuras desde localStorage.

## Columnas requeridas

- Cliente
- Sitio Web
- URL
- Fecha de Revision
- Disponibilidad
- Codigo HTTP
- Tiempo de Respuesta
- SSL Valido
- Puntaje SEO
- Puntaje Rendimiento
- Puntaje Seguridad
- Estado General
- Alertas
- Recomendaciones
- Plan

## Uso como dashboard inicial

1. Abrir el XLSX en Excel.
2. Actualizar la hoja `Revisiones` con datos reales o exportados.
3. Usar el dashboard inicial para revisar promedios de disponibilidad, SEO, rendimiento y seguridad.
4. Crear graficos adicionales o segmentadores por Cliente, Plan y Estado General.
5. Guardar una copia por cliente cuando se use en produccion.

## Actualizacion de datos

En la demo, `/plataforma/excel-dashboard.html` permite exportar las revisiones actuales a CSV desde localStorage.

En produccion, el motor real debe escribir revisiones en base de datos y generar CSV/XLSX o alimentar Power BI.

## Migracion a Power BI

Cuando exista volumen de datos:

1. Centralizar revisiones en Postgres o Supabase.
2. Conectar Power BI al origen real.
3. Reemplazar CSV manual por flujo automatizado.
4. Mantener Excel como formato descargable para clientes que lo soliciten.
