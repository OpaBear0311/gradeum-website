// Domain configuration:
// - gradeum.io = primary (production)
// - www.gradeum.io = 301 redirect to gradeum.io (configured in Vercel dashboard)
// - lite.gradeum.io = redirect to /agencies (disabled until DNS configured)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|art|og).*)"],
};
