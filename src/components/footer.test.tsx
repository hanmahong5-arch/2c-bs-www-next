import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./footer";

test("footer security row is a mailbox and does not name a DPA", () => {
  const html = renderToStaticMarkup(<Footer />);

  expect(html).toContain("安全问题");
  expect(html).toContain("mailto:contact@lurus.cn?subject=%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98");
  expect(html).toContain('href="/terms"');
  expect(html).toContain('href="/privacy"');
  expect(html).not.toContain("DPA");
  expect(html).not.toContain("/security");
  expect(html.match(/（新窗口打开）/g)).toHaveLength(3);
  const security = html.match(
    /<a href="mailto:contact@lurus.cn\?subject=%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98"[^>]*>[\s\S]*?<\/a>/,
  );
  expect(security?.[0]).not.toContain("新窗口");
});

test("footer names the log 更新日志, the same name as the page", () => {
  const html = renderToStaticMarkup(<Footer />);
  const log = html.match(/<a[^>]*href="\/blog"[^>]*>[\s\S]*?<\/a>/);
  expect(log?.[0]).toContain("更新日志");
  expect(log?.[0]).not.toContain("changelog");
  expect(html).not.toContain("博客");
});
