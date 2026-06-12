"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "../_components/page-header";

type ViewMode = "semaine" | "mois";

type CalendarEvent = {
  title: string;
  tone: string;
  detail?: string;
};

const monthEvents: Record<string, CalendarEvent[]> = {
  "2026-06-02": [{ title: "École", tone: "bg-sky-100 text-sky-700", detail: "Sortie 16h30" }],
  "2026-06-04": [{ title: "Rugby", tone: "bg-emerald-100 text-emerald-700", detail: "Entraînement 17h30" }],
  "2026-06-11": [{ title: "Dentiste", tone: "bg-rose-100 text-rose-700", detail: "15h00" }],
  "2026-06-16": [{ title: "Courses", tone: "bg-amber-100 text-amber-700", detail: "Supermarché" }],
  "2026-06-21": [{ title: "Anniversaire Papi", tone: "bg-fuchsia-100 text-fuchsia-700" }],
  "2026-06-26": [{ title: "Repas famille", tone: "bg-violet-100 text-violet-700" }],
};

const weekEvents: Record<string, CalendarEvent[]> = {
  monday: [{ title: "École", tone: "bg-sky-100 text-sky-700", detail: "Sortie 16h30" }],
  wednesday: [{ title: "Rugby", tone: "bg-emerald-100 text-emerald-700", detail: "17h30" }],
  friday: [{ title: "Courses", tone: "bg-amber-100 text-amber-700", detail: "Supermarché" }],
  sunday: [{ title: "Repas famille", tone: "bg-violet-100 text-violet-700" }],
};

const weekDayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const shortWeekDayNames = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

function startOfWeek(date: Date) {
  const value = new Date(date);
  const day = value.getDay() || 7;
  value.setDate(value.getDate() - day + 1);
  value.setHours(0, 0, 0, 0);
  return value;
}

function addDays(date: Date, amount: number) {
  const value = new Date(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function addMonths(date: Date, amount: number) {
  const value = new Date(date);
  value.setMonth(value.getMonth() + amount);
  return value;
}

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("semaine");
  const [cursor, setCursor] = useState(() => new Date());
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [saveToastVisible, setSaveToastVisible] = useState(false);

  const today = useMemo(() => new Date(), []);
  const todayISO = toISODate(today);

  const weekStart = useMemo(() => startOfWeek(cursor), [cursor]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)), [weekStart]);

  const monthAnchor = useMemo(() => new Date(cursor.getFullYear(), cursor.getMonth(), 1), [cursor]);
  const monthLabel = useMemo(() => formatMonthYear(monthAnchor), [monthAnchor]);
  const weekLabel = useMemo(() => `${formatDayLabel(weekDays[0])} au ${formatDayLabel(weekDays[6])}`, [weekDays]);

  const monthGrid = useMemo(() => {
    const firstDay = new Date(monthAnchor);
    const start = startOfWeek(firstDay);
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  }, [monthAnchor]);

  const todayEvents = [
    { title: "École", detail: "Sortie 16h30", badge: "Famille", dot: "bg-sky-400", badgeStyle: "bg-sky-100 text-sky-700" },
    { title: "Rugby", detail: "Entraînement 17h30", badge: "Sport", dot: "bg-emerald-400", badgeStyle: "bg-emerald-100 text-emerald-700" },
    { title: "Dentiste Tom", detail: "15h00", badge: "Rendez-vous", dot: "bg-rose-400", badgeStyle: "bg-rose-100 text-rose-700" },
  ];

  const upcomingEvents = [
    "Courses au supermarché",
    "Anniversaire Papi samedi",
    "Repas famille dimanche",
  ];

  const movePrev = () => {
    setCursor((current) => addMonths(current, -1));
  };

  const moveNext = () => {
    setCursor((current) => addMonths(current, 1));
  };

  const moveToday = () => {
    setCursor(new Date());
  };

  const openComposer = () => {
    setIsComposerOpen(true);
  };

  const closeComposer = () => {
    setIsComposerOpen(false);
  };

  const handleSave = () => {
    setIsComposerOpen(false);
    setSaveToastVisible(true);
    window.setTimeout(() => setSaveToastVisible(false), 2200);
  };

  const isCurrentMonth = (date: Date) =>
    date.getMonth() === monthAnchor.getMonth() && date.getFullYear() === monthAnchor.getFullYear();

  const monthView = (
    <article className="glass-card p-4 sm:p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Vue mois</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{monthLabel}</h2>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Mois actuel</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {shortWeekDayNames.map((day) => (
          <div key={day} className="py-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
            {day}
          </div>
        ))}

        {monthGrid.map((date) => {
          const iso = toISODate(date);
          const events = monthEvents[iso] ?? [];
          const currentMonth = isCurrentMonth(date);
          const isToday = iso === todayISO;

          return (
            <div
              key={iso}
              className={[
                "min-h-20 rounded-2xl border p-2 transition duration-200 sm:min-h-24 sm:p-2",
                currentMonth ? "border-slate-100 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md" : "border-transparent bg-transparent",
                isToday ? "border-violet-200 bg-violet-50/80 shadow-md shadow-violet-100" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={[
                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold sm:h-9 sm:w-9",
                    isToday ? "bg-violet-600 text-white" : currentMonth ? "text-slate-700" : "text-slate-300",
                  ].join(" ")}
                >
                  {date.getDate()}
                </span>
                {events.length > 0 ? <span className="mt-1 h-2 w-2 rounded-full bg-violet-400" /> : null}
              </div>

              {events.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {events.map((event) => (
                    <div key={event.title} className={`rounded-xl px-2 py-1 text-[10px] font-semibold leading-4 sm:text-[11px] ${event.tone}`}>
                      {event.title}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );

  const weekView = (
    <article className="glass-card p-4 sm:p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Vue semaine</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Semaine du {weekLabel}</h2>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Semaine actuelle</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-7">
        {weekDays.map((date) => {
          const weekdayKey = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][
            date.getDay() === 0 ? 6 : date.getDay() - 1
          ];
          const events = weekEvents[weekdayKey] ?? [];
          const isToday = toISODate(date) === todayISO;

          return (
            <div
              key={toISODate(date)}
              className={[
                "rounded-3xl border p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
                isToday ? "border-violet-200 bg-violet-50/80" : "border-slate-100 bg-white",
              ].join(" ")}
            >
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {shortWeekDayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-2xl font-bold ${isToday ? "text-violet-700" : "text-slate-900"}`}>
                    {date.getDate()}
                  </span>
                  {isToday ? <span className="rounded-full bg-violet-100 px-2 py-1 text-[11px] font-semibold text-violet-700">Aujourd&apos;hui</span> : null}
                </div>
              </div>

              <div className="space-y-2">
                {events.map((event) => (
                  <div key={event.title} className={`rounded-xl px-3 py-2 text-xs font-semibold ${event.tone}`}>
                    {event.title}
                    {event.detail ? <span className="ml-1 font-medium opacity-80">• {event.detail}</span> : null}
                  </div>
                ))}
                {events.length === 0 ? <p className="text-sm text-slate-400">Pas d&apos;événement</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );

  return (
    <main className="min-h-screen pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          title="Agenda"
          subtitle="Gérez les rythmes de la famille avec une vue claire par semaine ou par mois."
          action={
            <button
              onClick={openComposer}
              className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              + Nouvel événement
            </button>
          }
        />

        <article className="glass-card p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100/80 p-1">
              <button
                onClick={() => setViewMode("semaine")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  viewMode === "semaine" ? "bg-white text-violet-700 shadow-sm" : "text-slate-500",
                ].join(" ")}
              >
                Vue semaine
              </button>
              <button
                onClick={() => setViewMode("mois")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  viewMode === "mois" ? "bg-white text-violet-700 shadow-sm" : "text-slate-500",
                ].join(" ")}
              >
                Vue mois
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={movePrev}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Précédent
              </button>
              <button
                onClick={moveToday}
                className="rounded-2xl bg-violet-100 px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Aujourd&apos;hui
              </button>
              <button
                onClick={moveNext}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Suivant
              </button>
            </div>
          </div>
        </article>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_360px]">
          <div className="space-y-6">{viewMode === "mois" ? monthView : weekView}</div>

          <aside className="space-y-6">
            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Aujourd&apos;hui</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">3 événements</h3>
                </div>
              </div>

              <div className="space-y-3">
                {todayEvents.map((event) => (
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
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.badgeStyle}`}>{event.badge}</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="glass-card p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Prochains événements</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Suite</span>
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
      </div>

      {isComposerOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/30 px-0 backdrop-blur-sm sm:items-center sm:px-4">
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            className="absolute inset-0 cursor-default"
            onClick={closeComposer}
          />
          <section className="relative z-10 w-full rounded-t-[2rem] border border-white/70 bg-white p-5 shadow-2xl shadow-violet-200/40 sm:max-w-2xl sm:rounded-[2rem] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Nouvel événement</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Créer un rendez-vous</h3>
                <p className="mt-2 text-sm text-slate-500">Une première fenêtre visuelle pour préparer l’ajout d’événements.</p>
              </div>
              <button
                type="button"
                onClick={closeComposer}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Fermer
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Titre de l’événement</span>
                <input
                  type="text"
                  placeholder="Ex. Rugby, dentiste, repas famille..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Calendrier</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>Maison</option>
                  <option>Rugby</option>
                  <option>École</option>
                  <option>Famille</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Catégorie</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100">
                  <option>École</option>
                  <option>Sport</option>
                  <option>Famille</option>
                  <option>Rendez-vous</option>
                  <option>Courses</option>
                  <option>Important</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Date</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Heure de début</span>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Heure de fin</span>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-violet-50 px-4 py-3 md:col-span-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-200"
                />
                <span className="text-sm font-semibold text-slate-700">Toute la journée</span>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Description optionnelle</span>
                <textarea
                  rows={4}
                  placeholder="Ajoute un détail, une note ou une consigne..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeComposer}
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

      {saveToastVisible ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
          Événement ajouté
        </div>
      ) : null}
    </main>
  );
}
