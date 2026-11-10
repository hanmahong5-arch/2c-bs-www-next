import {
  EVIDENCE_REPORT_NON_CLAIMS,
  EVIDENCE_REPORT_RECORDS,
  EVIDENCE_REPORT_UNCLAIMED_LABEL,
  evidenceReportFieldRows,
  type EvidenceReportInput,
} from "@/lib/evidence-report";
import { ScopeSplit } from "./scope-split";

export interface EvidenceReportProps {
  /** 公开页不传。传入只用于把某一栏写成已填的字；空着的栏仍是留空。 */
  input?: EvidenceReportInput;
  className?: string;
}

/**
 * 月度证据报告的留空样子。发丝行，无填充、无阴影、无圆角。
 * 栏位下面用 ScopeSplit：报告写下什么，不声称什么。
 */
export function EvidenceReport({ input, className = "" }: EvidenceReportProps) {
  const rows = evidenceReportFieldRows(input);
  return (
    <div className={className}>
      <div className="border-t border-[var(--lt-rule)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-x-8 gap-y-1 border-b border-[var(--lt-rule)] py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
          >
            <div className="font-mono text-[12px] leading-[1.7] text-[var(--color-text-muted)]">{row.label}</div>
            <div className="text-[15px] leading-[1.7] text-[var(--lt-ink)]">{row.value}</div>
          </div>
        ))}
        <div className="grid gap-x-8 gap-y-1 border-b border-[var(--lt-rule)] py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
          <div className="font-mono text-[12px] leading-[1.7] text-[var(--color-text-muted)]">
            {EVIDENCE_REPORT_UNCLAIMED_LABEL}
          </div>
          <ul className="text-[15px] leading-[1.7] text-[var(--lt-ink)]">
            {EVIDENCE_REPORT_NON_CLAIMS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] leading-[1.6] text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="text-[var(--lt-accent)]">
          ●
        </span>{" "}
        示例 · 栏位留空，不是某一个月的报告
      </p>
      <ScopeSplit className="mt-10" included={EVIDENCE_REPORT_RECORDS} excluded={EVIDENCE_REPORT_NON_CLAIMS} />
    </div>
  );
}
