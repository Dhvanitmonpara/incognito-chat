import { useEffect, useRef } from "react";
import useChatStore from "../store/chatStore";
import useSocketStore from "../store/socketStore";

function Chats() {
  const { chat } = useChatStore().room || { chat: [] };
  const { socketId } = useSocketStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="flex flex-col pb-16 px-3 md:px-4 py-4 h-full overflow-y-auto">
      {chat.length > 0 ? (
        <div className="flex flex-col space-y-1 w-full max-w-3xl mx-auto">
          {chat.map(({ message, sender, _id, username }, index) => {
            const isSameSenderAsPrevious =
              index > 0 && chat[index - 1].sender === sender;
            const isSameSenderAsNext =
              index < chat.length - 1 && chat[index + 1].sender === sender;

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
                      ? `bg-blue-500 rounded-se-3xl ${
                          isSameSenderAsPrevious
                            ? "!rounded-e-none"
                            : "rounded-ee-none mt-2"
                        } rounded-l-3xl`
                      : `bg-gray-700 rounded-es-3xl ${
                          isSameSenderAsNext
                            ? "!rounded-s-none"
                            : "rounded-ss-none mb-2"
                        } rounded-r-3xl`
                  }`}
                >
                  <span>{message}</span>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500 text-center">No messages yet.</div>
      )}
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chats;
