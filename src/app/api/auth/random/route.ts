import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // send the simple response for checking the next js route are working or not
  return Response.json("Random Auth Route", { status: 200 });
}
