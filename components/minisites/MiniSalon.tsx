/**
 * Projekt pokazowy: Studio Halo (salon urody).
 * Pełna mini-strona projektowana na powierzchni 720x900, osadzana w
 * MiniSiteFrame. Kadr pokazuje górny fold, autoprzewijanie odsłania resztę.
 * Mikro-paleta lokalna, nie wchodzi do tokenów strony.
 */

const c = {
  bg: "#f6efea",
  ink: "#3e2a33",
  soft: "#8a7078",
  accent: "#a15c4b",
  card: "#fdf9f6",
};

export function MiniSalon() {
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
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: "-0.01em",
          }}
        >
          Studio Halo
        </span>
        <div style={{ display: "flex", gap: 20, fontSize: 12.5, color: c.soft }}>
          <span>Zabiegi</span>
          <span>Cennik</span>
          <span>Opinie</span>
          <span>Kontakt</span>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: c.card,
            background: c.ink,
            borderRadius: 999,
            padding: "7px 14px",
          }}
        >
          Zarezerwuj
        </span>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "34px 36px 0" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 46,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          Twoja skóra
          <br />
          <em>w najlepszej formie.</em>
        </div>
        <div style={{ marginTop: 14, fontSize: 14.5, color: c.soft }}>
          Kosmetologia estetyczna w centrum Gdyni.
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 20,
            fontSize: 13.5,
            fontWeight: 500,
            color: "#fff",
            background: c.accent,
            borderRadius: 999,
            padding: "10px 22px",
          }}
        >
          Zarezerwuj wizytę
        </div>
      </div>

      {/* Cennik zabiegów */}
      <div
        style={{
          margin: "32px 36px 0",
          background: c.card,
          borderRadius: 14,
          padding: "6px 22px",
        }}
      >
        {[
          ["Oczyszczanie wodorowe", "180 zł"],
          ["Masaż kobido", "220 zł"],
          ["Peeling migdałowy", "160 zł"],
        ].map(([name, price], i) => (
          <div
            key={name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderTop: i === 0 ? "none" : `1px solid ${c.bg}`,
              fontSize: 14,
            }}
          >
            <span>{name}</span>
            <span style={{ fontWeight: 600, color: c.accent }}>{price}</span>
          </div>
        ))}
      </div>

      {/* Opinie */}
      <div style={{ padding: "34px 36px 0" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: c.soft,
          }}
        >
          Opinie
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 14,
          }}
        >
          {[
            ["Wreszcie gabinet, do którego chce się wracać.", "Ola Z."],
            ["Cera jak nowa już po dwóch wizytach.", "Marta D."],
          ].map(([quote, author]) => (
            <div
              key={author}
              style={{ background: c.card, borderRadius: 14, padding: 18 }}
            >
              <div style={{ fontSize: 14.5, lineHeight: 1.45 }}>{quote}</div>
              <div style={{ marginTop: 12, fontSize: 12.5, color: c.soft }}>
                {author}
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
          color: c.card,
          padding: "22px 36px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
        }}
      >
        <span>Pon-Sob 9-19</span>
        <span>Gdynia, Świętojańska 12</span>
        <span>@studio.halo</span>
      </div>
    </div>
  );
}
