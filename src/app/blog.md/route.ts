import { renderBlogMarkdown } from "@/lib/blog-md";

// /blog 的纯文本孪生。条目仍是 updates-data.ts 的原文。
export const dynamic = "force-static";

export function GET() {
  const body = renderBlogMarkdown();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
