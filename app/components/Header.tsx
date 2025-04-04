"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import useDarkModeStore from "../types/store/useDarkModeStore";
import DarkModeToggle from "./shared/DarkModeToggle";

const Header = () => {
  const router = useRouter();
  const { toggleDarkMode } = useDarkModeStore();
  const [scroll, setScroll] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY >= 200) {
      setScroll("header-fixed");
    } else setScroll("");
  }, []);

  return (
    <header className={`w-full bg-white shadow-md dark:bg-black ${scroll}`}>
      <div className="flex items-center justify-between max-w-[90rem] mx-auto px-5">
        <h1 className="text-3xl font-bold">
          <button className="cursor-pointer hover:opacity-80 transition-all" onClick={() => router.push("/")}>
            H's Blog
          </button>
        </h1>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
