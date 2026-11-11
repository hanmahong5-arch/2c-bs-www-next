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

function palette(source: string) {
  const block = source.slice(source.indexOf("#4E79A7") - 2, source.indexOf("#9780B3") + 8);
  return [...block.matchAll(/#[0-9A-Fa-f]{6}/g)].map((match) => match[0].toUpperCase());
}

test("other-session dots clear non-text contrast on both papers", () => {
  const projection = readFileSync("src/app/memorus/benchmarks/scene-projection.tsx", "utf8");
  const canvas = readFileSync("src/app/memorus/benchmarks/scene-canvas.tsx", "utf8");
  const scene = readFileSync("src/app/memorus/benchmarks/retrieval-scene.tsx", "utf8");
  const colors = palette(projection);
  expect(colors).toHaveLength(10);
  expect(palette(canvas)).toEqual(colors);
  for (const color of colors) {
    expect(contrast(color, "#F5F2E8")).toBeGreaterThanOrEqual(3);
    expect(contrast(color, "#16150F")).toBeGreaterThanOrEqual(3);
  }
  expect(contrast("#6FA8DC", "#F5F2E8")).toBeLessThan(3);
  expect(projection).not.toContain('opacity={0.5}');
  expect(scene).not.toContain("opacity={0.6}");
  expect(canvas).toContain("alpha: 1, fill: 1, ringW: 0, transparent: false");
});
