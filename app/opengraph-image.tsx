import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zentiq. Najpierw zobacz. Potem zdecyduj.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfbf9",
          padding: "72px 84px 64px",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#151514",
            letterSpacing: "-0.02em",
          }}
        >
          Zentiq
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#151514",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Najpierw zobacz.
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#151514",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Potem zdecyduj.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 72, height: 5, background: "#0e5b43" }} />
          <div style={{ fontSize: 26, color: "#61615c" }}>
            Strony dla firm. Projekt zobaczysz przed zapłatą.
          </div>
        </div>
      </div>
    ),
    size
  );
}
