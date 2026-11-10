import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import ErrorPage from "./error";

test("error page names the contact address and does not invent a digest", () => {
  const html = renderToStaticMarkup(<ErrorPage error={new Error("boom")} reset={() => {}} />);

  expect(html).toContain("页面出错了");
  expect(html).toContain('href="mailto:contact@lurus.cn"');
  expect(html).toContain("重试");
  expect(html).toContain('href="/"');
  expect(html).toContain("错误编号（有的话）");
  expect(html).not.toContain("subject=");
  expect(html).not.toContain("btn-primary");
  expect(html).not.toContain("card-flat");
  expect(html).not.toContain("rounded");
});

test("error page writes the digest into the mailto subject", () => {
  const error = Object.assign(new Error("boom"), { digest: "abc123" });
  const html = renderToStaticMarkup(<ErrorPage error={error} reset={() => {}} />);

  expect(html).toContain("错误编号");
  expect(html).toContain("abc123");
  expect(html).toContain("subject=%E9%A1%B5%E9%9D%A2%E9%94%99%E8%AF%AF%20abc123");
  expect(html).not.toContain("btn-primary");
});
