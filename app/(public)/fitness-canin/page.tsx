import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";
import { PawPrint } from "@/components/icons";

export const metadata = { title: "Le fitness canin, c'est quoi ?" };

const piliers = [
  "la mobilité articulaire",
  "le renforcement musculaire",
  "la proprioception : conscience du corps et des membres dans l’espace, équilibre et coordination",
];

const highlights = [
  "Accompagnement du chiot",
  "Amélioration des performances",
  "Harmonisation de posture",
  "Optimisation des mouvements",
  "Maintien du chien senior",
];

const profils = [
  {
    title: "Les chiens de compagnie actifs",
    description:
      "Pour entretenir leur forme, prévenir les blessures et les stimuler mentalement.",
  },
  {
    title: "Les chiens seniors",
    description:
      "Pour conserver leur mobilité, soulager certaines douleurs et ralentir les effets du vieillissement.",
  },
  {
    title: "Les chiens en surpoids ou en reprise d’activité",
    description:
      "Pour regagner de la tonicité et améliorer leur confort au quotidien.",
  },
  {
    title: "Les chiens sportifs ou de travail",
    description:
      "Pour optimiser leur performance, améliorer la récupération, diminuer les risques de blessures…",
  },
  {
    title: "Les jeunes chiens",
    description:
      "Pour développer la proprioception et accompagner une croissance harmonieuse.",
  },
];

export default function FitnessCaninPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Comprendre le fitness canin
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Le fitness canin, c&apos;est quoi ?
      </h1>

      <div className="mt-6 max-w-2xl space-y-4 text-brand-brown/80">
        <p>
          Le fitness canin est une pratique douce et progressive qui vise à
          améliorer ou entretenir la forme physique du chien.
        </p>
        <p>À travers des exercices adaptés, on agit sur :</p>
        <ul className="space-y-2">
          {piliers.map((pilier) => (
            <li key={pilier} className="flex gap-2">
              <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              {pilier}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-xl bg-brand-cream-dark px-5 py-4 text-sm font-semibold text-brand-brown"
          >
            {highlight}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-2xl space-y-4 text-brand-brown/80">
        <p className="text-lg font-semibold text-brand-brown">
          Et vous l&apos;aurez donc compris, c&apos;est pour tout le monde !
        </p>
        <p>
          Le fitness canin, c&apos;est bien plus que « faire de l&apos;exercice » :
          c&apos;est construire un corps fonctionnel et équilibré, de manière
          progressive et ciblée, dans le respect du rythme du chien et à
          n&apos;importe quel stade de vie.
        </p>
        <p>
          Cela s&apos;adresse donc à tous les chiens, quels que soient leur
          âge, leur taille ou leur niveau d&apos;activité. Voici quelques
          exemples :
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {profils.map((profil) => (
          <div
            key={profil.title}
            className="rounded-2xl border border-brand-brown/10 bg-white p-6 shadow-sm"
          >
            <h2 className="font-bold text-brand-brown">{profil.title}</h2>
            <p className="mt-2 text-sm text-brand-brown/70">
              {profil.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <LinkButton href="/contact">Contact</LinkButton>
      </div>
    </Container>
  );
}
