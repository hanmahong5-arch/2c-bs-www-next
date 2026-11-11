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

test("lugo states the path once", () => {
  const src = readFileSync("src/app/lugo/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("身份源 / 商户号 / 网络");
  expect(src).toContain('href="/approach#intake"');
});

test("kova states the page path once", () => {
  const src = readFileSync("src/app/kova/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("外部客户流量尚未承接");
  expect(src).toContain('href="/approach#intake"');
  expect(src).toContain("要联测或嵌入");
});

test("witness states the path once", () => {
  const src = readFileSync("src/app/witness/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("被观测环境与值班诉求");
  expect(src).toContain('href="/approach#intake"');
  expect(src).toContain("contact@lurus.cn");
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

test("approach states the letter path once, beside the intake list", () => {
  const src = readFileSync("src/app/approach/page.tsx", "utf8");
  expect(src.match(/<NextStep/g)).toHaveLength(1);
  expect(src).toContain("按上面的清单写清环境现状与目标");
  expect(src.slice(src.indexOf("<NextStep"), src.indexOf("</NextStep>"))).toContain("max-w-[44rem]");
  expect(src).not.toContain("按上方清单来信");
  expect(src).not.toContain("我们读后回复是否接");
  const intake = src.indexOf('id="intake"');
  const step = src.indexOf("<NextStep");
  const closing = src.indexOf('id="contact-title"');
  expect(intake).toBeGreaterThan(-1);
  expect(step).toBeGreaterThan(intake);
  expect(closing).toBeGreaterThan(step);
});

test("hub states the path once", () => {
  const src = readFileSync("src/app/hub/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("写信说明上游与网络约束");
});
