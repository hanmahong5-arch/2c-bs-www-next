import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { Disclosure } from "./disclosure";
import { AsOfDemo } from "@/app/memorus/asof-demo";
import { DataTable } from "@/app/memorus/benchmarks/charts";

const FILES = [
  "src/components/site/disclosure.tsx",
  "src/app/memorus/asof-demo.tsx",
  "src/app/memorus/benchmarks/charts.tsx",
  "src/app/memorus/benchmarks/page.tsx",
  "src/app/memorus/benchmarks/scene-canvas.tsx",
];

test("remaining focus targets use the ink line, not an accent ring", () => {
  for (const file of FILES) {
    const text = readFileSync(file, "utf8");
    expect(text).not.toContain("ring-[var(--lt-accent)]");
    expect(text).toContain("focus-ink");
  }
  const css = readFileSync("src/app/globals.css", "utf8");
  expect(css).toContain("a:focus-visible");
  expect(css).toContain(".focus-ink:focus-visible");
  expect(css).toContain(".focus-ink-inset:focus-visible");
  expect(css).toContain("outline-offset: -1px");
  const canvas = readFileSync("src/app/memorus/benchmarks/scene-canvas.tsx", "utf8");
  expect(canvas).toContain("focus-ink-inset");

  const disclosure = renderToStaticMarkup(<Disclosure summary="问">细节</Disclosure>);
  expect(disclosure).toContain("focus-ink");
  expect(disclosure).not.toContain("ring-");

  const demo = renderToStaticMarkup(<AsOfDemo />);
  expect(demo).toContain("focus-ink");
  expect(demo).not.toContain("ring-");

  const table = renderToStaticMarkup(
    <DataTable caption="样例" head={["列"]} rows={[["格"]]} />,
  );
  expect(table).toContain("focus-ink");
  expect(table).not.toContain("ring-");
});
