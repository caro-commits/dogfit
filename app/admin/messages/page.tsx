import { getContactMessages } from "@/lib/data/admin";
import { dogfitContact } from "@/lib/placeholder-data";

export const metadata = { title: "Admin — Messages" };

function gmailReplyUrl(email: string, name: string, originalMessage: string) {
  const subject = "Re: votre message — DOGFIT";
  const body = `Bonjour ${name},\n\n\n\n---\nVotre message :\n${originalMessage}`;
  const params = new URLSearchParams({
    authuser: dogfitContact.email,
    view: "cm",
    fs: "1",
    to: email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">
        Messages de contact
      </h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-brand-brown/60">
            Aucun message pour l&apos;instant.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-brand-brown">{message.name}</p>
              <p className="text-xs text-brand-brown/50">
                {new Date(message.created_at).toLocaleString("fr-FR")}
              </p>
            </div>
            <a
              href={`mailto:${message.email}`}
              className="text-sm text-brand-turquoise-dark hover:underline"
            >
              {message.email}
            </a>
            <p className="mt-3 whitespace-pre-wrap text-sm text-brand-brown/80">
              {message.message}
            </p>
            <a
              href={gmailReplyUrl(message.email, message.name, message.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-xs font-semibold text-white hover:bg-brand-orange/90"
            >
              Répondre par Gmail
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
