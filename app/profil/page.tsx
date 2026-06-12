const preferences = [
  { label: "Thème", value: "Clair pastel", tone: "bg-violet-100 text-violet-700" },
  { label: "Groupe par défaut", value: "Maison", tone: "bg-sky-100 text-sky-700" },
  { label: "Vue agenda par défaut", value: "Mois", tone: "bg-emerald-100 text-emerald-700" },
  { label: "Notifications", value: "Activées", tone: "bg-rose-100 text-rose-700" },
  { label: "Rappels tâches maison", value: "Activés", tone: "bg-amber-100 text-amber-700" },
];

const stats = [
  { value: "3", label: "groupes" },
  { value: "4", label: "calendriers" },
  { value: "8", label: "événements cette semaine" },
  { value: "12", label: "articles de courses restants" },
  { value: "3", label: "tâches maison à faire" },
];

export default function ProfilPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <PageHeader
          title="Profil"
          subtitle="Vos informations et préférences A-Genda"
          action={
            <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
              Modifier le profil
            </button>
          }
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_420px]">
          <article className="space-y-6">
            <div className="glass-card p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-lg font-bold text-violet-700 shadow-sm">
                    ST
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Stéphane</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Administrateur du groupe Maison
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-violet-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    stephane@example.com
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {preferences.map((item) => (
                <div
                  key={item.label}
                  className="glass-card flex items-center justify-between gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
                  </div>
                  <span className={`rounded-full px-3 py-2 text-xs font-semibold ${item.tone}`}>
                    Actif
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
                    Statistiques familiales
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Vue rapide</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={[
                      "rounded-3xl p-4 text-center shadow-sm",
                      index === 2 || index === 3 ? "col-span-2" : "",
                      "bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
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
                    Actions
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Paramètres</h3>
                </div>
              </div>

              <div className="space-y-3">
                {["Gérer les notifications", "Se déconnecter"].map((item, index) => (
                  <button
                    key={item}
                    className={[
                      "w-full rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5",
                      index === 0
                        ? "bg-white text-slate-700 shadow-sm ring-1 ring-slate-100 hover:shadow-md"
                        : "bg-rose-100 text-rose-700 shadow-sm hover:bg-rose-200",
                    ].join(" ")}
                  >
                    {item}
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
import { PageHeader } from "../_components/page-header";
