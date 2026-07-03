import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { updates } from "./updates-data";

export const metadata: Metadata = {
  title: "更新日志",
  description: "Lurus 产品更新日志 — 新功能、改进和修复。",
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        highlight="更新日志"
        title="产品动态"
        description="了解 Lurus 最新的功能更新、改进和修复。"
      />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-8">
            {updates.map((entry, i) => (
              <article key={i} className="card p-6 relative">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-[var(--color-text-muted)] font-mono">
                    {entry.date}
                  </time>
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-ochre)]/20 text-[var(--color-ochre)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  {entry.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {entry.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              更多历史更新请查看{" "}
              <a
                href="https://docs.lurus.cn/changelog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ochre)] hover:underline"
              >
                文档站更新日志
                <span className="inline-block ml-0.5 opacity-40 text-[10px]">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
