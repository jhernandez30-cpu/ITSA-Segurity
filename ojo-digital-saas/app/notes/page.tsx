import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

type Note = {
  id: number;
  title: string;
};

function ErrorView({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          ITSA SEGURITY · Ojo Digital SaaS
        </p>
        <h1 className="mt-3 text-2xl font-bold">
          Error al consultar Supabase
        </h1>
        <pre className="mt-4 overflow-auto rounded-lg bg-red-950 p-4 text-sm text-red-200">
          {message}
        </pre>
      </section>
    </main>
  );
}

export default async function Notes() {
  let supabase;

  try {
    supabase = await createClient();
  } catch (error) {
    return (
      <ErrorView
        message={error instanceof Error ? error.message : "Error desconocido"}
      />
    );
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id,title")
    .order("id", { ascending: true });

  if (error) {
    return <ErrorView message={error.message} />;
  }

  const noteRows = (notes ?? []) as Note[];

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          ITSA SEGURITY · Ojo Digital SaaS
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Prueba de conexión con Supabase
        </h1>

        <p className="mt-4 text-slate-300">
          Esta página consulta datos reales desde la tabla notes en Supabase.
        </p>

        <div className="mt-8 space-y-4">
          {noteRows.map((note) => (
            <article
              key={note.id}
              className="rounded-2xl border border-cyan-500/20 bg-white/5 p-5 shadow-lg"
            >
              <p className="text-lg">{note.title}</p>
            </article>
          ))}
        </div>

        <pre className="mt-8 overflow-auto rounded-xl bg-black/40 p-4 text-sm text-cyan-100">
          {JSON.stringify(noteRows, null, 2)}
        </pre>
      </section>
    </main>
  );
}
