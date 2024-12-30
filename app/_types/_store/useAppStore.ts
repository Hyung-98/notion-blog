import { create } from 'zustand';

interface AppStore {
  notionData: any | null;
  setNotionData: (data: any) => void;
}

const useAppStore = create<AppStore>((set) => ({
  notionData: null,
  setNotionData: (data) => set({ notionData: data }),
}));

export default useAppStore;
