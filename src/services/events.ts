import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import type { CalendarEvent } from "../types/database";

const demoEvents: CalendarEvent[] = [];

export async function getEventsByGroup(groupId: string): Promise<CalendarEvent[]> {
  if (!isSupabaseConfigured || !supabase) return demoEvents.filter((event) => event.group_id === groupId);
  const { data, error } = await supabase.from("calendar_events").select("*").eq("group_id", groupId).order("start_at", { ascending: true });
  if (error) return demoEvents;
  return (data ?? []) as CalendarEvent[];
}

export async function createEvent(input: Omit<CalendarEvent, "id" | "created_at">): Promise<CalendarEvent | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...input };
  }
  const { data, error } = await supabase.from("calendar_events").insert(input).select("*").single();
  if (error) return null;
  return data as CalendarEvent;
}

export async function updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from("calendar_events").update(updates).eq("id", id).select("*").single();
  if (error) return null;
  return data as CalendarEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  const { error } = await supabase.from("calendar_events").delete().eq("id", id);
  return !error;
}

// TODO: ajouter le filtrage par groupe actif et par période.
