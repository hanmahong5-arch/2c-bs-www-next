// hub.lurus.cn 公开模型价目（GET /api/v1/models，OpenRouter 同形，无需登录）的读取与格式化。
// /hub/pricing 用：服务端 fetch + ISR，失败返回 null，由调用方渲染降级文案。
// 只读接口给出的数，不在本站另存一份价格 —— 改价在 Hub 管理台生效，这里最多晚一个刷新周期。

import { fetchReleaseManifest } from "@/lib/release-manifest";

export const HUB_BASE = "https://hub.lurus.cn";

export const HUB_MODELS_URL =
  process.env.NEXT_PUBLIC_HUB_MODELS_URL ?? `${HUB_BASE}/api/v1/models`;

/** 每行只取本页用到的字段；lurus.* 是 Hub 在 OpenRouter 形状之外附加的人民币价。 */
export type HubModel = {
  id: string;
  lurus?: {
    vendor?: string;
    group?: string;
    /** 每百万输入 token 的钱包扣费（元） */
    prompt_cny_per_mtok?: number;
    /** 每百万输出 token 的钱包扣费（元） */
    completion_cny_per_mtok?: number;
    /** 按次计价模型的每次扣费（元） */
    request_cny?: number;
  };
};

export type HubModelRow = {
  id: string;
  vendor: string;
  promptPerMTok: number;
  completionPerMTok: number;
  perRequest: number;
};

export async function fetchHubModels(revalidate = 300): Promise<HubModelRow[] | null> {
  const body = await fetchReleaseManifest<{ data?: HubModel[] }>(HUB_MODELS_URL, revalidate);
  if (!body || !Array.isArray(body.data)) return null;
  return body.data
    .filter((m) => typeof m.id === "string" && m.lurus)
    .map((m) => ({
      id: m.id,
      vendor: m.lurus?.vendor ?? "",
      promptPerMTok: num(m.lurus?.prompt_cny_per_mtok),
      completionPerMTok: num(m.lurus?.completion_cny_per_mtok),
      perRequest: num(m.lurus?.request_cny),
    }))
    .filter((r) => r.promptPerMTok > 0 || r.completionPerMTok > 0 || r.perRequest > 0)
    .sort((a, b) => a.vendor.localeCompare(b.vendor) || a.id.localeCompare(b.id));
}

function num(v: unknown) {
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 0;
}

/** ¥ 金额：≥1 保留两位，<1 保留到两位有效数字（最多 4 位小数）；0 显示为「—」。 */
export function formatCNY(v: number) {
  if (v <= 0) return "—";
  if (v >= 1) return `¥${v.toFixed(2)}`;
  const digits = Math.min(4, Math.max(2, 1 - Math.floor(Math.log10(v))));
  return `¥${v.toFixed(digits)}`;
}
