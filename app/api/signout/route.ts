import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";

  if (process.env.COOKIE_NAME) {
    const response = new NextResponse(null, { status: 200 });
    response.cookies.set({
      name: process.env.COOKIE_NAME,
      value: "",
      path: "/",
      httpOnly: true,
      secure: isProduction,
      maxAge: -1,
      expires: new Date(0),
    });

    return response;
  } else {
    return new NextResponse(
      JSON.stringify({ error: "ENV variable COOKIE_NAME not set" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
