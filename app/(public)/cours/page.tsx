import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { dogfitFormulas, dogfitPrestations } from "@/lib/placeholder-data";

export const metadata = { title: "Prestations" };

export default function CoursesPage() {
  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
            Prestations
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
            Tout ce que propose DOGFIT
          </h1>
        </div>
        <Link
          href="/temoignages"
          className="text-sm font-semibold text-brand-brown underline underline-offset-4"
        >
          Voir les avis
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dogfitPrestations.map((prestation) => (
          <div
            key={prestation.id}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5"
          >
            <h2 className="text-lg font-bold text-brand-brown">
              {prestation.name}
            </h2>
            <p className="mt-2 flex-1 text-sm text-brand-brown/70">
              {prestation.description}
            </p>
            {"price" in prestation && (
              <p className="mt-4 text-sm font-semibold text-brand-turquoise-dark">
                {prestation.price}
              </p>
            )}
            {"href" in prestation && (
              <Link
                href={prestation.href}
                target={"external" in prestation && prestation.external ? "_blank" : undefined}
                rel={"external" in prestation && prestation.external ? "noopener noreferrer" : undefined}
                className="mt-4 text-sm font-semibold text-brand-turquoise-dark hover:underline"
              >
                {prestation.hrefLabel} →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div id="formules" className="mt-20 scroll-mt-24 border-t border-brand-brown/10 pt-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
          Coaching en ligne
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-brand-brown sm:text-3xl">
          Les formules DOGFIT
        </h2>
        <p className="mt-4 max-w-2xl text-brand-brown/70">
          Chaque formule combine un bilan initial, un programme d&apos;exercices
          et des corrections vidéo personnalisées, à suivre depuis votre espace
          élève et un groupe de suivi privé.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {dogfitFormulas.map((formula) => (
            <div
              key={formula.id}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-brown/5"
            >
              <h3 className="text-lg font-bold text-brand-brown">
                {formula.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-turquoise-dark">
                {formula.tagline}
              </p>
              <p className="mt-4 flex-1 text-sm text-brand-brown/70">
                {formula.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-brand-brown/80">
                {formula.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-brand-turquoise-dark">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <LinkButton href="/tarifs">Voir les tarifs</LinkButton>
          <Link
            href="/contact"
            className="text-sm font-semibold text-brand-brown underline underline-offset-4"
          >
            Une question ? Contactez Marie
          </Link>
        </div>
      </div>
    </Container>
  );
}
