/**
 * 首信范围：第一封邮件要写清什么、不写什么。
 * 不在此报价，不收集密码，不预填任何密钥。
 */

export const CONTACT_EMAIL = "contact@lurus.cn";

export const INTAKE_SUBJECT = "受托运维咨询";

export const INTAKE_INCLUDED: readonly string[] = [
  "环境在哪：云厂商 / 自建机房 / 内网；是否有出境或专网约束。",
  "跑着什么：例如 Dify、n8n 或自研栈；是否已有备份与是否做过恢复演练（有或没有都请写明）。",
  "目标：先要硬化验收、按月受托运维，还是只想谈试点观测；希望何时见效。",
  "接入方式：VPN / 堡垒机 / 跳转主机等我们怎么进你的环境；不要在这封信里贴生产密码。",
];

export const INTAKE_EXCLUDED: readonly string[] = [
  "机房与算力转售；系统应留在你自有的环境里。",
  "从零做一套新应用；我们接手的是已经能演示、但还没稳住的系统。",
  "承诺延迟、可用率或其它我们证明不了的数字。",
  "在这页代替合同约定范围；写操作审批与可撤销的覆盖范围以合同为准（相关能力仍在建设）。",
];

export const INTAKE_NOTE =
  "见证、Kova 等构件标有成熟度；试点目前多在我们自己的环境里验证，不等于已在你的环境交付。";

/** 四项空白占位，对应包含栏。不写入密码、令牌或环境细节。 */
const INTAKE_BODY_LINES = [
  "环境在哪：",
  "",
  "跑着什么：",
  "",
  "目标：",
  "",
  "接入方式：",
  "",
  "不要在这封信里贴生产密码。",
] as const;

/** mailto：主题固定，正文只有占位。 */
export function intakeMailto(): string {
  const body = INTAKE_BODY_LINES.join("\n");
  const query = `subject=${encodeURIComponent(INTAKE_SUBJECT)}&body=${encodeURIComponent(body)}`;
  return `mailto:${CONTACT_EMAIL}?${query}`;
}
