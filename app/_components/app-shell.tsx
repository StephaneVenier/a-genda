"use client";

import { AuthProvider } from "../../src/providers/AuthProvider";
import { AuthGuard } from "./auth-guard";
import { AppNavigation } from "./app-navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <AppNavigation />
          <main className="pb-[92px] lg:pb-0">{children}</main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
