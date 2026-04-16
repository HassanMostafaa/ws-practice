import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

interface IWSStoreprops {
  storedDisplayName: string;
  setStoredDisplayName: (displayName: string) => void;
}

export const useWSStore = createWithEqualityFn<IWSStoreprops>()(
  (set) => ({
    storedDisplayName: "",
    setStoredDisplayName: (displayName: string) =>
      set({ storedDisplayName: displayName }),
  }),
  shallow,
);
