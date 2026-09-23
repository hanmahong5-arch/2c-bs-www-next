import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { MaturityChip, type Maturity } from "./maturity-chip";
import { EvidenceLine, type EvidenceLineProps } from "./evidence-line";

export interface ProductHeaderProps {
  /** 产品名，如 "Lurus Witness · 见证" */
  name: string;
  /** 一句话定位 */
  tagline: ReactNode;
  maturity: Maturity;
  /** 名称上方的小标签，默认 "构件" */
  eyebrow?: string;
  /** 可选：一行证据样例 */
  evidence?: EvidenceLineProps;
  /** 可选：证据样例下的小注，默认 "示例" */
  evidenceCaption?: ReactNode;
  /** 可选：补充一行（如许可声明） */
  note?: ReactNode;
}

/** 产品页顶部（含页面唯一 <h1>）：名称、成熟度、一句话、可选证据样例。无动效，首屏直接可见。 */
export function ProductHeader({
  name,
  tagline,
  maturity,
  eyebrow = "构件",
  evidence,
  evidenceCaption = "示例",
  note,
}: ProductHeaderProps) {
  return (
    <div className="px-6">
      <div className="mx-auto max-w-5xl pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="max-w-[44rem]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[3rem]">
              {name}
            </h1>
            <MaturityChip level={maturity} />
          </div>
          <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.8] text-[var(--color-text-secondary)] md:text-lg">
            {tagline}
          </p>
          {note && (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">{note}</p>
          )}
        </div>
        {evidence && (
          <figure className="mt-10">
            <div className="border-y border-[var(--lt-rule)] py-2.5">
              <EvidenceLine {...evidence} />
            </div>
            <figcaption className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">
              {evidenceCaption}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
