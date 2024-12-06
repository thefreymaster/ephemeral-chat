import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "./components/Send";
import { useParams } from "react-router-dom";
import { Create } from "./components/Create";
import { Box, useTheme, useToast } from "@chakra-ui/react";
import { Sessions } from "./components/Sessions";
import { useGlobalProvider } from "./providers/GlobalProvider";
import { Messages } from "./components/Messages";
import { Join } from "./components/Join";
import { useDeviceSize } from "./hooks/useDeviceSize";

const NAV_WIDTH = "90px";

const getSocketURL = () => {
  if (import.meta.env.MODE === "development") {
    return "localhost:6001";
  }
  return window.location.origin;
};
const socket = io(getSocketURL());

function App() {
  const { isMobile } = useDeviceSize();
  const toast = useToast();

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

    socket.on(`sendBroadcast`, handleBroadcast);

    return () => {
      socket.off(`sendBroadcast`, handleBroadcast);
    };
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      socket.emit("joinSession", sessionId);
      setSessions([...sessions, sessionId]);
      document.title = `Ephemeral Chat | ${sessionId}`;
      setMessages([]);
      socket.on("sessionJoinReceived", ({ id }) => {
        console.log("Connected to server with ID:", id);
        setUser(id);
        toast({
          description: `${id} has joined.`,
          status: "info",
          duration: 9000,
          isClosable: true,
          variant: "subtle",
          position: "top-right",
        });
      });
    }

    return () => {
      socket.emit("leaveSession", sessionId); // Optional cleanup if supported by your server
    };
  }, [sessionId]);

  return (
    <Box
      width="100vw"
      height={isMobile ? "calc(100vh - 85px)" : "100vh"}
      display="flex"
      backgroundColor={theme.colors.brand["900"]}
    >
      <Box
        minW={NAV_WIDTH}
        maxW={NAV_WIDTH}
        maxHeight="100%"
        display="flex"
        flexDir="column"
        padding="2"
        gap="2"
      >
        <Sessions socket={socket} />
        <Box flex={1} display="flex" />
        <Join />
        <Create />
      </Box>
      <Box
        minW={
          isMobile ? `calc(100vw - ${NAV_WIDTH})` : `calc(50vw - ${NAV_WIDTH})`
        }
        height="100%"
        display="flex"
        alignItems="flex-end"
        paddingBottom="55px"
      >
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
