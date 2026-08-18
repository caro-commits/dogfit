import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { getPublishedTestimonials } from "@/lib/data/public-content";
import { dogfitContact } from "@/lib/placeholder-data";
import { submitTestimonial } from "./actions";

export const metadata = { title: "Témoignages" };

const statusMessages: Record<string, { text: string; tone: string }> = {
  success: {
    text: "Merci pour votre avis ! Il sera publié après validation par Marie.",
    tone: "bg-brand-turquoise-light text-brand-turquoise-dark",
  },
  error: {
    text: "Une erreur est survenue, merci de réessayer ou de renseigner tous les champs.",
    tone: "bg-red-50 text-red-700",
  },
  unavailable: {
    text: `L'envoi d'avis n'est pas encore actif — écrivez-nous directement à ${dogfitContact.email} en attendant.`,
    tone: "bg-amber-50 text-amber-800",
  },
};

function Stars({ rating }: { rating: number }) {
  return (
    <p className="mt-2 text-brand-turquoise-dark" aria-label={`${rating} sur 5`}>
      {"★".repeat(rating)}
      <span className="text-brand-brown/20">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

export default async function TemoignagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [testimonials, { status }] = await Promise.all([
    getPublishedTestimonials(),
    searchParams,
  ]);
  const feedback = status ? statusMessages[status] : undefined;

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Témoignages
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Ils m&apos;ont fait confiance 🐾
      </h1>
      <p className="mt-4 max-w-2xl text-brand-brown/70">
        Parce que chaque chien est unique, chaque accompagnement l&apos;est
        aussi. Vos retours me permettent de grandir, d&apos;ajuster, et
        d&apos;apporter le meilleur dans chaque séance. Merci du fond du cœur
        pour vos mots 🙏
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote
            key={t.id}
            className="rounded-2xl border border-brand-brown/10 bg-white p-6 text-brand-brown/80"
          >
            {"title" in t && t.title && (
              <p className="font-bold text-brand-brown">{t.title}</p>
            )}
            <p className="mt-1">&ldquo;{t.content}&rdquo;</p>
            <footer className="mt-4 font-semibold text-brand-brown">
              {t.name}
            </footer>
            {"rating" in t && !!t.rating && <Stars rating={t.rating} />}
          </blockquote>
        ))}
      </div>

      <div className="mt-16 max-w-xl border-t border-brand-brown/10 pt-10">
        <h2 className="text-xl font-bold text-brand-brown">
          Vous avez testé une séance de fitness canin, un stage ou un
          accompagnement complet ?
        </h2>
        <p className="mt-2 text-sm text-brand-brown/70">
          Racontez votre expérience ici, cela pourrait aider d&apos;autres
          humains à faire le premier pas avec leur compagnon 💛 Votre avis
          sera publié ici après validation par Marie.
        </p>

        {feedback && (
          <div className={`mt-6 rounded-xl px-4 py-3 text-sm ${feedback.tone}`}>
            {feedback.text}
          </div>
        )}

        <form action={submitTestimonial} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-brand-brown">
              Nom complet
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Quel est votre nom complet ?"
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 placeholder:text-brand-brown/40 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre <span className="font-normal text-brand-brown/50">(optionnel)</span>
            </label>
            <input
              id="title"
              name="title"
              placeholder="Un titre pour votre témoignage"
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 placeholder:text-brand-brown/40 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="content" className="text-sm font-semibold text-brand-brown">
              Témoignage
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={5}
              placeholder="Que pensez-vous de nous ?"
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 placeholder:text-brand-brown/40 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="rating" className="text-sm font-semibold text-brand-brown">
              Note <span className="font-normal text-brand-brown/50">(optionnel)</span>
            </label>
            <select
              id="rating"
              name="rating"
              defaultValue=""
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            >
              <option value="">Pas de note</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>
          </div>
          <Button type="submit">Envoyer mon avis</Button>
        </form>
      </div>
    </Container>
  );
}
