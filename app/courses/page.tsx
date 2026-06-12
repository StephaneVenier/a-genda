"use client";

import { useState } from "react";
import { PageHeader } from "../_components/page-header";

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
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleAdd = () => {
    setIsComposerOpen(false);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-24 lg:pb-0">
        <PageHeader
          title="Liste de courses"
          subtitle="Articles à acheter cette semaine"
          action={
            <button
              onClick={() => setIsComposerOpen(true)}
              className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl"
            >
              + Ajouter un article
            </button>
          }
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_420px]">
          <article className="space-y-4">
            {groups.map((group) => (
              <section key={group.title} className={`glass-card bg-gradient-to-br ${group.accent} p-5 md:p-6`}>
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Suggestion</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Articles générés depuis les menus de la semaine</h3>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  Automatique
                </span>
              </div>

              <div className="rounded-3xl bg-violet-50 p-4">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Ajouter un article</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Préparer la liste</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Une fenêtre visuelle simple pour ajouter un article aux courses.
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
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Nom de l’article</span>
                <input
                  type="text"
                  placeholder="Ex. tomates, lessive, pâtes..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Catégorie</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>Fruits &amp; légumes</option>
                  <option>Frais</option>
                  <option>Épicerie</option>
                  <option>Maison</option>
                  <option>Autre</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Quantité</span>
                <input
                  type="text"
                  placeholder="Ex. 2, 1 paquet, 3 bouteilles..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Source</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>Ajout manuel</option>
                  <option>Depuis les menus</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Note optionnelle</span>
                <textarea
                  rows={4}
                  placeholder="Ajoute une précision utile pour les courses..."
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
                onClick={handleAdd}
                className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
              >
                Ajouter
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {toastVisible ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
          Article ajouté
        </div>
      ) : null}
    </main>
  );
}
