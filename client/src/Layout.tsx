import { Toaster } from "react-hot-toast";
import App from "./App";
import { SocketProvider } from "./socket/SocketContext";

function Layout() {
  return (
    <SocketProvider>
      <App />
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-center"}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </SocketProvider>
  );
}

export default Layout;
