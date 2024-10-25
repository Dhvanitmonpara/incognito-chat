import "./App.css";
import { useEffect } from "react";
import useSocket from "./socket/useSocket";
import useChatStore from "./store/chatStore";
import useSocketStore from "./store/socketStore";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { MessageType } from "./types/chatTypes";

function App() {
  const socket = useSocket();
  const { setChats, setRoom } = useChatStore();
  const { setSocketId } = useSocketStore();

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id || "");
    });

    socket.on("receive-message", (data: MessageType[]) => {
      console.log(data)
      setChats(data);
    });

    socket.on("joined-room", (room) => {
      setRoom(room);
    });

    socket.on("left-room", (room) => {
      setRoom("");
      setChats([]);
      toast(`You have left the room ${room}`)
    });

    socket.on("disconnect", () => {
      setSocketId("");
      toast("You have been disconnected")
    });
    
    socket.on("disconnect", () => {
      setSocketId("");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-zinc-800 h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
