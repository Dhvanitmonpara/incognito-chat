import Navbar from "../components/Navbar";
import Chats from "../components/Chats";
import SendMessageForm from "../components/SendMessageForm";

function ChatPage() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Chats />
      <SendMessageForm/>
    </div>
  );
}

export default ChatPage;
