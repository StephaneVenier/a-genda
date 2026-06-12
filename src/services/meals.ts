import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import type { MealPlan } from "../types/database";

export async function getMealsByGroup(groupId: string): Promise<MealPlan[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from("meal_plans").select("*").eq("group_id", groupId).order("date", { ascending: true });
  if (error) return [];
  return (data ?? []) as MealPlan[];
}

export async function createMeal(input: Omit<MealPlan, "id" | "created_at">): Promise<MealPlan | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...input };
  }
  const { data, error } = await supabase.from("meal_plans").insert(input).select("*").single();
  if (error) return null;
  return data as MealPlan;
}

export async function updateMeal(id: string, updates: Partial<MealPlan>): Promise<MealPlan | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from("meal_plans").update(updates).eq("id", id).select("*").single();
  if (error) return null;
  return data as MealPlan;
}

export async function deleteMeal(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  const { error } = await supabase.from("meal_plans").delete().eq("id", id);
  return !error;
}

// TODO: relier les menus à la génération automatique des courses.
