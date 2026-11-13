import type { ReactNode } from "react";

export interface LineageFact {
  label: string;
  value: ReactNode;
}

export interface LineageProps {
  /** 本产品名 */
  product: string;
  facts: readonly LineageFact[];
  /** 许可义务与边界，放在事实表下 */
  note?: ReactNode;
  className?: string;
}

/**
 * 开源谱系：上游 / 许可 / 我们加了什么。
 * 学 GitLab、Cal.com、PostHog 的 fork 说明，收成可扫读的定义表，不另做营销卡。
 */
export function Lineage({ product, facts, note, className = "" }: LineageProps) {
  return (
    <figure className={className}>
      <figcaption className="sr-only">{product} 的开源谱系</figcaption>
      <dl className="border-y border-[var(--lt-rule)]">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid gap-1 border-b border-[var(--lt-rule)] py-3 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              {fact.label}
            </dt>
            <dd className="text-[15px] leading-[1.7] text-[var(--lt-ink)]">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {note ? (
        <p className="mt-4 text-[13px] leading-[1.7] text-[var(--color-text-muted)]">{note}</p>
      ) : null}
    </figure>
  );
}
