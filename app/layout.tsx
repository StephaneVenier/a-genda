import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "A-Genda",
  description: "Maquette statique familiale A-Genda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = ["Accueil", "Agenda", "Menus", "Courses", "Ménage", "Groupes", "Profil"];
  const navMap: Record<string, string> = {
    Accueil: "/",
    Agenda: "/agenda",
    Menus: "/menus",
    Courses: "/courses",
    "Ménage": "/menage",
    Groupes: "/groupes",
    Profil: "/profil",
  };

  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(196,181,253,0.35),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(216,180,254,0.18),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#faf7ff_100%)] text-slate-900">
        <div className="min-h-screen lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
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
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                    Maison
                  </div>
                </div>
              </div>

              <nav className="mt-6 space-y-1.5">
                {navItems.map((item, index) => (
                  <Link
                    key={item}
                    href={navMap[item]}
                    className={[
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200",
                      index === 0
                        ? "bg-violet-100 text-violet-800 ring-1 ring-violet-200 shadow-sm"
                        : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-2.5 w-2.5 rounded-full",
                        index === 0 ? "bg-violet-600" : "bg-violet-300",
                      ].join(" ")}
                    />
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <main className="pb-[92px] lg:pb-0">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/92 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-3xl grid-cols-5 items-end gap-1">
            {navItems.slice(0, 5).map((item, index) => (
              <Link
                key={item}
                href={navMap[item]}
                className={[
                  "flex flex-col items-center justify-end rounded-2xl px-2 py-2 text-[11px] font-medium transition duration-200",
                  index === 0
                    ? "bg-violet-100 text-violet-800 ring-1 ring-violet-200 shadow-sm"
                    : "text-slate-500 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <span
                  className={[
                    "mb-1 h-2 w-2 rounded-full",
                    index === 0 ? "bg-violet-600" : "bg-violet-300",
                  ].join(" ")}
                />
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  );
}
