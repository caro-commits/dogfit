import Link from "next/link";
import { getAllEvents } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { createEvent } from "./actions";

export const metadata = { title: "Admin — Événements" };

export default async function AdminEvenementsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Événements</h1>

      <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
        {events.length === 0 && (
          <p className="px-6 py-6 text-sm text-brand-brown/60">Aucun événement pour l&apos;instant.</p>
        )}
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/admin/evenements/${event.id}`}
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
          >
            <div>
              <p className="font-semibold text-brand-brown">{event.title}</p>
              <p className="text-xs text-brand-brown/60">
                {new Date(event.starts_at).toLocaleDateString("fr-FR")} · {event.location}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                event.is_past
                  ? "bg-brand-cream-dark text-brand-brown/60"
                  : "bg-brand-turquoise-light text-brand-turquoise-dark"
              }`}
            >
              {event.is_past ? "Passé" : "À venir"}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Nouvel événement</h2>
        <form action={createEvent} className="mt-4 space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="location" className="text-sm font-semibold text-brand-brown">
              Lieu
            </label>
            <input
              id="location"
              name="location"
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="starts_at" className="text-sm font-semibold text-brand-brown">
              Date
            </label>
            <input
              id="starts_at"
              name="starts_at"
              type="date"
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-semibold text-brand-brown">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="is_past" className="rounded" />
            Événement déjà passé
          </label>
          <Button type="submit">Créer l&apos;événement</Button>
        </form>
      </div>
    </div>
  );
}
