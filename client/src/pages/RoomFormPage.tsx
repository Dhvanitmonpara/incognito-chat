import { FormEvent } from "react";
import { useState } from "react";
import useChatStore from "./../store/chatStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSocket from "./../socket/useSocket";

function RoomFormPage() {
  const { setRoom, room } = useChatStore();
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleJoinRoom = (e: FormEvent) => {
    e.preventDefault();
    if (socket === null) {
      toast.error("Socket is not connected");
    } else {
      if (room) {
        socket.emit("leave-room", room);
        socket.emit("join-room", roomName);
      } else {
        socket.emit("join-room", roomName);
      }
      setRoom(roomName);
      navigate(`/chat/${roomName}`);
      setRoomName("");
    }
  };
  return (
    <div className="w-full h-screen bg-zinc-800 flex flex-col space-y-5 justify-center items-center">
      <form
        onSubmit={handleJoinRoom}
        className="md:w-full space-y-4 w-96 md:max-w-xl flex flex-col rounded-md justify-center overflow-hidden p-4 items-center"
      >
        <h1 className="text-zinc-100 pb-4 text-2xl">Create or Join Room</h1>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="py-3 px-6 bg-zinc-700 w-full border-2 rounded-full border-zinc-600 focus:border-zinc-500 text-zinc-100 outline-none"
        />
        <button
          disabled={!roomName.trim()}
          type="submit"
          className={`py-3 px-6 w-full font-semibold rounded-full bg-zinc-100 hover:bg-zinc-300 text-zinc-900 transition-all disabled:bg-zinc-400`}
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default RoomFormPage;
