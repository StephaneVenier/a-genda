const groups = [
  {
    name: "Maison",
    members: ["Stéphane", "Claire", "Tom"],
    role: "Administrateur",
    calendars: ["Agenda maison", "Rugby", "École"],
    tone: "bg-violet-50",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    name: "Famille Venier",
    members: ["Parents", "sœur", "famille proche"],
    role: "Membre",
    calendars: ["Repas", "anniversaires", "sorties"],
    tone: "bg-sky-50",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    name: "Belle-famille",
    members: ["beaux-parents", "famille élargie"],
    role: "Membre",
    calendars: ["repas", "vacances", "événements"],
    tone: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
  },
];

const selectedMembers = [
  { initials: "ST", name: "Stéphane", role: "Admin" },
  { initials: "CL", name: "Claire", role: "Membre" },
  { initials: "TO", name: "Tom", role: "Membre" },
];

const invitations = ["mamie@example.com", "tonton@example.com"];

export default function GroupesPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <PageHeader
          title="Mes groupes familiaux"
          subtitle="Gérez les calendriers partagés avec vos proches"
          action={
            <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
              + Créer un groupe
            </button>
          }
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_420px]">
          <article className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {groups.map((group) => (
                <section
                  key={group.name}
                  className={`glass-card ${group.tone} p-5 md:p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-bold text-violet-700 shadow-sm">
                          {group.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900">{group.name}</h2>
                          <p className="text-sm text-slate-500">{group.members.join(" • ")}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Rôle : {group.role}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${group.badge}`}>
                      {group.role}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Calendriers
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.calendars.map((calendar) => (
                        <span
                          key={calendar}
                          className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                        >
                          {calendar}
                        </span>
                      ))}
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
                    Groupe Maison
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Détail du groupe</h3>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  Actif
                </span>
              </div>

              <div className="space-y-3">
                {selectedMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {member.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{member.name}</p>
                      <p className="text-sm text-slate-500">Membre du groupe</p>
                    </div>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        member.role === "Admin"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl">
                  Inviter une personne
                </button>
                <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
                  Créer un calendrier
                </button>
              </div>
            </article>

            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Invitations
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Invitations en attente</h3>
                </div>
              </div>

              <div className="space-y-3">
                {invitations.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                      ✉
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{email}</p>
                      <p className="text-sm text-slate-500">Invitation envoyée</p>
                    </div>
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
import { PageHeader } from "../_components/page-header";
