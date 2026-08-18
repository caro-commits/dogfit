import { getStudents, getAllCourses } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { grantAccess, revokeAccess } from "./actions";

export const metadata = { title: "Admin — Élèves" };

export default async function AdminElevesPage() {
  const [students, courses] = await Promise.all([getStudents(), getAllCourses()]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Élèves</h1>

      {students.length === 0 ? (
        <p className="mt-6 text-sm text-brand-brown/60">Aucun élève inscrit pour l&apos;instant.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5"
            >
              <p className="font-semibold text-brand-brown">
                {student.full_name || "Élève sans nom"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {student.enrollments.length === 0 && (
                  <span className="text-xs text-brand-brown/50">Aucun accès pour l&apos;instant</span>
                )}
                {student.enrollments.map((enrollment: { id: string; course: { title: string } | null }) => {
                  const revokeAction = revokeAccess.bind(null, enrollment.id);
                  return (
                    <form key={enrollment.id} action={revokeAction}>
                      <button
                        title="Cliquer pour révoquer"
                        className="rounded-full bg-brand-turquoise-light px-3 py-1 text-xs font-semibold text-brand-turquoise-dark hover:bg-red-50 hover:text-red-700"
                      >
                        {enrollment.course?.title} ✕
                      </button>
                    </form>
                  );
                })}
              </div>
              <form action={grantAccess} className="mt-4 flex flex-wrap items-end gap-3">
                <input type="hidden" name="student_id" value={student.id} />
                <div>
                  <label className="text-xs font-semibold text-brand-brown/70">
                    Donner accès à
                  </label>
                  <select
                    name="course_id"
                    required
                    className="mt-1 block rounded-lg border border-brand-brown/20 px-3 py-2 text-sm focus:border-brand-turquoise focus:outline-none"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="ghost" className="py-2 text-xs">
                  Octroyer l&apos;accès
                </Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
