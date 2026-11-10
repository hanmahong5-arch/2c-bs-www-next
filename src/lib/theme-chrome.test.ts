import { expect, test } from "bun:test";
import { PAPER_DARK, PAPER_LIGHT, themeChromeScript, themeColor } from "./theme-chrome";

test("theme color is the paper the page actually paints", () => {
  expect(themeColor(false)).toBe(PAPER_LIGHT);
  expect(themeColor(true)).toBe(PAPER_DARK);
  expect(PAPER_LIGHT).toBe("#F5F2E8");
  expect(PAPER_DARK).toBe("#16150F");
});

test("the early script paints the saved theme onto the class and the chrome", () => {
  const script = themeChromeScript();
  function run(saved: string | null, systemDark: boolean) {
    const names = new Set<string>();
    const meta = {
      content: "",
      setAttribute(name: string, value: string) {
        if (name === "content") this.content = value;
      },
    };
    const document = {
      documentElement: { classList: { add: (name: string) => names.add(name) } },
      querySelector: (sel: string) => (sel.includes("theme-color") ? meta : null),
    };
    const localStorage = { getItem: () => saved };
    const window = { matchMedia: () => ({ matches: systemDark }) };
    new Function("document", "localStorage", "window", script)(document, localStorage, window);
    return { names, content: meta.content };
  }

  const dark = run("dark", false);
  expect(dark.names.has("dark")).toBe(true);
  expect(dark.content).toBe(PAPER_DARK);

  const light = run("light", true);
  expect(light.names.has("dark")).toBe(false);
  expect(light.content).toBe(PAPER_LIGHT);

  const system = run(null, true);
  expect(system.names.has("dark")).toBe(true);
  expect(system.content).toBe(PAPER_DARK);
});
