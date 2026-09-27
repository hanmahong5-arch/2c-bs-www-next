// releases.lurus.cn 发布清单的共享读取与格式化。
// /download（Lutu）与 /switch 共用：服务端 fetch + ISR，失败一律返回 null，
// 由调用方渲染降级文案，页面其余部分不受外部依赖影响。

export const RELEASES_BASE = "https://releases.lurus.cn";

/** 服务端读取一份发布清单；网络错误、非 2xx、JSON 解析失败都返回 null。 */
export async function fetchReleaseManifest<T>(
  url: string,
  revalidate = 60,
): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

/** baseUrl + filename，容忍 baseUrl 缺尾斜杠。 */
export function assetUrl(baseUrl: string, filename: string) {
  return `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}${filename}`;
}
