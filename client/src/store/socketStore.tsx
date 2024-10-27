import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

interface SocketState {
  socketId: string;
  setSocketId: (socketId: string) => void;
  user: string;
  setUser: (user: string) => void;
}

const useSocketStore = create<SocketState>()(
  devtools(
    persist(
      (set) => ({
        socketId: "",
        user: "",
        setSocketId: (socketId: string) => set({ socketId }),
        setUser: (user: string) => set({ user }),
      }),
      {
        name: "chats",
      }
    )
  )
);

export default useSocketStore;
