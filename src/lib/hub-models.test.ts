import { expect, test } from "bun:test";
import { formatCNY } from "./hub-models";

test("formatCNY: 0 is an em dash", () => {
  expect(formatCNY(0)).toBe("—");
});

test("formatCNY: negative is an em dash", () => {
  expect(formatCNY(-1.5)).toBe("—");
  expect(formatCNY(-0.01)).toBe("—");
});

test("formatCNY: values at least 1 keep two decimals", () => {
  expect(formatCNY(1)).toBe("¥1.00");
  expect(formatCNY(12.5)).toBe("¥12.50");
});

test("formatCNY: a value below 1 keeps significant digits", () => {
  expect(formatCNY(0.00123)).toBe("¥0.0012");
});
