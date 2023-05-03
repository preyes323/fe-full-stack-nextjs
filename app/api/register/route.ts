import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";
import { use } from "react";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });

  const jwt = await createJWT(user);

  if (process.env.COOKIE_NAME) {
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
  } else {
    throw new Error("ENV variable COOKIE_NAME not set");
  }

  res.status(201);
  res.end();
}
