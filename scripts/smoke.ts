/**
 * 冒烟测试: 每条公开路由 HTTP 200 + 渲染后含品牌 marker + 正文非空。裸 CDP。
 * (本环境 Bun+playwright 不通,沿用 WebSocket 直连 CDP。)
 * 前置: chrome --headless --remote-debugging-port=9222
 * 用法: bun scripts/smoke.ts [baseUrl]   默认 http://localhost:3000
 * 退出码: 任一路由失败即非 0(供 CI 当门禁)。
 */
import { ROUTES } from "./routes";

const base = process.argv[2] ?? "http://localhost:3000";
const BRAND = "LurusTech"; // Header/Footer 全站渲染,作"页面真渲染了"的 marker
const MIN_TEXT = 120; // 正文最小字数,低于此视为空壳/错误页

interface CdpResult {
  result: { value: string };
}

async function cdp(ws: WebSocket, id: number, method: string, params: object = {}): Promise<CdpResult> {
  return new Promise((resolve, reject) => {
    const onMsg = (ev: MessageEvent) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id === id) {
        ws.removeEventListener("message", onMsg);
        if (msg.error) {
          reject(new Error(msg.error.message));
        } else {
          resolve(msg.result);
        }
      }
    };
    ws.addEventListener("message", onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function main() {
  let failures = 0;
  for (const route of ROUTES) {
    const url = base + route;
    const reasons: string[] = [];

    // 1) HTTP 状态码
    let status = 0;
    try {
      status = (await fetch(url)).status;
    } catch (e) {
      reasons.push(`fetch 失败: ${(e as Error).message}`);
    }
    if (status && status !== 200) reasons.push(`HTTP ${status}`);

    // 2) 渲染后 DOM: 真出了内容(title + 品牌 marker + 正文长度)
    try {
      const target = await (await fetch(`http://127.0.0.1:9222/json/new?about:blank`, { method: "PUT" })).json();
      const ws = new WebSocket(target.webSocketDebuggerUrl);
      await new Promise((r) => ws.addEventListener("open", r, { once: true }));

      let id = 1;
      await cdp(ws, id++, "Page.navigate", { url });
      await new Promise((r) => setTimeout(r, 3500)); // 等加载 + hydration

      const res = await cdp(ws, id++, "Runtime.evaluate", {
        expression: "JSON.stringify({title: document.title, text: (document.body.innerText || '').trim()})",
        returnByValue: true,
      });
      const { title, text } = JSON.parse(res.result.value);
      const body = String(text);
      if (!title) reasons.push("title 为空");
      if (!body.includes(BRAND)) reasons.push(`正文缺品牌 marker "${BRAND}"`);
      if (body.length < MIN_TEXT) reasons.push(`正文过短(${body.length} 字)`);

      ws.close();
      await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
    } catch (e) {
      reasons.push(`渲染检查失败: ${(e as Error).message}`);
    }

    const ok = reasons.length === 0;
    if (!ok) failures++;
    console.log(`${route.padEnd(12)} ${ok ? "ok" : "✗ " + reasons.join("; ")}`);
  }
  console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes passed`);
  process.exit(failures ? 1 : 0);
}

main();
