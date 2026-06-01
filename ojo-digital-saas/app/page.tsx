export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          ITSA SEGURITY · Ojo Digital SaaS
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold">
          Base Next.js + Supabase para el dashboard real.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Esta app valida conexión a Supabase, variables de entorno y consulta
          server-side antes de avanzar a clientes, sitios monitoreados, reportes
          y alertas.
        </p>
        <a
          className="mt-8 inline-flex w-fit rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          href="/notes"
        >
          Ver prueba /notes
        </a>
      </section>
    </main>
  );
}
