import { expect, test } from "bun:test";
import { renderApproachMarkdown } from "./approach-md";
import { DELIVERY_NOTE } from "./engagement-delivery";
import { INTAKE_NOTE, INTAKE_SUBJECT } from "./engagement-intake";

test("approach markdown has the intake subject and both column headings", () => {
  const md = renderApproachMarkdown();
  expect(md).toContain(INTAKE_SUBJECT);
  expect(md).toContain("来信请先写清这些");
  expect(md).toContain("硬化与受托运维，各包含什么");
  expect(md).toContain("\n## 包含\n");
  expect(md).toContain("\n## 不包含\n");
  expect(md).toContain(INTAKE_NOTE);
  expect(md).toContain(DELIVERY_NOTE);
  expect(md).toContain("不代替合同");
  expect(md).toContain("## 恢复演练回执");
  expect(md).toContain("（留空）");
  expect(md).toContain("这张回执不是合同。");
  expect(md).not.toContain("password=");
  expect(md).not.toMatch(/\d+(?:\.\d+)?\s*[%％]/);
});
