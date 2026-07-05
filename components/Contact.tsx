"use client";

import { useState } from "react";
import {
  Container,
  Button,
  Field,
  TextareaField,
  SuccessMessage,
} from "./ui";
import { Reveal } from "./Reveal";
import { siteConfig, isPlaceholder } from "@/lib/site";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const showPhone = !isPlaceholder(siteConfig.contact.phone);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nie udało się wysłać wiadomości.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Wystąpił nieoczekiwany błąd."
      );
    }
  }

  return (
    <section id="kontakt" className="section scroll-mt-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="type-h2 text-paper">Porozmawiajmy.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="type-lead mt-6 max-w-[34ch] text-paper/70">
                Napisz albo zadzwoń. Odpowiadamy konkretnie, zwykle tego samego
                dnia.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-12 space-y-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block break-all font-mono text-xl tracking-tight text-paper underline-offset-8 transition-colors duration-150 hover:text-white hover:underline sm:text-2xl"
                >
                  {siteConfig.contact.email}
                </a>
                {showPhone && (
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="block font-mono text-xl tracking-tight text-paper underline-offset-8 transition-colors duration-150 hover:text-white hover:underline sm:text-2xl"
                  >
                    {siteConfig.contact.phone}
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="rounded-[24px] bg-paper p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:p-8">
              {status === "success" ? (
                <SuccessMessage
                  title="Wiadomość wysłana!"
                  description="Dziękujemy za kontakt. Odezwiemy się najszybciej, jak to możliwe."
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field
                    id="c-name"
                    label="Imię"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    required
                    autoComplete="given-name"
                  />
                  <Field
                    id="c-email"
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    required
                    autoComplete="email"
                  />
                  <TextareaField
                    id="c-message"
                    label="Wiadomość"
                    value={form.message}
                    onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                    rows={5}
                    required
                  />

                  <div aria-live="polite">
                    {status === "error" && (
                      <p className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    withArrow={status !== "sending"}
                    className="w-full"
                  >
                    {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </Button>

                  <p className="text-xs leading-relaxed text-ink-2">
                    Wysyłając wiadomość, akceptujesz zasady przetwarzania danych
                    opisane w{" "}
                    <a
                      href="/polityka-prywatnosci"
                      className="underline underline-offset-2 hover:text-ink"
                    >
                      Polityce prywatności
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
