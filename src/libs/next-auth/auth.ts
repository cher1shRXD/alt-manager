import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { initializeDataSource } from "../typeorm/initialize";
import { User } from "@/entities/User";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const database = await initializeDataSource();
        const userRepo = database.getRepository(User);
        const user = await userRepo.findOneBy({ email: credentials!.email });
        if(!user) return null;

        const isValid = await bcrypt.compare(credentials?.password || "no_password", user.password || "password")
        if(!isValid) return null;

        return {
          id: user?.id || "",
          email: user?.email || "",
          name: user?.name || "",
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
