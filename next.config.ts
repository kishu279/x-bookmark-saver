import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.icons8.com" }],
  },
  // async headers() {
  //   return Promise.resolve([
  //     {
  //       source: "/api/(.*)",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: true },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,POST,DELETE,PUT,PATCH",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ]);
  // return [
  //   {
  //     source: "/api/(.*)",
  //     headers: [
  //       { key: "Access-Control-Allow-Credentials", value: true },
  //       { key: "Access-Control-Allow-Origin", value: "*" },
  //       {
  //         key: "Access-Control-Allow-Methods",
  //         value: "GET,POST,DELETE,PUT,PATCH",
  //       },
  //       {
  //         key: "Access-Control-Allow-Headers",
  //         value:
  //           "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //       },
  //     ],
  //   },
  // ];
  // },
  
};

export default nextConfig;
