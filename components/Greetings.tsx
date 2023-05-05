import { getUserFromCookie } from "@/lib/auth";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/lib/async";
import { withAuthorizedUser } from "@/lib/dataAuth";
import { redirect } from "next/navigation";

const getData = async () => {
  await delay(5000);
  const user = await getUserFromCookie();
  return user;
};

const Greetings = async () => {
  const user = await withAuthorizedUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today&apos;s Schedule</Button>
      </div>
    </Card>
  );
};

export default Greetings;
