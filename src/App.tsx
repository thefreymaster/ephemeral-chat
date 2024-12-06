import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "./components/Send";
import { useParams } from "react-router-dom";
import { Create } from "./components/Create";
import { Box, useTheme } from "@chakra-ui/react";
import { Sessions } from "./components/Sessions";
import { useGlobalProvider } from "./providers/GlobalProvider";
import { Messages } from "./components/Messages";

const socket = io(window.location.origin);

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
      setMessages([]);
      socket.emit("joinSession", sessionId);
    }
  }, [sessionId]);

  return (
    <Box width="100vw" height="100vh" display="flex">
      <Box
        minW="80px"
        maxW="80px"
        backgroundColor={theme.colors.gray["800"]}
        height="100%"
        display="flex"
        flexDir="column"
        padding="2"
      >
        <Sessions socket={socket} />
        <Box flex={1} display="flex" />
        <Create setSessions={setSessions} sessions={sessions} />
      </Box>
      <Box
        minW={"calc(100vw - 80px)"}
        backgroundColor={theme.colors.gray["900"]}
        height="100%"
      >
        <Messages user={user} messages={messages} />
        <Box
          padding="2"
          width="calc(100vw - 80px)"
          display="flex"
          position="fixed"
          bottom="0"
          backgroundColor={theme.colors.gray["900"]}
        >
          <Send socket={socket} message={message} setMessage={setMessage} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
