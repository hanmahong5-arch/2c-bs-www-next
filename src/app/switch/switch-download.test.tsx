import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("the recommended Switch download is underlined in ink", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  expect(src).toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-ink)]");
  expect(src).not.toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-accent)]");
  expect(src).toContain("decoration-[var(--color-text-muted)] hover:decoration-[var(--lt-ink)]");
});

test("the download section does not repeat the page path", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  const page = readFileSync("src/app/switch/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src).not.toContain("只能一次");
  expect(page.match(/nextStep/g)).toHaveLength(1);
  expect(page).toContain("在 Switch 中打开");
});

test("the Windows verification is written before the file list", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  const warn = src.indexOf("目前只有 Windows 版经过启动验证");
  const list = src.indexOf("<ul");
  expect(warn).toBeGreaterThan(0);
  expect(list).toBeGreaterThan(warn);
});
