import Link from "next/link";
import { PageHeader } from "./_components/page-header";

const summaryCards = [
  { title: "3 événements aujourd'hui", value: "3", tone: "bg-violet-100 text-violet-700" },
  { title: "Repas du soir", value: "Poulet riz", tone: "bg-emerald-100 text-emerald-700" },
  { title: "Articles de courses", value: "13 restants", tone: "bg-sky-100 text-sky-700" },
  { title: "Tâches maison", value: "3 à faire", tone: "bg-amber-100 text-amber-700" },
];

const timeline = [
  { time: "08h30", label: "École", tone: "bg-sky-100 text-sky-700" },
  { time: "17h30", label: "Rugby", tone: "bg-emerald-100 text-emerald-700" },
  { time: "19h30", label: "Repas : Poulet riz", tone: "bg-violet-100 text-violet-700" },
  { time: "20h30", label: "Litière du chat", tone: "bg-rose-100 text-rose-700" },
];

const weekHighlights = [
  "Prochain anniversaire : Papi",
  "Prochain match de rugby : samedi",
  "Menus déjà remplis",
  "Courses à finaliser",
];

const quickActions = ["Ajouter un événement", "Ajouter un repas", "Ajouter un article", "Ajouter une tâche"];

const navItems = ["Accueil", "Agenda", "Menus", "Courses", "Ménage"];

const navMap: Record<string, string> = {
  Accueil: "/",
  Agenda: "/agenda",
  Menus: "/menus",
  Courses: "/courses",
  "Ménage": "/menage",
};

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
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
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  Maison
                </div>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item}
                  href={navMap[item]}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200",
                    index === 0
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
          <PageHeader
            title="Bonjour Stéphane"
            subtitle="Voici l'organisation de la famille aujourd'hui"
            action={
              <button className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
                Ajouter un événement
              </button>
            }
          />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
            <section className="space-y-6">
              <article className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                  <div key={card.title} className={`glass-card rounded-3xl p-5 ${card.tone}`}>
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-3 text-2xl font-bold text-slate-900">{card.value}</p>
                  </div>
                ))}
              </article>

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
                  {timeline.map((item) => (
                    <div
                      key={item.time}
                      className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="min-w-20 rounded-full bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700">
                        {item.time}
                      </span>
                      <span className={`rounded-full px-3 py-2 text-sm font-semibold ${item.tone}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                      Cette semaine
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Points clés</h2>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {weekHighlights.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-3xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                          {index + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-500">
                          Semaine
                        </span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="space-y-6">
              <article className="glass-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Accès rapide</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Actions
                  </span>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/92 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-5 items-end gap-1">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={navMap[item]}
              className={[
                "flex flex-col items-center justify-end rounded-2xl px-2 py-2 text-[11px] font-medium transition duration-200",
                index === 0
                  ? "bg-violet-100 text-violet-700 shadow-sm"
                  : "text-slate-500 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <span className="mb-1 h-2 w-2 rounded-full bg-violet-300" />
              {item}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
