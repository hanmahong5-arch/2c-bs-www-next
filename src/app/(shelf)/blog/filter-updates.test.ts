import { expect, test } from "bun:test";
import { filterUpdates } from "./filter-updates";

const updates = [
  { title: "方法页", tags: ["Web", "Approach"] },
  { title: "记忆", tags: ["Memorus"] },
  { title: "字体", tags: ["Web"] },
] as const;

test("filterUpdates: an unknown tag yields an empty list", () => {
  expect(filterUpdates(updates, "no-such-mark")).toEqual([]);
});

test("filterUpdates: a known tag yields only matches", () => {
  expect(filterUpdates(updates, "Memorus").map((entry) => entry.title)).toEqual(["记忆"]);
  expect(filterUpdates(updates, "Web").map((entry) => entry.title)).toEqual(["方法页", "字体"]);
});

test("filterUpdates: an empty tag yields every entry", () => {
  expect(filterUpdates(updates, null)).toEqual([...updates]);
  expect(filterUpdates(updates, undefined)).toEqual([...updates]);
  expect(filterUpdates(updates, "")).toEqual([...updates]);
});
