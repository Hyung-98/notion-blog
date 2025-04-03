import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeState {
  isDarkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setDarkMode: (val) => {
        updateHtmlClass(val);
        set({ isDarkMode: val });
      },
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.isDarkMode;
          updateHtmlClass(next);
          return { isDarkMode: next };
        }),
    }),
    {
      name: "dark-mode",
    }
  )
);

const updateHtmlClass = (isDark: boolean) => {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
};

export default useDarkModeStore;
