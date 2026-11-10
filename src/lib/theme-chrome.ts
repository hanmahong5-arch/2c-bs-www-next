// 浏览器顶栏跟页面实际铺的纸色走。浅色是 tokens 的 --lt-paper。
// 暗色以 globals.css 的 .dark 覆写为准（#16150F），不是 vendor tokens 里的 #14130F。
export const PAPER_LIGHT = "#F5F2E8";
export const PAPER_DARK = "#16150F";

export function themeColor(dark: boolean): string {
  return dark ? PAPER_DARK : PAPER_LIGHT;
}

/** 与原先的 theme-init 同一条判断：记住的选择优先，否则跟系统。同时写下顶栏颜色。 */
export function themeChromeScript(): string {
  return `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',d?'${PAPER_DARK}':'${PAPER_LIGHT}');}catch(e){}})();`;
}
