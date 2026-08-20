import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseWithLessons, getVideos } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { VideoUrlField } from "@/components/video-url-field";
import { updateCourse, deleteCourse, createLesson, deleteLesson } from "./actions";

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [course, videos] = await Promise.all([
    getCourseWithLessons(id),
    getVideos(),
  ]);

  if (!course) notFound();

  const updateAction = updateCourse.bind(null, id);
  const deleteAction = deleteCourse.bind(null, id);
  const createLessonAction = createLesson.bind(null, id);

  return (
    <div>
      <Link
        href={course.formula === "fitness" ? "/admin/fitness" : "/admin/fondations"}
        className="text-sm font-medium text-brand-turquoise-dark hover:underline"
      >
        ← {course.formula === "fitness" ? "Fitness" : "Fondations"}
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{course.title}</h1>

      <div className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Informations du cours</h2>
        <form action={updateAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              defaultValue={course.title}
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-semibold text-brand-brown">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={course.description}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="price" className="text-sm font-semibold text-brand-brown">
              Prix (€)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              defaultValue={course.price_cents / 100}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="formula" className="text-sm font-semibold text-brand-brown">
              Formule
            </label>
            <select
              id="formula"
              name="formula"
              defaultValue={course.formula ?? ""}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            >
              <option value="">— Choisir —</option>
              <option value="fondations">Fondations</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="published" defaultChecked={course.published} className="rounded" />
            Publié
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
        <form action={deleteAction} className="mt-4 border-t border-brand-brown/10 pt-4">
          <button className="text-sm font-medium text-red-600 hover:underline">
            Supprimer ce cours
          </button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-brand-brown">Leçons</h2>
        <div className="mt-4 space-y-3">
          {course.lessons.length === 0 && (
            <p className="text-sm text-brand-brown/60">Aucune leçon pour l&apos;instant.</p>
          )}
          {course.lessons.map((lesson: { id: string; title: string; position: number; video_url?: string; pdf_url?: string }) => {
            const deleteLessonAction = deleteLesson.bind(null, id, lesson.id);
            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-brand-brown/5"
              >
                <div>
                  <p className="text-sm font-semibold text-brand-brown">
                    #{lesson.position} — {lesson.title}
                  </p>
                  <p className="text-xs text-brand-brown/50">
                    {lesson.video_url ? "🎥 vidéo" : ""} {lesson.pdf_url ? "📄 PDF" : ""}
                  </p>
                </div>
                <form action={deleteLessonAction}>
                  <button className="text-xs font-medium text-red-600 hover:underline">
                    Supprimer
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        <div className="mt-6 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
          <h3 className="text-sm font-bold text-brand-brown">Ajouter une leçon</h3>
          <form action={createLessonAction} className="mt-4 space-y-4">
            <div className="grid grid-cols-[1fr,auto] gap-3">
              <div>
                <label htmlFor="lesson-title" className="text-sm font-semibold text-brand-brown">
                  Titre
                </label>
                <input
                  id="lesson-title"
                  name="title"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="position" className="text-sm font-semibold text-brand-brown">
                  Ordre
                </label>
                <input
                  id="position"
                  name="position"
                  type="number"
                  defaultValue={course.lessons.length + 1}
                  className="mt-1 w-20 rounded-lg border border-brand-brown/20 px-3 py-2.5 focus:border-brand-turquoise focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-brand-brown">
                Vidéo (bibliothèque, ou lien Vimeo / YouTube non répertorié)
              </label>
              <div className="mt-1">
                <VideoUrlField
                  videos={videos.map((v) => ({ id: v.id, title: v.title, url: v.url }))}
                />
              </div>
              <Link
                href="/admin/videos"
                className="mt-1 inline-block text-xs text-brand-turquoise-dark hover:underline"
              >
                + Envoyer une nouvelle vidéo dans la bibliothèque
              </Link>
            </div>
            <div>
              <label htmlFor="content" className="text-sm font-semibold text-brand-brown">
                Contenu / instructions
              </label>
              <textarea
                id="content"
                name="content"
                rows={3}
                className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pdf" className="text-sm font-semibold text-brand-brown">
                Fiche PDF (facultatif)
              </label>
              <input id="pdf" name="pdf" type="file" accept="application/pdf" className="mt-1 block w-full text-sm" />
            </div>
            <Button type="submit">Ajouter la leçon</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
