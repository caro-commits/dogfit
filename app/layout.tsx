import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteTitle = "DOGFIT — Coach Fitness Canin | Marie Démaris";
const siteDescription =
  "DOGFIT, coaching fitness canin par Marie Démaris : cours en ligne, suivi personnalisé et corrections d'exercices pour progresser avec votre chien.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dogfit-mariedemaris.fr"),
  title: {
    default: siteTitle,
    template: "%s | DOGFIT",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "DOGFIT",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/brand/logo.png", width: 1119, height: 1120, alt: "DOGFIT" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/brand/logo.png"],
  },
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
