"use client";

import useDarkModeStore from "@/app/_types/_store/useDarkModeStore";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <div className="max-w-[90rem] mx-auto" data-theme={isDarkMode ? "dark" : ""}>
      {children}
    </div>
  );
};

export default GlobalLayout;
