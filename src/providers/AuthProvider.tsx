"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import type { UserProfile } from "../types/database";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  hasProfile: boolean;
  isProfileReady: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let active = true;

    const client = supabase;

    const loadProfile = async (nextUser: User | null) => {
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        return;
      }

      const { data, error } = await client.from("profiles").select("*").eq("id", nextUser.id).maybeSingle();
      if (!active) return;

      if (error) {
        setProfile(null);
        return;
      }

      setProfile((data as UserProfile | null) ?? null);
    };

    client.auth
      .getSession()
      .then(async ({ data }) => {
        await loadProfile(data.session?.user ?? null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data: subscription } = client.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      await loadProfile(session?.user ?? null);
      if (active) setLoading(false);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      isDemoMode: !isSupabaseConfigured || !supabase,
      hasProfile: Boolean(profile),
      isProfileReady: Boolean(profile),
      signOut: async () => {
        if (!supabase || !isSupabaseConfigured) return;
        await supabase.auth.signOut();
      },
    }),
    [loading, profile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuthContext must be used within AuthProvider");
  return value;
}

// TODO: brancher les invitations de groupe et les RLS avancées quand l'auth sera stabilisée.
