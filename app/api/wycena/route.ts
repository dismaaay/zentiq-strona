import { NextResponse } from "next/server";
import {
  sendMail,
  escapeHtml,
  formatTimestamp,
  getRecipient,
} from "@/lib/mailer";
import { calculatePrice, type PricingSelection } from "@/lib/pricing";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  idea?: string;
  answers?: Partial<PricingSelection>;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const company = (body.company || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const idea = (body.idea || "").trim();

  // Podstawowa walidacja pól wymaganych.
  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Uzupełnij imię, numer telefonu i adres e-mail." },
      { status: 400 }
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail." },
      { status: 400 }
    );
  }

  // Odczyt wyborów (serwerowo, aby cena była wiarygodna).
  const answers: PricingSelection = {
    payments: Boolean(body.answers?.payments),
    panel: Boolean(body.answers?.panel),
    reviews: Boolean(body.answers?.reviews),
  };
  const price = calculatePrice(answers);
  const timestamp = formatTimestamp();
  const yn = (v: boolean) => (v ? "Tak" : "Nie");

  const subject = `Nowa wycena: ${name}${company ? ` (${company})` : ""}, ${price} zł`;

  const text = [
    "Nowe zapytanie o wycenę ze strony Zentiq",
    `Data i godzina: ${timestamp}`,
    "",
    "Dane klienta",
    `Imię: ${name}`,
    `Nazwa firmy: ${company || "(brak)"}`,
    `Telefon: ${phone}`,
    `E-mail: ${email}`,
    "",
    "Wybrane opcje",
    `Integracja płatności online: ${yn(answers.payments)}`,
    `Indywidualny panel klienta/użytkownika: ${yn(answers.panel)}`,
    `Sekcja opinii klientów: ${yn(answers.reviews)}`,
    "",
    "Własny pomysł",
    idea || "(brak)",
    "",
    `Szacunkowy koszt: ${price} zł`,
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#6e6e73;">${label}</td><td style="padding:6px 0;color:#1d1d1f;font-weight:500;">${value}</td></tr>`;

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1d1d1f;">
    <h2 style="margin:0 0 4px;font-size:20px;">Nowe zapytanie o wycenę</h2>
    <p style="margin:0 0 20px;color:#6e6e73;font-size:13px;">${escapeHtml(timestamp)}</p>

    <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#0071e3;margin:18px 0 6px;">Dane klienta</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Imię", escapeHtml(name))}
      ${row("Nazwa firmy", escapeHtml(company) || "(brak)")}
      ${row("Telefon", escapeHtml(phone))}
      ${row("E-mail", escapeHtml(email))}
    </table>

    <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#0071e3;margin:22px 0 6px;">Wybrane opcje</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Integracja płatności online", yn(answers.payments))}
      ${row("Indywidualny panel klienta/użytkownika", yn(answers.panel))}
      ${row("Sekcja opinii klientów", yn(answers.reviews))}
    </table>

    <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#0071e3;margin:22px 0 6px;">Własny pomysł</h3>
    <p style="font-size:14px;margin:0;white-space:pre-wrap;">${idea ? escapeHtml(idea) : "<span style='color:#6e6e73;'>(brak)</span>"}</p>

    <div style="margin-top:24px;padding:16px 20px;background:#f5f5f7;border-radius:14px;">
      <span style="color:#6e6e73;font-size:13px;">Szacunkowy koszt realizacji</span><br/>
      <strong style="font-size:28px;">${price} zł</strong>
    </div>
  </div>`;

  try {
    await sendMail({ subject, html, text, replyTo: email });
  } catch (err) {
    console.error("[wycena] Błąd wysyłki e-mail:", err);
    console.error(
      `[wycena] Docelowy odbiorca: ${getRecipient()}. Sprawdź konfigurację MAIL_USER/MAIL_PASS.`
    );
    return NextResponse.json(
      {
        error:
          "Nie udało się teraz wysłać wyceny. Spróbuj ponownie za chwilę lub napisz na zentiq.kontakt@gmail.com.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, price });
}
