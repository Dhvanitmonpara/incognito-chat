import useChatStore from "../store/chatStore";
import { IoArrowBack } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { room } = useChatStore();
  const navigate = useNavigate()
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="h-20 w-full px-8 lg:px-24 flex justify-between space-x-4 overflow-hidden items-center bg-zinc-800">
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
