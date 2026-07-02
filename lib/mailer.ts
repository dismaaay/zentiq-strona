import nodemailer from "nodemailer";

/**
 * Konfiguracja wysyłki e-mail przez SMTP (domyślnie Gmail).
 *
 * Wymagane zmienne środowiskowe (plik .env.local):
 *   MAIL_USER  - login SMTP (np. kontakt@zentiq.pl)
 *   MAIL_PASS  - hasło aplikacji (Gmail: „Hasła aplikacji", NIE zwykłe hasło)
 * Opcjonalne:
 *   MAIL_TO    - adres odbiorcy (domyślnie kontakt@zentiq.pl)
 *   MAIL_FROM  - adres nadawcy (domyślnie = MAIL_USER)
 *   SMTP_HOST  - host SMTP (domyślnie smtp.gmail.com)
 *   SMTP_PORT  - port SMTP (domyślnie 465)
 */

const MAIL_TO = process.env.MAIL_TO || "kontakt@zentiq.pl";

export function getRecipient(): string {
  return MAIL_TO;
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.MAIL_USER && process.env.MAIL_PASS);
}

function createTransport() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

/** Wysyła wiadomość e-mail. Rzuca błąd, gdy usługa nie jest skonfigurowana. */
export async function sendMail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!isMailConfigured()) {
    throw new Error(
      "Usługa e-mail nie jest skonfigurowana. Ustaw MAIL_USER i MAIL_PASS w pliku .env.local"
    );
  }

  const transporter = createTransport();
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: MAIL_TO,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

/** Escapuje znaki HTML, aby dane od użytkownika nie łamały treści maila. */
export function escapeHtml(input: string): string {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Sformatowana data/godzina w strefie Polski - do treści maila. */
export function formatTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(date);
}
