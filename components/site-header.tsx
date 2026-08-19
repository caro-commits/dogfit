import Link from "next/link";
import { Logo } from "./logo";
import { LinkButton } from "./button";

const links = [
  { href: "/presentation", label: "Marie" },
  { href: "/fitness-canin", label: "Fitness canin" },
  { href: "/cours", label: "Prestations" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/evenements", label: "Événements" },
  { href: "/blog", label: "Blog" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-brown/80 transition-colors hover:text-brand-turquoise-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="hidden text-sm font-semibold text-brand-brown hover:text-brand-turquoise-dark sm:block"
          >
            Connexion
          </Link>
          <LinkButton href="/inscription" className="text-xs sm:text-sm">
            Mon espace élève
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
