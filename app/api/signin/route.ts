import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createJWT, comparePasswords } from "@/lib/auth";

type LoginInfo = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  let data: LoginInfo = await req.json();

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Invalid Login" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const isUser = await comparePasswords(data.password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    const isProduction = process.env.NODE_ENV === "production";

    if (process.env.COOKIE_NAME) {
      const response = new NextResponse(null, { status: 201 });
      response.cookies.set({
        name: process.env.COOKIE_NAME,
        value: jwt,
        path: "/",
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "Invalid Login" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
}
