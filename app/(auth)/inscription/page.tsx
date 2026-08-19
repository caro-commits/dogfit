import Link from "next/link";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { signUp } from "@/lib/actions/auth";

export const metadata = { title: "Inscription" };

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <h1 className="text-2xl font-extrabold text-brand-brown">Créer mon espace élève</h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Inscrivez-vous gratuitement pour accéder à vos cours DOGFIT.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error === "unavailable"
            ? "L'inscription n'est pas encore activée sur ce site."
            : error}
        </div>
      )}

      <form action={signUp} className="mt-6 space-y-4">
        <div>
          <label htmlFor="full_name" className="text-sm font-semibold text-brand-brown">
            Votre nom
          </label>
          <input
            id="full_name"
            name="full_name"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-brand-brown">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-brand-brown">
            Mot de passe
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full">
          Créer mon compte
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-brown/70">
        Déjà inscrit·e ?{" "}
        <Link href="/connexion" className="font-semibold text-brand-turquoise-dark hover:underline">
          Se connecter
        </Link>
      </p>
    </>
  );
}
