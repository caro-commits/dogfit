import { Logo } from "@/components/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-turquoise-light px-6 py-16">
      <Logo className="mb-8" imgClassName="h-24 w-auto object-contain sm:h-28" />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-brown/5">
        {children}
      </div>
    </main>
  );
}
