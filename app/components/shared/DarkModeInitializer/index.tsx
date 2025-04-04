"use client";

import useDarkModeStore from "@/app/types/store/useDarkModeStore";
import React, { useEffect } from "react";

const DarkModeInitializer = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return null;
};

export default DarkModeInitializer;
