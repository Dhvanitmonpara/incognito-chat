import { FormEvent, useEffect } from "react";
import { useState } from "react";
import useChatStore from "./../store/chatStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSocket from "./../socket/useSocket";
import { FaCircleCheck } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";

function RoomFormPage() {
  const { room } = useChatStore();
  const [serverStatus, setServerStatus] = useState<"Active" | "Inactive" | "Unknown">("Unknown");
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleJoinRoom = (e: FormEvent) => {
    e.preventDefault();
    if (socket === null) {
      toast.error("Socket is not connected");
    } else {
      if (room) {
        socket.emit("leave-room", {
          room: room?.roomName,
          socketId: socket.id,
          username,
        });
        socket.emit("join-room", {
          room: roomName,
          username,
          socketId: socket.id,
        });
      } else {
        socket.emit("join-room", {
          room: roomName,
          username,
          socketId: socket.id,
        });
      }
      navigate(`/chat/${roomName}`);
      setRoomName("");
    }
  };

  const checkServerHealth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/healthz`);

      if (!res.ok) {
        throw new Error("Server is not active");
      }

      setServerStatus("Active")

    } catch (error) {
      if (error instanceof Error) {
        toast.error("Server is not active: " + error.message);
        setServerStatus("Inactive");
      }
    }
  }

  useEffect(() => {
    if (import.meta.env.VITE_ENVIRONMENT === "production") {
      checkServerHealth()
    } else {
      setServerStatus("Active")
    }
  }, [])

  return (
    <div className="w-full h-[100dvh] bg-zinc-900 flex flex-col space-y-5 justify-end sm:justify-center items-center">
      <form
        onSubmit={handleJoinRoom}
        className="space-y-4 w-full pb-32 px-8 sm:p-4 max-w-96 sm:max-w-lg md:max-w-xl flex flex-col rounded-md justify-center overflow-hidden items-center"
      >
        <h1 className="text-zinc-100 pb-4 font-semibold text-2xl select-none">
          Create or Join Room
        </h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="py-3 px-6 bg-zinc-800 w-full border-2 rounded-full border-zinc-700 focus:border-zinc-600 text-zinc-100 outline-none"
        />
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="py-3 px-6 bg-zinc-800 w-full border-2 rounded-full border-zinc-700 focus:border-zinc-600 text-zinc-100 outline-none"
        />
        <button
          disabled={!roomName.trim() || !username.trim() || (serverStatus !== "Active")}
          type="submit"
          className={`py-3 px-6 w-full select-none font-semibold rounded-full bg-zinc-100 hover:bg-zinc-300 text-zinc-900 transition-all disabled:bg-zinc-400`}
        >
          Join
        </button>
      </form>
      <div className="text-zinc-300 space-x-1.5">
        {serverStatus === "Unknown" && <>
          <LuLoader2 className="inline-block animate-spin" />
          <span>
            Fetching server status
          </span>
        </>}
        {serverStatus === "Active" ?
          <>
            <FaCircleCheck className="inline-block text-green-500" />
            <span>
              Server is Active
            </span>
          </>
          :
          <span className="text-red-500">
            Server is inactive, It'll be active in a few seconds
          </span>
        }
      </div>
    </div>
  );
}

export default RoomFormPage;
