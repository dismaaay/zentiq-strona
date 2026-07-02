# Zentiq — strona internetowa

Nowoczesna, jednostronicowa witryna firmy **Zentiq** (tworzenie stron dla małych
i średnich firm). Zbudowana w estetyce inspirowanej Apple.com: minimalistyczna,
jasna, z płynnymi animacjami i pełną responsywnością.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Nodemailer.

## Sekcje

- **Hero** — slogan „Najpierw zobacz. Potem zdecyduj." + 3 przewagi
- **O nas** — historia, filozofia „zero ryzyka", porównanie cen
- **Cennik** — interaktywny kalkulator wyceny + formularz (wysyłka e-mail)
- **Realizacje** — karty projektów (łatwe do podmiany)
- **Kontakt** — dane + formularz kontaktowy (wysyłka e-mail)

## Uruchomienie

```bash
npm run dev          # tryb deweloperski -> http://localhost:3000
npm run build && npm start   # produkcja
```

## Konfiguracja e-mail (wymagana do działania formularzy)

Formularze wyceny i kontaktu wysyłają wiadomości na `zentiq.kontakt@gmail.com`.
Każde zgłoszenie to osobny e-mail z datą, godziną i zaznaczonymi opcjami.

1. Skopiuj `.env.local.example` do `.env.local`.
2. Uzupełnij `MAIL_USER` i `MAIL_PASS`.
   - Dla Gmaila: włącz weryfikację dwuetapową i wygeneruj **Hasło aplikacji**
     (https://myaccount.google.com/apppasswords) — to ono trafia do `MAIL_PASS`.
3. Zrestartuj serwer.

Bez konfiguracji strona działa, ale wysyłka formularza zwróci komunikat o błędzie.

## Gdzie co zmienić

| Co | Plik |
| --- | --- |
| Dane kontaktowe, nawigacja, SEO | `lib/site.ts` |
| Realizacje (karty projektów) | `lib/projects.ts` |
| Logika i ceny kalkulatora | `lib/pricing.ts` |
| Kolory / typografia / animacje | `app/globals.css` |
| Adres odbiorcy maili i SMTP | `.env.local` |

### Podmiana realizacji

W `lib/projects.ts` edytuj tablicę `projects`. Dodaj `image: "/realizacje/nazwa.jpg"`
(plik w folderze `public/`), aby użyć własnego zrzutu ekranu — w przeciwnym razie
karta pokaże elegancki placeholder z gradientem.

## Logika cennika

Cena bazowa **500 zł**; panel użytkownika **+200 zł**, płatności online **+50 zł**,
sekcja opinii **+50 zł**, własny pomysł **+0 zł**. Suma jest ograniczona do
**maksymalnie 750 zł** (wybór wszystkich opcji = 750 zł).
