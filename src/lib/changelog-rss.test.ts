import { expect, test } from "bun:test";
import { updates, type ChangelogEntry } from "@/app/blog/updates-data";
import { changelogGuid, renderChangelogRss } from "./changelog-rss";

function guidFor(xml: string, title: string): string {
  const block = xml.split("<item>").find((part) => part.includes(`<title>${title}</title>`));
  const guid = block?.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1];
  if (!guid) throw new Error(`missing guid for ${title}`);
  return guid;
}

test("rss guid stays put when a newer entry is inserted at the head", () => {
  const title = updates[0].title;
  const before = renderChangelogRss(updates);
  const extra: ChangelogEntry = {
    date: "2026-12",
    title: "一条还没写进日志的占位",
    desc: "只用于测试 guid，不进页面。",
    tags: ["Web"],
  };
  const after = renderChangelogRss([extra, ...updates]);

  expect(guidFor(after, title)).toBe(guidFor(before, title));
  expect(guidFor(after, title)).toBe(changelogGuid(updates[0]));
});

test("rss uses the historical wording, month anchors, and escapes markup", () => {
  const xml = renderChangelogRss([
    {
      date: "2026-11",
      title: "A & B",
      desc: "说了 <现状>，并不代表现在。",
      tags: ['Hub "公开"'],
    },
  ]);

  expect(xml).toContain("条目保留当时的原文，其中的活动与说法以当时为准，不代表现状。");
  expect(xml).not.toContain("新功能、改进和修复");
  expect(xml).toContain("https://www.lurus.cn/blog#2026-11");
  expect(xml).toContain("A &amp; B");
  expect(xml).toContain("&lt;现状&gt;");
  expect(xml).toContain("Hub &quot;公开&quot;");
});
