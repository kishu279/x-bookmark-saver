"use client";

import { cn } from "@/lib/utils";
import LogoBoookiess from "./Logo";
import { Button } from "../ui/button";

const navBarLinks = [
  // { name: "resources", href: "#", className: "", variant: "secondary" },
  // { name: "Pricing", href: "#", className: "", variant: "ghost" },
  {
    name: "turoial",
    className: "",
    variant: "ghost",
    onclick: () => {
      // redirect to the tutorial
    },
  },
  // {
  //   name: "Login",
  //   onclick: () => {
  //     signIn("github", { callbackUrl: "/", redirect: false });
  //   },
  //   className: "",
  //   variant: "ghost",
  // },
  // {
  //   name: "Dashboard",
  //   className: "",
  //   variant: "outline",
  //   onclick: () => {
  //     // redirect to the dashboard
  //   },
  // },
];

export default function NavBar() {
  
  const status = "authenticated"
  // check for the authentication according to it show the content or not

  // const { data: session, status } = useSession();
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
                variant={`${item.variant}`}
                onClick={item.onclick}
              >
                {item.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-1 items-center">
            {/* Dashboard */}
            {status === "authenticated" ? (
              <Button
                onClick={() => {
                  // dashboard

                }}
                variant={"outline"}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                onClick={() => {
                  // signIn("github", {});
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
