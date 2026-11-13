export interface ScopeSplitProps {
  included: readonly string[];
  excluded: readonly string[];
  className?: string;
}

/**
 * 价目诚实框：包含 / 不包含两列细线表。
 * 学 Resend「只卖这一种」、PlanetScale 的 not-included 栏，不用三档会员卡。
 */
export function ScopeSplit({ included, excluded, className = "" }: ScopeSplitProps) {
  return (
    <div className={`grid gap-10 sm:grid-cols-2 ${className}`}>
      <ScopeColumn title="包含" items={included} />
      <ScopeColumn title="不包含" items={excluded} />
    </div>
  );
}

function ScopeColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <ul className="mt-3 border-t border-[var(--lt-rule)]">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-[var(--lt-rule)] py-3 text-[15px] leading-[1.7] text-[var(--lt-ink)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
