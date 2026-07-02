/**
 * Najczęstsze pytania prospektów. Współdzielone przez sekcję FAQ (UI)
 * i strukturalne dane JSON-LD (FAQPage) w app/layout.tsx.
 * Odpowiadają na realne obiekcje wobec modelu "płacisz po obejrzeniu".
 */

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "Naprawdę nic nie płacę, jeśli zrezygnuję?",
    a: "Tak. Projekt przygotowujemy, zanim poprosimy o płatność. Jeśli po obejrzeniu uznasz, że to nie to, nie płacisz ani złotówki i nie masz wobec nas żadnych zobowiązań.",
  },
  {
    q: "Skąd tak niskie ceny?",
    a: "Przez lata zbudowaliśmy własne narzędzia i zautomatyzowaliśmy powtarzalną część pracy. Oszczędzamy czas, a nie jakość, i tę oszczędność oddajemy w cenie.",
  },
  {
    q: "Czy strona będzie moją własnością?",
    a: "Tak. Po opłaceniu przekazujemy ci pełne prawa i pliki. Możesz hostować stronę u nas albo przenieść ją, gdzie chcesz.",
  },
  {
    q: "Co z domeną i hostingiem?",
    a: "Pomożemy podłączyć twoją domenę i uruchomić stronę. Jeśli nie masz jeszcze domeny, podpowiemy, jak ją kupić. Koszty domeny i hostingu są niezależne od ceny projektu.",
  },
  {
    q: "A jeśli chcę poprawki?",
    a: "Drobne zmiany nanosimy na bieżąco, jeszcze na etapie darmowego projektu. Chcemy, żebyś zobaczył wersję, którą naprawdę chcesz kupić.",
  },
  {
    q: "Czy 24 godziny to naprawdę tyle?",
    a: "Prostą wizytówkę czy stronę firmową potrafimy pokazać następnego dnia. Przy większych projektach umawiamy konkretny termin z góry, żebyś wiedział, na czym stoisz.",
  },
];
