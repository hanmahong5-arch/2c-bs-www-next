import { expect, test } from "bun:test";
import {
  RESTORE_RECEIPT_BLANK,
  RESTORE_RECEIPT_FIELD_DEFS,
  RESTORE_RECEIPT_NON_CLAIMS,
  RESTORE_RECEIPT_RECORDS,
  RESTORE_RECEIPT_UNCLAIMED_LABEL,
  renderRestoreReceiptMarkdown,
  restoreReceiptFieldRows,
} from "./restore-receipt";

const PERCENT = /\d+(?:\.\d+)?\s*[%％]/;

test("blank receipt keeps every optional field empty and states the non-claims", () => {
  const md = renderRestoreReceiptMarkdown();

  expect(md).toContain("## 恢复演练回执");
  expect(md).toContain("不是某一次演练的结果");
  for (const def of RESTORE_RECEIPT_FIELD_DEFS) {
    expect(md).toContain(`- ${def.label}：${RESTORE_RECEIPT_BLANK} · ${def.hint}`);
  }
  expect(md).toContain(`- ${RESTORE_RECEIPT_UNCLAIMED_LABEL}：`);
  for (const line of RESTORE_RECEIPT_NON_CLAIMS) {
    expect(md).toContain(line);
  }
  expect(md.split(RESTORE_RECEIPT_BLANK).length - 1).toBe(RESTORE_RECEIPT_FIELD_DEFS.length);
  expect(md).not.toMatch(PERCENT);
  expect(md.toLowerCase()).not.toContain("password=");
});

test("missing and blank optional fields stay empty while a provided field is written", () => {
  const md = renderRestoreReceiptMarkdown({
    when: "  ",
    restored: null,
    backupClass: undefined,
    witnessedBy: "",
    checked: "逐表行数与备份文件一致",
  });

  expect(md).toContain("- 核对了什么：逐表行数与备份文件一致");
  expect(md).not.toContain("- 核对了什么：（留空）");
  expect(md).toContain("- 何时：（留空）");
  expect(md).toContain("- 恢复了什么：（留空）");
  expect(md).toContain("- 备份类别：（留空）");
  expect(md).toContain("- 谁见证：（留空）");
  expect(md.split(RESTORE_RECEIPT_BLANK).length - 1).toBe(4);
  for (const line of RESTORE_RECEIPT_NON_CLAIMS) {
    expect(md).toContain(line);
  }
  expect(md).not.toMatch(PERCENT);
});

test("records name each receipt field and add no uptime percent", () => {
  const joined = RESTORE_RECEIPT_RECORDS.join("\n");
  for (const def of RESTORE_RECEIPT_FIELD_DEFS) {
    expect(joined).toContain(def.label);
  }
  expect(joined).not.toMatch(PERCENT);
  expect(restoreReceiptFieldRows({}).every((row) => row.blank)).toBe(true);
});
