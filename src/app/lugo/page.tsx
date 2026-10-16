import type { Metadata } from "next";
import Link from "next/link";
import {
  Disclosure,
  Eyebrow,
  EvidenceLine,
  EvidenceList,
  Lead,
  ProductHeader,
  Section,
} from "@/components/site";

// Lugo 产品页：ProductHeader → 核心主张 → 四个展开（账号与登录 / 钱与账 / 权益 / 安装与交付就绪）
// → 边界与现状。全部服务端渲染，无 JS 动效。
// 事实出处：lurus-platform 的 README.md、docs/customer-install.md、internal/adapter/payment/、
// internal/adapter/handler/router/router.go（/status、/docs/api）、api/openapi.yaml。

export const metadata: Metadata = {
  title: "Lugo · 账号与计费",
  description:
    "装进你自己环境的账号、钱包与收款底座：一套登录、一个钱包、多家支付渠道统一落账，退款与对账留痕。每个客户独立一套，自己的域名、数据库、身份源与密钥。",
};

const CONTACT = "mailto:contact@lurus.cn";

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

function SectionTitle({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-3 font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
      >
        {children}
      </h2>
    </>
  );
}

function Summary({ children }: { children: React.ReactNode }) {
  return <span className="text-[1.0625rem]">{children}</span>;
}

function Dash({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function LugoPage() {
  return (
    <>
      <ProductHeader
        name="Lugo · 账号与计费"
        maturity="内部生产使用"
        tagline="装进你自己环境的账号、钱包与收款底座：一套登录通行你的所有应用，一个钱包承接所有扣费，每一笔钱从下单到退款都有账可查。"
        note="每个客户独立一套：自己的域名、数据库、身份源与密钥。我们自己的全部产品也跑在它上面。"
        evidence={{
          name: "交付就绪 · internal_auth",
          status: "warn",
          label: "需处理",
          source: "有服务调用内部接口被拒（invalid_key）—— 这类故障平时是静默的，这里会被点名",
        }}
        evidenceCaption="示例 · 安装完成后的交付就绪看板中的一行"
      />

      {/* 核心主张 */}
      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="它做什么">
          钱路上的每一步，都能对上账。
        </SectionTitle>
        <Lead className="mt-6">
          你的应用不必各自造用户体系、各自接支付。账号在这里注册，钱包在这里扣费，
          支付回调在这里验签落账，退款原路返回，渠道对账单每天自动比对。
        </Lead>
      </Section>

      {/* 四个展开 */}
      <Section id="details" labelledBy="details-title">
        <SectionTitle id="details-title" eyebrow="细节">
          四件事，按需展开。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Summary>账号与登录：一次登录，所有应用通行。</Summary>}>
            <p>
              基于 OIDC 的单点登录，支持通行密钥（Passkey）、两步验证与社交登录；
              企业已有的身份源（如 Okta、Entra ID、Keycloak）经 OIDC 联合登录接入，
            员工名单可经 SCIM 2.0 自动同步成组织成员。
            </p>
            <p className="mt-2">
              组织之间的数据隔离由数据库行级安全（RLS）强制执行，不只靠应用代码自觉。
            </p>
          </Disclosure>

          <Disclosure summary={<Summary>钱与账：多家渠道，一本账。</Summary>}>
            <p>
              支付宝与微信支付直连、Stripe、对公转账等渠道注册进同一个收款中心：
              回调逐笔验签并核对商户、金额与订单号；漏掉的回调由主动查单兜底；
              退款幂等、原路返回；渠道日对账单自动下载比对。
              对公转账按附言码自动核销，网银流水可导入并查重。
            </p>
            <p className="mt-2">
              支付密钥在控制台粘贴即生效，不用重启。发票与红字冲销单可直接下载；
              销售方主体没配置时，接口拒绝出票，而不是替你编一个。
            </p>
            <EvidenceList className="mt-6" caption="示例 · 对账结果的两种写法（界面示意，非真实商户数据）">
              <EvidenceLine
                name="渠道对账 · 支付宝"
                status="ok"
                label="一致"
                source="日对账单与平台台账逐笔比对，金额与笔数相符"
              />
              <EvidenceLine
                name="订单 · 回调缺失"
                status="warn"
                label="已查单补账"
                source="未收到渠道回调 —— 主动查单确认已支付后入账，并留下补账记录"
              />
            </EvidenceList>
          </Disclosure>

          <Disclosure summary={<Summary>权益：应用离线判断用户能用什么。</Summary>}>
            <p>
              订阅与套餐换算成一张签名的权益令牌，你的应用用公开的 entkit 校验库
              在本地验签，就知道这个账号能用什么，不必每次回源查询。
            </p>
            <p className="mt-2">
              签名密钥在安装时于你的环境里生成，只归你所有；不存在由我们签发的许可证。
            </p>
          </Disclosure>

          <Disclosure summary={<Summary>安装与交付就绪：装完，看板全绿才算完。</Summary>}>
            <p>
              一条命令安装：单机用 Docker Compose，集群用 Helm。每一步要么跳过、要么收敛，
              失败后重跑同一条命令就从断点继续。
            </p>
            <p className="mt-2">
              安装终点是控制台里的「交付就绪」看板：数据库迁移、内部鉴权、登录回跳、
              支付、邮件、短信等逐项亮绿、黄或灰。灰表示功能未开启，不算错误；
              黄的每一项都写明去哪里修。
            </p>
            <p className="mt-2">
              接口以 OpenAPI 3.1 描述，在你的实例上可以在线浏览与调试；
              服务等级指标有一页公开的状态页。
            </p>
            <p className="mt-2">
              我们自己这套的接口规范公开可读，无需登录：{" "}
              <a href="https://identity.lurus.cn/docs/api" target="_blank" rel="noopener noreferrer" className={linkClass}>
                在线 API 参考
              </a>
              {" · "}
              <a href="https://identity.lurus.cn/docs/openapi.yaml" target="_blank" rel="noopener noreferrer" className={linkClass}>
                openapi.yaml
              </a>
              。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 边界与现状 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          它现在在哪儿，不做什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            现状：作为我们自己全部产品的账号与计费底座，在我们的准生产环境运行；
            客户私有安装的流程已在全新环境中演练过。
          </Dash>
          <Dash>
            在线收款（支付宝、微信支付直连）的下单、回调、退款与对账代码已就绪并有测试覆盖，
            但还没有用真实商户号跑通过。首个真实商户开通前，请把它当作「就绪待验证」，不是「已交付」。
          </Dash>
          <Dash>
            一套安装只服务一个客户。设置、产品目录、品牌与支付在一套安装内是全局的，
            不做一套服务多客户的白标。
          </Dash>
          <Dash>
            身份源目前固定为 Zitadel；企业自有身份源通过联合登录接入，不替换它。
          </Dash>
          <Dash>
            数据导出、凭据自动轮换等能力代码已在，但默认关闭。在你的部署里开启并验证之前，
            请把它们当作「可用但未开」。
          </Dash>
          <Dash>不做资金代收代付：你的钱进你自己的商户号。</Dash>
        </ul>
        <p className="mt-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          想看它装进你的环境是什么样，写信到{" "}
          <a href={CONTACT} className={linkClass}>
            contact@lurus.cn
          </a>
          ；部署与接入细节见{" "}
          <a
            href="https://docs.lurus.cn/platform/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            文档
          </a>
          ，或先读{" "}
          <Link href="/approach" className={linkClass}>
            方法
          </Link>
          。
        </p>
      </Section>
    </>
  );
}
