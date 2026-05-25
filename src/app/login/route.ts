import { NextResponse } from "next/server";

const TARGET = "https://identity.lurus.cn/login";

export function GET(): NextResponse {
  return NextResponse.redirect(TARGET, 302);
}
