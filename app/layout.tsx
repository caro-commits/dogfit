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
  verification: {
    google: "lz3Rol9lJpg3Jaq0C-t96nDLeWSHnVn4jIFvTAvp0mw",
  },
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
    images: [
      {
        url: "/og/dogfit.jpg",
        width: 1200,
        height: 630,
        alt: "Marie Démaris, coach en fitness canin, et son chien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og/dogfit.jpg"],
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
