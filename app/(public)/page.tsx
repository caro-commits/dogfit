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
          className="object-cover object-[30%_center] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-brand-brown/70 via-brand-brown/25 to-transparent" />
        <Container className="relative flex justify-end py-24 lg:py-36">
          <div className="max-w-xl text-right">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              Coaching fitness canin en ligne
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Coach en fitness canin. Préparation physique du chien de sport.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              Je suis Marie Démaris, coach en fitness canin. Suivi en ligne,
              stage ou cours en présentiel, du chiot au chien sénior,
              préparation au sport canin ou non : je vous accompagne avec
              des programmes personnalisés pour améliorer la qualité de vie
              et/ou les performances de votre chien, où que vous soyez.
            </p>
            <div className="mt-8 flex flex-wrap justify-end gap-4">
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
          <h2 className="text-center text-2xl font-bold text-brand-brown sm:text-3xl">
            Comment se déroule le suivi ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-brand-brown/70">
            Des cours structurés, des corrections personnalisées et un vrai
            suivi : un accompagnement pas à pas, adapté à votre chien du
            début à la fin. Pour l&apos;instant, le suivi et les corrections
            se font sur un groupe Facebook privé, en attendant la
            plateforme complète.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Prise de contact",
                text: "Vous me parlez de votre chien et de vos objectifs, je réponds à vos questions.",
                color: "bg-brand-turquoise",
              },
              {
                step: "2",
                title: "Bilan & programme",
                text: "Un questionnaire, puis un programme d'exercices personnalisé, adapté à votre chien.",
                color: "bg-brand-orange",
              },
              {
                step: "3",
                title: "Vidéos & corrections",
                text: "Vous m'envoyez vos vidéos d'exercices, je les corrige avec notes et conseils.",
                color: "bg-brand-brown-light",
              },
              {
                step: "4",
                title: "Suivi continu",
                text: "Échanges réguliers sur le groupe Facebook privé, réponses sous 24 à 48h.",
                color: "bg-brand-turquoise-dark",
              },
            ].map((item) => (
              <div key={item.step}>
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${item.color}`}
                >
                  {item.step}
                </div>
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
            Contactez-moi pour démarrer un suivi : en attendant la
            plateforme, les échanges et corrections se font sur un groupe
            Facebook privé, personnalisé pour vous et votre chien.
          </p>
          <LinkButton href="/inscription">Mon espace élève</LinkButton>
        </Container>
      </section>
    </>
  );
}
