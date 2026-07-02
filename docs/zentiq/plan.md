# Zentiq: plan redesignu flagowej strony

> **Dla wykonawcy (agenta):** ten plan jest samowystarczalny. Wszystkie decyzje projektowe zostały podjęte. Nie improwizuj kierunku, nie dodawaj ozdobników spoza planu, nie zmieniaj palety ani fontów. Wykonuj zadania w kolejności, po każdym rób pętlę weryfikacji screenshotem (chrome-devtools MCP). Przed napisaniem JAKIEGOKOLWIEK kodu przeczytaj wskazane pliki dokumentacji Next.js 16 z `node_modules/next/dist/docs/` (repo używa wersji z breaking changes względem wiedzy treningowej, patrz AGENTS.md).

**Cel:** strona Zentiq (firma robiąca strony) ma być naszym najlepszym argumentem sprzedażowym. Prospekt w 3 sekundy ma poczuć: "ci wiedzą, co robią". 

**Architektura:** one-page Next.js 16 (App Router, Turbopack), server components + małe wyspy klienckie, Tailwind v4 (tokeny w `@theme`), zero bibliotek animacji (vanilla CSS + IntersectionObserver + rAF). Istniejąca logika biznesowa (`lib/pricing.ts`, `lib/mailer.ts`, API routes) zostaje bez zmian.

**Stack:** Next.js 16.2.10, React 19.2.4, Tailwind CSS v4, nodemailer. Fonty przez `next/font/google`.

---

## 1. Diagnoza obecnej strony (stan na 2026-07-02)

Obecna wersja jest poprawna technicznie (czysta konsola, formularze działają, jest reduced-motion), ale wizualnie to katalog wzorców "AI-slop". Punktowo:

1. **Gradient niebiesko-indygo na H1** ("Potem zdecyduj.") plus dwa rozmyte bloby tła (`bg-accent/10 blur-[120px]` + `bg-indigo-300/20`): podręcznikowa sygnatura stron generowanych. Do wycięcia w całości.
2. **Dwa akcenty** (błękit #0071e3 + indygo) łamią dyscyplinę jednego akcentu.
3. **Hero nie mieści się w viewporcie 1440x900**: badge + H1 + 40-słowowy podtekst spychają CTA pod fold. Podtekst ma 4-5 linii i em-dash.
4. **Trzy identyczne karty przewag** pod hero: zbanowany wzorzec "3 equal feature cards".
5. **Eyebrow nad każdą sekcją** (O NAS / CENNIK / REALIZACJE / KONTAKT): templatkowy rytm, zero informacji.
6. **Wszystko jest kartą.** Kilkanaście razy ten sam przepis `rounded-3xl border border-line bg-white`. Sekcje różnią się tylko zebrą tła (biały / mist / biały). Brak hierarchii inaczej niż kartą.
7. **Numeracja kroków "01 / 02 / 03"** w filozofii: chrome bez treści.
8. **Fejkowe statystyki:** "100% skupienia na jakości" (pusta liczba), "0 zł ryzyka" jako stat-karta. Zmyślone liczby obniżają wiarygodność zamiast ją budować.
9. **Portfolio to div-owe atrapy przeglądarek** (trzy kropki + szare paski) z `url: "#"`. To antywzorzec nr 1 stron AI, a u firmy sprzedającej strony jest wprost kompromitujący: "zobacz nasze realizacje" pokazuje, że nie ma czego zobaczyć.
10. **Kalkulator ma martwą interakcję:** cena liczy się dopiero po kliknięciu "Oszacuj koszt", choć mogłaby żyć przy każdym przełączniku. Limit 750 zł nigdzie nie jest zakomunikowany na UI. Kalkulator i formularz to dwie niepowiązane karty.
11. **Copy ze slopem:** "Zbudowani przez pasjonatów. Prowadzeni przez zaufanie." (puste), "Projekty, które mówią same za siebie" (klisza), em-dashe w całym tekście.
12. **`Reveal` ukrywa całą stronę** (`opacity: 0`) do czasu scrolla: pełnostronicowy zrzut, druk i część renderów widzi pustkę; `will-change` wisi permanentnie na 29 elementach.
13. **Zero osobowości typograficznej:** Geist wszędzie, w tym jako display. Strona czysto tekstowa, bez jednego obrazu czy artefaktu wizualnego.
14. **Nav jak z szablonu:** pełnoszerokościowy fixed bar, bez wskazania aktywnej sekcji.
15. **Placeholderowe dane publicznie renderowane:** "+48 000 000 000", "ul. Przykładowa 1, 00-000 Warszawa"; rok w stopce zahardkodowany na 2025 (jest 2026).
16. **SEO braki:** brak OG image (mimo `summary_large_image`), brak JSON-LD.

Co jest dobre i zostaje: slogan "Najpierw zobacz. Potem zdecyduj." (krótki, konkretny, to realny model biznesowy), logika kalkulatora, endpointy mailowe, treść pytań kalkulatora, dbałość o dostępność formularzy.

---

## 2. Kierunek: "Papier i szkło"

Przeciwieństwo panelu Jarvis (ciemny, gęsty, neon-cyan, mission-control). Zentiq to:

- **Papier:** ciepło-neutralna, jasna płaszczyzna, redakcyjna typografia o dużym kontraście skali, mnóstwo światła i whitespace. Hierarchia budowana wyłącznie rozmiarem, wagą i odstępem. Jeden pomysł na sekcję.
- **Szkło:** jeden dopracowany akcent materiałowy w duchu Apple liquid glass 2025/26 (warstwowa półprzezroczystość, blur + saturate, spekularna krawędź, reaktywny highlight). Występuje TYLKO w dwóch miejscach: pływająca nawigacja po scrollu oraz panel podglądu w hero. Nigdzie indziej.
- **Dowód zamiast deklaracji:** zamiast atrap i przymiotników strona pokazuje żywe, działające mini-strony (prawdziwy DOM, nie obrazki). Firma od robienia stron udowadnia kompetencję na własnej stronie.

Jedno zdanie tezy: "Strona Zentiq sama jest portfolio: redakcyjny spokój, chirurgiczna typografia i jeden żywy, szklany panel, w którym klient ogląda produkt zanim o niego zapyta."

---

## 3. Lista zakazana (obowiązuje każdy piksel i każdy string)

- AI-glow: fioletowo-niebieskie gradienty, gradient na tekście, rozmyte kolorowe bloby tła.
- Więcej niż JEDEN akcent kolorystyczny na całej stronie.
- Inter / Roboto / Arial jako font display.
- Stockowe "hero z laptopem", zdjęcia uścisków dłoni, ludzie w garniturach.
- Klisze copy: "Elevate", "Seamless", "Rewolucyjny", "Twój partner w...", "Kompleksowe rozwiązania", "Zaufało nam X firm", "pasja", "innowacyjne podejście".
- Em dash i en dash w JAKIMKOLWIEK widocznym tekście (także w atrybutach alt i aria). Zakres liczb zapisujemy dywizem: "500-750 zł".
- Emoji jako ikony lub w treści.
- Etykiety typu "SEKCJA 01", "No.01", "EST. 2024", numerowane eyebrow, ozdobne kropki statusu.
- Zmyślone liczby i statystyki ("100% jakości", "98% zadowolenia"). Wolno używać wyłącznie faktów klienta: cena od 500 zł, limit 750 zł, projekt do 24 h, projekt przed płatnością za 0 zł.
- Glassmorphism poza nav i panelem hero. Żadnych szklanych kart w sekcjach.
- Div-owe atrapy screenshotów (szare paski udające UI). Podglądy projektów są PRAWDZIWYM, wyrenderowanym DOM-em (komponenty MiniSite, zadanie 5).
- Eyebrow: maksymalnie 2 na całej stronie.
- Trzy identyczne karty w rzędzie.
- `window.addEventListener("scroll", ...)` do animacji (dozwolony wyłącznie throttled scroll-listener nav, patrz zadanie 4) oraz animowanie właściwości layoutowych (width/height/top/left).

---

## 4. System designu

### 4.1 Fonty

| Rola | Font | Źródło | Uwagi |
|---|---|---|---|
| Display (H1, H2, duże liczby słowne) | **Bricolage Grotesque** | `next/font/google` | variable, subsets: `["latin", "latin-ext"]` (polskie znaki!), oś opsz robi robotę w dużych stopniach. Wagi używane: 500, 600. |
| Body / UI | **Geist** | `next/font/google` (już w projekcie) | wagi 400, 500. |
| Liczby, ceny, dane | **Geist Mono** | `next/font/google` | zawsze z `font-variant-numeric: tabular-nums`. |

W `app/layout.tsx`:

```tsx
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});
const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-base",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-base",
  display: "swap",
});
// na <html>: `${display.variable} ${sans.variable} ${mono.variable}`
```

### 4.2 Skala typograficzna (dokładne wartości)

Zdefiniuj jako utility klasy lub używaj inline; wartości są wiążące:

| Token | Rozmiar | Line-height | Tracking | Font |
|---|---|---|---|---|
| `display` (H1 hero) | `clamp(2.875rem, 1.3rem + 6.6vw, 6.25rem)` | `0.98` | `-0.035em` | Bricolage 600 |
| `h2` (nagłówki sekcji) | `clamp(2.125rem, 1.25rem + 3.4vw, 4rem)` | `1.02` | `-0.025em` | Bricolage 600 |
| `h3` | `clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)` | `1.15` | `-0.015em` | Bricolage 500 |
| `lead` (podtekst hero/sekcji) | `clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)` | `1.6` | `0` | Geist 400 |
| `body` | `1.0625rem` (17px) | `1.65` | `0` | Geist 400 |
| `small` | `0.875rem` | `1.5` | `0` | Geist 400/500 |
| `price` (cena w kalkulatorze) | `clamp(3.25rem, 2rem + 4.5vw, 5.5rem)` | `1` | `-0.02em` | Geist Mono 500, tabular |

Zasady: H1 maks 2 linie na desktopie. Lead maks 20 słów. Akapity `max-width: 62ch`. Emfaza wewnątrz nagłówka wyłącznie kursywą lub wagą tej samej rodziny (nigdy innym fontem, nigdy kolorem).

### 4.3 Paleta (4 HEX-y bazowe + tokeny pochodne)

```css
@theme {
  /* BAZA (4 hexy) */
  --color-paper: #FBFBF9;   /* tło strony */
  --color-ink: #151514;     /* tekst główny, przyciski secondary */
  --color-accent: #0E5B43;  /* JEDYNY akcent: głęboki viridian (CTA, focus, aktywny stan) */
  --color-line: #E9E9E4;    /* hairline: bordery, separatory */

  /* POCHODNE (liczone z bazy, nie dodawać nowych barw) */
  --color-ink-2: #61615C;                                   /* tekst drugorzędny (kontrast ~4.9:1 na paper) */
  --color-accent-strong: #0A4634;                           /* hover CTA */
  --color-field: #F3F3EF;                                   /* tło inputów i cichych płaszczyzn */
  --color-accent-wash: color-mix(in srgb, var(--color-accent) 7%, var(--color-paper)); /* wyłącznie: tło success i pola świetlne za szkłem */
}
```

Reguły: akcent pojawia się WYŁĄCZNIE na: primary CTA, focus ringach, aktywnej pozycji nav/chipów, ikonce sukcesu formularza i maks. jednym słowie kursywą w sekcji Proces. Wszystko inne to ink / ink-2 / paper / line / field. Czerwień błędów formularza: systemowa `#B3261E` (jedyny wyjątek, semantyczny). Motyw: tylko jasny, `color-scheme: light` zostaje.

### 4.4 Spacing, promienie, światło

- Baza 4 px. Odstęp między sekcjami: `padding-block: clamp(6rem, 5rem + 7vw, 11rem)`. Wewnątrz sekcji: 24 / 40 / 64 px.
- Kontener: `max-width: 1200px`, padding-inline 24 px (mobile) / 32 px (od md).
- Promienie (jeden system, bez wyjątków): interaktywne pigułki `999px` (przyciski, chipy, toggle), panele szkła `24px`, karty i podglądy `20px`, inputy `12px`.
- Cienie: głębia światłem, nie cieniem. Domyślnie płaszczyzny rozdziela hairline `--color-line` i whitespace. Cień istnieje tylko pod dwoma szklanymi elementami: `0 20px 40px -24px rgb(21 21 20 / 0.25)`.

### 4.5 Tokeny ruchu

```css
@theme {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* wejścia, reveal */
  --ease-swift: cubic-bezier(0.65, 0, 0.35, 1); /* przejścia stanów, crossfade */
  --dur-hover: 150ms;
  --dur-state: 300ms;
  --dur-reveal: 600ms;
  --dur-morph: 450ms;  /* przełączanie wariantów mini-strony */
}
```

- Reveal on scroll: `opacity 0 -> 1` + `translateY(20px) -> 0`, `--dur-reveal --ease-out`, stagger 70 ms, jednorazowo (IntersectionObserver, `once`). 
- OBOWIĄZKOWA poprawka względem obecnego kodu: `.reveal` ma być widoczny w druku i bez JS: `@media print { .reveal { opacity: 1 !important; transform: none !important; } }` oraz brak permanentnego `will-change` (dodawany klasą tylko na czas animacji lub usunięty całkiem).
- `prefers-reduced-motion: reduce`: wszystkie animacje i przejścia skrócone do 0, licznik ceny bez tweena, crossfade wariantów natychmiastowy, highlight szkła wyłączony.
- Animujemy wyłącznie `transform` i `opacity`.

### 4.6 Liquid glass: dokładna receptura

Szkło występuje w DOKŁADNIE dwóch miejscach: (a) pigułka nav po scrollu, (b) panel LivePreview w hero. To aproksymacja webowa Apple Liquid Glass (backdrop-filter), nie oficjalny materiał; w komentarzu kodu tak ją nazwij.

```css
/* globals.css */
.glass {
  position: relative;
  isolation: isolate;
  border-radius: 24px;
  background: linear-gradient(160deg, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0.25));
  border: 1px solid rgb(255 255 255 / 0.55);
  backdrop-filter: blur(18px) saturate(170%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.75),        /* spekularna górna krawędź */
    inset 0 -1px 1px rgb(14 91 67 / 0.05),        /* chłodna refrakcja dołu */
    0 20px 40px -24px rgb(21 21 20 / 0.25);       /* miękka głębia */
}
.glass::after { /* wewnętrzna obwódka refrakcyjna */
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: calc(24px - 1px);
  border: 1px solid rgb(255 255 255 / 0.3);
  pointer-events: none;
}
.glass-highlight { /* reaktywny odblask, sterowany transformem */
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(255 255 255 / 0.5), transparent 70%);
  transform: translate3d(var(--hx, -160px), var(--hy, -160px), 0);
  opacity: 0;
  transition: opacity var(--dur-state) var(--ease-out);
  pointer-events: none;
}
.glass:hover .glass-highlight { opacity: 1; }

/* Pełny fallback bez blura */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgb(251 251 249 / 0.97); }
}
@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: rgb(251 251 249 / 0.98);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

- Nav używa wariantu `.glass` z `border-radius: 999px` i `blur(14px) saturate(150%)`.
- Highlight: jeden `pointermove` listener na panelu, throttling przez `requestAnimationFrame`, aktualizuje `--hx/--hy` przez `style.setProperty`. Wyłączony przy `prefers-reduced-motion` i na urządzeniach dotykowych (`(hover: none)`).
- Kontrast: każdy tekst leżący na szkle to `--color-ink` na tle o efektywnej jasności zbliżonej do paper (białe alfa >= 0.55 na jasnym polu), utrzymuje >= 4.5:1. Nie kłaść na szkle tekstu w `--color-ink-2`.
- Żeby szkło miało co załamywać, pod hero leży statyczne "pole świetlne": dwa duże, NISKOnasycone radialne pola w `--color-accent-wash` i czystym białym (bez animacji, bez fioletu/błękitu, saturacja niska; to światło, nie "glow").
- Budżet wydajności: backdrop-filter maks. na 2 elementach jednocześnie, oba to elementy fixed/wydzielone warstwowo; nigdy na kontenerach scrollowanych.

---

## 5. Struktura plików

```
app/
  layout.tsx            (fonty: display+sans+mono, metadata, JSON-LD)
  page.tsx              (kompozycja sekcji)
  globals.css           (pełny nowy system tokenów, glass, reveal)
  opengraph-image.tsx   (NOWY: OG 1200x630 przez ImageResponse)
components/
  Nav.tsx               (NOWY, zastępuje Navbar.tsx)
  Hero.tsx              (przepisany: split + LivePreview)
  LivePreview.tsx       (NOWY: szklany panel + przełącznik wariantów)
  minisites/
    MiniSalon.tsx       (NOWY)
    MiniKancelaria.tsx  (NOWY)
    MiniPracownia.tsx   (NOWY)
  Process.tsx           (NOWY, zastępuje sekcję filozofii z About)
  Work.tsx              (NOWY, zastępuje Portfolio.tsx)
  Pricing.tsx           (przepisany PricingCalculator.tsx)
  Manifest.tsx          (NOWY, zastępuje About.tsx)
  Contact.tsx           (przepisany)
  Footer.tsx            (przepisany, minimalny)
  Reveal.tsx            (poprawiony: print fix, bez will-change)
  ui.tsx                (przepisane prymitywy: Container, Button, Field)
lib/
  site.ts               (aktualizacja copy i nav)
  projects.ts           (przerobiony na opisy 3 projektów pokazowych)
  pricing.ts            (BEZ ZMIAN)
  mailer.ts             (BEZ ZMIAN)
app/api/*               (BEZ ZMIAN)
```

Stare pliki `Navbar.tsx`, `Portfolio.tsx`, `About.tsx`, `PricingCalculator.tsx` usunąć po zastąpieniu.

---

## 6. Sekcje, jedna po drugiej

Kolejność na stronie: Nav, Hero, Proces, Realizacje, Cennik, Manifest, Kontakt, Footer. Sześć rodzin layoutu, żadna się nie powtarza. Eyebrow: zero (nagłówki niosą się same); to spełnia limit z nawiązką.

### 6.1 Nav

- **Cel:** nie przeszkadzać; po scrollu stać się pierwszą próbką "szkła".
- **Layout:** na górze strony przezroczysty pasek: logotyp "Zentiq" (Bricolage 600, 20 px) po lewej, 4 linki (Proces, Realizacje, Cennik, Kontakt) + CTA "Wyceń stronę" po prawej. Po przekroczeniu 24 px scrolla pasek płynnie (300 ms) zamienia się w odklejoną od krawędzi pigułkę glass (`max-width: 760px`, wycentrowana, `top: 12px`), linki się zagęszczają.
- **Scrollspy:** aktywna sekcja podkreślona kolorem `--color-ink` (nieaktywne `--color-ink-2`); IntersectionObserver, nie scroll handler. Wykrywanie samego scrolla (przełączenie pigułki): pojedynczy pasywny listener z rAF-guard, dozwolony wyjątkowo.
- **Mobile (<768):** logotyp + przycisk menu (morfujący hamburger 2 kreski -> X). Menu: pełnoekranowa nakładka na paper (NIE glass), linki Bricolage h3, stagger wejścia 60 ms, body scroll lock. 
- **A11y:** `<header><nav aria-label="Główna">`, skip link "Przejdź do treści" jako pierwszy fokusowalny element, focus-visible ring `2px var(--color-accent)` offset 2.

### 6.2 Hero (z sygnaturowym panelem)

- **Cel:** w 3 sekundy: kim jesteśmy + dowód kompetencji na żywo. Całość MUSI mieścić się w 1440x900 razem z CTA.
- **Layout desktop (od lg):** grid 12 kolumn. Lewa (kolumny 1-6): H1, lead, CTA. Prawa (kolumny 7-12): panel LivePreview. Wyrównanie do linii bazowej H1, panel lekko wystaje w górę (`margin-top` ujemny ok. 24 px) dla redakcyjnego napięcia. Zero badge/pigułki nad H1, zero pasków zaufania.
- **Copy (dokładnie):**
  - H1: `Najpierw zobacz.` (linia 1) `Potem zdecyduj.` (linia 2, ta sama czerń, bez gradientu; słowo "zdecyduj" kursywą Bricolage dla emfazy).
  - Lead (17 słów): `Projektujemy i budujemy strony dla firm. Gotowy projekt oglądasz za darmo. Płacisz dopiero, gdy chcesz go zatrzymać.`
  - CTA primary: `Wyceń stronę` (link do #cennik). CTA secondary (ghost, ink ring): `Zobacz projekty` (link do #realizacje). Te same etykiety wszędzie na stronie (jedna intencja = jedna etykieta).
- **Panel LivePreview (sygnatura, opis pełny w sekcji 7):** rama `.glass` 24 px z paskiem tytułowym (nazwa projektu + adres w Geist Mono 13 px), wewnątrz żywa mini-strona. Pod panelem trzy chipy: `Salon urody`, `Kancelaria`, `Pracownia mebli`.
- **Tło:** statyczne pole świetlne (4.6). Bez blobów, bez animacji tła.
- **Motion:** wejście strony: H1 wjeżdża liniami (mask reveal, translateY 24 px, stagger 90 ms), potem lead i CTA (opóźnienie 150/250 ms), panel fade+rise 600 ms. Wszystko raz, na load.
- **Mobile:** kolumna: H1 (`clamp` zejdzie do ~46 px), lead, CTA (pełna szerokość), panel poniżej (aspekt 4:3, chipy przewijane poziomo ze scroll-snap).

### 6.3 Proces ("Ryzyko bierzemy na siebie")

- **Cel:** model "płacisz po obejrzeniu" opowiedziany tak prosto, że aż rozbraja.
- **Layout:** wąska kolumna redakcyjna (max 800 px, wyrównana do lewej z wcięciem `margin-left` ok. 8% na desktopie). H2: `Ryzyko bierzemy na siebie.` Pod nim trzy kroki jako duże wersy typograficzne (h3 w skali `h2` pomniejszonej o stopień, Bricolage 500), każdy oddzielony hairline, każdy z jednozdaniowym opisem w `--color-ink-2`:
  1. `Opisujesz firmę.` / `Wypełniasz krótki formularz wyceny. To wszystko, czego potrzebujemy na start.`
  2. `Dostajesz gotowy projekt.` / `W ciągu 24 godzin wysyłamy link do działającej strony. Za darmo.`
  3. `Decydujesz.` / `Podoba się: płacisz i strona jest twoja. Nie podoba się: nie płacisz nic.`
- Sekwencję niesie sam układ (pionowa progresja + hairline). ZERO numeracji "01/02/03", zero ikon.
- **Motion:** kroki wjeżdżają stagger 70 ms przy scrollu. Nic więcej.
- **Glass:** brak (zgodnie z regułą).

### 6.4 Realizacje ("Projekty pokazowe")

- **Cel:** uczciwie pokazać umiejętności bez zmyślonych klientów: te same trzy mini-strony co w hero, w pełniejszej odsłonie.
- **Copy:** H2 `Projekty pokazowe.` Lead: `Trzy branże, trzy charaktery. Każdy projekt działa naprawdę: to strona, nie obrazek.`
- **Layout:** asymetryczne bento 3 = 3 (bez pustych komórek): na desktopie lewa kolumna to jedna duża karta (60% szerokości, aspekt 4:3), prawa kolumna dwie mniejsze jedna nad drugą. Karta = podgląd MiniSite w ramce `20px` z hairline (BEZ szkła) + pod spodem nazwa (h3) i jedno zdanie zakresu ("Rezerwacje online i cennik zabiegów" itd.). Duża karta rotuje: klik w małą kartę płynnie (crossfade 450 ms) awansuje ją do dużej. Na mobile: pionowy stos 3 równych kart.
- **Uczciwość:** nad gridem mała linijka w `--color-ink-2`: `Projekty demonstracyjne przygotowane przez Zentiq.` Zero fejkowych logotypów i nazwisk.
- **Dane:** `lib/projects.ts` przerobić na: `{ id, nazwa, branża, zakresZdanie, komponent }` dla trzech pozycji: `Studio Halo` (salon urody), `Kancelaria Reda` (radca prawny), `Pracownia Forma` (meble na wymiar).

### 6.5 Cennik (kalkulator na żywo)

- **Cel:** przezroczystość ceny jako przewaga; kalkulator ma sprawiać frajdę.
- **Copy:** H2 `Cena bez niespodzianek.` Lead: `Trzy pytania i widzisz koszt od razu. Nigdy więcej niż 750 zł.`
- **Layout desktop:** grid `[1fr 400px]`, gap 64 px. Lewa kolumna: trzy pytania jako wiersze oddzielone hairline (pytanie `body` 500 + hint `small` w ink-2, po prawej segmentowany toggle Tak/Nie w pigułce `--color-field`); pod nimi textarea "Masz inny pomysł? Opisz go." Prawa kolumna: sticky (top 96 px) podsumowanie na `--color-field` (radius 20): label `Wycena wstępna` (small, ink-2), **cena na żywo** w skali `price` (Geist Mono, tabular), aktualizująca się przy każdym przełączniku licznikiem 350 ms (rAF tween; reduced-motion: skok), pod nią `Projekt i wycena są darmowe. Górna granica to 750 zł.` oraz CTA primary `Zamów darmowy projekt`.
- **Formularz:** klik CTA rozwija (grid-template-rows animowane) pod podsumowaniem pola: Imię*, Telefon*, E-mail*, Nazwa firmy. Wysyłka na istniejący `/api/wycena` (payload bez zmian: `{...form, answers, idea, price}`). Stany: sending (spinner w przycisku + disabled), success (ikona check w akcencie + `Dziękujemy. Projekt wyślemy zwykle w 24 godziny.`), error inline pod przyciskiem, `aria-live="polite"`.
- **Semantyka toggli:** `role="radiogroup"` z dwoma `role="radio"` (aria-checked), obsługa strzałek. Nie aria-pressed na parze przycisków.
- **Mobile:** kolumna; podsumowanie NIE sticky, ląduje pod pytaniami.
- **Logika:** `lib/pricing.ts` bez zmian; przycisk "Oszacuj koszt" znika (cena zawsze widoczna).

### 6.6 Manifest ("O nas" po odchudzeniu)

- **Cel:** dwa akapity konkretu zamiast laurki; sekcja czysto typograficzna, największy whitespace na stronie.
- **Layout:** centrowana wąska kolumna (max 680 px). H2 `Mała firma. Konkretna robota.` Dwa akapity `lead`:
  - `Zentiq prowadzi dwóch programistów, którzy piszą kod od kilkunastu lat. Zamiast handlowców i prezentacji mamy własne narzędzia, które skracają produkcję strony do jednego dnia.`
  - `Dlatego możemy pokazać gotowy projekt, zanim zapadnie decyzja o zakupie. Jeśli nie trafimy w oczekiwania, kasujemy plik i zostajemy w dobrych relacjach.`
- Pod akapitami jedna linia faktów (grid 3 kolumny, wartości Geist Mono 500, opisy small ink-2, rozdzielone hairline w pionie): `od 500 zł / cena strony`, `do 24 h / gotowy projekt`, `0 zł / za obejrzenie projektu`. To fakty klienta, nie statystyki.
- **Zakaz:** żadnych kart, cieni, ikon, zdjęć zespołu, "pasjonatów" i "zaufania".

### 6.7 Kontakt

- **Cel:** ostatnie domknięcie; minimalizm graniczący z wizytówką.
- **Layout:** dwie kolumny (od lg): lewa H2 `Porozmawiajmy.` + pod spodem e-mail i telefon złożone DUŻYM stopniem (h3, Geist Mono, linki z podkreśleniem od hover); prawa: formularz 3 pól (Imię*, E-mail*, Wiadomość*) + przycisk `Wyślij wiadomość`, wysyłka na `/api/kontakt`, stany jak w 6.5.
- **Dane:** renderować wyłącznie e-mail i telefon z `lib/site.ts`. NIE renderować adresu, dopóki w site.ts jest placeholder (usunąć "ul. Przykładowa" z UI; zostawić pole w configu z komentarzem TODO). Telefon "+48 000 000 000" oznaczyć w site.ts komentarzem TODO dla właściciela.

### 6.8 Footer

- Jedna linia na desktopie: logotyp, linki nav, e-mail; niżej hairline i `© 2026 Zentiq` (rok liczony `new Date().getFullYear()` w server component). Zero sloganów w stopce, zero "wykonane z dbałością".

---

## 7. Sygnaturowy moment "wow": żywa makieta w szkle

Dokładny opis, bo to serce strony:

1. **Co widzi użytkownik:** w hero, po prawej, stoi szklany panel wyglądający jak ultralekka, przezroczysta karta przeglądarki: pasek tytułowy (kropka-zamknij NIE istnieje; zamiast tego nazwa projektu i fikcyjny adres `studiohalo.pl` w Geist Mono), a pod nim DZIAŁAJĄCA mini-strona salonu urody: własna typografia, własna mikro-paleta, nagłówek, przycisk, cennik zabiegów. To prawdziwy DOM wyrenderowany w skali ~0.5, nie screenshot i nie atrapa z pasków.
2. **Interakcja:** pod panelem trzy chipy-pigułki. Klik "Kancelaria": zawartość panelu płynnie gaśnie (opacity + translateY 8 px, 450 ms `--ease-swift`), wjeżdża mini-strona kancelarii, pasek tytułowy zmienia nazwę i adres, a mikro-paleta panelu (tylko wewnątrz ramki!) zmienia się z pudrowej na atramentową. Wysokość panelu stała: zero CLS.
3. **Światło:** poruszając kursorem po panelu, po szkle wędruje miękki spekularny odblask (`.glass-highlight`, transform-only). Na krawędzi ramy stała jasna linia od góry (inset shadow) daje efekt załamania światła.
4. **Sens sprzedażowy:** klient firmy od stron NA WŁASNE OCZY widzi produkt w 3 sekundy od wejścia, w trzech stylach. Slogan "Najpierw zobacz" jest zademonstrowany, nie zadeklarowany.
5. **Implementacja:** `LivePreview.tsx` (client) trzyma stan wariantu; mini-strony to trzy server-renderowalne komponenty w `components/minisites/` (każdy ~60-80 linii): stała szerokość projektowa 720 px, `transform: scale()` liczone z szerokości kontenera (ResizeObserver lub czyste CSS `container queries`), `aria-hidden` na treści dekoracyjnej + `role="img"` z `aria-label="Podgląd projektu strony: Studio Halo"` na ramce, `pointer-events: none` wewnątrz podglądu, interaktywne są tylko chipy. Reduced-motion: przełączenie natychmiastowe. Fallback bez blur: rama solid 4.6.
6. **Mikro-palety mini-stron (wewnętrzne, nie wchodzą do tokenów strony):**
   - Studio Halo: porcelana `#F6EFEA`, śliwka `#3E2A33`, akcent `#A15C4B`.
   - Kancelaria Reda: ecru `#F4F2EC`, atrament `#1C2430`, akcent `#8A6D3B`.
   - Pracownia Forma: złamana biel `#F5F4F0`, grafit `#26261F`, akcent dąb `#8C6A3F`.

---

## 8. Głos marki i zasady copy

- Krótkie zdania. Czasowniki. Konkrety liczbowe tylko prawdziwe (500, 750, 24 h, 0 zł).
- Zero przechwałek i przymiotników z listy zakazanej; kompetencję pokazuje strona, nie epitety.
- Interpunkcja: kropki i dwukropki zamiast myślników. ZERO em/en dash w całym serwisie (też w `site.ts`, mailach z formularzy i meta description).
- Description SEO (podmienić w site.ts): `Zentiq buduje strony dla firm. Gotowy projekt zobaczysz za darmo w 24 godziny i zapłacisz dopiero, gdy zechcesz go zatrzymać. Ceny od 500 do 750 zł.`
- Wszystkie stringi z sekcji 6 są wiążące. Jeśli wykonawca potrzebuje stringu, którego tu nie ma, pisze zdanie oznajmujące bez ozdobników i sprawdza je względem listy zakazanej.

---

## 9. Zadania (wykonywać w kolejności)

Każde zadanie kończy się: (a) czystym `npm run build` bez błędów i warningów, (b) pętlą screenshotów chrome-devtools (1440x900 i 390x844, sekcja której dotyczy zadanie), (c) porównaniem z opisem sekcji z tego planu. Dev server: `npm run dev` na :3000.

### Zadanie 0: dokumentacja
- Przeczytaj: `node_modules/next/dist/docs/01-app/01-getting-started/`: `05-server-and-client-components.md`, `11-css.md`, `12-images.md`, `13-fonts.md`, `14-metadata-and-og-images.md`, `15-route-handlers.md` oraz `02-guides/forms.md`.
- **Akceptacja:** wykonawca zna aktualne API fontów, metadata i granice server/client w tej wersji Next.

### Zadanie 1: fundament tokenów i fontów
- Podmień w całości `@theme` w `app/globals.css` na system z sekcji 4 (paleta, skala, ruch, glass, reveal z print-fixem). Usuń stare tokeny (mist, accent #0071e3, float keyframes, bloby).
- W `app/layout.tsx` dodaj trzy fonty (4.1), zmień klasy body na `bg-paper text-ink`.
- **Akceptacja:** strona (jeszcze stara struktura) renderuje się na nowych tokenach; `npm run build` czysty; screenshot potwierdza font display w H1.

### Zadanie 2: prymitywy
- Przepisz `components/ui.tsx`: `Container` (1200px), `Button/ButtonLink` (primary: accent bg + white; secondary: ring-1 ink/25 + text-ink; pigułki, active scale 0.98, focus ring accent), `Field` (label nad inputem, radius 12, bg field, focus border accent + ring accent/20).
- Popraw `Reveal.tsx`: print fix, brak will-change, prop `delay` zostaje.
- Dodaj do globals klasy `.glass`, `.glass-highlight` (4.6).
- **Akceptacja:** build czysty; wizualna próbka przycisków w hero po zadaniu 5.

### Zadanie 3: mini-strony
- Zbuduj `components/minisites/MiniSalon.tsx`, `MiniKancelaria.tsx`, `MiniPracownia.tsx` wg 7.5-7.6: szerokość projektowa 720 px, 3 bloki (pasek marki, hero z CTA, listing 2-3 pozycji z cenami), realne polskie treści (nazwy zabiegów/usług/mebli), mikro-palety inline.
- **Akceptacja:** każdy komponent osadzony testowo w page renderuje się poprawnie przy scale 1 i 0.5; brak zależności od tokenów globalnych.

### Zadanie 4: Nav
- `components/Nav.tsx` wg 6.1 (pigułka glass po 24 px, scrollspy IO, mobile overlay, skip link). Podmień w layout, usuń `Navbar.tsx`. Zaktualizuj `navItems` w `lib/site.ts`: Proces `#proces`, Realizacje `#realizacje`, Cennik `#cennik`, Kontakt `#kontakt` (bez "Strona główna").
- **Akceptacja:** screenshoty top/scrolled 1440 + menu mobilne 390; tab-order logiczny; pigułka nie powoduje CLS; scrollspy podświetla właściwą sekcję.

### Zadanie 5: Hero + LivePreview
- `components/LivePreview.tsx` (client): rama glass, pasek tytułowy, skalowanie, chipy, crossfade, highlight pointer (rAF), reduced-motion i touch fallbacki.
- Przepisz `Hero.tsx` wg 6.2 (split grid, copy dosłownie z planu, animacja wejścia liniami). Usuń trzy karty przewag, badge i bloby.
- **Akceptacja:** na 1440x900 H1+lead+CTA+panel w całości widoczne bez scrolla; przełączanie wariantów bez skoku wysokości (sprawdź w devtools layout shift); highlight działa na hover, nie istnieje na emulowanym touch/reduced-motion; kontrast tekstu na pasku szkła >= 4.5:1 (zmierz evaluate_script + getComputedStyle albo screenshotem w narzędziu kontrastu).

### Zadanie 6: Proces
- `components/Process.tsx` wg 6.3, id `#proces`. Usuń z kompozycji starą sekcję About (jeszcze bez kasowania pliku).
- **Akceptacja:** screenshot zgodny z opisem; zero numeracji; hairline między krokami; stagger reveal.

### Zadanie 7: Realizacje
- Przerób `lib/projects.ts` (struktura z 6.4). Zbuduj `Work.tsx`: bento 1 duża + 2 małe, awans karty kliknięciem, linijka o projektach demonstracyjnych. Usuń `Portfolio.tsx`.
- **Akceptacja:** 3 komórki bez pustych; crossfade awansu 450 ms; mobile stos; klawiatura: karty jako button z aria-label "Pokaż projekt X w powiększeniu".

### Zadanie 8: Cennik
- Przepisz na `Pricing.tsx` wg 6.5: cena na żywo (tween rAF), sticky podsumowanie, rozwijany formularz, semantyka radiogroup, wysyłka na `/api/wycena` bez zmian payloadu.
- Usuń `PricingCalculator.tsx` (przenieś `SuccessMessage` do ui.tsx, bo używa go też Contact).
- **Akceptacja:** przełączenie odpowiedzi natychmiast zmienia cenę; suma zgodna z `calculatePrice` dla wszystkich 8 kombinacji (sprawdź evaluate_script klikając togglami); formularz wysyła i pokazuje stany; przy `prefers-reduced-motion` cena skacze bez tweena.

### Zadanie 9: Manifest
- `components/Manifest.tsx` wg 6.6 (id `#o-nas` NIE istnieje już w nav; sekcja bez kotwicy lub z `#zentiq`). Usuń `About.tsx`.
- **Akceptacja:** typografia i fakty zgodne z planem; brak kart.

### Zadanie 10: Kontakt + Footer
- Przepisz `Contact.tsx` (6.7) i `Footer.tsx` (6.8). W `lib/site.ts`: nowe description (sekcja 8), komentarze TODO przy telefonie/adresie, adres nie renderowany.
- **Akceptacja:** formularz działa; w UI brak placeholderowego adresu; stopka jednoliniowa; rok 2026 dynamicznie.

### Zadanie 11: SEO i meta
- `app/opengraph-image.tsx`: ImageResponse 1200x630, paper tło, "Zentiq" + "Najpierw zobacz. Potem zdecyduj." w stylu display, akcent viridian jako cienka linia.
- JSON-LD w layout: `ProfessionalService` (name, url, email, priceRange "500-750 PLN", areaServed PL) + `WebSite`.
- Przejrzyj metadata (title/description spójne z site.ts), sprawdź `robots.ts`/`sitemap.ts`.
- **Akceptacja:** `curl localhost:3000` zawiera JSON-LD i og:image; walidacja typów buildem.

### Zadanie 12: pętla jakości (obowiązkowa, iteracyjna)
- chrome-devtools MCP: `resize_page` + `take_screenshot` pełnej strony (z wymuszonym `.is-visible`, jak w tym planie robiono) dla 390, 768, 1024, 1440. Porównaj każdą sekcję z opisami z sekcji 6; popraw rozjazdy.
- `emulate` reduced-motion i sprawdź brak animacji; emulacja touch: brak highlightu.
- Klawiatura: przejdź tabem całą stronę (snapshot a11y `take_snapshot`), sprawdź skip link, focus ringi, radiogroup strzałkami.
- `list_console_messages`: zero błędów i warningów.
- `lighthouse_audit` (mobile i desktop) na produkcyjnym buildzie (`npm run build && npm start`): wymagane Perf >= 95, A11y = 100, BP >= 95, SEO >= 95, CLS < 0.05, LCP < 2.0 s. Iteruj do skutku.
- **Akceptacja:** wszystkie progi spełnione, raport wklejony w podsumowaniu pracy.

### Zadanie 13 (opcjonalne): preview deploy
- Vercel MCP `deploy_to_vercel` (preview) i smoke-test na URL produkcyjnym.

---

## 10. Poprzeczka jakości (twarde kryteria końcowe)

- Lighthouse: Perf >= 95, Best Practices >= 95, SEO >= 95, **A11y = 100** (mobile i desktop, build produkcyjny).
- CWV: LCP < 2.0 s (LCP = tekst H1; fonty swap + preload przez next/font), CLS < 0.05 (stała wysokość panelu, tabular-nums w cenie, brak layout-shiftów nav), INP < 200 ms.
- WCAG AA: kontrast >= 4.5:1 wszędzie, także na szkle; pełna obsługa klawiatury; `prefers-reduced-motion` i `prefers-reduced-transparency` honorowane; landmarki i skip link.
- Responsywność zweryfikowana screenshotami na 390 / 768 / 1024 / 1440; brak poziomego scrolla na każdej szerokości.
- Zero em/en dash w widocznym tekście (grep po plikach: `grep -rn "—\|–" app components lib` ma zwrócić 0 trafień w stringach UI).
- Backdrop-filter na maks. 2 elementach; animacje wyłącznie transform/opacity; 60 fps przy przełączaniu wariantów (sprawdź performance trace przy wątpliwościach).
- Budżet JS: bez nowych zależności runtime (żadnych bibliotek animacji, ikon, UI).

---

## 11. MCP dostępne w wykonaniu (i do czego)

- **chrome-devtools** (kluczowy): pętla screenshotów po każdym zadaniu, `take_snapshot` (a11y), `emulate` (reduced-motion, touch), `list_console_messages`, `lighthouse_audit`, `performance_start/stop_trace` przy weryfikacji 60 fps.
- **context7**: doczytanie API Tailwind v4 (`@theme`, container queries) i niuansów Next 16, jeśli lokalne docs nie wystarczą (najpierw ZAWSZE `node_modules/next/dist/docs/`).
- **vercel**: preview deploy (zadanie 13), ewentualnie `search_vercel_documentation`.
- **playwright**: zamiennik chrome-devtools, gdyby MCP przeglądarki miał konflikt profilu (zdarzył się podczas reconu; rozwiązanie: `pkill -f "chrome-devtools-mcp/chrome-profile"`).
- **shadcn / magic (21st.dev)**: NIE używać do generowania komponentów (wszystko custom wg tego planu); magic co najwyżej jako inspiracja, bez kopiowania.
- **figma / canva / gmail / stripe / supabase**: nieprzydatne w tym projekcie, pominąć.
