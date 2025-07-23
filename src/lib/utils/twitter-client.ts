import { TwitterApi } from "twitter-api-v2";
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } from "../config";
import { prismaClient } from "../db/prismaClient";

const prisma = prismaClient; // Initialize Prisma client

export function getTwitterClient() {
  return new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });
}

export function getOauthLink() {
  // create the Twitter client
  const client = getTwitterClient();

  // generate the OAuth2 link
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
    CALLBACK_URL,
    {
      scope: [
        "tweet.read",
        "bookmark.read",
        "offline.access",
        "tweet.write",
        "users.read",
        "users.email",
      ],
    }
  );

  return { url, codeVerifier, state };
}

// temporary storage -> user to credentials
const userSession = new Map<
  string,
  { accessToken: string; refreshToken: string; expiresIn: number }
>();

// callback functionality
export async function completeAuth({
  code,
  codeVerifier,
}: {
  code: string;
  codeVerifier: string;
}) {
  const client = getTwitterClient();

  try {
    // RESPONSE AFTER SUCCESSFULL AUTHENTICATION
    const {
      client: loggedClient,
      accessToken,
      refreshToken,
      expiresIn,
    } = await client.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: CALLBACK_URL,
    });

    // get the user details
    const { data: userObject } = await loggedClient.v2.me();
    console.log("### User Authenticated ###", userObject);

    // temporary storage

    // get all the bookmarks
    console.log("### Fetching Bookmarks ###");
    const bookmarks = await loggedClient.v2.bookmarks({
      expansions: ["referenced_tweets.id"],
      "tweet.fields": ["referenced_tweets", "text"],
    });

    for await (const bookmark of bookmarks) {
      // Find referenced quote tweet ID if present
      const quotedTweetId = bookmark.referenced_tweets?.find(
        (rt) => rt.type === "quoted"
      )?.id;
      let quotedTweet = null;

      if (quotedTweetId && bookmarks.includes?.tweets) {
        quotedTweet = bookmarks.includes.tweets.find(
          (t) => t.id === quotedTweetId
        );
      }

      console.log(
        `Bookmark: ${bookmark.id} - Quoted Tweet: ${quotedTweet?.id} - Text: ${bookmark.text} - Quoted Text: ${quotedTweet?.text}`
      );
    }

    // store it somewhere
    // inside the prisma

    // get the user's profile data in the response
    return {
      success: true,
      user: { name: userObject.name, username: userObject.username },
    };
  } catch (error) {
    console.error("Error during authentication callback:", error);
    return { success: false, error: error };
  }
}
