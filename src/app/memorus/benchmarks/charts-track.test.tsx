import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { BarChart, PipelineDiagram } from "./charts";

test("bar tracks use the measured gray edge", () => {
  const html = renderToStaticMarkup(
    <BarChart ariaLabel="样例" rows={[{ label: "检索上下文", value: 0.5 }]} />,
  );
  expect(html).toContain("检索上下文");
  expect(html).toContain("border border-[var(--color-text-muted)] bg-[var(--lt-bg)]");
  expect(html).not.toContain("border border-[var(--lt-rule)]");
});

test("pipeline boxes use the measured gray edge", () => {
  const html = renderToStaticMarkup(<PipelineDiagram />);
  expect(html).toContain("写入");
  expect(html).toContain("fill-[var(--lt-bg)] stroke-[var(--color-text-muted)]");
  expect(html).not.toContain("stroke-[var(--lt-rule)]");
});
