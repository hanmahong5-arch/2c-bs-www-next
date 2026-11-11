import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

function channel(hex: string, index: number) {
  const value = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground: string, background: string) {
  const luminance = (hex: string) =>
    0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test("muted text clears AA on the section background and on the paper", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  const muted = [...css.matchAll(/--color-text-muted:\s*(#[0-9A-Fa-f]{6})/g)].map((match) => match[1]);
  expect(muted).toEqual(["#66635B", "#A19C89"]);

  expect(contrast("#66635B", "#E8E4D6")).toBeGreaterThanOrEqual(4.5);
  expect(contrast("#66635B", "#F5F2E8")).toBeGreaterThanOrEqual(4.5);
  expect(contrast("#A19C89", "#1E1C15")).toBeGreaterThanOrEqual(4.5);
  expect(contrast("#A19C89", "#16150F")).toBeGreaterThanOrEqual(4.5);
  expect(contrast("#6B6860", "#E8E4D6")).toBeLessThan(4.5);

  const canvas = readFileSync("src/app/memorus/benchmarks/scene-canvas.tsx", "utf8");
  const card = readFileSync("src/app/opengraph-image.tsx", "utf8");
  expect(canvas).toContain('pick("--color-text-muted", "#66635B")');
  expect(card).toContain('const MUTED = "#66635B"');
});
