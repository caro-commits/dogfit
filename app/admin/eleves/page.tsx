import { cookies } from "next/headers";
import { getStudents, getAllCourses } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { grantAccess, revokeAccess, createStudent } from "./actions";

export const metadata = { title: "Admin — Élèves" };

export default async function AdminElevesPage({
  searchParams,
}: {
  searchParams: Promise<{ student_created?: string; student_error?: string }>;
}) {
  const [students, courses, { student_created, student_error }, cookieStore] = await Promise.all([
    getStudents(),
    getAllCourses(),
    searchParams,
    cookies(),
  ]);

  const newStudentEmail = student_created ? cookieStore.get("new_student_email")?.value : undefined;
  const newStudentPassword = student_created ? cookieStore.get("new_student_password")?.value : undefined;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Élèves</h1>

      {newStudentEmail && newStudentPassword && (
        <div className="mt-6 max-w-xl rounded-2xl bg-brand-turquoise-light p-6">
          <p className="font-semibold text-brand-turquoise-dark">
            Compte créé ! Notez bien ces identifiants maintenant — le mot de
            passe ne sera plus jamais affiché ensuite.
          </p>
          <dl className="mt-3 space-y-1 text-sm text-brand-brown">
            <div className="flex gap-2">
              <dt className="font-semibold">Email :</dt>
              <dd>{newStudentEmail}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">Mot de passe :</dt>
              <dd className="font-mono">{newStudentPassword}</dd>
            </div>
          </dl>
        </div>
      )}
      {student_error && (
        <div className="mt-6 max-w-xl rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {student_error === "1"
            ? "Merci de renseigner le nom et l'email de l'élève."
            : `Échec de la création : ${student_error}`}
        </div>
      )}

      <div className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Créer un élève</h2>
        <p className="mt-1 text-xs text-brand-brown/60">
          Un mot de passe est généré automatiquement — vous n&apos;aurez qu&apos;à
          le transmettre à l&apos;élève.
        </p>
        <form action={createStudent} className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="full_name" className="text-xs font-semibold text-brand-brown/70">
              Nom complet
            </label>
            <input
              id="full_name"
              name="full_name"
              required
              className="mt-1 block rounded-lg border border-brand-brown/20 px-3 py-2 text-sm focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-brand-brown/70">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block rounded-lg border border-brand-brown/20 px-3 py-2 text-sm focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <Button type="submit" className="text-xs">
            Créer l&apos;élève
          </Button>
        </form>
      </div>

      {students.length === 0 ? (
        <p className="mt-8 text-sm text-brand-brown/60">Aucun élève inscrit pour l&apos;instant.</p>
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
              <div className="mt-3 space-y-2">
                {student.enrollments.length === 0 && (
                  <span className="text-xs text-brand-brown/50">Aucun accès pour l&apos;instant</span>
                )}
                {student.enrollments.map((enrollment: { id: string; course: { title: string } | null }) => {
                  const revokeAction = revokeAccess.bind(null, enrollment.id);
                  return (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between gap-3 rounded-lg bg-brand-turquoise-light px-3 py-2"
                    >
                      <span className="text-xs font-semibold text-brand-turquoise-dark">
                        {enrollment.course?.title}
                      </span>
                      <form action={revokeAction}>
                        <button className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-50">
                          Retirer l&apos;accès
                        </button>
                      </form>
                    </div>
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
