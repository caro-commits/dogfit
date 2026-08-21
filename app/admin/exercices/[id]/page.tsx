import { notFound } from "next/navigation";
import Link from "next/link";
import { getExerciseWithCourse, getVideos } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { VideoUrlField } from "@/components/video-url-field";
import { VideoLibraryPanel } from "@/components/video-library-panel";
import { updateExercise, deleteExercise } from "../actions";

export default async function AdminExerciseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [exercise, videos] = await Promise.all([
    getExerciseWithCourse(id),
    getVideos(),
  ]);

  if (!exercise) notFound();

  const updateAction = updateExercise.bind(null, id);
  const deleteAction = deleteExercise.bind(null, id);

  return (
    <div>
      <Link href="/admin/exercices" className="text-sm font-medium text-brand-turquoise-dark hover:underline">
        ← Exercices
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{exercise.title}</h1>
      <p className="text-xs text-brand-brown/60">{exercise.course?.title}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <form action={updateAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              defaultValue={exercise.title}
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-semibold text-brand-brown">
              Consigne
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={exercise.description}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="due_date" className="text-sm font-semibold text-brand-brown">
              Date limite
            </label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={exercise.due_date ?? ""}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-brand-brown">
              Vidéo de démonstration (facultatif)
            </label>
            <div className="mt-1">
              <VideoUrlField
                videos={videos.map((v) => ({ id: v.id, title: v.title, url: v.url }))}
                name="demo_video_url"
                defaultUrl={exercise.demo_video_url ?? ""}
              />
            </div>
            <Link
              href="/admin/videos"
              className="mt-1 inline-block text-xs text-brand-turquoise-dark hover:underline"
            >
              + Envoyer une nouvelle vidéo dans la bibliothèque
            </Link>
          </div>
          <Button type="submit">Enregistrer</Button>
        </form>
        <form action={deleteAction} className="mt-4 border-t border-brand-brown/10 pt-4">
          <button className="text-sm font-medium text-red-600 hover:underline">
            Supprimer cet exercice
          </button>
        </form>
      </div>

      <VideoLibraryPanel
        videos={videos.map((v) => ({ id: v.id, title: v.title, url: v.url }))}
      />
      </div>
    </div>
  );
}
