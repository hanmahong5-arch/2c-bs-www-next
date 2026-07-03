import { updates } from "../updates-data";

// changelog RSS 2.0 feed — 内容真源 updates-data.ts（与 /blog 页同源）。
// 静态生成：随构建产出一次，条目变更走重新部署。
export const dynamic = "force-static";

const SITE = "https://www.lurus.cn";
const FEED_URL = `${SITE}/blog/rss.xml`;
const BLOG_URL = `${SITE}/blog`;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "YYYY-MM" → RFC-822 pubDate（该月 1 号）。月粒度是 changelog 的真实精度。
function pubDate(ym: string): string {
  return new Date(`${ym}-01T08:00:00+08:00`).toUTCString();
}

export function GET(): Response {
  const items = updates
    .map((u, i) => {
      const cats = u.tags.map((t) => `<category>${esc(t)}</category>`).join("");
      return `    <item>
      <title>${esc(u.title)}</title>
      <link>${BLOG_URL}</link>
      <guid isPermaLink="false">lurus-changelog-${u.date}-${i}</guid>
      <pubDate>${pubDate(u.date)}</pubDate>
      <description>${esc(u.desc)}</description>
      ${cats}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LurusTech 更新日志</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>Lurus 产品更新日志 — 新功能、改进和修复。</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
