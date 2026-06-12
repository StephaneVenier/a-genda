const todayTasks = [
  {
    title: "Nettoyer la litière du chat",
    assignee: "Camille",
    frequency: "Aujourd'hui",
    status: "À faire",
    tone: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
  },
  {
    title: "Sortir les poubelles",
    assignee: "Tom",
    frequency: "Aujourd'hui",
    status: "Fait",
    tone: "bg-sky-100 text-sky-700",
    dot: "bg-sky-400",
  },
  {
    title: "Lancer une lessive",
    assignee: "Julie",
    frequency: "Aujourd'hui",
    status: "À faire",
    tone: "bg-violet-100 text-violet-700",
    dot: "bg-violet-400",
  },
  {
    title: "Arroser les plantes",
    assignee: "Lina",
    frequency: "Aujourd'hui",
    status: "À faire",
    tone: "bg-rose-100 text-rose-700",
    dot: "bg-rose-400",
  },
];

const recurringTasks = [
  "Litière du chat — tous les 2 jours",
  "Aspirateur salon — chaque mercredi",
  "Salle de bain — chaque samedi",
  "Changer les draps — toutes les 2 semaines",
  "Courses maison — chaque dimanche",
];

export default function MenagePage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
              A-Genda
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Ménage & tâches maison
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Les petites missions pour garder la maison organisée
            </p>
          </div>

          <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
            + Ajouter une tâche
          </button>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_420px]">
          <article className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                  Tâches du jour
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Aujourd&apos;hui</h2>
              </div>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                4 tâches
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {todayTasks.map((task) => (
                <article
                  key={task.title}
                  className="rounded-3xl border border-white bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 h-3 w-3 rounded-full ${task.dot}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">Assignée à {task.assignee}</p>
                      </div>
                    </div>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        task.status === "Fait"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700",
                      ].join(" ")}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <span className={`rounded-full px-3 py-1 ${task.tone}`}>{task.frequency}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Maison</span>
                  </div>

                  <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100 transition hover:-translate-y-0.5 hover:shadow-md">
                    Marquer comme fait
                  </button>
                </article>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Résumé
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Vue rapide</h3>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  Maison
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "4", label: "tâches aujourd'hui" },
                  { value: "1", label: "terminée" },
                  { value: "3", label: "restantes" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-slate-50 px-3 py-4">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl bg-violet-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Prochaine tâche
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Litière du chat</p>
              </div>
            </article>

            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Tâches récurrentes
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Routine maison</h3>
                </div>
              </div>

              <div className="space-y-3">
                {recurringTasks.map((task, index) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {index + 1}
                    </span>
                    {task}
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
