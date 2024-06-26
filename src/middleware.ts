import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/types/enum/role";

const allUsers = ["/dashboard", "/config"];
export const allowedPaths = {
  [Role.ADMIN]: [...allUsers, "/users", "/plans"],
  [Role.USER]: [...allUsers],
};

// Função para adicionar cabeçalhos CORS
function addCorsHeaders(response: any) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Permite qualquer origem - use com cuidado em produção
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function middleware(req: NextRequest): Promise<NextResponse> {

  // Configurar cabeçalhos CORS para requisições OPTIONS
  if (req.method === "OPTIONS") {
    const response = NextResponse.next();
    return addCorsHeaders(response);
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!session) {
    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login/?callbackUrl=${pathname}`);
    return addCorsHeaders(response);
  }

  const userRolePaths = allowedPaths[session.role];
  if (userRolePaths && !userRolePaths.some((path) => pathname.includes(path))) {
    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
    return addCorsHeaders(response);
  }

  const response = NextResponse.next();
  return addCorsHeaders(response);
}

export const config = {
  matcher: [
    "/dashboard",
    "/config/:path*",
    "/users/:path*",
    "/plans/:path*",
  ],
};
