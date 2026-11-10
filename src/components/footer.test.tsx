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

test("footer uses the page's own name for about, terms, and privacy", () => {
  const html = renderToStaticMarkup(<Footer />);

  expect(html).toContain('href="/about"');
  expect(html).toContain(">关于<");
  expect(html).toContain(">联系<");
  expect(html).toContain(">服务条款<");
  expect(html).toContain(">《服务条款》<");
  expect(html).toContain(">隐私政策<");
  expect(html).toContain(">《隐私政策》<");
  expect(html).not.toContain("About");
  expect(html).not.toContain("Contact");
  expect(html).not.toContain("Terms of Service");
  expect(html).not.toContain("Privacy Policy");
  expect(html).not.toContain("用户协议");
  expect(html).toContain("LurusTech。保留所有权利。");
  expect(html).not.toContain("All rights reserved");
});

test("footer product names and the Hub license match the pages", () => {
  const html = renderToStaticMarkup(<Footer />);

  for (const name of ["见证", "Kova", "Memorus", "Hub", "Lugo", "Switch", "文档"]) {
    expect(html).toContain(`>${name}<`);
  }
  expect(html).toContain("Lurus Hub 基于开源 New API，AGPLv3。");
  expect(html).not.toContain(">kova<");
  expect(html).not.toContain(">docs<");
  expect(html).not.toContain("Built on");
  expect(html).not.toContain("AGPL-3.0");
});

test("footer names the log 更新日志, the same name as the page", () => {
  const html = renderToStaticMarkup(<Footer />);
  const log = html.match(/<a[^>]*href="\/blog"[^>]*>[\s\S]*?<\/a>/);
  expect(log?.[0]).toContain("更新日志");
  expect(log?.[0]).not.toContain("changelog");
  expect(html).not.toContain("博客");
  const approach = html.match(/<a[^>]*href="\/approach"[^>]*>[\s\S]*?<\/a>/);
  expect(approach?.[0]).toContain(">方法</a>");
  expect(approach?.[0]).not.toContain("方法 approach");
  const pricing = html.match(/<a[^>]*href="\/hub\/pricing"[^>]*>[\s\S]*?<\/a>/);
  expect(pricing?.[0]).toContain(">Hub 按量价格</a>");
  expect(pricing?.[0]).not.toContain(">Hub 价格<");
  expect(html.match(/focus-ink/g)?.length).toBe(21);
});
