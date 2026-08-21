import Image from "next/image";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { PawPrint } from "@/components/icons";
import { dogfitFormulas, placeholderTestimonials } from "@/lib/placeholder-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-turquoise-light to-brand-cream">
        <PawPrint className="pointer-events-none absolute -left-6 top-10 h-24 w-24 -rotate-12 text-brand-orange" />
        <PawPrint className="pointer-events-none absolute right-10 top-1/2 h-16 w-16 rotate-45 text-brand-orange" />
        <PawPrint className="pointer-events-none absolute bottom-4 left-1/3 h-20 w-20 rotate-12 text-brand-orange" />
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-turquoise-dark shadow-sm">
              Coaching fitness canin en ligne
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-brown sm:text-5xl">
              Faites progresser votre chien, exercice après exercice.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-brand-brown/80">
              Marie Démaris, coach fitness canin, vous accompagne avec des
              cours en ligne, des exercices personnalisés et des corrections
              vidéo — pour renforcer votre chien en toute sécurité, où que
              vous soyez.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/cours">Découvrir les prestations</LinkButton>
              <LinkButton href="/presentation" variant="ghost">
                Qui est Marie ?
              </LinkButton>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-white shadow-xl" />
            <Image
              src="/brand/logo.png"
              alt="DOGFIT — Coach Fitness Canin"
              fill
              className="relative object-contain p-8"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              {
                title: "Des cours structurés",
                text: "Vidéos, fiches PDF et exercices progressifs pour avancer à votre rythme.",
                color: "bg-brand-turquoise",
              },
              {
                title: "Des corrections personnalisées",
                text: "Envoyez vos exercices, Marie les corrige avec note, commentaires et conseils.",
                color: "bg-brand-orange",
              },
              {
                title: "Un vrai suivi",
                text: "Retrouvez votre progression, vos exercices et vos corrections dans votre espace élève.",
                color: "bg-brand-brown-light",
              },
            ].map((item) => (
              <div key={item.title}>
                <div className={`mb-4 h-10 w-10 rounded-full ${item.color}`} />
                <h3 className="text-lg font-bold text-brand-brown">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-brown/70">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-cream-dark py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-brand-brown sm:text-3xl">
              Les formules DOGFIT
            </h2>
            <LinkButton href="/cours#formules" variant="ghost" className="hidden sm:inline-flex">
              Voir les tarifs
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {dogfitFormulas.map((formula) => (
              <div
                key={formula.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5"
              >
                <h3 className="text-lg font-bold text-brand-brown">
                  {formula.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-turquoise-dark">
                  {formula.tagline}
                </p>
                <p className="mt-2 flex-1 text-sm text-brand-brown/70">
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
          <LinkButton href="/cours#formules" variant="ghost" className="mt-8 sm:hidden">
            Voir les tarifs
          </LinkButton>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold text-brand-brown sm:text-3xl">
            Ce qu&apos;ils en disent
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {placeholderTestimonials.map((t) => (
              <blockquote
                key={t.id}
                className="rounded-2xl border border-brand-brown/10 p-6 text-sm text-brand-brown/80"
              >
                <p>&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 font-semibold text-brand-brown">
                  {t.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-brown py-16 text-white">
        <Image
          src="/home/agility-jump.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-brown via-brand-brown/20 to-brand-brown" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Prêt·e à commencer avec votre chien ?
          </h2>
          <p className="max-w-xl text-brand-cream/80">
            Contactez Marie pour démarrer un suivi : elle crée votre espace
            élève et vous transmet vos accès personnellement.
          </p>
          <LinkButton href="/inscription">Mon espace élève</LinkButton>
        </Container>
      </section>
    </>
  );
}
