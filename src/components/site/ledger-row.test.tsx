import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { LedgerRow } from "./ledger-row";

test("LedgerRow is a hairline link with label, meta, and arrow", () => {
  const html = renderToStaticMarkup(
    <LedgerRow
      href="mailto:contact@lurus.cn?subject=%E5%8F%97%E6%89%98%E8%BF%90%E7%BB%B4%E5%92%A8%E8%AF%A2"
      label="写第一封邮件"
      meta="不报价，不收集密码"
    />,
  );

  expect(html.startsWith("<a ")).toBe(true);
  expect(html).toContain(
    'href="mailto:contact@lurus.cn?subject=%E5%8F%97%E6%89%98%E8%BF%90%E7%BB%B4%E5%92%A8%E8%AF%A2"',
  );
  expect(html).toContain("写第一封邮件");
  expect(html).toContain("不报价，不收集密码");
  expect(html).toContain("↗");
  expect(html).toContain("border-y");
  expect(html).toContain("border-[var(--lt-rule)]");
  expect(html).not.toMatch(/rounded|shadow|purple|glow|bg-/);
  expect(html).not.toContain("target=");
  expect(html).not.toContain("新窗口");
});

test("an off-site ledger row opens in a new window and says so", () => {
  const html = renderToStaticMarkup(
    <LedgerRow href="https://identity.lurus.cn/topup" label="钱包充值" meta="余额以人民币计" />,
  );

  expect(html).toContain('target="_blank"');
  expect(html).toContain('rel="noopener noreferrer"');
  expect(html).toContain("（新窗口打开）");
});
