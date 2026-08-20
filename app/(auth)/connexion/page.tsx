import Link from "next/link";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { RememberedEmailInput } from "@/components/remembered-email-input";
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
        <RememberedEmailInput />
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-brand-brown">
            Mot de passe
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-brown/70">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-semibold text-brand-turquoise-dark hover:underline">
          Comment obtenir un accès ?
        </Link>
      </p>
    </>
  );
}
