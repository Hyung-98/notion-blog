"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <h2
        className="text-8xl font-bold cursor-pointer hover:text-zinc-500 transition-colors"
        onClick={() => router.push("/list")}
      >
        Notion Blog
      </h2>
    </div>
  );
}
