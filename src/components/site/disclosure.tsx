import type { ReactNode } from "react";

export interface DisclosureProps {
  /** 收起时可见的一句话 */
  summary: ReactNode;
  /** 展开后的细节（两三行为宜） */
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
  className?: string;
}

/**
 * 渐进展开：原生 <details>/<summary>，无需 JS，键盘 Enter/Space 可切换。
 * 顶部细线 + 右侧小箭头（展开时旋转 90°，尊重减弱动态效果）。
 * 连续排列时，最后一个自动补一条底线。
 */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  id,
  className = "",
}: DisclosureProps) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className={`group border-t border-[var(--lt-rule)] last:border-b ${className}`}
    >
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-4 text-[var(--lt-ink)] outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-[var(--lt-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lt-paper)] [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">{summary}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="h-3 w-3 shrink-0 translate-y-0.5 text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
        >
          <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </summary>
      <div className="pb-5 pr-7 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
        {children}
      </div>
    </details>
  );
}
