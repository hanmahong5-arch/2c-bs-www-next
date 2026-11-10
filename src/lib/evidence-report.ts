/**
 * 月度证据报告的留空样子。
 * 栏位名称是一份月报会写的那些；公开页不填某一个月的结果。
 * 不写可用率百分比，不写客户名，这不是合同，也不代替演练回执。
 */

export type EvidenceReportInput = {
  /** 这一份覆盖的月份。空着表示这张是留空示例。 */
  period?: string | null;
  /** 这个月实际跑过的检查。 */
  ran?: string | null;
  /** 对照了哪些读数。 */
  checked?: string | null;
  /** 仍未关闭的失败。空着不写成没有问题。 */
  failedOpen?: string | null;
  /** 签字的角色。不写人名。 */
  signedBy?: string | null;
};

export const EVIDENCE_REPORT_BLANK = "（留空）";

export const EVIDENCE_REPORT_INTRO =
  "这是每月一份证据报告的留空样子。栏位名称是真的；下面留空，不是某一个月的结果。";

export const EVIDENCE_REPORT_FIELD_DEFS = [
  { key: "period", label: "报告期", hint: "覆盖的月份。示例不填某一月。" },
  { key: "ran", label: "跑了什么", hint: "这个月实际跑过的检查。不写客户名。" },
  { key: "checked", label: "核对了什么", hint: "对照了哪些读数。没采到的样本不写成成功。" },
  { key: "failedOpen", label: "失败仍开着", hint: "仍未关闭的失败。没有也不要写成没有问题。" },
  { key: "signedBy", label: "谁签了这份说明", hint: "签字的角色。不写人名。" },
] as const satisfies readonly {
  key: keyof EvidenceReportInput;
  label: string;
  hint: string;
}[];

/** 报告允许写下的栏。具体句子不另造客户、月份或可用率。 */
export const EVIDENCE_REPORT_RECORDS: readonly string[] = [
  "报告期：覆盖的月份。",
  "跑了什么：这个月实际跑过的检查。",
  "核对了什么：对照了哪些读数。",
  "失败仍开着：仍未关闭的失败。",
  "谁签了这份说明：签字的角色。不写人名。",
];

export const EVIDENCE_REPORT_NON_CLAIMS = [
  "不写可用率百分比。",
  "不写客户名。",
  "这不是合同。",
  "这不代替演练回执。",
] as const;

export const EVIDENCE_REPORT_UNCLAIMED_LABEL = "不声称";

export interface EvidenceReportRow {
  label: string;
  /** 留空时是「（留空） · 说明」；写了则只有写下的字，不附说明。 */
  value: string;
  blank: boolean;
}

function written(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export function evidenceReportFieldRows(input: EvidenceReportInput = {}): EvidenceReportRow[] {
  return EVIDENCE_REPORT_FIELD_DEFS.map((def) => {
    const value = written(input[def.key]);
    if (!value) {
      return { label: def.label, value: `${EVIDENCE_REPORT_BLANK} · ${def.hint}`, blank: true };
    }
    return { label: def.label, value, blank: false };
  });
}

export function evidenceReportUnclaimedValue(): string {
  return EVIDENCE_REPORT_NON_CLAIMS.join("");
}

/**
 * 月报的纯文本。缺省、空白、null 的栏都保持留空。
 * 不声称的四句始终在，不随栏位被盖掉。
 */
export function renderEvidenceReportMarkdown(input: EvidenceReportInput = {}): string {
  const fields = evidenceReportFieldRows(input)
    .map((row) => `- ${row.label}：${row.value}`)
    .join("\n");
  return `## 月度证据报告

${EVIDENCE_REPORT_INTRO}

${fields}
- ${EVIDENCE_REPORT_UNCLAIMED_LABEL}：${evidenceReportUnclaimedValue()}
`;
}
