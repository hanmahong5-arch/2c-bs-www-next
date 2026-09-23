import type { Metadata } from "next";
import { Eyebrow, Lead, Section } from "@/components/site";
import { updates } from "./updates-data";

// 更新日志是历史记录：条目内容（updates-data.ts）按当时的原文保留，不回改事实。
// 这里只调整页面标题与导语。

export const metadata: Metadata = {
  title: "更新日志",
  description: "LurusTech 过往的产品更新记录，按时间倒序。",
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  return (
    <>
      <section aria-labelledby="blog-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-16 pt-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>更新日志</Eyebrow>
            <h1
              id="blog-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              更新日志
            </h1>
            <Lead className="mt-7">
              过往的更新记录，按时间倒序。条目保留当时的原文，
              其中的活动与说法以当时为准，不代表现状。
            </Lead>
          </div>
        </div>
      </section>

      <Section labelledBy="blog-title">
        <ol className="border-t border-[var(--lt-rule)]">
          {updates.map((entry, i) => (
            <li key={i} className="border-b border-[var(--lt-rule)] py-6">
              <article>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs text-[var(--color-text-muted)]">
                  <time>{entry.date}</time>
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[var(--lt-ink)]">
                  {entry.title}
                </h2>
                <p className="mt-2 text-sm leading-[1.8] text-[var(--color-text-secondary)]">
                  {entry.desc}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-[var(--color-text-muted)]">
          更早的记录见{" "}
          <a
            href="https://docs.lurus.cn/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            文档站更新日志 ↗
          </a>
        </p>
      </Section>
    </>
  );
}
