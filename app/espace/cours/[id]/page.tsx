import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseForStudent } from "@/lib/data/student";
import { VideoEmbed } from "@/components/video-embed";

export default async function EspaceCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseForStudent(id);

  if (!course) notFound();

  return (
    <div>
      <Link href="/espace/cours" className="text-sm font-medium text-brand-turquoise-dark hover:underline">
        ← Mes cours
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{course.title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-brand-brown/70">{course.description}</p>

      <div className="mt-8 space-y-10">
        {course.lessons.length === 0 ? (
          <p className="text-sm text-brand-brown/60">
            Aucune leçon n&apos;a encore été ajoutée à ce cours.
          </p>
        ) : (
          course.lessons.map((lesson: { id: string; title: string; video_url?: string; pdf_url?: string; content?: string }) => (
            <div key={lesson.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
              <h2 className="text-lg font-bold text-brand-brown">{lesson.title}</h2>
              {lesson.video_url && (
                <div className="mt-4">
                  <VideoEmbed url={lesson.video_url} />
                </div>
              )}
              {lesson.content && (
                <p className="mt-4 text-sm text-brand-brown/70">{lesson.content}</p>
              )}
              {lesson.pdf_url && (
                <a
                  href={lesson.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-turquoise-dark hover:underline"
                >
                  📄 Télécharger la fiche PDF
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
