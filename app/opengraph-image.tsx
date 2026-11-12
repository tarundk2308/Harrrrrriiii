import { ImageResponse } from "next/og";

export const alt = "Hariharan Agilan and Sharon Belinda Benedict — wedding, 28 January 2027, Chennai";
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
          WEDDING
        </div>
        <div style={{ display: "flex", fontSize: 52, marginTop: 18, lineHeight: 1.05, textAlign: "center" }}>
          Hariharan Agilan
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            color: "#7C3040",
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          &
        </div>
        <div style={{ display: "flex", fontSize: 48, lineHeight: 1.1, textAlign: "center" }}>
          Sharon Belinda Benedict
        </div>
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
          Thursday, 28 January 2027 · Chennai
        </div>
        <div style={{ display: "flex", fontSize: 20, marginTop: 18, color: "#5C5148" }}>
          Hindu · Nuptial Mass · Reception
        </div>
      </div>
    ),
    { ...size }
  );
}
