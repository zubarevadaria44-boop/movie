// middleware.ts (в корне проекта, рядом с package.json)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAdmin = req.nextauth.token?.role === "admin";
    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  },
  {
    pages: { signIn: "/admin/login" },
  }
);

export const config = {
  matcher: ["/admin/((?!login).*)"],
};