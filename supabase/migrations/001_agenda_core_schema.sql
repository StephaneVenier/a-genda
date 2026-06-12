create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.family_groups(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'member',
  created_at timestamptz default now(),
  unique (group_id, user_id)
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.family_groups(id) on delete cascade,
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz,
  category text,
  color text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.family_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.calendar_events enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "groups_select_members"
  on public.family_groups
  for select
  using (
    exists (
      select 1
      from public.group_members gm
      where gm.group_id = family_groups.id
        and gm.user_id = auth.uid()
    )
  );

create policy "groups_insert_authenticated"
  on public.family_groups
  for insert
  with check (auth.uid() is not null);

create policy "groups_update_creator"
  on public.family_groups
  for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy "groups_delete_creator"
  on public.family_groups
  for delete
  using (created_by = auth.uid());

create policy "members_select_membership"
  on public.group_members
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.group_members gm
      where gm.group_id = group_members.group_id
        and gm.user_id = auth.uid()
    )
  );

create policy "members_insert_creator"
  on public.group_members
  for insert
  with check (
    exists (
      select 1
      from public.family_groups fg
      where fg.id = group_id
        and fg.created_by = auth.uid()
    )
  );

create policy "members_delete_creator"
  on public.group_members
  for delete
  using (
    exists (
      select 1
      from public.family_groups fg
      where fg.id = group_members.group_id
        and fg.created_by = auth.uid()
    )
  );

create policy "events_select_members"
  on public.calendar_events
  for select
  using (
    exists (
      select 1
      from public.group_members gm
      where gm.group_id = calendar_events.group_id
        and gm.user_id = auth.uid()
    )
  );

create policy "events_insert_members"
  on public.calendar_events
  for insert
  with check (
    exists (
      select 1
      from public.group_members gm
      where gm.group_id = group_id
        and gm.user_id = auth.uid()
    )
  );

create policy "events_update_creator"
  on public.calendar_events
  for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy "events_delete_creator"
  on public.calendar_events
  for delete
  using (created_by = auth.uid());

create index if not exists idx_group_members_group_id on public.group_members (group_id);
create index if not exists idx_group_members_user_id on public.group_members (user_id);
create index if not exists idx_calendar_events_group_id on public.calendar_events (group_id);
create index if not exists idx_calendar_events_start_at on public.calendar_events (start_at);
create index if not exists idx_family_groups_created_by on public.family_groups (created_by);

-- TODO: ajouter les tables meal_plans, shopping_items et chore_tasks dans une migration suivante.
-- TODO: brancher les invitations de groupe avec leurs politiques dédiées.
