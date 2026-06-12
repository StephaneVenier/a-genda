"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "../_components/page-header";
import { useAuth } from "../../src/hooks/useAuth";
import { isSupabaseConfigured, supabase } from "../../src/lib/supabaseClient";

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
  const router = useRouter();
  const { user, profile, signOut, isDemoMode } = useAuth();
  const [repairMessage, setRepairMessage] = useState<string | null>(null);
  const [repairLoading, setRepairLoading] = useState(false);

  const displayName = profile?.display_name ?? "Stéphane";
  const email = profile?.email ?? "stephane@example.com";
  const createdAt = profile?.created_at
    ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(profile.created_at))
    : "Compte de démonstration";

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  const handleRepairProfile = async () => {
    if (!user || !isSupabaseConfigured || !supabase) return;
    setRepairLoading(true);
    setRepairMessage(null);

    const displayName = user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "Utilisateur";
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email ?? "",
      display_name: displayName,
    });

    if (error) {
      setRepairMessage("Impossible de créer le profil. Vérifiez la configuration Supabase.");
    } else {
      setRepairMessage("Profil créé ou réparé avec succès.");
      router.refresh();
    }

    setRepairLoading(false);
  };

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
                    {displayName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{displayName}</h2>
                    <p className="mt-1 text-sm text-slate-500">Administrateur du groupe Maison</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-violet-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{email}</p>
                  <p className="mt-2 text-xs text-slate-500">Créé le {createdAt}</p>
                </div>
              </div>
            </div>

            {user && !profile ? (
              <div className="glass-card p-5 md:p-6">
                <div className="rounded-3xl bg-amber-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                    Profil à initialiser
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Votre compte est connecté, mais votre profil n&apos;est pas encore créé.
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Vous pouvez créer ou réparer le profil maintenant sans quitter A-Genda.
                  </p>
                  <button
                    onClick={handleRepairProfile}
                    disabled={repairLoading}
                    className="mt-4 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {repairLoading ? "Réparation..." : "Créer / réparer mon profil"}
                  </button>
                  {repairMessage ? (
                    <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                      {repairMessage}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

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
                  <span className={`rounded-full px-3 py-2 text-xs font-semibold ${item.tone}`}>Actif</span>
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
                      "rounded-3xl p-4 text-center shadow-sm bg-slate-50",
                      index === 2 || index === 3 ? "col-span-2" : "",
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Actions</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Paramètres</h3>
                </div>
              </div>

              <div className="space-y-3">
                {["Gérer les notifications", "Se déconnecter"].map((item, index) => (
                  <button
                    key={item}
                    onClick={index === 1 ? handleSignOut : undefined}
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

            <article className="glass-card p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Connexion</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    {isDemoMode ? "Mode démo" : "Connecté à Supabase"}
                  </h3>
                </div>
                <span
                  className={[
                    "rounded-full px-3 py-2 text-xs font-semibold",
                    isDemoMode ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-700",
                  ].join(" ")}
                >
                  {isDemoMode ? "Hors ligne" : "En ligne"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                {isDemoMode
                  ? "L'interface continue d'utiliser les données mockées tant que la base n'est pas branchée."
                  : "Votre session Supabase est active et les données peuvent être synchronisées."}
              </p>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
