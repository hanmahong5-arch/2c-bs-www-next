import { expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...sourceFiles(path));
      continue;
    }
    if (name.endsWith(".tsx") && !name.includes(".test.")) out.push(path);
  }
  return out;
}

test("link hover underlines use ink", () => {
  const forbidden = ["hover:decoration-[var(--lt-", "accent)]"].join("");
  const hits = sourceFiles("src").flatMap((path) => {
    const text = readFileSync(path, "utf8");
    return text.includes(forbidden) ? [path] : [];
  });
  expect(hits).toEqual([]);
});
