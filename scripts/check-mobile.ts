/**
 * 375px 视口走查：检测横向滚动。裸 CDP (Bun 原生 WebSocket)。
 * 前置: chrome --headless --remote-debugging-port=9222
 * 用法: bun scripts/check-mobile.ts [baseUrl]
 *
 * 关键修正：以浏览器实际布局宽 (documentElement.clientWidth) 为基准判定溢出
 * (scrollWidth > clientWidth)，而非 window.innerWidth —— headless 下 innerWidth
 * 可能不随 deviceMetrics 锁定而漂移，旧实现据此比较会静默假阴性。并增加锁定断言：
 * 若 clientWidth 未落在 375±20，视为视口未锁定的"测量失效"，响亮失败而非误判 ok。
 */
import { ROUTES } from "./routes";

const base = process.argv[2] ?? "http://localhost:3001";
const TARGET_W = 375;
const LOCK_TOLERANCE = 20; // clientWidth 偏离 375 超过此值 = 视口未锁定

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

// 页面内执行：返回布局宽、滚动宽、innerWidth，及溢出时越界元素定位(便于修复)
const PROBE = `(() => {
  const de = document.documentElement;
  const cw = de.clientWidth, sw = de.scrollWidth, iw = window.innerWidth;
  let offenders = [];
  if (sw > cw + 1) {
    offenders = Array.from(document.querySelectorAll('body *'))
      .filter((el) => el.getBoundingClientRect().right > cw + 1)
      .slice(0, 4)
      .map((el) => {
        const cls = typeof el.className === 'string' && el.className.trim()
          ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.')
          : '';
        return el.tagName.toLowerCase() + cls;
      });
  }
  return JSON.stringify({ sw, cw, iw, offenders });
})()`;

async function main() {
  let failures = 0;
  let harnessErrors = 0;

  for (const route of ROUTES) {
    const target = await (await fetch(`http://127.0.0.1:9222/json/new?about:blank`, { method: "PUT" })).json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));

    let id = 1;
    await cdp(ws, id++, "Emulation.setDeviceMetricsOverride", {
      width: TARGET_W,
      height: 812,
      deviceScaleFactor: 1,
      mobile: true,
      screenWidth: TARGET_W,
      screenHeight: 812,
    });
    await cdp(ws, id++, "Page.navigate", { url: base + route });
    await new Promise((r) => setTimeout(r, 3500)); // 等加载 + 动画首帧
    const res = await cdp(ws, id++, "Runtime.evaluate", {
      expression: PROBE,
      returnByValue: true,
    });
    const { sw, cw, iw, offenders } = JSON.parse(res.result.value);

    const locked = Math.abs(cw - TARGET_W) <= LOCK_TOLERANCE;
    const overflow = sw - cw > 1;

    let verdict: string;
    if (!locked) {
      harnessErrors++;
      verdict = `⚠ 视口未锁定 (clientWidth=${cw}, 期望≈${TARGET_W}) — 测量无效`;
    } else if (overflow) {
      failures++;
      verdict = `✗ OVERFLOW  scrollWidth=${sw} clientWidth=${cw}  越界: ${offenders.join(", ") || "?"}`;
    } else {
      verdict = `ok  (clientWidth=${cw})`;
    }
    console.log(`${route.padEnd(12)} ${verdict}  [iw=${iw}]`);

    ws.close();
    await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
  }

  if (harnessErrors) {
    console.log(`\n⚠ ${harnessErrors} 条路由视口未锁定到 ${TARGET_W}px — 视为失败(避免假阴性)`);
  }
  process.exit(failures || harnessErrors ? 1 : 0);
}

main();
