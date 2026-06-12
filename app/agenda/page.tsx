import Link from "next/link";

const events = [
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

const upcomingEvents = ["Courses — Passage au supermarché", "Anniversaire Papi", "Repas famille"];

const navItems = ["Accueil", "Agenda", "Menus", "Courses", "Ménage"];
const navMap: Record<string, string> = {
  Accueil: "/",
  Agenda: "/agenda",
  Menus: "/menus",
  Courses: "/courses",
  "Ménage": "/menage",
};

export default function AgendaPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:flex lg:flex-col">
          <div className="glass-card flex h-full flex-col p-5">
            <div className="space-y-6">
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

              <div className="rounded-3xl bg-violet-50 px-4 py-3">
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
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={navMap[item]}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200",
                    item === "Agenda"
                      ? "bg-violet-100 text-violet-700 shadow-sm"
                      : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm",
                  ].join(" ")}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <section className="space-y-6 pb-24 lg:pb-0">
          <header className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
                Agenda
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Calendrier familial
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Vue mensuelle, douce et lisible pour suivre la famille
              </p>
            </div>

            <button className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
              + Nouvel événement
            </button>
          </header>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Aujourd&apos;hui
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Timeline simple</h2>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  Jour
                </span>
              </div>

              <div className="space-y-3">
                {[
                  ["08h30", "École", "bg-sky-100 text-sky-700"],
                  ["17h30", "Rugby", "bg-emerald-100 text-emerald-700"],
                  ["19h30", "Repas : Poulet riz", "bg-violet-100 text-violet-700"],
                  ["20h30", "Litière du chat", "bg-rose-100 text-rose-700"],
                ].map(([time, label, tone]) => (
                  <div
                    key={time}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="min-w-20 rounded-full bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700">
                      {time}
                    </span>
                    <span className={`rounded-full px-3 py-2 text-sm font-semibold ${tone}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <aside className="space-y-6">
              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                      Aujourd&apos;hui
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">3 événements</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {events.map((event) => (
                    <article
                      key={event.title}
                      className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
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
    </main>
  );
}
