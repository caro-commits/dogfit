import Link from "next/link";
import { Logo } from "./logo";
import { LinkButton } from "./button";

const leftLinks = [
  { href: "/presentation", label: "Qui suis-je ?" },
  { href: "/fitness-canin", label: "Fitness canin" },
  { href: "/cours", label: "Prestations" },
  { href: "/blog", label: "Blog" },
];

const rightLinks = [
  { href: "/temoignages", label: "Témoignages" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-brand-brown/80 transition-colors hover:text-brand-turquoise-dark"
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-cream/90 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3">
        <nav className="hidden items-center gap-6 lg:flex">
          {leftLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <Logo imgClassName="h-20 w-auto object-contain sm:h-28" />

        <div className="flex items-center justify-end gap-6">
          <nav className="hidden items-center gap-6 lg:flex">
            {rightLinks.map((link) => (
              <NavLink key={link.href} {...link} />
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
      </div>
    </header>
  );
}
