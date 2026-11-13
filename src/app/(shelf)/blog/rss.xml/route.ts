import { renderChangelogRss } from "@/lib/changelog-rss";

// changelog RSS 2.0。域名在 changelog-rss 里；公司站尚未对公网，feed 仍指向 www.lurus.cn。
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(renderChangelogRss(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
