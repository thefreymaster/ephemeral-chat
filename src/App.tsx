import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "./components/Send";
import { useParams } from "react-router-dom";
import { Create } from "./components/Create";
import { Box, useTheme } from "@chakra-ui/react";
import { Sessions } from "./components/Sessions";
import { useGlobalProvider } from "./providers/GlobalProvider";
import { Messages } from "./components/Messages";

const socket = io("http://localhost:6001");

function App() {
  const { sessionId } = useParams();
  const { sessions, setSessions } = useGlobalProvider();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ message: string; messageAuthor: string }>
  >([]);
  const theme = useTheme();

  useEffect(() => {
    // Register the listener only once
    const handleBroadcast = ({
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
    };
    socket.on(`send-broadcast`, handleBroadcast);
  }, [sessionId]); // sessionId is constant here, but include it for clarity

  useEffect(() => {
    if (sessionId) {
      socket.emit("joinSession", sessionId);
      setSessions([sessionId]);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      setMessages([]);
    }
  }, [sessionId]);

  return (
    <Box width="100vw" height="100vh" display="flex">
      <Box
        minW="60px"
        maxW="60px"
        backgroundColor={theme.colors.gray["800"]}
        height="100%"
      >
        <Sessions socket={socket} />
      </Box>
      <Box
        minW={"calc(100vw - 50px)"}
        backgroundColor={theme.colors.gray["900"]}
        height="100%"
      >
        <Messages messages={messages} />
      </Box>
      <Box
        padding="2"
        width="100vw"
        display="flex"
        position="fixed"
        bottom="0"
        backgroundColor={theme.colors.gray["900"]}
      >
        <Create setSessions={setSessions} sessions={sessions} />
        <Box margin="1" />
        <Send socket={socket} message={message} setMessage={setMessage} />
      </Box>
    </Box>
  );
}

export default App;
