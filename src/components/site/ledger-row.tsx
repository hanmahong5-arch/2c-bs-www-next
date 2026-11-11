import { NewWindowNote } from "@/components/site/new-window-note";

export interface LedgerRowProps {
  href: string;
  /** 行首，如「写第一封邮件」 */
  label: string;
  /** 行尾附注，如「不报价，不收集密码」 */
  meta: string;
  className?: string;
}

/**
 * 纸面账行：一行链接，左标签、右附注、末尾 ↗。
 * 边用已经量过的灰色。发丝线在纸面上只有 1.35:1。悬停时边改成墨色。
 * 无填充、无阴影、无圆角、无光晕。整行可点。
 */
export function LedgerRow({ href, label, meta, className = "" }: LedgerRowProps) {
  const external = href.startsWith("https://") || href.startsWith("http://");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-[var(--color-text-muted)] py-3 text-[var(--lt-ink)] no-underline outline-offset-4 hover:border-[var(--lt-ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--lt-ink)] ${className}`}
    >
      <span className="min-w-0 text-[15px] leading-[1.6]">{label}</span>
      <span className="ml-auto flex shrink-0 items-baseline gap-x-4">
        <span className="font-mono text-[12px] leading-[1.6] text-[var(--color-text-muted)]">{meta}</span>
        <span aria-hidden="true" className="text-[13px] leading-none text-[var(--color-text-muted)]">
          ↗
        </span>
      </span>
      {external ? <NewWindowNote /> : null}
    </a>
  );
}
