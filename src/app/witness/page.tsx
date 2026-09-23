import type { Metadata } from "next";
import Link from "next/link";
import {
  Disclosure,
  EvidenceLine,
  EvidenceList,
  Eyebrow,
  Lead,
  ProductHeader,
  Section,
} from "@/components/site";

// 见证：先一句话，细节进展开。事实来源见 2l-svc-fleet README / business-reading-guide、
// 根仓 scripts/ops 下的外部探测、月报与恢复演练脚本，以及 docs 站 witness 目录。
// 全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "Lurus Witness · 见证",
  description:
    "只读采集、外部探测、每月真实恢复演练与月度证据报告。每条读数都写明证据强度。早期试点。",
};

const DOCS = "https://docs.lurus.cn/witness/";

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
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

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.9em] text-[var(--lt-ink)]">{children}</code>;
}

function Dash({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
      <span>{children}</span>
    </li>
  );
}

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

export default function WitnessPage() {
  return (
    <>
      <ProductHeader
        name="Lurus Witness · 见证"
        maturity="早期试点"
        tagline="回答一个问题：你环境里的这套系统现在是什么状态，以及我们对这个判断有多确定。"
        evidence={{
          name: "platform-core",
          version: "v1.4.2",
          status: "ok",
          source: "版本来自服务自报 · 健康来自自省实证",
          age: "12 秒前",
        }}
        evidenceCaption="示例 · 每条读数都带着它的来历"
      />

      {/* 证据强度是一等字段 */}
      <Section id="evidence" width="wide" labelledBy="evidence-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="evidence-title" eyebrow="证据强度">
            同样是「正常」，分量不同。
          </SectionTitle>
        </div>
        <EvidenceList
          className="mt-10"
          caption="示例 · 自省实证、宿主证据、黑盒推断，由强到弱"
        >
          <EvidenceLine
            name="platform-core"
            version="v1.4.2"
            status="ok"
            source="版本来自服务自报 · 健康来自自省实证"
            age="12 秒前"
          />
          <EvidenceLine
            name="app/postgres"
            version="15.8"
            status="ok"
            source="版本来自镜像标签 · 健康来自宿主证据（容器状态）"
            age="40 秒前"
          />
          <EvidenceLine
            name="客户自建 supabase"
            version="?"
            status="warn"
            label="正常（推断）"
            source="版本未知 · 健康为黑盒推断（仅可达性）"
            age="40 秒前"
          />
        </EvidenceList>
        <Lead className="mt-10">
          每个组件的版本和健康都必须附带来历，界面必须把来历显示出来。
          我们不承诺全绿，只承诺每个绿点都标明它的证据强度。
        </Lead>
        <div className="mt-8 max-w-[44rem]">
          <Disclosure summary="版本从哪来：version.source">
            <p>
              版本号从不单独出现。<Code>self_report</Code> 是组件自报；
              <Code>image_tag</Code> 读自镜像标签，只说明部署了什么；
              <Code>blackbox_inferred</Code> 从外部特征推测，不能用来判断升级了没有；
              <Code>unknown</Code> 显示为 <Code>?</Code>，绝不显示成 latest。
            </p>
            <p className="mt-2">
              组件返回 <Code>dev</Code>、<Code>unknown</Code> 这类占位字面量时，一律降级为未知。
              很多组件本来就不自报版本，显示 <Code>?</Code> 是准确，不是缺陷。
            </p>
          </Disclosure>
          <Disclosure summary="健康从哪来：health.evidence_class">
            <p>
              <Code>introspected</Code>：组件自己的健康或就绪接口回答了。
              <Code>host</Code>：在它所在的主机上看到的，如容器状态、服务单元、磁盘用量、备份文件时间。
              <Code>blackbox</Code>：只有外部信号，如状态码、证书到期日、端口是否接受连接。
            </p>
            <p className="mt-2">
              黑盒推断的「正常」只证明能连上，不证明功能对。连接失败也不算自省：
              我们只知道连不上，证据降级为黑盒。
            </p>
          </Disclosure>
          <Disclosure summary="陈旧不是正常，未知不是故障">
            <EvidenceLine
              name="nginx vhost"
              status="stale"
              source="采集器 3 小时未上报 —— 这不是「正常」，是「不知道」"
            />
            <p className="mt-3">
              读数超过判定窗口 <Code>max(3 × 上报间隔, 180 秒)</Code> 即显示陈旧，
              不沿用上一次的绿色。服务端判一次，大屏再用本机时钟判一次，取更悲观的结论。
            </p>
            <p className="mt-2">
              探针自己的命令失败、超时或解析不出来，结果是未知，不是故障。
              故障必须来自证据，比如容器报已退出、服务单元报失败。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 三种看法 */}
      <Section id="views" labelledBy="views-title">
        <SectionTitle id="views-title" eyebrow="三种看法">
          同一份只读数据，三种看法。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary="大屏：会议室投屏或电脑上盯。">
            <p>
              浏览器打开，粘一次只读令牌。一个部署一段，段首写明采集器上次上报距今多久，
              卡片按严重度排序：故障、降级、未知、陈旧、正常。
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              现状：已在我们自己的预发布环境常驻运行。
            </p>
          </Disclosure>
          <Disclosure summary="手机：随身、值班。">
            <p>
              用手机打开同一块大屏，或在移动端扫运维出示的一次性绑定码。绑定码短时效，扫过即作废。
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              现状：手机端的接入链路还没有完成验证。
            </p>
          </Disclosure>
          <Disclosure summary="整机进内网：数据不出网。">
            <p>
              汇聚服务整体搬进客户自己的网络，同一个二进制，只换配置和网络位置。
              大屏在该部署的标题旁显示「数据不出网」。另一种形态是采集器向外推送快照，
              被观测主机不需要开放任何入站端口。
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              现状：试点目前只运行在我们自己的环境里。安装包与镜像尚未公开发布；
              采集器能交叉编译到国产 CPU 架构，但能编译不等于验证过，交付前需在目标环境实测。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 备份可用 */}
      <Section id="restore" labelledBy="restore-title">
        <SectionTitle id="restore-title" eyebrow="恢复演练">
          备份可用，只认真恢复。
        </SectionTitle>
        <Lead className="mt-6">
          把备份真的恢复出来，再逐表核对行数。备份文件存在、压缩包校验通过、能列出目录，都不算。
        </Lead>
        <div className="mt-8">
          <Disclosure summary="演练怎么做">
            <ol className="list-decimal space-y-1 pl-5">
              <li>期望值从备份文件本身逐表数出来，不经过恢复路径。</li>
              <li>恢复进一次性隔离容器：无网络、不映射端口，跑完连数据目录一起删除。</li>
              <li>实际值逐表 <Code>count(*)</Code>；附件另行核对文件数与元数据行数。</li>
              <li>全部相等才算通过。期望清单为空不算通过，那说明判据本身失效了。</li>
            </ol>
          </Disclosure>
          <Disclosure summary="负对照：判据要能报失败">
            <p>
              演练脚本带一个开关，故意用有缺陷的恢复流程再跑一遍，判据必须报失败。
              一个从没见过它报失败的检查，不能当作证据。
            </p>
            <p className="mt-2">
              这不是假设：我们遇到过恢复命令退出码为 0，关键表却恢复成 0 行。只看退出码，那次会被记成成功。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 月度证据报告 */}
      <Section id="report" labelledBy="report-title">
        <SectionTitle id="report-title" eyebrow="月度证据报告">
          每个数字旁边，写着它是怎么测的。
        </SectionTitle>
        <Lead className="mt-6">
          可用率分本机与外部两路并列；外部一路缺样本的时段记为「未采样」，不计为成功。
        </Lead>
        <div className="mt-8">
          <Disclosure summary="报告里有什么">
            <ul className="space-y-2">
              <Dash>外部探测每 5 分钟一次；报告同时写出成功、失败、未采样三个数。</Dash>
              <Dash>备份恢复演练每月一次；最近一次演练超过 35 天，报告标为异常，不留空。</Dash>
              <Dash>证书读线上实际在用的那张；备份写明校验方式。</Dash>
              <Dash>指标在生成报告时现场采集，不含人工填写的数字；人工部分只有本月完成、下月计划、需要贵方配合三段文字。</Dash>
            </ul>
          </Disclosure>
          <Disclosure summary="为什么从另一台机器测">
            <p>
              服务器自己探测自己，整机宕机时探针一起停，那段时间会被记成正常。测量与被测不能同源。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 它不是什么 */}
      <Section id="not" labelledBy="not-title">
        <SectionTitle id="not-title" eyebrow="边界">
          它不是什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            不是运维控制台。v1 没有任何写操作：采集器只发 GET / HEAD，唯一例外是提交自己的快照；
            契约里预留的操作接口恒返回 501，界面上没有操作按钮。
          </Dash>
          <Dash>
            不只认自家产品。组件可以是一套开源数据库、一个 nginx 站点、一张快过期的证书，不认识的类型照常显示。
          </Dash>
          <Dash>不采集业务数据，也不是性能监控。按上报间隔观测，不叫「实时」。</Dash>
        </ul>
      </Section>

      {/* 结尾 */}
      <Section labelledBy="more-title">
        <p
          id="more-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          细节在{" "}
          <a href={DOCS} className={linkClass}>
            文档
          </a>
          ；我们怎么工作，见{" "}
          <Link href="/approach" className={linkClass}>
            方法
          </Link>
          。
        </p>
      </Section>
    </>
  );
}
