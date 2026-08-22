import { getContactMessages } from "@/lib/data/admin";
import { dogfitContact } from "@/lib/placeholder-data";
import { setMessageStatus } from "./actions";

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

const STATUS_ORDER = { unread: 0, read: 1, replied: 2 } as const;

const STATUS_BADGES = {
  unread: "bg-brand-orange/10 text-brand-orange",
  read: "bg-brand-brown/10 text-brand-brown/70",
  replied: "bg-brand-turquoise-light text-brand-turquoise-dark",
} as const;

const STATUS_LABELS = {
  unread: "Non lu",
  read: "Lu",
  replied: "Répondu",
} as const;

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();
  const sorted = [...messages].sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.status as keyof typeof STATUS_ORDER] -
      STATUS_ORDER[b.status as keyof typeof STATUS_ORDER];
    if (statusDiff !== 0) return statusDiff;
    return b.created_at.localeCompare(a.created_at);
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">
        Messages de contact
      </h1>

      <div className="mt-8 space-y-4">
        {sorted.length === 0 && (
          <p className="text-sm text-brand-brown/60">
            Aucun message pour l&apos;instant.
          </p>
        )}
        {sorted.map((message) => {
          const status = (message.status ?? "unread") as keyof typeof STATUS_LABELS;
          return (
            <div
              key={message.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-brand-brown">{message.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGES[status]}`}
                  >
                    {STATUS_LABELS[status]}
                  </span>
                </div>
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
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href={gmailReplyUrl(message.email, message.name, message.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-xs font-semibold text-white hover:bg-brand-orange/90"
                >
                  Répondre par Gmail
                </a>
                {(Object.keys(STATUS_LABELS) as (keyof typeof STATUS_LABELS)[])
                  .filter((s) => s !== status)
                  .map((s) => {
                    const action = setMessageStatus.bind(null, message.id, s);
                    return (
                      <form action={action} key={s}>
                        <button className="rounded-full border border-brand-brown/20 px-3 py-2 text-xs font-semibold text-brand-brown/70 hover:border-brand-brown/40 hover:text-brand-brown">
                          Marquer {STATUS_LABELS[s].toLowerCase()}
                        </button>
                      </form>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
