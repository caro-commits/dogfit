import Link from "next/link";
import { getCoursesWithDates } from "@/lib/data/admin";

export const metadata = { title: "Admin — Calendrier" };

const monthNames = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toDateOnly(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  // 0 = dimanche en JS ; on veut une grille commençant le lundi
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }
  return days;
}

export default async function AdminCalendrierPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: monthParam } = await searchParams;
  const now = new Date();
  const [year, month] = monthParam
    ? monthParam.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const monthIndex = month - 1;

  const courses = await getCoursesWithDates();
  const days = buildMonthGrid(year, monthIndex);

  const prev = new Date(year, monthIndex - 1, 1);
  const next = new Date(year, monthIndex + 1, 1);
  const prevParam = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
  const nextParam = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-brand-brown">
          Calendrier des suivis — {monthNames[monthIndex]} {year}
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/admin/calendrier?month=${prevParam}`}
            className="rounded-full border border-brand-brown/20 px-4 py-2 text-sm font-semibold text-brand-brown hover:bg-brand-cream-dark"
          >
            ← Précédent
          </Link>
          <Link
            href={`/admin/calendrier?month=${nextParam}`}
            className="rounded-full border border-brand-brown/20 px-4 py-2 text-sm font-semibold text-brand-brown hover:bg-brand-cream-dark"
          >
            Suivant →
          </Link>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-xs text-brand-brown/60">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-turquoise" /> Payé
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Non réglé
        </span>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-px overflow-hidden rounded-2xl bg-brand-brown/10 text-xs">
        {dayLabels.map((label) => (
          <div key={label} className="bg-brand-cream-dark px-2 py-2 text-center font-semibold text-brand-brown/70">
            {label}
          </div>
        ))}
        {days.map((day) => {
          const dateStr = toDateOnly(day);
          const inMonth = day.getMonth() === monthIndex;
          const coursesToday = courses.filter(
            (c) => c.start_date && c.end_date && dateStr >= c.start_date && dateStr <= c.end_date,
          );
          return (
            <div
              key={dateStr}
              className={`min-h-24 bg-white p-1.5 ${inMonth ? "" : "bg-brand-cream/60 text-brand-brown/30"}`}
            >
              <p className="text-right text-[11px] font-semibold text-brand-brown/50">
                {day.getDate()}
              </p>
              <div className="mt-1 space-y-1">
                {coursesToday.map((c) => (
                  <Link
                    key={c.id}
                    href={`/admin/cours/${c.id}`}
                    className={`block truncate rounded px-1.5 py-0.5 font-medium text-white ${
                      c.paid ? "bg-brand-turquoise" : "bg-red-400"
                    }`}
                    title={c.title}
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
