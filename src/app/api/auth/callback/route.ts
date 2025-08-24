import { completeAuth } from "@/lib/utils/twitter-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // get the query
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  // get the codeverifier and session state from cookies
  const cookieData = req.cookies;
  const codeVerifier = cookieData.get("codeVerifier")?.value;
  const sessionState = cookieData.get("sessionState")?.value;

  if (!codeVerifier || !sessionState || !code || !state) {
    return new Response("Failed to authenticate refused by user", {
      status: 500,
    });
  }

  if (state !== sessionState) {
    return Response.json(
      { error: "Stored tokens didnt match!" },
      { status: 400 }
    );
  }

  try {
    // complete the authentication
    const { success, error, user } = await completeAuth({ code, codeVerifier });

    if (!success) {
      return Response.json({ error }, { status: 500 });
    }

    const response = NextResponse.redirect("/dashboard");
    // response.json({ user: user?.name || user?.username }, { status: 200 });

    // return Response.json(
    //   { user: user?.name || user?.username },
    //   {
    //     status: 200, // 200 - OK
    //   }
    // );

    return response
  } catch (error) {
    console.error("Error during authentication callback:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
