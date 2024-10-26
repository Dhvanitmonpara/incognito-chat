import { Toaster } from "react-hot-toast";
import App from "./App";
import { SocketProvider } from "./socket/SocketContext";
import useWindowWidth from "./hooks/useWindowWidth.ts";

function Layout() {
  const width = useWindowWidth();

  return (
    <SocketProvider>
      <App />
      <Toaster
        position={width >= 1024 ? "bottom-right" : "top-center"}
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
