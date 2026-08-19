import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { signOut } from "@/lib/actions/auth";
import { Logo } from "@/components/logo";

const links = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/cours", label: "Cours" },
  { href: "/admin/videos", label: "Vidéothèque" },
  { href: "/admin/exercices", label: "Exercices" },
  { href: "/admin/corrections", label: "Corrections" },
  { href: "/admin/eleves", label: "Élèves" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/evenements", label: "Événements" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const current = await getCurrentUser();
  if (!current) redirect("/connexion?next=/admin");
  if (current.profile?.role !== "admin") redirect("/espace");

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream lg:flex-row">
      <aside className="flex flex-col border-b border-brand-brown/10 bg-white px-6 py-6 lg:w-64 lg:border-b-0 lg:border-r lg:py-8">
        <Logo className="mb-6 lg:mb-10" />
        <nav className="flex flex-wrap gap-1 lg:flex-1 lg:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-brown/80 hover:bg-brand-turquoise-light hover:text-brand-turquoise-dark"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/espace"
            className="rounded-lg px-3 py-2 text-sm font-medium text-brand-turquoise-dark hover:bg-brand-turquoise-light"
          >
            ← Espace élève
          </Link>
        </nav>
        <form action={signOut} className="mt-4 lg:mt-6">
          <button className="text-sm font-medium text-brand-brown/60 hover:text-brand-brown">
            Se déconnecter
          </button>
        </form>
      </aside>
      <main className="flex-1 px-6 py-10 lg:px-12">{children}</main>
    </div>
  );
}
