import { navItems, siteConfig } from "@/lib/site";
import { Container } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container className="pb-12">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-lg font-semibold tracking-tight text-paper"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Zentiq
          </p>
          <nav aria-label="Stopka" className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-paper/60 transition-colors duration-150 hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-mono text-sm text-paper/60 transition-colors duration-150 hover:text-paper"
          >
            {siteConfig.contact.email}
          </a>
        </div>
        <p className="mt-8 text-xs text-paper/60">
          © {year} Zentiq. Wszelkie prawa zastrzeżone.
        </p>
      </Container>
    </footer>
  );
}
