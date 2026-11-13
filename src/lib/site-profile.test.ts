import assert from "node:assert/strict";
import { frameCompanyAccess } from "./company-access";
import { CATALOG, COMPANY_GROUPS, catalogItem, itemsIn } from "./catalog";
import { profileFrom } from "./site-profile";
import { routesFor } from "./site-routes";

const personal = profileFrom({});
assert.equal(personal.id, "personal");
assert.equal(personal.legalName, null);
assert.equal(personal.siteUrl, "https://www.lurus.cn");
assert.equal(personal.homeH1, "我在做的 AI 工具与底座。");
assert.equal(personal.beian[0]?.label, "鲁ICP备2026000242号");
assert.equal(profileFrom({ siteProfile: "nope" }).id, "personal");

const company = profileFrom({ siteProfile: "company" });
assert.equal(company.id, "company");
assert.equal(company.legalName, "硅知睿智能科技（烟台）有限公司");
assert.equal(company.siteUrl, "https://www.ailurus.top");
assert.equal(company.contactEmail, "contact@ailurus.top");
assert.equal(company.beian.length, 0);
assert.equal(JSON.stringify(company).includes("2026000242"), false);
assert.equal(JSON.stringify(company).includes("37060002001239"), false);
assert.equal(company.homeH1, "你环境里的系统，坏了要能原样恢复。");
assert.equal(
  company.nav.map((item) => item.name).join(","),
  "服务,构件,方法,公司,文档",
);
assert.equal(company.nav.some((item) => item.href.includes("docs.lurus.cn")), true);
assert.equal(company.homeActions[0]?.primary, true);
assert.match(company.homeActions[0]?.href ?? "", /^mailto:contact@ailurus\.top\?subject=/);
assert.equal(JSON.stringify(company).includes("托管"), false);
assert.equal(JSON.stringify(company).includes("产品线"), false);

const filed = profileFrom({
  siteProfile: " company ",
  companyIcp: " 鲁ICP备00000000号 ",
  companyPsbLabel: "鲁公网安备00000000000000号",
  companyPsbCode: "00000000000000",
});
assert.equal(filed.id, "company");
assert.equal(filed.beian.length, 2);
assert.equal(filed.beian[0]?.href, "https://beian.miit.gov.cn/");
assert.match(filed.beian[1]?.href ?? "", /recordcode=00000000000000$/);

const badPsb = profileFrom({
  siteProfile: "company",
  companyPsbLabel: "鲁公网安备1号",
  companyPsbCode: "not-a-code",
});
assert.equal(badPsb.beian.length, 0);

const companyPaths = routesFor("company").map((route) => route.path);
const personalPaths = routesFor("personal").map((route) => route.path);
assert.deepEqual(companyPaths, personalPaths);
for (const path of ["/kova", "/switch", "/hub/pricing", "/lucrum", "/founder", "/blog"]) {
  assert.equal(companyPaths.includes(path), true, path);
}

const catalogHrefs = CATALOG.map((item) => item.href);
assert.equal(new Set(catalogHrefs).size, catalogHrefs.length);
const grouped = COMPANY_GROUPS.flatMap((group) => [...itemsIn(group.hrefs)].map((item) => item.href));
assert.deepEqual(grouped.slice().sort(), catalogHrefs.slice().sort());
for (const path of companyPaths) {
  const structural = path === "/" || path === "/about" || path === "/privacy" || path === "/terms";
  assert.equal(catalogHrefs.includes(path), !structural, path);
}
const catalogText = JSON.stringify({ CATALOG, COMPANY_GROUPS });
for (const item of CATALOG) {
  assert.ok(item.sheet.length >= 3, item.href);
  assert.equal(item.relation.includes("你"), false, item.href);
  for (const row of item.sheet) {
    assert.equal(row.value.includes("你"), false, `${item.href} ${row.label}`);
    assert.equal(row.value.includes("行为"), false, `${item.href} ${row.label}`);
  }
}
assert.equal(catalogItem("/hub")?.name, "Hub");
assert.equal(catalogItem("/hub/pricing")?.name, "Hub 价格");
assert.equal(catalogItem("/"), undefined);

const offer = { label: "写信说明现在跑的系统", href: "mailto:contact@ailurus.top?subject=x" };
const framed = frameCompanyAccess(
  [
    { label: "阅读文档", href: "https://docs.lurus.cn", primary: true, external: true },
    { label: "联系试用", href: "mailto:contact@lurus.cn", external: true },
  ],
  offer,
);
assert.equal(framed[0]?.label, offer.label);
assert.equal(framed[0]?.primary, true);
assert.equal(framed.some((action) => action.label === "联系试用"), false);
assert.equal(framed.some((action) => action.label === "阅读方法"), true);
assert.equal(framed.some((action) => action.label === "阅读文档"), true);
const witness = frameCompanyAccess(
  [
    { label: "阅读方法", href: "/approach", primary: true },
    { label: "写信说明被观测的环境", href: "mailto:contact@ailurus.top", external: true },
  ],
  offer,
);
assert.equal(witness[0]?.label, "阅读方法");
assert.equal(witness.length, 2);
assert.equal(catalogText.includes("托管"), false);
assert.equal(catalogText.includes("产品线"), false);

console.log("site-profile ok");
