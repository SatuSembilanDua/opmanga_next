import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const isSecret = req.nextUrl.pathname.startsWith("/manga");
  const unlocked = req.cookies.get("unlocked")?.value === "true";
  if (isSecret && !unlocked) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/manga/:path*"],
};
