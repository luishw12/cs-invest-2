import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { userService } from "./services/userService";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 60 * 60 * 24 // 1 dia
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session.user.nome) {
        token.nome = session.user.nome;
        token.sellTax = session.user.sellTax;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: '/login', //(4) custom signin page path
    signOut: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        };

        return userService.authenticate(email, password); //(5)
      }
    })
  ],
  secret: process.env.AUTH_SECRET
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)