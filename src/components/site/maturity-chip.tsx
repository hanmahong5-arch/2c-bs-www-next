/** 成熟度只允许这四个固定文案；拿不准时选更保守的那个。 */
export const MATURITY_LEVELS = ["设计中", "早期试点", "内部生产使用", "开源"] as const;
export type Maturity = (typeof MATURITY_LEVELS)[number];

export interface MaturityChipProps {
  level: Maturity;
  className?: string;
}

/** 成熟度标注：等宽小字，边用已经量过的灰色。发丝线在纸面上只有 1.35:1。不用强调色。 */
export function MaturityChip({ level, className = "" }: MaturityChipProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap border border-[var(--color-text-muted)] px-1.5 py-px align-middle font-mono text-[11px] leading-5 text-[var(--color-text-muted)] ${className}`}
    >
      <span className="sr-only">成熟度：</span>
      {level}
    </span>
  );
}
