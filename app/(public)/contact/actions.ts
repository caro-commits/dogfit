"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { dogfitContact } from "@/lib/placeholder-data";

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/contact?status=error");
  }

  if (!isSupabaseConfigured) {
    redirect("/contact?status=unavailable");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (!error && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // RESEND_FROM doit utiliser un domaine vérifié dans Resend une fois
    // dogfit-mariedemaris.fr configuré ; onboarding@resend.dev n'autorise
    // l'envoi que vers l'adresse du compte Resend.
    const from = process.env.RESEND_FROM ?? "DOGFIT <onboarding@resend.dev>";
    const to = process.env.CONTACT_NOTIFICATION_EMAIL ?? dogfitContact.email;
    const { data, error: emailError } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau message de ${name} — formulaire DOGFIT`,
      text: `De : ${name} (${email})\n\n${message}`,
    });
    if (emailError) {
      console.error("Resend error:", emailError);
    } else {
      console.log("Resend: message envoyé", data?.id, "->", to);
    }
  } else if (!error && !process.env.RESEND_API_KEY) {
    console.warn(
      "RESEND_API_KEY absent : message enregistré en base mais aucun e-mail envoyé.",
    );
  }

  redirect(error ? "/contact?status=error" : "/contact?status=success");
}
