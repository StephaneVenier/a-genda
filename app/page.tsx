 "use client";

import { PageHeader } from "./_components/page-header";
import { useAuth } from "../src/hooks/useAuth";

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

export default function HomePage() {
  const { user, profile, isDemoMode } = useAuth();
  const showAuthCard = !user;

  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <PageHeader
          title="Bonjour Stéphane"
          subtitle="Voici l'organisation de la famille aujourd'hui"
          action={
            <button className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
              Ajouter un événement
            </button>
          }
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
          <div className="space-y-6">
            {showAuthCard ? (
              <article className="glass-card p-5 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Connectez votre famille</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Synchronisez les calendriers et les tâches</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {isDemoMode
                        ? "Le mode démo reste actif, mais vous pouvez déjà préparer votre espace Supabase."
                        : "Créez un compte pour commencer à partager les informations de la famille."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href="/login" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
                      Se connecter
                    </a>
                    <a href="/register" className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200">
                      Créer un compte
                    </a>
                  </div>
                </div>
              </article>
            ) : (
              <article className="glass-card p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Mon profil</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{profile?.display_name ?? "Stéphane"}</h2>
                    <p className="mt-1 text-sm text-slate-500">{profile?.email ?? "stephane@example.com"}</p>
                  </div>
                  <a href="/profil" className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200">
                    Ouvrir le profil
                  </a>
                </div>
              </article>
            )}

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
          </div>

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
        </section>
      </div>
    </main>
  );
}
