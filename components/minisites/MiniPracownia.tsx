/**
 * Projekt pokazowy: Pracownia Forma (meble na wymiar).
 * Pełna mini-strona projektowana na powierzchni 720x900, osadzana w
 * MiniSiteFrame. Układ kafelkowy, mikro-paleta lokalna.
 */

const c = {
  bg: "#f5f4f0",
  ink: "#26261f",
  soft: "#7a786e",
  accent: "#8c6a3f",
  tile: "#ecebe4",
};

export function MiniPracownia() {
  return (
    <div
      style={{
        width: 720,
        height: 900,
        background: c.bg,
        color: c.ink,
        fontFamily: "var(--font-sans)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Pasek marki */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 36px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Forma
        </span>
        <div style={{ display: "flex", gap: 22, fontSize: 12.5, color: c.soft }}>
          <span>Realizacje</span>
          <span>O pracowni</span>
          <span>Kontakt</span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "40px 36px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            maxWidth: 400,
          }}
        >
          Meble na wymiar, na lata.
        </div>
        <div
          style={{ fontSize: 13.5, color: c.soft, maxWidth: 200, lineHeight: 1.5 }}
        >
          Stolarnia w Wołominie. Dąb, jesion, orzech amerykański.
        </div>
      </div>

      {/* Kafle oferty */}
      <div
        style={{
          margin: "32px 36px 0",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr",
          gap: 14,
        }}
      >
        {[
          ["Kuchnie", "od 12 000 zł", c.accent, "#fff"],
          ["Zabudowy", "od 6 500 zł", c.tile, c.ink],
          ["Stoły dębowe", "od 4 200 zł", c.tile, c.ink],
        ].map(([name, price, bg, fg]) => (
          <div
            key={name}
            style={{
              background: bg,
              color: fg,
              borderRadius: 12,
              padding: "18px 18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600 }}>{name}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                opacity: 0.85,
              }}
            >
              {price}
            </span>
          </div>
        ))}
      </div>

      {/* Jak pracujemy */}
      <div style={{ padding: "40px 36px 0" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: c.soft,
          }}
        >
          Jak pracujemy
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}
        >
          {[
            ["Pomiar", "Przyjeżdżamy i mierzymy przestrzeń u ciebie."],
            ["Projekt", "Rysujemy bryłę i dobieramy drewno."],
            ["Montaż", "Składamy gotowe meble na miejscu."],
          ].map(([name, desc]) => (
            <div key={name}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: c.accent,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: c.soft,
                }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stopka */}
      <div
        style={{
          marginTop: "auto",
          background: c.ink,
          color: c.bg,
          padding: "22px 36px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
        }}
      >
        <span>pracowniaforma.pl</span>
        <span>Wołomin, Kolejowa 7</span>
        <span>601 240 880</span>
      </div>
    </div>
  );
}
