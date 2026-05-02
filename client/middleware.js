import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("X-AS-Token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }

    if (!JWT_SECRET) {
      console.warn("JWT_SECRET is not defined in environment.");
      return NextResponse.redirect(new URL("/Login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

      if (!["admin", "editor"].includes(payload.role)) {
        return NextResponse.redirect(new URL("/Login", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
