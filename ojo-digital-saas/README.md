# Ojo Digital SaaS

Base inicial de Next.js + Supabase para ITSA SEGURITY.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase SSR

## Variables

Crear `.env.development.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

No publicar `SUPABASE_SERVICE_ROLE_KEY` ni credenciales PostgreSQL.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000/notes
```

## SQL

Ejecutar desde la raíz del repo:

```txt
../supabase/schema-notes.sql
```

La ruta `/notes` consulta `public.notes` con el cliente server de Supabase ubicado en `utils/supabase/server.ts`.
