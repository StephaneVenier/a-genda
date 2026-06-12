import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import type { FamilyGroup, GroupMember } from "../types/database";

const demoGroups: FamilyGroup[] = [
  { id: "demo-house", name: "Maison", color: "#a78bfa", created_by: "demo-user", created_at: new Date().toISOString() },
];

const demoMembers: GroupMember[] = [
  { id: "demo-member", group_id: "demo-house", user_id: "demo-user", role: "admin", created_at: new Date().toISOString() },
];

export async function getGroups(): Promise<FamilyGroup[]> {
  if (!isSupabaseConfigured || !supabase) return demoGroups;
  const { data, error } = await supabase.from("family_groups").select("*").order("created_at", { ascending: false });
  if (error) return demoGroups;
  return (data ?? []) as FamilyGroup[];
}

export async function createGroup(input: Pick<FamilyGroup, "name" | "color" | "created_by">): Promise<FamilyGroup | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...input };
  }
  const { data, error } = await supabase.from("family_groups").insert(input).select("*").single();
  if (error) return null;
  return data as FamilyGroup;
}

export async function updateGroup(id: string, updates: Partial<FamilyGroup>): Promise<FamilyGroup | null> {
  if (!isSupabaseConfigured || !supabase) {
    return { ...(demoGroups[0] as FamilyGroup), ...updates, id };
  }
  const { data, error } = await supabase.from("family_groups").update(updates).eq("id", id).select("*").single();
  if (error) return null;
  return data as FamilyGroup;
}

export async function deleteGroup(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  const { error } = await supabase.from("family_groups").delete().eq("id", id);
  return !error;
}

export async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
  if (!isSupabaseConfigured || !supabase) return demoMembers.filter((member) => member.group_id === groupId);
  const { data, error } = await supabase.from("group_members").select("*").eq("group_id", groupId).order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as GroupMember[];
}

// TODO: intégrer les invitations de groupe quand l'écran dédié sera prêt.
