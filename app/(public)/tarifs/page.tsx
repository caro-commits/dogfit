import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import {
  dogfitFormulas,
  dogfitFollowUpLevels,
  dogfitPricing,
  dogfitFollowUpDetails,
} from "@/lib/placeholder-data";

export const metadata = { title: "Tarifs" };

export default function TarifsPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Coaching en ligne — Forfaits 1 mois
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Des programmes adaptés. Un suivi personnalisé.
      </h1>
      <p className="mt-4 max-w-2xl text-brand-brown/70">
        Deux formules selon le niveau de votre chien, trois niveaux de suivi
        selon le temps que vous pouvez y consacrer. Le paiement en ligne
        sécurisé sera bientôt disponible directement depuis le site — en
        attendant, contactez Marie pour démarrer votre suivi.
      </p>

      {/* Formules */}
      <h2 className="mt-12 text-xl font-bold text-brand-brown">
        Les formules de suivi
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {dogfitFormulas.map((formula) => (
          <div
            key={formula.id}
            className="flex flex-col rounded-2xl border border-brand-brown/10 bg-white p-8 shadow-sm"
          >
            <h3 className="text-lg font-bold text-brand-brown">
              {formula.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-brand-turquoise-dark">
              {formula.tagline}
            </p>
            <p className="mt-4 text-sm text-brand-brown/70">
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
      <h2 className="mt-14 text-xl font-bold text-brand-brown">
        Les niveaux de suivi
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {dogfitFollowUpLevels.map((level) => (
          <div
            key={level.id}
            className="rounded-2xl bg-brand-cream-dark p-6"
          >
            <h3 className="font-bold text-brand-brown">{level.name}</h3>
            <p className="mt-2 text-sm text-brand-brown/70">
              {level.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tableau des tarifs */}
      <h2 className="mt-14 text-xl font-bold text-brand-brown">Tarifs</h2>
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
        Le tarif « Renouvellement » s&apos;applique si l&apos;interruption entre deux
        suivis est inférieure à un mois. Le niveau « Solo » n&apos;existe que
        pour la formule Fitness.
      </p>

      {/* Fonctionnement du suivi */}
      <h2 className="mt-14 text-xl font-bold text-brand-brown">
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

      <div className="mt-12 flex flex-wrap gap-4">
        <LinkButton href="/contact">Être recontacté·e</LinkButton>
        <LinkButton href="/cours" variant="ghost">
          Découvrir les formules
        </LinkButton>
      </div>
    </Container>
  );
}
