import type { Metadata } from "next";
import { LegalPage, LegalValue } from "@/components/legal/LegalPage";
import { legalConfig, isLegalPlaceholder } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Jak Zentiq przetwarza dane osobowe przesłane przez formularze kontaktowy i wyceny. Zgodnie z RODO.",
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosci() {
  const e = legalConfig.entity;
  const hasRepresentative = !isLegalPlaceholder(e.euRepresentative);
  return (
    <LegalPage title="Polityka prywatności">
      <p>
        Niniejsza polityka opisuje, w jaki sposób przetwarzamy dane osobowe osób
        korzystających ze strony zentiq.pl, w szczególności dane przesłane przez
        formularz kontaktowy i formularz wyceny. Zależy nam na przejrzystości: zbieramy
        tylko to, co jest potrzebne, aby odpowiedzieć na Twoją wiadomość i przygotować
        ofertę.
      </p>

      <h2>1. Administrator danych</h2>
      <p>Administratorem Twoich danych osobowych jest:</p>
      <address>
        <LegalValue value={e.name} label="nazwa podmiotu" />
        {" — "}
        <LegalValue value={e.legalForm} label="forma prawna" />
        <br />
        <LegalValue value={e.address} label="adres" />
        <br />
        NIP: <LegalValue value={e.nip} label="NIP" />
        {!isLegalPlaceholder(e.regon) && <> · REGON: {e.regon}</>}
        {!isLegalPlaceholder(e.krs) && <> · KRS: {e.krs}</>}
        <br />
        E-mail: <a href={`mailto:${e.dataEmail}`}>{e.dataEmail}</a>
      </address>
      {hasRepresentative && (
        <p>
          Przedstawicielem administratora w Unii Europejskiej (art. 27 RODO) jest:{" "}
          {e.euRepresentative}.
        </p>
      )}

      <h2>2. Jakie dane zbieramy</h2>
      <p>Przetwarzamy wyłącznie dane, które podajesz nam dobrowolnie:</p>
      <ul>
        <li>
          <strong>Formularz kontaktowy:</strong> imię, adres e-mail oraz treść
          wiadomości.
        </li>
        <li>
          <strong>Formularz wyceny:</strong> imię, nazwa firmy, numer telefonu, adres
          e-mail, odpowiedzi na pytania kalkulatora oraz opcjonalny opis pomysłu.
        </li>
        <li>
          <strong>Dane techniczne:</strong> w minimalnym zakresie, wynikającym ze
          standardowego działania serwera (np. logi dostawcy hostingu). Nie używamy ich
          do identyfikacji ani profilowania.
        </li>
      </ul>

      <h2>3. Cele i podstawy prawne przetwarzania</h2>
      <ul>
        <li>
          Obsługa Twojego zapytania, kontakt zwrotny i przygotowanie oferty — podstawa:
          art. 6 ust. 1 lit. b RODO (podjęcie działań na Twoje żądanie przed zawarciem
          umowy) oraz art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes:
          udzielenie odpowiedzi i kontakt biznesowy).
        </li>
        <li>
          Ewentualne ustalenie, dochodzenie lub obrona roszczeń — podstawa: art. 6 ust. 1
          lit. f RODO.
        </li>
      </ul>

      <h2>4. Jak długo przechowujemy dane</h2>
      <p>
        Dane z korespondencji przechowujemy przez czas niezbędny do obsługi sprawy,
        a następnie przez okres przedawnienia ewentualnych roszczeń. Po tym czasie dane
        są usuwane lub anonimizowane. Jeśli poprosisz o usunięcie danych wcześniej,
        zrobimy to niezwłocznie, o ile nie stoją temu na przeszkodzie przepisy prawa.
      </p>

      <h2>5. Odbiorcy danych i przekazywanie poza EOG</h2>
      <p>
        Twoje dane mogą być powierzane zaufanym dostawcom usług, którzy przetwarzają je
        w naszym imieniu, w szczególności:
      </p>
      <ul>
        <li>
          dostawcy hostingu strony (Vercel Inc., USA), na którego infrastrukturze działa
          serwis i obsługiwane są formularze;
        </li>
        <li>
          dostawcy poczty elektronicznej (Google), za pośrednictwem którego zgłoszenia
          z formularzy trafiają na naszą skrzynkę.
        </li>
      </ul>
      <p>
        Część tych dostawców ma siedzibę poza Europejskim Obszarem Gospodarczym (USA).
        Przekazywanie danych odbywa się w oparciu o odpowiednie zabezpieczenia, o których
        mowa w RODO — standardowe klauzule umowne lub uczestnictwo w programie Data
        Privacy Framework (EU–US). Nie sprzedajemy Twoich danych i nie udostępniamy ich
        w celach marketingowych podmiotom trzecim.
      </p>

      <h2>6. Twoje prawa</h2>
      <p>W związku z przetwarzaniem danych przysługuje Ci prawo do:</p>
      <ul>
        <li>dostępu do danych oraz otrzymania ich kopii,</li>
        <li>sprostowania (poprawienia) danych,</li>
        <li>usunięcia danych,</li>
        <li>ograniczenia przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>
          wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym
          interesie.
        </li>
      </ul>
      <p>
        Aby skorzystać z tych praw, napisz na{" "}
        <a href={`mailto:${e.dataEmail}`}>{e.dataEmail}</a>. Masz również prawo wnieść
        skargę do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki
        2, 00-193 Warszawa).
      </p>

      <h2>7. Dobrowolność podania danych</h2>
      <p>
        Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi na
        zapytanie lub przygotowania wyceny. Bez nich nie będziemy w stanie się z Tobą
        skontaktować.
      </p>

      <h2>8. Brak profilowania i automatycznych decyzji</h2>
      <p>
        Nie profilujemy użytkowników i nie podejmujemy wobec nich decyzji opartych
        wyłącznie na zautomatyzowanym przetwarzaniu, które wywoływałyby skutki prawne lub
        w podobny sposób istotnie na nie wpływały.
      </p>

      <h2>9. Pliki cookies</h2>
      <p>
        Zasady dotyczące plików cookies opisaliśmy osobno w{" "}
        <a href="/polityka-cookies">Polityce cookies</a>. W skrócie: nie stosujemy cookies
        śledzących ani narzędzi analitycznych.
      </p>

      <h2>10. Zmiany polityki</h2>
      <p>
        Politykę możemy aktualizować, gdy zmieni się sposób działania serwisu lub przepisy
        prawa. Aktualna wersja jest zawsze dostępna pod tym adresem, z datą ostatniej
        zmiany podaną na górze strony.
      </p>
    </LegalPage>
  );
}
