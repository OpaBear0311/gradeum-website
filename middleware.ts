import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // lite.gradeum.io -> /agencies (301 redirect)
  if (
    hostname.startsWith("lite.gradeum.io") ||
    hostname.startsWith("lite.localhost")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.replace("lite.", "");
    url.pathname = "/agencies" + url.pathname;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|art|og).*)"],
};
