import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventById } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { updateEvent, deleteEvent } from "./actions";

export default async function AdminEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const updateAction = updateEvent.bind(null, id);
  const deleteAction = deleteEvent.bind(null, id);

  return (
    <div>
      <Link href="/admin/evenements" className="text-sm font-medium text-brand-turquoise-dark hover:underline">
        ← Événements
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{event.title}</h1>

      <div className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <form action={updateAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              defaultValue={event.title}
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
              defaultValue={event.location}
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
              defaultValue={event.starts_at}
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
              defaultValue={event.description}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="is_past" defaultChecked={event.is_past} className="rounded" />
            Événement déjà passé
          </label>
          <Button type="submit">Enregistrer</Button>
        </form>
        <form action={deleteAction} className="mt-4 border-t border-brand-brown/10 pt-4">
          <button className="text-sm font-medium text-red-600 hover:underline">
            Supprimer cet événement
          </button>
        </form>
      </div>
    </div>
  );
}
