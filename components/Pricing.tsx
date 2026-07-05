"use client";

import { useEffect, useRef, useState } from "react";
import {
  Container,
  Button,
  Field,
  TextareaField,
  SuccessMessage,
} from "./ui";
import { Reveal } from "./Reveal";
import { calculatePrice, type PricingSelection } from "@/lib/pricing";

type Answers = PricingSelection;

const questions: {
  key: keyof Answers;
  label: string;
  hint: string;
}[] = [
  {
    key: "payments",
    label: "Czy strona wymaga integracji płatności online?",
    hint: "Np. przyjmowanie płatności kartą, BLIK, szybkie przelewy.",
  },
  {
    key: "panel",
    label: "Czy projekt wymaga indywidualnego panelu klienta lub użytkownika?",
    hint: "Logowanie, konta użytkowników, indywidualny dostęp do treści.",
  },
  {
    key: "reviews",
    label: "Czy chcesz prezentować opinie klientów na stronie?",
    hint: "Sekcja z referencjami i recenzjami budująca zaufanie.",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

/** Tween liczby (350 ms, ease-out); przy reduced-motion skok bez animacji. */
function useAnimatedNumber(target: number): number {
  const [display, setDisplay] = useState(target);
  const current = useRef(target);
  const rafId = useRef(0);

  useEffect(() => {
    if (current.current === target) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      current.current = target;
      setDisplay(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    const dur = 350;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (target - from) * eased);
      current.current = value;
      setDisplay(value);
      if (t < 1) rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [target]);

  return display;
}

export function Pricing() {
  const [answers, setAnswers] = useState<Answers>({
    payments: false,
    panel: false,
    reviews: false,
  });
  const [idea, setIdea] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const price = calculatePrice(answers);
  const displayPrice = useAnimatedNumber(price);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/wycena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, answers, idea, price }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nie udało się wysłać wyceny.");
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
    <section id="cennik" className="section">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <h2 className="type-h2 text-ink">Cena bez niespodzianek.</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="type-lead mt-6 text-ink-2">
              Trzy pytania i widzisz koszt od razu. Nigdy więcej niż 750 zł.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Pytania */}
          <Reveal delay={120}>
            <div>
              {questions.map((q) => (
                <div
                  key={q.key}
                  className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="sm:pr-6">
                    <p className="text-base font-medium text-ink">{q.label}</p>
                    <p className="mt-1 text-sm text-ink-2">{q.hint}</p>
                  </div>
                  <ToggleYesNo
                    label={q.label}
                    value={answers[q.key]}
                    onChange={(v) =>
                      setAnswers((prev) => ({ ...prev, [q.key]: v }))
                    }
                  />
                </div>
              ))}

              <div className="border-t border-line pt-8">
                <TextareaField
                  id="idea"
                  label="Masz inny pomysł? Opisz go."
                  value={idea}
                  onChange={setIdea}
                  rows={3}
                  placeholder="Napisz, czego potrzebuje twoja firma."
                />
              </div>
            </div>
          </Reveal>

          {/* Podsumowanie na zywo */}
          <Reveal delay={180} className="self-start lg:sticky lg:top-24">
            <aside className="rounded-[20px] bg-field p-7 sm:p-8">
              <p className="text-sm font-medium text-ink-2">Wycena wstępna</p>
              <p aria-hidden className="type-price mt-3 text-ink">
                {displayPrice} zł
              </p>
              <p className="sr-only" aria-live="polite">
                Szacunkowy koszt: {price} zł
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">
                Projekt i wycena są darmowe. Górna granica to 750 zł.
              </p>

              {status === "success" ? (
                <div className="mt-6 rounded-2xl bg-paper px-4">
                  <SuccessMessage
                    title="Dziękujemy!"
                    description="Projekt wyślemy zwykle w 24 godziny."
                  />
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => setFormOpen((v) => !v)}
                    aria-expanded={formOpen}
                    aria-controls="formularz-wyceny"
                    className="mt-6 w-full"
                  >
                    Zamów darmowy projekt
                  </Button>

                  <div
                    id="formularz-wyceny"
                    inert={formOpen ? undefined : true}
                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: formOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                        <Field
                          id="q-name"
                          label="Imię"
                          value={form.name}
                          onChange={(v) =>
                            setForm((f) => ({ ...f, name: v }))
                          }
                          required
                          autoComplete="given-name"
                        />
                        <Field
                          id="q-phone"
                          label="Numer telefonu"
                          type="tel"
                          value={form.phone}
                          onChange={(v) =>
                            setForm((f) => ({ ...f, phone: v }))
                          }
                          required
                          autoComplete="tel"
                        />
                        <Field
                          id="q-email"
                          label="Adres e-mail"
                          type="email"
                          value={form.email}
                          onChange={(v) =>
                            setForm((f) => ({ ...f, email: v }))
                          }
                          required
                          autoComplete="email"
                        />
                        <Field
                          id="q-company"
                          label="Nazwa firmy"
                          value={form.company}
                          onChange={(v) =>
                            setForm((f) => ({ ...f, company: v }))
                          }
                          autoComplete="organization"
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
                          className="w-full"
                        >
                          {status === "sending"
                            ? "Wysyłanie..."
                            : "Wyślij zapytanie"}
                        </Button>

                        <p className="text-center text-xs leading-relaxed text-ink-2">
                          Przesłanie formularza nie zobowiązuje do zakupu
                          strony. Wysyłając je, akceptujesz{" "}
                          <a
                            href="/polityka-prywatnosci"
                            className="underline underline-offset-2 hover:text-ink"
                          >
                            Politykę prywatności
                          </a>
                          .
                        </p>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ToggleYesNo({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      return;
    }
    e.preventDefault();
    const group = e.currentTarget;
    onChange(!value);
    requestAnimationFrame(() => {
      group
        .querySelector<HTMLElement>('[role="radio"][aria-checked="true"]')
        ?.focus();
    });
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="flex w-full shrink-0 rounded-full bg-field p-1 sm:inline-flex sm:w-auto"
    >
      {[
        { label: "Tak", v: true },
        { label: "Nie", v: false },
      ].map((opt) => {
        const active = value === opt.v;
        return (
          <button
            key={opt.label}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.v)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 sm:flex-none sm:min-w-[64px] ${
              active
                ? "bg-paper text-ink ring-1 ring-line"
                : "text-ink-2 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
