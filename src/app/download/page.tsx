import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Lead, Section } from "@/components/site";
import { LutuAndroidSection, LutuAndroidSkeleton } from "./lutu-android";

export const metadata: Metadata = {
  title: "下载",
  description: "Switch 桌面客户端，以及已归档、不在主动开发中的历史客户端。",
};

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

export default function DownloadPage() {
  return (
    <>
      <section aria-labelledby="download-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-16 pt-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>下载</Eyebrow>
            <h1
              id="download-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              客户端下载
            </h1>
            <Lead className="mt-7">
              正在维护的桌面客户端是 Switch；下面另有已归档、不在主动开发中的历史包。
            </Lead>
          </div>
        </div>
      </section>

      <Section id="switch" labelledBy="switch-title">
        <Eyebrow>在维护</Eyebrow>
        <h2
          id="switch-title"
          className="mt-3 font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
        >
          Switch — 桌面 AI CLI 管家
        </h2>
        <Lead className="mt-6">
          Windows 版可下载：配置、代理、MCP、快照与账单，在一处管多个 AI 编程 CLI。
        </Lead>
        <p className="mt-6 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Link href="/switch" className={linkClass}>
            前往 Switch 介绍与下载 →
          </Link>
        </p>
      </Section>

      {/* 只有这一段依赖外部 releases.lurus.cn 的 manifest；用 Suspense 圈住，
          releases 慢/挂时页面其余部分照常先出，不被一个外部依赖拖成整页白屏。 */}
      <Suspense fallback={<LutuAndroidSkeleton />}>
        <LutuAndroidSection />
      </Suspense>
    </>
  );
}
