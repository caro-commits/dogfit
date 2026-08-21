import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { getCourseBySlug } from "@/lib/data/public-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.title,
    description: course.description,
    openGraph: { title: course.title, description: course.description },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  const lessons = "lessons" in course ? course.lessons ?? [] : [];

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Programme
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        {course.title}
      </h1>
      <p className="mt-4 max-w-2xl text-brand-brown/70">{course.description}</p>

      {lessons.length > 0 && (
        <div className="mt-10 max-w-xl">
          <h2 className="text-lg font-bold text-brand-brown">Au programme</h2>
          <ul className="mt-4 space-y-2">
            {lessons
              .sort(
                (a: { position: number }, b: { position: number }) =>
                  a.position - b.position,
              )
              .map((lesson: { id: string; title: string }) => (
                <li
                  key={lesson.id}
                  className="rounded-xl bg-white px-4 py-3 text-sm text-brand-brown/80 ring-1 ring-brand-brown/5"
                >
                  {lesson.title}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex items-center gap-6 rounded-2xl bg-brand-cream-dark p-6">
        <p className="text-2xl font-extrabold text-brand-brown">
          {(course.price_cents / 100).toFixed(0)} €
        </p>
        <LinkButton href="/inscription">Accéder à ce cours</LinkButton>
      </div>
    </Container>
  );
}
