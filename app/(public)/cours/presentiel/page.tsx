import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { ArrowIcon } from "@/components/icons";

export const metadata = {
  title: "Cours en présentiel",
  description:
    "Séances de fitness canin en présentiel avec Marie Démaris : bilan complet, programme personnalisé, travail de la technique de saut. Tarifs et fonctionnement.",
  alternates: { canonical: "/cours/presentiel" },
};

const disciplines = [
  {
    href: "/cours/presentiel/fitness",
    title: "Fitness",
    description:
      "Bilan postural, programme personnalisé et travail de la mobilité, du renforcement musculaire et de la proprioception.",
  },
  {
    href: "/cours/presentiel/technique-de-saut",
    title: "Technique de saut",
    description:
      "Séances individuelles dédiées au geste de saut : prise d'appel, gestion des foulées, coordination et contrôle du corps.",
  },
];

const tarifs = [
  { label: "1er rendez-vous bilan", price: "70 €" },
  { label: "Création de chaque programme (3 à 4 exercices)", price: "35 €" },
  { label: "Séance présentielle de 30 minutes", price: "25 €" },
];

export default function PresentielPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En présentiel
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Cours en présentiel
      </h1>
      <div className="mt-4 max-w-2xl space-y-4 text-brand-brown/70">
        <p>
          Je propose des séances en présentiel adaptées aux besoins et au
          niveau de chaque chien.
        </p>
        <p>
          Le premier rendez-vous permet de faire un bilan complet afin de
          définir les objectifs et de mettre en place un programme
          personnalisé.
        </p>
      </div>
      <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
        {disciplines.map((discipline) => (
          <Link
            key={discipline.href}
            href={discipline.href}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-brand-brown">
              {discipline.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-brand-brown/70">
              {discipline.description}
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
              En savoir plus
              <ArrowIcon className="h-4 w-4 text-brand-orange" />
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-bold text-brand-brown">Tarifs</h2>
      <div className="mt-4 max-w-md space-y-3">
        {tarifs.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-xl bg-brand-cream-dark px-4 py-3"
          >
            <span className="text-sm text-brand-brown">{item.label}</span>
            <span className="shrink-0 whitespace-nowrap font-bold text-brand-turquoise-dark">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-sm text-brand-brown/70">
        Un PDF récapitulatif est fourni pour chaque circuit afin de pouvoir
        refaire les exercices facilement à la maison entre les séances.
      </p>
      <p className="mt-3 max-w-2xl text-sm text-brand-brown/70">
        Il existe également des{" "}
        <Link
          href="/cours/coaching-en-ligne"
          className="font-semibold text-brand-orange hover:underline"
        >
          classes et accompagnements en ligne
        </Link>{" "}
        si vous préférez travailler à distance ou avec plus de flexibilité dans
        l&apos;organisation.
      </p>

      <div className="mt-8">
        <LinkButton href="/contact" variant="accent">
          Être recontacté·e
        </LinkButton>
      </div>
    </Container>
  );
}
