import { NextResponse } from "next/server";
import { sendMail, escapeHtml, formatTimestamp } from "@/lib/mailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Uzupełnij imię, e-mail i wiadomość." },
      { status: 400 }
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail." },
      { status: 400 }
    );
  }

  const timestamp = formatTimestamp();
  const subject = `Nowa wiadomość z formularza kontaktowego: ${name}`;

  const text = [
    "Nowa wiadomość z formularza kontaktowego (Zentiq)",
    `Data i godzina: ${timestamp}`,
    "",
    `Imię: ${name}`,
    `E-mail: ${email}`,
    "",
    "Wiadomość:",
    message,
  ].join("\n");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1d1d1f;">
    <h2 style="margin:0 0 4px;font-size:20px;">Nowa wiadomość kontaktowa</h2>
    <p style="margin:0 0 20px;color:#6e6e73;font-size:13px;">${escapeHtml(timestamp)}</p>
    <table style="border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 14px 6px 0;color:#6e6e73;">Imię</td><td style="padding:6px 0;font-weight:500;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#6e6e73;">E-mail</td><td style="padding:6px 0;font-weight:500;">${escapeHtml(email)}</td></tr>
    </table>
    <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#0071e3;margin:22px 0 6px;">Wiadomość</h3>
    <p style="font-size:14px;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
  </div>`;

  try {
    await sendMail({ subject, html, text, replyTo: email });
  } catch (err) {
    console.error("[kontakt] Błąd wysyłki e-mail:", err);
    return NextResponse.json(
      {
        error:
          "Nie udało się teraz wysłać wiadomości. Spróbuj ponownie za chwilę lub napisz na kontakt@zentiq.pl.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
