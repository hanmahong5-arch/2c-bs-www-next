import { afterEach, expect, test } from "bun:test";
import type { HubModelRow } from "./hub-models";
import { pricingMarkdownFromRows, renderHubPricingMarkdown } from "./hub-pricing-md";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function xorPrice(md: string) {
  const hasTable = md.includes("| 模型 |");
  const unread = md.includes("暂时读不到");
  expect(hasTable).not.toBe(unread);
}

const row: HubModelRow = {
  id: "demo/small",
  vendor: "示例厂商",
  promptPerMTok: 2.5,
  completionPerMTok: 0.00123,
  perRequest: 0,
};

test("pricingMarkdownFromRows: null has no price table", () => {
  const md = pricingMarkdownFromRows(null);
  expect(md).toContain("暂时读不到");
  expect(md).toContain("不另存价格");
  expect(md).not.toContain("| 模型 |");
  expect(md).not.toContain("¥");
  xorPrice(md);
});

test("pricingMarkdownFromRows: empty list matches the unread page", () => {
  const md = pricingMarkdownFromRows([]);
  expect(md).toBe(pricingMarkdownFromRows(null));
  xorPrice(md);
});

test("pricingMarkdownFromRows: one row is a table and not the unread sentence", () => {
  const md = pricingMarkdownFromRows([row]);
  expect(md).toContain("| demo/small | 示例厂商 | ¥2.50 | ¥0.0012 | — |");
  expect(md).not.toContain("暂时读不到");
  expect(md).not.toContain("不另存价格");
  xorPrice(md);
});

test("renderHubPricingMarkdown reads this response and does not keep an old price", async () => {
  let requested = "";
  globalThis.fetch = async (input) => {
    requested = String(input);
    return new Response(
      JSON.stringify({
        data: [
          {
            id: "live/only",
            lurus: { vendor: "Live", prompt_cny_per_mtok: 2, completion_cny_per_mtok: 4 },
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  const md = await renderHubPricingMarkdown();
  expect(requested).toContain("/api/v1/models");
  expect(md).toContain("| live/only | Live | ¥2.00 | ¥4.00 | — |");
  expect(md).not.toContain("暂时读不到");
  expect(md).not.toContain("demo/small");
});

test("renderHubPricingMarkdown writes the unread sentence when fetch fails", async () => {
  globalThis.fetch = async () => {
    throw new Error("hub down");
  };

  const md = await renderHubPricingMarkdown();
  expect(md).toBe(pricingMarkdownFromRows(null));
  expect(md).not.toContain("| 模型 |");
});
