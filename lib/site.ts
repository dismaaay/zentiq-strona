/**
 * Centralna konfiguracja strony Zentiq.
 * Zmieniając wartości tutaj, aktualizujesz je w całym serwisie
 * (nawigacja, stopka, dane kontaktowe, metadane SEO).
 */

export const siteConfig = {
  name: "Zentiq",
  // Slogan / meta description, używane w SEO
  description:
    "Zentiq buduje strony dla firm. Gotowy projekt zobaczysz za darmo w 24 godziny i zapłacisz dopiero, gdy zechcesz go zatrzymać. Ceny od 500 do 750 zł.",
  url: "https://zentiq.pl",
  contact: {
    email: "zentiq.kontakt@gmail.com",
    // TODO(właściciel): podmień na prawdziwy numer. Dopóki numer zawiera
    // "000 000 000", strona NIE renderuje go publicznie.
    phone: "+48 000 000 000",
    phoneHref: "tel:+48000000000",
    // TODO(właściciel): podmień na prawdziwy adres. Adres nie jest
    // renderowany na stronie, dopóki jest placeholderem.
    address: "ul. Przykładowa 1, 00-000 Warszawa",
  },
} as const;

/** Czy dana wartość kontaktowa jest jeszcze placeholderem. */
export function isPlaceholder(value: string): boolean {
  return value.includes("000 000 000") || value.includes("Przykładowa");
}

/** Pozycje nawigacji. `href` wskazuje sekcje na stronie głównej. */
export const navItems = [
  { label: "Proces", href: "#proces" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Cennik", href: "#cennik" },
  { label: "Kontakt", href: "#kontakt" },
] as const;
