import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to x-bookmark</h1>
      </div>
      <div>
        <Link href={"/auth"}>auth-flow</Link>
      </div>
    </div>
  );
}
