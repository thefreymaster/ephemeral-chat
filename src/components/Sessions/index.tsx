import { Badge, Box, useTheme } from "@chakra-ui/react";
import { useGlobalProvider } from "../../providers/GlobalProvider";
import { useNavigate, useParams } from "react-router-dom";

export const Sessions = ({ socket }: any) => {
  const { sessionId: routeSessionId } = useParams();
  const { sessions } = useGlobalProvider();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column">
      {sessions.map((session: string) => (
        <Box
          key={session}
          _hover={{ cursor: "pointer" }}
          backgroundColor={
            session === routeSessionId && theme.colors.gray["500"]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={
            session === routeSessionId
              ? theme.colors.gray["100"]
              : theme.colors.gray["200"]
          }
          padding="10px"
          onClick={() => {
            socket.emit("joinSession", routeSessionId);
            navigate(`/${session}`);
          }}
        >
          <Badge colorScheme="gray">{session}</Badge>
        </Box>
      ))}
    </Box>
  );
};
