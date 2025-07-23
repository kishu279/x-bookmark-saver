import { getOauthLink } from "@/lib/utils/twitter-client";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { codeVerifier, state: sessionState, url } = getOauthLink();

    // store all the session/cookies
    const response = NextResponse.redirect(url);

    response.cookies.set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 10,
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("sessionState", sessionState, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 10,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Error during authentication callback:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
