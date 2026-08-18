import Link from "next/link";
import { getSubmissionsToCorrect } from "@/lib/data/admin";

export const metadata = { title: "Admin — Corrections" };

export default async function AdminCorrectionsPage() {
  const submissions = await getSubmissionsToCorrect();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">À corriger</h1>

      {submissions.length === 0 ? (
        <p className="mt-6 text-sm text-brand-brown/60">
          Aucune soumission en attente de correction. 🎉
        </p>
      ) : (
        <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
          {submissions.map((submission) => (
            <Link
              key={submission.id}
              href={`/admin/corrections/${submission.id}`}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
            >
              <div>
                <p className="font-semibold text-brand-brown">{submission.exercise?.title}</p>
                <p className="text-xs text-brand-brown/60">
                  {submission.student?.full_name} · {submission.exercise?.course?.title}
                </p>
              </div>
              <span className="shrink-0 text-xs text-brand-brown/50">
                {new Date(submission.submitted_at).toLocaleDateString("fr-FR")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
