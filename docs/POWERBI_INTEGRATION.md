# Integracion Power BI para Ojo Digital SaaS

## Objetivo

Power BI debe mostrar indicadores de monitoreo autorizado: disponibilidad, SSL, SEO, rendimiento, seguridad, alertas, clientes, planes y recomendaciones.

## Datos sugeridos

Usar como origen inicial:

- `/data/ojo-digital-demo.csv`
- `/assets/templates/ojo-digital-dashboard.xlsx`
- `/assets/templates/ojo-digital-dashboard.csv`

Columnas base:

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

## Crear reporte

1. Abrir Power BI Desktop.
2. Importar el XLSX/CSV demo o una base real.
3. Limpiar tipos de datos: fechas, numeros, porcentajes y texto.
4. Crear medidas:
   - Promedio de Puntaje SEO
   - Promedio de Puntaje Rendimiento
   - Promedio de Puntaje Seguridad
   - Conteo de alertas criticas
   - Sitios por estado
   - Sitios por plan
5. Crear visuales:
   - Tarjetas KPI
   - Tabla de revisiones
   - Barras por cliente
   - Linea de puntaje por fecha
   - Segmentadores por plan y estado

## Publicar o embeber

1. Publicar el reporte en Power BI Service.
2. Configurar permisos del workspace.
3. Si se usa embed publico, confirmar que no contiene datos sensibles.
4. Si se usa embed seguro, implementar autenticacion y tokens en backend.
5. Colocar la URL en `POWERBI_EMBED_URL` del entorno o en la constante `POWERBI_EMBED_URL` de `/assets/js/ojo-digital-platform.js`.

## Seguridad

- No publicar reportes con datos privados mediante enlace publico.
- No exponer tokens de Power BI en JavaScript del cliente.
- Para produccion, generar embed tokens desde backend.
- Separar datos por cliente antes de habilitar acceso real.
