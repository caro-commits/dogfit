import { getDashboardStats } from "@/lib/data/admin";
import { DashboardCard } from "@/components/dashboard-card";

export const metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Tableau de bord</h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Vue d&apos;ensemble de l&apos;activité DOGFIT.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Fondations" count={stats.fondations} href="/admin/fondations" icon="📚" />
        <DashboardCard title="Fitness" count={stats.fitness} href="/admin/fitness" icon="💪" />
        <DashboardCard title="Élèves" count={stats.students} href="/admin/eleves" icon="🧑‍🎓" />
        <DashboardCard
          title="Corrections en attente"
          count={stats.pending}
          href="/admin/corrections"
          icon="✅"
        />
        <DashboardCard title="Messages de contact" count={stats.messages} href="/admin" icon="✉️" />
      </div>
    </div>
  );
}
