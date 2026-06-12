# Supabase A-Genda V1

## Ordre d'exécution

1. Créer le projet Supabase si ce n'est pas déjà fait.
2. Configurer les variables `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Appliquer la migration :
   - `supabase/migrations/001_agenda_core_schema.sql`
4. Vérifier les politiques RLS dans le dashboard Supabase.

## Tables créées

- `profiles`
- `family_groups`
- `group_members`
- `calendar_events`

## Notes

- L'application garde un fallback mocké si Supabase n'est pas configuré.
- Menus, Courses et Ménage viendront dans une migration suivante.
- Prévoir ensuite les tables `meal_plans`, `shopping_items` et `chore_tasks`.
- TODO : authentification, invitations de groupe, RLS avancée, synchronisation par groupe.
