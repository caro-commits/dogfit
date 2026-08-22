import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { dogfitContact } from "@/lib/placeholder-data";
import { getEvents } from "@/lib/data/public-content";
import { TravelMap } from "@/components/travel-map";
import { submitContactMessage } from "./actions";

export const metadata = {
  title: "Contact",
  description:
    "Une question sur le coaching fitness canin ? Contactez Marie Démaris, DOGFIT, pour démarrer un suivi personnalisé avec votre chien, ou retrouvez ses prochains événements.",
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const feedback = status ? statusMessages[status] : undefined;
  const events = await getEvents();
  const upcoming = events.filter((e) => !e.is_past);
  const past = events.filter((e) => e.is_past);

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
            Une question ? Écrivez à Marie
          </h1>
          <p className="mt-4 max-w-xl text-brand-brown/70">
            Que ce soit pour choisir le bon programme ou pour toute question
            sur le suivi de votre chien, n&apos;hésitez pas à laisser un
            message.
          </p>

          {feedback && (
            <div className={`mt-6 max-w-xl rounded-xl px-4 py-3 text-sm ${feedback.tone}`}>
              {feedback.text}
            </div>
          )}
        </div>

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
            <TravelMap events={events} />
          </div>
        </div>
      </div>

      <form action={submitContactMessage} className="mt-10 max-w-xl space-y-5">
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

      <div className="mt-16 border-t border-brand-brown/10 pt-16">
        <h2 className="text-2xl font-extrabold text-brand-brown sm:text-3xl">
          Événements
        </h2>

        <section className="mt-8">
          <h3 className="text-lg font-bold text-brand-brown">À venir</h3>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-brand-brown/60">
              Aucun événement prévu pour le moment — revenez bientôt !
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {upcoming.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-brand-turquoise/30 bg-brand-turquoise-light p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-turquoise-dark">
                    {formatDate(event.starts_at)} · {event.location}
                  </p>
                  <h4 className="mt-2 text-base font-bold text-brand-brown">
                    {event.title}
                  </h4>
                  <p className="mt-2 text-sm text-brand-brown/70">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-14">
            <h3 className="text-lg font-bold text-brand-brown">
              Événements passés
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {past.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-brand-brown/10 bg-white p-6 opacity-80"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown/50">
                    {formatDate(event.starts_at)} · {event.location}
                  </p>
                  <h4 className="mt-2 text-base font-bold text-brand-brown">
                    {event.title}
                  </h4>
                  <p className="mt-2 text-sm text-brand-brown/70">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}
