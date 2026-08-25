"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) return;

    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
    });

    setStatus(error ? "error" : "sent");
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Mot de passe oublié</h1>
        <p className="mt-4 text-sm text-brand-brown/70">
          La connexion n&apos;est pas encore activée sur ce site.
        </p>
      </>
    );
  }

  if (status === "sent") {
    return (
      <>
        <h1 className="text-2xl font-extrabold text-brand-brown">Vérifiez vos emails</h1>
        <p className="mt-4 text-sm text-brand-brown/70">
          Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous
          allez recevoir un lien pour choisir un nouveau mot de passe.
        </p>
        <p className="mt-6 text-center text-sm text-brand-brown/70">
          <Link href="/connexion" className="font-semibold text-brand-turquoise-dark hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-extrabold text-brand-brown">Mot de passe oublié</h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Indiquez votre email, nous vous enverrons un lien pour choisir un
        nouveau mot de passe.
      </p>

      {status === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          Une erreur est survenue, merci de réessayer.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <Button type="submit" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours..." : "Recevoir le lien"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-brown/70">
        <Link href="/connexion" className="font-semibold text-brand-turquoise-dark hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </>
  );
}
