import { EvidenceLine, EvidenceList } from "@/components/site";
import { HUB_MODELS_URL, fetchHubModels, formatCNY } from "@/lib/hub-models";

const th =
  "py-3 pr-6 text-left font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-[var(--color-text-muted)]";
const td = "py-3 pr-6 align-baseline";

// 只有这一段依赖 hub.lurus.cn；页面用 Suspense 圈住它，接口慢或挂时其余部分照常先出。
export async function HubPriceTable() {
  const rows = await fetchHubModels();

  if (!rows || rows.length === 0) {
    return (
      <EvidenceList className="mt-8">
        <EvidenceLine
          name="价目表"
          status="unknown"
          label="暂时读不到"
          source={`${HUB_MODELS_URL} 没有返回可用的价格。本页不另存价格，读不到时宁可空着。`}
        />
      </EvidenceList>
    );
  }

  return (
    <>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-t border-[var(--lt-rule)] text-[15px]">
          <thead>
            <tr className="border-b border-[var(--lt-rule)]">
              <th scope="col" className={th}>模型</th>
              <th scope="col" className={th}>厂商</th>
              <th scope="col" className={`${th} text-right`}>输入 / 百万 token</th>
              <th scope="col" className={`${th} text-right`}>输出 / 百万 token</th>
              <th scope="col" className={`${th} text-right`}>按次</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[var(--lt-rule)]">
                <td className={`${td} font-mono text-[13px] text-[var(--lt-ink)]`}>{r.id}</td>
                <td className={`${td} text-[var(--color-text-secondary)]`}>{r.vendor || "—"}</td>
                <td className={`${td} text-right tabular-nums`}>{formatCNY(r.promptPerMTok)}</td>
                <td className={`${td} text-right tabular-nums`}>{formatCNY(r.completionPerMTok)}</td>
                <td className={`${td} text-right tabular-nums`}>{formatCNY(r.perRequest)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EvidenceList className="mt-6">
        <EvidenceLine
          name="价目表"
          status="ok"
          label={`${rows.length} 个模型`}
          source={`读取自 ${HUB_MODELS_URL}，与钱包实际扣费同一套单价；本页每 5 分钟刷新一次`}
        />
      </EvidenceList>
    </>
  );
}

export function HubPriceTableSkeleton() {
  return (
    <EvidenceList className="mt-8">
      <EvidenceLine name="价目表" status="unknown" label="读取中" source={HUB_MODELS_URL} />
    </EvidenceList>
  );
}
