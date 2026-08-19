-- ==========================================================
-- Rattrapage : colonnes/policy ajoutées après la première exécution
-- de 0001_init.sql (titre + note des témoignages, avis publics).
-- Écrit avec "if not exists" / "drop ... if exists" pour pouvoir être
-- rejoué sans erreur même si une partie a déjà été appliquée.
-- ==========================================================
alter table testimonials add column if not exists title text;
alter table testimonials add column if not exists rating smallint check (rating between 1 and 5);

drop policy if exists "testimonials: admin write" on testimonials;
drop policy if exists "testimonials: public submit" on testimonials;
create policy "testimonials: public submit" on testimonials for insert with check (published = false);

-- ==========================================================
-- Bibliothèque de vidéos (admin) : upload une fois, réutilisable
-- pour plusieurs leçons/élèves sans re-upload à chaque fois.
-- ==========================================================
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  path text not null,
  created_at timestamptz not null default now()
);

alter table videos enable row level security;

drop policy if exists "videos: admin read" on videos;
drop policy if exists "videos: admin write" on videos;
drop policy if exists "videos: admin delete" on videos;
create policy "videos: admin read" on videos for select using (public.is_admin());
create policy "videos: admin write" on videos for insert with check (public.is_admin());
create policy "videos: admin delete" on videos for delete using (public.is_admin());
