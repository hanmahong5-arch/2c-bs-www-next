import { renderApproachMarkdown } from "@/lib/approach-md";

// /approach 的纯文本孪生。首信与交付分界仍用同一套字符串。
export const revalidate = 300;

export function GET() {
  const body = renderApproachMarkdown();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
