import { TwitterApi } from "twitter-api-v2";
import { API_KEY, API_SECRET } from "../config";

const CALLBACK_URL = "http://localhost:3000/api/auth/callback";

export async function getAuthUrl() {
  const client = new TwitterApi({ appKey: API_KEY, appSecret: API_SECRET });
  const authLink = await client.generateAuthLink(CALLBACK_URL); // use the url generated

  console.log("### Auth Link ### :", authLink);

  return authLink;
}
