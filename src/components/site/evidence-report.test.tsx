import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { EVIDENCE_REPORT_NON_CLAIMS } from "@/lib/evidence-report";
import { EvidenceReport } from "./evidence-report";

test("EvidenceReport is a blank hairline form with the non-claims", () => {
  const html = renderToStaticMarkup(<EvidenceReport />);

  expect(html).toContain("报告期");
  expect(html).toContain("跑了什么");
  expect(html).toContain("核对了什么");
  expect(html).toContain("失败仍开着");
  expect(html).toContain("谁签了这份说明");
  expect(html).toContain("不声称");
  expect(html).toContain("（留空）");
  for (const line of EVIDENCE_REPORT_NON_CLAIMS) {
    expect(html).toContain(line);
  }
  expect(html).toContain("border-[var(--lt-rule)]");
  expect(html).toContain("text-[var(--lt-accent)]");
  expect(html).toContain("包含");
  expect(html).toContain("不包含");
  expect(html).not.toMatch(/rounded|shadow|purple|glow/);
  expect(html).not.toMatch(/\d+(?:\.\d+)?\s*[%％]/);
});
