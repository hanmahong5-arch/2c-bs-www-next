import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("the recommended Switch download is underlined in ink", () => {
  const src = readFileSync("src/app/switch/switch-download.tsx", "utf8");
  expect(src).toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-ink)]");
  expect(src).not.toContain("font-semibold text-[var(--lt-ink)] decoration-[var(--lt-accent)]");
  expect(src).toContain("decoration-[var(--color-text-muted)] hover:decoration-[var(--lt-ink)]");
});
