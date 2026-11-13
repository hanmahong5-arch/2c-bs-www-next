export const NEW_WINDOW_LABEL = "（新窗口打开）";

/** 外链已用 target=_blank 时，补上读屏能听到的说明。箭头只给眼睛看。 */
export function NewWindowNote({ arrow = false }: { arrow?: boolean }) {
  return (
    <>
      {arrow ? (
        <span aria-hidden="true" className="ml-0.5">
          ↗
        </span>
      ) : null}
      <span className="sr-only">{NEW_WINDOW_LABEL}</span>
    </>
  );
}
