/**
 * 恢复演练回执的留空样子。
 * 栏位名称是演练之后会写的那些；公开页不填某一次的日期、对象或结果。
 * 不写可用率，不写客户名，这张回执不是合同。
 */

export type RestoreReceiptInput = {
  /** 演练结束的日期。空着表示这张是留空示例。 */
  when?: string | null;
  /** 恢复对象。 */
  restored?: string | null;
  /** 备份类别。 */
  backupClass?: string | null;
  /** 在场角色。 */
  witnessedBy?: string | null;
  /** 核对结果。 */
  checked?: string | null;
};

export const RESTORE_RECEIPT_BLANK = "（留空）";

export const RESTORE_RECEIPT_INTRO =
  "这是一次恢复演练做完后我们写的回执样子。栏位名称是真的；下面留空，不是某一次演练的结果。";

export const RESTORE_RECEIPT_FIELD_DEFS = [
  { key: "when", label: "何时", hint: "演练结束的日期。示例不填某一天。" },
  { key: "restored", label: "恢复了什么", hint: "对象名，例如某一张表。不写客户名。" },
  {
    key: "backupClass",
    label: "备份类别",
    hint: "来自哪一类备份，例如逻辑备份或主机快照。只写类别，不写存放位置。",
  },
  { key: "witnessedBy", label: "谁见证", hint: "在场角色，例如受托方与环境负责人。不写人名。" },
  {
    key: "checked",
    label: "核对了什么",
    hint: "逐表行数是否与备份文件一致。期望清单为空不算通过。",
  },
] as const satisfies readonly {
  key: keyof RestoreReceiptInput;
  label: string;
  hint: string;
}[];

/** 回执允许写下的栏。具体句子不另造客户、日期或可用率。 */
export const RESTORE_RECEIPT_RECORDS: readonly string[] = [
  "何时：演练结束的日期。",
  "恢复了什么：对象名。不写客户名。",
  "备份类别：只写类别，不写存放位置。",
  "谁见证：在场角色。不写人名。",
  "核对了什么：逐表行数是否与备份文件一致。",
];

export const RESTORE_RECEIPT_NON_CLAIMS = [
  "不写可用率，也不写这次演练没有测的数字。",
  "不写客户名。",
  "这张回执不是合同。",
] as const;

export const RESTORE_RECEIPT_UNCLAIMED_LABEL = "不声称";

export interface RestoreReceiptRow {
  label: string;
  /** 留空时是「（留空） · 说明」；写了则只有写下的字，不附说明。 */
  value: string;
  blank: boolean;
}

function written(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export function restoreReceiptFieldRows(input: RestoreReceiptInput = {}): RestoreReceiptRow[] {
  return RESTORE_RECEIPT_FIELD_DEFS.map((def) => {
    const value = written(input[def.key]);
    if (!value) {
      return { label: def.label, value: `${RESTORE_RECEIPT_BLANK} · ${def.hint}`, blank: true };
    }
    return { label: def.label, value, blank: false };
  });
}

export function restoreReceiptUnclaimedValue(): string {
  return RESTORE_RECEIPT_NON_CLAIMS.join("");
}

/**
 * 回执的纯文本。缺省、空白、null 的栏都保持留空。
 * 不声称的三句始终在，不随栏位被盖掉。
 */
export function renderRestoreReceiptMarkdown(input: RestoreReceiptInput = {}): string {
  const fields = restoreReceiptFieldRows(input)
    .map((row) => `- ${row.label}：${row.value}`)
    .join("\n");
  return `## 恢复演练回执

${RESTORE_RECEIPT_INTRO}

${fields}
- ${RESTORE_RECEIPT_UNCLAIMED_LABEL}：${restoreReceiptUnclaimedValue()}
`;
}
