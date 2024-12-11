// @ts-nocheck

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "./components/Send";
import { useNavigate, useParams } from "react-router-dom";
import { Create } from "./components/Create";
import { Box, Avatar, AvatarGroup } from "@chakra-ui/react";
import { Sessions } from "./components/Sessions";
import { useGlobalProvider } from "./providers/GlobalProvider";
import { Messages } from "./components/Messages";
import { Join } from "./components/Join";
import { useDeviceSize } from "./hooks/useDeviceSize";
import { getSessionId } from "./utils/getSessionId";
import { Background } from "./components/Background";

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
  const navigate = useNavigate();
  // const toast = useToast();

  const { sessionId } = useParams();
  const { sessions, setSessions, messages, setMessages } = useGlobalProvider();

  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Register the listener only once
    const handleBroadcast = ({
      message,
      messageAuthor,
    }: {
      message: string;
      messageAuthor: string;
    }) => {
      setMessages((prevMessages) => {
        const oldMessages = Array.isArray(prevMessages?.[sessionId])
          ? [{ message, messageAuthor }, ...prevMessages?.[sessionId]]
          : [{ message, messageAuthor }];
        const res = {
          ...prevMessages,
          [sessionId]: oldMessages,
        };
        return res;
      });
    };

    socket.on(`sendBroadcast`, handleBroadcast);

    return () => {
      socket.off(`sendBroadcast`, handleBroadcast);
    };
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      if (!sessions.includes(sessionId)) {
        socket.emit("joinSession", sessionId);
        setSessions([...sessions, sessionId]);
        socket.on("sessionJoinReceived", ({ id }) => {
          console.log("Connected to server with ID:", id);
          setUser(id);
          if (users.indexOf(id) === -1) {
            setUsers((prevUsers) => [...prevUsers, id]);
          }
        });
      }
      document.title = `Ephemeral Chat | ${sessionId}`;
      setUsers([]);
    }
    if (!sessionId) {
      const sessionId = getSessionId();
      navigate(`/${sessionId}`);
    }

    return () => {
      socket.emit("leaveSession", sessionId); // Optional cleanup if supported by your server
    };
  }, [sessionId]);

  return (
    <>
      <Background />
      <Box
        width="100vw"
        height={isMobile ? "calc(100vh - 85px)" : "100vh"}
        display="flex"
        // backgroundColor={theme.colors.brand["900"]}
        // background="linear-gradient(to top, black, #121212);"
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
          <Sessions />
          <Box flex={1} display="flex" />
          <Join />
          <Create />
        </Box>
        <Box
          width={`calc(100vw - ${NAV_WIDTH})`}
          display="flex"
          justifyContent="center"
        >
          <Box
            minW={isMobile ? `100%` : `calc(50vw - ${NAV_WIDTH})`}
            height="100%"
            display="flex"
            alignItems="flex-end"
            paddingBottom="55px"
          >
            <Messages user={user} messages={messages} />
            <Box
              padding="2"
              width={isMobile ? "auto" : `50%`}
              display="flex"
              position="fixed"
              bottom="0"
            >
              <AvatarGroup size="sm" max={5} marginRight="4">
                {users.map((user) => (
                  <Avatar colorScheme="gray" name={user} borderWidth="0px" />
                ))}
              </AvatarGroup>
              <Send socket={socket} message={message} setMessage={setMessage} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
