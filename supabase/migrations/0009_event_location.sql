-- Remplace l'outil "Carte" séparé (map_pins) par un lieu optionnel
-- directement sur chaque événement : un seul endroit pour gérer un
-- stage (titre, date, lieu sur la carte).
alter table events add column latitude double precision;
alter table events add column longitude double precision;

drop table if exists map_pins;
