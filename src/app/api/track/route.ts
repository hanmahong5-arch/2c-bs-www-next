// 第一方转化埋点接收端 (phase-1)：校验 + 结构化单行日志，不落 cookie/IP/PII。
// 日志可由日志侧采集检索；phase-2 再接持久化/看板，无需改客户端契约。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 2048;
const ALLOWED_EVENTS = new Set(["cta_click", "page_view", "outbound"]);
const MAX_KEY = 32;
const MAX_VAL = 128;

export async function POST(req: Request): Promise<Response> {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BYTES) return new Response(null, { status: 413 });

    const data = JSON.parse(raw) as {
      event?: unknown;
      props?: unknown;
      path?: unknown;
    };

    const event = typeof data.event === "string" ? data.event.slice(0, 64) : "";
    if (!ALLOWED_EVENTS.has(event)) return new Response(null, { status: 400 });

    // 仅保留白名单标量字段并截断，剔除潜在 PII。
    const props: Record<string, string> = {};
    if (data.props && typeof data.props === "object") {
      for (const [k, v] of Object.entries(data.props as Record<string, unknown>)) {
        if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
          props[String(k).slice(0, MAX_KEY)] = String(v).slice(0, MAX_VAL);
        }
      }
    }

    console.log(
      JSON.stringify({
        log: "track",
        event,
        path: typeof data.path === "string" ? data.path.slice(0, 128) : "",
        props,
        ref: req.headers.get("referer")?.slice(0, 128) ?? "",
        at: new Date().toISOString(),
      })
    );

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
