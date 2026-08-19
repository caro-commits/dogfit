import Link from "next/link";
import { getCorrectionsForStudent } from "@/lib/data/student";

export const metadata = { title: "Mes corrections" };

export default async function MesCorrectionsPage() {
  const corrections = await getCorrectionsForStudent();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Mes corrections</h1>

      {corrections.length === 0 ? (
        <p className="mt-6 text-sm text-brand-brown/60">
          Aucune correction disponible pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {corrections.map((correction) => (
            <Link
              key={correction.id}
              href={`/espace/exercices/${correction.submission?.exercise?.id}`}
              className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown/50">
                {correction.submission?.exercise?.course?.title}
              </p>
              <p className="mt-1 font-bold text-brand-brown">
                {correction.submission?.exercise?.title}
              </p>
              <p className="mt-2 text-sm text-brand-turquoise-dark">Voir la correction</p>
              {correction.comment && (
                <p className="mt-2 text-sm text-brand-brown/70">{correction.comment}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
