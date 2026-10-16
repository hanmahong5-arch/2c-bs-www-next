import { NextResponse } from "next/server";

// 邀请链接 lurus.cn/r/<邀请码> 的落地。
// 身份服务早期发出去的分享链接都指向官网的 /r/，但官网从没接这条路由，点开就是 404，
// 被邀请人的返利也就一笔都记不上。真正的落地（写邀请 cookie、跳注册）在身份服务的
// /r/:code，这里只做一跳转发；格式不对的码直接去注册页，不转发任意路径。
const IDENTITY = "https://identity.lurus.cn";
const AFF_CODE = /^[A-Za-z0-9_-]{4,32}$/;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
): Promise<NextResponse> {
  const { code } = await params;
  const target = AFF_CODE.test(code)
    ? `${IDENTITY}/r/${code}`
    : `${IDENTITY}/register`;
  return NextResponse.redirect(target, 302);
}
