import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { dogfitJumpStage } from "@/lib/placeholder-data";
import { getEvents } from "@/lib/data/public-content";
import { TravelMap } from "@/components/travel-map";

export const metadata = {
  title: "Stages",
  description:
    "Stages de fitness canin et de technique de saut encadrés par Marie Démaris, chez les clubs et organisateurs : programme, conditions, infrastructures et tarifs.",
};

export default async function StagesPage() {
  const events = await getEvents();

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        En stage
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Stages
      </h1>
      <ul className="mt-4 space-y-1 text-brand-brown">
        <li>• Fitness</li>
        <li>• Technique de saut</li>
      </ul>

      <h2
        id="technique-saut"
        className="mt-10 scroll-mt-24 text-lg font-bold text-brand-turquoise-dark"
      >
        Technique de saut
      </h2>
      <p className="mt-4 max-w-2xl font-semibold text-brand-brown">
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
        Ou peut-être avez-vous un jeune chien et souhaitez-vous lui apprendre
        à sauter sur de bonnes bases, dans le respect de son développement ?
      </p>

      <h3 className="mt-10 font-bold text-brand-brown">Au programme</h3>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitJumpStage.programme.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>

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

      <h2 className="mt-14 text-lg font-bold text-brand-brown">
        Formules possibles
      </h2>
      <ul className="mt-4 max-w-2xl space-y-2 text-sm text-brand-brown/70">
        {dogfitJumpStage.formules.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-brand-turquoise-dark">•</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-2xl text-xs text-brand-brown/50">
        En demi-journée, groupe de 4 binômes : matin fitness spécial saut,
        après-midi technique de saut. Je me déplace généralement dans un
        rayon d&apos;environ 3h de route — pour une distance plus
        importante, contactez-moi pour étudier la formule adaptée.
      </p>
      <div className="mt-6 max-w-2xl">
        <TravelMap events={events} />
      </div>

      <h2 className="mt-10 text-lg font-bold text-brand-brown">
        Horaires type
      </h2>
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
        comprend les honoraires d&apos;intervention, les frais de
        déplacement, et les frais d&apos;hébergement si la distance ou les
        horaires ne permettent pas un aller-retour le jour même.
        L&apos;organisateur reste libre de fixer le tarif demandé aux
        participants.
      </p>

      <div className="mt-8">
        <LinkButton href="/contact" variant="accent">
          Organiser un stage
        </LinkButton>
      </div>
    </Container>
  );
}
