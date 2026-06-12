const weekDays = [
  {
    day: "Lundi",
    midi: "Cantine",
    soir: "Poulet riz",
    accent: "from-sky-50 to-white",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    day: "Mardi",
    midi: "Restes",
    soir: "Pâtes bolognaise",
    accent: "from-emerald-50 to-white",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    day: "Mercredi",
    midi: "Sandwich",
    soir: "Poisson légumes",
    accent: "from-fuchsia-50 to-white",
    badge: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    day: "Jeudi",
    midi: "Cantine",
    soir: "Omelette salade",
    accent: "from-amber-50 to-white",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    day: "Vendredi",
    midi: "Riz légumes",
    soir: "Pizza maison",
    accent: "from-violet-50 to-white",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    day: "Samedi",
    midi: "Brunch",
    soir: "Tacos famille",
    accent: "from-rose-50 to-white",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    day: "Dimanche",
    midi: "Déjeuner famille",
    soir: "Soupe légère",
    accent: "from-slate-50 to-white",
    badge: "bg-slate-100 text-slate-700",
  },
];

const courseItems = ["pâtes", "viande hachée", "sauce tomate", "riz", "légumes", "yaourts"];

export default function MenusPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
              A-Genda
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Menus de la semaine
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Une vue familiale simple, pastel et facile à lire sur mobile comme sur desktop.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
              Semaine du 12 au 18 mai
            </button>
            <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
              Ajouter un repas
            </button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_420px]">
          <article className="glass-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                  Vue semaine
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Lundi au dimanche</h2>
              </div>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                Midi / Soir
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {weekDays.map((item, index) => (
                <section
                  key={item.day}
                  className={`rounded-3xl bg-gradient-to-br ${item.accent} border border-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}>
                      {item.day}
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {index + 1}/7
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span>🍽️</span>
                        Midi
                      </div>
                      <p className="text-sm text-slate-600">{item.midi}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span>🌙</span>
                        Soir
                      </div>
                      <p className="text-sm text-slate-600">{item.soir}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Courses
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Liste de courses de la semaine
                  </h3>
                </div>
                <button className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
                  Générer les courses
                </button>
              </div>

              <div className="rounded-3xl bg-violet-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Générée automatiquement à partir des menus
                </p>
                <ul className="mt-4 space-y-2">
                  {courseItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
