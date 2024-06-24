import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/types/enum/role";
import runMiddleware, { cors } from "../lib/cors";

const allUsers = ["/dashboard", "/config"];
export const allowedPaths = {
  [Role.ADMIN]: [...allUsers, "/users", "/plans"],
  [Role.USER]: [...allUsers],
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  // Executa o middleware CORS
  await runMiddleware(req, new NextResponse(), cors);

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!session) {
    return NextResponse.redirect(`${ process.env.NEXTAUTH_URL }/login/?callbackUrl=${ pathname }`);
  }

  const userRolePaths = allowedPaths[session.role];
  if (userRolePaths && !userRolePaths.some((path) => pathname.includes(path))) {
    return NextResponse.redirect(`${ process.env.NEXTAUTH_URL }/dashboard`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/config/:path*",
    "/users/:path*",
    "/plans/:path*",
  ],
};
