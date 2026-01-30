import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tech Blog - Tech Insights & Stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
          }}
        >
          Tech Blog
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
          }}
        >
          Tech Insights & Stories
        </div>
      </div>
    ),
    { ...size }
  );
}
