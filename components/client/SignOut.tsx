"use client";
import { LogOut } from "react-feather";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/signout", { method: "POST" });

      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex justify-center items-center focus:outline-none"
    >
      <LogOut
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out"
        )}
      />
    </button>
  );
};

export default SignOut;
