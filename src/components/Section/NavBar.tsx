"use client";

import { cn } from "@/lib/utils";
import LogoBoookiess from "./Logo";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const navBarLinks = [
  // { name: "resources", href: "#", className: "", variant: "secondary" },
  // { name: "Pricing", href: "#", className: "", variant: "ghost" },
  {
    name: "tutorial",
    className: "",
    variant: "ghost",
    onclick: () => {
      // redirect to the tutorial
    },
  },
];

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // console.log(session);

  return (
    <nav className="relative z-10 w-full">
      <div className="fixed top-0 left-0 w-full h-[80px] flex">
        <div className="flex items-center justify-around w-full ">
          {/* Logo */}
          <div>
            <LogoBoookiess />
          </div>

          {/* List of the buttons */}
          <div className="flex gap-1 items-center justify-center">
            {/* Buttons */}

            {navBarLinks.map((item, index) => (
              <Button
                key={`${index}-${item.name}`}
                className="capitalize"
                variant={
                  item.variant as
                    | "ghost"
                    | "link"
                    | "default"
                    | "destructive"
                    | "outline"
                    | "secondary"
                    | null
                    | undefined
                }
                onClick={item.onclick}
              >
                {item.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-1 items-center">
            {/* Dashboard */}
            {status === "authenticated" && (
              <Button
                onClick={() => {
                  // dashboard
                  router.push("/dashboard");
                }}
                variant={"outline"}
              >
                Dashboard
              </Button>
            )}

            {status === "unauthenticated" && (
              <Button
                variant={"outline"}
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
