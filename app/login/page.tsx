"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../src/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!supabase || !isSupabaseConfigured) {
      setSuccess("Mode démo actif. Configure Supabase pour se connecter.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setSuccess("Connexion réussie.");
    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="glass-card w-full max-w-md p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">A-Genda</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Connexion</h1>
          <p className="mt-2 text-sm text-slate-500">Accédez aux calendriers, menus et tâches de la famille.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              required
            />
          </label>

          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          {success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          Nouveau ici ?{" "}
          <Link href="/register" className="font-semibold text-violet-700 hover:text-violet-600">
            Créer un compte
          </Link>
        </div>
      </section>
    </main>
  );
}
