const groups = [
  {
    title: "Fruits & légumes",
    items: [
      { label: "tomates", checked: true, source: "Ajouté depuis les menus" },
      { label: "salade", checked: false, source: "Ajout manuel" },
      { label: "bananes", checked: false, source: "Ajout manuel" },
    ],
    accent: "from-emerald-50 to-white",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Frais",
    items: [
      { label: "yaourts", checked: true, source: "Ajouté depuis les menus" },
      { label: "lait", checked: false, source: "Ajout manuel" },
      { label: "fromage râpé", checked: false, source: "Ajout manuel" },
    ],
    accent: "from-sky-50 to-white",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    title: "Épicerie",
    items: [
      { label: "pâtes", checked: true, source: "Ajouté depuis les menus" },
      { label: "riz", checked: false, source: "Ajouté depuis les menus" },
      { label: "sauce tomate", checked: false, source: "Ajout manuel" },
    ],
    accent: "from-amber-50 to-white",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    title: "Maison",
    items: [
      { label: "sopalin", checked: false, source: "Ajout manuel" },
      { label: "lessive", checked: true, source: "Ajout manuel" },
      { label: "sacs poubelle", checked: false, source: "Ajout manuel" },
    ],
    accent: "from-violet-50 to-white",
    badge: "bg-violet-100 text-violet-700",
  },
];

const suggestions = ["pâtes", "viande hachée", "riz", "légumes"];

export default function CoursesPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
              A-Genda
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Liste de courses
            </h1>
            <p className="mt-1 text-sm text-slate-500">Articles à acheter cette semaine</p>
          </div>

          <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
            + Ajouter un article
          </button>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_420px]">
          <article className="space-y-4">
            {groups.map((group) => (
              <section
                key={group.title}
                className={`glass-card bg-gradient-to-br ${group.accent} p-5 md:p-6`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{group.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">Liste familiale à cocher</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${group.badge}`}>
                    {group.items.filter((item) => item.checked).length}/{group.items.length} cochés
                  </span>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span
                        className={[
                          "flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold",
                          item.checked
                            ? "border-violet-500 bg-violet-600 text-white"
                            : "border-slate-300 bg-white text-transparent",
                        ].join(" ")}
                      >
                        ✓
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={[
                            "text-sm font-semibold",
                            item.checked ? "text-slate-400 line-through" : "text-slate-800",
                          ].join(" ")}
                        >
                          {item.label}
                        </p>
                      </div>
                      <span
                        className={[
                          "rounded-full px-3 py-1 text-[11px] font-semibold",
                          item.source === "Ajouté depuis les menus"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        {item.source}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="space-y-6">
            <article className="glass-card p-5 md:p-6">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "18", label: "articles" },
                  { value: "5", label: "cochés" },
                  { value: "13", label: "restants" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-slate-50 px-3 py-4">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Suggestion
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Articles générés depuis les menus de la semaine
                  </h3>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  Automatique
                </span>
              </div>

              <div className="rounded-3xl bg-violet-50 p-4">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
                  Tout cocher
                </button>
                <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
                  Vider la liste
                </button>
                <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
                  Générer depuis les menus
                </button>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
