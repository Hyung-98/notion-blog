"use client";

import React from "react";
import useDarkModeStore from "@/app/_types/_store/useDarkModeStore";
import Image from "next/image";

import IconSun from "@/public/image/sun-svgrepo-com.svg";
import IconMoon from "@/public/image/moon-svgrepo-com.svg";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center gap-4 px-4 py-2 border rounded bg-gray-200 dark:bg-zinc-700 text-black font-bold dark:text-white cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-400"
    >
      {isDarkMode ? (
        <Image src={IconSun} style={{ width: "2rem", height: "2rem" }} alt="Sun Icon" />
      ) : (
        <Image src={IconMoon} style={{ width: "2rem", height: "2rem" }} alt="Moon Icon" />
      )}
      {isDarkMode ? "라이트 모드" : "다크 모드"}
    </button>
  );
};

export default DarkModeToggle;
