import { DevicePhoneMobileIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const MANIFEST_URL =
  process.env.NEXT_PUBLIC_LUTU_MANIFEST_URL ??
  "https://releases.lurus.cn/lutu/manifest.json";

type ApkAsset = {
  abi: string;
  filename: string;
  size: number;
  sha256: string;
};

type LutuManifest = {
  product: string;
  version: string;
  buildNumber: number;
  buildDate: string;
  primaryAbi: string;
  abis: ApkAsset[];
  baseUrl: string;
};

const ABI_NOTES: Record<string, string> = {
  "arm64-v8a": "现代 Android 手机（推荐）",
  "armeabi-v7a": "老款 32 位设备",
  "x86_64": "Android 模拟器",
};

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(iso: string) {
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

async function fetchManifest(): Promise<LutuManifest | null> {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as LutuManifest;
  } catch {
    return null;
  }
}

export async function LutuAndroidSection() {
  const manifest = await fetchManifest();

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
            <DevicePhoneMobileIcon className="w-3.5 h-3.5" />
            移动端
          </div>
          <h2 className="text-3xl font-bold mb-3">
            路途 Lutu · <span className="text-gradient-gold">Android</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            一个 APP 把 Lurus 全家桶装进口袋：AI 对话、量化看盘、钱包、签到。
            支持联网搜索、AI 记忆、5 槽自定义底栏。
          </p>
        </div>

        {manifest ? (
          <div className="card p-8">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="text-2xl font-bold">v{manifest.version}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                  build {manifest.buildNumber} · {formatDate(manifest.buildDate)}
                </div>
              </div>
              <a
                href={`${manifest.baseUrl}${
                  manifest.abis.find((a) => a.abi === manifest.primaryAbi)
                    ?.filename ?? manifest.abis[0]?.filename
                }`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold text-black text-sm font-semibold hover:opacity-90 transition"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                下载（{manifest.primaryAbi}）
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {manifest.abis.map((a) => {
                const isPrimary = a.abi === manifest.primaryAbi;
                return (
                  <a
                    key={a.abi}
                    href={`${manifest.baseUrl}${a.filename}`}
                    className={`block p-4 rounded-xl border transition hover:border-[var(--color-ochre)]/50 ${
                      isPrimary
                        ? "border-[var(--color-ochre)]/30 bg-[var(--color-ochre)]/5"
                        : "border-[var(--color-border)]"
                    }`}
                  >
                    <div className="font-mono text-sm font-semibold">{a.abi}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                      {ABI_NOTES[a.abi] ?? ""}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-2">
                      {formatSize(a.size)}
                    </div>
                  </a>
                );
              })}
            </div>

            <details className="text-xs text-[var(--color-text-muted)]">
              <summary className="cursor-pointer hover:text-[var(--color-text-primary)] transition">
                SHA-256 校验
              </summary>
              <div className="mt-3 space-y-1.5 font-mono">
                {manifest.abis.map((a) => (
                  <div key={a.abi} className="break-all">
                    <span className="text-[var(--color-text-primary)]">{a.abi}</span>
                    <span className="mx-1">·</span>
                    {a.sha256}
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-6 pt-5 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-text-primary)]">
                安装提示：
              </span>{" "}
              下载后在系统设置允许&ldquo;未知来源应用&rdquo;；首次安装可能弹安全警告，确认即可。
              不确定 ABI？大多数手机选 arm64-v8a。
            </div>
          </div>
        ) : (
          <div className="card p-8 text-center text-[var(--color-text-muted)]">
            <DevicePhoneMobileIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Android APK 暂时无法获取，请稍后再试。</p>
            <p className="text-xs mt-2 opacity-60">manifest: {MANIFEST_URL}</p>
          </div>
        )}
      </div>
    </section>
  );
}
