import { useEffect, useRef } from "react";
import useChatStore from "../store/chatStore";
import useSocketStore from "../store/socketStore";

function Chats() {
  const { chats } = useChatStore();
  const { socketId } = useSocketStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="flex flex-col px-8 py-4 h-full overflow-y-auto">
      {chats.length > 0 && (
        <div className="flex flex-col space-y-2 w-full max-w-3xl mx-auto">
          {chats.map(({ message, sender, _id }) => (
            <span
              key={_id}
              className={`py-2 px-4 w-fit ${
                socketId === sender ? "bg-blue-500 text-white self-end rounded-se-3xl rounded-l-3xl" : "bg-gray-700 text-white rounded-es-3xl rounded-r-3xl"
              }`}
            >
              {message}
            </span>
          ))}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default Chats;
