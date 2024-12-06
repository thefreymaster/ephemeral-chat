import { Badge, Box, useTheme } from "@chakra-ui/react";
import { useGlobalProvider } from "../../providers/GlobalProvider";
import { useNavigate, useParams } from "react-router-dom";

export const Sessions = ({ socket }: any) => {
  const { sessionId: routeSessionId } = useParams();
  const { sessions } = useGlobalProvider();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap="2">
      {sessions.map((session: string) => (
        <Badge
          key={session}
          _hover={{ cursor: "pointer" }}
          backgroundColor={
            session === routeSessionId
              ? theme.colors.brand["100"]
              : theme.colors.brand["500"]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={
            session === routeSessionId
              ? theme.colors.brand["900"]
              : theme.colors.brand["300"]
          }
          colorScheme="brand"
          padding="10px"
          size="xs"
          onClick={() => {
            socket.emit("joinSession", routeSessionId);
            navigate(`/${session}`);
          }}
        >
          {session}
        </Badge>
      ))}
    </Box>
  );
};
