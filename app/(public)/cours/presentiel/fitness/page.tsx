import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { PawPrint } from "@/components/icons";

export const metadata = {
  title: "Fitness en présentiel",
  description:
    "Séances individuelles de fitness canin en présentiel avec Marie Démaris : bilan postural, programme personnalisé, mobilité, renforcement musculaire et proprioception.",
  alternates: { canonical: "/cours/presentiel/fitness" },
};

const piliers = [
  "La mobilité articulaire",
  "Le renforcement musculaire",
  "La proprioception : conscience du corps et des membres, équilibre et coordination",
];

const pourQui = [
  "Accompagnement du chiot",
  "Amélioration des performances",
  "Harmonisation de posture",
  "Optimisation des mouvements",
  "Maintien du chien senior",
];

const tarifs = [
  { label: "1er rendez-vous bilan", price: "70 €" },
  { label: "Création de chaque programme (3 à 4 exercices)", price: "35 €" },
  { label: "Séance présentielle de 30 minutes", price: "25 €" },
];

export default function FitnessPresentielPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En présentiel
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Fitness en présentiel
      </h1>
      <div className="mt-4 max-w-2xl space-y-4 text-brand-brown/70">
        <p>
          En séance individuelle, chez moi, on part d&apos;un bilan complet de
          votre chien : posture, appuis, locomotion, capacités actuelles et vos
          objectifs.
        </p>
        <p>
          À partir de ce bilan, je construis un programme d&apos;exercices
          progressif et adapté, que l&apos;on travaille ensemble puis que vous
          refaites à la maison entre les séances.
        </p>
        <p>
          Vous débutez ? La page{" "}
          <Link
            href="/fitness-canin"
            className="font-semibold text-brand-orange hover:underline"
          >
            Le fitness canin, c&apos;est quoi ?
          </Link>{" "}
          explique les principes et à quels chiens il s&apos;adresse.
        </p>
      </div>

      <h2 className="mt-8 font-bold text-brand-brown">Le travail porte sur</h2>
      <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-3">
        {piliers.map((pilier) => (
          <div
            key={pilier}
            className="flex items-start gap-3 rounded-2xl bg-brand-cream-dark p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
              <PawPrint className="h-5 w-5 text-brand-orange" />
            </span>
            <p className="text-sm font-semibold text-brand-brown">{pilier}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-bold text-brand-brown">Pour quels chiens ?</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pourQui.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-brand-cream-dark px-5 py-4 text-sm font-semibold text-brand-brown"
          >
            {item}
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-bold text-brand-brown">Tarifs</h2>
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
        Vous travaillez le saut ? Voir la{" "}
        <Link
          href="/cours/presentiel/technique-de-saut"
          className="font-semibold text-brand-orange hover:underline"
        >
          technique de saut en présentiel
        </Link>
        . Vous préférez travailler à distance ? Découvrez le{" "}
        <Link
          href="/cours/coaching-en-ligne"
          className="font-semibold text-brand-orange hover:underline"
        >
          coaching en ligne
        </Link>{" "}
        ou la{" "}
        <Link
          href="/cours/classe-en-ligne"
          className="font-semibold text-brand-orange hover:underline"
        >
          classe en ligne
        </Link>
        .
      </p>

      <div className="mt-8">
        <LinkButton href="/contact" variant="accent">
          Être recontacté·e
        </LinkButton>
      </div>
    </Container>
  );
}
