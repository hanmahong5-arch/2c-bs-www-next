import { expect, test } from "bun:test";
import {
  DRILL_MEASURED,
  DRILL_NOT_MEASURED,
  DRILL_OUTCOME_BLANK,
  drillMeasure,
  renderDrillMeasureText,
} from "./witness-drill";

const PERCENT = /\d+(?:\.\d+)?\s*[%％]/;

test("drill measure lists what is recorded and what is not, with no availability percent", () => {
  const text = renderDrillMeasureText();

  expect(text).toContain("一次演练只记下面这些");
  expect(text).toContain("## 记下");
  expect(text).toContain("## 不记下");
  for (const line of DRILL_MEASURED) expect(text).toContain(`- ${line}`);
  for (const line of DRILL_NOT_MEASURED) expect(text).toContain(`- ${line}`);
  expect(DRILL_MEASURED).toContain("是否恢复成功。");
  expect(DRILL_MEASURED).toContain("恢复了什么。");
  expect(DRILL_MEASURED.join("\n")).toContain("哪一类备份");
  expect(DRILL_MEASURED).toContain("谁见证。");
  expect(DRILL_MEASURED).toContain("核对了什么。");
  expect(DRILL_NOT_MEASURED.join("\n")).toContain("不写可用率");
  expect(DRILL_NOT_MEASURED.join("\n")).toContain("不写客户名");
  expect(DRILL_NOT_MEASURED.join("\n")).toContain("不是合同");
  expect(DRILL_NOT_MEASURED.join("\n")).toContain("不是常设 SLA");
  expect(text).not.toMatch(PERCENT);
  expect(text.toLowerCase()).not.toContain("password=");
});

test("empty optional outcome stays blank and is not rewritten as success", () => {
  for (const outcome of [undefined, null, "", "   "] as const) {
    const measure = drillMeasure({ outcome });
    const text = renderDrillMeasureText({ outcome });
    expect(measure.outcomeBlank).toBe(true);
    expect(measure.outcome).toBe(DRILL_OUTCOME_BLANK);
    expect(text).toContain(`- 是否恢复成功：${DRILL_OUTCOME_BLANK}`);
    expect(text).not.toContain("是否恢复成功：通过");
    expect(measure.measured).toEqual(DRILL_MEASURED);
    expect(measure.notMeasured).toEqual(DRILL_NOT_MEASURED);
  }

  const filled = drillMeasure({ outcome: "  通过  " });
  const filledText = renderDrillMeasureText({ outcome: "  通过  " });
  expect(filled.outcomeBlank).toBe(false);
  expect(filled.outcome).toBe("通过");
  expect(filledText).toContain("- 是否恢复成功：通过");
  expect(filledText).not.toContain(DRILL_OUTCOME_BLANK);
  expect(filled.measured).toEqual(DRILL_MEASURED);
  expect(filled.notMeasured).toEqual(DRILL_NOT_MEASURED);
  expect(filledText).not.toMatch(PERCENT);
});
