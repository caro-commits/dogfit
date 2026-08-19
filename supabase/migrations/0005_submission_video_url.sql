-- Permet à l'élève de coller un lien vidéo (YouTube/Vimeo) en plus (ou à la
-- place) d'uploader un fichier, pour ceux qui préfèrent héberger leur vidéo
-- eux-mêmes plutôt que l'envoyer directement.
alter table submissions add column if not exists video_url text;
