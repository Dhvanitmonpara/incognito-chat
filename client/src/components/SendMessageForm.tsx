import { FormEvent, useState } from "react";
import useChatStore from "../store/chatStore";
import { IoSendSharp } from "react-icons/io5";
import useSocket from "../socket/useSocket";

// Type for the message payload
interface MessageData {
  room: string;
  message: string;
  sender: string | undefined;
}

function SendMessageForm() {
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const { room } = useChatStore();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    
    if (socket && room && message.trim()) {
      const messageData: MessageData = { room, message, sender: socket.id };
      socket.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="fixed bg-zinc-800 bottom-0 left-0 px-8 pt-6 pb-8 w-full flex flex-col space-y-5 justify-center items-center">
      <form
        onSubmit={handleSendMessage}
        className="h-12 w-full max-w-xl bg-zinc-700 flex justify-center rounded-full overflow-hidden px-1 items-center"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send something"
          className="p-2 pl-6 bg-zinc-700 w-full text-zinc-100 outline-none"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-full bg-zinc-100 hover:bg-zinc-300 text-zinc-900 transition-all ${
            message.trim() ? "scale-100" : "scale-0"
          }`}
        >
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
}

export default SendMessageForm;
