import io, { Socket } from "socket.io-client";
import { createContext, useMemo, ReactNode } from "react";

// Define a type for your socket context
type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null); 
interface SocketProviderProps {
  children: ReactNode; 
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io(import.meta.env.VITE_SERVER_URI), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
