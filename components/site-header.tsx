"use client";

import { useState } from "react";
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
  { href: "/stages", label: "Stages" },
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
        Coaching
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

function MobileNavLink({
  href,
  label,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-lg px-3 py-3 text-base font-medium text-brand-brown transition-colors hover:bg-brand-cream-dark ${className}`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-cream/90 backdrop-blur">
      {/* Desktop */}
      <div className="mx-auto hidden w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3 lg:grid">
        <nav className="flex items-center gap-6">
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
          <nav className="flex items-center gap-6">
            {rightLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <LinkButton href="/inscription" className="text-xs sm:text-sm">
            Mon espace élève
          </LinkButton>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="flex w-full items-center justify-between px-4 py-2 lg:hidden">
        <Logo imgClassName="h-14 w-auto object-contain" onClick={close} />
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-brown transition-colors hover:bg-brand-brown/10"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-brand-brown/10 bg-brand-cream px-4 pb-4 pt-2 lg:hidden"
        >
          <LinkButton
            href="/inscription"
            onClick={close}
            className="mb-3 mt-2 w-full"
          >
            Mon espace élève
          </LinkButton>

          <div className="flex flex-col">
            {leftLinksBeforePrestations.map((link) => (
              <MobileNavLink key={link.href} {...link} onClick={close} />
            ))}
            <MobileNavLink href="/cours" label="Coaching" onClick={close} />
            <div className="flex flex-col border-l-2 border-brand-turquoise/30 pl-3">
              {prestationsSubLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  {...link}
                  onClick={close}
                  className="text-sm text-brand-brown/70"
                />
              ))}
            </div>
            {leftLinksAfterPrestations.map((link) => (
              <MobileNavLink key={link.href} {...link} onClick={close} />
            ))}
            {rightLinks.map((link) => (
              <MobileNavLink key={link.href} {...link} onClick={close} />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
