import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";
import { llmsIndexLines, llmsIndexPaths, llmsProductLines } from "./llms-index";

const PERCENT = /\d+(?:\.\d+)?\s*[%％]/;

test("public llms.txt contains exactly the index lines and no availability percent", () => {
  const body = readFileSync(join(import.meta.dir, "../../public/llms.txt"), "utf8");
  const lines = llmsIndexLines();
  const paths = llmsIndexPaths();

  expect(lines).toHaveLength(6);
  expect(paths).toHaveLength(6);
  expect(body.includes(`${lines.join("\n")}\n`)).toBe(true);

  for (const line of lines) {
    expect(body.split(line)).toHaveLength(2);
    expect(line).not.toMatch(PERCENT);
  }
  for (const path of paths) {
    expect(lines.some((line) => line.includes(path))).toBe(true);
    expect(body.split(path)).toHaveLength(2);
  }
  expect(body).not.toMatch(PERCENT);
});

test("public llms.txt lists the four product pages that already exist", () => {
  const body = readFileSync(join(import.meta.dir, "../../public/llms.txt"), "utf8");
  const lines = llmsProductLines();
  expect(lines).toHaveLength(4);
  for (const line of lines) {
    expect(body.split(line)).toHaveLength(2);
    expect(line).not.toMatch(PERCENT);
  }
  expect(body).not.toMatch(PERCENT);
});
