/**
 * 验收门禁：比 smoke 更严的产品诚实 / 转化 / 发现层断言。
 * 前置: Chrome CDP :9222（与 smoke 相同）；目标站已起。
 * 用法: bun scripts/accept.ts [baseUrl]   默认 http://localhost:3000
 * 退出码: 任一断言失败即非 0。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { updates } from "../src/app/blog/updates-data";
import { CONVERSION_ROUTES, ROUTES } from "./routes";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const BRAND = "LurusTech";
const MIN_TEXT = 120;
const FORBIDDEN_FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const HOME_EXAMPLE_MARKS = ["下面三行是示例，不是客户数据", "上面三行仍是示例"] as const;
const HOME_PROOF_HREFS = [
  "/memorus/benchmarks",
  "/hub/pricing",
  "/hub/pricing.md",
  "/blog",
  "/witness",
  "/approach#intake",
  "/approach#receipt",
  "/witness#report",
] as const;
const AVAILABILITY_PERCENT = /\d+(?:\.\d+)?\s*[%％]/;
const UNKNOWN_BLOG_TAG = "no-such-mark";

interface CdpResult {
  result: { value: string };
}

async function cdp(ws: WebSocket, id: number, method: string, params: object = {}): Promise<CdpResult> {
  return new Promise((resolve, reject) => {
    const onMsg = (ev: MessageEvent) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id === id) {
        ws.removeEventListener("message", onMsg);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener("message", onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function renderText(url: string): Promise<{ title: string; text: string; html: string }> {
  const target = await (await fetch(`http://127.0.0.1:9222/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 1;
  await cdp(ws, id++, "Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 3500));
  const res = await cdp(ws, id++, "Runtime.evaluate", {
    expression:
      "JSON.stringify({title: document.title, text: (document.body.innerText || '').trim(), html: document.documentElement.outerHTML})",
    returnByValue: true,
  });
  ws.close();
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
  return JSON.parse(res.result.value);
}

function fail(bucket: string[], msg: string) {
  bucket.push(msg);
}

async function checkAllRoutes(failures: string[]) {
  for (const route of ROUTES) {
    const url = base + route;
    const reasons: string[] = [];
    let status = 0;
    try {
      status = (await fetch(url)).status;
    } catch (e) {
      reasons.push(`fetch: ${(e as Error).message}`);
    }
    if (status && status !== 200) reasons.push(`HTTP ${status}`);

    try {
      const { title, text, html } = await renderText(url);
      if (!title) reasons.push("title 空");
      if (!text.includes(BRAND)) reasons.push(`缺品牌 ${BRAND}`);
      if (text.length < MIN_TEXT) reasons.push(`正文过短 ${text.length}`);
      for (const host of FORBIDDEN_FONT_HOSTS) {
        if (html.includes(host)) reasons.push(`HTML 含外部字体宿主 ${host}`);
      }
    } catch (e) {
      reasons.push(`渲染: ${(e as Error).message}`);
    }

    if (reasons.length) {
      failures.push(`${route}: ${reasons.join("; ")}`);
      console.log(`${route.padEnd(22)} ✗ ${reasons.join("; ")}`);
    } else {
      console.log(`${route.padEnd(22)} ok`);
    }
  }
}

async function checkConversion(failures: string[]) {
  for (const route of CONVERSION_ROUTES) {
    const { text } = await renderText(base + route);
    if (!text.includes("下一步")) {
      failures.push(`${route}: 缺「下一步」`);
      console.log(`${route.padEnd(22)} ✗ 缺「下一步」`);
    } else {
      console.log(`${route.padEnd(22)} ok 下一步`);
    }
  }
}

async function checkMemorus(failures: string[]) {
  const { text } = await renderText(`${base}/memorus`);
  if (!/尚未系统测量/.test(text)) {
    failures.push("/memorus: 缺「尚未系统测量」诚实句");
  }
  // LATENCY 全 null 时不应出现「测量中」格子冒充延迟数字
  if (/\b\d+\s*ms\b/i.test(text) && text.includes("读写延迟")) {
    // 允许页内其它地方出现 ms；若出现「测量中」作为延迟表占位则红
  }
  if (text.includes("测量中") && text.includes("读写延迟")) {
    failures.push("/memorus: 延迟表仍用「测量中」占位（应隐藏表或只留诚实句）");
  }
  if (!text.includes("非公开基准")) {
    failures.push("/memorus: 工程验证区缺「非公开基准」限定");
  }
  console.log(`/memorus honesty`.padEnd(22), failures.some((f) => f.startsWith("/memorus")) ? "✗" : "ok");
}

async function checkLugo(failures: string[]) {
  const { text } = await renderText(`${base}/lugo`);
  if (!text.includes("即将上线")) failures.push("/lugo: 缺「即将上线」");
  if (!/尚未部署/.test(text)) failures.push("/lugo: 缺「尚未部署」类诚实语");
  console.log(`/lugo honesty`.padEnd(22), failures.some((f) => f.startsWith("/lugo")) ? "✗" : "ok");
}

async function checkJsonLd(failures: string[]) {
  const html = await (await fetch(`${base}/`)).text();
  if (!html.includes("application/ld+json")) {
    failures.push("/: 缺 JSON-LD");
    return;
  }
  const m = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) {
    failures.push("/: 未能解析 JSON-LD");
    return;
  }
  if (!m[1].includes("早期试点") || !m[1].includes("Kova")) {
    failures.push("/: JSON-LD 中 Kova 描述缺「早期试点」");
  }
  console.log(`JSON-LD Kova`.padEnd(22), failures.some((f) => f.includes("JSON-LD")) ? "✗" : "ok");
}

function checkDiscovery(failures: string[]) {
  const root = join(import.meta.dirname, "..");
  const cmdk = readFileSync(join(root, "src/components/command-palette.tsx"), "utf8");
  if (!cmdk.includes("/download")) {
    failures.push("cmdk: 缺 /download");
  }
  if (!cmdk.includes("/hub/pricing")) {
    failures.push("cmdk: 缺 /hub/pricing");
  }
  if (!cmdk.includes("/hub/pricing.md")) {
    failures.push("cmdk: 缺 /hub/pricing.md");
  }
  if (!cmdk.includes("updates-data")) {
    failures.push("cmdk: 更新日志未接 updates-data");
  }
  if (!cmdk.includes("/approach.md")) {
    failures.push("cmdk: 缺 /approach.md");
  }
  if (!cmdk.includes("/approach#delivery")) {
    failures.push("cmdk: 缺 /approach#delivery");
  }
  if (!cmdk.includes("/blog.md")) {
    failures.push("cmdk: 缺 /blog.md");
  }
  if (!cmdk.includes("/approach#receipt")) {
    failures.push("cmdk: 缺 /approach#receipt");
  }
  if (!cmdk.includes("/witness#restore")) {
    failures.push("cmdk: 缺 /witness#restore");
  }
  if (!cmdk.includes("/witness#report")) {
    failures.push("cmdk: 缺 /witness#report");
  }
}

async function checkBlogTags(failures: string[]) {
  const reasons: string[] = [];
  const knownEntry = updates.find((entry) => entry.tags.length > 0);
  if (!knownEntry) {
    reasons.push("日志没有可用标记，无法核对已知分支");
  } else {
    const tag = knownEntry.tags[0];
    const other = updates.find((entry) => !entry.tags.includes(tag));
    try {
      const res = await fetch(`${base}/blog?tag=${encodeURIComponent(tag)}`);
      const html = await res.text();
      if (res.status !== 200) reasons.push(`已知 HTTP ${res.status}`);
      if (!html.includes(knownEntry.title)) reasons.push(`已知标记 ${tag} 未出现「${knownEntry.title}」`);
      if (html.includes("日志里没有这个标记")) reasons.push("已知标记误报没有这个标记");
      if (other && html.includes(other.title)) reasons.push(`已知标记仍出现无关条目「${other.title}」`);
    } catch (e) {
      reasons.push(`已知标记: ${(e as Error).message}`);
    }
  }

  if (updates.some((entry) => entry.tags.includes(UNKNOWN_BLOG_TAG))) {
    reasons.push(`未知标记样本 ${UNKNOWN_BLOG_TAG} 已是真标记`);
  } else {
    try {
      const res = await fetch(`${base}/blog?tag=${encodeURIComponent(UNKNOWN_BLOG_TAG)}`);
      const html = await res.text();
      if (res.status !== 200) reasons.push(`未知 HTTP ${res.status}`);
      if (!html.includes("日志里没有这个标记")) reasons.push("未知标记缺「日志里没有这个标记」");
      if (knownEntry && html.includes(knownEntry.title)) reasons.push("未知标记仍列出日志条目");
    } catch (e) {
      reasons.push(`未知标记: ${(e as Error).message}`);
    }
  }

  if (reasons.length) {
    failures.push(`/blog?tag=: ${reasons.join("; ")}`);
    console.log(`/blog?tag=`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/blog?tag=`.padEnd(22), "ok 已知 / 未知");
  }
}

async function checkHomeProof(failures: string[]) {
  const reasons: string[] = [];
  try {
    const res = await fetch(`${base}/`);
    const html = await res.text();
    if (res.status !== 200) reasons.push(`HTTP ${res.status}`);
    for (const mark of HOME_EXAMPLE_MARKS) {
      if (!html.includes(mark)) reasons.push(`缺「${mark}」`);
    }
    for (const href of HOME_PROOF_HREFS) {
      if (!html.includes(`href="${href}"`)) reasons.push(`缺入口 ${href}`);
    }
    const { text } = await renderText(`${base}/`);
    if (AVAILABILITY_PERCENT.test(text)) reasons.push("出现可用性百分比");
  } catch (e) {
    reasons.push((e as Error).message);
  }

  if (reasons.length) {
    failures.push(`/ home proof: ${reasons.join("; ")}`);
    console.log(`/ home proof`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/ home proof`.padEnd(22), "ok 示例 + 八个入口");
  }
}

async function checkSitemapRobots(failures: string[]) {
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  if (!robots.includes("sitemap")) {
    failures.push("robots.txt: 未指向 sitemap");
  }
  const sm = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const route of ROUTES) {
    const needle = route === "/" ? "https://www.lurus.cn</loc>" : `https://www.lurus.cn${route}</loc>`;
    // sitemap may use www.lurus.cn + path; also allow trailing
    const alt = `https://www.lurus.cn${route === "/" ? "/" : route}`;
    if (!sm.includes(alt) && !sm.includes(needle)) {
      failures.push(`sitemap.xml: 缺 ${route}`);
    }
  }
  console.log(`discovery`.padEnd(22), failures.some((f) => f.startsWith("sitemap") || f.startsWith("robots") || f.startsWith("cmdk")) ? "✗" : "ok");
}

async function checkApproachIntake(failures: string[]) {
  const { text } = await renderText(`${base}/approach`);
  const reasons: string[] = [];
  if (!text.includes("来信请先写清")) reasons.push("缺「来信请先写清」");
  if (!text.includes("写第一封邮件")) reasons.push("缺「写第一封邮件」");
  if (!text.includes("硬化与受托运维，各包含什么")) reasons.push("缺「硬化与受托运维，各包含什么」");
  if (!text.includes("演练之后，写下这一张")) reasons.push("缺「演练之后，写下这一张」");
  if (!text.includes("（留空）")) reasons.push("缺「（留空）」");
  if (!text.includes("不写可用率")) reasons.push("缺「不写可用率」");
  if (!text.includes("不写客户名")) reasons.push("缺「不写客户名」");
  if (!text.includes("不是合同")) reasons.push("缺「不是合同」");
  if (/\d+(?:\.\d+)?\s*[%％]/.test(text)) reasons.push("出现可用性百分比");
  if (reasons.length) {
    failures.push(`/approach: ${reasons.join("; ")}`);
    console.log(`/approach intake`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/approach intake`.padEnd(22), "ok");
  }
}

async function checkWitnessDrill(failures: string[]) {
  const { text } = await renderText(`${base}/witness`);
  const required = [
    "是否恢复成功",
    "恢复了什么",
    "哪一类备份",
    "谁见证",
    "核对了什么",
    "不写可用率",
    "不写客户名",
    "不是合同",
    "不是常设 SLA",
    "不是某一个月的结果",
    "报告期",
    "跑了什么",
    "失败仍开着",
    "谁签了这份说明",
    "（留空）",
    "不写可用率百分比",
    "这不代替演练回执",
  ] as const;
  const reasons: string[] = [];
  for (const line of required) {
    if (!text.includes(line)) reasons.push(`缺「${line}」`);
  }
  if (/\d+(?:\.\d+)?\s*[%％]/.test(text)) reasons.push("出现可用性百分比");
  if (reasons.length) {
    failures.push(`/witness drill: ${reasons.join("; ")}`);
    console.log(`/witness drill`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/witness drill`.padEnd(22), "ok");
  }
}

async function checkPricingPay(failures: string[]) {
  const { text } = await renderText(`${base}/hub/pricing`);
  const reasons: string[] = [];
  if (!text.includes("钱包充值")) reasons.push("缺「钱包充值」");
  if (!text.includes("私有部署")) reasons.push("缺「私有部署」");
  if (reasons.length) {
    failures.push(`/hub/pricing pay: ${reasons.join("; ")}`);
    console.log(`/hub/pricing pay`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/hub/pricing pay`.padEnd(22), "ok");
  }
}

async function checkApproachMd(failures: string[]) {
  const res = await fetch(`${base}/approach.md`);
  const type = res.headers.get("content-type") ?? "";
  const body = await res.text();
  const reasons: string[] = [];
  if (res.status !== 200) reasons.push(`HTTP ${res.status}`);
  if (!type.includes("text/markdown")) reasons.push(`content-type ${type || "空"}`);
  if (!body.includes("来信请先写清")) reasons.push("缺「来信请先写清」");
  if (!body.includes("硬化与受托运维")) reasons.push("缺「硬化与受托运维」");
  if (!body.includes("不代替合同")) reasons.push("缺「不代替合同」");
  if (!body.includes("## 恢复演练回执")) reasons.push("缺「恢复演练回执」");
  if (!body.includes("（留空）")) reasons.push("缺「（留空）」");
  if (!body.includes("不写可用率")) reasons.push("缺「不写可用率」");
  if (!body.includes("不写客户名")) reasons.push("缺「不写客户名」");
  if (!body.includes("这张回执不是合同。")) reasons.push("缺「这张回执不是合同。」");
  if (/\d+(?:\.\d+)?\s*[%％]/.test(body)) reasons.push("出现可用性百分比");
  if (reasons.length) {
    failures.push(`/approach.md: ${reasons.join("; ")}`);
    console.log(`/approach.md`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/approach.md`.padEnd(22), "ok");
  }
}

async function checkBlogMd(failures: string[]) {
  const res = await fetch(`${base}/blog.md`);
  const type = res.headers.get("content-type") ?? "";
  const body = await res.text();
  const firstTitle = updates[0]?.title ?? "";
  const reasons: string[] = [];
  if (res.status !== 200) reasons.push(`HTTP ${res.status}`);
  if (!type.includes("text/markdown")) reasons.push(`content-type ${type || "空"}`);
  if (!body.includes("更新日志")) reasons.push("缺「更新日志」");
  if (!firstTitle || !body.includes(firstTitle)) reasons.push(`缺首条「${firstTitle}」`);
  if (reasons.length) {
    failures.push(`/blog.md: ${reasons.join("; ")}`);
    console.log(`/blog.md`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/blog.md`.padEnd(22), "ok");
  }
}

async function checkPricingMd(failures: string[]) {
  const res = await fetch(`${base}/hub/pricing.md`);
  const type = res.headers.get("content-type") ?? "";
  const body = await res.text();
  const reasons: string[] = [];
  if (res.status !== 200) reasons.push(`HTTP ${res.status}`);
  if (!type.includes("text/markdown")) reasons.push(`content-type ${type || "空"}`);
  if (!body.includes("hub.lurus.cn/api/v1/models")) reasons.push("缺价目来源");
  if (!body.includes("与钱包扣费同源")) reasons.push("缺同源说明");
  const hasTable = body.includes("| 模型 |");
  const honestEmpty = body.includes("暂时读不到") && body.includes("不另存价格");
  if (hasTable === honestEmpty) reasons.push("价目表与「读不到」必须二选一");
  if (reasons.length) {
    failures.push(`/hub/pricing.md: ${reasons.join("; ")}`);
    console.log(`/hub/pricing.md`.padEnd(22), "✗", reasons.join("; "));
  } else {
    console.log(`/hub/pricing.md`.padEnd(22), "ok");
  }
}

async function main() {
  console.log(`accept @ ${base}\n`);
  const failures: string[] = [];

  checkDiscovery(failures);
  await checkAllRoutes(failures);
  await checkPricingMd(failures);
  await checkApproachMd(failures);
  await checkBlogMd(failures);
  await checkPricingPay(failures);
  await checkConversion(failures);
  await checkApproachIntake(failures);
  await checkWitnessDrill(failures);
  await checkMemorus(failures);
  await checkLugo(failures);
  await checkJsonLd(failures);
  await checkSitemapRobots(failures);
  await checkBlogTags(failures);
  await checkHomeProof(failures);

  console.log("");
  if (failures.length) {
    console.log(`${failures.length} accept failure(s):`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log("accept: all green");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
