import { DELIVERY_EXCLUDED, DELIVERY_INCLUDED, DELIVERY_NOTE } from "@/lib/engagement-delivery";
import {
  CONTACT_EMAIL,
  INTAKE_EXCLUDED,
  INTAKE_INCLUDED,
  INTAKE_NOTE,
  INTAKE_SUBJECT,
} from "@/lib/engagement-intake";
import { renderEvidenceReportMarkdown } from "@/lib/evidence-report";
import { renderRestoreReceiptMarkdown } from "@/lib/restore-receipt";

const PAGE = "https://www.lurus.cn/approach";

function bullets(items: readonly string[]) {
  return items.map((item) => `- ${item.replace(/\n/g, " ")}`).join("\n");
}

function columns(included: readonly string[], excluded: readonly string[]) {
  return `## 包含

${bullets(included)}

## 不包含

${bullets(excluded)}`;
}

/**
 * /approach 的纯文本孪生。
 * 句子来自首信、交付分界、留空的月度证据报告，以及留空的恢复演练回执。不另写客户、价格或 SLA。
 * 文末两行只复述方法页已有的入口：/llms.txt（六条已有入口）、/approach#receipt（字段留空，不写可用率）。
 */
export function renderApproachMarkdown(): string {
  return `# 方法

网页：${PAGE}

本文件不代替合同，也不是价目。

## 首信

来信请先写清这些。

写信到 ${CONTACT_EMAIL}，主题：${INTAKE_SUBJECT}。

${columns(INTAKE_INCLUDED, INTAKE_EXCLUDED)}

${INTAKE_NOTE}

## 范围

硬化与受托运维，各包含什么。

${columns(DELIVERY_INCLUDED, DELIVERY_EXCLUDED)}

${DELIVERY_NOTE}

${renderEvidenceReportMarkdown()}
${renderRestoreReceiptMarkdown()}
索引 /llms.txt：六条已有入口。
演练回执 /approach#receipt：字段留空，不写可用率。
`;
}
