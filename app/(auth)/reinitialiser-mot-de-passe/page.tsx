"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [ready, setReady] = useState<"waiting" | "ready" | "invalid">("waiting");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "done">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady("ready");
    });

    // Le lien a parfois déjà été traité avant que l'écouteur ne s'attache.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady((current) => (current === "waiting" ? "ready" : current));
    });

    const timeout = setTimeout(() => {
      setReady((current) => (current === "waiting" ? "invalid" : current));
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setStatus("error");
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setErrorMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setStatus("saving");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErrorMessage("Échec de la mise à jour : " + error.message);
      return;
    }

    setStatus("done");
    setTimeout(() => router.push("/espace"), 1500);
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Nouveau mot de passe</h1>
        <p className="mt-4 text-sm text-brand-brown/70">
          La connexion n&apos;est pas encore activée sur ce site.
        </p>
      </>
    );
  }

  if (ready === "waiting") {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Nouveau mot de passe</h1>
        <p className="mt-4 text-sm text-brand-brown/70">Vérification du lien...</p>
      </>
    );
  }

  if (ready === "invalid") {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Lien invalide ou expiré</h1>
        <p className="mt-4 text-sm text-brand-brown/70">
          Ce lien de réinitialisation n&apos;est plus valide. Demandez-en un
          nouveau.
        </p>
        <div className="mt-6">
          <Link
            href="/mot-de-passe-oublie"
            className="font-semibold text-brand-turquoise-dark hover:underline"
          >
            Recevoir un nouveau lien
          </Link>
        </div>
      </>
    );
  }

  if (status === "done") {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Mot de passe mis à jour</h1>
        <p className="mt-4 text-sm text-brand-brown/70">
          Redirection vers votre espace élève...
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-extrabold text-brand-brown">Nouveau mot de passe</h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Choisissez un nouveau mot de passe pour votre compte.
      </p>

      {status === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-brand-brown">
            Nouveau mot de passe
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div>
          <label htmlFor="confirm" className="text-sm font-semibold text-brand-brown">
            Confirmer le mot de passe
          </label>
          <PasswordInput
            id="confirm"
            name="confirm"
            required
            minLength={6}
            autoComplete="new-password"
            value={confirm}
            onChange={setConfirm}
          />
        </div>
        <Button type="submit" className="w-full" disabled={status === "saving"}>
          {status === "saving" ? "Enregistrement..." : "Valider le nouveau mot de passe"}
        </Button>
      </form>
    </>
  );
}
