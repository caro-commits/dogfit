import Link from "next/link";
import { getExercisesForStudent } from "@/lib/data/student";

export const metadata = { title: "Mes exercices" };

const statusLabels: Record<string, { label: string; className: string }> = {
  submitted: { label: "Envoyé", className: "bg-amber-50 text-amber-700" },
  in_review: { label: "En correction", className: "bg-amber-50 text-amber-700" },
  corrected: { label: "Corrigé", className: "bg-brand-turquoise-light text-brand-turquoise-dark" },
};

export default async function MesExercicesPage() {
  const exercises = await getExercisesForStudent();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Mes exercices</h1>

      {exercises.length === 0 ? (
        <p className="mt-6 text-sm text-brand-brown/60">
          Aucun exercice disponible pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
          {exercises.map((exercise) => {
            const submission = (exercise.submissions ?? [])[0];
            const status = submission ? statusLabels[submission.status] : null;
            return (
              <Link
                key={exercise.id}
                href={`/espace/exercices/${exercise.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
              >
                <div>
                  <p className="font-semibold text-brand-brown">{exercise.title}</p>
                  <p className="text-xs text-brand-brown/60">{exercise.course?.title}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    status ? status.className : "bg-brand-cream-dark text-brand-brown/60"
                  }`}
                >
                  {status ? status.label : "À faire"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
