import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "DOGFIT — Coach Fitness Canin | Marie Démaris",
    template: "%s | DOGFIT",
  },
  description:
    "DOGFIT, coaching fitness canin par Marie Démaris : cours en ligne, suivi personnalisé et corrections d'exercices pour progresser avec votre chien.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-brown">
        {children}
      </body>
    </html>
  );
}
