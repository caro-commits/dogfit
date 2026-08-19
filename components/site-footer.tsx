import Link from "next/link";
import { Container } from "./container";
import { dogfitContact } from "@/lib/placeholder-data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brand-brown/10 bg-brand-cream-dark">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-brand-brown">DOGFIT</p>
          <p className="mt-2 text-sm text-brand-brown/70">
            Coaching fitness canin par Marie Démaris. Des cours en ligne et un
            suivi personnalisé pour progresser avec votre chien, en toute
            sécurité.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-brand-brown/70">
            <li>
              <a
                href={`mailto:${dogfitContact.email}`}
                className="hover:text-brand-turquoise-dark"
              >
                {dogfitContact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${dogfitContact.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-turquoise-dark"
              >
                {dogfitContact.phone}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-brown">Le site</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-brown/70">
            <li><Link href="/presentation" className="hover:text-brand-turquoise-dark">Présentation</Link></li>
            <li><Link href="/cours" className="hover:text-brand-turquoise-dark">Prestations</Link></li>
            <li><Link href="/blog" className="hover:text-brand-turquoise-dark">Blog</Link></li>
            <li><Link href="/evenements" className="hover:text-brand-turquoise-dark">Événements</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-brown">Aide</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-brown/70">
            <li><Link href="/faq" className="hover:text-brand-turquoise-dark">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-brand-turquoise-dark">Contact</Link></li>
            <li><Link href="/connexion" className="hover:text-brand-turquoise-dark">Connexion</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-brown">Espace élève</p>
          <p className="mt-3 text-sm text-brand-brown/70">
            Déjà inscrit·e à un cours DOGFIT ?
          </p>
          <Link
            href="/espace"
            className="mt-2 inline-block text-sm font-semibold text-brand-turquoise-dark hover:underline"
          >
            Accéder à mon espace →
          </Link>
        </div>
      </Container>
      <div className="border-t border-brand-brown/10 py-5 text-center text-xs text-brand-brown/60">
        © {new Date().getFullYear()} DOGFIT — Marie Démaris. SIRET {dogfitContact.siret}. Tous droits réservés.
      </div>
    </footer>
  );
}
