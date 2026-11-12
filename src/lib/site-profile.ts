/**
 * 一个镜像两套面孔。默认 personal，文案与 lurus.cn 现网一致。
 * company 只在 SITE_PROFILE=company 的部署里出现，且不带个人备案号。
 * 用括号读取环境变量，避免 Next 在构建时把值写死进镜像。
 */

export type SiteNavItem = {
  name: string;
  href: string;
  external?: boolean;
};

export type BeianLink = {
  label: string;
  href: string;
};

type HomeAction = {
  label: string;
  href: string;
  primary?: boolean;
};

type SiteProfileBase = {
  siteUrl: string;
  contactEmail: string;
  title: string;
  description: string;
  homeLabel: string;
  homeEyebrow: string;
  homeH1: string;
  homeLead: string;
  homeActions: readonly HomeAction[];
  layersLead: string;
  inviteNext: string;
  aboutDescription: string;
  aboutH1: string;
  aboutLead: string;
  footerBlurb: string;
  nav: readonly SiteNavItem[];
  beian: readonly BeianLink[];
};

export type SiteProfile =
  | (SiteProfileBase & { id: "personal"; legalName: null })
  | (SiteProfileBase & { id: "company"; legalName: string });

const PERSONAL_ICP = "鲁ICP备2026000242号";
const PERSONAL_PSB = "鲁公网安备37060002001239号";
const PERSONAL_PSB_CODE = "37060002001239";
const COMPANY_LEGAL_NAME = "硅知睿智能科技（烟台）有限公司";

const DOCS = "https://docs.lurus.cn";

const PERSONAL_NAV: readonly SiteNavItem[] = [
  { name: "Switch", href: "/switch" },
  { name: "见证", href: "/witness" },
  { name: "Kova", href: "/kova" },
  { name: "Memorus", href: "/memorus" },
  { name: "Hub", href: "/hub" },
  { name: "Platform", href: "/lugo" },
  { name: "方法", href: "/approach" },
  { name: "文档", href: DOCS, external: true },
];

const COMPANY_NAV: readonly SiteNavItem[] = [
  { name: "服务", href: "/#offer" },
  { name: "构件", href: "/#layers" },
  { name: "方法", href: "/approach" },
  { name: "公司", href: "/about" },
  { name: "文档", href: DOCS, external: true },
];

export type SiteProfileInput = {
  siteProfile?: string;
  companyIcp?: string;
  companyPsbLabel?: string;
  companyPsbCode?: string;
};

function trimmed(value: string | undefined): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

function companyBeian(input: SiteProfileInput): readonly BeianLink[] {
  const links: BeianLink[] = [];
  const icp = trimmed(input.companyIcp);
  if (icp) links.push({ label: icp, href: "https://beian.miit.gov.cn/" });
  const psbLabel = trimmed(input.companyPsbLabel);
  const psbCode = trimmed(input.companyPsbCode);
  if (psbLabel && psbCode && /^\d{5,20}$/.test(psbCode)) {
    links.push({
      label: psbLabel,
      href: `https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${psbCode}`,
    });
  }
  return links;
}

/** 纯函数：环境变量在 siteProfile() 边界读入。 */
export function profileFrom(input: SiteProfileInput): SiteProfile {
  if (trimmed(input.siteProfile) !== "company") {
    return {
      id: "personal",
      legalName: null,
      siteUrl: "https://www.lurus.cn",
      contactEmail: "contact@lurus.cn",
      title: "LurusTech — 个人项目站",
      description:
        "LurusTech 个人项目站：桌面工具、记忆与执行底座、网关与账号。状态写明证据强度；备份只认真恢复；各构件成熟度分别标明。",
      homeLabel: "LurusTech 个人项目站首页",
      homeEyebrow: "个人项目 · 工具与底座",
      homeH1: "我在做的 AI 工具与底座。",
      homeLead:
        "桌面端、记忆与执行、网关与账号——状态写明证据强度，备份只认真恢复一次才算数，成熟度各自标明。系统留在你自己的环境里。",
      homeActions: [
        { label: "下载与上手", href: "/download", primary: true },
        { label: "阅读方法", href: "/approach" },
        { label: "写信给 contact@lurus.cn", href: "mailto:contact@lurus.cn" },
      ],
      layersLead:
        "主标是核。三层仍按 LURUS / URUS / RUS 拆开，是工具与底座的地图，不是公司货架。怎么证明稳，写在方法页。最里一层 US 只留给自己用。",
      inviteNext: "下一步：来信写清环境现状与目标；我回复是否适合现阶段、怎么分期。",
      aboutDescription: "LurusTech 个人项目站：做 AI 工具与底座，用证据说明系统稳不稳。",
      aboutH1: "我在做 AI 工具与底座。",
      aboutLead:
        "LurusTech 是个人项目站。系统留在你自己的环境里；状态可核查、数据可恢复、改动有记录——每条都写明凭什么。",
      footerBlurb: "个人项目站：工具与底座，状态写明证据，备份只认真恢复。",
      nav: PERSONAL_NAV,
      beian: [
        { label: PERSONAL_ICP, href: "https://beian.miit.gov.cn/" },
        {
          label: PERSONAL_PSB,
          href: `https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${PERSONAL_PSB_CODE}`,
        },
      ],
    };
  }

  const email = "contact@ailurus.top";
  return {
    id: "company",
    legalName: COMPANY_LEGAL_NAME,
    siteUrl: "https://www.ailurus.top",
    contactEmail: email,
    title: "硅知睿 — LurusTech",
    description: `${COMPANY_LEGAL_NAME}：在客户自己的环境里做 AI 系统受托运维。卖可验证的可恢复性，和每月一份写明测量方式的报告。不含机房与算力转售。`,
    homeLabel: "硅知睿首页",
    homeEyebrow: "受托运维 · 客户自有环境",
    homeH1: "你环境里的系统，坏了要能原样恢复。",
    homeLead:
      "备份文件在，不算恢复。我们每月做一次真恢复，逐表核对，再出一份每个数字都写明怎么测的报告。系统留在你自己的环境里，不含机房与算力转售。",
    homeActions: [
      {
        label: "写信说明现在跑的系统",
        href: `mailto:${email}?subject=${encodeURIComponent("现在跑的系统")}`,
        primary: true,
      },
      { label: "阅读方法", href: "/approach" },
    ],
    layersLead:
      "卖的是已经在跑的系统能否恢复，不是一份产品价目。构件只说明做法。",
    inviteNext: "下一步：来信写清现在跑的是哪套系统。我们回复这一套能不能接，以及首月要跑通什么。",
    aboutDescription: `${COMPANY_LEGAL_NAME}：在客户自己的环境里做 AI 系统受托运维。合同买可验收的恢复和月报。`,
    aboutH1: "我们做 AI 系统的受托运维。",
    aboutLead: `${COMPANY_LEGAL_NAME}。系统留在客户自己的环境里。合同买的是可验收的恢复和月报，不是一套新软件，也不含机房与算力转售。`,
    footerBlurb: `${COMPANY_LEGAL_NAME}。受托运维留在客户自己的环境里，不含机房与算力转售。`,
    nav: COMPANY_NAV,
    beian: companyBeian(input),
  };
}

export function siteProfile(): SiteProfile {
  return profileFrom({
    siteProfile: process.env["SITE_PROFILE"],
    companyIcp: process.env["COMPANY_ICP"],
    companyPsbLabel: process.env["COMPANY_PSB_LABEL"],
    companyPsbCode: process.env["COMPANY_PSB_CODE"],
  });
}

/** 当前面孔的公开邮箱。个人站 contact@lurus.cn，公司站 contact@ailurus.top。 */
export function publicContact(): { email: string; href: string } {
  const email = siteProfile().contactEmail;
  return { email, href: `mailto:${email}` };
}
