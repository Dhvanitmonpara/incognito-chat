import { FormEvent } from "react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import useChatStore from "../store/chatStore";
import { IoSendSharp } from "react-icons/io5";

interface SendMessageFormProps {
    socket: Socket;
}

function SendMessageForm({socket}: SendMessageFormProps) {
  const [message, setMessage] = useState("");

  const {room} = useChatStore()

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        socket.emit("message", { room, message });
        setMessage("");
      };
  return (
    <form
      className="w-full flex flex-col space-y-5 justify-center items-center"
      onSubmit={handleSendMessage}
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
    </form>
  );
}

export default SendMessageForm;
