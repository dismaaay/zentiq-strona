/**
 * Centralna konfiguracja warstwy prawnej (polityki + regulamin).
 * Uzupełnij dane podmiotu tutaj — zaktualizują się we wszystkich dokumentach.
 *
 * Pola z prefiksem "UZUPEŁNIJ" są traktowane jak placeholdery: w treści
 * renderują się jako widoczne `[… do uzupełnienia]` (nie jako zmyślony fakt),
 * żeby było jasne, co jeszcze trzeba wpisać. Po wpisaniu realnych danych
 * znikają automatycznie.
 */
import { siteConfig } from "@/lib/site";

export const legalConfig = {
  /** Data ostatniej aktualizacji dokumentów (widoczna w nagłówku każdego z nich). */
  lastUpdated: "5 lipca 2026",

  entity: {
    // Nazwa podmiotu prowadzącego Zentiq (administrator danych / usługodawca).
    name: "UZUPEŁNIJ — nazwa podmiotu prowadzącego Zentiq",
    // Forma prawna, np. "jednoosobowa działalność gospodarcza" / "spółka z o.o.".
    legalForm: "UZUPEŁNIJ — forma prawna",
    // NIP; jeśli podmiot ma REGON/KRS — uzupełnij poniżej.
    nip: "UZUPEŁNIJ — NIP",
    regon: "", // opcjonalne
    krs: "", // opcjonalne (spółki)
    // Adres siedziby / adres do korespondencji.
    address: "UZUPEŁNIJ — adres siedziby",
    // Art. 27 RODO: przedstawiciel w UE — wymagany, gdy administrator ma siedzibę
    // POZA UE/EOG, a kieruje ofertę do osób w UE. Zostaw puste, jeśli nie dotyczy.
    euRepresentative: "",
    // E-mail do spraw danych osobowych i kontaktu prawnego.
    dataEmail: siteConfig.contact.email,
  },
} as const;

/** Czy dana wartość to wciąż placeholder do uzupełnienia. */
export function isLegalPlaceholder(value: string): boolean {
  return !value || value.startsWith("UZUPEŁNIJ");
}

/** Linki do dokumentów prawnych (stopka, cross-linki, sitemap). */
export const legalLinks = [
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Polityka cookies", href: "/polityka-cookies" },
  { label: "Regulamin", href: "/regulamin" },
] as const;
