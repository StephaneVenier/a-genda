"use client";

import { useState } from "react";
import { PageHeader } from "../_components/page-header";

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
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = () => {
    setIsComposerOpen(false);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <PageHeader
          title="Menus de la semaine"
          subtitle="Une vue familiale simple, pastel et facile à lire sur mobile comme sur desktop."
          action={
            <div className="flex flex-wrap gap-2">
              <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
                Semaine du 12 au 18 mai
              </button>
              <button
                onClick={() => setIsComposerOpen(true)}
                className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl"
              >
                Ajouter un repas
              </button>
            </div>
          }
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_420px]">
          <article className="glass-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Vue semaine</p>
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
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}>{item.day}</div>
                    <span className="text-xs font-medium text-slate-400">{index + 1}/7</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span>🥗</span>
                        Midi
                      </div>
                      <p className="text-sm text-slate-600">{item.midi}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span>🍲</span>
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Courses</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Liste de courses de la semaine</h3>
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

      {isComposerOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/30 px-0 backdrop-blur-sm sm:items-center sm:px-4">
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsComposerOpen(false)}
          />

          <section className="relative z-10 w-full rounded-t-[2rem] border border-white/70 bg-white p-5 shadow-2xl shadow-violet-200/40 sm:max-w-2xl sm:rounded-[2rem] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Ajouter un repas</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Préparer un menu</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Une fenêtre visuelle simple pour ajouter un repas à la semaine.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Fermer
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Jour</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>Lundi</option>
                  <option>Mardi</option>
                  <option>Mercredi</option>
                  <option>Jeudi</option>
                  <option>Vendredi</option>
                  <option>Samedi</option>
                  <option>Dimanche</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Type de repas</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>Midi</option>
                  <option>Soir</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Nom du repas</span>
                <input
                  type="text"
                  placeholder="Ex. Poulet riz, lasagnes, soupe maison..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Ingrédients principaux</span>
                <input
                  type="text"
                  placeholder="Ex. poulet, riz, carottes, crème..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Notes optionnelles</span>
                <textarea
                  rows={4}
                  placeholder="Ajoute une note, un rappel ou une idée de préparation..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
              >
                Enregistrer
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {toastVisible ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
          Repas ajouté
        </div>
      ) : null}
    </main>
  );
}
