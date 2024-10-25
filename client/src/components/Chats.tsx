import useChatStore from "../store/chatStore";

function Chats() {
  const { chats } = useChatStore();
  return (
    <div>
      {chats.length > 0 && (
        <div>
          {chats.map(({ message }, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chats;
