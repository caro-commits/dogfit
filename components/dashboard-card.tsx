import Link from "next/link";

export function DashboardCard({
  title,
  count,
  href,
  icon,
}: {
  title: string;
  count: number;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
    >
      <span className="text-2xl">{icon}</span>
      <span className="mt-4 text-3xl font-extrabold text-brand-brown">{count}</span>
      <span className="mt-1 text-sm font-medium text-brand-brown/70">{title}</span>
    </Link>
  );
}
