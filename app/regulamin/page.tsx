import type { Metadata } from "next";
import { LegalPage, LegalValue } from "@/components/legal/LegalPage";
import { legalConfig } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Regulamin",
  description:
    "Regulamin świadczenia usług przez Zentiq: projektowanie i budowa stron w modelu darmowego projektu, przejmowanego za opłatą.",
  robots: { index: true, follow: true },
};

export default function Regulamin() {
  const e = legalConfig.entity;
  return (
    <LegalPage title="Regulamin świadczenia usług">
      <p>
        Regulamin określa zasady, na jakich Zentiq świadczy usługi projektowania i budowy
        stron internetowych, w tym model bezpłatnego projektu demonstracyjnego
        przejmowanego przez Klienta za opłatą.
      </p>

      <h2>1. Definicje</h2>
      <ul>
        <li>
          <strong>Usługodawca / Zentiq</strong> —{" "}
          <LegalValue value={e.name} label="nazwa podmiotu" />,{" "}
          <LegalValue value={e.legalForm} label="forma prawna" />,{" "}
          <LegalValue value={e.address} label="adres" />, NIP:{" "}
          <LegalValue value={e.nip} label="NIP" />.
        </li>
        <li>
          <strong>Klient</strong> — przedsiębiorca lub inny podmiot korzystający z usług
          Usługodawcy.
        </li>
        <li>
          <strong>Usługa</strong> — zaprojektowanie i wykonanie strony internetowej oraz
          usługi towarzyszące (hosting, opieka, aktualizacje).
        </li>
        <li>
          <strong>Projekt (Demo)</strong> — gotowa, działająca propozycja strony
          przygotowana przez Zentiq i udostępniona Klientowi do obejrzenia bez opłat.
        </li>
      </ul>

      <h2>2. Rodzaj i zakres usług</h2>
      <p>
        Zentiq projektuje i buduje strony internetowe dla firm. Działamy w modelu
        „najpierw zobacz, potem zdecyduj”:
      </p>
      <ul>
        <li>
          przygotowujemy <strong>bezpłatny Projekt (Demo)</strong> strony i udostępniamy go
          Klientowi do obejrzenia;
        </li>
        <li>
          jeśli Projekt się podoba, Klient może go <strong>przejąć</strong> na własną domenę
          za jednorazową opłatą, wraz z abonamentem obejmującym hosting i opiekę nad stroną;
        </li>
        <li>jeśli Projekt nie odpowiada oczekiwaniom, Klient nie ponosi żadnych kosztów.</li>
      </ul>

      <h2>3. Zawarcie umowy</h2>
      <p>
        Kontakt z Zentiq (przez formularz na stronie lub e-mail) oraz przygotowanie Projektu
        nie zobowiązuje Klienta do zapłaty. Umowa o wykonanie i przekazanie strony zostaje
        zawarta z chwilą, gdy Klient zaakceptuje Projekt i warunki (zakres, cena, abonament),
        a strony potwierdzą je w korespondencji.
      </p>

      <h2>4. Wynagrodzenie i płatności</h2>
      <p>
        Wysokość jednorazowej opłaty za przejęcie strony oraz kwotę abonamentu ustalamy
        indywidualnie, zgodnie z cennikiem prezentowanym na stronie i zakresem prac.
        Szczegóły płatności (termin, forma, faktura) strony ustalają przy zawarciu umowy.
        Do czasu opłacenia strona pozostaje wersją demonstracyjną.
      </p>

      <h2>5. Prawa autorskie</h2>
      <p>
        Do chwili pełnej zapłaty Projekt oraz wszystkie jego elementy pozostają własnością
        Zentiq. Z chwilą uregulowania należności Klient uzyskuje prawo do korzystania z
        gotowej strony w zakresie uzgodnionym przez strony (przeniesienie praw lub licencja).
        Materiały dostarczone przez Klienta (teksty, zdjęcia, logo) pozostają jego własnością;
        Klient odpowiada za to, że ma prawo z nich korzystać.
      </p>

      <h2>6. Obowiązki stron</h2>
      <ul>
        <li>
          Zentiq wykonuje Usługę z należytą starannością, zgodnie z uzgodnionym zakresem.
        </li>
        <li>
          Klient dostarcza materiały i informacje niezbędne do realizacji oraz współdziała
          w toku prac.
        </li>
      </ul>

      <h2>7. Reklamacje</h2>
      <p>
        Reklamacje dotyczące Usługi można zgłaszać na adres{" "}
        <a href={`mailto:${e.dataEmail}`}>{e.dataEmail}</a>. Reklamację rozpatrzymy i
        udzielimy odpowiedzi w terminie do 14 dni od jej otrzymania.
      </p>

      <h2>8. Odstąpienie od umowy (konsumenci)</h2>
      <p>
        Jeżeli Klientem jest konsument (lub przedsiębiorca na prawach konsumenta), ma prawo
        odstąpić od umowy zawartej na odległość w terminie 14 dni bez podania przyczyny,
        na zasadach wynikających z ustawy o prawach konsumenta. Jeżeli na wyraźne żądanie
        Klienta wykonywanie usługi rozpocznie się przed upływem tego terminu, Klient może
        być zobowiązany do zapłaty za świadczenia spełnione do chwili odstąpienia. W obrocie
        wyłącznie między przedsiębiorcami prawo do odstąpienia w tym trybie nie przysługuje.
      </p>

      <h2>9. Odpowiedzialność</h2>
      <p>
        Zentiq nie ponosi odpowiedzialności za przerwy w działaniu strony wynikające z
        przyczyn niezależnych (np. awarie po stronie dostawców, siła wyższa) ani za treści i
        materiały dostarczone przez Klienta. Odpowiedzialność Usługodawcy ogranicza się do
        rzeczywistej szkody, w zakresie dopuszczalnym przez prawo.
      </p>

      <h2>10. Dane osobowe</h2>
      <p>
        Zasady przetwarzania danych osobowych opisuje{" "}
        <a href="/polityka-prywatnosci">Polityka prywatności</a>.
      </p>

      <h2>11. Postanowienia końcowe</h2>
      <p>
        W sprawach nieuregulowanych stosuje się prawo polskie. Ewentualne spory strony będą
        starały się rozwiązać polubownie, a w razie potrzeby rozstrzyga je sąd właściwy
        miejscowo i rzeczowo. Regulamin może ulec zmianie; wersja obowiązująca jest zawsze
        dostępna pod tym adresem, z datą podaną w nagłówku.
      </p>
    </LegalPage>
  );
}
