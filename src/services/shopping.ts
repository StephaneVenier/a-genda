import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import type { ShoppingItem } from "../types/database";

export async function getShoppingItemsByGroup(groupId: string): Promise<ShoppingItem[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from("shopping_items").select("*").eq("group_id", groupId).order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ShoppingItem[];
}

export async function createShoppingItem(input: Omit<ShoppingItem, "id" | "created_at">): Promise<ShoppingItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...input };
  }
  const { data, error } = await supabase.from("shopping_items").insert(input).select("*").single();
  if (error) return null;
  return data as ShoppingItem;
}

export async function updateShoppingItem(id: string, updates: Partial<ShoppingItem>): Promise<ShoppingItem | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from("shopping_items").update(updates).eq("id", id).select("*").single();
  if (error) return null;
  return data as ShoppingItem;
}

export async function deleteShoppingItem(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  const { error } = await supabase.from("shopping_items").delete().eq("id", id);
  return !error;
}

// TODO: permettre la génération des courses depuis les menus de la semaine.
