/**
 * 模拟用户滚动的分段视口截图 (whileInView 自然触发)。
 * 前置: chrome --headless --remote-debugging-port=9222
 * 用法: bun scripts/shot-scroll.ts <url> <outPrefix> [width]
 */
import { writeFileSync } from "node:fs";

interface CdpMsg {
  id?: number;
  error?: { message: string };
  result?: { data?: string; result?: { value?: string } };
}

async function main() {
  const [url, prefix, widthArg] = process.argv.slice(2);
  const width = Number(widthArg ?? 1440);
  const height = 900;

  const target = await (await fetch(`http://127.0.0.1:9222/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let seq = 0;
  const cdp = (method: string, params: object = {}): Promise<CdpMsg["result"]> =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      const onMsg = (ev: MessageEvent) => {
        const msg: CdpMsg = JSON.parse(String(ev.data));
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

  await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 640 });
  await cdp("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 3500));

  const hRes = await cdp("Runtime.evaluate", {
    expression: "String(document.documentElement.scrollHeight)",
    returnByValue: true,
  });
  const total = Number(hRes?.result?.value ?? height);
  const steps = Math.min(Math.ceil(total / height), 20);

  for (let i = 0; i < steps; i++) {
    await cdp("Runtime.evaluate", { expression: `window.scrollTo(0, ${i * height})` });
    await new Promise((r) => setTimeout(r, 1400)); // whileInView 动画跑完
    const shot = await cdp("Page.captureScreenshot", { format: "png" });
    const file = `${prefix}-${String(i).padStart(2, "0")}.png`;
    writeFileSync(file, Buffer.from(shot?.data ?? "", "base64"));
    console.log(`saved ${file} (scrollY=${i * height}/${total})`);
  }

  ws.close();
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
  process.exit(0);
}

main();
