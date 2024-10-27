import Navbar from "../components/Navbar";
import Chats from "../components/Chats";
import SendMessageForm from "../components/SendMessageForm";

function ChatPage() {
  return (
    <div className="w-screen h-[100dvh] flex flex-col">
      <Navbar />
      {/* Adjust container to allow Chats to scroll */}
      <div className="flex-1 pb-16 md:pb-24 overflow-y-auto">
        <Chats />
      </div>
      {/* Position SendMessageForm at the bottom */}
      <SendMessageForm />
    </div>
  );
}

export default ChatPage;
