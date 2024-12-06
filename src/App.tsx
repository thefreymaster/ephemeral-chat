import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "./components/Send";
import { useParams } from "react-router-dom";
import { Create } from "./components/Create";
import { Box, useTheme } from "@chakra-ui/react";
import { Sessions } from "./components/Sessions";
import { useGlobalProvider } from "./providers/GlobalProvider";
import { Messages } from "./components/Messages";
import { Join } from "./components/Join";

const NAV_WIDTH = "90px";

const getSocketURL = () => {
  if (import.meta.env.MODE === "development") {
    return "localhost:6001";
  }
  return window.location.origin;
};

const socket = io(getSocketURL());

function App() {
  const { sessionId } = useParams();
  const { sessions, setSessions } = useGlobalProvider();

  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState<
    Array<{ message: string; messageAuthor: string }>
  >([]);
  const theme = useTheme();

  useEffect(() => {
    // Register the listener only once
    socket.on(
      `sendBroadcast`,
      ({
        message,
        messageAuthor,
      }: {
        message: string;
        messageAuthor: string;
      }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, messageAuthor },
        ]);
      }
    );
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      socket.emit("joinSession", sessionId);
      setSessions([sessionId]);
      socket.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);
        setUser(socket.id ?? "");
      });
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      document.title = `Ephemeral Chat | ${sessionId}`;
      setMessages([]);
      socket.emit("joinSession", sessionId);
    }
  }, [sessionId]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      backgroundColor={theme.colors.brand["900"]}
    >
      <Box
        minW={NAV_WIDTH}
        maxW={NAV_WIDTH}
        height="100%"
        display="flex"
        flexDir="column"
        padding="2"
        gap="2"
      >
        <Sessions socket={socket} />
        <Box flex={1} display="flex" />
        <Join sessions={sessions} setSessions={setSessions} />
        <Create setSessions={setSessions} sessions={sessions} />
      </Box>
      <Box minW={`calc(100vw - ${NAV_WIDTH})`} height="100%">
        <Messages user={user} messages={messages} />
        <Box
          padding="2"
          width={`calc(100vw - ${NAV_WIDTH})`}
          display="flex"
          position="fixed"
          bottom="0"
          backgroundColor={theme.colors.brand["900"]}
        >
          <Send socket={socket} message={message} setMessage={setMessage} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
