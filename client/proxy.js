import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);


  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("X-AS-Token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
    console.log(SECRET);

    try {
     
      const { payload } = await jwtVerify(token, SECRET);

    
      if (!["admin", "editor"].includes(payload.role)) {
        return NextResponse.redirect(new URL("/Login", request.url));
      }

     
      return NextResponse.next();
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};