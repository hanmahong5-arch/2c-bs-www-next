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
  expect(links).toContain("其他向量库后端要在构建时显式开启");
  expect(links).not.toContain("改一行配置");
  expect(src).toContain("这时语义层不起作用，检索主要靠关键词");
  expect(src).toContain("onnx-embedding");
  expect(src).not.toContain("零配置默认不带真实的语义嵌入");
  expect(links).toContain("备份中的副本尚未纳入删除传播");
  expect(links).not.toContain("删一次，删干净");
  expect(links).not.toContain("再也检索不到");
  expect(links).toContain("经服务接口写入的记忆目前还没有来源记录");
  expect(links).not.toContain("每条结果带出处");
  expect(links).not.toContain("哪段会话、哪一轮、谁说的");
  expect(links).not.toContain("可审计");
  expect(src).toContain(
    'className="mt-10 max-w-[36rem] border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-4 py-3"',
  );
  expect(src).not.toContain("border border-[var(--lt-rule)] bg-[var(--lt-paper)] px-4");
});
