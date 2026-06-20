/**
 * 站外产品入口 URL 单一真源。stage→prod 迁移(如 tally-stage → tally)时只改这里。
 * 历史上 URL 散落硬编码于各组件;新增入口起从此集中,逐步收敛。
 */

/** LLM 网关控制台 (newhub, 当前 stage/beta) — 注册 / 获取 API Key */
export const HUB_CONSOLE_URL = "https://hub.lurus.cn";

/** Lurus Tally 智能进销存 — 试用注册 (R6 stage 环境 tally-stage) */
export const TALLY_TRIAL_URL = "https://tally-stage.lurus.cn";
