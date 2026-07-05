import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Zentiq nie stosuje cookies śledzących, analitycznych ani marketingowych. Wyjaśniamy, co to oznacza.",
  robots: { index: true, follow: true },
};

export default function PolitykaCookies() {
  return (
    <LegalPage title="Polityka cookies">
      <p>
        Pliki cookies to niewielkie pliki tekstowe zapisywane przez przeglądarkę na Twoim
        urządzeniu, gdy odwiedzasz stronę internetową. Bywają wykorzystywane do zapamiętania
        ustawień, analityki ruchu czy śledzenia użytkowników w celach reklamowych.
      </p>

      <h2>1. Jakie cookies stosujemy</h2>
      <p>
        <strong>
          Strona zentiq.pl nie używa plików cookies śledzących, analitycznych ani
          marketingowych.
        </strong>{" "}
        Konkretnie oznacza to, że:
      </p>
      <ul>
        <li>nie korzystamy z Google Analytics ani żadnego innego narzędzia analitycznego,</li>
        <li>nie osadzamy pikseli reklamowych (np. Meta, Google Ads) ani skryptów śledzących,</li>
        <li>nie profilujemy użytkowników i nie budujemy ich historii zachowań,</li>
        <li>nie udostępniamy danych o ruchu podmiotom trzecim w celach reklamowych.</li>
      </ul>
      <p>
        Jeśli w przyszłości pojawią się cookies techniczne niezbędne do działania jakiejś
        funkcji strony, będą one służyły wyłącznie zapewnieniu jej poprawnego działania i
        nie będą wykorzystywane do śledzenia.
      </p>

      <h2>2. Dlaczego nie ma banera zgody na cookies</h2>
      <p>
        Baner zgody jest wymagany, gdy strona stosuje cookies inne niż ściśle niezbędne
        (np. analityczne lub marketingowe). Ponieważ takich cookies nie używamy, nie ma
        czego akceptować — dlatego nie wyświetlamy banera. To świadoma decyzja, nie
        przeoczenie.
      </p>

      <h2>3. Jak zarządzać cookies w przeglądarce</h2>
      <p>
        Niezależnie od naszej strony, w każdej chwili możesz przeglądać i usuwać pliki
        cookies oraz zmieniać ustawienia ich zapisywania w swojej przeglądarce. Odpowiednie
        opcje znajdziesz zwykle w ustawieniach prywatności / bezpieczeństwa przeglądarki
        (Chrome, Firefox, Safari, Edge i inne). Możesz też ustawić przeglądarkę tak, aby
        blokowała cookies domyślnie.
      </p>

      <h2>4. Więcej informacji</h2>
      <p>
        Zasady przetwarzania Twoich danych osobowych opisaliśmy w{" "}
        <a href="/polityka-prywatnosci">Polityce prywatności</a>. W razie pytań napisz do
        nas — chętnie wyjaśnimy.
      </p>

      <h2>5. Zmiany polityki</h2>
      <p>
        Jeśli kiedykolwiek zmienimy sposób korzystania z cookies, zaktualizujemy tę stronę
        i podamy nową datę na górze. Aktualna wersja obowiązuje od dnia wskazanego w
        nagłówku.
      </p>
    </LegalPage>
  );
}
