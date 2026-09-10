import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { ArrowIcon } from "@/components/icons";

export const metadata = {
  title: "Stages",
  description:
    "Stages de fitness canin et de technique de saut encadrés par Marie Démaris, chez les clubs et organisateurs, sur une journée ou une demi-journée. Prochains événements.",
  alternates: { canonical: "/stages" },
};

const stages = [
  {
    href: "/stages/fitness",
    title: "Stage fitness",
    description:
      "Renforcement musculaire, mobilité, proprioception, échauffement et récupération — en groupe, chaque chien à son niveau.",
  },
  {
    href: "/stages/saut",
    title: "Stage technique de saut",
    description:
      "Analyse du geste de saut, prise d'appel, gestion des foulées et fitness adapté aux exigences du saut, pour les chiens d'agility.",
  },
  {
    href: "/stages/evenements",
    title: "Événements",
    description:
      "Les prochains stages et ateliers ouverts aux inscriptions, ainsi que les événements passés.",
  },
];

export default function StagesPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En stage
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Stages
      </h1>
      <p className="mt-4 max-w-2xl text-brand-brown/70">
        J&apos;interviens chez les clubs et organisateurs pour des stages en
        groupe, sur une journée ou une demi-journée, du chiot au chien
        confirmé.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {stages.map((stage) => (
          <Link
            key={stage.href}
            href={stage.href}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-brand-brown">{stage.title}</h2>
            <p className="mt-2 flex-1 text-sm text-brand-brown/70">
              {stage.description}
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
              En savoir plus
              <ArrowIcon className="h-4 w-4 text-brand-orange" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <LinkButton href="/contact" variant="accent">
          Organiser un stage
        </LinkButton>
      </div>
    </Container>
  );
}
