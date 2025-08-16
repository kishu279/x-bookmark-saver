import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const authHandle = NextAuth(authOptions);

export { authHandle as GET, authHandle as POST };
