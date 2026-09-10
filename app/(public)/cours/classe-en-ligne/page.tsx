import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { canissimoUrl } from "@/lib/placeholder-data";

export const metadata = {
  title: "Classe en ligne",
  description:
    "Les formations en ligne de fitness canin de Marie Démaris, disponibles sur la plateforme Canissimo avec Yannick Toulon.",
  alternates: { canonical: "/cours/classe-en-ligne" },
};

const topics = [
  "Fitness canin, tout pour bien débuter",
  "Échauffement et récupération, pour bien accompagner son chien",
];

export default function ClasseEnLignePage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Coaching
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Classe en ligne
      </h1>

      <div className="mt-6 max-w-2xl space-y-4 text-brand-brown/70">
        <p>
          Retrouvez mes formations en ligne sur la plateforme{" "}
          <span className="font-semibold text-brand-brown">Canissimo</span>, aux
          côtés de Yannick Toulon. Ce sont des formations pré-enregistrées, que
          vous suivez à votre rythme, où que vous soyez.
        </p>
        <p>Au programme :</p>
      </div>
      <ul className="mt-3 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {topics.map((topic) => (
          <li key={topic} className="flex gap-2">
            <span className="text-brand-orange">•</span>
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <LinkButton href={canissimoUrl} variant="accent" target="_blank">
          Voir les formations sur Canissimo
        </LinkButton>
      </div>

      <p className="mt-10 max-w-2xl text-sm text-brand-brown/70">
        Vous cherchez plutôt un suivi personnalisé ? Découvrez le{" "}
        <Link
          href="/cours/coaching-en-ligne"
          className="font-semibold text-brand-turquoise-dark hover:underline"
        >
          coaching en ligne
        </Link>{" "}
        ou les{" "}
        <Link
          href="/cours/presentiel"
          className="font-semibold text-brand-turquoise-dark hover:underline"
        >
          cours en présentiel
        </Link>
        .
      </p>
    </Container>
  );
}
