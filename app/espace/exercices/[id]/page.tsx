import { notFound } from "next/navigation";
import Link from "next/link";
import { getExerciseForStudent } from "@/lib/data/student";
import { Button } from "@/components/button";
import { VideoEmbed } from "@/components/video-embed";
import { VideoAnnotator, isVideoUrl } from "@/components/video-annotator";
import { submitExercise } from "./actions";

const statusLabels: Record<string, string> = {
  submitted: "Envoyé, en attente de correction",
  in_review: "En cours de correction",
  corrected: "Corrigé",
};

// Anciennes soumissions : certains élèves ont collé leur lien vidéo
// directement dans le champ description avant l'ajout du champ dédié.
function extractLegacyVideoLink(content: string | null) {
  if (!content) return null;
  const trimmed = content.trim();
  return /^https?:\/\/\S+$/.test(trimmed) ? trimmed : null;
}

export default async function ExerciceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getExerciseForStudent(id);

  if (!data) notFound();

  const { exercise, submissions } = data;
  const submitAction = submitExercise.bind(null, id);

  return (
    <div>
      <Link
        href="/espace/exercices"
        className="text-sm font-medium text-brand-turquoise-dark hover:underline"
      >
        ← Mes exercices
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{exercise.title}</h1>
      <p className="text-xs text-brand-brown/60">{exercise.course?.title}</p>
      <p className="mt-4 max-w-2xl text-sm text-brand-brown/70">{exercise.description}</p>

      {exercise.demo_video_url && (
        <div className="mt-6 max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-brand-brown">
            Vidéo de démonstration
          </p>
          <VideoEmbed url={exercise.demo_video_url} />
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Envoyer mon travail</h2>
        <form action={submitAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="content" className="text-sm font-semibold text-brand-brown">
              Description / réponse
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="file" className="text-sm font-semibold text-brand-brown">
              Fichier ou vidéo (facultatif)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              className="mt-1 block w-full text-sm text-brand-brown/70"
            />
          </div>
          <div>
            <label htmlFor="video_url" className="text-sm font-semibold text-brand-brown">
              Ou lien vidéo YouTube / Vimeo (si vous préférez ne pas envoyer
              le fichier directement)
            </label>
            <input
              id="video_url"
              name="video_url"
              type="url"
              placeholder="https://youtu.be/..."
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <Button type="submit">Envoyer pour correction</Button>
        </form>
      </div>

      {submissions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-base font-bold text-brand-brown">Historique</h2>
          <div className="mt-4 space-y-4">
            {submissions.map((submission) => {
              const legacyVideoLink = extractLegacyVideoLink(submission.content);
              return (
              <div
                key={submission.id}
                className="rounded-2xl border border-brand-brown/10 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown/50">
                    Envoyé le{" "}
                    {new Date(submission.submitted_at).toLocaleDateString("fr-FR")}
                  </p>
                  <span className="text-xs font-semibold text-brand-turquoise-dark">
                    {statusLabels[submission.status]}
                  </span>
                </div>
                {submission.content && !legacyVideoLink && (
                  <p className="mt-2 text-sm text-brand-brown/70">{submission.content}</p>
                )}
                {submission.file_url && (
                  isVideoUrl(submission.file_url) ? (
                    <div className="mt-3">
                      <VideoAnnotator
                        url={submission.file_url}
                        annotations={submission.annotations ?? []}
                        canEdit={false}
                      />
                    </div>
                  ) : (
                    <a
                      href={submission.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-brand-turquoise-dark hover:underline"
                    >
                      Voir mon fichier envoyé
                    </a>
                  )
                )}
                {(submission.video_url || legacyVideoLink) && (
                  <div className="mt-3">
                    <VideoEmbed url={submission.video_url || legacyVideoLink!} />
                  </div>
                )}

                {submission.correction && (
                  <div className="mt-4 rounded-xl bg-brand-turquoise-light p-4">
                    <p className="text-sm font-bold text-brand-turquoise-dark">
                      Correction de Marie
                    </p>
                    {submission.correction.comment && (
                      <p className="mt-2 text-sm text-brand-brown/80">
                        {submission.correction.comment}
                      </p>
                    )}
                    {submission.correction.file_url && (
                      <a
                        href={submission.correction.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-brand-turquoise-dark hover:underline"
                      >
                        Voir le fichier corrigé
                      </a>
                    )}
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
