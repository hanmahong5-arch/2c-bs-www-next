import { readFileSync } from "node:fs";
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

test("pricing markdown states the same pay path as the page", () => {
  const md = pricingMarkdownFromRows(null);
  expect(md).toContain("## 怎么付");
  expect(md).toContain("登录后钱包充值，余额以人民币计");
  expect(md).toContain("用 API Key 调 hub.lurus.cn");
  expect(md).toContain("余额不足时请求会被拒绝，不会先欠费再催缴");
  expect(md).toContain("鹿途等归档客户端");
  expect(md).toContain("装进你自己的环境，先写信说明上游与网络约束");
  const page = readFileSync("src/app/hub/pricing/page.tsx", "utf8");
  expect(page).toContain("先写信到");
  expect(page).not.toContain("或写信");
  expect(md).toContain("最多晚 5 分钟反映改价");
  expect(md).not.toMatch(/\d+(?:\.\d+)?\s*[%％]/);
});

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
