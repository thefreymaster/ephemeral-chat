import { IconButton } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Create = ({
  setSessions,
  sessions,
}: {
  setSessions(v: Array<string>): void;
  sessions: Array<string>;
}) => {
  const navigate = useNavigate();
  const handleCreateSession = () => {
    const sessionId = Math.random().toString(36).substr(2, 4);
    setSessions([...sessions, sessionId]);
    navigate(`/${sessionId}`);
  };
  return (
    <IconButton
      icon={<BiPlus />}
      colorScheme="gray"
      onClick={handleCreateSession}
      aria-label={""}
    />
  );
};
