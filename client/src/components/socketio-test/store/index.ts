import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type Message = {
  content: string;
};

type SocketStore = {
  messages: Message[];
  addMessage: (msg: Message) => void;
};

export const useSocketStore = createWithEqualityFn<SocketStore>()(
  (set) => ({
    messages: [],
    addMessage: (msg) =>
      set((state) => ({
        messages: [...state.messages, msg],
      })),
  }),
  shallow,
);
