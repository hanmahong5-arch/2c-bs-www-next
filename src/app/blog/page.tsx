import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Lead, Section } from "@/components/site";
import { NewWindowNote } from "@/components/site/new-window-note";
import { changelogAnchor } from "@/lib/changelog-rss";
import { blogPageMetadata } from "./blog-metadata";
import { filterUpdates } from "./filter-updates";
import { updates, type ChangelogEntry } from "./updates-data";

// 更新日志是历史记录：条目内容（updates-data.ts）按当时的原文保留，不回改事实。
// 这一页只做纸面索引：按月锚点，以及 ?tag= 的服务端筛选。不在客户端过滤。

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { tag } = await searchParams;
  const activeTag = readTag(tag);
  return blogPageMetadata(activeTag, filterUpdates(updates, activeTag).length);
}

type BlogPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

function readTag(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return raw;
}

function unique(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function groupByMonth(entries: readonly ChangelogEntry[]): { month: string; entries: ChangelogEntry[] }[] {
  const groups: { month: string; entries: ChangelogEntry[] }[] = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last?.month === entry.date) last.entries.push(entry);
    else groups.push({ month: entry.date, entries: [entry] });
  }
  return groups;
}

function tagHref(tag: string | null): string {
  if (!tag) return "/blog";
  return `/blog?tag=${encodeURIComponent(tag)}`;
}

const hair =
  "inline-block border-b pb-px font-mono text-[12px] leading-none";
const hairIdle =
  "border-[var(--color-text-muted)] text-[var(--color-text-muted)] hover:border-[var(--lt-ink)] hover:text-[var(--lt-ink)]";
const hairOn = "border-[var(--lt-ink)] text-[var(--lt-ink)]";

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const activeTag = readTag(tag);
  const visible = filterUpdates(updates, activeTag);
  const tagKnown = activeTag === null || visible.length > 0;

  const months = unique(updates.map((entry) => entry.date));
  const tags = unique(updates.flatMap((entry) => entry.tags));
  const monthsInView = new Set(visible.map((entry) => entry.date));
  const oldest = months[months.length - 1];
  const newest = months[0];
  const span = oldest && newest && oldest !== newest ? `${oldest} — ${newest}` : (newest ?? "");
  const groups = groupByMonth(visible);

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
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] leading-[1.7]">
              <a
                href="/blog.md"
                className="text-[var(--color-text-muted)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-ink)]"
              >
                同一份日志的纯文本
              </a>
              <a
                href="/blog/rss.xml"
                className="text-[var(--color-text-muted)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-ink)]"
              >
                订阅源
              </a>
            </p>
          </div>
        </div>
      </section>

      <Section width="wide" labelledBy="blog-title">
        <div className="divide-y divide-[var(--lt-rule)] border-y border-[var(--lt-rule)]">
          <div className="flex items-baseline justify-between gap-4 py-3 font-mono text-[11px] tracking-[0.16em] text-[var(--color-text-muted)]">
            <span>Lurus · 日志</span>
            <span>{span}</span>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[4.5rem_1fr] sm:items-baseline sm:gap-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--color-text-muted)]">月份</p>
            <nav aria-label="按月份" className="flex flex-wrap gap-x-4 gap-y-2">
              {months.map((month) => (
                <a
                  key={month}
                  href={monthsInView.has(month) ? `#${month}` : `/blog#${month}`}
                  className={`${hair} ${hairIdle}`}
                >
                  {month}
                </a>
              ))}
            </nav>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[4.5rem_1fr] sm:items-baseline sm:gap-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--color-text-muted)]">标记</p>
            <nav aria-label="按标记" className="flex flex-wrap gap-x-4 gap-y-2">
              <Link
                href={tagHref(null)}
                aria-current={activeTag === null ? "page" : undefined}
                className={`${hair} ${activeTag === null ? hairOn : hairIdle}`}
              >
                全部
              </Link>
              {tags.map((item) => {
                const on = activeTag === item;
                return (
                  <Link
                    key={item}
                    href={tagHref(item)}
                    aria-current={on ? "page" : undefined}
                    className={`${hair} ${on ? hairOn : hairIdle}`}
                  >
                    {item}
                  </Link>
                );
              })}
            </nav>
          </div>

          {activeTag !== null && !tagKnown ? (
            <div className="py-8">
              <p className="font-mono text-[12px] text-[var(--color-text-muted)]">{activeTag}</p>
              <p className="mt-3 text-[15px] leading-[1.8] text-[var(--lt-ink)]">日志里没有这个标记</p>
            </div>
          ) : (
            groups.map((group) => (
              <section key={group.month} aria-labelledby={group.month}>
                <h2
                  id={group.month}
                  className="scroll-mt-20 py-3 font-mono text-[12px] tracking-[0.14em] text-[var(--lt-ink)]"
                >
                  <time dateTime={group.month}>{group.month}</time>
                </h2>
                <ol className="border-t border-[var(--lt-rule)]">
                  {group.entries.map((entry) => (
                    <li key={entry.title} className="border-b border-[var(--lt-rule)] py-6 last:border-b-0">
                      <article className="grid gap-y-3 md:grid-cols-[7.5rem_1fr] md:gap-x-8">
                        <a
                          href={`#${changelogAnchor(entry)}`}
                          aria-label={`这条日志：${entry.title}`}
                          className="font-mono text-[12px] text-[var(--color-text-muted)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-ink)]"
                        >
                          <time dateTime={entry.date}>{entry.date}</time>
                        </a>
                        <div>
                          <h3
                            id={changelogAnchor(entry)}
                            className="scroll-mt-20 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--lt-ink)]"
                          >
                            {entry.title}
                          </h3>
                          <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                            {entry.desc}
                          </p>
                          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                            {entry.tags.map((item) => (
                              <Link key={item} href={tagHref(item)} className={`${hair} ${hairIdle}`}>
                                {item}
                              </Link>
                            ))}
                          </p>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ))
          )}
        </div>

        <p className="mt-10 text-sm text-[var(--color-text-muted)]">
          产品使用说明见{" "}
          <a
            href="https://docs.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]"
          >
            docs.lurus.cn ↗
            <NewWindowNote />
          </a>
          。
        </p>
      </Section>
    </>
  );
}
