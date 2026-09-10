import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { PawPrint } from "@/components/icons";
import { dogfitJumpStage } from "@/lib/placeholder-data";

export const metadata = {
  title: "Technique de saut en présentiel",
  description:
    "Séances individuelles en présentiel dédiées à la technique de saut du chien d'agility : analyse du geste, gestion des foulées, coordination et fitness adapté au saut.",
  alternates: { canonical: "/cours/presentiel/technique-de-saut" },
};

const tarifs = [
  { label: "1er rendez-vous bilan", price: "70 €" },
  { label: "Séance présentielle de 30 minutes", price: "25 €" },
];

export default function TechniqueDeSautPresentielPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En présentiel
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Technique de saut en présentiel
      </h1>
      <div className="mt-4 max-w-2xl space-y-4 text-brand-brown/70">
        <p>
          En séance individuelle, on travaille spécifiquement la technique de
          saut de votre chien : qualité du geste, prise d&apos;appel, gestion
          des foulées et contrôle du corps sur la haie.
        </p>
      </div>

      <h2 className="mt-8 font-bold text-brand-brown">Votre chien&hellip;</h2>
      <ul className="mt-3 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitJumpStage.hooks.map((hook) => (
          <li key={hook} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {hook}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-bold text-brand-brown">Au programme</h2>
      <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-2">
        {dogfitJumpStage.programme.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl bg-brand-cream-dark p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
              <PawPrint className="h-5 w-5 text-brand-orange" />
            </span>
            <p className="text-sm font-semibold text-brand-brown">{item}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-brand-brown/70">
        Pour un travail en groupe, sur une journée ou une demi-journée,
        découvrez les{" "}
        <Link
          href="/stages/saut"
          className="font-semibold text-brand-orange hover:underline"
        >
          stages technique de saut
        </Link>
        .
      </p>
      <p className="mt-3 max-w-2xl text-sm text-brand-brown/70">
        Vous cherchez plutôt du renforcement général ? Voir le{" "}
        <Link
          href="/cours/presentiel/fitness"
          className="font-semibold text-brand-orange hover:underline"
        >
          fitness en présentiel
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

      <div className="mt-8">
        <LinkButton href="/contact" variant="accent">
          Être recontacté·e
        </LinkButton>
      </div>
    </Container>
  );
}
