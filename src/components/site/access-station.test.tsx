import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AccessStation, stationOpensAsDocument } from "./access-station";

test("cross-page hashes open as a document and same-site paths stay links", () => {
  expect(stationOpensAsDocument("/switch#download")).toBe(true);
  expect(stationOpensAsDocument("#download")).toBe(true);
  expect(stationOpensAsDocument("mailto:contact@lurus.cn")).toBe(true);
  expect(stationOpensAsDocument("/switch")).toBe(false);

  const html = renderToStaticMarkup(
    <AccessStation
      actions={[
        { label: "前往 Switch 下载", href: "/switch#download", primary: true },
        { label: "Switch 介绍", href: "/switch" },
        { label: "登录", href: "https://identity.lurus.cn", external: true },
      ]}
      nextStep="安装 Switch"
    />,
  );
  expect(html).toContain('href="/switch#download"');
  expect(html).toContain('href="/switch"');
  expect(html).toContain('target="_blank"');
  expect(html).not.toContain('href="/switch#download" target="_blank"');
  expect(html).toContain("下一步：安装 Switch");
});
