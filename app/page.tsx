import { redirect } from "next/navigation";

export default function IndexPage() {
  redirect("/signin");

  return null;
}
