import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";
import {Role} from "@/types/enum/role";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    sellTax: number;
    role: Role;
    sheets?: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    sellTax: number;
    role: Role;
    sheets?: string;
  }
}