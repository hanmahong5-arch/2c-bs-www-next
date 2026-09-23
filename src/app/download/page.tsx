import { Suspense } from "react";
import type { Metadata } from "next";
import { Eyebrow, Lead } from "@/components/site";
import { LutuAndroidSection, LutuAndroidSkeleton } from "./lutu-android";

export const metadata: Metadata = {
  title: "下载",
  description: "已发布的客户端安装包。这些客户端当前不在主动开发中。",
};

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
              已发布的客户端
            </h1>
            <Lead className="mt-7">
              以下为已发布的客户端，当前不在主动开发中。
            </Lead>
          </div>
        </div>
      </section>
      {/* 只有这一段依赖外部 releases.lurus.cn 的 manifest；用 Suspense 圈住，
          releases 慢/挂时页面其余部分照常先出，不被一个外部依赖拖成整页白屏。 */}
      <Suspense fallback={<LutuAndroidSkeleton />}>
        <LutuAndroidSection />
      </Suspense>
    </>
  );
}
