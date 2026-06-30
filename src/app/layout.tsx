import type { Metadata } from "next";
import {
  Fraunces,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";

// 仅自托管 Latin 主字体；中文走系统 CJK 字体回退（见 globals.css 字体栈）。
// 原 Noto Sans/Serif SC webfont 用 subsets:["latin"] 加载——不含中文字形（中文本就
// 回退系统字体），却带来 ~1MB woff2 拖垮首屏 LCP/FCP，故移除，中文渲染不变。
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://www.lurus.cn";
const SITE_DESC =
  "开箱即用的 AI 基础设施套件：LLM 网关 · 账户计费 · AI 记忆 · 智能路由。为企业 AI 转型提供全栈后端能力。";

export const metadata: Metadata = {
  title: {
    default: "LurusTech — 企业AI基础设施套件",
    template: "%s — LurusTech",
  },
  description: SITE_DESC,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "LurusTech",
    url: SITE_URL,
    // og:image 由 app/opengraph-image.tsx 动态注入
  },
  twitter: {
    card: "summary_large_image",
  },
};

// schema.org 结构化数据 — 让搜索引擎理解组织与站点，提升 rich results。
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "LurusTech",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description: SITE_DESC,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "LurusTech",
      url: SITE_URL,
      inLanguage: "zh-CN",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
