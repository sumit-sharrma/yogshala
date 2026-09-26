import { ImageResponse } from "next/og";

export const alt = "Yog Shala — Move Better. Feel Better. Live Better.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#1c3d33",
          padding: 64,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" style={{ marginBottom: 40 }}>
          <circle cx="32" cy="17" r="4.5" fill="#b85c38" />
          <g stroke="#faf8f4" stroke-width="5.5" stroke-linecap="round" fill="none">
            <path d="M45 20 L32 36 L19 20" />
            <path d="M32 36 V48" />
          </g>
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#faf8f4",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: "-1px" }}>Yog Shala</div>
          <div style={{ fontSize: 32, color: "#c96f4b", marginTop: 8 }}>Move Better. Feel Better. Live Better.</div>
          <div style={{ fontSize: 24, color: "#9fb0a7", marginTop: 28, maxWidth: 760 }}>
            Personalized posture assessment and movement care, tailored to your body and goals.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}