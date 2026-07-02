import type { ComponentProps, ReactNode } from "react";

/** Centralny kontener: 1200 px, marginesy boczne 24/32 px. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/50 hover:bg-ink/5",
};

// Kółeczko strzałki (nested "button-in-button"): tło zależne od wariantu,
// strzałka przejmuje currentColor, kinetyka po najechaniu na .group.
const arrowCircle: Record<ButtonVariant, string> = {
  primary: "bg-white/20",
  secondary: "bg-ink/8",
};

const baseButton =
  "group inline-flex items-center justify-center gap-2 rounded-full text-base font-medium transition-[background-color,box-shadow,transform] duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

function Arrow({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      aria-hidden
      className={`ml-1 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 ${arrowCircle[variant]}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Wewnętrzne odstępy zależą od tego, czy CTA ma kółeczko strzałki. */
function pad(withArrow: boolean) {
  return withArrow ? "py-2 pl-7 pr-2.5" : "px-7 py-3";
}

/** Przycisk-link (kotwica / nawigacja). */
export function ButtonLink({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: {
  variant?: ButtonVariant;
  withArrow?: boolean;
} & ComponentProps<"a">) {
  return (
    <a
      className={`${baseButton} ${pad(withArrow)} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && <Arrow variant={variant} />}
    </a>
  );
}

/** Przycisk akcji (formularze). */
export function Button({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: {
  variant?: ButtonVariant;
  withArrow?: boolean;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${baseButton} ${pad(withArrow)} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && <Arrow variant={variant} />}
    </button>
  );
}

const inputBase =
  "mt-2 w-full rounded-xl border border-line bg-field px-4 py-3 text-base text-ink outline-none transition-colors duration-150 placeholder:text-ink-2/70 focus:border-accent focus:bg-paper";

/** Pole formularza: etykieta nad inputem. */
export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-ink-2">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className={inputBase}
      />
    </div>
  );
}

/** Pole tekstowe wieloliniowe: etykieta nad polem. */
export function TextareaField({
  id,
  label,
  value,
  onChange,
  rows = 4,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-ink-2">
            {" "}
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={`${inputBase} resize-none`}
      />
    </div>
  );
}

/** Komunikat sukcesu po wysyłce formularza. */
export function SuccessMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="type-h3 mt-5 text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-base leading-relaxed text-ink-2">
        {description}
      </p>
    </div>
  );
}
