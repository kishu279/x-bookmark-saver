import { getServerSession, NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from "./config";
import { createUser, UserType } from "./db/SaveUsers";

const authOptions = {
  secret: NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      console.log("#####Debug#####", { user, account, profile });

      // call the function Create User
      //
      const createdOrFoundUser = await createUser({
        email: user.email || profile?.email,
        name: user.name || profile?.name || profile?.login,
      });

      return true;
    },
    async jwt({ token, user, account, profile, session }) {
      console.log({ token, user, account, profile, session });
      return token;
    },
    async session({ session, token, user }) {
      console.log({ token, user, session });
      return session;
    },
  },
} satisfies NextAuthOptions;

// use this to get the session on the server side
function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export { authOptions, auth };
