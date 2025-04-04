"use client";

import useDarkModeStore from "@/app/types/store/useDarkModeStore";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <div className="max-w-[90rem] mx-auto px-5" data-theme={isDarkMode ? "dark" : ""}>
      {children}
    </div>
  );
};

export default GlobalLayout;
