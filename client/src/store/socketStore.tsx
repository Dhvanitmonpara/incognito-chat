import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

interface SocketState {
  socketId: string;
  setSocketId: (socketId: string) => void;
}

const useSocketStore = create<SocketState>()(
  devtools(
    persist(
      (set) => ({
        socketId: "",
        setSocketId: (socketId: string) => set({ socketId }),
      }),
      {
        name: "chats",
      }
    )
  )
);

export default useSocketStore;
