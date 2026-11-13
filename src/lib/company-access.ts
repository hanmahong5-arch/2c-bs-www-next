/**
 * 公司站的接入站：主按钮是受托运维来信，不把构件页收成试用或私有部署。
 * 已经按方法或来信排好的站（见证）保持原样。个人站不调用这里。
 */
const SELLING_LABELS = new Set(["联系试用", "申请试点", "联系私有部署", "写信询问", "联系试点"]);

type Action = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
};

export function frameCompanyAccess<T extends Action>(
  actions: readonly T[],
  offer: { label: string; href: string },
): T[] {
  const kept = actions.filter((action) => !SELLING_LABELS.has(action.label));
  const framed = kept.some(
    (action) => action.href.startsWith("mailto:") || (action.primary === true && action.href === "/approach"),
  );
  if (kept.length === actions.length && framed) return [...actions];
  const demoted = kept.map((action) => ({ ...action, primary: false }));
  const method = demoted.some((action) => action.href === "/approach")
    ? []
    : [{ label: "阅读方法", href: "/approach" } as T];
  return [{ label: offer.label, href: offer.href, primary: true, external: true } as T, ...method, ...demoted];
}
