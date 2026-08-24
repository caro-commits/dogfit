import Link from "next/link";
import { Logo } from "./logo";
import { LinkButton } from "./button";

const leftLinksBeforePrestations = [
  { href: "/presentation", label: "Qui suis-je ?" },
  { href: "/fitness-canin", label: "Fitness canin" },
];

const leftLinksAfterPrestations = [{ href: "/blog", label: "Blog" }];

const rightLinks = [
  { href: "/temoignages", label: "Témoignages" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const prestationsSubLinks = [
  { href: "/cours#classe-en-ligne", label: "Classe en ligne" },
  { href: "/cours#presentiel", label: "Cours en présentiel" },
  { href: "/cours#formules", label: "Coaching en ligne" },
  { href: "/cours#technique-saut", label: "Stages" },
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

function PrestationsNavLink() {
  return (
    <div className="group relative">
      <Link
        href="/cours"
        className="text-sm font-medium text-brand-brown/80 transition-colors hover:text-brand-turquoise-dark"
      >
        Prestations
      </Link>
      <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-2xl bg-white py-2 shadow-lg ring-1 ring-brand-brown/10">
          {prestationsSubLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm text-brand-brown/80 transition-colors hover:bg-brand-cream hover:text-brand-turquoise-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-cream/90 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3">
        <nav className="hidden items-center gap-6 lg:flex">
          {leftLinksBeforePrestations.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <PrestationsNavLink />
          {leftLinksAfterPrestations.map((link) => (
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
            <LinkButton href="/inscription" className="text-xs sm:text-sm">
              Mon espace élève
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
