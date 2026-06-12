"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../src/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      router.push("/");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Impossible de créer le compte.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      email,
      display_name: displayName,
    });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="glass-card w-full max-w-md p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">A-Genda</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Créer un compte</h1>
          <p className="mt-2 text-sm text-slate-500">Rejoignez l’organisation familiale en quelques instants.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Prénom / nom affiché</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              required
            />
          </label>

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

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Confirmation du mot de passe</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              required
            />
          </label>

          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Création..." : "Créer un compte"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-semibold text-violet-700 hover:text-violet-600">
            Se connecter
          </Link>
        </div>
      </section>
    </main>
  );
}
