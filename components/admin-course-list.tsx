import Link from "next/link";
import { Button } from "@/components/button";
import { SuiviDateFields } from "@/components/suivi-date-fields";
import { createCourse } from "@/app/admin/cours/actions";

export function AdminCourseList({
  title,
  formula,
  courses,
}: {
  title: string;
  formula: "fondations" | "fitness";
  courses: {
    id: string;
    title: string;
    price_cents: number;
    published: boolean;
    paid: boolean;
    start_date: string | null;
    end_date: string | null;
  }[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">{title}</h1>

      <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
        {courses.length === 0 && (
          <p className="px-6 py-6 text-sm text-brand-brown/60">Aucun cours pour l&apos;instant.</p>
        )}
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/cours/${course.id}`}
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
          >
            <div>
              <p className="font-semibold text-brand-brown">{course.title}</p>
              <p className="text-xs text-brand-brown/60">
                {(course.price_cents / 100).toFixed(0)} €
                {course.start_date && course.end_date && (
                  <>
                    {" · "}
                    {new Date(course.start_date).toLocaleDateString("fr-FR")} →{" "}
                    {new Date(course.end_date).toLocaleDateString("fr-FR")}
                  </>
                )}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  course.published
                    ? "bg-brand-turquoise-light text-brand-turquoise-dark"
                    : "bg-brand-cream-dark text-brand-brown/60"
                }`}
              >
                {course.published ? "Publié" : "Brouillon"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  course.paid
                    ? "bg-brand-turquoise-light text-brand-turquoise-dark"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {course.paid ? "Payé" : "Non réglé"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Créer un cours {title}</h2>
        <form action={createCourse} className="mt-4 space-y-4">
          <input type="hidden" name="formula" value={formula} />
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
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
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
              defaultValue={0}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="published" className="rounded" />
            Publier immédiatement
          </label>
          <SuiviDateFields />
          <Button type="submit">Créer le cours</Button>
        </form>
      </div>
    </div>
  );
}
