import "server-only";

import { redirect } from "next/navigation";
import { getUserFromCookie } from "./auth";
import { delay } from "@/lib/async";

export async function withAuthorizedUser() {
  await delay(5000);
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/signin");
  }

  return user;
}
