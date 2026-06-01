# Supabase + Next.js Setup

Esta guía deja lista la primera validación técnica de Ojo Digital SaaS con Next.js, Supabase, TypeScript y Tailwind.

## 1. Crear proyecto en Supabase

1. Entra a Supabase.
2. Crea un proyecto nuevo para `Ojo Digital SaaS`.
3. Espera a que la base PostgreSQL termine de inicializar.

## 2. Ejecutar SQL inicial

1. Abre el proyecto en Supabase.
2. Ve a `SQL Editor`.
3. Abre el archivo local `supabase/schema-notes.sql`.
4. Copia el SQL completo.
5. Ejecuta el script.

El script crea `public.notes`, inserta datos de prueba, habilita RLS y crea una política pública de lectura para `anon`.

## 3. Variables de entorno

En Supabase, abre `Project Settings > API` y copia:

1. `Project URL`
2. `anon public key`

En local, crea `ojo-digital-saas/.env.development.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

No pongas `SUPABASE_SERVICE_ROLE_KEY` en componentes cliente. Esa clave solo debe usarse en servidor y nunca debe publicarse en Git.

Para Vercel puedes sincronizar variables con:

```bash
vercel env pull .env.development.local
```

## 4. Ejecutar la app

```bash
cd ojo-digital-saas
npm install
npm run dev
```

Abre:

```txt
http://localhost:3000/notes
```

## 5. Resultado esperado

La ruta `/notes` debe mostrar:

1. Título de prueba de conexión.
2. Tres tarjetas provenientes de `public.notes`.
3. JSON con los datos consultados desde Supabase.

Si falta una variable de entorno o la tabla no existe, la página muestra un error claro.

## 6. Migración futura

El archivo `supabase/ojo-digital-roadmap.sql` documenta las tablas futuras:

- `profiles`
- `plans`
- `subscriptions`
- `sites`
- `site_checks`
- `reports`
- `alerts`

Antes de ejecutar ese roadmap se deben definir RLS, permisos por rol, índices, reglas comerciales y auditoría de datos.
