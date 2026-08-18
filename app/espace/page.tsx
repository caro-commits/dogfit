import { getCurrentUser } from "@/lib/auth/current-user";
import {
  getEnrolledCourses,
  getExercisesForStudent,
  getCorrectionsForStudent,
} from "@/lib/data/student";
import { DashboardCard } from "@/components/dashboard-card";

export const metadata = { title: "Mon espace" };

export default async function EspaceDashboardPage() {
  const current = await getCurrentUser();
  const [courses, exercises, corrections] = await Promise.all([
    getEnrolledCourses(),
    getExercisesForStudent(),
    getCorrectionsForStudent(),
  ]);

  const pendingExercises = exercises.filter(
    (exercise) => (exercise.submissions ?? []).length === 0,
  );

  const firstName = current?.profile?.full_name?.split(" ")[0];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">
        Bonjour {firstName ?? ""} 👋
      </h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Voici un résumé de votre progression DOGFIT.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <DashboardCard
          title="Mes cours"
          count={courses.length}
          href="/espace/cours"
          icon="📚"
        />
        <DashboardCard
          title="Exercices à faire"
          count={pendingExercises.length}
          href="/espace/exercices"
          icon="📝"
        />
        <DashboardCard
          title="Corrections disponibles"
          count={corrections.length}
          href="/espace/corrections"
          icon="✅"
        />
      </div>
    </div>
  );
}
