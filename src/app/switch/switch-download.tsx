import { Section } from "@/components/site";
import {
  RELEASES_BASE,
  assetUrl,
  fetchReleaseManifest,
  formatDate,
  formatSize,
} from "@/lib/release-manifest";
import { CopyButton } from "./copy-button";

const MANIFEST_URL =
  process.env.NEXT_PUBLIC_SWITCH_MANIFEST_URL ??
  `${RELEASES_BASE}/lurus-switch/manifest.json`;

type ReleaseFile = {
  filename: string;
  size: number;
  sha256: string;
};

type SwitchManifest = {
  product: string;
  version: string;
  tag: string;
  buildDate: string;
  baseUrl: string;
  files: ReleaseFile[];
};

const PRIMARY_FILE = "lurus-switch-amd64-installer.exe";

// 已知文件的展示名与排序；清单里出现未知文件时按文件名原样列在最后。
const FILE_LABELS: Record<string, { label: string; note: string; order: number }> = {
  [PRIMARY_FILE]: { label: "Windows 安装程序", note: "x64 · 推荐", order: 0 },
  "lurus-switch-windows-amd64.exe": { label: "Windows 便携版", note: "x64 · 免安装，单文件运行", order: 1 },
  "lurus-switch-darwin-universal.zip": { label: "macOS", note: "Intel 与 Apple 芯片通用", order: 2 },
  "lurus-switch-linux-amd64": { label: "Linux", note: "x64", order: 3 },
};

function sortFiles(files: ReleaseFile[]) {
  return [...files].sort(
    (a, b) => (FILE_LABELS[a.filename]?.order ?? 99) - (FILE_LABELS[b.filename]?.order ?? 99),
  );
}

function SectionHeader() {
  return (
    <>
      <h2
        id="download-title"
        className="font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
      >
        下载
      </h2>
      <p className="mt-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">
        安装包信息读取自 releases.lurus.cn 的发布清单。
      </p>
    </>
  );
}

const rowClass =
  "flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--lt-rule)] py-3 font-mono text-sm";

export function SwitchDownloadSkeleton() {
  return (
    <Section id="download" labelledBy="download-title">
      <SectionHeader />
      <p role="status" className="mt-8 font-mono text-sm text-[var(--color-text-muted)]">
        正在获取安装包信息…
      </p>
    </Section>
  );
}

export async function SwitchDownloadSection() {
  const manifest = await fetchReleaseManifest<SwitchManifest>(MANIFEST_URL);
  const files = manifest && Array.isArray(manifest.files) ? sortFiles(manifest.files) : [];
  const isBeta = manifest?.version.toLowerCase().includes("beta") ?? false;

  return (
    <Section id="download" labelledBy="download-title">
      <SectionHeader />

      {manifest && files.length > 0 ? (
        <div className="mt-8">
          <p className="font-mono text-sm text-[var(--lt-ink)]">
            v{manifest.version}
            <span className="text-[var(--color-text-muted)]"> · {formatDate(manifest.buildDate)}</span>
          </p>
          {isBeta && (
            <p className="mt-2 text-sm leading-[1.8] text-[var(--color-text-secondary)]">
              当前是测试版（beta）：功能可用，但仍可能有未发现的问题。
            </p>
          )}

          <ul className="mt-6 border-t border-[var(--lt-rule)]">
            {files.map((f) => {
              const meta = FILE_LABELS[f.filename];
              const isPrimary = f.filename === PRIMARY_FILE;
              return (
                <li key={f.filename} className={rowClass}>
                  <a
                    href={assetUrl(manifest.baseUrl, f.filename)}
                    className={`underline underline-offset-4 hover:decoration-[var(--lt-accent)] ${
                      isPrimary
                        ? "font-semibold text-[var(--lt-ink)] decoration-[var(--lt-accent)]"
                        : "text-[var(--lt-ink)] decoration-[var(--lt-rule)]"
                    }`}
                  >
                    {meta?.label ?? f.filename}
                  </a>
                  <span className="text-[var(--color-text-muted)]">{formatSize(f.size)}</span>
                  {meta && (
                    <span className="font-sans text-[var(--color-text-secondary)]">{meta.note}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <details className="mt-6 text-xs text-[var(--color-text-muted)]">
            <summary className="cursor-pointer hover:text-[var(--lt-ink)]">SHA-256 校验</summary>
            <div className="mt-3 space-y-2 font-mono">
              {files.map((f) => (
                <div key={f.filename} className="break-all">
                  <span className="text-[var(--lt-ink)]">{f.filename}</span>
                  <span className="mx-1">·</span>
                  {f.sha256}
                  <CopyButton value={f.sha256} label={`复制 ${f.filename} 的 SHA-256`} />
                </div>
              ))}
            </div>
          </details>

          <p className="mt-6 text-sm leading-[1.8] text-[var(--color-text-secondary)]">
            目前只有 Windows 版经过启动验证；macOS 与 Linux 版只保证能构建，还没有做运行验证。
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
