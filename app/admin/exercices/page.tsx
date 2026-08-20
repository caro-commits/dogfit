import Link from "next/link";
import { getAllExercises, getAllCourses, getVideos } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { VideoUrlField } from "@/components/video-url-field";
import { VideoLibraryPanel } from "@/components/video-library-panel";
import { createExercise } from "./actions";

export const metadata = { title: "Admin — Exercices" };

export default async function AdminExercicesPage() {
  const [exercises, courses, videos] = await Promise.all([
    getAllExercises(),
    getAllCourses(),
    getVideos(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Exercices</h1>

      <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
        {exercises.length === 0 && (
          <p className="px-6 py-6 text-sm text-brand-brown/60">Aucun exercice pour l&apos;instant.</p>
        )}
        {exercises.map((exercise) => (
          <Link
            key={exercise.id}
            href={`/admin/exercices/${exercise.id}`}
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
          >
            <div>
              <p className="font-semibold text-brand-brown">{exercise.title}</p>
              <p className="text-xs text-brand-brown/60">{exercise.course?.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
          <h2 className="text-base font-bold text-brand-brown">Créer un exercice</h2>
          <form action={createExercise} className="mt-4 space-y-4">
            <div>
              <label htmlFor="course_id" className="text-sm font-semibold text-brand-brown">
                Cours
              </label>
              <select
                id="course_id"
                name="course_id"
                required
                className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
                Titre
              </label>
              <input
                id="title"
                name="title"
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
                rows={3}
                className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="due_date" className="text-sm font-semibold text-brand-brown">
                Date limite (facultatif)
              </label>
              <input
                id="due_date"
                name="due_date"
                type="date"
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
                />
              </div>
              <Link
                href="/admin/videos"
                className="mt-1 inline-block text-xs text-brand-turquoise-dark hover:underline"
              >
                + Envoyer une nouvelle vidéo dans la bibliothèque
              </Link>
            </div>
            <Button type="submit">Créer l&apos;exercice</Button>
          </form>
        </div>

        <VideoLibraryPanel
          videos={videos.map((v) => ({ id: v.id, title: v.title, url: v.url }))}
        />
      </div>
    </div>
  );
}
