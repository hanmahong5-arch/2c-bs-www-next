import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("forge, lux, and founder state the path once", () => {
  for (const file of ["src/app/forge/page.tsx", "src/app/lux/page.tsx", "src/app/founder/page.tsx"]) {
    const src = readFileSync(file, "utf8");
    expect(src).not.toContain(">下一步");
    expect(src).not.toContain("再改本页 CTA");
    expect(src).not.toContain("再挂下载");
    expect(src).toContain("nextStep:");
  }
  const forge = readFileSync("src/app/forge/page.tsx", "utf8");
  expect(forge).toContain("是否需要 Kova");
});

test("memorus states the path once", () => {
  const src = readFileSync("src/app/memorus/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src).not.toContain('className="btn-primary"');
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("尚未上公共包仓库");
  expect(src).toContain("我们回复是否适合现阶段试点");
  expect(src).toContain("首信清单");
});

test("hub states the path once", () => {
  const src = readFileSync("src/app/hub/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("写信说明上游与网络约束");
});
