-- Notes horodatées sur la vidéo envoyée par l'élève : l'admin regarde la
-- vidéo de soumission et ajoute des commentaires pointés dans le temps
-- (ex: "à 0:12, la patte arrière...") plutôt qu'un seul commentaire global.
create table if not exists submission_annotations (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions (id) on delete cascade,
  timestamp_seconds numeric not null,
  comment text not null,
  created_at timestamptz not null default now()
);

alter table submission_annotations enable row level security;

drop policy if exists "annotations: admin read" on submission_annotations;
drop policy if exists "annotations: admin write" on submission_annotations;
drop policy if exists "annotations: admin delete" on submission_annotations;
drop policy if exists "annotations: student read own" on submission_annotations;

create policy "annotations: admin read" on submission_annotations for select using (public.is_admin());
create policy "annotations: admin write" on submission_annotations for insert with check (public.is_admin());
create policy "annotations: admin delete" on submission_annotations for delete using (public.is_admin());
create policy "annotations: student read own" on submission_annotations for select using (
  exists (
    select 1 from submissions s
    where s.id = submission_id and s.student_id = auth.uid()
  )
);
