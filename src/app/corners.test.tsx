import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MaturityChip } from "@/components/site/maturity-chip";
import { AsOfDemo } from "@/app/memorus/asof-demo";

test("the remaining frames are square", () => {
  const chip = renderToStaticMarkup(<MaturityChip level="早期试点" />);
  expect(chip).toContain("早期试点");
  expect(chip).toContain("border-[var(--lt-rule)]");
  expect(chip).not.toContain("rounded");

  const demo = renderToStaticMarkup(<AsOfDemo />);
  expect(demo).not.toContain("rounded");

  const lugo = readFileSync("src/app/lugo/page.tsx", "utf8");
  expect(lugo).toContain('className="h-auto w-full border border-[var(--lt-rule)]"');
  expect(lugo).not.toContain("rounded");

  const css = readFileSync("src/app/globals.css", "utf8");
  const block = css.slice(css.indexOf(".code-block {"), css.indexOf(".code-block .line-number"));
  expect(block).toContain("border-radius: 0");
  expect(block).not.toContain("border-radius: 12px");
});
