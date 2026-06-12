"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/hooks/useAuth";

const navItems = ["Accueil", "Agenda", "Menus", "Courses", "Ménage", "Groupes", "Profil"];
const navMap: Record<string, string> = {
  Accueil: "/",
  Agenda: "/agenda",
  Menus: "/menus",
  Courses: "/courses",
  Ménage: "/menage",
  Groupes: "/groupes",
  Profil: "/profil",
};

export function AppNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isDemoMode, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col">
        <div className="glass-card flex h-full flex-col p-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-lg">🏠</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">A-Genda</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">A-Genda</h1>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-violet-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">Compte</p>
              {user && profile ? (
                <div className="mt-2 space-y-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    {(profile.display_name ?? profile.email ?? "AG").slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{profile.display_name ?? "Utilisateur"}</p>
                    <p className="truncate text-xs text-slate-500">{profile.email}</p>
                  </div>
                </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/profil" className="rounded-full bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-sm">
                      Mon profil
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                  <Link href="/login" className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    Connexion
                  </Link>
                  <Link href="/register" className="rounded-full bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">
                    Inscription
                  </Link>
                  </div>
                  <p className="text-xs text-slate-500">Accédez à votre compte ou créez-en un pour synchroniser la famille.</p>
                </div>
              )}
              <p className="mt-2 text-xs text-slate-500">{isDemoMode ? "Mode démo actif" : "Supabase connecté"}</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const href = navMap[item];
              const active = pathname === href || (item === "Accueil" && pathname === "/");
              return (
                <Link
                  key={item}
                  href={href}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200",
                    active
                      ? "bg-violet-100 text-violet-800 ring-1 ring-violet-200 shadow-sm"
                      : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm",
                  ].join(" ")}
                >
                  <span className={["h-2.5 w-2.5 rounded-full", active ? "bg-violet-600" : "bg-violet-300"].join(" ")} />
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/92 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-3xl gap-2">
          <div className="grid grid-cols-5 items-end gap-1">
            {navItems.slice(0, 5).map((item) => {
              const href = navMap[item];
              const active = pathname === href || (item === "Accueil" && pathname === "/");
              return (
                <Link
                  key={item}
                  href={href}
                  className={[
                    "flex flex-col items-center justify-end rounded-2xl px-2 py-2 text-[11px] font-medium transition duration-200",
                    active
                      ? "bg-violet-100 text-violet-800 ring-1 ring-violet-200 shadow-sm"
                      : "text-slate-500 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  <span className={["mb-1 h-2 w-2 rounded-full", active ? "bg-violet-600" : "bg-violet-300"].join(" ")} />
                  {item}
                </Link>
              );
            })}
          </div>

          {user && profile ? (
            <div className="grid grid-cols-2 gap-2 px-1">
              <Link href="/profil" className="rounded-2xl bg-violet-100 px-3 py-3 text-center text-xs font-semibold text-violet-800 ring-1 ring-violet-200">
                Mon profil
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-2xl bg-slate-100 px-3 py-3 text-xs font-semibold text-slate-700"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 px-1">
              <Link href="/login" className="rounded-2xl bg-white px-3 py-3 text-center text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
                Connexion
              </Link>
              <Link href="/register" className="rounded-2xl bg-violet-600 px-3 py-3 text-center text-xs font-semibold text-white shadow-sm">
                Créer un compte
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
