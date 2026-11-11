import { expect, test } from "bun:test";
import { updates } from "@/app/blog/updates-data";
import { changelogAnchor } from "./changelog-rss";
import { renderBlogMarkdown } from "./blog-md";

test("blog markdown keeps the first entry title and the historical-wording sentence", () => {
  const md = renderBlogMarkdown();
  expect(md).toContain(updates[0].title);
  expect(md).toContain("条目保留当时的原文，其中的活动与说法以当时为准，不代表现状。");
  expect(md).toContain("订阅源：https://www.lurus.cn/blog/rss.xml");
  expect(md).toContain(`本条：https://www.lurus.cn/blog#${changelogAnchor(updates[0])}`);
  const october = updates.filter((entry) => entry.date === "2026-10");
  const urls = october.map((entry) => `本条：https://www.lurus.cn/blog#${changelogAnchor(entry)}`);
  expect(new Set(urls).size).toBe(october.length);
  for (const url of urls) expect(md).toContain(url);
  expect(md).not.toContain("password=");
});
