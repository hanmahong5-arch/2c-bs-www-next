import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { CatalogRelation } from "@/components/catalog-relation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { siteProfile, type SiteProfile } from "@/lib/site-profile";

// 一个镜像两套面孔：SITE_PROFILE 在进程里读。静态生成会把个人站文案烤进镜像。
export const dynamic = "force-dynamic";

// 暗色模式先于 hydration 应用，避免浅色→深色的闪烁（FOUC）。
// 读取失败（隐私模式等）时静默回退浅色，不影响页面渲染。
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

// Latin 主字体自托管（src/fonts），中文走系统 CJK 回退（globals.css）。
// 不用 next/font/google：Google 偶发返回无扩展名的 /l/font?kit=…&skey=… URL，
// Turbopack 会在 & 处拆坏查询串，CI 报「queries have exactly one entry」(next#99114)。
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fraunces-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const interTight = localFont({
  src: [
    { path: "../fonts/inter-tight-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-tight-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-tight-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = siteProfile();
  return {
    title: {
      default: site.title,
      template: "%s — LurusTech",
    },
    description: site.description,
    metadataBase: new URL(site.siteUrl),
    // "./" 按当前路径解析。写死 "/" 会继承到每一页，首屏「下载与上手」打开的 /download 会被说成首页。
    alternates: { canonical: "./" },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "LurusTech",
      url: "./",
      // og:image 由 app/opengraph-image.tsx 动态注入
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

// 显式声明 viewport（Next 的 metadata/viewport 已分家；此处写的正是 Next 的默认
// 值，落地 meta 与改动前逐字符相同 —— 显式化是为了把它变成可 review 的约定，
// 而不是靠框架默认值“碰巧对”）。
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// schema.org 不含 offers/评分/可用性。个人站用 Person；公司站用 Organization。
function jsonLd(site: SiteProfile) {
  const publisherId =
    site.id === "company" ? `${site.siteUrl}/#organization` : `${site.siteUrl}/#person`;
  const publisher =
    site.id === "company"
      ? {
          "@type": "Organization",
          "@id": publisherId,
          name: site.legalName,
          alternateName: "LurusTech",
          url: site.siteUrl,
          description: site.description,
        }
      : {
          "@type": "Person",
          "@id": publisherId,
          name: "LurusTech",
          url: site.siteUrl,
          description: site.description,
          sameAs: ["https://github.com/hanmahong5-arch"],
        };
  const graph: Record<string, unknown>[] = [
    publisher,
    {
      "@type": "WebSite",
      "@id": `${site.siteUrl}/#website`,
      name: "LurusTech",
      url: site.siteUrl,
      inLanguage: "zh-CN",
      publisher: { "@id": publisherId },
    },
  ];
  graph.push({
    "@type": "SoftwareApplication",
    "@id": `${site.siteUrl}/kova#app`,
    name: "Kova",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux",
    url: `${site.siteUrl}/kova`,
    description: "嵌入式持久执行引擎：WAL 崩溃恢复、执行留痕、可回放。成熟度：早期试点。",
    publisher: { "@id": publisherId },
  });
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = siteProfile();
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(site)) }}
        />
        {/* reducedMotion="user" 让全站 framer-motion 动画（含 repeat:Infinity 的呼吸/漂移效果）
            自动尊重系统"减弱动态效果"偏好，无需逐组件改造。 */}
        <MotionConfig reducedMotion="user">
          <Header nav={site.nav} homeLabel={site.homeLabel} />
          <main className="flex-1">
            <CatalogRelation />
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </MotionConfig>
      </body>
    </html>
  );
}
