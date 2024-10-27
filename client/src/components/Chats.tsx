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
        <div className="flex flex-col space-y-1 w-full max-w-3xl mx-auto">
          {chats.map(({ message, sender, _id, username }, index) => {
            const isSameSenderAsPrevious =
              index > 0 && chats[index - 1].sender === sender;
                const isSameSenderAsNext =
              index < chats.length - 1 && chats[index + 1].sender === sender;

            return (
              <div
                key={_id || index}
                className={`flex flex-col ${
                  socketId === sender ? "self-end items-end" : "items-start"
                }`}
              >
                {!isSameSenderAsPrevious && sender !== socketId && (
                  <span className="text-xs text-gray-500 pt-2">{username}</span>
                )}
                <span
                  className={`py-2 px-4 w-fit text-white rounded-3xl ${
                    socketId === sender
                      ? `bg-blue-500 rounded-se-3xl ${isSameSenderAsPrevious ? "!rounded-e-none" : "rounded-ee-none"} rounded-l-3xl`
                      : `bg-gray-700 rounded-es-3xl ${
                          isSameSenderAsNext
                            ? "!rounded-s-none"
                            : "rounded-ss-none"
                        } rounded-r-3xl`
                  }`}
                >
                  <span>{message}</span>
                </span>
              </div>
            );
          })}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default Chats;
