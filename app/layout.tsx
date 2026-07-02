import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { faqItems } from "@/lib/faq";
import { Nav } from "@/components/Nav";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Zentiq | Strony internetowe dla firm",
    template: "%s | Zentiq",
  },
  description: siteConfig.description,
  keywords: [
    "strony internetowe",
    "tworzenie stron",
    "strona dla firmy",
    "web design",
    "Zentiq",
    "sklep internetowy",
    "strona wizytówka",
  ],
  authors: [{ name: "Zentiq" }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    title: "Zentiq | Strony internetowe dla firm",
    description: siteConfig.description,
    siteName: "Zentiq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentiq | Strony internetowe dla firm",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contact.email,
      description: siteConfig.description,
      priceRange: "500-750 PLN",
      areaServed: "PL",
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "pl-PL",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a href="#tresc" className="skip-link">
          Przejdź do treści
        </a>
        {/* Dane statyczne z lib/site.ts (bez inputu uzytkownika); escape "<"
            wg wzorca z node_modules/next/dist/docs/01-app/02-guides/json-ld.md */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div aria-hidden className="grain" />
        <Nav />
        <main id="tresc" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
