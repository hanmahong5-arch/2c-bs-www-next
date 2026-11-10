import { expect, test } from "bun:test";
import {
  EVIDENCE_REPORT_BLANK,
  EVIDENCE_REPORT_FIELD_DEFS,
  EVIDENCE_REPORT_NON_CLAIMS,
  EVIDENCE_REPORT_RECORDS,
  EVIDENCE_REPORT_UNCLAIMED_LABEL,
  evidenceReportFieldRows,
  renderEvidenceReportMarkdown,
} from "./evidence-report";

const PERCENT = /\d+(?:\.\d+)?\s*[%％]/;

test("blank report keeps every optional field empty and states the non-claims", () => {
  const md = renderEvidenceReportMarkdown();

  expect(md).toContain("## 月度证据报告");
  expect(md).toContain("不是某一个月的结果");
  for (const def of EVIDENCE_REPORT_FIELD_DEFS) {
    expect(md).toContain(`- ${def.label}：${EVIDENCE_REPORT_BLANK} · ${def.hint}`);
  }
  expect(md).toContain(`- ${EVIDENCE_REPORT_UNCLAIMED_LABEL}：`);
  for (const line of EVIDENCE_REPORT_NON_CLAIMS) {
    expect(md).toContain(line);
  }
  expect(md).toContain("不写可用率百分比。");
  expect(md).toContain("不写客户名。");
  expect(md).toContain("这不是合同。");
  expect(md).toContain("这不代替演练回执。");
  expect(md.split(EVIDENCE_REPORT_BLANK).length - 1).toBe(EVIDENCE_REPORT_FIELD_DEFS.length);
  expect(md).not.toMatch(PERCENT);
  expect(md.toLowerCase()).not.toContain("password=");
});

test("missing optional fields stay blank and non-claims remain", () => {
  for (const input of [
    {},
    { period: undefined, ran: undefined, checked: undefined, failedOpen: undefined, signedBy: undefined },
    { period: null, ran: null, checked: null, failedOpen: null, signedBy: null },
    { period: "", ran: "   ", checked: null, failedOpen: undefined, signedBy: "" },
  ] as const) {
    const md = renderEvidenceReportMarkdown(input);
    const rows = evidenceReportFieldRows(input);
    expect(rows.every((row) => row.blank)).toBe(true);
    for (const def of EVIDENCE_REPORT_FIELD_DEFS) {
      expect(md).toContain(`- ${def.label}：${EVIDENCE_REPORT_BLANK}`);
    }
    for (const line of EVIDENCE_REPORT_NON_CLAIMS) {
      expect(md).toContain(line);
    }
    expect(md).not.toMatch(PERCENT);
  }
});

test("a provided field is written while the other blanks and the non-claims stay", () => {
  const md = renderEvidenceReportMarkdown({
    period: "  ",
    ran: null,
    checked: undefined,
    failedOpen: "外部探测有一段未采样",
    signedBy: "",
  });

  expect(md).toContain("- 失败仍开着：外部探测有一段未采样");
  expect(md).not.toContain("- 失败仍开着：（留空）");
  expect(md).toContain("- 报告期：（留空）");
  expect(md).toContain("- 跑了什么：（留空）");
  expect(md).toContain("- 核对了什么：（留空）");
  expect(md).toContain("- 谁签了这份说明：（留空）");
  expect(md.split(EVIDENCE_REPORT_BLANK).length - 1).toBe(4);
  for (const line of EVIDENCE_REPORT_NON_CLAIMS) {
    expect(md).toContain(line);
  }
  expect(md).not.toMatch(PERCENT);

  const joined = EVIDENCE_REPORT_RECORDS.join("\n");
  for (const def of EVIDENCE_REPORT_FIELD_DEFS) {
    expect(joined).toContain(def.label);
  }
  expect(joined).not.toMatch(PERCENT);
});
