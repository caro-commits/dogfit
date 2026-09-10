import Image from "next/image";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import {
  dogfitFormulas,
  dogfitFollowUpLevels,
  dogfitPricing,
  dogfitFollowUpDetails,
  dogfitVideoAnalysis,
  dogfitRenewalExample,
  dogfitMateriel,
  dogfitMaterielImages,
} from "@/lib/placeholder-data";

export const metadata = {
  title: "Coaching en ligne",
  description:
    "Le coaching fitness canin en ligne DOGFIT : formules Fondations et Fitness, niveaux de suivi, tarifs, corrections vidéo et matériel nécessaire.",
  alternates: { canonical: "/cours/coaching-en-ligne" },
};

export default function CoachingEnLignePage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Coaching en ligne
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Les formules DOGFIT
      </h1>
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
            <h2 className="text-lg font-bold text-brand-brown">
              {formula.name}
            </h2>
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
            <div className="mt-6 space-y-3 border-t border-brand-brown/10 pt-6 text-sm text-brand-brown/70">
              {formula.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Les niveaux de suivi
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {dogfitFollowUpLevels.map((level) => (
          <div key={level.id} className="rounded-2xl bg-brand-cream-dark p-6">
            <h3 className="font-bold text-brand-brown">{level.name}</h3>
            <p className="mt-2 text-sm text-brand-brown/70">
              {level.description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">Tarifs</h2>
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

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Fonctionnement du suivi
      </h2>
      <ul className="mt-6 space-y-3 text-sm text-brand-brown/70">
        {dogfitFollowUpDetails.map((detail) => (
          <li key={detail} className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-turquoise-dark" />
            {detail}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Détails du renouvellement
      </h2>
      <div className="mt-6 max-w-2xl space-y-3 text-sm text-brand-brown/70">
        {dogfitRenewalExample.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Analyse de vos vidéos
      </h2>
      <ul className="mt-6 space-y-3 text-sm text-brand-brown/70">
        {dogfitVideoAnalysis.map((detail) => (
          <li key={detail} className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-turquoise-dark" />
            {detail}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Matériel nécessaire minimum
      </h2>
      <ul className="mt-6 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitMateriel.minimum.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-8 font-bold text-brand-brown">
        Pour fabriquer votre plateforme
      </h3>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitMateriel.dimensions.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-2xl text-sm text-brand-brown/70">
        {dogfitMateriel.note}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {dogfitMaterielImages.map((image) => (
          <div
            key={image.src}
            className="overflow-hidden rounded-xl ring-1 ring-brand-brown/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <LinkButton href="/contact" variant="accent">
          Être recontacté·e
        </LinkButton>
      </div>
    </Container>
  );
}
