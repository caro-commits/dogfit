import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { ArrowIcon } from "@/components/icons";
import {
  dogfitFormulas,
  dogfitPrestations,
  dogfitFollowUpLevels,
  dogfitPricing,
  dogfitFollowUpDetails,
  dogfitVideoAnalysis,
  dogfitRenewalExample,
  dogfitMateriel,
  dogfitMaterielImages,
  dogfitJumpStage,
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

      {/* Classe en ligne : isolée, formule pré-enregistrée via Canissimo */}
      <div className="mt-10">
        {dogfitPrestations
          .filter((prestation) => prestation.id === "classe-en-ligne")
          .map((prestation) => (
            <div
              key={prestation.id}
              className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-brand-brown">
                  {prestation.name}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-brand-brown/70">
                  {prestation.description}
                </p>
                {"topics" in prestation && (
                  <ul className="mt-3 space-y-1 text-sm text-brand-brown/70">
                    {prestation.topics.map((topic) => (
                      <li key={topic} className="flex gap-2">
                        <span className="text-brand-orange">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {"href" in prestation && (
                <Link
                  href={prestation.href}
                  target={"external" in prestation && prestation.external ? "_blank" : undefined}
                  rel={"external" in prestation && prestation.external ? "noopener noreferrer" : undefined}
                  className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-turquoise-dark hover:underline"
                >
                  {prestation.hrefLabel}
                  <ArrowIcon className="h-4 w-4 text-brand-orange" />
                </Link>
              )}
            </div>
          ))}
      </div>

      {/* Les 3 autres prestations, groupées : sur devis / contact requis */}
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {dogfitPrestations
          .filter((prestation) => prestation.id !== "classe-en-ligne")
          .map((prestation) => (
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
                  className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-turquoise-dark hover:underline"
                >
                  {prestation.hrefLabel}
                  <ArrowIcon className="h-4 w-4 text-brand-orange" />
                </Link>
              )}
            </div>
          ))}
      </div>
      <p className="mt-4 max-w-2xl text-sm text-brand-brown/70">
        Pour toute inscription à l&apos;un de ces programmes ou stages,
        merci de{" "}
        <Link
          href="/contact"
          className="font-semibold text-brand-turquoise-dark hover:underline"
        >
          prendre contact directement avec Marie
        </Link>
        .
      </p>

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
              <div className="mt-6 space-y-3 border-t border-brand-brown/10 pt-6 text-sm text-brand-brown/70">
                {formula.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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

        {/* Détails du renouvellement */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">
          Détails du renouvellement
        </h3>
        <div className="mt-6 max-w-2xl space-y-3 text-sm text-brand-brown/70">
          {dogfitRenewalExample.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* Analyse de vos vidéos */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">
          Analyse de vos vidéos
        </h3>
        <ul className="mt-6 space-y-3 text-sm text-brand-brown/70">
          {dogfitVideoAnalysis.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-turquoise-dark" />
              {detail}
            </li>
          ))}
        </ul>

        {/* Matériel nécessaire minimum */}
        <h3 className="mt-14 text-lg font-bold text-brand-brown">
          Matériel nécessaire minimum
        </h3>
        <ul className="mt-6 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitMateriel.minimum.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>

        <h4 className="mt-8 font-bold text-brand-brown">
          Pour fabriquer votre plateforme
        </h4>
        <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitMateriel.dimensions.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-2xl text-sm text-brand-brown/70">{dogfitMateriel.note}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {dogfitMaterielImages.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-xl ring-1 ring-brand-brown/10">
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
          <LinkButton href="/contact">Être recontacté·e</LinkButton>
        </div>
      </div>

      <div id="technique-saut" className="mt-20 scroll-mt-24 border-t border-brand-brown/10 pt-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
          En stage
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-brand-brown sm:text-3xl">
          Technique de saut et fitness adapté aux sauts
        </h2>

        <p className="mt-6 max-w-2xl font-semibold text-brand-brown">
          Votre chien...
        </p>
        <ul className="mt-3 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitJumpStage.hooks.map((hook) => (
            <li key={hook} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {hook}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-brand-brown/70">
          Ou peut-être avez-vous un jeune chien et souhaitez-vous lui
          apprendre à sauter sur de bonnes bases, dans le respect de son
          développement ?
        </p>

        <h3 className="mt-10 text-lg font-bold text-brand-brown">
          Au programme
        </h3>
        <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitJumpStage.programme.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-lg font-bold text-brand-brown">
          Formules possibles
        </h3>
        <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitJumpStage.formules.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-2xl text-xs text-brand-brown/50">
          En demi-journée, groupe de 4 binômes : matin technique de saut,
          après-midi fitness spécial saut. Marie se déplace généralement dans
          un rayon d&apos;environ 3h de route — pour une distance plus
          importante, contactez-la pour étudier la formule adaptée.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand-cream-dark p-6">
            <h3 className="font-bold text-brand-brown">Conditions</h3>
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
            <h3 className="font-bold text-brand-brown">
              Infrastructures à prévoir (organisateur)
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-brown/70">
              {dogfitJumpStage.infrastructures.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-turquoise-dark">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-10 text-lg font-bold text-brand-brown">
          Horaires type
        </h3>
        <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitJumpStage.horaires.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-lg font-bold text-brand-brown">
          Chaque participant devra prévoir
        </h3>
        <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
          {dogfitJumpStage.aPrevoir.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-turquoise-dark">•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-lg font-bold text-brand-brown">Tarifs</h3>
        <p className="mt-4 max-w-2xl text-sm text-brand-brown/70">
          Les tarifs sont établis sur devis, selon le lieu du stage. Le devis
          comprend les honoraires d&apos;intervention, les frais de
          déplacement, et les frais d&apos;hébergement si la distance ou les
          horaires ne permettent pas un aller-retour le jour même.
          L&apos;organisateur reste libre de fixer le tarif demandé aux
          participants.
        </p>

        <div className="mt-8">
          <LinkButton href="/contact" variant="accent">Organiser un stage</LinkButton>
        </div>
      </div>
    </Container>
  );
}
