-- Vidéo de démonstration attachée à un exercice, choisie depuis la
-- bibliothèque de vidéos ou collée en lien Vimeo/YouTube — pour montrer
-- à l'élève ce qui est attendu avant qu'il envoie sa propre vidéo.
alter table exercises add column if not exists demo_video_url text;
