import { expect, test } from "bun:test";
import { blogPageMetadata } from "./blog-metadata";

test("the full log and a known tag both canonicalize to /blog", () => {
  for (const meta of [blogPageMetadata(null, 12), blogPageMetadata("", 12), blogPageMetadata("Kova", 2)]) {
    expect(meta.alternates?.canonical).toBe("/blog");
    expect(meta.alternates?.types?.["application/rss+xml"]).toEqual([
      {
        url: "/blog/rss.xml",
        title: "LurusTech 更新日志",
      },
    ]);
    expect(meta.robots).toBeUndefined();
  }
});

test("an unknown tag is not indexed and does not claim to be the full log", () => {
  const meta = blogPageMetadata("no-such-tag", 0);
  expect(meta.alternates?.canonical).toBe("/blog?tag=no-such-tag");
  expect(meta.robots).toEqual({ index: false, follow: true });
  expect(meta.alternates?.types?.["application/rss+xml"]).toEqual([
    {
      url: "/blog/rss.xml",
      title: "LurusTech 更新日志",
    },
  ]);
});

test("an unknown tag keeps its characters inside the canonical query", () => {
  const meta = blogPageMetadata("a b&c", 0);
  expect(meta.alternates?.canonical).toBe("/blog?tag=a%20b%26c");
});
