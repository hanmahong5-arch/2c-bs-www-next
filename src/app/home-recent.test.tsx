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
  expect(html).toContain('class="sr-only">LURUS</span>');
  expect(html).toContain('class="sr-only">URUS</span>');
  expect(html).toContain('class="sr-only">RUS</span>');
  expect(html).not.toContain('aria-label="LURUS"');
  expect(html).not.toContain('aria-label="URUS"');
  expect(html).not.toContain('aria-label="RUS"');
});

test("the internal footnote names Founder outside the self-serve row", () => {
  const html = renderToStaticMarkup(<Home />);
  const selfServe = html.slice(0, html.indexOf(">环境里<"));
  expect(selfServe).not.toContain('href="/founder"');
  expect(selfServe).not.toContain('href="/lux"');
  expect(selfServe).toContain('href="/switch"');
  expect(selfServe).toContain('href="/download"');
  expect(html).toContain('href="/founder"');
  expect(html).toContain('href="/lux"');
  expect(html).toContain("不对外售卖");
  expect(html).toContain("不对外部自助分发");
  expect(html).toContain("没有公开安装命令");
  expect(html).toContain(">早期试点<");
  expect(html).toContain('href="/about"');
  const environment = html.slice(html.indexOf(">环境里<"), html.indexOf(">底座<"));
  expect(environment).toContain("安装包尚未公开发布");
  expect(environment).toContain("试点先写信");
  expect(environment).toContain('href="/witness"');
  expect(environment).toContain('href="/memorus"');
  expect(environment).not.toContain("装进你自己的环境");
  const base = html.slice(html.indexOf(">底座<"), html.indexOf("内部全站全线"));
  expect(base).toContain("今天仍由独立脚本完成");
  expect(base).toContain("Kova 尚未承接外部客户流量");
  expect(base).not.toContain("写操作仍多由独立脚本完成");
  expect(base).toContain('href="/kova"');
  expect(base).toContain('href="/hub"');
  expect(base).toContain('href="/lugo"');
});
