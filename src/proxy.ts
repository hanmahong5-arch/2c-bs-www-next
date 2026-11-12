import { NextResponse, type NextRequest } from "next/server";

/** 把路径交给服务端组件。公司站用它在构件页顶上写和合同的关系。 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lurus-path", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
