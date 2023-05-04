import type { User } from "@prisma/client";

type LoginInfo = Pick<User, "email" | "password">;
type RegisterInfo = Pick<User, "email" | "password" | "firstName" | "lastName">;

interface FetcherParams {
  url: string;
  method: string;
  body: object;
  json?: boolean;
}

const fetcher = async ({ url, method, body, json = true }: FetcherParams) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(`${error}`);
  }

  if (json) {
    return await res.json();
  }
};

export const register = async (user: RegisterInfo) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: LoginInfo) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};
