import { FormEvent, useState } from "react";
import useChatStore from "../store/chatStore";
import { IoSendSharp } from "react-icons/io5";
import useSocket from "../socket/useSocket";
import useSocketStore from "../store/socketStore";

// Type for the message payload
interface MessageData {
  room: string;
  message: string;
  sender: string | undefined;
  username: string;
}

function SendMessageForm() {
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const { room } = useChatStore();
  const { user } = useSocketStore();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (socket && room && message.trim()) {
      const messageData: MessageData = {
        room: room.roomName,
        message,
        sender: socket.id,
        username: user,
      };
      socket.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="fixed bg-zinc-800 bottom-0 left-0 px-4 pt-6 pb-8 w-full flex flex-col space-y-2 justify-center items-center">
      <div className="text-sm text-zinc-200">
        {room?.activeUsers.length ? (
          <>
            {room.activeUsers.map((user, index) => {
              const length = room.activeUsers.length;

              // Determine if the user is the last or second last
              const isLastUser = index === length - 1;
              const isSecondLastUser = index === length - 2;


              if(room.activeUsers.length === 1) {
                return (
                  <span key={user.id}>{user.username} is active now.</span>
                );
              }

              // Construct the message for each user
              if (isLastUser) {
                return (
                  <span key={user.id}>{user.username} are active now.</span>
                );
              }

              if (isSecondLastUser) {
                return <span key={user.id}>{user.username} and </span>;
              }

              return <span key={user.id}>{user.username}, </span>;
            })}
          </>
        ) : (
          <span>No active users</span>
        )}
      </div>

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
