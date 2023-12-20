import NextAuth, {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Senha",
          type: "password"
        }
      },
      async authorize({email, password}: any) {
        const userCredentials = {
          email,
          password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/auth`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (res.ok && (!user.dateExpire || new Date() < new Date(user.dateExpire))) {
          return user;
        }
        return null;
      },
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24 // 1 dia
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session.user.nome) {
        token.nome = session.user.nome;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
};

export default NextAuth(authOptions);