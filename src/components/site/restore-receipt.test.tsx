import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RESTORE_RECEIPT_NON_CLAIMS } from "@/lib/restore-receipt";
import { RestoreReceipt } from "./restore-receipt";

test("RestoreReceipt is a blank hairline form with the non-claims", () => {
  const html = renderToStaticMarkup(<RestoreReceipt />);

  expect(html).toContain("何时");
  expect(html).toContain("恢复了什么");
  expect(html).toContain("备份类别");
  expect(html).toContain("谁见证");
  expect(html).toContain("核对了什么");
  expect(html).toContain("不声称");
  expect(html).toContain("（留空）");
  for (const line of RESTORE_RECEIPT_NON_CLAIMS) {
    expect(html).toContain(line);
  }
  expect(html).toContain("border-[var(--lt-rule)]");
  expect(html).toContain("text-[var(--lt-accent)]");
  expect(html).not.toMatch(/rounded|shadow|purple|glow/);
  expect(html).not.toMatch(/\d+(?:\.\d+)?\s*[%％]/);
});
