import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import NotFound, { metadata } from "./not-found";

test("missing page metadata is its own page and has no canonical", () => {
  expect(metadata.title).toBe("没有这一页");
  expect(metadata.description).toBe("地址可能写错了，或者内容已经挪走。");
  expect(metadata.alternates?.canonical).toBeNull();
  expect(metadata.alternates?.types?.["application/rss+xml"]).toEqual([
    {
      url: "/blog/rss.xml",
      title: "LurusTech 更新日志",
    },
  ]);
  expect(metadata.robots).toBeUndefined();
});

test("missing page lists existing ways onward without a popularity claim", () => {
  const html = renderToStaticMarkup(<NotFound />);

  expect(html).toContain("没有这一页。");
  expect(html).toContain("可以从这些页面继续：");
  expect(html).toContain('href="/"');
  expect(html).toContain('href="/approach"');
  expect(html).toContain('href="/memorus"');
  expect(html).toContain('href="https://docs.lurus.cn"');
  expect(html).toContain("（新窗口打开）");
  expect(html).not.toContain("常有人去");
});
