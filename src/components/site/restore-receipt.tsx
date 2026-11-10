import {
  RESTORE_RECEIPT_NON_CLAIMS,
  RESTORE_RECEIPT_RECORDS,
  RESTORE_RECEIPT_UNCLAIMED_LABEL,
  restoreReceiptFieldRows,
  type RestoreReceiptInput,
} from "@/lib/restore-receipt";
import { ScopeSplit } from "./scope-split";

export interface RestoreReceiptProps {
  /** 公开页不传。传入只用于把某一栏写成已填的字；空着的栏仍是留空。 */
  input?: RestoreReceiptInput;
  className?: string;
}

/**
 * 恢复演练回执的留空样子。发丝行，无填充、无阴影、无圆角。
 * 栏位下面用 ScopeSplit：回执写下什么，不声称什么。
 */
export function RestoreReceipt({ input, className = "" }: RestoreReceiptProps) {
  const rows = restoreReceiptFieldRows(input);
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
            {RESTORE_RECEIPT_UNCLAIMED_LABEL}
          </div>
          <ul className="text-[15px] leading-[1.7] text-[var(--lt-ink)]">
            {RESTORE_RECEIPT_NON_CLAIMS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] leading-[1.6] text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="text-[var(--lt-accent)]">
          ●
        </span>{" "}
        示例 · 栏位留空，不是某一次演练
      </p>
      <ScopeSplit className="mt-10" included={RESTORE_RECEIPT_RECORDS} excluded={RESTORE_RECEIPT_NON_CLAIMS} />
    </div>
  );
}
