import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import type { User } from "@prisma/client";
import { cookies } from "next/headers";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plaintTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plaintTextPassword, hashedPassword);

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
``
  return payload.payload as User;
};

export const getUserFromCookie = async () => {
  if (process.env.COOKIE_NAME) {
    const jwt = cookies().get(process.env.COOKIE_NAME);

    if (!jwt?.value) {
      throw new Error("JWT not found in cookie");
    }

    const { id } = await validateJWT(jwt.value);

    const user = await db.user.findUnique({
      where: {
        id: id as string,
      },
    });

    return user;
  } else {
    throw new Error("COOKIE_NAME not set");
  }
};
