export type ID = string;

export type UserProfile = {
  id: ID;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type FamilyGroup = {
  id: ID;
  name: string;
  color: string | null;
  created_by: ID;
  created_at: string;
};

export type GroupMember = {
  id: ID;
  group_id: ID;
  user_id: ID;
  role: "admin" | "member";
  created_at: string;
};

export type CalendarEvent = {
  id: ID;
  group_id: ID;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string | null;
  category: "École" | "Sport" | "Famille" | "Rendez-vous" | "Courses" | "Important";
  color: string | null;
  created_by: ID;
  created_at: string;
};

export type MealPlan = {
  id: ID;
  group_id: ID;
  date: string;
  meal_type: "Midi" | "Soir";
  title: string;
  notes: string | null;
  created_by: ID;
  created_at: string;
};

export type ShoppingItem = {
  id: ID;
  group_id: ID;
  label: string;
  quantity: string | null;
  category: "Fruits & légumes" | "Frais" | "Épicerie" | "Maison" | "Autre";
  is_done: boolean;
  created_by: ID;
  created_at: string;
};

export type ChoreTask = {
  id: ID;
  group_id: ID;
  title: string;
  description: string | null;
  frequency: string | null;
  assigned_to: string | null;
  due_date: string | null;
  is_done: boolean;
  created_by: ID;
  created_at: string;
};

// TODO: remplacer ces types par le schéma généré Supabase quand les migrations seront prêtes.
