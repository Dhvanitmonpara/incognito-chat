import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Message, Room } from "../types/chatTypes";

interface ChatState {
  room: Room | null;
  setChats: (chats: Message[]) => void;
  addChat: (chat: Message) => void;
  setRoom: (room: Room | null) => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        room: { roomName: "", chat: [], activeUsers: [] },
        setChats: (chats: Message[]) =>
          set((state) => ({
            room: state.room ? { ...state.room, chat: chats } : null,
          })),
        addChat: (chat: Message) =>
          set((state) => ({
            room: state.room ? { ...state.room, chat: [...state.room.chat, chat] } : null,
          })),
        setRoom: (room: Room | null) => set({ room }),
      }),
      {
        name: "chats",
      }
    )
  )
);

export default useChatStore;
