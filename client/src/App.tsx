import { io } from "socket.io-client";
import "./App.css";
import { useEffect } from "react";
import { useMemo } from "react";
import useChatStore from "./store/chatStore";
import Chats from "./components/Chats";
import Navbar from "./components/Navbar";
import RoomForm from "./components/RoomForm";
import useSocketStore from "./store/socketStore";
import { Toaster } from "react-hot-toast";

function App() {
  const socket = useMemo(() => io("http://localhost:8001"), []);
  const { setChats, setRoom } = useChatStore();
  const { setSocketId, socketId, setSocket } = useSocketStore();

  useEffect(() => {
    setSocketId("");

    socket.on("connect", () => {
      setSocketId(socket.id || "");
      setSocket(socket);
    });

    socket.on("message", (message) => {
      setChats(message);
    });

    socket.on("joined-room", (room) => {
      setRoom(room);
    });

    socket.on("left-room", (room) => {
      setRoom(room);
    });

    socket.on("disconnect", () => {
      setSocketId("");
      setSocket(undefined);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {socketId ? (
        <div>
          <Navbar />
          <Chats />
        </div>
      ) : (
        <RoomForm />
      )}
      <Chats />
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-center"}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
