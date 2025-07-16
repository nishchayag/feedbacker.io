import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = [
  "/",
  "/login",
  "/signup",
  "/forgotPassword",
  "/resetPassword",
  "/verifyEmail",
  "/u/[username]",
];
const isAuthPage = (path: string) => {
  return authPages.includes(path);
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const currUrl = request.nextUrl.pathname;
  if (!token && !isAuthPage(currUrl)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && isAuthPage(currUrl)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api/|login|signup|forgotPassword|resetPassword|verifyEmail|u/[username]).*)",
  ],
};
