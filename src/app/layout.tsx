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

// schema.org 结构化数据 — 让搜索引擎与 AI 检索理解组织/站点/核心产品实体图谱。
// 字段全部取自已验证真源（products.ts / footer 备案实体），不含臆造 offers/评分/可用性。
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "LurusTech",
      legalName: "硅知睿智能科技（烟台）有限公司",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description: SITE_DESC,
      sameAs: ["https://github.com/hanmahong5-arch"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "LurusTech",
      url: SITE_URL,
      inLanguage: "zh-CN",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/platform#lugo`,
      name: "Lugo",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web, API",
      url: `${SITE_URL}/platform`,
      description:
        "企业 AI 基础设施平台：OpenAI 兼容 LLM 网关（30+ 模型智能路由）+ 账户认证（OIDC/RBAC/多租户）+ 计费钱包 + AI 记忆（向量检索，REST/MCP）+ 多通道通知。",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/kova#app`,
      name: "Kova",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, Web",
      url: `${SITE_URL}/kova`,
      description:
        "AI Agent 执行引擎：WAL 持久化崩溃恢复、DAG 拓扑调度、gRPC/REST/MCP 多协议、单二进制嵌入式部署。",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/lucrum#app`,
      name: "Lucrum",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}/lucrum`,
      description:
        "AI 量化交易：自然语言生成策略、历史回测、实盘执行、策略市场。",
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
