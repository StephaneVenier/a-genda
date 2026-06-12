const events = [
  {
    title: "Rugby",
    detail: "Entraînement 17h30",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "École",
    detail: "Sortie 16h30",
    dot: "bg-sky-400",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    title: "Dentiste Tom",
    detail: "15h00",
    dot: "bg-rose-400",
    badge: "bg-rose-100 text-rose-700",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(196,181,253,0.28),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#faf7ff_100%)] px-4 py-6 text-slate-900 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-xl">
              🏠
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-500">
                A-Genda
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">A-Genda</h1>
              <p className="mt-1 text-sm text-slate-500">Maison</p>
            </div>
          </div>

          <button className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500">
            + Nouvel événement
          </button>
        </header>

        <section className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                Aujourd&apos;hui
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Agenda du jour</h2>
            </div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              3 événements
            </span>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <span className={`h-3 w-3 rounded-full ${event.dot}`} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">{event.title}</h3>
                  <p className="text-sm text-slate-500">{event.detail}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.badge}`}>
                  Planning
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
