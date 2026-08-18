import Link from "next/link";
import { Button } from "@/components/button";
import { signIn } from "@/lib/actions/auth";

export const metadata = { title: "Connexion" };

const errorMessages: Record<string, string> = {
  invalid: "Email ou mot de passe incorrect.",
  unavailable: "La connexion n'est pas encore activée sur ce site.",
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <>
      <h1 className="text-2xl font-extrabold text-brand-brown">Connexion</h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Accédez à votre espace élève DOGFIT.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessages[error] ?? "Une erreur est survenue."}
        </div>
      )}

      <form action={signIn} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next ?? "/espace"} />
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-brand-brown">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-brand-brown">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-brown/70">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-semibold text-brand-turquoise-dark hover:underline">
          Créer mon espace élève
        </Link>
      </p>
    </>
  );
}
