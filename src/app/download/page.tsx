import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { DownloadCards } from "./cards";

export const metadata: Metadata = {
  title: "下载",
  description:
    "Lurus 桌面工具：Switch AI 网关 + Creator 内容工厂。Windows / macOS 一键安装。",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        highlight="桌面工具"
        title="AI 生产力套件"
        description="本地优先，离线可用。下载即用，无需配置服务器。"
      />
      <DownloadCards />
      <SystemRequirements />
    </>
  );
}

function SystemRequirements() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">系统要求</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
              Windows
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Windows 10 / 11 (64-bit)</li>
              <li>4 GB RAM</li>
              <li>200 MB 磁盘空间</li>
              <li>WebView2 Runtime</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
              macOS
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>macOS 12+ (Monterey)</li>
              <li>4 GB RAM</li>
              <li>200 MB 磁盘空间</li>
              <li>Apple Silicon / Intel</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
