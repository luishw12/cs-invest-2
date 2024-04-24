import Cors from "cors";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configure o middleware CORS
const corsMiddleware = Cors({
  origin: "*", // Permita solicitações de qualquer origem (mude conforme necessário)
  methods: ["GET", "POST", "PUT", "DELETE"], // Permita os métodos HTTP necessários
  allowedHeaders: ["Content-Type", "Authorization"], // Permita os cabeçalhos necessários
});

// O manipulador de API NextAuth com middleware CORS
const handler: NextApiHandler = async (req, res) => {
  // Execute o middleware CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
  // Passe a requisição para o NextAuth
  return NextAuth(req, res, {
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
          token = {...token, ...session.user}
        }
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token;
        return session;
      }
    },
  });
};

export default handler;
