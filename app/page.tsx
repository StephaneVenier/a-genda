const calendarDays = [
  "", "", "", "1", "2", "3", "4",
  "5", "6", "7", "8", "9", "10", "11",
  "12", "13", "14", "15", "16", "17", "18",
  "19", "20", "21", "22", "23", "24", "25",
  "26", "27", "28", "29", "30", "31", "",
];

const todayEvents = [
  {
    title: "Rugby",
    detail: "Entraînement 17h30",
    badge: "Sport",
    badgeStyle: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
  },
  {
    title: "École",
    detail: "Sortie 16h30",
    badge: "École",
    badgeStyle: "bg-sky-100 text-sky-700",
    dot: "bg-sky-400",
  },
  {
    title: "Dentiste Tom",
    detail: "15h00",
    badge: "Rendez-vous",
    badgeStyle: "bg-rose-100 text-rose-700",
    dot: "bg-rose-400",
  },
];

const upcomingEvents = [
  "Courses — Passage au supermarché",
  "Anniversaire Papi",
  "Repas famille",
];

const categories = [
  { label: "École", style: "bg-sky-100 text-sky-700" },
  { label: "Sport", style: "bg-emerald-100 text-emerald-700" },
  { label: "Famille", style: "bg-fuchsia-100 text-fuchsia-700" },
  { label: "Rendez-vous", style: "bg-rose-100 text-rose-700" },
  { label: "Courses", style: "bg-amber-100 text-amber-700" },
  { label: "Important", style: "bg-violet-100 text-violet-700" },
];

const navItems = ["Agenda", "Menus", "Courses", "Ménage", "Groupes", "Profil"];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:flex lg:flex-col">
          <div className="glass-card flex h-full flex-col p-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-lg">
                  🏠
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
                    A-Genda
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">A-Genda</h1>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-violet-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Groupe
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  Maison
                </div>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    index === 0
                      ? "bg-violet-100 text-violet-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                  {item}
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-white p-4">
                <p className="text-sm font-semibold text-slate-900">Planning familial</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Une vue claire pour organiser les repas, les courses et les rendez-vous.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6 pb-24 lg:pb-0">
          <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-lg">
                🏠
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500 lg:hidden">
                  A-Genda
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">A-Genda</h1>
                <p className="mt-1 text-sm text-slate-500 lg:hidden">Maison</p>
              </div>
            </div>

            <button className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500">
              + Nouvel événement
            </button>
          </header>

          <div className="lg:hidden">
            <div className="glass-card flex items-center justify-between p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Groupe
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">Maison</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                Sélecteur
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
            <section className="space-y-6">
              <article className="glass-card p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                      Calendrier
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Mai 2025</h2>
                  </div>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    Mois
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {["L", "M", "M", "J", "V", "S", "D"].map((day) => (
                    <div
                      key={day}
                      className="py-1 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, index) => {
                    const isToday = day === "12";
                    const hasDot = ["5", "7", "12", "18", "24", "28"].includes(day);
                    return (
                      <div
                        key={`${day}-${index}`}
                        className={[
                          "min-h-20 rounded-2xl border p-2 sm:min-h-24",
                          day
                            ? "border-slate-100 bg-white"
                            : "border-transparent bg-transparent",
                          isToday ? "border-violet-200 bg-violet-50/80" : "shadow-sm",
                        ].join(" ")}
                      >
                        {day ? (
                          <>
                            <div className="flex items-start justify-between">
                              <span
                                className={[
                                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                                  isToday ? "bg-violet-600 text-white" : "text-slate-700",
                                ].join(" ")}
                              >
                                {day}
                              </span>
                              {hasDot ? (
                                <span className="mt-1 h-2 w-2 rounded-full bg-violet-400" />
                              ) : null}
                            </div>
                            {isToday ? (
                              <p className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-violet-700 shadow-sm">
                                Aujourd&apos;hui
                              </p>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Légende</h3>
                  <span className="text-sm text-slate-500">Catégories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      key={category.label}
                      className={`rounded-full px-3 py-2 text-xs font-semibold ${category.style}`}
                    >
                      {category.label}
                    </span>
                  ))}
                </div>
              </article>
            </section>

            <aside className="space-y-6">
              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                      Aujourd&apos;hui
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">3 événements</h3>
                  </div>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    Jour
                  </span>
                </div>

                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <article
                      key={event.title}
                      className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-3 w-3 rounded-full ${event.dot}`} />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-slate-900">{event.title}</h4>
                          <p className="mt-1 text-sm text-slate-500">{event.detail}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.badgeStyle}`}>
                          {event.badge}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </article>

              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Prochains événements</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Suite
                  </span>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                        {index + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/90 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-6 gap-1">
          {navItems.map((item, index) => (
            <div
              key={item}
              className={[
                "flex flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium transition",
                index === 0
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <span className="mb-1 h-2 w-2 rounded-full bg-violet-300" />
              {item}
            </div>
          ))}
        </div>
      </nav>
    </main>
  );
}
