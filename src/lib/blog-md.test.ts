import { expect, test } from "bun:test";
import { updates } from "@/app/blog/updates-data";
import { renderBlogMarkdown } from "./blog-md";

test("blog markdown keeps the first entry title and the historical-wording sentence", () => {
  const md = renderBlogMarkdown();
  expect(md).toContain(updates[0].title);
  expect(md).toContain("条目保留当时的原文，其中的活动与说法以当时为准，不代表现状。");
  expect(md).not.toContain("password=");
});
