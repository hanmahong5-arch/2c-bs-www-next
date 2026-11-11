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
  expect(forge).toContain("页上有注册表单");
  expect(forge).not.toContain("不提供自助注册入口");
  expect(forge).not.toContain("现网可打开看编排面");
  expect(forge).toContain('{ label: "写信询问", href: CONTACT, primary: true, external: true }');
});

test("lugo states the path once", () => {
  const src = readFileSync("src/app/lugo/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("身份源 / 商户号 / 网络");
  expect(src).toContain('href="/approach#intake"');
  expect(src).toContain('const DOCS_DEPLOY = "https://docs.lurus.cn/platform/self-host"');
  expect(src).toContain("装进你自己的环境，先写信。");
  expect(src).not.toContain("装进你自己环境的账号");
  expect(src).toContain("文档站把安装器写成随交付提供");
  expect(src).toContain("本页不提供公开安装包");
  expect(src).not.toContain("zita");
  expect(src).not.toContain('https://docs.lurus.cn/platform/"');
  expect(src.match(/DOCS_DEPLOY/g)).toHaveLength(3);
});

test("kova states the page path once", () => {
  const src = readFileSync("src/app/kova/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("外部客户流量尚未承接");
  expect(src).toContain("文档站里的安装命令还不是这条路径");
  expect(src).toContain("文档站快速开始写着五分钟和三种安装方式，并给出容器命令");
  expect(src).toContain("要链接进你的程序，先写信");
  expect(src).not.toContain("ghcr.io");
  expect(src).not.toContain("docker run");
  expect(src).toContain("文档站 Kova 页给出调度延迟、吞吐和代码量，本页不转述那些数字。");
  expect(src).toContain("部署到你自己的机器，先写信。");
  expect(src).not.toContain("且可部署在你自己的机器上");
  expect(src).not.toContain("并可主权部署");
  expect(src).not.toContain("3.17");
  expect(src).not.toContain("315K");
  expect(src).not.toContain("先读文档");
  expect(src).toContain('{ label: "联系试用", href: "mailto:contact@lurus.cn", primary: true, external: true }');
  expect(src).toContain('href="/approach#intake"');
  expect(src).toContain("要联测或嵌入");
  expect(src).toContain("禁止 cargo install lumen-cli");
  expect(src).toContain("lumen-ai");
  expect(src).toContain("文档站 Lumen 简介把「中断后从检查点继续」写在开头");
  expect(src).not.toContain("LumenCheckpointer");
  expect(src).toContain("公开记录见");
  expect(src).not.toContain("客户故事见文档站");
  expect(src).not.toContain("联测与场景页");
  const scene = src.slice(src.indexOf('id="why-ops"'), src.indexOf('id="lumen"'));
  expect(scene).toContain("href={DOCS_JOINT}");
  expect(scene).toContain("文档站 · 联测账本");
});

test("witness states the path once", () => {
  const src = readFileSync("src/app/witness/page.tsx", "utf8");
  expect(src).not.toContain("<NextStep");
  expect(src.match(/nextStep/g)).toHaveLength(1);
  expect(src).toContain("被观测环境与值班诉求");
  expect(src).toContain("文档站里的构建命令还不是公开发布的安装包");
  expect(src).toContain(
    '{ label: "联系试点", href: "mailto:contact@lurus.cn", primary: true, external: true }',
  );
  expect(src).not.toContain('{ label: "阅读文档", href: DOCS, primary: true, external: true }');
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
  expect(src).toContain("装进你自己的环境，先写信。");
  expect(src).not.toContain("部署在你自己环境里的多租户");
  expect(src).toContain("网关首页写着兼容 OpenAI，并给出厂商与模型数量。本页不转述那些数字。");
  expect(src).not.toContain("对接所有模型厂商");
  expect(src).not.toContain("已定价模型");
});

test("lucrum points at the live signup instead of a letter for an account", () => {
  const src = readFileSync("src/app/lucrum/page.tsx", "utf8");
  expect(src).toContain("现网首页写着免费注册，并另有价目");
  expect(src).toContain("本页不转述那些额度与行情数字");
  expect(src).not.toContain("需要账号或报障，写信说明用途即可");
  expect(src).toContain("仅模拟盘");
  expect(src).toContain("不代表未来收益");
  expect(src).toContain("primary: true");
  expect(src).toContain("href: LUCRUM_URL");
});
