import Link from "next/link";
import { getEnrolledCourses } from "@/lib/data/student";

export const metadata = { title: "Mes cours" };

export default async function MesCoursPage() {
  const enrollments = await getEnrolledCourses();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Mes cours</h1>

      {enrollments.length === 0 ? (
        <p className="mt-6 text-sm text-brand-brown/60">
          Vous n&apos;avez pas encore accès à un cours. Rendez-vous sur la{" "}
          <Link href="/cours" className="font-semibold text-brand-turquoise-dark hover:underline">
            page du coaching
          </Link>{" "}
          pour découvrir les programmes DOGFIT.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {enrollments.map(({ course }) => {
            if (!course) return null;
            return (
              <Link
                key={course.id}
                href={`/espace/cours/${course.id}`}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-brand-brown">{course.title}</h2>
                <p className="mt-2 text-sm text-brand-brown/70">{course.description}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
