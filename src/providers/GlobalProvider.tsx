import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

// Define the type for the socket
type SocketContextType = any;

// Create the context
const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<any>(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io("https://your-socketio-server", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current?.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketRef.current?.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ ...socketRef.current, setSessions, sessions }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useGlobalProvider = (): SocketContextType => {
  return useContext(SocketContext);
};
