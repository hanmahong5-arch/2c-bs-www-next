import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteProfile } from "@/lib/site-profile";

// 动态生成站点社交分享卡。文案保持拉丁字形，避免在 ImageResponse 中加载中文字体。
export const dynamic = "force-dynamic";
export const alt =
  "LurusTech. Evidence-graded status, a real restore when claiming recoverability, maturity labeled per component.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F5F2E8";
const INK = "#14130F";
const ACCENT = "#FF5D1F";
const MUTED = "#66635B";

export default async function OpengraphImage() {
  const company = siteProfile().id === "company";
  const mark = await readFile(path.join(process.cwd(), "public/images/brand/marks/crystal.png"));
  const markSrc = `data:image/png;base64,${Buffer.from(mark).toString("base64")}`;
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={markSrc} width={72} height={72} alt="" />
          <div
            style={{
              marginLeft: 18,
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {company ? "LurusTech" : "LURUS · URUS · RUS"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 120,
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
              marginTop: 18,
              fontSize: 28,
              color: ACCENT,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {company ? "Customer's own environment" : "Tools and the base underneath"}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 32,
              color: "#3D3B33",
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {company
              ? "Company site for AI tools and infrastructure: evidence-graded status, a real restore when claiming recoverability, maturity labeled."
              : "Personal workshop for AI tools and infrastructure: evidence-graded status, a real restore when claiming recoverability, maturity labeled."}
          </div>
        </div>

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
            {company ? "www.ailurus.top" : "www.lurus.cn"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
