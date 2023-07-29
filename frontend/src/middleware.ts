import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (request.nextUrl.pathname === "/login") {
    const isExpired = request.nextUrl.searchParams.get("isExpired") === "true";
    if (isExpired) {
      request.cookies.clear();
    } else if (accessToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/login",
};
