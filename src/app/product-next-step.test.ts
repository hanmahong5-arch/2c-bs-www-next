import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("forge, lux, and founder state the path once", () => {
  for (const file of ["src/app/(shelf)/forge/page.tsx", "src/app/(shelf)/lux/page.tsx", "src/app/(shelf)/founder/page.tsx"]) {
    const src = readFileSync(file, "utf8");
    expect(src).not.toContain(">下一步");
    expect(src).not.toContain("再改本页 CTA");
    expect(src).not.toContain("再挂下载");
    expect(src).toContain("nextStep:");
  }
  const forge = readFileSync("src/app/(shelf)/forge/page.tsx", "utf8");
  expect(forge).toContain("是否需要 Kova");
});
