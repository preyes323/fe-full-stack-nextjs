"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHomeError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (error.message.startsWith("Invalid User.")) {
      setTimeout(() => router.push("/signin"), 3000);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
  }, [error, router]);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <div className="rounded-3xl px-10 py-4 drop-shadow-xl bg-white w-full relative text-lg text-gray-700 font-bold mb-4">{`${error.message}`}</div>
        </div>
      </div>
    </div>
  );
}
