import Image from "next/image";
import { Caveat } from "next/font/google";
import { Container } from "@/components/container";
import { LinkButton } from "@/components/button";

const caveat = Caveat({ subsets: ["latin"], weight: ["600"] });

export const metadata = {
  title: "Présentation",
  description:
    "Je suis Marie Démaris, Certified Canine Fitness Trainer (CCFT) et FitPAWS Master Trainer : découvrez mon parcours, de cavalière professionnelle à coach fitness canin.",
};

export default function PresentationPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
            Qui suis-je ?
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
            Marie Démaris, coach fitness canin
          </h1>
          <div className="mt-6 space-y-4 text-justify text-brand-brown/80">
            <p>
              Je m&apos;appelle Marie Démaris et je souhaite partager avec vous
              un aperçu de mon parcours professionnel.
            </p>
            <p>
              Accompagnée de mes chiens depuis l&apos;enfance, j&apos;ai construit
              mon parcours en tant que cavalière professionnelle à
              l&apos;international, notamment aux États-Unis, en Italie et en
              Allemagne. En parallèle de mon activité, je pratique le frisbee
              avec mes chiens. Cette discipline m&apos;amène naturellement à
              transposer les exigences du sport équin au sport canin,
              notamment en termes de technique, de gestion de l&apos;effort, de
              coordination et de prévention des blessures.
            </p>
            <p>
              Je décide de me tourner vers le bien-être canin et la
              préparation des chiens de sport, les considérant comme de
              véritables athlètes. Je suis convaincue que le bien-être mental
              des animaux est étroitement lié à leur bien-être physique.
              C&apos;est pourquoi je me forme au fitness canin en tant que
              Certified Canine Fitness Trainer (CCFT) via l&apos;Université du
              Tennessee.
            </p>
            <p>
              À mon retour en France en 2017, je crée l&apos;entreprise Dogfit
              et j&apos;organise des stages de fitness canin à travers tout le
              pays. Parallèlement, je pratique régulièrement avec mes chiens
              l&apos;agility, le frisbee, le troupeau et les expositions
              canines.
            </p>
            <p>
              Je suis également en contact permanent avec des chiens engagés
              dans d&apos;autres disciplines et je me tiens informée des
              exigences physiques de chacune d&apos;elles. Cela me permet de
              concevoir des programmes de fitness adaptés à chaque chien,
              selon sa discipline sportive ou son mode de vie.
            </p>
            <p>
              Accompagner les chiens en fitness canin était un premier pas,
              mais rapidement, j&apos;ai ressenti le besoin d&apos;aller plus loin.
              Je voulais mieux comprendre leur corps, et surtout, les aider
              de façon plus complète et durable.
            </p>
            <p>
              C&apos;est ce qui m&apos;a poussée à me former à l&apos;ostéopathie
              animale. Et comme rien n&apos;est jamais tout à fait linéaire dans
              mon parcours (ni dans la vie !), cette formation initialement
              prévue sur 5 ans m&apos;a finalement demandé 8 années
              d&apos;engagement, d&apos;apprentissage, et de résilience.
            </p>
            <p>
              Huit années au cours desquelles j&apos;ai eu la chance de
              découvrir différentes écoles, approches et techniques. Ce
              chemin, parfois sinueux, m&apos;a permis de me construire une
              vision plus riche, plus nuancée et profondément respectueuse
              de l&apos;animal.
            </p>
            <p>
              Aujourd&apos;hui, je suis sur le point de clore ce chapitre de
              formation et d&apos;ouvrir un nouveau volet de mon activité, où le
              fitness canin et l&apos;ostéopathie se répondront en parfaite
              complémentarité.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/cours">Découvrir le coaching</LinkButton>
            <LinkButton href="/contact" variant="accent">
              Contact
            </LinkButton>
          </div>
        </div>
        <div className="lg:max-w-[280px] lg:self-start lg:justify-self-end">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/presentation/marie-et-son-chien.jpg"
              alt="Marie Démaris et son chien"
              width={720}
              height={480}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <p
            className={`${caveat.className} mt-6 text-center text-3xl leading-snug text-brand-orange sm:text-4xl`}
          >
            Parce que chaque mouvement compte.
            <br />
            Parce que chaque chien est unique.
          </p>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-brand-brown/50">
            — Marie Démaris
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <Image
              src="/presentation/ccft-badge.png"
              alt="Certified Canine Fitness Trainer — Université du Tennessee"
              width={140}
              height={140}
              className="h-24 w-24 object-contain"
            />
            <Image
              src="/presentation/fitpaws-master-trainer-badge.jpg"
              alt="FitPAWS Master Trainer"
              width={140}
              height={140}
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
