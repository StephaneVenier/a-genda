import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "./_components/app-shell";

export const metadata: Metadata = {
  title: "A-Genda",
  description: "Maquette statique familiale A-Genda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(196,181,253,0.35),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(216,180,254,0.18),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#faf7ff_100%)] text-slate-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
