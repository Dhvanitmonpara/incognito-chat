import { Socket } from "socket.io-client";
import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

interface SocketState {
  socketId: string;
  setSocketId: (socketId: string) => void;
  socket: Socket | undefined;
  setSocket: (socket: Socket | undefined) => void;
}

const useSocketStore = create<SocketState>()(
  devtools(
    persist(
      (set) => ({
        socketId: "",
        setSocketId: (socketId: string) => set({ socketId }),
        socket: undefined,
        setSocket: (socket: Socket | undefined) => set({ socket }),
      }),
      {
        name: "chats",
      }
    )
  )
);

export default useSocketStore;
