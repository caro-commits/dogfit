-- DOGFIT LMS — schéma initial
-- À exécuter dans l'éditeur SQL Supabase (ou via `supabase db push`)
-- une fois le projet créé.

-- ==========================================================
-- Extensions
-- ==========================================================
create extension if not exists "pgcrypto";

-- ==========================================================
-- Profiles (1 ligne par utilisateur Supabase Auth)
-- ==========================================================
create type user_role as enum ('student', 'admin');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role user_role not null default 'student',
  created_at timestamptz not null default now()
);

-- Crée automatiquement un profil "student" à l'inscription
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================================
-- Courses & Lessons
-- ==========================================================
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  price_cents integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  title text not null,
  position integer not null default 0,
  video_url text,
  pdf_url text,
  content text,
  created_at timestamptz not null default now()
);

-- ==========================================================
-- Enrollments (accès élève à un cours)
-- ==========================================================
create type enrollment_source as enum ('manual', 'stripe');

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  course_id uuid not null references courses (id) on delete cascade,
  source enrollment_source not null default 'manual',
  stripe_customer_id text,
  granted_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- ==========================================================
-- Exercises, Submissions, Corrections
-- ==========================================================
create table exercises (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  lesson_id uuid references lessons (id) on delete set null,
  title text not null,
  description text not null default '',
  due_date date,
  created_at timestamptz not null default now()
);

create type submission_status as enum ('submitted', 'in_review', 'corrected');

create table submissions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises (id) on delete cascade,
  student_id uuid not null references profiles (id) on delete cascade,
  content text,
  file_url text,
  status submission_status not null default 'submitted',
  submitted_at timestamptz not null default now()
);

create table corrections (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references submissions (id) on delete cascade,
  grade numeric,
  comment text,
  file_url text,
  corrected_by uuid references profiles (id) on delete set null,
  corrected_at timestamptz not null default now()
);

-- ==========================================================
-- Contenu public : témoignages, blog, événements, contact
-- ==========================================================
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  content text not null,
  rating smallint check (rating between 1 and 5),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  published boolean not null default false,
  published_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  location text not null default '',
  starts_at date not null,
  is_past boolean not null default false,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ==========================================================
-- Row Level Security
-- ==========================================================
alter table profiles enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;
alter table exercises enable row level security;
alter table submissions enable row level security;
alter table corrections enable row level security;
alter table testimonials enable row level security;
alter table blog_posts enable row level security;
alter table events enable row level security;
alter table contact_messages enable row level security;

-- Helper : l'utilisateur courant est-il admin ?
create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Helper : l'utilisateur courant a-t-il accès à ce cours ?
create function public.has_course_access(target_course_id uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from enrollments
    where user_id = auth.uid() and course_id = target_course_id
  ) or public.is_admin();
$$;

-- profiles : chacun voit/modifie son propre profil, l'admin voit tout
create policy "profiles: self select" on profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles: self update" on profiles for update using (id = auth.uid());
create policy "profiles: admin all" on profiles for all using (public.is_admin());

-- courses : tout le monde voit les cours publiés, l'admin gère tout
create policy "courses: public read published" on courses for select using (published = true or public.is_admin());
create policy "courses: admin write" on courses for insert with check (public.is_admin());
create policy "courses: admin update" on courses for update using (public.is_admin());
create policy "courses: admin delete" on courses for delete using (public.is_admin());

-- lessons : visibles si le cours est accessible (inscrit ou admin)
create policy "lessons: access if enrolled" on lessons for select using (public.has_course_access(course_id));
create policy "lessons: admin write" on lessons for insert with check (public.is_admin());
create policy "lessons: admin update" on lessons for update using (public.is_admin());
create policy "lessons: admin delete" on lessons for delete using (public.is_admin());

-- enrollments : l'élève voit ses accès, l'admin gère tout
create policy "enrollments: self select" on enrollments for select using (user_id = auth.uid() or public.is_admin());
create policy "enrollments: admin write" on enrollments for insert with check (public.is_admin());
create policy "enrollments: admin update" on enrollments for update using (public.is_admin());
create policy "enrollments: admin delete" on enrollments for delete using (public.is_admin());

-- exercises : visibles si le cours est accessible
create policy "exercises: access if enrolled" on exercises for select using (public.has_course_access(course_id));
create policy "exercises: admin write" on exercises for insert with check (public.is_admin());
create policy "exercises: admin update" on exercises for update using (public.is_admin());
create policy "exercises: admin delete" on exercises for delete using (public.is_admin());

-- submissions : l'élève voit/crée les siennes, l'admin voit/corrige tout
create policy "submissions: self select" on submissions for select using (student_id = auth.uid() or public.is_admin());
create policy "submissions: self insert" on submissions for insert with check (student_id = auth.uid());
create policy "submissions: self update own pending" on submissions for update using (student_id = auth.uid() or public.is_admin());

-- corrections : visibles par l'élève concerné et l'admin ; seul l'admin écrit
create policy "corrections: visible to owner" on corrections for select using (
  public.is_admin() or exists (
    select 1 from submissions s where s.id = submission_id and s.student_id = auth.uid()
  )
);
create policy "corrections: admin write" on corrections for insert with check (public.is_admin());
create policy "corrections: admin update" on corrections for update using (public.is_admin());

-- testimonials : public lit les publiés, tout le monde (y compris anonyme)
-- peut soumettre un avis (non publié par défaut, en attente de validation
-- par l'admin), admin gère tout
create policy "testimonials: public read published" on testimonials for select using (published = true or public.is_admin());
create policy "testimonials: public submit" on testimonials for insert with check (published = false);
create policy "testimonials: admin update" on testimonials for update using (public.is_admin());
create policy "testimonials: admin delete" on testimonials for delete using (public.is_admin());

-- blog_posts : public lit les publiés, admin gère tout
create policy "blog_posts: public read published" on blog_posts for select using (published = true or public.is_admin());
create policy "blog_posts: admin write" on blog_posts for insert with check (public.is_admin());
create policy "blog_posts: admin update" on blog_posts for update using (public.is_admin());
create policy "blog_posts: admin delete" on blog_posts for delete using (public.is_admin());

-- events : public en lecture, admin gère tout
create policy "events: public read" on events for select using (true);
create policy "events: admin write" on events for insert with check (public.is_admin());
create policy "events: admin update" on events for update using (public.is_admin());
create policy "events: admin delete" on events for delete using (public.is_admin());

-- contact_messages : personne ne lit sauf admin ; tout le monde (y compris anonyme) peut écrire
create policy "contact_messages: admin read" on contact_messages for select using (public.is_admin());
create policy "contact_messages: anyone insert" on contact_messages for insert with check (true);

-- ==========================================================
-- Storage (fichiers de cours, devoirs, corrections)
-- ==========================================================
-- Buckets publics : les fichiers ne sont pas listés nulle part et les
-- chemins contiennent des identifiants uuid non devinables (même logique
-- que les vidéos Vimeo/YouTube "non répertoriées"). Suffisant pour le MVP ;
-- à durcir plus tard avec des URLs signées si besoin d'une confidentialité
-- stricte.
insert into storage.buckets (id, name, public)
values
  ('course-files', 'course-files', true),
  ('submissions', 'submissions', true),
  ('corrections', 'corrections', true)
on conflict (id) do nothing;

-- course-files : chemin "{course_id}/{fichier}" — lecture si accès au cours, écriture admin
create policy "course-files: read if enrolled" on storage.objects for select using (
  bucket_id = 'course-files' and public.has_course_access((storage.foldername(name))[1]::uuid)
);
create policy "course-files: admin write" on storage.objects for insert with check (
  bucket_id = 'course-files' and public.is_admin()
);
create policy "course-files: admin update" on storage.objects for update using (
  bucket_id = 'course-files' and public.is_admin()
);
create policy "course-files: admin delete" on storage.objects for delete using (
  bucket_id = 'course-files' and public.is_admin()
);

-- submissions : chemin "{student_id}/{exercise_id}/{fichier}" — l'élève gère les siens, l'admin voit tout
create policy "submissions: student write own" on storage.objects for insert with check (
  bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "submissions: read own or admin" on storage.objects for select using (
  bucket_id = 'submissions' and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);

-- corrections : chemin "{student_id}/{submission_id}/{fichier}" — écrit par l'admin, lu par l'élève concerné + l'admin
create policy "corrections: admin write" on storage.objects for insert with check (
  bucket_id = 'corrections' and public.is_admin()
);
create policy "corrections: read own or admin" on storage.objects for select using (
  bucket_id = 'corrections' and (
    public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text
  )
);
