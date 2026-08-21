import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { dogfitContact } from "@/lib/placeholder-data";
import { getMapPins } from "@/lib/data/public-content";
import { TravelMap } from "@/components/travel-map";
import { submitContactMessage } from "./actions";

export const metadata = {
  title: "Contact",
  description:
    "Une question sur le coaching fitness canin ? Contactez Marie Démaris, DOGFIT, pour démarrer un suivi personnalisé avec votre chien.",
};

const statusMessages: Record<string, { text: string; tone: string }> = {
  success: {
    text: "Merci, votre message a bien été envoyé ! Marie vous répondra rapidement.",
    tone: "bg-brand-turquoise-light text-brand-turquoise-dark",
  },
  error: {
    text: "Une erreur est survenue, merci de réessayer ou de renseigner tous les champs.",
    tone: "bg-red-50 text-red-700",
  },
  unavailable: {
    text: `Le formulaire n'est pas encore actif — écrivez-nous directement à ${dogfitContact.email} en attendant.`,
    tone: "bg-amber-50 text-amber-800",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const feedback = status ? statusMessages[status] : undefined;
  const mapPins = await getMapPins();

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Une question ? Écrivez à Marie
      </h1>
      <p className="mt-4 max-w-xl text-brand-brown/70">
        Que ce soit pour choisir le bon programme ou pour toute question sur
        le suivi de votre chien, n&apos;hésitez pas à laisser un message.
      </p>

      {feedback && (
        <div className={`mt-6 max-w-xl rounded-xl px-4 py-3 text-sm ${feedback.tone}`}>
          {feedback.text}
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <form action={submitContactMessage} className="max-w-xl space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-brand-brown">
              Nom
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-brand-brown">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold text-brand-brown">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <Button type="submit">Envoyer</Button>
        </form>

        <div className="h-fit rounded-2xl bg-brand-cream-dark p-6">
          <p className="text-sm font-semibold text-brand-brown">
            {dogfitContact.name}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-brown/70">
            <li>
              <a
                href={`mailto:${dogfitContact.email}`}
                className="hover:text-brand-turquoise-dark"
              >
                {dogfitContact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${dogfitContact.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-turquoise-dark"
              >
                {dogfitContact.phone}
              </a>
            </li>
            <li>
              <a
                href={dogfitContact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-turquoise-dark"
              >
                Facebook
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <TravelMap pins={mapPins} />
          </div>
        </div>
      </div>
    </Container>
  );
}
