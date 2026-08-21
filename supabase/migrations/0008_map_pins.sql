-- Points affichés sur la carte des déplacements de Marie (page Prestations,
-- section Stages) : lieux de stages passés ou à venir, ajoutés/retirés
-- depuis /admin/carte.
create table map_pins (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz not null default now()
);

alter table map_pins enable row level security;

create policy "map_pins: anyone read" on map_pins for select using (true);
create policy "map_pins: admin insert" on map_pins for insert with check (public.is_admin());
create policy "map_pins: admin delete" on map_pins for delete using (public.is_admin());
