import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AsOfDemo } from "./asof-demo";

test("the valid event and its quote are marked in ink", () => {
  const html = renderToStaticMarkup(<AsOfDemo />);
  expect(html).toContain("标出的这一段");
  expect(html).toContain("2026-05-20");
  expect(html).toContain("砍掉一部分需求，预算调到 12 万。");
  expect(html).not.toContain("会话 #");
  expect(html).not.toContain("第 4 轮");
  expect(html).not.toContain("第 7 轮");
  expect(html).not.toContain("当时成立");
  expect(html).not.toContain("按哪个时点回答");
  expect(html).toContain("border-t-2 pt-3 transition-colors duration-200 motion-reduce:transition-none border-[var(--lt-ink)]");
  expect(html).toContain("border-l-2 border-[var(--lt-ink)]");
  expect(html).not.toContain("border-[var(--lt-accent)]");
  expect(html).toContain("border-[var(--color-text-muted)] text-[var(--lt-ink)] hover:border-[var(--lt-ink)]");
  expect(html).not.toContain("border-[var(--lt-rule)] text-[var(--lt-ink)]");
  expect(html).not.toContain("color-border-hover");
});
