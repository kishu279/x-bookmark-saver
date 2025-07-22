import { completeAuth, getOauthLink } from "@/lib/utils/twitter-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // get the query
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  // get the codeverifier and state:sessionstate
  const { codeVerifier, state: sessionState } = await getOauthLink();

  if (!codeVerifier || !sessionState || !code || !state) {
    return new Response("Failed to authenticate refused by user", {
      status: 500,
    });
  }

  try {
    // complete the authentication
    const response = await completeAuth({ code, codeVerifier });

    if() {
        
    }
  } catch (error) {
    console.error("Error during authentication callback:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
