import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { validateJWT } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name }: { name: string } = await req.json();

  if (process.env.COOKIE_NAME) {
    const jwt = req.cookies.get(process.env.COOKIE_NAME)?.value;

    if (jwt) {
      const user = await validateJWT(jwt);

      await db.project.create({
        data: {
          name,
          ownerId: user.id,
        },
      });

      return NextResponse.json({ data: { message: "ok" } });
    } else {
      throw new Error("No jwt cookie.");
    }
  } else {
    throw new Error("ENV variable COOKIE_NAME not set.");
  }
}
