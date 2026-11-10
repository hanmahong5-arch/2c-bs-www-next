import { HUB_MODELS_URL, fetchHubModels, formatCNY, type HubModelRow } from "@/lib/hub-models";

const PAGE = "https://www.lurus.cn/hub/pricing";

function cell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function table(rows: HubModelRow[]) {
  const head = [
    "| 模型 | 厂商 | 输入 / 百万 token | 输出 / 百万 token | 按次 |",
    "| --- | --- | ---: | ---: | ---: |",
  ];
  const body = rows.map(
    (row) =>
      `| ${cell(row.id)} | ${cell(row.vendor)} | ${formatCNY(row.promptPerMTok)} | ${formatCNY(row.completionPerMTok)} | ${formatCNY(row.perRequest)} |`,
  );
  return [...head, ...body].join("\n");
}

/** 与 /hub/pricing 同源的纯文本价目。读不到接口时不写旧价。 */
export async function renderHubPricingMarkdown(): Promise<string> {
  const rows = await fetchHubModels();
  const prices =
    rows && rows.length > 0
      ? `${table(rows)}\n\n匿名访客默认分组。账号分组不同时，以控制台显示的单价为准。`
      : `暂时读不到 ${HUB_MODELS_URL}。本文件不另存价格。`;

  return `# Hub 按量价格

来源：${HUB_MODELS_URL}
网页：${PAGE}

自营 hub.lurus.cn 按调用量收费。下面的单价与钱包扣费同源。

## 包含

- 自营 hub.lurus.cn 的按量单价，与钱包扣费同源
- 对话按输入 / 输出 token；图像等按次
- 同一个钱包，不另设会员套餐

## 不包含

- 延迟、可用率的承诺数字
- 私有部署与受托运维的报价
- 读不到接口时的旧价兜底

## 价目

${prices}
`;
}
