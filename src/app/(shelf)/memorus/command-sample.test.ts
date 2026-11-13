import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("the command sample uses the measured gray edge", () => {
  const src = readFileSync("src/app/(shelf)/memorus/page.tsx", "utf8");
  expect(src).toContain("接入示意 · 尚未上包仓库，安装见文档");
  expect(src).toContain(
    'className="mt-10 max-w-[36rem] border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-4 py-3"',
  );
  expect(src).not.toContain("border border-[var(--lt-rule)] bg-[var(--lt-paper)] px-4");
});
