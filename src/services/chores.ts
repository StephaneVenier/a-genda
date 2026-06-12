import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import type { ChoreTask } from "../types/database";

export async function getChoreTasksByGroup(groupId: string): Promise<ChoreTask[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from("chore_tasks").select("*").eq("group_id", groupId).order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ChoreTask[];
}

export async function createChoreTask(input: Omit<ChoreTask, "id" | "created_at">): Promise<ChoreTask | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...input };
  }
  const { data, error } = await supabase.from("chore_tasks").insert(input).select("*").single();
  if (error) return null;
  return data as ChoreTask;
}

export async function updateChoreTask(id: string, updates: Partial<ChoreTask>): Promise<ChoreTask | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from("chore_tasks").update(updates).eq("id", id).select("*").single();
  if (error) return null;
  return data as ChoreTask;
}

export async function deleteChoreTask(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  const { error } = await supabase.from("chore_tasks").delete().eq("id", id);
  return !error;
}

// TODO: brancher les rappels et les affectations par membre.
