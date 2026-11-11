import { renderChangelogRss } from "@/lib/changelog-rss";

// changelog RSS 2.0 feed — 内容真源 updates-data.ts（与 /blog 页同源）。
// 静态生成：随构建产出一次，条目变更走重新部署。
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(renderChangelogRss(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
