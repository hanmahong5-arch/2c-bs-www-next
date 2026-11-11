import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";
import { updates } from "@/app/blog/updates-data";
import { changelogAnchor } from "@/lib/changelog-rss";

test("home recent titles open that changelog entry and the index link stays", () => {
  const html = renderToStaticMarkup(<Home />);
  for (const entry of updates.slice(0, 3)) {
    expect(html).toContain(`href="/blog#${changelogAnchor(entry)}"`);
    expect(html).toContain(entry.title);
  }
  expect(html).toContain('href="/blog"');
  expect(html).toContain("全部更新");
  expect(html).toContain("个人项目 · 工具与底座");
  expect(html).toContain(">自助<");
  expect(html).toContain(">环境里<");
  expect(html).toContain(">底座<");
  expect(html).not.toContain("text-[var(--lt-accent)]");
  expect(html).toContain('text-[var(--color-text-muted)]">LUR');
  expect(html).not.toContain("text-[var(--lt-ink)]/50");
});
