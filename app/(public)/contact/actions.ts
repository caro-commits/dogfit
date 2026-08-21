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
    const { error: emailError } = await resend.emails.send({
      from: "DOGFIT <onboarding@resend.dev>",
      to: dogfitContact.email,
      replyTo: email,
      subject: `Nouveau message de ${name} — formulaire DOGFIT`,
      text: `De : ${name} (${email})\n\n${message}`,
    });
    if (emailError) console.error("Resend error:", emailError);
  }

  redirect(error ? "/contact?status=error" : "/contact?status=success");
}
