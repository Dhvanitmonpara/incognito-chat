import "./App.css";
import { useEffect } from "react";
import useSocket from "./socket/useSocket";
import useChatStore from "./store/chatStore";
import useSocketStore from "./store/socketStore";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Message, Room } from "./types/chatTypes";

function App() {
  const socket = useSocket();
  const { setChats, addChat, setRoom, room } = useChatStore();
  const { setSocketId, setUser } = useSocketStore();

  useEffect(() => {
    const handleConnect = () => {
      setSocketId(socket.id || "");
    };

    const handleReceiveMessage = (data: Message) => {
      addChat(data);
    };

    const handleJoinedRoom = ({
      room,
      username,
      socketId,
    }: {
      room: Room;
      username: string;
      socketId: string;
    }) => {
      setRoom(room);
      if (socketId === socket.id) {
        setUser(username);
      } else {
        toast(`${username} has joined ${room.roomName}`);
      }
    };

    const handleLeftRoom = ({
      room,
      socketId,
      username,
    }: {
      room: Room;
      socketId: string;
      username: string;
    }) => {
      if (socketId === socket.id) {
        setRoom(null);
      } else {
        setRoom(room);
        toast(`${username} has left ${room.roomName}`);
      }
    };

    const handleDisconnect = () => {
      setSocketId("");
      setRoom(null);
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
  }, [socket, setChats, addChat, room, setRoom, setSocketId, setUser]);

  return (
    <div className="bg-zinc-800 h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
