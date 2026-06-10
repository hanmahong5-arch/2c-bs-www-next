/**
 * 375px 视口走查：检测横向滚动。裸 CDP (Bun 原生 WebSocket)。
 * 前置: chrome --headless --remote-debugging-port=9222
 * 用法: bun scripts/check-mobile.ts [baseUrl]
 */
const base = process.argv[2] ?? "http://localhost:3001";
const routes = ["/", "/pricing", "/about", "/platform", "/kova", "/lucrum", "/download", "/solutions", "/blog"];

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
  for (const route of routes) {
    const target = await (await fetch(`http://127.0.0.1:9222/json/new?about:blank`, { method: "PUT" })).json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));

    let id = 1;
    await cdp(ws, id++, "Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await cdp(ws, id++, "Page.navigate", { url: base + route });
    await new Promise((r) => setTimeout(r, 3500)); // 等加载 + 动画首帧
    const res = await cdp(ws, id++, "Runtime.evaluate", {
      expression: "JSON.stringify({sw: document.documentElement.scrollWidth, iw: window.innerWidth})",
      returnByValue: true,
    });
    const { sw, iw } = JSON.parse(res.result.value);
    const overflow = sw > iw;
    if (overflow) failures++;
    console.log(`${route.padEnd(12)} ${overflow ? "✗ OVERFLOW" : "ok"}  scrollWidth=${sw} innerWidth=${iw}`);

    ws.close();
    await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
  }
  process.exit(failures ? 1 : 0);
}

main();
