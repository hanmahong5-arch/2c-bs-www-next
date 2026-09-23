import { Section } from "@/components/site";

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

// 段落抬头是纯静态的，骨架态照样能出 —— 抽出来给 Section 和 Skeleton 共用，
// 保证 fallback 与最终态的版式完全对齐（只有下方内容在变）。
function SectionHeader() {
  return (
    <>
      <h2
        id="lutu-title"
        className="font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
      >
        路途 Lutu · Android
      </h2>
      <p className="mt-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">
        移动端客户端。安装包信息读取自 releases.lurus.cn 的发布清单。
      </p>
    </>
  );
}

const rowClass =
  "flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--lt-rule)] py-3 font-mono text-sm";

// Suspense fallback：manifest 走的是外部 releases.lurus.cn 的服务端 fetch，
// 不该让 /download 的其余内容陪着一起等。见 page.tsx 的 <Suspense>。
export function LutuAndroidSkeleton() {
  return (
    <Section labelledBy="lutu-title">
      <SectionHeader />
      <p
        role="status"
        className="mt-8 font-mono text-sm text-[var(--color-text-muted)]"
      >
        正在获取安装包信息…
      </p>
    </Section>
  );
}

export async function LutuAndroidSection() {
  const manifest = await fetchManifest();

  return (
    <Section labelledBy="lutu-title">
      <SectionHeader />

      {manifest ? (
        <div className="mt-8">
          <p className="font-mono text-sm text-[var(--lt-ink)]">
            v{manifest.version}
            <span className="text-[var(--color-text-muted)]">
              {" "}
              · build {manifest.buildNumber} · {formatDate(manifest.buildDate)}
            </span>
          </p>

          <ul className="mt-6 border-t border-[var(--lt-rule)]">
            {manifest.abis.map((a) => {
              const isPrimary = a.abi === manifest.primaryAbi;
              return (
                <li key={a.abi} className={rowClass}>
                  <a
                    href={`${manifest.baseUrl}${a.filename}`}
                    className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
                  >
                    {a.abi}
                  </a>
                  <span className="text-[var(--color-text-muted)]">
                    {formatSize(a.size)}
                  </span>
                  <span className="font-sans text-[var(--color-text-secondary)]">
                    {ABI_NOTES[a.abi] ?? ""}
                    {isPrimary ? "（默认）" : ""}
                  </span>
                </li>
              );
            })}
          </ul>

          <details className="mt-6 text-xs text-[var(--color-text-muted)]">
            <summary className="cursor-pointer hover:text-[var(--lt-ink)]">
              SHA-256 校验
            </summary>
            <div className="mt-3 space-y-1.5 font-mono">
              {manifest.abis.map((a) => (
                <div key={a.abi} className="break-all">
                  <span className="text-[var(--lt-ink)]">{a.abi}</span>
                  <span className="mx-1">·</span>
                  {a.sha256}
                </div>
              ))}
            </div>
          </details>

          <p className="mt-6 text-sm leading-[1.8] text-[var(--color-text-secondary)]">
            安装时需要在系统设置里允许安装未知来源的应用。不确定选哪个？多数手机选
            arm64-v8a。
          </p>
        </div>
      ) : (
        <div className="mt-8 text-sm text-[var(--color-text-muted)]">
          <p>安装包信息暂时无法获取，请稍后再试。</p>
          <p className="mt-2 font-mono text-xs">manifest: {MANIFEST_URL}</p>
        </div>
      )}
    </Section>
  );
}
