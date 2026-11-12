import { ImageResponse } from "next/og";

export const alt = "Hariharan aka Victor and Sharon — engagement, 4 December 2026, Chennai";
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
          background: "#F3EEE6",
          color: "#231C16",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 7, color: "#7C3040" }}>
          ENGAGEMENT
        </div>
        <div style={{ display: "flex", fontSize: 64, marginTop: 18, lineHeight: 1.05 }}>
          Hariharan aka Victor
        </div>
        <div style={{ display: "flex", fontSize: 42, color: "#7C3040", marginTop: 4, marginBottom: 4 }}>
          &
        </div>
        <div style={{ display: "flex", fontSize: 86, lineHeight: 1 }}>Sharon</div>
        <div
          style={{
            display: "flex",
            width: 72,
            height: 1,
            background: "#A68456",
            marginTop: 26,
            marginBottom: 22,
          }}
        />
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 1 }}>
          Friday, 4 December 2026 · 7:30 pm · Chennai
        </div>
        <div style={{ display: "flex", fontSize: 22, marginTop: 18, color: "#5C5148" }}>
          Under the blessing of godfather Sivaramakrishnan
        </div>
      </div>
    ),
    { ...size }
  );
}
