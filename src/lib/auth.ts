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
    async jwt({ token, user, account, profile, session }) {
      console.log({ token, user, account, profile, session });
      
      return token;
    },
    async session({ session, token, user }) {
      console.log({ token, user, session });

      // const data: UserType = {
      //   name: user.name!,
      //   email: user.email,
      //   accessToken: token.accessToken as string,
      //   refreshToken: token.refreshToken as string,
      //   expiresIn: token.expiresIn as number,
      // };

      // // save the user in the prisma client
      // const createdUser = await createUser(data);

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
