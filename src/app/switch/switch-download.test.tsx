import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("the recommended Switch download is underlined in ink", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  expect(src).toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-ink)]");
  expect(src).not.toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-accent)]");
  expect(src).toContain("decoration-[var(--color-text-muted)] hover:decoration-[var(--lt-ink)]");
});

test("the Windows verification is written before the file list", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  const warn = src.indexOf("目前只有 Windows 版经过启动验证");
  const list = src.indexOf("<ul");
  expect(warn).toBeGreaterThan(0);
  expect(list).toBeGreaterThan(warn);
});
