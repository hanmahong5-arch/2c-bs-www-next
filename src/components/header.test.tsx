import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./header";

test("header controls show the ink focus ring", () => {
  const html = renderToStaticMarkup(<Header />);
  // 首页、七个导航、搜索、登录、深浅切换、目录。移动菜单默认关着。
  expect(html.match(/focus-ink/g)?.length).toBe(12);
  expect(html).toContain('aria-label="切换到深色模式"');
  expect(html).toContain('aria-label="打开命令面板"');
});
