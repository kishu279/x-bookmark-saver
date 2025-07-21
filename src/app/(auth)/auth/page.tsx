import { getAuthUrl } from "@/lib/utils/user.actions";
import Link from "next/link";

export default async function page() {
  const authUrl = await getAuthUrl();
  return (
    <div>
      <div>
        <h1>Auth Page</h1>
        <p>This is the auth page</p>
      </div>
      <div>
        <Link href={authUrl.url}>authorize</Link>
      </div>
    </div>
  );
}
