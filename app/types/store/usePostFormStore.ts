import { create } from "zustand";

type PostFormState = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  bodyText: string;
  setField: (field: string, value: string | string[]) => void;
  resetForm: () => void;
};

export const usePostFormStore = create<PostFormState>((set) => ({
  title: "",
  description: "",
  slug: "",
  tags: [],
  bodyText: "",
  setField: (field, value) => set(() => ({ [field]: value })),
  resetForm: () =>
    set(() => ({
      title: "",
      description: "",
      slug: "",
      tags: [],
    })),
}));
