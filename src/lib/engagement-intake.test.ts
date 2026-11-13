import { expect, test } from "bun:test";
import { INTAKE_EXCLUDED, INTAKE_INCLUDED, INTAKE_SUBJECT, intakeMailto } from "./engagement-intake";

const PROMPTS = ["环境在哪：", "跑着什么：", "目标：", "接入方式："] as const;

function mailtoQuery(href: string) {
  const query = href.slice(href.indexOf("?") + 1);
  return new URLSearchParams(query);
}

test("intake mailto subject is 受托运维咨询 and the body has four blank prompts", () => {
  const href = intakeMailto();
  const params = mailtoQuery(href);
  expect(params.get("subject")).toBe("受托运维咨询");
  expect(INTAKE_SUBJECT).toBe("受托运维咨询");

  const body = params.get("body") ?? "";
  const lines = body.split("\n");
  for (const prompt of PROMPTS) {
    expect(lines).toContain(prompt);
  }
  expect(INTAKE_INCLUDED).toHaveLength(4);
});

test("intake strings do not carry a password or a secret-looking token", () => {
  const href = intakeMailto();
  const body = mailtoQuery(href).get("body") ?? "";
  const haystack = [href, body, ...INTAKE_INCLUDED, ...INTAKE_EXCLUDED].join("\n");

  expect(haystack).not.toMatch(/(?:password|passwd|secret|api[_-]?key|token)\s*[:=]\s*\S+/i);
  expect(haystack).not.toMatch(/\b(?:sk|pk|rk|ghp|gho|github_pat|xox[baprs]|AKIA)[-_][A-Za-z0-9]{8,}/);
  expect(haystack).not.toMatch(/密码\s*[:：=]\s*\S+/);
  expect(haystack).not.toMatch(/\b[0-9a-f]{32,}\b/i);
  expect(body).toContain("不要在这封信里贴生产密码。");
});
