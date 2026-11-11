import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

test("action buttons are a hairline on the paper", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  const start = css.indexOf(".btn-primary,");
  const end = css.indexOf(".btn-ghost:focus-visible");
  const block = css.slice(start, end);
  expect(block).toContain("border-radius: 0");
  expect(block).not.toContain("border-radius: 0.75rem");
  expect(block).not.toContain("background: var(--color-ochre-dark)");
  expect(block).not.toContain("color: #fff");
  expect(block).toContain("border: 1px solid var(--lt-ink)");
  expect(block).toContain("border: 1px solid var(--lt-rule)");
  const hover = css.slice(css.indexOf(".btn-primary:hover"), css.indexOf(".btn-secondary {"));
  expect(hover).toContain("background: var(--lt-ink)");
  expect(hover).toContain("color: var(--lt-paper)");
  expect(hover).not.toContain("var(--lt-accent)");
  expect(css).toContain(".btn-primary:focus-visible");
  expect(css).toContain("outline-offset: 4px");

  const html = renderToStaticMarkup(<Home />);
  expect(html).toContain('class="btn-primary"');
  expect(html).toContain("下载与上手");
  expect(html).toContain("阅读方法");
  expect(html).toContain("写信给 contact@lurus.cn");
});
