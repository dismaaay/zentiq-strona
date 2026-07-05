# Zentiq — legal stack (polityki + regulamin)

**Data:** 2026-07-05. **Status:** zatwierdzony (brainstorming → build).

## Cel
Dorobić pełny zestaw dokumentów prawnych do zentiq.pl, spójny z realnym działaniem
strony (brak trackingu/analytics; jedyne dane osobowe to zgłoszenia z 2 formularzy
wysyłane mailem na kontakt@zentiq.pl).

## Zakres (zatwierdzony)
- **Polityka prywatności (RODO)**, **Polityka cookies**, **Regulamin świadczenia usług**.
- **Bez banera cookies** — strona nie ma cookies wymagających zgody; Polityka cookies
  mówi wprost, że nie śledzimy.
- **Dane administratora = wypełnialne placeholdery** (wzorzec jak telefon/adres:
  `lib/legal.ts` + guard `isLegalPlaceholder`; braki renderowane jako widoczne
  `[do uzupełnienia]`, nie jako zmyślone fakty).

## Architektura (Next.js 16 App Router)
- `lib/legal.ts` — config: dane podmiotu (nazwa, forma, NIP/REGON, adres, przedstawiciel
  UE, e-mail do spraw danych), data aktualizacji, `legalLinks`, `isLegalPlaceholder`.
- `components/legal/LegalPage.tsx` — wspólny wrapper (typografia „Papier i szkło”,
  kolumna ~680px, „Ostatnia aktualizacja”, własna minimalna stopka prawna z cross-linkami).
- `app/polityka-prywatnosci/page.tsx`, `app/polityka-cookies/page.tsx`,
  `app/regulamin/page.tsx` — treść PL + `metadata`.
- `.legal-prose` w `globals.css` — style dla h2/h3/p/ul/a w treści prawnej.
- `components/Nav.tsx` — route-aware linki (`usePathname`): poza homepage kotwice
  wskazują `/#…` (żeby nie łamały się na stronach prawnych); scrollspy/szkło bez zmian.
- `components/Footer.tsx` — dodatkowy rząd linków prawnych (ścieżki absolutne).
- `app/sitemap.ts` — +3 route’y.
- Pod formularzami (Contact, Pricing) — dyskretny mikro-link do Polityki prywatności.

## Treść (uczciwa wobec stanu faktycznego)
- **Prywatność:** administrator, dane z formularzy (imię, e-mail, telefon, firma, treść),
  podstawy art. 6 ust. 1 lit. b i f, okres przechowywania, odbiorcy (Vercel/USA,
  Google/poczta — transfer poza EOG na SCC/DPF), pełnia praw + skarga do PUODO,
  dobrowolność, brak profilowania i decyzji automatycznych, kontakt.
- **Cookies:** brak cookies śledzących/analitycznych/marketingowych; ew. techniczne;
  jak zarządzać w przeglądarce.
- **Regulamin:** definicje, zakres, model „darmowe demo → przejęcie za opłatą + abonament”,
  zawarcie umowy, płatności, prawa autorskie (demo własnością Zentiq do zapłaty),
  reklamacje (14 dni), odstąpienie (konsument), odpowiedzialność, prawo polskie, kontakt.

## Świadomie NIE robimy (YAGNI)
Baner cookies, biblioteka zgód, checkbox przy formularzu.

## Zastrzeżenie
Solidne wzorce branżowe, nie porada prawna — przy realnej działalności do przeglądu
przez prawnika (zwłaszcza administrator/przedstawiciel UE przy operatorze spoza UE).
