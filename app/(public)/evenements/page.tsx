import { Container } from "@/components/container";
import { getEvents } from "@/lib/data/public-content";

export const metadata = { title: "Événements" };

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EvenementsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => !e.is_past);
  const past = events.filter((e) => e.is_past);

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Événements
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Ateliers, stages et rencontres DOGFIT
      </h1>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-brand-brown">À venir</h2>
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
                <h3 className="mt-2 text-base font-bold text-brand-brown">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-brand-brown/70">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-bold text-brand-brown">Événements passés</h2>
        {past.length === 0 ? (
          <p className="mt-4 text-sm text-brand-brown/60">Rien à afficher pour l&apos;instant.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {past.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-brand-brown/10 bg-white p-6 opacity-80"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown/50">
                  {formatDate(event.starts_at)} · {event.location}
                </p>
                <h3 className="mt-2 text-base font-bold text-brand-brown">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-brand-brown/70">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
