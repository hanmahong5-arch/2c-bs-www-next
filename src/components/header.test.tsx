import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Header, escapeClosesMenu, pathClosesMenu, closeMenuFromEscape } from "./header";
import { MobilePaletteButton } from "./command-palette";

test("header controls show the ink focus ring", () => {
  const html = renderToStaticMarkup(<Header />);
  // 首页、七个导航、搜索、登录、深浅切换、目录。移动菜单默认关着。
  expect(html.match(/focus-ink/g)?.length).toBe(12);
  expect(html).toContain('aria-label="切换到深色模式"');
  expect(html).toContain('aria-label="打开命令面板"');
});

test("escape and a new address close the menu, and escape returns focus", () => {
  expect(escapeClosesMenu(true, "Escape")).toBe(true);
  expect(escapeClosesMenu(false, "Escape")).toBe(false);
  expect(escapeClosesMenu(true, "Enter")).toBe(false);
  expect(pathClosesMenu(true, "/witness", "/hub")).toBe(true);
  expect(pathClosesMenu(true, "/hub", "/hub")).toBe(false);
  expect(pathClosesMenu(false, "/witness", "/hub")).toBe(false);
  const order: string[] = [];
  closeMenuFromEscape(true, "Escape", () => order.push("close"), () => order.push("focus"));
  closeMenuFromEscape(true, "Tab", () => order.push("close"), () => order.push("focus"));
  expect(order).toEqual(["close", "focus"]);
});

test("the mobile menu search is a plain word and carries no shortcut", () => {
  const html = renderToStaticMarkup(<MobilePaletteButton onOpen={() => {}} />);
  expect(html).toContain(">搜索<");
  expect(html).toContain('aria-label="打开命令面板"');
  expect(html).toContain("focus-ink");
  expect(html).not.toContain("⌘K");
  expect(html).not.toContain("Ctrl+K");
});
