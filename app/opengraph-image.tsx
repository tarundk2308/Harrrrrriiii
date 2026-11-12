import { ImageResponse } from "next/og";

export const alt = "Betrothal of Hariharan Agilan & Sharon Belinda Benedict · 4 December 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDF6F4",
          color: "#4A2332",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 8, color: "#7A2E3F" }}>
          BETROTHAL
        </div>
        <div style={{ display: "flex", fontSize: 46, marginTop: 20, lineHeight: 1.05, textAlign: "center" }}>
          Hariharan & Sharon
        </div>
        <div style={{ display: "flex", fontSize: 22, marginTop: 28, letterSpacing: 4, color: "#6D4A56" }}>
          4 DECEMBER 2026 · CHENNAI
        </div>
      </div>
    ),
    { ...size }
  );
}
