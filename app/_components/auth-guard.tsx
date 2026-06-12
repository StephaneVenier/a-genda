"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../src/hooks/useAuth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, user, isDemoMode } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || isDemoMode) return;
    if (!user && pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
      router.replace("/login");
    }
  }, [isDemoMode, loading, pathname, router, user]);

  if (loading && !isDemoMode) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="glass-card rounded-3xl px-6 py-4 text-sm font-semibold text-slate-600">
          Chargement de la session...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
