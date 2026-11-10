/**
 * 见证页上的试点测量：一次恢复演练记下什么、不记下什么。
 * 公开页不填某一次是否成功。outcome 留空时不写成通过，也不写成可用率。
 */

export const DRILL_MEASURE_INTRO = "一次演练只记下面这些。这页不填某一次的结果。";

/** 演练实际写下的。不含可用率、客户名、合同或常设 SLA。 */
export const DRILL_MEASURED = [
  "是否恢复成功。",
  "恢复了什么。",
  "来自哪一类备份。",
  "谁见证。",
  "核对了什么。",
] as const;

export const DRILL_NOT_MEASURED = [
  "不写可用率。",
  "不写客户名。",
  "这不是合同。",
  "这不是常设 SLA。",
] as const;

export interface DrillMeasureInput {
  /** 这一次是否恢复成功。公开定义留空。空白、null、缺省都不写成通过。 */
  outcome?: string | null;
}

export const DRILL_OUTCOME_BLANK = "（留空）";

export interface DrillMeasure {
  intro: string;
  measured: readonly string[];
  notMeasured: readonly string[];
  /** 留空时是「（留空）」；写了则只有写下的字。 */
  outcome: string;
  outcomeBlank: boolean;
}

function written(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export function drillMeasure(input: DrillMeasureInput = {}): DrillMeasure {
  const outcome = written(input.outcome);
  return {
    intro: DRILL_MEASURE_INTRO,
    measured: DRILL_MEASURED,
    notMeasured: DRILL_NOT_MEASURED,
    outcome: outcome || DRILL_OUTCOME_BLANK,
    outcomeBlank: outcome.length === 0,
  };
}

/**
 * 测量定义的纯文本。缺省、空白、null 的结果都保持留空。
 * 见证页没有 markdown 路由；句子与页面共用上面的列表。
 */
export function renderDrillMeasureText(input: DrillMeasureInput = {}): string {
  const measure = drillMeasure(input);
  const measured = measure.measured.map((line) => `- ${line}`).join("\n");
  const notMeasured = measure.notMeasured.map((line) => `- ${line}`).join("\n");
  return `${measure.intro}

## 记下

${measured}

## 不记下

${notMeasured}

- 是否恢复成功：${measure.outcome}
`;
}
