import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { Prisma } from "@prisma/client";

type RegisterInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function POST(req: NextRequest) {
  let { email, password, firstName, lastName }: RegisterInfo = await req.json();

  try {
    const user = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await hashPassword(password),
      },
    });

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
    } else {
      throw new Error("ENV variable COOKIE_NAME not set");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new NextResponse(
          JSON.stringify({ error: "Email already exists" }),
          {
            status: 409,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    return new NextResponse(
      JSON.stringify({
        error: "Unexpected error occurred when creating the user",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
