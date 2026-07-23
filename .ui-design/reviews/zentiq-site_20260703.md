# Design Review: strona Zentiq (one-page)

**Review ID:** zentiq-site_20260703
**Data:** 2026-07-03
**Zakres:** cała strona (app/ + components/), desktop 1440x900 i mobile 390x844, kod + zrzuty na żywo
**Fokus:** kompleksowy (wizualny, użyteczność, kod, wydajność)

## Podsumowanie

Strona jest w bardzo dobrym stanie: kierunek "Papier i szkło" jest konsekwentny, konsola czysta,
brak poziomego scrolla, formularze i klawiatura działają, JSON-LD i FAQPage są na miejscu.
Znalezione problemy to głównie szlify UX (martwa przestrzeń, spójność copy z realnym stanem danych,
widoczność treści bez JS) plus kilka pytań o spójność z sekcją 3 planu (zakazy) w sekcjach
dodanych po redesignie (Proof, PriceReveal).

**Problemy:** 11 (0 krytycznych, 4 ważne, 4 drobne, 3 sugestie)

## Ważne

### 1. "Napisz albo zadzwoń", ale telefonu nie ma
**Lokalizacja:** components/Contact.tsx:56 + lib/site.ts:17
**Kategoria:** Użyteczność / wiarygodność

Lead sekcji Kontakt obiecuje "Napisz albo zadzwoń", ale numer jest placeholderem i słusznie
nie renderuje się. Efekt: obietnica bez pokrycia w sekcji, która ma domykać zaufanie.

**Rekomendacja:** uzależnić copy od `showPhone`: bez telefonu "Napisz do nas. Odpowiadamy
konkretnie, zwykle tego samego dnia."; z telefonem obecna wersja.

### 2. Sekcje z Reveal są niewidoczne bez JavaScript
**Lokalizacja:** app/globals.css (.reveal, .pr-*, .proof-*) + components/Reveal.tsx
**Kategoria:** Dostępność / odporność

`.reveal`, `.pr-*` i `.proof-*` startują z `opacity: 0`, a klasę widoczności nadaje dopiero JS
(IntersectionObserver). Druk jest naprawiony, ale bez JS (czytniki, agresywne blokery,
awaria hydratacji) niewidoczne pozostaje ~80% strony: Proces, Proof, Realizacje, PriceReveal,
Cennik, Manifest, FAQ, Kontakt.

**Rekomendacja:** dodać w globals.css blok
`@media (scripting: none) { .reveal, .pr-market, .pr-strike, .pr-price, .pr-savings, .pr-chip, .proof-kicker, .proof-num, .proof-label, .proof-lead, .proof-item { opacity: 1 !important; transform: none !important; } }`
(wspierane w Chrome/Safari/Firefox od 2023-2024; alternatywnie `<noscript><style>`).

### 3. Martwe ekrany bieli/atramentu między sekcjami (desktop)
**Lokalizacja:** app/globals.css:150 (.section) + app/page.tsx (ciemna klamra)
**Kategoria:** Wizualne / rytm

`padding-block: clamp(6rem, 5rem+7vw, 11rem)` sumuje się na styku sekcji do ~350 px pustki,
a z opóźnionym reveal następnej sekcji użytkownik widzi między Manifestem a FAQ niemal pełny
pusty viewport (potwierdzone zrzutem 1440x900). Podobnie w ciemnej klamrze: między treścią
Kontaktu a stopką jest ~500 px pustego atramentu.

**Rekomendacja:** zbić padding do np. `clamp(5rem, 4rem + 5vw, 8rem)` (redakcyjne światło
zostaje, znikają puste ekrany) i skrócić dolny padding sekcji #kontakt w klamrze.

### 4. Kotwica #realizacje pokazuje sam nagłówek, zero projektów
**Lokalizacja:** components/Work.tsx:31-46
**Kategoria:** Użyteczność / konwersja

Po kliknięciu "Zobacz projekty" (hero) lub "Realizacje" (nav) w viewport 1440x900 mieści się
tylko H2 + lead + pusta przestrzeń; bento z podglądami zaczyna się pod foldem. Sekcja, która
ma być dowodem, każe scrollować w ciemno.

**Rekomendacja:** zmniejszyć odstęp nagłówek-grid (mt-12 -> mt-6/mt-8) i/lub przenieść linijkę
"Projekty demonstracyjne..." pod grid, tak żeby górna krawędź dużej karty wchodziła w pierwszy
viewport (afordancja scrolla).

## Drobne

### 5. Trzy różne etykiety CTA prowadzące do #cennik
**Lokalizacja:** Nav/Hero ("Wyceń stronę"), Pricing ("Zamów darmowy projekt"), Work.tsx:116 ("Zacznij od swojej strony")
**Kategoria:** Spójność (plan, sekcja 6.2: jedna intencja = jedna etykieta)

**Rekomendacja:** hook w Realizacjach zmienić na "Wyceń stronę" (lub konsekwentnie "Zamów
darmowy projekt", skoro to następny krok po obejrzeniu projektów).

### 6. Cele dotykowe poniżej 44 px na mobile
**Lokalizacja:** LivePreview.tsx:99 (chipy), Pricing.tsx ToggleYesNo
**Kategoria:** Użyteczność mobile

Chipy i przełączniki Tak/Nie mają ~36 px wysokości.

**Rekomendacja:** na mobile podnieść do min. 44 px (np. `py-2.5` + `min-h-11`), bez zmian na desktopie.

### 7. Scrollspy wskazuje "Cennik" podczas czytania FAQ
**Lokalizacja:** components/Nav.tsx:37-53
**Kategoria:** Użyteczność (drobne)

Sekcje bez pozycji w nav (FAQ, Manifest, Proof, PriceReveal) zostawiają ostatni aktywny link.

**Rekomendacja:** obserwować też sekcje nienawigacyjne i czyścić `active`, albo zmapować
FAQ -> Cennik świadomie i zostawić.

### 8. Auto-pan mini-stron kręci się także poza viewportem
**Lokalizacja:** globals.css:304 (.minisite-pan) + MiniSiteFrame
**Kategoria:** Wydajność (drobne)

Animacja 20 s infinite działa nawet, gdy panel nie jest w kadrze.

**Rekomendacja:** `animation-play-state: paused` sterowane IntersectionObserverem (albo
`content-visibility: auto` na sekcjach) - mniej pracy kompozytora na słabszych telefonach.

## Sugestie

### 9. Spójność z listą zakazaną planu w sekcjach dodanych po redesignie
Proof używa akcentu na wielkiej liczbie 280 (plan: akcent tylko CTA/focus/aktywny stan/ikona
sukcesu/jedno słowo kursywą), PriceReveal używa `.glass` jako trzeciego miejsca szkła (plan:
dokładnie dwa). Jeśli właściciel akceptuje te rozszerzenia, warto je dopisać do planu, żeby
kolejne sesje nie "naprawiały" ich wstecz; jeśli nie - karta ceny w bandzie może być solidnym
papierem, a 280 atramentem.

### 10. Licznik 280: pilnować prawdziwości
Plan zakazuje zmyślonych liczb; komentarz w kodzie deklaruje, że 280 jest prawdziwe. Warto
trzymać tę wartość w lib/site.ts z komentarzem TODO-aktualizacja, żeby nie zestarzała się
w kodzie komponentu.

### 11. Podgląd pełnej mini-strony
Kadry 4:3 pokazują wycinek; auto-pan ratuje sprawę, ale klient mógłby dostać "Zobacz całość"
(np. rozwinięcie karty do pełnej wysokości zamiast modala). Poza planem - wymaga decyzji
właściciela.

## Co jest zrobione dobrze

- Konsola czysta, zero błędów; brak poziomego scrolla na 390 px.
- Skip link, landmarki, focus ringi z wariantami na ciemnej klamrze i bandzie akcentu.
- Radiogroup z roving tabindex w kalkulatorze; `inert` na zwiniętym formularzu; `aria-live` na cenie i błędach.
- Mini-strony jako prawdziwy DOM z `role="img"` + `aria-hidden` na treści dekoracyjnej.
- Reduced-motion honorowane globalnie (animacje, tweeny liczników, highlight szkła).
- JSON-LD (ProfessionalService + WebSite + FAQPage) spójny z treścią.
- Placeholderowe dane kontaktowe nie wyciekają do UI (guard isPlaceholder).

## Następne kroki (proponowana kolejność)

1. Poprawka copy Kontaktu zależna od telefonu (5 min).
2. `@media (scripting: none)` dla reveal/pr/proof (10 min).
3. Zbicie odstępów sekcji + domknięcie klamry (30 min, wymaga pętli screenshotów).
4. Widoczny grid w kotwicy #realizacje (15 min).
5. Ujednolicenie etykiet CTA + tap targets (15 min).
6. Decyzja właściciela: pkt 9-11.
