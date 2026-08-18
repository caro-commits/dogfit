import Image from "next/image";
import { Container } from "@/components/container";
import { placeholderFaqs } from "@/lib/placeholder-data";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Questions fréquentes
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        FAQ
      </h1>

      <div className="mt-10 max-w-3xl divide-y divide-brand-brown/10">
        {placeholderFaqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-brand-brown">
              {faq.question}
            </summary>
            <div className="mt-3 space-y-3 text-sm text-brand-brown/70">
              {faq.answer
                .split("\n\n")
                .map((block: string) => block.trim())
                .filter(Boolean)
                .map((block: string, i: number) => (
                  <p key={i} className="whitespace-pre-line">
                    {block}
                  </p>
                ))}
              {"images" in faq && faq.images && (
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  {faq.images.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-xl ring-1 ring-brand-brown/10"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </Container>
  );
}
