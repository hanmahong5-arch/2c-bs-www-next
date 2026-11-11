import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RetrievalScene } from "./retrieval-scene";

test("the judgment word is ink and the color stays on the mark", () => {
  const html = renderToStaticMarkup(<RetrievalScene />);
  expect(html).toContain("判对");
  expect(html).toContain('aria-hidden="true"');
  expect(html).toContain("text-[var(--lt-ok)]");
  expect(html).not.toContain("text-[var(--lt-ok)]\">判对");
  expect(html).not.toContain("text-[var(--lt-err)]\">判错");
  const at = html.indexOf("判对");
  const word = html.slice(at - 180, at + 4);
  expect(word).toContain('class="text-[var(--lt-ink)]"');
  expect(word).toContain("✓");
});
