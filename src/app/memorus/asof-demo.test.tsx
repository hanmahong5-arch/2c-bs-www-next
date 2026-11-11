import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AsOfDemo } from "./asof-demo";

test("the valid event and its quote are marked in ink", () => {
  const html = renderToStaticMarkup(<AsOfDemo />);
  expect(html).toContain("当时成立");
  expect(html).toContain("border-t-2 pt-3 transition-colors duration-200 motion-reduce:transition-none border-[var(--lt-ink)]");
  expect(html).toContain("border-l-2 border-[var(--lt-ink)]");
  expect(html).not.toContain("border-[var(--lt-accent)]");
});
