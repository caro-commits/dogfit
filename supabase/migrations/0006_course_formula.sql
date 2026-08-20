-- Catégorise chaque cours par formule (Fondations / Fitness), pour
-- remplacer l'onglet unique "Cours" par deux onglets séparés dans l'admin,
-- tout en gardant un cours par élève (contenu personnalisé).
alter table courses add column if not exists formula text check (formula in ('fondations', 'fitness'));
