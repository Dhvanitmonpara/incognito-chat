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
  const { setChats, addChat, setRoom, chats } = useChatStore();
  const { setSocketId } = useSocketStore();

  useEffect(() => {
    const handleConnect = () => {
      setSocketId(socket.id || "");
    };

    const handleReceiveMessage = (data: MessageType) => {
      addChat(data); // Directly add new message without checking length
    };

    const handleJoinedRoom = (room: string) => {
      setRoom(room);
    };

    const handleLeftRoom = ({
      room,
      sender,
    }: {
      room: string;
      sender: string;
    }) => {
      if (sender === socket.id) {
        setChats([]);
        setRoom("");
      } else {
        toast(`${sender} has left the room ${room}`);
      }
    };

    const handleDisconnect = () => {
      setSocketId("");
      setRoom("");
      setChats([]);
      toast("You have been disconnected");
    };

    const handleConnectError = (error: unknown) => {
      if (error instanceof Error) {
        console.error("Connection Error:", error.message);
      } else {
        console.error("Connection Error:", error);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("receive-message", handleReceiveMessage);
    socket.on("joined-room", handleJoinedRoom);
    socket.on("left-room", handleLeftRoom);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receive-message", handleReceiveMessage);
      socket.off("joined-room", handleJoinedRoom);
      socket.off("left-room", handleLeftRoom);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
    };
  }, [socket, setChats, addChat, chats, setRoom, setSocketId]);

  return (
    <div className="bg-zinc-800 h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
