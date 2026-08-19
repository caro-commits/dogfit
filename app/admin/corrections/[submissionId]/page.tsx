import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubmissionDetail } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { VideoAnnotator, isVideoUrl } from "@/components/video-annotator";
import { VideoEmbed } from "@/components/video-embed";
import { submitCorrection, addAnnotation, deleteAnnotation } from "./actions";

// Anciennes soumissions : certains élèves ont collé leur lien vidéo
// directement dans le champ description avant l'ajout du champ dédié.
function extractLegacyVideoLink(content: string | null) {
  if (!content) return null;
  const trimmed = content.trim();
  return /^https?:\/\/\S+$/.test(trimmed) ? trimmed : null;
}

export default async function AdminCorrectionDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const data = await getSubmissionDetail(submissionId);

  if (!data) notFound();

  const { submission, correction, annotations } = data;
  const legacyVideoLink = extractLegacyVideoLink(submission.content);
  const correctAction = submitCorrection.bind(null, submissionId);
  const addAnnotationAction = addAnnotation.bind(null, submissionId);
  const deleteAnnotationAction = deleteAnnotation.bind(null, submissionId);

  return (
    <div>
      <Link href="/admin/corrections" className="text-sm font-medium text-brand-turquoise-dark hover:underline">
        ← À corriger
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{submission.exercise?.title}</h1>
      <p className="text-xs text-brand-brown/60">
        {submission.student?.full_name} · {submission.exercise?.course?.title}
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-sm font-bold text-brand-brown">Travail envoyé</h2>
        <p className="mt-2 text-xs text-brand-brown/50">
          Envoyé le {new Date(submission.submitted_at).toLocaleDateString("fr-FR")}
        </p>
        {submission.content && !legacyVideoLink && (
          <p className="mt-3 text-sm text-brand-brown/80">{submission.content}</p>
        )}
        {(submission.video_url || legacyVideoLink) && (
          <div className="mt-4">
            <VideoEmbed url={submission.video_url || legacyVideoLink!} />
          </div>
        )}
        {submission.file_url && (
          isVideoUrl(submission.file_url) ? (
            <div className="mt-4">
              <VideoAnnotator
                url={submission.file_url}
                annotations={annotations}
                canEdit
                addAction={addAnnotationAction}
                deleteAction={deleteAnnotationAction}
              />
            </div>
          ) : (
            <a
              href={submission.file_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-brand-turquoise-dark hover:underline"
            >
              Voir le fichier envoyé par l&apos;élève
            </a>
          )
        )}
      </div>

      <div className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-sm font-bold text-brand-brown">
          {correction ? "Modifier la correction" : "Corriger ce travail"}
        </h2>
        <form action={correctAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="comment" className="text-sm font-semibold text-brand-brown">
              Commentaire
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              defaultValue={correction?.comment ?? ""}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="file" className="text-sm font-semibold text-brand-brown">
              Fichier ou vidéo corrigée (facultatif)
            </label>
            <input id="file" name="file" type="file" className="mt-1 block w-full text-sm" />
            {correction?.file_url && (
              <a
                href={correction.file_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-xs text-brand-turquoise-dark hover:underline"
              >
                Fichier actuel
              </a>
            )}
          </div>
          <Button type="submit">Envoyer la correction</Button>
        </form>
      </div>
    </div>
  );
}
