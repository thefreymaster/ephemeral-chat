import React, { createContext, useContext, useState } from "react";

// Define the type for the socket
type SocketContextType = any;

// Create the context
const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState({});

  return (
    <SocketContext.Provider
      value={{ setSessions, sessions, messages, setMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useGlobalProvider = (): SocketContextType => {
  return useContext(SocketContext);
};
