/**
 * Projekt pokazowy: Kancelaria Reda (radca prawny).
 * Pełna mini-strona projektowana na powierzchni 720x900, osadzana w
 * MiniSiteFrame. Typografia szeryfowa (systemowa Georgia), mikro-paleta lokalna.
 */

const c = {
  bg: "#f4f2ec",
  ink: "#1c2430",
  soft: "#6b7280",
  accent: "#8a6d3b",
};

export function MiniKancelaria() {
  return (
    <div
      style={{
        width: 720,
        height: 900,
        background: c.bg,
        color: c.ink,
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Pasek marki */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderBottom: `1px solid ${c.ink}22`,
          margin: "0 40px",
          padding: "22px 0 14px",
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 600 }}>Kancelaria Reda</span>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 12.5,
            color: c.soft,
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>Zakres</span>
          <span>Zespół</span>
          <span>Kontakt</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "44px 40px 0", maxWidth: 480 }}>
        <div style={{ fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.01em" }}>
          Spokój w sprawach spornych.
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 14.5,
            color: c.soft,
            fontFamily: "var(--font-sans)",
          }}
        >
          Radca prawny dla firm i osób prywatnych. Toruń, Rynek Staromiejski 4.
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 22,
            fontSize: 13.5,
            fontWeight: 500,
            fontFamily: "var(--font-sans)",
            color: c.bg,
            background: c.ink,
            padding: "10px 22px",
          }}
        >
          Umów konsultację
        </div>
      </div>

      {/* Zakres spraw */}
      <div
        style={{
          margin: "48px 40px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 28,
          fontFamily: "var(--font-sans)",
        }}
      >
        {[
          ["Prawo gospodarcze", "Obsługa spółek i sporów między wspólnikami."],
          ["Spory sądowe", "Reprezentacja przed sądami wszystkich instancji."],
          ["Umowy", "Konstrukcja i negocjacje umów handlowych."],
        ].map(([name, desc]) => (
          <div
            key={name}
            style={{ borderTop: `2px solid ${c.accent}`, paddingTop: 12 }}
          >
            <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
            <div
              style={{ marginTop: 5, fontSize: 12, lineHeight: 1.5, color: c.soft }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* O kancelarii */}
      <div style={{ margin: "44px 40px 0", maxWidth: 520 }}>
        <div style={{ fontSize: 22, lineHeight: 1.35 }}>
          „Prowadzę sprawę tak, jakby była moja własna. Bez prawniczego żargonu,
          za to z jasnym planem na każdym etapie."
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 13,
            color: c.soft,
            fontFamily: "var(--font-sans)",
          }}
        >
          Anna Reda, radca prawny. Wpis na listę OIRP w Toruniu.
        </div>
      </div>

      {/* Stopka */}
      <div
        style={{
          marginTop: "auto",
          borderTop: `1px solid ${c.ink}22`,
          margin: "0 40px",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
          color: c.soft,
          fontFamily: "var(--font-sans)",
        }}
      >
        <span>kancelaria-reda.pl</span>
        <span>56 640 20 10</span>
        <span>Pon-Pt 8-17</span>
      </div>
    </div>
  );
}
