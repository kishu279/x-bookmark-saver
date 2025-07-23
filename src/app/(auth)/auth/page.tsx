import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>Authenticate Yourself</h1>
      <Link href={"/api/auth/initiate"}>authorize</Link>
    </div>
  );
}
