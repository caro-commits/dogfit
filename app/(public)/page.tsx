import Image from "next/image";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { placeholderTestimonials, dogfitContact } from "@/lib/placeholder-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DOGFIT — Marie Démaris",
  description:
    "Coaching fitness canin par Marie Démaris : cours en ligne, suivi personnalisé et corrections d'exercices pour progresser avec votre chien.",
  url: "https://www.dogfit-mariedemaris.fr",
  telephone: dogfitContact.phone,
  email: dogfitContact.email,
  image: "https://www.dogfit-mariedemaris.fr/brand/logo.png",
  sameAs: [dogfitContact.facebook],
  areaServed: "FR",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden bg-brand-brown">
        <Image
          src="/presentation/marie-et-son-chien.jpg"
          alt="Marie Démaris et son chien"
          fill
          priority
          className="object-cover object-[75%_center] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/85 to-brand-brown/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-transparent to-transparent" />
        <Container className="relative py-24 lg:py-36">
          <div className="max-w-xl">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              Coaching fitness canin en ligne
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Faites progresser votre chien, exercice après exercice.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              Je suis Marie Démaris, coach fitness canin, et je vous
              accompagne avec des cours en ligne, des exercices
              personnalisés et des corrections
              vidéo — pour renforcer votre chien en toute sécurité, où que
              vous soyez.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/cours" variant="accent">Découvrir les prestations</LinkButton>
              <LinkButton href="/presentation" variant="ghost-light">
                Qui suis-je ?
              </LinkButton>
            </div>
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
                text: "Envoyez vos exercices, je les corrige avec note, commentaires et conseils.",
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
          className="object-cover opacity-70 contrast-125 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/80 via-brand-brown/10 to-brand-brown/80" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Prêt·e à commencer avec votre chien ?
          </h2>
          <p className="max-w-xl text-brand-cream/80">
            Contactez-moi pour démarrer un suivi : je crée votre espace
            élève et vous transmets vos accès personnellement.
          </p>
          <LinkButton href="/inscription">Mon espace élève</LinkButton>
        </Container>
      </section>
    </>
  );
}
