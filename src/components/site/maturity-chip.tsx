/** 成熟度只允许这四个固定文案；拿不准时选更保守的那个。 */
export const MATURITY_LEVELS = ["设计中", "早期试点", "内部生产使用", "开源"] as const;
export type Maturity = (typeof MATURITY_LEVELS)[number];

export interface MaturityChipProps {
  level: Maturity;
  className?: string;
}

/** 成熟度标注：细边框等宽小字，不用强调色。 */
export function MaturityChip({ level, className = "" }: MaturityChipProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-sm border border-[var(--lt-rule)] px-1.5 py-px align-middle font-mono text-[11px] leading-5 text-[var(--color-text-muted)] ${className}`}
    >
      <span className="sr-only">成熟度：</span>
      {level}
    </span>
  );
}
