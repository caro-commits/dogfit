import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { dogfitJumpStage } from "@/lib/placeholder-data";

export const metadata = {
  title: "Stage fitness",
  description:
    "Stage de fitness canin en groupe, encadré par Marie Démaris chez les clubs et organisateurs : renforcement musculaire, mobilité, proprioception, conditions et tarifs.",
  alternates: { canonical: "/stages/fitness" },
};

const programme = [
  "Travail des postures de base et de la proprioception (conscience du corps et des appuis)",
  "Exercices de renforcement musculaire, adaptés au niveau de chaque chien",
  "Échauffement et récupération, pour bien encadrer l'effort",
  "Conseils pour reproduire les exercices à la maison en toute sécurité",
];

export default function StageFitnessPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En stage
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Stage fitness
      </h1>
      <div className="mt-4 max-w-2xl space-y-4 text-brand-brown/70">
        <p>
          Un stage pour découvrir ou approfondir le fitness canin en groupe :
          renforcement musculaire, mobilité, proprioception, échauffement et
          récupération, sur une journée ou une demi-journée.
        </p>
        <p>
          Chaque chien travaille à son niveau, avec des exercices adaptés et un
          suivi individualisé pendant les passages.
        </p>
      </div>

      <h2 className="mt-8 font-bold text-brand-brown">Au programme</h2>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {programme.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-cream-dark p-6">
          <h2 className="font-bold text-brand-brown">Conditions</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-brown/70">
            {dogfitJumpStage.conditions.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-turquoise-dark">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-brand-cream-dark p-6">
          <h2 className="font-bold text-brand-brown">
            Infrastructures à prévoir (organisateur)
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-brown/70">
            <li className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              Un espace abrité (barnum, salle, auvent&hellip;) d&apos;environ
              5 m × 5 m
            </li>
            <li className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              J&apos;apporte l&apos;ensemble du matériel spécifique nécessaire
              au déroulement du stage
            </li>
          </ul>
        </div>
      </div>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">Horaires type</h2>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitJumpStage.horaires.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-bold text-brand-brown">
        Chaque participant devra prévoir
      </h2>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitJumpStage.aPrevoir.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-bold text-brand-brown">Tarifs</h2>
      <p className="mt-4 max-w-2xl text-sm text-brand-brown/70">
        Les tarifs sont établis sur devis, selon le lieu du stage. Le devis
        comprend les honoraires d&apos;intervention, les frais de déplacement,
        et les frais d&apos;hébergement si la distance ou les horaires ne
        permettent pas un aller-retour le jour même. L&apos;organisateur reste
        libre de fixer le tarif demandé aux participants.
      </p>

      <div className="mt-8">
        <LinkButton href="/contact" variant="accent">
          Organiser un stage
        </LinkButton>
      </div>

      <p className="mt-10 max-w-2xl text-sm text-brand-brown/70">
        Voir aussi le{" "}
        <Link
          href="/stages/saut"
          className="font-semibold text-brand-orange hover:underline"
        >
          stage technique de saut
        </Link>{" "}
        et les{" "}
        <Link
          href="/stages/evenements"
          className="font-semibold text-brand-orange hover:underline"
        >
          prochains événements
        </Link>
        .
      </p>
    </Container>
  );
}
