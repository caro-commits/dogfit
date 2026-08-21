import Link from "next/link";
import { LinkButton } from "@/components/button";
import { dogfitContact } from "@/lib/placeholder-data";

export const metadata = { title: "Mon espace élève" };

export default function InscriptionPage() {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-brand-brown">Mon espace élève</h1>
      <p className="mt-4 text-sm text-brand-brown/70">
        Les espaces élèves sont créés directement par Marie : contactez-la
        pour démarrer un suivi, elle créera votre accès et vous transmettra
        votre mot de passe.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <LinkButton href="/contact" variant="accent" className="w-full">
          Contacter Marie
        </LinkButton>
        <a
          href={`mailto:${dogfitContact.email}`}
          className="text-center text-sm font-semibold text-brand-turquoise-dark hover:underline"
        >
          {dogfitContact.email}
        </a>
      </div>

      <p className="mt-6 text-center text-sm text-brand-brown/70">
        Vous avez déjà un accès ?{" "}
        <Link href="/connexion" className="font-semibold text-brand-turquoise-dark hover:underline">
          Se connecter
        </Link>
      </p>
    </>
  );
}
