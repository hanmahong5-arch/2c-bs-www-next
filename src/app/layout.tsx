import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";

// 暗色模式先于 hydration 应用，避免浅色→深色的闪烁（FOUC）。
// 读取失败（隐私模式等）时静默回退浅色，不影响页面渲染。
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

// Latin 主字体打进仓库（src/fonts，可变字体的 latin 子集），构建期不再请求
// fonts.googleapis.com。Google 有时返回无扩展名的 /l/font?kit=…&skey=… URL，
// Next 16.2 的 next/font/google 会在 Turbopack 里把 `&` 拆成多条 query，
// 报 “queries have exactly one entry” 并让 CI build 失败。中文仍走系统 CJK
// 回退（见 globals.css）。字重范围与原先 next/font/google 的声明一致。
const fraunces = localFont({
  src: "../fonts/fraunces-latin.woff2",
  variable: "--font-fraunces",
  weight: "500 600",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const interTight = localFont({
  src: "../fonts/inter-tight-latin.woff2",
  variable: "--font-inter-tight",
  weight: "400 600",
  display: "swap",
  adjustFontFallback: "Arial",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  weight: "400 500",
  display: "swap",
  adjustFontFallback: "Arial",
});

const SITE_URL = "https://www.lurus.cn";
const SITE_DESC =
  "在客户自有环境里受托运维已经跑起来的 AI 系统：真的恢复一次才算可恢复，每月一份报告，每个数字附测量方式。系统留在客户自己的服务器上。";

export const metadata: Metadata = {
  title: {
    default: "LurusTech — 企业 AI 受托运维",
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

// 显式声明 viewport（Next 的 metadata/viewport 已分家；此处写的正是 Next 的默认
// 值，落地 meta 与改动前逐字符相同 —— 显式化是为了把它变成可 review 的约定，
// 而不是靠框架默认值“碰巧对”）。
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// schema.org 结构化数据 — 让搜索引擎与 AI 检索理解组织/站点/核心产品实体图谱。
// 字段取自共享简报的产品表与 footer 备案实体，不含 offers/评分/可用性；只列上主导航的构件中需要结构化声明的条目。
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
      "@id": `${SITE_URL}/kova#app`,
      name: "Kova",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux",
      url: `${SITE_URL}/kova`,
      description:
        "嵌入式持久执行引擎：WAL 崩溃恢复、执行留痕、可回放。成熟度：早期试点。",
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
      suppressHydrationWarning
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* reducedMotion="user" 让全站 framer-motion 动画（含 repeat:Infinity 的呼吸/漂移效果）
            自动尊重系统"减弱动态效果"偏好，无需逐组件改造。 */}
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CommandPalette />
        </MotionConfig>
      </body>
    </html>
  );
}
