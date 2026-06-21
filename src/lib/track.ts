// 第一方转化埋点 — 无 cookie、无第三方 JS、不采集 PII。
// 事件经 navigator.sendBeacon 发往同源 /api/track，服务端结构化落日志 (phase-1)。
// 后续可在服务端接持久化 + 看板 (phase-2)，客户端契约保持不变。
export type TrackProps = Record<string, string | number | boolean>;

const ENDPOINT = "/api/track";

export function track(event: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      event,
      props: props ?? {},
      path: window.location.pathname,
    });
    // sendBeacon 在页面卸载/跳转时仍可靠送达；不可用时回退 fetch keepalive。
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      void fetch(ENDPOINT, {
        method: "POST",
        body: payload,
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    // 埋点失败绝不影响用户操作 — 静默吞掉。
  }
}
