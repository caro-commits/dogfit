import Link from "next/link";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import {
  dogfitFormulas,
  dogfitPrestations,
  dogfitFollowUpLevels,
  dogfitPricing,
  dogfitFollowUpDetails,
} from "@/lib/placeholder-data";

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

      <div id="presentiel" className="mt-20 scroll-mt-24 border-t border-brand-brown/10 pt-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
          En présentiel
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-brand-brown sm:text-3xl">
          Cours de fitness en présentiel
        </h2>
        <p className="mt-4 max-w-2xl text-brand-brown/70">
          Retrouvez Marie chez elle pour un bilan et un plan
          d&apos;entraînement adapté à votre chien.
        </p>
        <p className="mt-6 text-3xl font-extrabold text-brand-turquoise-dark">
          25 €{" "}
          <span className="text-base font-semibold text-brand-brown/60">
            la séance
          </span>
        </p>
        <div className="mt-8">
          <LinkButton href="/contact">Être recontacté·e</LinkButton>
        </div>
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

        {/* Niveaux de suivi */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">
          Les niveaux de suivi
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {dogfitFollowUpLevels.map((level) => (
            <div key={level.id} className="rounded-2xl bg-brand-cream-dark p-6">
              <h4 className="font-bold text-brand-brown">{level.name}</h4>
              <p className="mt-2 text-sm text-brand-brown/70">
                {level.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tableau des tarifs */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">Tarifs</h3>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-brown/10">
          <table className="w-full min-w-[420px] border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-white p-4 text-left text-sm text-brand-brown/60" />
                <th className="bg-brand-turquoise p-4 text-sm font-bold uppercase tracking-wide text-white">
                  Fondations
                </th>
                <th className="bg-brand-brown-light p-4 text-sm font-bold uppercase tracking-wide text-white">
                  Fitness
                </th>
              </tr>
            </thead>
            <tbody>
              {dogfitPricing.map((row) => (
                <tr key={row.level} className="border-t border-brand-brown/10">
                  <th
                    scope="row"
                    className="p-4 text-left text-sm font-semibold text-brand-brown"
                  >
                    {row.level}
                  </th>
                  <td className="p-4 font-bold text-brand-brown">
                    {row.fondations !== null ? `${row.fondations} €` : "—"}
                  </td>
                  <td className="p-4 font-bold text-brand-brown">
                    {row.fitness} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-brand-brown/50">
          Le tarif « Renouvellement » s&apos;applique si l&apos;interruption entre
          deux suivis est inférieure à un mois. Le niveau « Solo » n&apos;existe
          que pour la formule Fitness.
        </p>

        {/* Fonctionnement du suivi */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">
          Fonctionnement du suivi
        </h3>
        <ul className="mt-6 space-y-3 text-sm text-brand-brown/70">
          {dogfitFollowUpDetails.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-turquoise-dark" />
              {detail}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <LinkButton href="/contact">Être recontacté·e</LinkButton>
        </div>
      </div>
    </Container>
  );
}
