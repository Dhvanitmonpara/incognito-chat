import useChatStore from "../store/chatStore";
import { IoArrowBack } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSocket from "../socket/useSocket";
import useSocketStore from "../store/socketStore";

function Navbar() {
  const socket = useSocket()
  const { room } = useChatStore();
  const { socketId, user } = useSocketStore();
  const navigate = useNavigate()
  const handleBackToHome = () => {
    socket.emit('leave-room', {room, sender: socketId, username: user})
    navigate("/");
  };
  return (
    <div className="sticky z-50 top-0 left-0 h-20 w-full px-8 lg:px-24 flex justify-between space-x-4 overflow-hidden items-center border-b-[0.2px] border-zinc-700">
      {/* <h1 className="text-3xl">
        {socketId ? `Connected with id ${socketId}` : "Not Connected"}
      </h1> */}
      <div className="flex justify-center items-center space-x-4">
        <button onClick={handleBackToHome} className="text-zinc-100 text-2xl hover:bg-zinc-700 rounded-full p-2">
          <IoArrowBack />
        </button>
        <h3 className="text-zinc-100 text-xl">{room || "No room selected"}</h3>
      </div>
      <button className="text-zinc-100 text-2xl hover:bg-zinc-700 rounded-full p-2">
        <MdDownload />
      </button>
    </div>
  );
}

export default Navbar;
