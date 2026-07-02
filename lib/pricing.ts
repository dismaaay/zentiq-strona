/**
 * Logika kalkulatora wyceny - współdzielona przez komponent (klient)
 * i endpoint wysyłający maila (serwer), aby cena była liczona spójnie.
 *
 * Cena bazowa: 500 zł
 *  + panel użytkownika:  +200 zł
 *  + system płatności:    +50 zł
 *  + sekcja opinii:       +50 zł
 *  + własny pomysł:        +0 zł
 *
 * Suma składników może przekroczyć 750 zł, dlatego stosujemy górny limit
 * (cena maksymalna = 750 zł) - wybór wszystkich opcji daje dokładnie 750 zł.
 */

export const BASE_PRICE = 500;
export const MAX_PRICE = 750;

export const priceOptions = {
  payments: 50, // System płatności online
  panel: 200, // Panel klienta / użytkownika
  reviews: 50, // Sekcja opinii klientów
} as const;

export type PricingSelection = {
  payments: boolean;
  panel: boolean;
  reviews: boolean;
};

/** Zwraca szacunkowy koszt (z uwzględnieniem limitu 750 zł). */
export function calculatePrice(selection: PricingSelection): number {
  let total = BASE_PRICE;
  if (selection.payments) total += priceOptions.payments;
  if (selection.panel) total += priceOptions.panel;
  if (selection.reviews) total += priceOptions.reviews;
  return Math.min(total, MAX_PRICE);
}
