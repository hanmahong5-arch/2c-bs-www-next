import { ImageResponse } from "next/og";

// 动态生成站点社交分享卡 — 替代此前引用却不存在的静态 /og-image.png (404)。
// 文案保持拉丁字形，避免在 ImageResponse 中加载中文字体的复杂度；品牌词为主体。
export const alt = "LurusTech — Enterprise AI Infrastructure Suite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F5F2E8";
const INK = "#14130F";
const ACCENT = "#FF5D1F";
const MUTED = "#6B6860";

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
          background: PAPER,
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        {/* 顶部 accent 标记条 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 14,
              background: ACCENT,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              marginLeft: 18,
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            AI Infrastructure
          </div>
        </div>

        {/* 品牌词 + 副标题 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              color: INK,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            LurusTech
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 42,
              color: "#3D3B33",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            LLM gateway · billing · memory · routing — ship AI in minutes, not
            months.
          </div>
        </div>

        {/* 底部 URL */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 40, height: 6, background: ACCENT, borderRadius: 3 }} />
          <div
            style={{
              marginLeft: 16,
              fontSize: 30,
              fontWeight: 600,
              color: INK,
            }}
          >
            www.lurus.cn
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
