import { API_KEY, API_SECRET } from "@/lib/config";
import { getAuthUrl } from "@/lib/utils/user.actions";
import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function GET(req: NextRequest) {
  const { oauth_token_secret } = (await getAuthUrl()) || {};
  // get the query
  const searchParams = req.nextUrl.searchParams;
  const oauth_token = searchParams.get("oauth_token");
  const oauth_verifier = searchParams.get("oauth_verifier");

  //
  console.log("oauth_token_secret", oauth_token_secret);

  try {
    const client = new TwitterApi({
      appKey: API_KEY,
      appSecret: API_SECRET,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret,
    });

    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await client.login(oauth_verifier!);
    // Store accessToken & accessSecret securely for future requests

    //

    return NextResponse.json({
      message: "Successfully authenticated!",
      access_Token: accessToken,
      access_Secret: accessSecret,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Authentication failed",
        error: "Invalid OAuth verifier or token",
      },
      { status: 400 }
    );
  }
}
