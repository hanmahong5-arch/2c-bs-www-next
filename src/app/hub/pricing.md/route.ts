import { renderHubPricingMarkdown } from "@/lib/hub-pricing-md";

// /hub/pricing 的纯文本孪生。采购与模型读这一份，数字仍来自 Hub 公开价目。
export const revalidate = 300;

export async function GET() {
  const body = await renderHubPricingMarkdown();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
