import { io } from "socket.io-client";
import "./App.css";
import { IoSendSharp } from "react-icons/io5";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FormEvent } from "react";

function App() {
  const socket = useMemo(() => io("http://localhost:8000"), []);

  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id || "");
    });

    socket.on("disconnect", () => {
      setSocketId("");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  return (
    <>
      <div className="p-10 flex justify-center items-center flex-col space-y-5">
        <h1 className="text-3xl">
          {socketId ? `Connected with id ${socketId}` : "Not Connected"}
        </h1>
        <form
          className="w-full flex flex-col space-y-5 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="h-12 w-full max-w-xl flex justify-center rounded-full overflow-hidden px-1 items-center bg-zinc-800">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send something"
              className="p-2 pl-6 bg-zinc-800 w-full text-zinc-100 outline-none"
            />
            <button
              type="submit"
              className={`p-3 rounded-full bg-zinc-100 hover:bg-zinc-300 text-zinc-900 transition-all ${
                message.length > 0 ? "scale-100" : "scale-0"
              }`}
            >
              <IoSendSharp />
            </button>
          </div>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Add room id"
            className="p-2 pl-6 bg-zinc-800 text-zinc-100 outline-none"
          />
        </form>
        <p>
          {room ? `You are connected to room ${room}` : "No room connected"}
        </p>
      </div>
    </>
  );
}

export default App;
