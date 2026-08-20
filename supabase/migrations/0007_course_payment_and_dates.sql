-- Suivi de paiement et période de suivi (31 jours, démarrant n'importe
-- quel jour du mois) pour chaque cours/élève.
alter table courses add column if not exists paid boolean not null default false;
alter table courses add column if not exists start_date date;
alter table courses add column if not exists end_date date;
