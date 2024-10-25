import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";
import { MessageType } from "../types/chatTypes";

interface ChatState {
    chats: MessageType[] | []
    setChats: (chats: MessageType[]) => void
    addChat: (chat: MessageType) => void
    room: string
    setRoom: (room: string) => void
}

const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        chats: [],
        room: "",
        setChats: (chats: MessageType[]) => set({ chats }),
        addChat(chat) {
          set((state) => ({
            chats: [...state.chats, chat],
          }));
        },
        setRoom: (room: string) => set({ room }),
      }),
      {
        name: "chats",
      }
    )
  )
);

export default useChatStore;