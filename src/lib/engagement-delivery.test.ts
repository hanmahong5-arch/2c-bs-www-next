import { expect, test } from "bun:test";
import { DELIVERY_EXCLUDED, DELIVERY_INCLUDED, DELIVERY_NOTE } from "./engagement-delivery";

test("delivery lists are non-empty and state no password assignment or SLA percent", () => {
  expect(DELIVERY_INCLUDED.length).toBeGreaterThan(0);
  expect(DELIVERY_EXCLUDED.length).toBeGreaterThan(0);
  expect(DELIVERY_NOTE.trim().length).toBeGreaterThan(0);

  for (const item of [...DELIVERY_INCLUDED, ...DELIVERY_EXCLUDED]) {
    expect(item.trim().length).toBeGreaterThan(0);
  }

  const haystack = [...DELIVERY_INCLUDED, ...DELIVERY_EXCLUDED, DELIVERY_NOTE].join("\n");
  expect(haystack.toLowerCase()).not.toContain("password=");
  expect(haystack).not.toMatch(/\d+(?:\.\d+)?\s*[%％]/);
});
