import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("the command sample uses the measured gray edge", () => {
  const src = readFileSync("src/app/memorus/page.tsx", "utf8");
  const links = readFileSync("src/app/memorus/product-data.ts", "utf8");
  expect(src).toContain("尚未上包仓库，命令见");
  expect(src).toContain("快速开始里的命令假定交付包已经在手里");
  expect(src).toContain("本页不提供公开镜像");
  expect(src).not.toContain("安装见");
  expect(src).toContain("href={LINKS.quickstart}");
  expect(links).toContain('quickstart: "https://docs.lurus.cn/memx/quickstart"');
  expect(src).toContain(
    'className="mt-10 max-w-[36rem] border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-4 py-3"',
  );
  expect(src).not.toContain("border border-[var(--lt-rule)] bg-[var(--lt-paper)] px-4");
});
