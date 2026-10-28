/**
 * 验收门禁：比 smoke 更严的产品诚实 / 转化 / 发现层断言。
 * 前置: Chrome CDP :9222（与 smoke 相同）；目标站已起。
 * 用法: bun scripts/accept.ts [baseUrl]   默认 http://localhost:3000
 * 退出码: 任一断言失败即非 0。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CONVERSION_ROUTES, ROUTES } from "./routes";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const BRAND = "LurusTech";
const MIN_TEXT = 120;
const FORBIDDEN_FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

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

async function main() {
  console.log(`accept @ ${base}\n`);
  const failures: string[] = [];

  checkDiscovery(failures);
  await checkAllRoutes(failures);
  await checkConversion(failures);
  await checkMemorus(failures);
  await checkLugo(failures);
  await checkJsonLd(failures);
  await checkSitemapRobots(failures);

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
