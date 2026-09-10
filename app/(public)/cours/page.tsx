import Link from "next/link";
import { Container } from "@/components/container";
import { ArrowIcon } from "@/components/icons";
import { dogfitPrestations } from "@/lib/placeholder-data";

export const metadata = {
  title: "Coaching",
  description:
    "Classe en ligne, cours en présentiel ou coaching personnalisé en ligne : découvrez les formules DOGFIT pour progresser en fitness canin avec votre chien.",
  alternates: { canonical: "/cours" },
};

const coachingOptions = dogfitPrestations.filter(
  (prestation) => prestation.id !== "technique-saut",
);

export default function CoachingPage() {
  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
            Coaching
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
            Le coaching fitness canin DOGFIT
          </h1>
          <p className="mt-4 max-w-2xl text-brand-brown/70">
            Trois façons de travailler avec moi, du chiot au chien sénior, en
            préparation au sport canin ou non. Choisissez la formule qui vous
            convient.
          </p>
        </div>
        <Link
          href="/temoignages"
          className="text-sm font-semibold text-brand-brown underline underline-offset-4"
        >
          Voir les avis
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {coachingOptions.map((option) => (
          <Link
            key={option.id}
            href={option.href}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-brand-brown">{option.name}</h2>
            <p className="mt-2 text-sm text-brand-brown/70">
              {option.description}
            </p>
            {"topics" in option && (
              <ul className="mt-3 space-y-1 text-sm text-brand-brown/70">
                {option.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="text-brand-orange">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex-1" />
            <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
              {option.hrefLabel}
              <ArrowIcon className="h-4 w-4 text-brand-orange" />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-sm text-brand-brown/70">
        Pour toute inscription à l&apos;un de ces programmes, merci de{" "}
        <Link
          href="/contact"
          className="font-semibold text-brand-turquoise-dark hover:underline"
        >
          me contacter directement
        </Link>
        .
      </p>
    </Container>
  );
}
