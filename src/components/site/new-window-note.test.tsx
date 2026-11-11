import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NEW_WINDOW_LABEL, NewWindowNote } from "./new-window-note";

test("the new-window note is read aloud and the arrow is hidden from that reading", () => {
  const quiet = renderToStaticMarkup(<NewWindowNote />);
  expect(quiet).toContain(NEW_WINDOW_LABEL);
  expect(quiet).not.toContain("↗");

  const marked = renderToStaticMarkup(<NewWindowNote arrow />);
  expect(marked).toContain('aria-hidden="true"');
  expect(marked).toContain("↗");
  expect(marked).toContain(NEW_WINDOW_LABEL);
});
